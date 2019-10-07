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

function addAuthor(authorInput) {
  const author = {
    id: new Date().getTime().toString(),
    name: authorInput.name,
    biography: authorInput.biography,
    birthday: authorInput.birthday,
  }
  authors.push(author)
  return author
}

function getAuthorById(authorId) {
  return authors.find(author => author.id === authorId)
}

function getAuthorName(authorId) {
  return authors.find(author => author.id === authorId).name
}

module.exports = {
  addAuthor,
  getAuthors,
  getAuthorById,
  getAuthorName,
}
