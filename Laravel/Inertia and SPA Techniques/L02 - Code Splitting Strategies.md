# L02 - Code Splitting Strategies

While we're still on the subject of webpack, let's take a few moments to discuss some code-splitting strategies that you might consider - particularly when building medium-to-large applications.

Things You'll Learn

## Mix Vendor Extraction

extract()

```javaScript

mix.js('resources/js/app.js', 'public/js')
    .extract()

// use this approach, remember to put

<script src="{{ mix('js/manifest.js') }}" defer></script>
<script src="{{ mix('js/vendor.js') }}" defer></script>
<script src="{{ mix('js/app.js') }}" defer></script>
```

## Vue's DefineAsyncComponent

```javaScript
createInertiaApp({
   resolve: async name => {
    // let page = require(`./Pages/${name}`).default;
    let page = (await import(`./Pages/${name}`)).default;

     if (page.layout === undefined) {
      page.layout = Layout;
    }

    return page;
  },
  setup({ el, App, props, plugin }) {
    createApp({ render: () => h(App, props) })
      .use(plugin)
      .component("Link", Link)
      .component("Head", Head)
      .mount(el)
  },

  title: title => `My App - ${title}`
});

//index.vue

import {ref, watch, defineAsyncComponent} from 'vue';

let Pagination = defineAsyncComponent(()=> {
  return import('@/Shared/Pagination.vue')
})
```
