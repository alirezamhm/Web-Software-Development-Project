<script>
    let { todo, removeTodo } = $props();
</script>

<input type="checkbox" bind:checked={todo.done} id={todo.id} />
<label for={todo.id}>
    {todo.name} ({todo.done ? "done" : "not done"})
</label>
<button onclick={() => removeTodo(todo)}>Remove</button>
