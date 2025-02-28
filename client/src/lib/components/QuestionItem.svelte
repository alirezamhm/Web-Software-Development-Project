<script>
    import { useQuestionState } from "$lib/states/questionState.svelte.js";

    let questionState = useQuestionState();

    let { question, course_id, show_buttons } = $props();
</script>

<div
    class="card preset-filled-tertiary-900-100 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block divide-y overflow-hidden"
>
    <article class="space-y-4 p-4">
        <div>
            <h3 class="h3 font-semibold text-gray-900">{question.title}</h3>
            <p class="text-lg text-gray-700 mt-1">{question.text}</p>
            <p class="text-sm text-gray-500 mt-2">Upvotes: {question.upvotes}</p>
        </div>
    </article>

    {#if show_buttons}
    <div class="mt-3 flex gap-2">
        <button
            class="btn preset-filled-primary-500"
            onclick={async () =>
                await questionState.upvote(question.id, course_id)}
        >
            Upvote
        </button>

        <button
            class="btn preset-filled-error-500"
            onclick={async () =>
                await questionState.remove(question.id, course_id)}
        >
            Delete
        </button>
    </div>
    {/if}
</div>
