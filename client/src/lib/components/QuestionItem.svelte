<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";
    let questionState = useQuestionState();

    let { question } = $props();
</script>

<div>
    <h3>{question.title}</h3>
    <p>{question.text}</p>
    <p>Upvotes: {question.upvotes}</p>
    <button onclick={async () => await questionState.upvote(question.id)}>Upvote</button>
    <button onclick={async () => await questionState.remove(question.id)}>Delete</button>
</div>