import postgres from "postgres";

const sql = postgres();

const readAll = async () => {
    return await sql`SELECT * FROM courses`;
};

const readOne = async (id) => {
    const result = await sql`SELECT * FROM courses WHERE id = ${id}`;
    return result[0];
};

const create = async (course) => {
    const result = await sql`INSERT INTO courses (name) VALUES (${course.name}) RETURNING *`;
    return result[0];
};

const remove = async (id) => {
    const result = await sql`DELETE FROM courses WHERE id = ${id} RETURNING *`;
    return result[0];
};

export { readAll, readOne, create, remove };