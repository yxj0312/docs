# Overview

## What is Nuxt?

Nuxt is a framework built on top of Vue that allows us to overcome some of the inherent problems with a single page application (aka SPA).

## Why do we need Nuxt?

The primary issue with an SPA with search engine optimization (aka SEO). This is a big topic in itself, but the gist is that it web page contains various pieces of information that can be read by the search engine bots when they index the page. The more information that can be indexed, the higher chance the page has of being found by the search engines.

Nuxt addresses this by either a) generating the content on the server side, and sending fully rendered HTML to the templates, or b) generating static HTML pages, which is far and away the quickest way to provide content to a browser.

Let’s talk about these two approaches real quick.

There are two popular approaches to start a modern web project. First, there is Server Side Rendering, or SSR for short. When a client makes a request to a server, SSR will render the page in real time on the server. Because the page is rendered in real time, it will always be up to date.

Now in contrast, Static Site Generation, or SSG for short, renders all of the pages of your website at build time, which is the time before your website gets deployed. Since our pages have already been rendered beforehand, when the client is making a request, it just needs to send back the right page. Different from SSR, there is no rendering taking place on the server in real time; it got all taken care of at build time, so it’s faster.

In addition, because there are no API or database connections, and there are no logins and user accounts, there are no security concerns.

We will demonstrate how to deploy your site in both ways at the end of the course.

## What other features does Nuxt provide?

One of the primary benefits is that Nuxt come preconfigured with sensible defaults. WIth a regular Vue app, you would have to do a lot more manual configuration. For instance, Nuxt already includes Vue Router and Vue Meta, among other things.

One primary feature of Nuxt is how routes are generated. In a Vue SPA, the user is responsible for creating the various routes for the app and the associated components in a large config file. Nuxt uses the folder structure under the /pages directory to automatically configure Vue Router for you and generate your URLs. For instance, if you create /pages/about.vue , you can access the content of about.vue at <a href="http://mysite.com/about" target="blank">mysite.com/about</a> there are a couple of other options that we will discuss later, but the beauty of this approach is that all you have to do is create your directories and components, and Nuxt handles the route configuration for you.

Another common need for a larger site is custom layouts. For instance, you might want to have a layout for your front page, another layout for article pages, another layout for product pages, and another layout for FAQ pages. With Nuxt, you can easily create custom layouts, and then apply them to your components as desired.

## What we will cover in this course

- Installing Nuxt
- Editing component content
- Creating a custom layout
- Using directory structure to define URLs
- Passing dynamic values to the component from the URL
- Consuming data from an external API
- Creating a server API endpoint
- Using useFetch to get data
- Using the composition API

## Prerequisites

- Computer with nodejs installed
- Code editor (we will be using Visual Studio code)
- Basic familiarity with Vue.js
