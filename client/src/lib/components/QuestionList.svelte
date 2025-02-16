<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";

    import QuestionItem from "./QuestionItem.svelte";

    let questionState = useQuestionState();

    $effect(async () => {
        await questionState.load();
    });
</script>

<ul>
    {#each questionState.questions as question}
        <li>
            <QuestionItem {question} />
        </li>
    {/each}
</ul>