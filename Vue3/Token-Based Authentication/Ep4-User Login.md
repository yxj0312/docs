# User Login

## Creating our Login Component

src/views/LoginUser.vue

```javaScript
data () {
        return {
          email: '',
          password: ''
        }
      },

methods: {
        login () {
          this.$store
            .dispatch('login', {
              email: this.email,
              password: this.password
            })
            .then(() => { this.$router.push({ name: 'dashboard' }) })
        }
      }
```

This method dispatches the login Vuex action (which we’ll get to in a moment) and sends an object containing the user’s email and password when dispatching. Notice how we are then redirecting to the dashboard route, just like our RegisterUser component does.

Pretty straightforward, huh? So what’s the login Action look like? Let’s head to the Vuex store.js file and write that out.

## Vuex: The login Action

src/store.js

```javaScript
 login ({ commit }, credentials) {
        return axios
          .post('//localhost:3000/login', credentials)
          .then(({ data }) => {
            commit('SET_USER_DATA', data)
          })
      }
```

## Server Login Behavior

When we post out to our example server’s /login endpoint, this will cause the server to read the user.json file in our mock database, and check if the email and password in that file match the email and password that we just sent as credentials. If they match, a new JWT token is created and sent back within the response data.

This means that when our login Action commits the SET_USER_DATA Mutation, we’re doing exactly what we did in the previous lesson:

1.Storing the userData in our Vuex State
2.Storing a copy of the userData in local storage
3.Adding the token from the userData into our Axios header
Since we’ll then have a JWT token in the axios header, we should be successfully accessing our private event data when we’re redirected to the dashboard route (which calls out for those private events).

We’re almost ready to try this out in the browser, but first we need to add LoginUser into our router.js so we can access it.

## Adding LoginUser as a route

src/router.js

```javaScript
 import LoginUser from './views/LoginUser.vue'
    ...
      routes: [
        ...
        {
          path: '/login',
          name: 'login',
          component: LoginUser
        }
      ]
```

## Adding Router Links

src/views/LoginUser.vue

```javaScript
<form>
    ...
      <button type="submit" name="button">
        Login
      </button>
    
      <router-link to="/register">
        Don't have an account? Register.
      </router-link>
    </form>
```

src/views/RegisterUser.vue

```javaScript
 <form>
    ...
      <button type="submit" name="button">
        Login
      </button>
    
      <router-link to="/login">
        Already have an account? Login.
      </router-link>
    </form>
```

## Adding a Login Button

```javaScript
<router-link to="/login" class="button">
      Login
    </router-link>
```

## Removing router-links when logged in

Technically, we can use this.$store.state.user as an expression to determine whether we display the router-links that prompt logging in/registering, like so:

```javaScript
 <template>
      ...
       <template v-if="!this.$store.state.user">
          <div>
            To use this app you'll need to
            <router-link to="/login">
              Login
            </router-link>
            or
            <router-link to="/register">
              Register
            </router-link>
          </div>
        </template>
      ...
    </template>
```

While this works, it’s not the most ideal solution, for a few reasons. We want our templates to be as readable as possible. We might have a designer on our team who doesn’t know Vuex, for example. Also, as our app grows, our Vuex store will evolve. We might break our store into modules and/or rename items in our State, which would require us to update every v-if statement that relies on our Vuex store being structured in a specific way.

A more ideal solution is to use a getter that tells us whether we have a user logged in or not, and make that getter accessible from anyone component that may need it.

So we let’s first create that loggedIn getter:

src/store.js

```javaScript
 getters: {
        loggedIn (state) {
          return !!state.user
        }
      }
```

If this !! syntax is new to you, just know it helps us determine the truthiness or falsiness of the value. So this getter will return true if we have a user stored in our state, and false when that state is null.

Now let’s start to make this getter accessible to any component that needs it.

Inside our src directory, we’ll create a new vuex folder, and move our store.js file into it. Inside of that vuex folder, we’ll then create a new helpers.js file. As you might imagine, we can use this file to import Vuex helpers, specifically mapGetters.

src/vuex/helpers.js

```javaScript
import { mapGetters } from 'vuex'
    
    export const authComputed = {
      ...mapGetters(['loggedIn'])
    }
```

Notice how we’re then exporting authComputed, which uses the mapGetters helper to map to the loggedIn getter that we just added to our store.js file.

Now we can import this vuex helper into the components that need it, such as the Home component.

src/views/Home.vue

```javaScript
 <script>
    import { authComputed } from '../vuex/helpers.js'
    
    export default {
      computed: {
        ...authComputed
      }
    }
    </script>
```

After importing, we can add authComputed as a computed property, this component will then have access to everything that lives within authComputed, which includes the loggedIn getter.

So in our template, instead of <template v-if="!this.$store.state.user">, we can use our getter: loggedIn

src/views/Home.vue

```javaScript
 <template>
      ...
        <div v-if="!loggedIn">
          To use this app you'll need to
          <router-link to="/login">
            Login
          </router-link>
          or
          <router-link to="/register">
            Register
          </router-link>
        </div>
      ...
    </template>
```

Great. Now we will only display this welcome message when we’ve determined that there is not already a user in our State.

We can repeat this process in the our AppNav component, which also needs to hide a router-link when we have a user logged in.

src/components/AppNav.vue

```javaScript
<template>
      <div id="nav">
        ...
        <router-link v-if="!loggedIn" to="/login" class="button">
          Login
        </router-link>
      </div>
    </template>
    
    <script>
    import { authComputed } from '../vuex/helpers.js'
    export default {
      computed: {
        ...authComputed
      }
    }
    </script>
```

Here, we’ve imported authComputed, added it as a computed property, and added v-if="!loggedIn" to the router-link that we need to display or not.
