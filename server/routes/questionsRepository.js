import postgres from "postgres";

const sql = postgres();

const readAll = async (course_id) => {
    return await sql`SELECT * FROM questions WHERE course_id = ${course_id}`;
};

const readOne = async (course_id, id) => {
    const result = await sql`SELECT * FROM questions WHERE course_id = ${course_id} AND id = ${id}`;
    return result[0];
};

const create = async (question, course_id) => {
    const result = await sql`INSERT INTO questions (course_id, title, text)
        VALUES (${course_id}, ${question.title}, ${question.text})
        RETURNING *`;
    return result[0];
};

const upvote = async (course_id, id,) => {
    const result = await sql`UPDATE questions
        SET upvotes = upvotes + 1
        WHERE course_id = ${course_id} AND id = ${id}
        RETURNING *`;
    return result[0];
};

const remove = async (course_id, id) => {
    const result = await sql`DELETE FROM questions WHERE course_id = ${course_id} AND id = ${id} RETURNING *`;
    return result[0];
};

export { readAll, readOne, create, upvote, remove };