const content = document.getElementById('content')

const library = []

function Book(title, author, pages, isRead) {
  this.title = title
  this.author = author
  this.pages = pages
  this.isRead = isRead
}

Book.prototype.toggleRead = function () {
  this.isRead ? this.isRead = false : this.isRead = true 
}

const addBookToLibrary = (title, author, pages, isRead) => {
  const book = new Book(title, author, pages, isRead)
  library.push(book)
}

const displayBooks = () => {
  library.forEach((book, index) => {

    const card = document.createElement('div')
    card.dataset.index = index
    card.classList.add('card')

    const del = document.createElement('button')
    del.textContent = 'x'
    del.classList.add('delete-btn')

    const title = document.createElement('div')
    title.textContent = book.title
    title.classList.add('card-title')

    const author = document.createElement('div')
    author.textContent = `By ${book.author}`
    author.classList.add('card-author')
    
    const pages = document.createElement('div')
    pages.textContent = `Pages: ${book.pages}`
    pages.classList.add('card-pages')

    const status = document.createElement('div')
    status.textContent = `Status: ${book.isRead ? 'read' : 'not read yet'}`
    status.classList.add('card-status')

    card.appendChild(del)
    card.appendChild(title)
    card.appendChild(author)
    card.appendChild(pages)
    card.appendChild(status)
    content.appendChild(card)
  })
}





addBookToLibrary('Oathbringer','Brandon Sanderson', 1248, true)
addBookToLibrary('The Hero of Ages','Brandon Sanderson', 741 , true)
addBookToLibrary('Lord of Chaos','Robert Jordan', 720, true)