/* eslint-disable linebreak-style */
const express = require('express');
const { validate } = require('../middlewares/validation');
const { todosController } = require('../controllers');
const { todosValidator } = require('../validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  const { body: { title } } = req;
  try {
    const todo = await todosController.create({ title, userId: req.user._id });
    return res.json(todo);
  } catch (err) {
    next(err);
  }
});

router.patch('/:id', auth, validate(todosValidator.id), async (req, res, next) => {
  const { params: { id }, body: { title, tags, status } } = req;
  try {
    const todo = await todosController.find(id);

    if (parseInt(todo.userId) !== parseInt(req.user._id)) throw new Error("un-authorized");

    const updatedTodo = await todosController.update(
      id,
      { title, $push: { tags }, status },
    );
    return res.status(200).json(updatedTodo);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, validate(todosValidator.id), async (req, res, next) => {
  const { params: { id } } = req;
  try {
    const todo = await todosController.find(id);
    if (!todo) throw new Error("todo already deleted");
    if (parseInt(todo.userId) !== parseInt(req.user._id)) throw new Error("un-authorized");

    const deletedTodo = await todosController.deleteTodo(id);
    res.status(200).json({ message: 'task deleted' });
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {

  const { query: { skip, limit, status } } = req;
  try {
    const filter = status ? { status } : {};
    const todos = await todosController.get(filter, skip, limit);
    return res.json(todos);
  } catch (error) {
    next(error);
  }

});
module.exports = router;
