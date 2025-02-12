<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();

    const addQuestion = (e) => {
        const question = Object.fromEntries(new FormData(e.target));
        question.id = crypto.randomUUID();
        question.upvotes = 0;
        questionState.add(question);
        e.target.reset();
        e.preventDefault();
    };
</script>

<form onsubmit={addQuestion}>
    <label for="title">Title</label>
    <input id="title" name="title" type="text" placeholder="Enter a title" />
    <label for="text">Text</label>
    <textarea id="text" name="text" placeholder="Enter the text"></textarea>
    <input type="submit" value="Add Question" />
</form>