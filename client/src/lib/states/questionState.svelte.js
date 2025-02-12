import { browser } from "$app/environment";

const QUESTIONS_KEY = "questions";
let initialQuestions = [];
if (browser && localStorage.hasOwnProperty(QUESTIONS_KEY)) {
    initialQuestions = JSON.parse(localStorage.getItem(QUESTIONS_KEY));
}

let questionState = $state(initialQuestions);

const saveQeusitons = () => {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(questionState));
}

const useQuestionState = () => {
    return {
        get questions() {
            return questionState;
        },
        add: (question) => {
            questionState.push(question);
            saveQeusitons();
        },
        remove: (id) => {
            questionState = questionState.filter((question) => question.id !== id);
            saveQeusitons();
        },
        upvote: (id) => {
            const question = questionState.find((question) => question.id === id);
            question.upvotes++;
            saveQeusitons();
        },
    }
}

export { useQuestionState };