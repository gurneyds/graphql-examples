# index4-updateDeleteBooks.js

Adds additional mutation queries for deleting a book and for updating a book.

Adds new mutation queries:

```
  type Mutation {
    addBook(params: BookInput): Book!
    updateBook(params: BookInput): Book! # Update an existing book, return the updated book
    deleteBook(params: ID!): Book! # Delete a book by ID, return the deleted book
  }
```

Adds mutation resolvers to actually delete and update a book.

```
    deleteBook: (_, { params: id }) => {
      const index = books.findIndex(book => book.id === id)
      if (index >= 0) {
        return books.splice(index, 1)[0]
      }
    },
    updateBook: (_, { params: bookInput }) => {
      const book = books.find(book => book.id === bookInput.id)
      if (book) {
        if (bookInput.title) {
          book.title = bookInput.title
        }
        if (bookInput.author) {
          book.author = author
        }
        return book
      }
    },
```

Here is an example query in playground to delete a book:

```
mutation {
  deleteBook(params: "1") {
    id
    title
    author
  }
}
```

The deleted book will be shown on the left.

```
{
  "data": {
    "deleteBook": {
      "id": "1",
      "title": "Harry Potter and the Sorcers Stone",
      "author": "J.K. Rowling"
    }
  }
}
```

Here is an example query in playground to update an existing book:

```
mutation {
  updateBook(params: {id: "1", title:"Updated title", author:"Updated Author"}) {
    id
    title
    author
  }
}
```

After running, the updated book will be shown on the right.

```
{
  "data": {
    "updateBook": {
      "id": "1",
      "title": "Updated Title",
      "author": "Updated Author"
    }
  }
}
```

Within playground there is another way to specify the parameters. Use this query instead:

```
mutation($id: ID, $title: String, $author: String) {
  updateBook(params: {id:$id, title:$title, author:$author}) {
    id
    title
    author
  }
}
```

Then at the bottom of the page there is a 'QUERY VARIABLES" area. Enter the following:

```
{
  "id": "1",
  "title": "My Title2",
  "author": "Me2"
}
```

Again the updated book will be shown on the right.

```
{
  "data": {
    "updateBook": {
      "id": "1",
      "title": "My Title2",
      "author": "Me2"
    }
  }
}
```
