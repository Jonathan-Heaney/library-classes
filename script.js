'use strict';

const openAddBook = document.getElementById('add-btn');
const overlay = document.getElementById('overlay');
const modal = document.getElementById('modal');
const form = document.getElementById('new-book-form');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const cardGrid = document.querySelector('.card-grid');

openAddBook.addEventListener('click', () => {
  openModal(modal);
  form.reset();
});

overlay.addEventListener('click', () => {
  closeModal(modal);
});

function openModal(modal) {
  if (modal == null) return;
  modal.classList.add('active');
  overlay.classList.add('active');
}

function closeModal(modal) {
  if (modal == null) return;
  modal.classList.remove('active');
  overlay.classList.remove('active');
}

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(event) {
  const newTitle = event.currentTarget.title.value;
  const newAuthor = event.currentTarget.author.value;
  const newPages = event.currentTarget.pages.value;
  const newRead = event.currentTarget.read.checked;
  const newBook = new Book(newTitle, newAuthor, newPages, newRead);
  myLibrary.push(newBook);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  addBookToLibrary(event);
  closeModal(modal);
  showBooks();
});

function showBooks() {
  for (let i = 0; i < myLibrary.length; i++) {
    if (myLibrary[i].displayed) {
      continue;
    } else {
      addCard(myLibrary[i]);
      myLibrary[i].displayed = true;
    }
  }
}

function addCard(item) {
  const newCard = document.createElement('div');
  newCard.classList.add('card');
  cardGrid.appendChild(newCard);

  const cardTitle = document.createElement('h3');
  cardTitle.textContent = `${item.title}`;
  cardTitle.style.fontStyle = 'italic';
  newCard.appendChild(cardTitle);

  const cardAuthor = document.createElement('h3');
  cardAuthor.textContent = `${item.author}`;
  newCard.appendChild(cardAuthor);

  const cardPages = document.createElement('h3');
  cardPages.textContent = `${item.pages} pages`;
  newCard.appendChild(cardPages);

  const cardRead = document.createElement('button');
  if (item.read) {
    cardRead.textContent = 'Read';
    cardRead.classList.add('read');
  } else if (!item.read) {
    cardRead.textContent = 'Not Read';
    cardRead.classList.add('not-read');
  }
  newCard.appendChild(cardRead);

  cardRead.addEventListener('click', () => {
    if (item.read) {
      item.read = false;
      cardRead.textContent = 'Not Read';
      cardRead.classList.remove('read');
      cardRead.classList.add('not-read');
    } else if (!item.read) {
      item.read = true;
      cardRead.textContent = 'Read';
      cardRead.classList.remove('not-read');
      cardRead.classList.add('read');
    }
  });

  const remove = document.createElement('button');
  remove.textContent = 'Remove';
  remove.classList.add('remove-btn');
  newCard.appendChild(remove);

  remove.addEventListener('click', function () {
    cardGrid.removeChild(newCard);
    myLibrary.splice(`${myLibrary.indexOf(item)}`, 1);
  });
}
