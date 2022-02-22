# Improving Developer Experience

Now that we’ve made progress getting GraphQL up and running, it’s a good time to pause to make some optimizations for our developer experience before we go deeper.

## Loading .gql files

Creating a string-based constant for every single query is not very convenient. For strings, we don’t have proper autocomplete. More to say, having multiple string queries in Vue component will crowd it and make reusing the same query harder. We are going to put our queries in external .gql files that can be imported directly into any component.

The way to set this up depends on whether you’re using Vite or Vue CLI.

We are going to start with Vite first.

## For Vite apps

First, we need to install a rollup plugin:

Since this rollup plugin is compatible with Vite, we can use it as a Vite plugin.

To use this new plugin, we have to go to vite.config.js. Import the plugin and use it inside the plugins array:

## For Vue CLI apps

Now for Vue CLI, we don’t have to install any additional plugin.

We need to create a vue.config.js file in the root of the project, and add a proper webpack configuration there:

```javaScript
module.exports = {
  chainWebpack: config => {
    config.module
      .rule('graphql')
      .test(/\.(graphql|gql)$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end()
  },
}
```

## Extracting the query to its own file

Our app is now capable of recognizing import files with the gql extension.

Now we can create a new folder called graphql and add a file inside called allBooks.query.gql, which contains our query:

## Code Highlighting and Autocompletion

So far our code looks very plain without any code highlighting. Also, it would be nice to have some linting and autocomplete on GraphQL files. Using GraphQL schema allows us to do this with ease: any data you can fetch from the GraphQL server is typed. This means that for any piece of data there is a defined set of fields, and they can be validated against the schema.

There are a few IDE plugins that can validate GraphQL queries against the schema and enable linting and autocomplete. To improve the developer experience a bit, we can install an IDE plugin: Apollo GraphQL for Visual Studio code or JS GraphQL plugin for WebStorm.

As soon as the extension is installed, you should then see your GraphQL code is highlighted

## Browser Developer Tools for Easier Debugging

As a final step to improve developer experience, we can install Apollo DevTools (currently available for Chrome and Firefox). After the installation. when running an application in the browser, we should have one more tab in the browser devtools:

Here we have a GraphQL playground tab where we can check the schema and run queries, get a list of the called queries and mutations, and also the cache*.* The cache is very important when we work with Apollo client because, by default, the result of every query is cached. When we send the query subsequently, we are not making a network request, instead we retrieve the data from the Apollo cache. We will look deeper into Apollo caching later
