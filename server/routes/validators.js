import { z } from 'zod';

const courseValidator = z.object({
    name: z.string().min(3),
});

const questionValidator = z.object({
    title: z.string().min(3),
    text: z.string().min(3),
});

const asnwerValidator = z.object({
    text: z.string(),
});

export { courseValidator, questionValidator, asnwerValidator };