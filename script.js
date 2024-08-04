const content = document.getElementById("content");
const main = document.getElementById("main");
const form = document.getElementById("form");
const add = document.getElementById("add-btn");
const cancel = document.getElementById("cancel-btn");
const dialog = document.getElementById("form-dialog");
const addBook = document.getElementById("add-book-btn");

const library = [];
const defaultImage = "images/Apple_Cat.webp";

function Book(title, author, pages, isRead, src) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.src = src;
}

Book.prototype.toggleRead = function () {
  this.isRead = !this.isRead;
};

const addBookToLibrary = (title, author, pages, isRead, src) => {
  const book = new Book(title, author, pages, isRead, src);
  library.push(book);
  displayBooks();
};

const displayBooks = () => {
  main.textContent = "";
  library.forEach((book, index) => {
    const card = document.createElement("div");
    card.dataset.index = index;
    card.classList.add("card");

    const imageDiv = document.createElement("div");
    imageDiv.id = "image-div";

    const img = document.createElement("img");
    img.src = book.src;
    img.alt = `Cover of ${book.title}`;
    img.classList.add("card-image");

    img.onerror = () => {
      img.src = defaultImage;
    };

    const infoDiv = document.createElement("div");
    infoDiv.id = "info-div";

    const divDel = document.createElement("div");
    divDel.classList.add("delete-btn-div");

    const del = document.createElement("button");
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("width", "24");
    svg.setAttribute("height", "24");

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute(
      "d",
      "M12,20C7.59,20 4,16.41 4,12C4,7.59 7.59,4 12,4C16.41,4 20,7.59 20,12C20,16.41 16.41,20 12,20M12,2C6.47,2 2,6.47 2,12C2,17.53 6.47,22 12,22C17.53,22 22,17.53 22,12C22,6.47 17.53,2 12,2M14.59,8L12,10.59L9.41,8L8,9.41L10.59,12L8,14.59L9.41,16L12,13.41L14.59,16L16,14.59L13.41,12L16,9.41L14.59,8Z"
    );
    path.setAttribute("fill", "currentColor");
    path.setAttribute("stroke", "none");

    svg.appendChild(path);

    del.appendChild(svg);
    del.classList.add("delete-btn");
    del.addEventListener("click", () => {
      library.splice(index, 1);
      displayBooks();
    });

    const title = document.createElement("div");
    title.textContent = book.title;
    title.classList.add("card-title");

    const author = document.createElement("div");
    author.textContent = `By ${book.author}`;
    author.classList.add("card-author");

    const pages = document.createElement("div");
    pages.textContent = `${book.pages} pages`;
    pages.classList.add("card-pages");

    const status = document.createElement("div");
    status.textContent = `Status: ${book.isRead ? "read" : "not read yet"}`;
    status.addEventListener("click", () => {
      book.toggleRead();
      displayBooks();
    });
    status.classList.add("card-status");

    imageDiv.appendChild(img);
    divDel.appendChild(del);
    infoDiv.appendChild(divDel);
    infoDiv.appendChild(title);
    infoDiv.appendChild(author);
    infoDiv.appendChild(pages);
    infoDiv.appendChild(status);
    card.appendChild(imageDiv);
    card.appendChild(infoDiv);
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
  const cover = document.getElementById("cover").value;
  const status = document.getElementById("status").checked;
  addBookToLibrary(title, author, pages, status, cover);
  dialog.close();
};

addBookToLibrary(
  "Oathbringer",
  "Brandon Sanderson",
  1248,
  true,
  "https://upload.wikimedia.org/wikipedia/en/5/5d/Brandon_Sanderson_Oathbringer_book_cover.jpg"
);
addBookToLibrary(
  "The Hero of Ages",
  "Brandon Sanderson",
  741,
  true,
  "https://m.media-amazon.com/images/I/91L6dDhrftL._SY425_.jpg"
);
addBookToLibrary(
  "Lord of Chaos",
  "Robert Jordan",
  720,
  true,
  "https://static.wikia.nocookie.net/wot/images/4/47/LOC_Ebook_cover.jpg/"
);

dialog.close();
