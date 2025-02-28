<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";

    import QuestionItem from "./QuestionItem.svelte";

    let questionState = useQuestionState();
    let { course_id } = $props();

    $effect(async () => {
        await questionState.load(course_id);
    });
</script>

<ul class="space-y-4 flex flex-col">
    {#each questionState.questions as question}
        <li >
            <QuestionItem question={question} course_id={course_id} show_buttons={true} />
        </li>
    {/each}
</ul>
