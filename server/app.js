import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";
import { getCookie, setCookie } from "jsr:@hono/hono@4.6.5/cookie";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";

import courses from "./routes/courses.js";

const COOKIE_KEY = "auth";
const JWT_SECRET = "secret";

const app = new Hono();

app.use("/*", logger());
app.use(
    "/*",
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    }),
);

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
        const payload = {
            id: user.id,
            exp: Math.floor(Date.now() / 1000) + 60,
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

app.post("/api/auth/verify", async (c) => {
    const token = getCookie(c, COOKIE_KEY);
    if (!token) {
        c.status(401);
        return c.json({
            "message": "No token found!",
        });
    }

    try {
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
    } catch (e) {
        c.status(401);
        return c.json({
            "message": "Invalid token!",
        });
    }
});


export default app;
