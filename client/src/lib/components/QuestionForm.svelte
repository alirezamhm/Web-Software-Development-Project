<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";

    let questionState = useQuestionState();

    let { course_id } = $props();

    const addQuestion = async (e) => {
        const question = Object.fromEntries(new FormData(e.target));
        await questionState.add(question, course_id);
        e.target.reset();
        e.preventDefault();
    };
</script>

<form onsubmit={addQuestion} class="space-y-4">
    <label class="label" for="title">
        <span class="label-text">Title</span>
        <input class="input" id="title" name="title" type="text" placeholder="Enter title"/>
    </label>
    <label class="label">
        <span class="label-text">Text</span>
        <textarea class="textarea" id="text" name="text" rows="4" placeholder="Enter text"></textarea>
      </label>
    <button class="w-full btn preset-filled-primary-500" type="submit">Add question</button>
</form>
