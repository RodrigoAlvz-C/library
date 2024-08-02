const library = []

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

Book.prototype.toggleRead = function () {
  this.isRead === true ? this.isRead = false : this.isRead = true 
}

const addBookToLibrary = (title, author, pages, isRead) => {
  const book = new Book(title, author, pages, isRead)
  library.push(book)
}

