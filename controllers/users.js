/* eslint-disable linebreak-style */
const jwt = require('jsonwebtoken');
const Todo = require('../models/todo');
const User = require('../models/user');

const createToken = (user) => {
  // eslint-disable-next-line no-underscore-dangle
  const token = jwt.sign({ id: user._id, userName: user.userName }, process.env.TOKEN_KEY, { expiresIn: '7d' });
  return token;
}

const create = async (data) => {
  const user = await User.create(data);
  const token = createToken(user);
  return { user, token }
};

const signIn = async (userName, pass) => {
  const user = await User.findOne({ userName });
  if (!user) throw new Error('un-authenticated')
  const valid = user.verifyPassword(pass);
  if (!valid) throw new Error('un-authenticated')
  return createToken(user);
};

const find = (filter, select) => User.findOne(filter)
  .select(select);

const deleteUser = (id) => User.findByIdAndDelete(id);

const update = (id, updatedObj) => User.findByIdAndUpdate(id, updatedObj, { new: true });

const getTodos = (userId) => Todo.find({ userId }).sort({ _id: 1 }).populate('userId');

module.exports = {
  create,
  signIn,
  find,
  deleteUser,
  update,
  getTodos,
};
