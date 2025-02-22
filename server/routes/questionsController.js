import { zValidator } from "zValidator";

import * as questionsRepository from "./questionsRepository.js";
import { questionValidator } from "./validators.js";

const getQuestions = async (c) => {
    const cId = c.req.param('id');
    return c.json(await questionsRepository.readAll(cId));
};

const getQuestion = async (c) => {
    const cId = c.req.param('id');
    const qId = c.req.param('qId');
    return c.json(await questionsRepository.readOne(cId, qId));
};

const createQuestion = [zValidator("json", questionValidator), async (c) => {
    const question = c.req.valid("json");
    const cId = c.req.param('id');
    return c.json(await questionsRepository.create(question, cId));
}];

const upvoteQuestion = async (c) => {
    const cId = c.req.param('id');
    const qId = c.req.param('qId');
    return c.json(await questionsRepository.upvote(cId, qId));
};

const deleteQuestion = async (c) => {
    const cId = c.req.param('id');
    const qId = c.req.param('qId');
    return c.json(await questionsRepository.remove(cId, qId));
};

export { getQuestions, getQuestion, createQuestion, upvoteQuestion, deleteQuestion };