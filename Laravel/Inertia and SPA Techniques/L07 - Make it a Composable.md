# Make it a Composable

In this episode, we'll review another technique for organizing your code: Vue composables. You can think of composables as Vue 3's version of mixins - but on steroids. To illustrate this, let's add support for interacting with the Clipboard API.

## Clipboard API

We use Clipboard API to build a copy button

```javaScript
<template>
    <div>
        <header class="bg-gray-800 text-white flex justify-end px-2 py-1 text-xs border-b border-grey-700">
            <button class="hover:bg-gray-600 rounded px-2" @click="copyToClipboard">{{ copied? 'Copied' : 'Copy'}}</button>
        </header>
        <pre><code ref="block">{{ code }}</code></pre>
    </div>
</template>

<script setup>
import { highlightElement } from "@/Services/SyntaxHighlighting"
import { onMounted, ref } from "vue"

let props = defineProps({
    code: String
});

let block = ref(null);
let copied = ref(false)

let copyToClipboard = () => {
    // to check if it works under IE
    // if those two don't return undefined, then go
    if (navigator && navigator.clipboard) {
        navigator.clipboard.writeText(props.code)

        copied.value = true

        setTimeout(() => {
            copied.value = false
        }, 3000);
        
        return
    }

    alert('Apologies, your browser does not support the Clipboard API.')
}


onMounted(() => {
    highlightElement(block.value);
})
</script>

```

## Vue Composables

We might want to extract above codes:

one solution is Vue 3 Composables

```javaScript
import { ref } from "vue"

export function useClipboard(text) {
    let copied = ref(false)

    let supported = navigator && 'clipboard' in navigator

    let copy = () => {
        // to check if it works under IE
        // if those two don't return undefined, then go
        if (supported) {
            navigator.clipboard.writeText(text)

            copied.value = true

            return
        }

        alert('Apologies, your browser does not support the Clipboard API.')
    }


    return {copy, copied, supported}
}
```

use it by

```javaScript
<template>
    <div>
        <header v-if="supported" class="bg-gray-800 text-white flex justify-end px-2 py-1 text-xs border-b border-grey-700">
            <button class="hover:bg-gray-600 rounded px-2" @click="copy">{{ copied ? 'Copied' : 'Copy'}}</button>
        </header>
        <pre><code ref="block">{{ code }}</code></pre>
    </div>
</template>

<script setup>
import { highlightElement } from "@/Services/SyntaxHighlighting"
import { onMounted, ref } from "vue"
import { useClipboard } from '@/Composables/useClipboard'

let props = defineProps({
    code: String
});

let block = ref(null);


let {copy, copied, supported} = useClipboard(props.code)

onMounted(() => {
    highlightElement(block.value);
})
</script>
```
