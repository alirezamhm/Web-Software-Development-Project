<script>
    import { useCourseState } from "$lib/states/courseState.svelte.js";
    
    let courseState = useCourseState();

    $effect(async () => {
        await courseState.load();
    });
</script>

<ul>
    {#each courseState.courses as course}
        <li>
            <a href="/courses/{course.id}">{course.name}</a>
        </li>
    {/each}
</ul>