import { zValidator } from "zValidator";

import * as answersRepository from "./answersRepository.js";
import { asnwerValidator } from "./validators.js";

const getAnswers = async (c) => {
    const qId = c.req.param('qId');
    return c.json(await answersRepository.readAll(qId));
};

const createAnswer = [zValidator("json", asnwerValidator), async (c) => {
    const answer = c.req.valid("json");
    const qId = c.req.param('qId');
    const email = c.user.email;
    return c.json(await answersRepository.create(answer, qId, email));
}];

const upvoteAnswer = async (c) => {
    const id = c.req.param('aId');
    return c.json(await answersRepository.upvote(id));
};


export { getAnswers, createAnswer, upvoteAnswer };