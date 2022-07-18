# Demystifying Modules

> Modules have been around for a while now in JavaScript, but up until recently you've had to use a bundler like Webpack to include them in your source code. Now, modern browsers can handle importing and exporting methods and attributes natively.

- example

```JavaScript

// index.html
// change type to module
<script type="module" src="main.js"></script>

// users.js
const users = [
    {
        name: 'Andrew',
        email: 'andrew@example.com',
        stars: 5
    },
    {
        name: 'Ashley',
        email: 'ashley@example.com',
        stars: 9
    },
    {
        name: 'Gaston',
        email: 'gaston@example.com',
        stars: 1
    }
]

let currentUser = 2

export { users, currentUser }

// main.js
import { users, currentUser} from './users.js'
document.getElementById('output').innerHTML = users[currentUser].name
```

- export default example

```JavaScript
// helper.js
const helper = (arr) => {
    return arr.map(item => item.toUpperCase())
}

export default helper

import helper from './helper.js'

const userEmails = users.map(user => user.email)
document.getElementById('output').innerHTML = helper(userEmails)
```
