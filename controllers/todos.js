/* eslint-disable linebreak-style */
const Todo = require('../models/todo');

const create = (data) => Todo.create(data);

const update = (id, updatedObj) => Todo.findByIdAndUpdate(id, updatedObj, { new: true });

const find = (id)=> Todo.findById(id);

const get = (filter, skip, limit) => Todo.find(filter)
  .skip(skip)
  .limit(limit)
  .exec();

const deleteTodo = (id) => Todo.findByIdAndDelete(id);
module.exports = {
  create,
  update,
  get,
  deleteTodo,
  find
};
