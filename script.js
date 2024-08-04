const content = document.getElementById("content");
const main = document.getElementById("main");
const form = document.getElementById("form");
const add = document.getElementById("add-btn");
const cancel = document.getElementById("cancel-btn");
const dialog = document.getElementById("form-dialog");
const addBook = document.getElementById("add-book-btn");

const library = [];

function Book(title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

Book.prototype.toggleRead = function () {
  this.isRead ? (this.isRead = false) : (this.isRead = true);
};

const addBookToLibrary = (title, author, pages, isRead) => {
  const book = new Book(title, author, pages, isRead);
  library.push(book);
};

const displayBooks = () => {
  library.forEach((book, index) => {
    const card = document.createElement("div");
    card.dataset.index = index;
    card.classList.add("card");

    const divDel = document.createElement("div");
    divDel.classList.add("delete-btn-div");

    const del = document.createElement("button");
    del.textContent = "x";
    del.classList.add("delete-btn");
    del.addEventListener("click", () => {
      library.splice(index, 1);
      reloadBooks();
    });

    const title = document.createElement("div");
    title.textContent = book.title;
    title.classList.add("card-title");

    const author = document.createElement("div");
    author.textContent = `By ${book.author}`;
    author.classList.add("card-author");

    const pages = document.createElement("div");
    pages.textContent = `Pages: ${book.pages}`;
    pages.classList.add("card-pages");

    const status = document.createElement("div");
    status.textContent = `Status: ${book.isRead ? "read" : "not read yet"}`;
    status.addEventListener("click", () => {
      book.isRead = !book.isRead;
      reloadBooks();
    });
    status.classList.add("card-status");

    divDel.appendChild(del);
    card.appendChild(divDel);
    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(status);
    main.appendChild(card);
  });
};

add.addEventListener("click", () => {
  dialog.showModal();
  form.reset();
});

cancel.addEventListener("click", () => {
  dialog.close();
  form.reset();
});

addBook.addEventListener("click", (e) => {
  e.preventDefault();
  addBookFromForm();
});

const addBookFromForm = () => {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.getElementById("status").checked;
  addBookToLibrary(title, author, pages, status);
  reloadBooks();
  dialog.close();
};

const reloadBooks = () => {
  main.textContent = "";
  displayBooks();
};

addBookToLibrary("Oathbringer", "Brandon Sanderson", 1248, true);
addBookToLibrary("The Hero of Ages", "Brandon Sanderson", 741, true);
addBookToLibrary("Lord of Chaos", "Robert Jordan", 720, true);

dialog.close();
displayBooks();
