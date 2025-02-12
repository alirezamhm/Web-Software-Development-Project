<script>
    import TodoForm from "./TodoForm.svelte";
    import TodoList from "./TodoList.svelte";

    let todos = $state([]);

    const removeTodo = (todo) => {
        todos = todos.filter((t) => t.id !== todo.id);
    };
</script>

<h1>Todos</h1>

<h2>Add Todo</h2>

<TodoForm {todos} />

<h2>Existing todos</h2>

<TodoList {todos} {removeTodo}/>
