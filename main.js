const bookList = document.querySelector('#books-list')
const newBookButton = document.querySelector('#addNewBook')
const newBookPopup = document.querySelector('#newBookPopup')
const popupCancelButton = document.querySelector('#popupCancelButton')
const popupForm = document.querySelector('#popupForm')
const popupFormInputs = document.querySelectorAll('#popupForm input:not([value="Save"])')

class Book {
    constructor(options) {
        this.name = options.name
        this.author = options.author
        this._read = options.read
        this.pages = options.pages
    }

    set readed(value) {
        this._read = value
    }
  }

let myLibrary = [
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

function  r(checkBox) {
    if (checkBox.checked) {
        checkBox.checked = false
        myLibrary[checkBox.dataset.index].readed = false
        console.log(myLibrary)
    } else {
        checkBox.checked = true
        myLibrary[checkBox.dataset.index].readed = true
        console.log(myLibrary)
    }
    render()
}

function render() {
    bookList.innerHTML = ''
    myLibrary.forEach((book, index) => {
        bookList.innerHTML += `<li class="books-list-item">
        <p class="name">${book.name}</p>
        <p class="author">${book.author}</p>
        <p class="pages">${book.pages}</p>
        <input type="checkbox" name="readStatus" onclick="r(this)" ${(book.read) ? 'checked' : null} 
        data-index="${index}">
        <button data-index="${index}">Delete</button>
    </li>`
    })
}

render()
bound()