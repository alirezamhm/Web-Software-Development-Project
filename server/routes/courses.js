import { Hono } from "@hono/hono";

const courses = new Hono();

courses.get("/", (c) => {
  return c.json({
    courses: [
      { "id": 1, "name": "Web Software Development" },
      { "id": 2, "name": "Device-Agnostic Design" }
    ]
  });
});

courses.get("/:id", (c) => {
  return c.json({ course: { "id": Number(c.req.param('id')), "name": "Course Name" } });
});

courses.post("/", async (c) => {
  const data = await c.req.json();
  return c.json({ course: { "id": 3, "name": data.name } });
});

courses.get("/:id/topics", (c) => {
  return c.json({
    topics: [
      { "id": 1, "name": "Topic 1" },
      { "id": 2, "name": "Topic 2" }
    ]
  });
});

courses.get("/:cId/topics/:tId/posts", (c) => {
  return c.json({
    "posts": [
      { "id": 1, "title": "Post 1" },
      { "id": 2, "title": "Post 2" }]
  });
});

courses.get("/:cId/topics/:tId/posts/:pId", (c) => {
  return c.json(
    {
      "post":
        { "id": Number(c.req.param("pId")), "title": "Post Title" },
      "answers": [
        { "id": 1, "content": "Answer 1" },
        { "id": 2, "content": "Answer 2" }
      ]
    }
  );
});

export default courses;