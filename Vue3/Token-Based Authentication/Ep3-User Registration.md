# User Registration

[links](https://www.vuemastery.com/courses/token-based-authentication/user-registration)

## Creating a RegisterUser component

src/views/RegisterUser.vue

```javaScript
 <template>
      <div>
        <form>
          <label for="name">
            Name:
          </label>
          <input v-model="name" type="text" name="name" value>
    
          <label for="email">
            Email:
          </label>
          <input v-model="email" type="email" name="email" value>
    
          <label for="password">
            Password:
          </label>
          <input v-model="password" type="password" name value>
    
          <button type="submit" name="button">
            Register
          </button>
        </form>
      </div>
    </template>
    <script>
        data () {
            return {
                name: '',
                email: '',
                password: ''
            }
            },
        methods: {
            register () {
                this.$store
                .dispatch('register', {
                    name: this.name,
                    email: this.email,
                    password: this.password
                })
            }
        }
    </script>
```

## Setting up Vuex

 src/store.js

```javaScript
import axios from 'axios'
    ...
      actions: {
        register ({ commit }, credentials) {
          return axios
            .post('//localhost:3000/register', credentials)
            .then(({ data }) => {
              console.log('user data is', userData)
              commit('SET_USER_DATA', data)
            })
         }
       }
```

## Adding RegisterUser to router.js

```javaScript
 import Vue from 'vue'
    import Router from 'vue-router'
    import Home from './views/Home.vue'
    import Dashboard from './views/Dashboard.vue'
    import RegisterUser from './views/RegisterUser.vue'
    
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
        },
        {
          path: '/register',
          name: 'register',
          component: RegisterUser
        }
      ]
    })
```

## Storing the Server’s Response

src/store.js

````javaScript

state: {
        user: null
      },

``` 

 ```javaScript 
      import axios from 'axios' 
    ...
    mutations: {
        SET_USER_DATA (state, userData) {
          state.user = userData
          localStorage.setItem('user', JSON.stringify(userData))
           axios.defaults.headers.common['Authorization'] = `Bearer ${
              userData.token
            }`    
        },
 ```

 This code may look confusing at first, but we’re simply setting the default Authorization header of our Axios instance so that it includes the JWT token. If you’re wondering what Bearer means, it’s just the type of Authentication being used. You can read more about it here. You just need to know that we’re giving Axios the JWT token so the server can use it unlock its protected /dashboard endpoint.

Great. Now we have user State, which our SET_USER_DATA populates when our server returns the userData in response to our API call. We’ve stored a copy of it in our local storage so we can reset our State in case of a browser refresh (we haven’t yet implemented that reset code, but you can expect it in a future lesson), and we’ve given Axios the key it needs to unlock our server’s dashboard route so we can access that private data: the events that live in our mock database.

## Redirecting to Dashboard

src/views/RegisterUser.vue

```javaScript
 methods: {
        register () {
          this.$store
            .dispatch('register', {
              name: this.name,
              email: this.email,
              password: this.password
            })
            .then(() => {
              this.$router.push({ name: 'dashboard' })
            })
        }
      }
```
