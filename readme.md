# GraphQL Walkthru

The files in this project show you how to create a simple GraphQL server and progressively add more functionality.

Slides are in the docs directory.

## Getting Started with index.js

This is the most basic example demonstrating how to setup a GraphQL server with one query.

```
$ npm i
$ node index.js
```

From the browser go to http://localhost:4000 to see the playground.

On the left side of the window enter this command, then press the round play button.

```
{
  getMessage
}
```

This will return the string 'Hello '

A parameter can be provided to add to the name

```
{
  getMessage(params: "World")
}
```

This will return the string 'Hello World'

---

Each index file below is a stand-alone example to introduce a concept. For each test stop the server and restart using the new index file.

### [index2-getBooks.js](docs/index2.md)

Demonstrates a graphQL query to get books from a simulated back-end data provider.

### [index3-addBooks.js](docs/index3.md)

Demonstrates a mutation query to add a book.

### [index4-updateDeleteBooks.js](docs/index4.md)

Demonstrates mutation queries to delete and update a book

### [Basic Client](docs/clientBasic.md)

A simple html page that demonstrates how to call the GraphQL server from the front-end.
