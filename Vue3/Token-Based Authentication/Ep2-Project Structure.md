# Project Structure

## Exploring the Starting Code

main.js

```javaScript
import Vue from 'vue'
    import App from './App.vue'
    import router from './router'
    import store from './store'
    
    Vue.config.productionTip = false
    
    new Vue({
      router,
      store, 
      render: h => h(App)
    }).$mount('#app')
```

App.vue

```javaScript
    <template>
      <div id="app">
        <app-nav />
        <router-view class="page" />
      </div>
    </template>
    <script>
    import AppNav from './components/AppNav'
    export default {
      components: { AppNav }
    }
    </script>
    <style lang="scss">
    @import './assets/styles/global.scss';
    .page {
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
      min-height: calc(100vh - 56px);
    }
    </style>
```

 src/components/AppNav.vue

```javaScript
    <template>
      <div id="nav">
        <router-link to="/">
          Home
        </router-link>
        <router-link to="/dashboard">
          Dashboard
        </router-link>
      </div>
    </template>
    
    <script>
    export default {}
    </script>
    
    <style lang="scss" scoped>
    #nav {
      display: flex;
      align-items: center;
      min-height: 50px;
      padding: 0.2em 1em;
      background: linear-gradient(to right, #16c0b0, #84cf6a);
    }
    .nav-welcome {
      margin-left: auto;
      margin-right: 1rem;
      color: white;
    }
    a {
      font-weight: bold;
      color: #2c3e50;
      margin: auto 0.8em auto 0.4em;
      text-decoration: none;
      border-top: 2px solid transparent;
      border-bottom: 2px solid transparent;
    }
    .router-link-exact-active {
      color: white;
      border-bottom: 2px solid #fff;
    }
    button,
    .button {
      margin-left: auto;
      background: white;
      text-decoration: none;
      color: #2c3e50;
      &.router-link-active {
        color: #2c3e50;
      }
    }
    .logoutButton {
      cursor: pointer;
    }
    .nav-welcome + button {
      margin-left: 0;
    }
    </style>
```

 src/components/EventCard.vue

```javaScript
<template>
      <div class="event-card">
        <span>@{{ event.time }} on {{ event.date }}</span>
        <h4>{{ event.title }}</h4>
      </div>
    </template>
    <script>
    export default {
      name: 'EventCard',
      props: {
        event: {
          type: Object,
          default: () => {
            return {}
          }
        }
      }
    }
    </script>
    <style scoped>
    .event-card {
      width: 13em;
      margin: 1em auto 1em auto;
      padding: 1em;
      border: solid 1px #2c3e50;
      cursor: pointer;
      transition: all 0.2s linear;
    }
    .event-card:hover {
      transform: scale(1.01);
      box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
    }
    .event-card h4 {
      font-size: 1.4em;
      margin-top: 0.5em;
      margin-bottom: 0.3em;
    }
    </style>
```

 src/views/Home.vue

```javaScript
<template>
      <div class="home">
        <h1>Welcome to the App!</h1>
      </div>
    </template>
    
    <script>
    export default {}
    </script>
```

 src/views/Dashboard.vue

```javaScript
<template>
      <div>
        <h1>Dashboard</h1>
        <template v-if="!isLoading">
          <EventCard v-for="event in events" :key="event.id" :event="event" />
        </template>
        <p v-else>
          Loading events
        </p>
      </div>
    </template>
    
    <script>
    import axios from 'axios'
    import EventCard from '../components/EventCard'
    export default {
      components: { EventCard },
      data () {
        return {
          isLoading: true,
          events: []
        }
      },
      created () {
        axios.get('//localhost:3000/dashboard').then(({ data }) => {
          this.events = data.events.events
          this.isLoading = false
        })
      }
    }
    </script>
```

router.js

```javaScript
import Vue from 'vue'
    import Router from 'vue-router'
    import Home from './views/Home.vue'
    import Dashboard from './views/Dashboard.vue'
    Vue.use(Router)
    const router = new Router({
      mode: 'history',
      base: process.env.BASE_URL,
      routes: [
        {
          path: '/',
          name: 'home',
          component: Home
        },
        {
          path: '/dashboard',
          name: 'dashboard',
          component: Dashboard
        }
      ]
    })
    export default router
```

store.js

```javaScript 
 import Vue from 'vue'
    import Vuex from 'vuex'
    
    Vue.use(Vuex)
    
    export default new Vuex.Store({
      state: {},
      mutations: {},
      actions: {}
    })
```

## Understanding the Tasks Ahead

Now that we have explored the app, we can start adding authentication to it. But we need to take a step back and understand what steps we’ll be taking to make that happen.

## Client/Server Communication

We’ll need to understand the communication that should happen between the client and our server. Our server has three api endpoints: /register, /login, and /dashboard.

We’ll call out to the register endpoint to register our users, then to the login endpoint to log in a registered user. Both of these actions causes the server to return a response that includes a JWT token, which we will send along with our requests to the /dashboard route, where our protected data (events) is returned.

So far so good… but there are three steps that need to be taken between logging a user in and requesting private data.

## Handling the Response

When a user registers or logs in, our server will return a response, which includes a JWT token along with the user’s email and name.

We’ll be using Vuex to do three things with that user data:

1. Store userData in Vuex State
2. Store userData in local storage (to persist it in case of browser refresh)
3. Add token to Axios header
We’ll also need to be logging out our user, which will reverse these steps.
