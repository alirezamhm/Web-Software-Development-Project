<script>
    import Questions from "../../../lib/components/Questions.svelte";

    let { data } = $props();
</script>

<Questions course_id={data.id} />