<script>
    import QuestionForm from "./QuestionForm.svelte";
    import QuestionList from "./QuestionList.svelte";
    import { useCourseState } from "$lib/states/courseState.svelte.js";
    
    let courseState = useCourseState();

    let { course_id } = $props();
    let course = $state({});

    $effect(async () => {
        course = await courseState.getOne(course_id);
    });
</script>

<h1>Course {course.name}</h1>

<h2>Existing questions</h2>

<QuestionList course_id={course_id}/>

<h2>Add Question</h2>

<QuestionForm course_id={course_id}/>
