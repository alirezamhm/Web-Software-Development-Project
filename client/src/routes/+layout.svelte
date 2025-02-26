<script>
    import "../app.css";

    import Header from "../lib/components/layout/Header.svelte";
    import { useUserState } from "$lib/states/userState.svelte.js";

    let { children, data } = $props();

    const userState = useUserState();
    if (data.user) {
        userState.user = data.user;
    }
</script>

{#if data.user?.id}
    <p>Hello {data.user?.id}!</p>
{/if}

<div class="flex flex-col h-full">
    <Header />

    <main class="container mx-auto max-w-2xl grow">
        {@render children()}
    </main>
</div>
