# What is middleware?

When you hear the term middleware, it can mean a lot of things. After all, the generic definition of middleware is any software that ties two pieces of software together. Pretty vague right?

Imagine you’re organizing a big event like a music festival. There are several stages, each with its own set of performers and activities.

Now, before people can access certain areas of the event, you might have a security checkpoint where staff members check if they have the right credentials or tickets to access that area. And some areas might only admit special guests if they have a premium ticket.

These checkpoints are critical to ensuring the event functions as expected and everyone has a great time!

## Types of middleware

When it comes to middleware in Nuxt, think of it like a checkpoint that allows you to run some code before the page is rendered. Common examples of code you’d want to run in middleware include: checking for authentication, redirection, analytics and so forth.

There are two kinds of middleware to be aware of:

- Server Middleware - These are functions that run on every request before any other server route. This course will not cover this topic given it requires Nuxt 3 server knowledge.
- Client Middleware - These are functions that run before navigating to a route. This is the type of middleware that most people often refer to and the more technical term for it “Route Middleware.” This is where we’ll be spending our time in this course.
Extending on the event analogy, think of Route Middleware as giving you the ability to checks if a user has the VIP ticket before allowing them to access the corresponding page. If they don’t have the VIP ticket, the middleware can redirect them to a different page or display an error message.

## Why use middleware

You might be wondering, why do we need middleware? After all, if we wanted to run code before a route, wouldn’t we use navigations guards from Vue Router?

As applications grow, one of the key factors in ensuring it is scalable and maintainable is consistent and standardized patterns. Just like state management, there’s nothing stopping you from putting together your own custom patterns through a use of composables and reactive data, but there are clear advantages to using industry standards like Pinia.

Similarly, Nuxt Route Middleware provides a standard pattern for managing route guards and running code before navigation.
