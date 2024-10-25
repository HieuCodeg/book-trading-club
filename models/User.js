const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  city: String,
  state: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
});

module.exports = mongoose.model('User', UserSchema);
