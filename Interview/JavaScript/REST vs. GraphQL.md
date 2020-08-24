# REST vs. GraphQL

## GraphQl is better than REST

### Over/under Fetching

#### REST

**Over-fetching** data

because each endpoint in a REST API has a fixed data structure (even when we just need parts of them).

**Under-fetching** data 

because sometimes we need to perform additional requests to fetch associated data

#### GraphQL

has no such issue. because GraphQL is a declarative data fetching specification and a query language,
we only fetch what we need from the server by constructing our query.

### Versioning

#### REST

REST API versioning like v1, v2, v3 etc leads to code redundancy and less maintainable code

#### GraphQl

We can add new fields and types to our GraphQL API without impacting existing queries. Also, we can mark fields as deprecated and the fields will be excluded from the response gotten from the server.

## REST is better than GraphQL

### Caching

#### REST

Using HTTP, the client can use HTTP caching to avoid refetching resources.

#### GraphQL

has no caching mechanism, hence leadving the clients with the responsibility of taking care of caching on their end.

### Error Handling

#### REST

give the HTTP status code (100, 200. 300. 400...), we can know what the error is and how to go about resolving it.

#### GraphQL

always get a 200 OK response status. When an error occurs while processing GraphQL queries, the complete error message is sent to the client.

### Potential drawbacks of GraphQL

#### Complexity

using GraphQl in a simple application is not recommended, because it adds more complexity like:
Types. Queries, Mutators etc, which is not good from a maintenance presprective.

#### Performance

if a client sends a query asking for a lot of fields and resources, it may produce a performance issues

**Both above drawbacks means a GraphQL API must be carefully designed.**

### A mixture of GraphQL and REST

A GraphQl could not replace A REST API, because these above mentioned drawbacks. 
Hence the best way to take the advantage of both of them is a "mixture" of them.
Here is a good article which is worthy to read: [A Rest view of GraphQL](https://hasura.io/blog/rest-view-of-graphql/)

### Third API-Paradigm

#### SOAP

a protocol which is used to interchange data between applications. It is build upon the XML specification.

#### When should I use SOAP API

SOAP is good for applications that require formal contracts between the API and consumer since it can enforce the use of formal contracts by using WSDL.

Which means it is convenient and can increase security in some asynchronous execution and processing, like third party apis
