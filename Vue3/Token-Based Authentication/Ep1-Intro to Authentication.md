# Intro to Authentication

## Intro to Authentication

[JSON Web Tokens](https://jwt.io/) are an open, industry standard RFC 7519 method for representing claims securely between two parties.

## How Token-Based Authentication works

Token-based authentication means that our app will allow users to log into it. But we can’t log just anyone in. Our users need to be authenticated, which means when they type their username and password into our app, we’ll send that info to our server so it can authenticate it. If everything is good to go, the user is logged in and the server returns a token.

We then store that token in our browser’s local storage and use it when we need to, such as when we need to make an API call for some private data. At this point, we make a copy of the token we’ve stored, and send it along with our API request. The server then decrypts the token, making sure our user has the proper permission to access the data that’s being requested. If approved, the server sends the requested private data to the client.

Whenever the user logs out, the token is cleared from local storage. We can also set an expiration on the token so it automatically clears after a set amount of time.

## How a JWT is Structured

The specific type of tokens we’ll be using are JSON Web Tokens (JWTs). You can think of a JWT like a key that can unlock the parts of your app that are private.

The structure of a JWT consists of three encoded strings: the header, payload and signature. ****Each hashed string is separated by a dot, like so: xxxxx.yyyyy.zzzzz.

The header is contains the type of token (in our case: JWT) and the hashing algorithm being used.

The payload contains the information we are transmitting (usually info about the user) along with some optional “claims” such as who issued the token, its expiration date, and if the user is an admin, etc.

The signature is a hash of the header + the payload + the secret. The secret lives on the server and is used to decrypt the token as well as to sign new tokens.
