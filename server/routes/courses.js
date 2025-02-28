import { Hono } from "@hono/hono";
import * as jwt from "jsr:@hono/hono@4.6.5/jwt";

import * as coursesController from "./coursesController.js";
import * as questionsController from "./questionsController.js";
import * as answersController from "./answersController.js";

const courses = new Hono();

const COOKIE_KEY = "token";
const JWT_SECRET = "wsd-project-secret";

courses.get("/", coursesController.getCourses);
courses.get("/:id", coursesController.getCourse);
courses.post("/", ...coursesController.createCourse);
courses.delete("/:id", coursesController.deleteCourse);

courses.get("/:id/questions", questionsController.getQuestions);
courses.get("/:id/questions/:qId", questionsController.getQuestion);
courses.post("/:id/questions", ...questionsController.createQuestion);
courses.post("/:id/questions/:qId/upvote", questionsController.upvoteQuestion);
courses.delete("/:id/questions/:qId", questionsController.deleteQuestion);

courses.use("/:id/questions/:qId/answers", async (c, next) => {
    if (c.req.method === "GET") {
        return await next();
    }
    return await jwt.jwt({
        cookie: COOKIE_KEY,
        secret: JWT_SECRET,
    })(c, next);
});
courses.get("/:id/questions/:qId/answers", answersController.getAnswers);
courses.post("/:id/questions/:qId/answers", ...answersController.createAnswer);

courses.use(
    "/:id/questions/:qId/answers/:aId/upvote",
    jwt.jwt({
        cookie: COOKIE_KEY,
        secret: JWT_SECRET,
    }),
);
courses.post("/:id/questions/:qId/answers/:aId/upvote", answersController.upvoteAnswer);

export default courses;