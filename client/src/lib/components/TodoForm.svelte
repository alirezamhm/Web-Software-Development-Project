<script>
    let { todos } = $props();

    const addTodo = (e) => {
        const todo = Object.fromEntries(new FormData(e.target));
        todo.id = crypto.randomUUID();
        todos.push(todo);
        e.target.reset();
        e.preventDefault();
    };
</script>

<form onsubmit={addTodo}>
    <label for="name">Todo</label>
    <input id="name" name="name" type="text" placeholder="Enter a new todo" />
    <div>
        <input id="done" name="done" type="checkbox" />
        <label for="done">Done</label>
    </div>
    <input type="submit" value="Add Todo" />
</form>
