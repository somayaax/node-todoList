/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20,
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  status: {
    completed: { type: Boolean, default: false },
    favourite: { type: Boolean, default: false },
    deleted: { type: Boolean, default: false },
  },
  _id: { type: Number },
}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
