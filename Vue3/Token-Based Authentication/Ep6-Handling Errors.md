# Handling Errors

In this lesson, we’ll be taking a look at handling some of the errors that can happen when users attempt to register or log in to our app. So let’s think about the situations that we should be checking for.

First, we want to make sure that when a user tries to log in with invalid credentials (with the wrong password, for example) we display an error. We’ll handle that inside of our LoginUser component. Additionally, when a user tries to register an account with our app, a few things could go wrong. They might already have an account and try to create a second one with an email that already exists. Or they may be trying to create an account with an invalid password (too short, for example). We will need to display errors then, too, within our RegisterUser component.

## Understanding the Server Behavior

Before we add the features I just mentioned, it will be helpful if we understand what the server ought to be doing so that our front end Vue app can respond appropriately.

When a user logs in, we’ll need our backend to check that the user’s credentials (in our case: the email and password) match a record in our database. Remember that in our mock backend, we only store one user at a time, so we are simply checking if the user data that is stored matches the credentials our user is logging in with. If not, the server should send back an error with the status code of 401.

You can observe that behavior in our mock server.js file:

server.js

```js
app.post('/login', (req, res) => {
      const userDB = fs.readFileSync('./db/user.json') // reading db
      const userInfo = JSON.parse(userDB)
      if ( // check if user credentials exists in db
        req.body &&
        req.body.email === userInfo.email &&
        req.body.password === userInfo.password
      ) {
        const token = jwt.sign({ userInfo }, 'the_secret_key')
        res.json({
          token,
          email: userInfo.email,
          name: userInfo.name
        })
      } else {
        res.status(401).json({ error: 'Invalid login. Please try again.'}) // send error if credentials don't match record
      }
    })
```

Great. Now what do you think the /register endpoint ought to do?

Since we don’t want a user creating multiple accounts with the same email, we’ll need to check that the user’s registration credentials do not match what already exists in our database. We also need to ensure they are giving us a strong enough password. In a production solution, your team may be using a validation library and have a custom validation solution on your backend. But for simplicity’s sake, this is how we are handling that “validation” in our mock server.js file:

server.js

```js
app.post('/register', (req, res) => {
    ...
     var errorsToSend = [] // array to collect errors
    
      if (dbUserEmail === user.email) { // check to see if email already exists in db
        errorsToSend.push('An account with this email already exists.')
      }
      if (user.password.length < 5) { // validate password is in correct format
        errorsToSend.push('Password too short.')
      }
      if (errorsToSend.length > 0) { // check if there are any errors
        res.status(400).json({ errors: errorsToSend }) // send errors back with status code
      } else {
       // success
      }
    ...
    })
```
Now that we understand how our dummy server is behaving, and what triggers those status codes to be sent back, we can start adding to our Vue app to receive and display them.

## Handling the Login Error

## Handling the Register Errors

## Side Notes
