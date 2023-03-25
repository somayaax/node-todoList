/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
// const { validate } = require('../middlewares/validation');
const { todosController } = require('../controllers');
// const { todosValidator } = require('../validation');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, async (req, res, next) => {
  const {
    body: {
      title, description, steps, priority,
    },
  } = req;
  try {
    const _id = await todosController.generateTodoId();
    const data = await todosController.create({
      // eslint-disable-next-line max-len
      title, userId: req.user._id, _id, description, steps, priority, deadline: Date(req.body.deadline),
    });
    return res.status(201).json({ status: 'succes', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    const data = await todosController.get({userId: req.user._id});
    return res.status(200).json({ status: 'succes', data });
  } catch (err) {
    return next(err);
  }
});

router.get('/:id', auth, async (req, res, next) => {
  try {
    // eslint-disable-next-line max-len
    const data = await todosController.getbyId({ _id: Number(req.params.id), userId: req.user._id });
    return res.status(200).json({ status: 'succes', data });
  } catch (err) {
    return next(err);
  }
});

router.patch('/:id', auth, async (req, res, next) => {
  const { params: { id }, body: { status, deadline } } = req;
  console.log({ status, deadline });
  try {
    const todo = await todosController.find({ _id: id, userId: req.user._id });
    if (!todo) return res.status(403).json({ status: 'failed', message: 'Todo does not exist!' });
    const updatedTodo = await todosController.update({ _id: Number(id) }, { status, deadline });
    return res.status(200).json(updatedTodo);
  } catch (err) {
    return next(err);
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
