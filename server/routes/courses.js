import { Hono } from "@hono/hono";

import * as coursesController from "./coursesController.js";
import * as questionsController from "./questionsController.js";

const courses = new Hono();

courses.get("/", coursesController.getCourses);
courses.get("/:id", coursesController.getCourse);
courses.post("/", ...coursesController.createCourse);
courses.delete("/:id", coursesController.deleteCourse);

courses.get("/:id/questions", questionsController.getQuestions);
courses.post("/:id/questions", ...questionsController.createQuestion);
courses.post("/:id/questions/:qId/upvote", questionsController.upvoteQuestion);
courses.delete("/:id/questions/:qId", questionsController.deleteQuestion);

export default courses;