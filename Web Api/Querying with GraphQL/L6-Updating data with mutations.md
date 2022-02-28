# Updating data with mutations

So far in our example app, we have only been fetching data from our GraphQL API endpoint. In this lesson, we’ll learn how to modify data on our server using GraphQL.

In a REST API, we typically use GET requests to fetch something, and POST / PUT / PATCH / UPDATE requests to change data on the server.

In GraphQL, however, the distinction is a bit simpler:

- We use query when we need to fetch data
- We use mutation when we need to modify anything

Let’s explore how to edit a book’s information, and look at how this affects the Apollo cache and how the changes are reflected in our Vue app.

## Getting familiar with the updateBook mutation in the GraphQL playground

Before we start making any changes in our frontend Vue app, let’s learn how to update a books’s data in our GraphQL playground (you can always find it running on <http://localhost:4000/graphql>)

Let’s open the right Docs panel and look for the updateBook mutation there.

What can we learn from this?

First of all, we can see that our mutation accepts an argument of UpdateBookInput type and this argument is required (that’s why it has an exclamation mark ! next to it). This means that if we don’t pass in this argument, the mutation will fail.

In the Type Details section, we can see the return type of the mutation, which is what the request actually returns. In our case, we will have there a modified Book.

Let’s learn more about that UpdateBookInput parameter now. When clicking on it, we can see more details about it:

So, it expects us to always pass in the ID of the book (it has an exclamation mark, meaning it’s a required field) and we can optionally add any field from the Book type such as title, description, rating, author, and year. The fields we pass in will get updated.

## Writing our first mutation

Let’s write our first mutation. Imagine that The Guardians book became super popular and we want to set its rating to 5 .

First, we’ll need to know the ID of the book to modify:

Now, let’s write the mutation, passing this ID in, along with a new rating:

```javaScript
mutation {
  updateBook(input: {id: "n12clfp3K", rating: 5}) {
    id
    title
    rating
  }
}
```

Let’s run it and then check the allBooks query again to make sure it’s updated.

Success! The Book's rating has been changed to 5

Now that we’ve learned the basics of how to work with mutations, let’s modify our application interface to be able to edit books from there.

## Making our books editable

### Adding a component for editing book data

Let’s add a new Vue component to edit a book’s rating. This component should:

- take a current book rating and book id as props,
- render an input field to edit this value, and
- close the form upon pressing the Esc or Enter button.
  
In this section, we will also print the new value in the console when pressing Enter — this will be replaced with the mutation call in the next step.

Let’s create this new EditRating.vue component in the components folder:

📃 components/EditRating.vue

```javaScript
<template>
  <input
    type="text"
    v-model="rating"
    @keyup.enter="updateRating"
    @keyup.esc="$emit('closeForm')"
  />
</template>

<script>
import { ref } from 'vue'
export default {
  emits: ['closeForm'],
  props: {
    initialRating: {
      type: Number,
      required: true,
    },
    bookId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    // we create a local copy of the prop to edit the rating
    const rating = ref(props.initialRating)
    const updateRating = () => {
      console.log(rating.value)
      emit('closeForm')
    }

    return { rating, updateRating }
  },
}
</script>
```

We are not currently making any use of the bookId prop but we will need in in the next step to call the updateBook mutation.

After we press Enter or Esc button, our component will emit a closeForm event. We will be listening to this event in the parent component, App.vue, and will close the form after it’s fired.

### Adding an edit button

Now, we need to modify the App.vue so we can edit the books from there.

We will create a new property called activeBook and add Edit buttons to the books in the list. When the Edit button is clicked, we will set this book as the activeBook. When a book is under editing, we will hide the list and display only the EditRating component instead.

Let’s start with modifying the script section, adding the EditRating component along with that activeBook reactive property:

📃 App.vue

```javaScript
import { ref } from 'vue'
import { useQuery, useResult } from '@vue/apollo-composable'
import ALL_BOOKS_QUERY from './graphql/allBooks.query.gql'

// import EditRating
import EditRating from './components/EditRating'

export default {
  name: 'App',
  components: {
    EditRating, //add EditRating to components
  },
  setup() {
    const searchTerm = ref('')
    const activeBook = ref(null) // add new reactive property for active book
    const { result, loading, error } = useQuery(
      ALL_BOOKS_QUERY,
      () => ({
        search: searchTerm.value,
      }),
      () => ({
        debounce: 500,
        enabled: searchTerm.value.length > 2,
      })
    )

    const books = useResult(result, [], data => data.allBooks)

    return { books, searchTerm, loading, error, activeBook }
  },
}
```

Now we can also modify App.vue’s template to show the book rating, and open a form to edit the rating if we have an activeBook

📃 App.vue

```javaScript
<template>
  <div>
    <input type="text" v-model="searchTerm" />
    <p v-if="loading">Loading...</p>
    <p v-else-if="error">Something went wrong! Please try again</p>
    <template v-else>
      <p v-if="activeBook">
        Update "{{ activeBook.title }}" rating:
        <EditRating
          :initial-rating="activeBook.rating"
          :book-id="activeBook.id"
          @closeForm="activeBook = null"
        />
      </p>
      <template v-else>
        <p v-for="book in books" :key="book.id">
          <!-- Display rating to see what we're editing -->
          {{ book.title }} - {{ book.rating }}
          <button @click="activeBook = book">Edit rating</button>
        </p>
      </template>
    </template>
  </div>
</template>
```

We’re now ready to replace the console.log with the GraphQL mutation we worked on earlier in the playground.

## Calling the mutation from the Vue application

Just like GraphQL queries, we will keep GraphQL mutations in the .gql files.

Let’s create one for our updateBook mutation:

📃 graphql/updateBook.mutation.gql

```javaScript
mutation UpdateBook($id: ID!, $rating: Float) {
  updateBook(input: { id: $id, rating: $rating }) {
    id
    title
    rating
  }
}
```

As you can see, we are passing two variables to our mutation: the first is a book ID, and the second is a new book rating. Where did these variables types came from?

When in doubt, we can always check the schema in our GraphQL playground:

As you can see on the screenshot above, the updateBook mutation accepts a parameter of UpdateBookInput type. After clicking on UpdateBookInput, we can see that it has 6 fields: a required id field of the type ID, and five optional fields. rating has a type Float . Now we know types we should use for these variables in the mutation.

Now, let’s import our updateBook mutation into the EditRating component, along with VueApollo’s useMutation composable:

📃 components/EditRating.vue

```javaScript
import UPDATE_BOOK_MUTATION from '../graphql/updateBook.mutation.gql'
import { useMutation } from '@vue/apollo-composable'
```

useMutation is a composition function similar to the useQuery we used previously. It takes a mutation and options as parameters, and returns methods and properties specific to the GraphQL mutation state. The most important method returned from useMutation is mutate — it will send a mutation to our GraphQL server.

Let’s start writing our mutation:

📃 components/EditRating.vue

```javaScript
const rating = ref(props.initialRating)

const { mutate } = useMutation(UPDATE_BOOK_MUTATION, () => ({
  variables: {
    id: props.bookId,
    // rating.value is a string, and our schema requires rating to be Float
    // that's why we are parsing a float here
    rating: parseFloat(rating.value),
  },
}))
```

It’s a good practice to use a function-returning object for the second parameter of useMutation. This way, you ensure that any changes to a component’s reactive data will be applied to the mutation’s variables.

Now, let’s call this mutation from the updateRating method:

📃 components/EditRating.vue

```javaScript
const rating = ref(props.initialRating)

const { mutate } = useMutation(UPDATE_BOOK_MUTATION, () => ({
  variables: {
    id: props.bookId,
    rating: parseFloat(rating.value),
  },
}))

const updateRating = () => {
  mutate()
  emit('closeForm')
}
```

Now, when we edit the rating and press enter, the form closes, and after some time we can see the rating updates:

Our user interface is far from perfect now. The form is closing before the request is resolved, there is no loading state, and no error handling. We will improve this in the next part of the lesson, but for now let’s focus on what is happening under the hood and why the rating was updated in the UI.

If we check the Network tab, we can find the mutation call there:

This response contains a book id and updated book data (in our case, we are the most interested in the updated rating).

Apollo Client considers id as an entity key, and it’s smart enough to recognize when we update a book and to merge all the new data to the book with the same id if it’s already in the cache:

What happens in the moment of the Apollo cache update? All the GraphQL queries that were fetching an updated entity (in our case, the book with id n12c1fp3k) will receive a new result. You can think about queries as ‘subscriptions’ to your Apollo cache. As soon as it’s updated, they receive a new value. That’s why in our App.vue the books property is recalculated and Vue re-renders a page to reflect changes.

But if we remove an id from the mutation result, there will be no cache update (and nothing will change in the UI):

📃 graphql/updateBook.mutation.gql

```javaScript
 mutation UpdateBook($id: ID!, $rating: Float) {
  updateBook(input: { id: $id, rating: $rating }) {
    # id
    title
    rating
  }
}
```

As you can see, the mutation is sent and returns a response, but the cache is not updating because Apollo Client does not recognize what book was updated. Understanding the logic of this cache update is crucial for working with Apollo. Let’s return id back to the mutation and improve our EditRating component logic a bit.

### Aliasing

When looking at the updateRating method, we can notice two issues:

- It doesn’t do much except the mutation call and emitting an event
- The closeForm event id fires synchronously while it should wait for the mutation to resolve
To fix the first issue, we will remove the updateRating method altogether and we will alias a mutate as updateRating:

📃 components/EditRating.vue

```javaScript
const { mutate: updateRating } = useMutation(UPDATE_BOOK_MUTATION, () => ({
  variables: {
    id: props.bookId,
    rating: parseFloat(rating.value),
  },
}))
```

Now, when we call updateRating from the component template, it will call mutate under the hood.

We also need to wait for this mutation to be resolved to emit closeForm. To do so, we will return one more property from useMutation called onDone.

📃 components/EditRating.vue

```javaScript
const { mutate: updateRating, onDone } = useMutation(
  UPDATE_BOOK_MUTATION,
  () => ({
    variables: {
      id: props.bookId,
      rating: parseFloat(rating.value),
    },
  })
)
```

onDone is a hook that is triggered when the mutation is resolved. In its callback, we can specify any logic we want to be executed after the mutation has returned a response. In our case, we want to call closeForm there:

```javaScript
const { mutate: updateRating, onDone } = useMutation(
  UPDATE_BOOK_MUTATION,
  () => ({
    variables: {
      id: props.bookId,
      rating: parseFloat(rating.value),
    },
  })
)

onDone(() => {
  emit('closeForm')
})
```

Note

Now the form waits to close until we have a response from our GraphQL API.

## Handling loading and error states

It would be nice to also somehow indicate that there is a mutation in progress. Let’s display a text “Updating” right below the input field and disable the input when we are waiting for the mutation response.

In order to do so, we need to return loading property first from the useMutation call:

```javaScript
const { mutate: updateRating, onDone, loading } = useMutation(
  UPDATE_BOOK_MUTATION,
  () => ({
    variables: {
      id: props.bookId,
      rating: parseFloat(rating.value),
    },
  })
)
```

In order to use this new property in the template, we need to remember to return it from the setup()

```javaScript
setup(props, { emit }) {
  const rating = ref(props.initialRating)

  const { mutate: updateRating, onDone, loading } = useMutation(
    UPDATE_BOOK_MUTATION,
    () => ({
      variables: {
        id: props.bookId,
        rating: +rating.value,
      },
    })
  )

  onDone(() => {
    emit('closeForm')
  })

  return { rating, updateRating, loading }
},
```

As you probably noticed, we are not returning onDone. This is because we don’t call it elsewhere outside of the setup.

Now, let’s modify our template to display that loading message:

```javaScript
<template>
  <input
    type="text"
    v-model="rating"
    :disabled="loading"
    @keyup.enter="updateRating"
    @keyup.esc="$emit('closeForm')"
  />
  <p v-if="loading">Updating...</p>
</template>
```

Now the UI reflects when our mutation is loading:

### Handling Errors

The last (but very important!) change is handling an error. Similarly to loading, useMutation returns an error property:

```javaScript
const { mutate: updateRating, onDone, loading, error } = useMutation(
  UPDATE_BOOK_MUTATION,
  () => ({
    variables: {
      id: props.bookId,
      rating: +rating.value,
    },
  })
)
```

After returning it from the setup , we can use this property to render an error message for the user:

```javaScript
<template>
  <input
    type="text"
    v-model="rating"
    :disabled="loading"
    @keyup.enter="updateRating"
    @keyup.esc="$emit('closeForm')"
  />
  <p v-if="loading">Updating...</p>
  <p v-if="error">{{ error }}</p>
</template>
```

Now, in the updateBook mutation let’s change the mutation name to trigger an error:

📃 graphql/updateBook.mutation.gql

```javaScript
mutation UpdateBook($id: ID!, $rating: Float) {
  randomName(input: { id: $id, rating: $rating }) {
    id
    title
    rating
  }
}
```

After editing rating and pressing Enter we will be able to see an error message:

## Using fragments

If we take a look at our query and mutation, we can see they both share the same fields:no

Query:

```javaScript
query AllBooks($search: String) {
  allBooks(search: $search) {
    id
    title
    rating
  }
}
```

```javaScript
mutation UpdateBook($id: ID!, $rating: Float) {
  updateBook(input: { id: $id, rating: $rating }) {
    id
    title
    rating
  }
```

Of course, in our case it’s only three lines, but imagine if there were 30. Is there any way to reuse the same set of fields across different queries?

Yes! And it’s called GraphQL fragments. Fragments let you construct sets of fields, and then include them in queries where you need to.

Let’s create a new file called book.fragment.gql and add a new fragment to it:

📃 book.fragment.gql

```javaScript
fragment BookFragment on Book {
  id
  title
  rating
}
```

Here BookFragment is a fragment name. It’s defined by the developer so you can choose whatever name you prefer. Book is a type on which we create a fragment. This must be a valid GraphQL type specified in your schema, and your fragment can only include fields that exist on this type.

Now, let’s make use of this fragment. In our allBooks query, we will import the fragment and replace the mentioned three fields with it.

📃 allBooks.query.gql

```javaScript
#import './book.fragment.gql'

query AllBooks($search: String) {
  allBooks(search: $search) {
    ...BookFragment
  }
}

```

Remember to use spread operator when using a fragment!

Let’s do the same for the mutation:

📃 updateBook.mutation.gql

```javaScript
#import './book.fragment.gql'

mutation UpdateBook($id: ID!, $rating: Float) {
  updateBook(input: { id: $id, rating: $rating }) {
    ...BookFragment
  }
}

```

Now, if we decide to change the set of the fields we are working with, we can make these changes on the fragment and they will apply to both the query and mutation
