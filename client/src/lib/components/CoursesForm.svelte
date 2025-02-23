<script>
    import { useCourseState } from "$lib/states/courseState.svelte.js";

    let courseState = useCourseState();

    const addCourse = async (e) => {
        const course = Object.fromEntries(new FormData(e.target));
        await courseState.add(course);
        e.target.reset();
        e.preventDefault();
    };
</script>

<form onsubmit={addCourse} class="space-y-4">
    <label class="label" for="name">
        <span class="label-text">Name</span>
        <input class="input" id="name" name="name" type="text" placeholder="Enter course name"/>
    </label>
    <button class="w-full btn preset-filled-primary-500" type="submit">Add course</button>
</form>