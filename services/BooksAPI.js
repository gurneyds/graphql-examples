const { RESTDataSource } = require('apollo-datasource-rest')
const buildFilters = require('./buildFilters')
const AuthorsAPI = require('./AuthorsAPI')

class BooksAPI extends RESTDataSource {
  constructor(baseUrl) {
    super()
    if (baseUrl) {
      this.baseURL = baseUrl
    } else {
      throw new Error('Missing baseURL in constructor')
    }
  }

  async getBooks(bookInput) {
    const filters = buildFilters(bookInput)
    const response = await this.get(`books${filters}`, null, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    })
    return response
  }

  async deleteBook(bookId) {
    const response = await this.delete(`books/${bookId}`, null, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return bookId
  }

  async updateBook(bookInput) {
    // Get the existing item and then merge with the incoming data
    const books = await this.getBooks({ id: bookInput.id })
    const newBook = Object.assign(books[0], bookInput)

    const response = await this.put(
      `books/${bookInput.id}`,
      JSON.stringify(newBook),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  }

  async addBook(bookInput) {
    const response = await this.post('books', JSON.stringify(bookInput), {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  }
}

module.exports = BooksAPI
