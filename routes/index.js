/* eslint-disable linebreak-style */
const express = require('express');
const todos = require('./todos');
const users = require('./users');

const router = express.Router();
router.use('/todos', todos);
router.use('/users', users);
module.exports = router;
