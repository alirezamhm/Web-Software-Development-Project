import postgres from "postgres";

const sql = postgres();

const readAll = async (qId) => {
    return await sql`SELECT id, question_id, upvotes , text FROM question_answers WHERE question_id = ${qId}`;
};

const create = async (answer, qId, email) => {
    const user = await sql`SELECT id FROM users WHERE email = ${email}`;
    const uId = user[0].id;
    const result = await sql`INSERT INTO question_answers (question_id, user_id, text)
        VALUES (${qId}, ${uId}, ${answer.text})
        RETURNING *`;
    return result[0];
};

const upvote = async (id) => {
    const result = await sql`UPDATE question_answers
        SET upvotes = upvotes + 1
        WHERE id = ${id}
        RETURNING *`;
    return result[0];
};

export { readAll, create, upvote };