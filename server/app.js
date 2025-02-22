import { Hono } from "@hono/hono";
import { cors } from "@hono/hono/cors";
import { logger } from "@hono/hono/logger";
import courses from "./routes/courses.js";

const app = new Hono();

app.use("/*", cors());
app.use("/*", logger());


app.get("/", (c) => c.json({ message: "Hello!" }));
  
app.route("/api/courses", courses);

export default app;