import { PUBLIC_API_URL } from "$env/static/public";

const getQuestions = async (id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}/questions`);
    return await response.json();
};

const addQuestion = async (question, id) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${id}/questions`, {
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(question),
    });
    return await response.json();
};

const upvoteQuestion = async (qId, cId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${cId}/questions/${qId}/upvote`, {
        method: "POST",
    });
    return await response.json();
}

const deleteQuestion = async (qId, cId) => {
    const response = await fetch(`${PUBLIC_API_URL}/api/courses/${cId}/questions/${qId}`, {
        method: "DELETE",
    });
    return await response.json();
};

export { getQuestions, addQuestion, upvoteQuestion, deleteQuestion };