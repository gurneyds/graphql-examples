const { RESTDataSource } = require('apollo-datasource-rest')
const buildFilters = require('./buildFilters')

class AuthorsAPI extends RESTDataSource {
  constructor(baseUrl) {
    super()
    if (baseUrl) {
      this.baseURL = baseUrl
    } else {
      throw new Error('Missing baseURL in constructor')
    }
  }

  async getAuthors(authorInput) {
    const filters = buildFilters(authorInput)
    const response = await this.get(`authors${filters}`, null, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    })
    return response
  }

  async getAuthorById(authorId) {
    const response = await this.get(`authors/${authorId}`, null, {
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
    })
    return response
  }

  async addAuthor(authorInput) {
    const response = await this.post('authors', JSON.stringify(authorInput), {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return response
  }

  async deleteAuthor(authorId) {
    const response = await this.delete(`authors/${authorId}`, null, {
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    return authorId
  }

  async updateAuthor(authorInput) {
    // Get the existing item and then merge with the incoming data
    const author = await this.getAuthorById(authorInput.id)
    const newAuthor = Object.assign(author, authorInput)

    const response = await this.put(
      `authors/${authorInput.id}`,
      JSON.stringify(newAuthor),
      {
        headers: {
          accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    )
    return response
  }

  async addUpdateAuthor(authorName) {
    let author

    // Check to see if there is already an author by the incoming name
    let authors = await this.getAuthors({ name: authorName })
    if (authors && authors.length > 0) {
      author = await this.updateAuthor(authors[0])
    } else {
      author = await this.addAuthor({ name: authorName })
    }
    return author
  }
}

module.exports = AuthorsAPI
