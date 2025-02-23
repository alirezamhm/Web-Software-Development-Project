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

<form onsubmit={addCourse}>
    <label for="name">Name</label>
    <input id="name" name="name" type="text" placeholder="Enter course name" />
    <input type="submit" value="Add Course" />
</form>