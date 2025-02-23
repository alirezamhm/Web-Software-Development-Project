<script>
    import "../app.css";

    import Header from "../lib/components/layout/Header.svelte";

    let { children } = $props();
</script>

<div class="flex flex-col h-full">
    <Header />

    <main class="container mx-auto max-w-2xl grow">
        {@render children()}
    </main>
</div>
