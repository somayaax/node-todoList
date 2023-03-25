/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
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
  _id: {
    type: Number,
  },
  description: {
    type: String,
    minLength: 10,
    maxLength: 200,
  },
  steps: {
    type: [Object],
  },

  priority: {
    type: String,
    enum: ['High', 'Low', 'Moderate'],
  },
  deadline: {
    type: Date,
    required: true,
  },

}, {
  timestamps: true,
});

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;
