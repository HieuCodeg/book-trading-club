// public/script.js
const bookList = document.getElementById('book-list');
const addBookButton = document.getElementById('add-book');
const updateSettingsButton = document.getElementById('update-settings');

async function fetchBooks() {
  const response = await fetch('/api/books');
  const books = await response.json();
  renderBooks(books);
}

function renderBooks(books) {
  bookList.innerHTML = '';
  books.forEach((book) => {
    const bookItem = document.createElement('div');
    bookItem.textContent = `${book.title} by ${book.author}`;
    bookList.appendChild(bookItem);
  });
}

addBookButton.addEventListener('click', async () => {
  const title = document.getElementById('book-title').value;
  const author = document.getElementById('book-author').value;
  const ownerId = 'yourUserId'; // Replace with the actual user ID

  const response = await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, ownerId }),
  });

  if (response.ok) {
    fetchBooks();
  }
});

updateSettingsButton.addEventListener('click', async () => {
  const name = document.getElementById('user-name').value;
  const city = document.getElementById('user-city').value;
  const state = document.getElementById('user-state').value;
  const userId = 'yourUserId'; // Replace with the actual user ID

  await fetch(`/api/users/${userId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, city, state }),
  });
});

fetchBooks();
