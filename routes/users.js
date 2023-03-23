/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable linebreak-style */
const express = require('express');
const { usersController } = require('../controllers');
const auth = require('../middlewares/auth');
const { validate } = require('../middlewares/validation');
const { usersValidator } = require('../validation');

const router = express.Router();

router.post('/', validate(usersValidator.signUp), async (req, res, next) => {
  try {
    const {
      body: {
        userName, password, quote,
      },
    } = req;

    const user = await usersController.create({
      userName, password, quote,
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
});

router.post('/signin', validate(usersValidator.signIn), async (req, res, next) => {
  const { body: { userName, password } } = req;
  try {
    const token = await usersController.signIn(userName, password);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
});

router.get('/', auth, async (req, res, next) => {
  try {
    // const user = await usersController.find({ _id: req.user._id }, '-_id');
    const user = await usersController.findOne({ _id: req.user._id }, '-_id');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', auth, validate(usersValidator.id), async (req, res, next) => {
  const { id } = req.params;
  try {
    // eslint-disable-next-line eqeqeq
    if (id != req.user._id) throw new Error('un-authorized');
    const user = await usersController.deleteUser(id);
    if (user) res.status(200).json({ message: 'user deleted' });
  } catch (err) {
    next(err);
  }
});

// router.patch('/:id', auth, validate(usersValidator.id), validate(usersValidator.update), async (req, res, next) => {
//   const { params: { id }, body: { firstName, lastName, userName, DOB } } = req;
//   try {
//     if (id != req.user._id) throw new Error("un-authorized");

//     const updatedUser = await usersController.update(
//       id,
//       { firstName, lastName, userName, DOB },
//     );
//     res.status(200).json({ message: 'user updated', updatedUser });

//   } catch (err) {
//     next(err)
//   }
// });

// router.get('/:id/todos', async (req, res, next) => {
//   const { params: { id } } = req;
//   const [err, todos] = await asycnWrapper(usersController.getTodos(id));
//   if (err) return next(err);
//   return res.json({ todos });
// });

module.exports = router;
