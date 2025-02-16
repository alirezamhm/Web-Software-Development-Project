<script>
    import { executeQuery } from "$lib/apis/database-api.js";

    let query = $state("");
    let result = $state([]);

    const runSQL = async () => {
        result = await executeQuery(query);
    };
</script>

<h1>SQL Interface</h1>

<h2>Write query here</h2>

<textarea bind:value={query}></textarea><br />
<button onclick={runSQL}>Execute query</button>

<h2>Query results:</h2>

<p>{JSON.stringify(result)}</p>

<p>Rows: {result.length}</p>

<ul>
    {#if result.length > 0}
        {#each Object.keys(result[0]) as column}
            <li>{column}</li>
        {/each}
    {/if}
</ul>