# How to use Render Functions

```JavaScript
import { h } from 'vue'

const App = {
    render() {
        // v-if="ok"
        let nodeToReturn
        if (this.ok) {
            nodeToReturn = ...
        } else if() {

        }

        return this.ok 
        ? h ('div', { id: 'hello'},[ h('span', 'world')])
        : this.otherCondition 
            ? ('p', 'other branch')
            : h('span')
    }
}


// <div id="hello"><span>world</span></div>
```

```JavaScript
const App = {
    // v-for="item in list"
    render() {
        return this.list.map(item => {
            return h('div', { key: item.id }, item.text)
        })
    }
}

```

```JavaScript
const App = {
    // slots
    render() {
       const slot = this.$slots.default 
       ? this.$slots.default({}) //scope-slot
       : []

       slot.map(vnode => {
           return h('div', [vnode])
       })
    }
}

```

Example

you have a Stack component:

```JavaScript
<Stack size="4">
    <div>hello</div>
    <div>hello</div>
    <div>hello</div>
    <Stack size="4">
        <div>hello</div>
        <div>hello</div>
    </Stack>
</Stack>


<div class="stack">
    <div class="mt-4">
        <div>hello</div>
    </div>
    <div class="mt-4">
        <div class="stack">
            <div class="mt-4">
                <div>hello</div>
            </div>
        </div>
    </div>
</div>
```

Inside the template, there's no chance programmatically walk through each item inside the slot and then transform them into something else, but you can do that in the render function.

```JavaScript
const Stack = {
    // slots
    render() {
       const slot = this.$slots.default 
       ? this.$slots.default({}) //scope-slot
       : []

      return h('div', { class: 'stack' }, slot.map(child => {
          return h('div', {class:`mt-${this.$prop.size}`},[
              child
          ])
      }))
    }
}
```

So we are using a slot of map to generate the new slot of vnode, where the original slot child is wrapped inside.

<https://developpaper.com/vue-3-deep-dive-with-evan-you/>
