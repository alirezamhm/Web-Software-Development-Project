import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";
import postgres from "postgres";

import courses from "./routes/courses.js";

const app = new Hono();

const COOKIE_KEY = "auth";
const JWT_SECRET = "secret";
const accessControlList = {
    "/api/admin": ["ADMIN"],
};

app.use("/*", logger());
app.use(
    "/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

const userMiddleware = async (c, next) => {
    const token = getCookie(c, COOKIE_KEY);
    if (!token) {
        await next();
        return;
    }

    const { payload } = jwt.decode(token, JWT_SECRET);
    c.user = payload;
    await next();
};

const aclMiddleware = async (c, next) => {
    const roles = accessControlList[c.req.path];
    if (!roles) {
        await next();
        return;
    }

    if (!c.user?.roles) {
        c.status(401);
        return c.json({ error: "Unauthorized" });
    }

    if (!c.user.roles.some((r) => roles.includes(r))) {
        c.status(403);
        return c.json({ error: "Forbidden" });
    }

    await next();
};

app.use("*", userMiddleware);

app.use("*", aclMiddleware);

app.get("/", (c) => c.json({ message: "Hello!" }));

app.route("/api/courses", courses);


const sql = postgres();

app.post("/api/auth/register", async (c) => {
    const data = await c.req.json();

    try {
        const result = await sql`INSERT INTO users (email, password_hash)
      VALUES (${data.email.trim().toLowerCase()},
      ${hash(data.password.trim())}) RETURNING *`;
    } catch (error) { }
    finally {
        return c.json({ "message": `Confirmation email sent to address ${data.email.trim().toLowerCase()}.` });
    }
});

app.post("/api/auth/login", async (c) => {
    const data = await c.req.json();

    const result = await sql`SELECT * FROM users
      WHERE email = ${data.email.trim().toLowerCase()}`;

    if (result.length === 0) {
        return c.json({
            "message": "User not found!",
        });
    }

    const user = result[0];

    const passwordValid = verify(data.password.trim(), user.password_hash);
    if (passwordValid) {
        const rolesResult = await sql`SELECT role FROM user_roles WHERE user_id = ${user.id}`;
        const roles = rolesResult.map((r) => r.role);

        const payload = {
            id: user.id,
            roles,
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
        };

        const token = await jwt.sign(payload, JWT_SECRET);

        // setting the cookie as the user id
        setCookie(c, COOKIE_KEY, token, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            sameSite: "lax"
        });
        return c.json({
            "message": `Logged in as user with id ${user.id}`,
        });
    } else {
        return c.json({
            "message": "Invalid password!",
        });
    }
});


app.use(
    "/api/verify",
    jwt.jwt({
        cookie: COOKIE_KEY,
        secret: JWT_SECRET,
    }),
);
app.post("/api/auth/verify", async (c) => {
    const token = getCookie(c, COOKIE_KEY);
    const payload = await jwt.verify(token, JWT_SECRET);
    payload.exp = Math.floor(Date.now() / 1000) + 60;

    const refreshedToken = await jwt.sign(payload, JWT_SECRET);

    setCookie(c, COOKIE_KEY, refreshedToken, {
        path: "/",
        domain: "localhost",
        httpOnly: true,
        sameSite: "lax",
    });

    return c.json({
        "message": "Valid token!",
    });
});

app.use(
    "/api/users",
    jwt.jwt({
        cookie: COOKIE_KEY,
        secret: JWT_SECRET,
    }),
);
app.get("/api/users", async (c) => {
    const result = await sql`SELECT email FROM users`;
    return c.json(result);
});

app.use(
    "/api/notes/*",
    jwt.jwt({
        cookie: COOKIE_KEY,
        secret: JWT_SECRET,
    }),
);
app.use("/api/notes/*", userMiddleware);

app.get("/api/notes", async (c) => {
    const notes = await sql`SELECT * FROM notes WHERE user_id = ${c.user.id}`;
    return c.json(notes);
});

app.post("/api/notes", async (c) => {
    const { text } = await c.req.json();
    const result = await sql`INSERT INTO notes (user_id, text)
      VALUES (${c.user.id}, ${text}) RETURNING *`;
    return c.json(result[0]);
});

app.get("/api/notes/:id", async (c) => {
    const notes = await sql`SELECT * FROM notes
      WHERE id = ${c.req.param("id")} AND user_id = ${c.user.id}`;
    if (notes.length <= 0) {
        c.status(404);
        return c.json({ error: "Note not found" });
    }
    return c.json(notes[0]);
});

export default app;
