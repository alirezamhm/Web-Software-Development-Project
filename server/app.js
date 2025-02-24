import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import { hash, verify } from "jsr:@denorg/scrypt@4.4.4";

import courses from "./routes/courses.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());


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
        c.status(401)
        return c.json({
            "message": "Invalid email or password!",
        });
    }

    const user = result[0];

    const passwordValid = verify(data.password.trim(), user.password_hash);
    if (passwordValid) {
        return c.json({
            "message": `Logged in as user with id ${user.id}`,
        });
    } else {
        c.status(401)
        return c.json({
            "message": "Invalid email or password!",
        });
    }
});

export default app;
