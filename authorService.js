const authors = [
  {
    id: 65,
    name: 'J.K. Rowling',
    biography: 'J.K. Rowling has been working on books most of her life...',
    birthday: '31 July 1965',
  },
  {
    id: 77,
    name: 'Michael Crichton',
    biography: 'Michael Crichton is best know for his book...',
    birthday: '23 October 1942',
  },
]

function getAuthors(authorInput) {
  // Filter by each key if found
  let returnedAuthors = authors
  ;['id', 'name', 'biography', 'birthday'].forEach(key => {
    if (authorInput && authorInput[key]) {
      returnedAuthors = returnedAuthors.filter(
        author => author[key] === params[key],
      )
    }
  })

  return returnedAuthors
}

function addUpdateAuthor(authorInput) {
  // Check to see if the author already exists
  let author = authors.find(author => {
    if (authorInput.id) {
      return author.id === authorInput.id1
    } else if (authorInput.name) {
      return author.name === authorInput.name
    }
  })

  if (author) {
    // Copy the input fields to the author
    author = Object.assign(author, authorInput)
  } else {
    // Create a brand new author
    author = {
      id: new Date().getTime().toString(),
      name: authorInput.name,
      biography: authorInput.biography,
      birthday: authorInput.birthday,
    }

    // Add to the list of authors
    authors.push(author)
  }

  return author
}

function getAuthorById(authorId) {
  return authors.find(author => author.id === authorId)
}

function getAuthorName(authorId) {
  return authors.find(author => author.id === authorId).name
}

module.exports = {
  addUpdateAuthor,
  getAuthors,
  getAuthorById,
  getAuthorName,
}
