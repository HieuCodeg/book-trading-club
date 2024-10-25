const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Book = require('../models/Book');

// Get all books
router.get('/books', async (req, res) => {
  const books = await Book.find().populate('owner', 'name');
  res.json(books);
});

// Add a new book
router.post('/books', async (req, res) => {
  const { title, author, ownerId } = req.body;
  const newBook = new Book({ title, author, owner: ownerId });
  await newBook.save();

  const user = await User.findById(ownerId);
  user.books.push(newBook._id);
  await user.save();

  res.json(newBook);
});

// Update user settings
router.put('/users/:id', async (req, res) => {
  const { name, city, state } = req.body;
  await User.findByIdAndUpdate(req.params.id, { name, city, state });
  res.sendStatus(200);
});

// Propose a trade (basic example, implement more logic as needed)
router.post('/trade', async (req, res) => {
  // Implement trade logic
  res.sendStatus(200);
});

module.exports = router;
