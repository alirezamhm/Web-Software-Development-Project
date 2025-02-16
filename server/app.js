import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import postgres from "postgres";
import courses from "./routes/courses.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());

const sql = postgres();

app.get("/", (c) => c.json({ message: "Hello!" }));

app.post("/", async (c) => {
    const { query } = await c.req.json();
    const result = await sql.unsafe(query);
    return c.json(result);
  });
  

app.route("/courses", courses);

export default app;