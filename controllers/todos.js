/* eslint-disable linebreak-style */
const Todo = require('../models/todo');

// eslint-disable-next-line max-len
const generateTodoId = async () => {
  const todosNumber = await Todo.count({});
  if (!todosNumber) {
    return 1;
  }
  const lastTodo = await Todo.findOne({}, {}, { sort: { created_at: -1 } });
  return lastTodo.id + 1;
};
  // return (todosNumber ? Todo.findOne({}, {}, { sort: { created_at: -1 } }).id : 1);
// };
const create = (data) => Todo.create(data);

const update = (id, updatedStatus) => Todo.findByIdAndUpdate(id, updatedStatus, { new: true });

// const find = (id) => Todo.findById(id);
const find = (user) => Todo.findOne(user);

// const get = (filter) => Todo.find(filter)
//   // .skip(skip)
//   // .limit(limit)
//   .select('id title status')
//   .exec();

const get = () => Todo.find({}).select('id title status -_id').exec();

const deleteTodo = (id) => Todo.findByIdAndDelete(id);
module.exports = {
  create,
  update,
  get,
  deleteTodo,
  find,
  generateTodoId,
};
