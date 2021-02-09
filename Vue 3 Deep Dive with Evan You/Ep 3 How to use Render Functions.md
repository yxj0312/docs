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
