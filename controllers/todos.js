/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const Todo = require('../models/todo');

// eslint-disable-next-line max-len
const generateTodoId = async () => {
  const todosNumber = await Todo.count({});
  if (!todosNumber) {
    return 1;
  }
  const lastTodo = await Todo.find({}).sort('-createdAt').limit(1);
  return lastTodo[0]._id + 1;
};

const create = (data) => Todo.create(data);

const update = (_id, updatedStatus) => Todo.findOneAndUpdate(_id, updatedStatus, { new: true });

const find = (user) => Todo.findOne(user);

// const get = (filter) => Todo.find(filter)
//   // .skip(skip)
//   // .limit(limit)
//   .select('id title status')
//   .exec();

const get = (userId) => Todo.find(userId).select('title status _id').exec();

const deleteTodo = (_id) => Todo.findByAndDelete(_id);

module.exports = {
  create,
  update,
  get,
  deleteTodo,
  find,
  generateTodoId,
};
