<script>
    import TodoItem from "./TodoItem.svelte";

    let { todos, removeTodo } = $props();
</script>

<ul>
    {#each todos as todo}
        <li>
            <TodoItem {todo} {removeTodo} />
        </li>
    {/each}
</ul>
