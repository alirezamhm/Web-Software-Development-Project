import * as questionsApi from "$lib/apis/questions-api.js";

let questionState = $state([]);

const loadQuestions = async (cId) => {
    questionState = await questionsApi.getQuestions(cId);
};

const useQuestionState = () => {
    return {
        get questions() {
            return questionState;
        },
        load: async (cId) => {
            loadQuestions(cId);
        },
        add: async (question, cId) => {
            const newQuestion = await questionsApi.addQuestion(question, cId);
            loadQuestions(cId);
        },
        remove: async (qId, cId) => {
            const removedQuestion = await questionsApi.deleteQuestion(qId, cId);
            loadQuestions(cId);
        },
        upvote: async (qId, cId) => {
            const question = await questionsApi.upvoteQuestion(qId, cId);
            loadQuestions(cId);
        },
    }
}

export { useQuestionState };