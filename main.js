const bookList = document.querySelector('#books-list');
const newBookButton = document.querySelector('#addNewBook');
const newBookPopup = document.querySelector('#newBookPopup');
const popupCancelButton = document.querySelector('#popupCancelButton');
const popupForm = document.querySelector('#popupForm');
const popupFormInputs = document.querySelectorAll('#popupForm input:not([value="Save"])');

class Book {
  constructor(options) {
    this.name = options.name;
    this.author = options.author;
    this.read = options.read;
    this.pages = options.pages;
  }
}

const myLibrary = [
  new Book({
    name: 'Book 1',
    author: 'Author 1',
    read: false,
    pages: 35,
  }),
];

function render() {
  bookList.innerHTML = '';
  myLibrary.forEach((book, index) => {
    bookList.innerHTML += `<li class="books-list-item">
        <p class="name">${book.name}</p>
        <p class="author">${book.author}</p>
        <p class="pages">Pages: ${book.pages}</p>
        <input type="checkbox" name="readStatus" onchange="handleCheck(this)" ${
  book.read ? 'checked' : null
} 
        data-index="${index}">
        <button data-index="${index}" onclick="handleDelete(this)" class="bookDelete">Delete</button>
    </li>`;
  });
}

function cleanForm() {
  [...popupFormInputs].forEach((el) => {
    if (el.type === 'checkbox') {
      // eslint-disable-next-line no-param-reassign
      el.checked = false;
    } else {
      // eslint-disable-next-line no-param-reassign
      el.value = '';
    }
    // eslint-disable-next-line no-param-reassign
    el.checked = false;
  });
}

function bound() {
  newBookButton.addEventListener('click', () => {
    newBookPopup.style.display = 'flex';
  });
  popupCancelButton.addEventListener('click', (e) => {
    e.preventDefault();
    newBookPopup.style.display = 'none';
    cleanForm();
  });

  function addBookToLibrary() {
    const options = {};
    [...popupFormInputs].forEach((el) => {
      options[el.name] = el.value === 'on' ? el.checked : el.value;
    });
    const newBook = new Book(options);
    myLibrary.push(newBook);
    cleanForm();
    render();
  }

  popupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const filled = [...popupFormInputs].every(el => el.value);
    if (filled) {
      addBookToLibrary();
      newBookPopup.style.display = 'none';
    } else {
      [...popupFormInputs].forEach((el) => {
        if (!el.value) {
          // eslint-disable-next-line no-param-reassign
          el.style.background = 'red';
        }
      });
    }
  });
}


// eslint-disable-next-line no-unused-vars
function handleCheck(checkBox) {
  myLibrary[checkBox.dataset.index].read = checkBox.checked;
}

// eslint-disable-next-line no-unused-vars
function handleDelete(el) {
  myLibrary.splice(el.dataset.index, 1);
  render();
}

render();
bound();
