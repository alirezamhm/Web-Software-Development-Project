// import app from "./app.js";

// Deno.serve(app.fetch);

Deno.serve((request) => new Response("Hello world!"));