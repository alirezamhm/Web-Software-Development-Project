import { PUBLIC_API_URL } from "$env/static/public";

const getQuestions = async () => {
    const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions`);
    return await response.json();
};

const addQuestion = async (question) => {
    const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(question),
    });
    return await response.json();
};

const upvoteQuestion = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions/${id}/upvote`, {
        method: "POST",
    });
    return await response.json();
}

const deleteQuestion = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/courses/1/questions/${id}`, {
        method: "DELETE",
    });
    return await response.json();
};

export { getQuestions, addQuestion, upvoteQuestion, deleteQuestion };