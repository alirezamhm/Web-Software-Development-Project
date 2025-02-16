import { browser } from "$app/environment";
import * as questionsApi from "$lib/apis/questions-api.js";

let questionState = $state([]);

const loadQuestions = async () => {
    questionState = await questionsApi.getQuestions();
};

if (browser) {
    loadQuestions();
}

const useQuestionState = () => {
    return {
        get questions() {
            return questionState;
        },
        load: async () => {
            loadQuestions();
        },
        add: async (question) => {
            const newQuestion = await questionsApi.addQuestion(question);
            loadQuestions();
        },
        remove: async (id) => {
            const removedQuestion = await questionsApi.deleteQuestion(id);
            loadQuestions();
        },
        upvote: async (id) => {
            const question = await questionsApi.upvoteQuestion(id);
            loadQuestions();
        },
    }
}

export { useQuestionState };