const bookList = document.querySelector("#books-list"),
  newBookButton = document.querySelector("#addNewBook"),
  newBookPopup = document.querySelector("#newBookPopup"),
  popupCancelButton = document.querySelector("#popupCancelButton"),
  popupForm = document.querySelector("#popupForm"),
  popupFormInputs = document.querySelectorAll(
    '#popupForm input:not([value="Save"])'
  );

class Book {
  constructor(options) {
    this.name = options.name;
    this.author = options.author;
    this._read = options.read;
    this.pages = options.pages;
  }

  set read(value) {
    this._read = value;
  }
}

let myLibrary = [
  new Book({
    name: "Book 1",
    author: "Author 1",
    read: false,
    pages: 35
  })
];

function bound() {
  newBookButton.addEventListener("click", e => {
    newBookPopup.style.display = "flex";
  });
  popupCancelButton.addEventListener("click", e => {
    newBookPopup.style.display = "none";
    cleanForm();
  });
  popupForm.addEventListener("submit", e => {
    e.preventDefault();
    addBookToLibrary();
    newBookPopup.style.display = "none";
  });
}

function addBookToLibrary() {
  let options = {};
  [...popupFormInputs].forEach(el => {
    options[el.name] = el.value == "on" ? el.checked : el.value;
  });
  let newBook = new Book(options);
  myLibrary.push(newBook);
  cleanForm();
  render();
}

function cleanForm() {
  [...popupFormInputs].forEach(el => {
    el.value = "";
    el.checked = false;
  });
}

function handleCheck(checkBox) {
  myLibrary[checkBox.dataset.index].read = checkBox.checked;
}

function handleDelete(el) {
  myLibrary.splice(el.dataset.index, 1);
  render();
}

function render() {
  bookList.innerHTML = "";
  myLibrary.forEach((book, index) => {
    bookList.innerHTML += `<li class="books-list-item">
        <p class="name">${book.name}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages}</p>
        <input type="checkbox" name="readStatus" onchange="handleCheck(this)" ${
          book._read ? "checked" : null
        } 
        data-index="${index}">
        <button data-index="${index}" onclick="handleDelete(this)" class="bookDelete">Delete</button>
    </li>`;
  });
}

render();
bound();
