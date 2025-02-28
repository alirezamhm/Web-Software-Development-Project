<script>
    import { PUBLIC_API_URL } from "$env/static/public";
    import QuestionItem from "../../../../../lib/components/QuestionItem.svelte";

    let { data } = $props();
    let answers = $state([]);
    let error = $state("");
    let question = $state({});

    const getAnswers = async () => {
        error = "";
        const response = await fetch(
            `${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}/answers`,
        );
        if (!response.ok) {
            error = "Failed to get answers.";
            return;
        }
        answers = await response.json();
    };

    const getQuestion = async () => {
        error = "";
        const response = await fetch(
            `${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}`,
        );
        if (!response.ok) {
            error = "Failed to get question.";
            return;
        }
        question = await response.json();
    };

    const upvoteAnswer = async (aId) => {
        error = "";
        const response = await fetch(
            `${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}/answers/${aId}/upvote`,
            {
                method: "POST",
                credentials: "include",
            },
        );

        if (!response.ok) {
            error = "Failed to upvote answer.";
            return;
        }

        getAnswers();
    };

    const addAnswer = async (e) => {
        const answer = Object.fromEntries(new FormData(e.target));
        error = "";
        const response = await fetch(
            `${PUBLIC_API_URL}/api/courses/${data.id}/questions/${data.qid}/answers`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(answer),
            },
        );

        if (!response.ok) {
            error = "Failed to add Answer.";
            return;
        }
        e.target.reset();
        e.preventDefault();
        getAnswers();
    };

    $effect(() => {
        getQuestion();
        getAnswers();
    });
</script>

{#if error && error.length > 0}
    <p class="text-xl">${error}</p>
{/if}

<QuestionItem {question} course_id={data.id} show_buttons={false} />

<ul>
    {#each answers as answer}
        <li>
            <p>{answer.text}</p>
            <p>upvotes {answer.upvotes}</p>
            {#if data.user}
                <button
                    type="button"
                    class="btn preset-filled-primary-500"
                    onclick={async () => await upvoteAnswer(answer.id)}
                    >Upvote</button
                >
            {/if}
        </li>
    {/each}

    {#if data.user}
        <form onsubmit={addAnswer} class="space-y-4">
            <label class="label">
                <span class="label-text">Text</span>
                <textarea
                    class="textarea"
                    id="text"
                    name="text"
                    rows="2"
                    placeholder="Enter text"
                ></textarea>
            </label>
            <button class="w-full btn preset-filled-primary-500" type="submit"
                >Add answer</button
            >
        </form>
    {/if}
</ul>
