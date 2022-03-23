# Make a Client-Side Model

When building server-side applications, it's easy to open any Eloquent model and extend it with new behavior or affordances. The same, of course, is true on the client-side. You are not limited to basic scalars. When and if it makes sense, there's nothing keeping you from wrapping, for example, a set of user attributes in a dedicated class. Let's review how in this episode.

## Client-Side Models

Create a Models: User.js

```javaScript
onMounted(()=> {
  let user = new User(Inertia.page.props.auth.user)

  if (user.id === otherUser.id) {
    
  }
  console.log(user.follows({}))
})
```

## Vue Composables

for using a composition api, we extract ein composables to reuse the module

UseCurrentUser.js

```javaScript
import User from "@/Models/User"
import {Inertia} from '@inertiajs/inertia'

export function UseCurrentUser() {
    return new User(Inertia.page.props.auth.user)
}
```
