# Query variables, handling loading and errors

So far in this course, we have been fetching the full list of books. This was fine because our list was really short, but what if we had a thousand books and we needed to search for a certain one? For more complex queries like that, we can take advantage of GraphQL’s search parameter.

## Filtering the book list with a query variable

Before we integrate this feature into our actual app, let’s head into the GraphQL playground to practice. We’ll utilize the search parameter on the allBooks query.

In this example, we are using a hardcoded value on our query. If we copied this query to our application, we would not be able to pass the search term to the query; it would be a part of the query string. To pass a dynamic value to a GraphQL query, we can use GraphQL variables.

First, let’s declare the variables our query can accept, which we can do by adding an argument to the query.

Variables must be prefixed with $ and we need to define a type for them. In our case, we are searching for book titles so our search variable is definitely a String.

We can also check what is accepted as a search parameter:

Now, we can pass the $search variable to the search argument:

```javaScript
query AllBooks($search: String) {
  allBooks(search: $search) { # now search is dynamic, accepting an external value
    id
    title
    rating
  }
}
```

Finally, we can test that the passed variable is correctly applied. To do this in the playground, we can use the Query variables tab at the bottom, and add a string such as "the":

As you can see, now our results are only books whose titles contain the string "the".

Now that we’ve gotten this practice in the playground, let’s make use of the search in our Vue application.
