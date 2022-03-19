# Wrap it in a Component

The small syntax highlighting service we created in the previous episode is useful, but it still requires one too many steps to initialize. To fix this, let's create a dedicated Highlight Vue component and tuck those initialization steps away from view.

## Isolate Setup Hooks Behind a Component

Add a component:

```javaScript
<template>
    <pre><code ref="code">{{ code }}</code></pre>
</template>

<script>
import { highlightElement } from "@/Services/SyntaxHighlighting"

export default {
    props: {
        code: String
    },
    mounted() {
        // highlightAll();
        // highlight('#example2');
        highlightElement(this.$refs.code);
    }
}
</script>

// Home.vue

<template>
  <Head>
    <title>Home</title>
    <meta
      type="description"
      content="Home information"
      head-key="description"
    >
  </Head>

  <h1 class="text-3xl">Blog</h1>

  <Highlight :code="snippet" />
</template>


<script setup>
import Highlight from "@/Components/Highlight"
let snippet = `
class Example
{
  Public function __construct()
  {
    //
  }
}
`.trim()
</script>
```

We can also refactor the component to setup

```javaScript
<template>
    <pre><code ref="code">{{ code }}</code></pre>
</template>

<script setup>
import { highlightElement } from "@/Services/SyntaxHighlighting"
import {onMounted} from "vue"

defineProps: ({
    code: String
}),
onMounted(() => {
    highlightElement(this.$refs.code);
})
</script>
```
