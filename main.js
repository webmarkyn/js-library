const bookList = document.querySelector('#books-list')
const newBookButton = document.querySelector('#addNewBook')
const newBookPopup = document.querySelector('#newBookPopup')
const popupCancelButton = document.querySelector('#popupCancelButton')
const popupForm = document.querySelector('#popupForm')
const popupFormInputs = document.querySelectorAll('#popupForm input:not([value="Save"])')

console.log(bookList)

class Book {
    constructor(options) {
        this.name = options.name
        this.author = options.author
        this.read = options.read
        this.pages = options.pages
    }
  }

const myLibrary = [
    new Book({
        name: 'Book 1',
        author: 'Author 1',
        read: false,
        pages: 35
    }),

];

function bound() {
    newBookButton.addEventListener('click', e => {
        newBookPopup.style.display = 'flex'
    })
    popupCancelButton.addEventListener('click', e => {
        newBookPopup.style.display = 'none'
    })
    popupForm.addEventListener('submit', e => {
        e.preventDefault()
        addBookToLibrary()
        newBookPopup.style.display = 'none'
    })
}


function addBookToLibrary() {
    let options = {};
    [...popupFormInputs].forEach(el => {
        options[el.name] = el.value == 'on' ? el.checked : el.value
    });
    let newBook = new Book(options);
    myLibrary.push(newBook)
    render()
}

function render() {
    bookList.innerHTML = ''
    myLibrary.forEach((book, index) => {
        bookList.innerHTML += `<li class="books-list-item">
        <p class="name">${book.name}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages}</p>
        <input type="checkbox" name="readStatus" id="readStatus" ${(book.read) ? 'checked' : null}>
        <button data-index="${index}">Delete</button>
    </li>`
    })
}

render()
bound()