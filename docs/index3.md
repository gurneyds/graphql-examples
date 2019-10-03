# index3-addBooks.js

```
node index3-addBooks.js
```

Adds a mutation query to add a book.

```
type Mutation {
    addBook(params: BookInput): Book!
    ...
}
```

Adds a mutation resolver that adds a book:

```
  Mutation: {
    addBook: (_, { params: bookInput }) => {
      // Generate a random id and add the book to the collection
      bookInput.id = new Date().getTime().toString()
      books.push(bookInput)
      return bookInput
    },
  },
```

When the addBook mutation query is requested then this resolver code is run. The params input is renamed to bookInput to make the code read better.

Here is an example query in playground to add a book:

```
mutation {
  addBook(params: {title:"MyBook", author: "Me"}) {
    id
    title
    author
  }
}
```

After clicking on the play button the response will show the newly added book. Notice that the id has been generated.

Output on the right:

```
{
  "data": {
    "addBook": {
      "id": "1570119131347",
      "title": "MyBook",
      "author": "Me"
    }
  }
}
```
