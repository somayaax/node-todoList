/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
// const { validate } = require('../middlewares/validation');
const { todosController } = require('../controllers');
// const { todosValidator } = require('../validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  const { body: { title } } = req;
  try {
    const id = await todosController.generateTodoId();
    const data = await todosController.create({ title, userId: req.user._id, id });
    return res.status(201).json({ status: 'succes', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const data = await todosController.get();
    return res.status(200).json({ status: 'succes', data });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  const { params: { id }, body: { status } } = req;
  try {
    const todo = await todosController.find({ id, userId: req.user._id });
    if (!todo) return res.status(403).json({ status: 'failed', message: 'Todo does not exist!' });
    const updatedTodo = await todosController.update(id, { status });
    return res.status(200).json(updatedTodo);
  } catch (err) {
    next(err);
  }
});

// router.delete('/:id', auth, validate(todosValidator.id), async (req, res, next) => {
//   const { params: { id } } = req;
//   try {
//     const todo = await todosController.find(id);
//     if (!todo) throw new Error('todo already deleted');
//     if (parseInt(todo.userId) !== parseInt(req.user._id)) throw new Error('un-authorized');

//     const deletedTodo = await todosController.deleteTodo(id);
//     res.status(200).json({ message: 'task deleted' });
//   } catch (err) {
//     next(err);
//   }
// });

module.exports = router;
