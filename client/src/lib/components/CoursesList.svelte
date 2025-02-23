<script>
    import { useCourseState } from "$lib/states/courseState.svelte.js";

    let courseState = useCourseState();

    $effect(async () => {
        await courseState.load();
    });
</script>

<ul class="space-y-2 p-4 m-4 preset-filled-tertiary-900-100 rounded-lg shadow">
    {#each courseState.courses as course}
        <li class="border-b border-gray-300 last:border-none">
            <a
                href="/courses/{course.id}"
                class="block type-scale-4 p-3 rounded-lg text-gray-600 hover:text-black-800 hover:bg-gray-200 transition"
            >
                {course.name}
            </a>
        </li>
    {/each}
</ul>
