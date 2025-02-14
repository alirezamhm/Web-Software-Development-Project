import { Hono } from "@hono/hono";

const courses = new Hono();

let questions = [];

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

courses.get("/:id/questions", (c) => {
  return c.json(questions);
});

courses.post("/:id/questions", async (c) => {
  const data = await c.req.json();
  data.id = questions.length + 1;
  data.upvotes = 0;
  questions.push(data);
  return c.json(data);
});

courses.post("/:id/questions/:qId/upvote", (c) => {
  const question = questions.find(q => q.id === Number(c.req.param('qId')));
  question.upvotes++;
  return c.json(question);
});

courses.delete("/:id/questions/:qId", (c) => {
  const qId = Number(c.req.param('qId'));
  const question = questions.find(q => q.id === qId);
  questions = questions.filter(q => q.id !== qId);
  return c.json(question);
});

export default courses;