# Measuring Your Database Performance

> Hello! My name is Jonathan Reinink. I work at Tailwind Labs where we build Tailwind CSS and Tailwind UI, among other things. I am also active in the open source community. My latest contribution has been Inertia.js, a library that lets you quickly build modern single-page React, Vue and Svelte apps using classic server-side frameworks, like Laravel.

> Hello! To get things started, let's discuss how to measure your database's performance. Without doing this, you're essentially flying blind.

## Laravel Debugbar

<https://github.com/barryvdh/laravel-debugbar>

1. Request generation: How long is this page taking to load

   idealy: 1ms

2. Queries: How many queries are being run?

   n+1 issue (like without lazy loading)
   order by: take double time->(index)

3. Memory usage
