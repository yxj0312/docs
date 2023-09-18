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
