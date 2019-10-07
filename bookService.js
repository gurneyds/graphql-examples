const books = [
  {
    id: '1',
    title: 'Harry Potter and the Sorcers Stone',
    authorId: 65,
  },
  {
    id: '2',
    title: 'Harry Potter and the Chamber of Secrets',
    authorId: 65,
  },
  {
    id: '3',
    title: 'Jurassic Park',
    authorId: 77,
  },
  {
    id: '4',
    title: 'Airframe',
    authorId: 77,
  },
]

function getBooks(bookInput) {
  // Filter by each key if found
  let returnedBooks = books
  ;['id', 'author', 'title'].forEach(key => {
    if (bookInput && bookInput[key]) {
      returnedBooks = returnedBooks.filter(book => book[key] === params[key])
    }
  })

  return returnedBooks
}

function addBook(bookInput) {
  // Generate a random id and add the book to the collection
  bookInput.id = new Date().getTime().toString()
  console.log('bookInput=>', bookInput)
  books.push(bookInput)
  return bookInput
}

function deleteBook(bookId) {
  const index = books.findIndex(book => book.id === bookId)
  if (index >= 0) {
    return books.splice(index, 1)[0]
  }
}

function updateBook(bookInput) {
  const book = books.find(book => book.id === bookInput.id)
  if (book) {
    if (bookInput.title) {
      book.title = bookInput.title
    }
    if (bookInput.author) {
      book.author = bookInput.author
    }
    return book
  }
}

module.exports = {
  addBook,
  deleteBook,
  getBooks,
  updateBook,
}
