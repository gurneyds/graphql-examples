# index2-getBooks.js

Adds some simple JSON to simulate a back-end data provider. Adds some schema definition language (SDL) to define a Book. Adds a query to return the list of books. Optional parameters can be provided to filter the list.

```
node index2-getBooks.js
```

Here is an example query in playground to get the list of books:

```
{
  getBooks {
    id
    title
    author
  }
}
```

To filter the books parameters can be provided:

```
{
  getBooks(params: {author: "J.K. Rowling", title:"Harry Potter and the Chamber of Secrets"}) {
    id
    title
    author
  }
}
```
