<script>
    // import { useCourseState } from "$lib/states/courseState.svelte.js";
    
    // let courseState = useCourseState();

    let { course } = $props();
</script>

<div>
    <a href="/courses/${course.id}">{course.name}</a>
</div>