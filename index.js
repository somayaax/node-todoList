/* eslint-disable linebreak-style */
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes');
const { handleResponseError } = require('./Lib');

const app = express();

mongoose.connect(process.env.MONGO_URL).then(() => console.log('connected to db')).catch((err) => console.log(err));
app.use(cors());
app.use(express.json());
app.use(router);

// eslint-disable-next-line no-unused-vars
// eslint-disable-next-line arrow-body-style
app.use('/users', (err, req, res, next) => {
  if (err.code === 11000) return res.status(400).json({ message: 'username already exists!' });
  if (err.message === 'un-authenticated') return res.status(400).json({ message: "username and password don't match" });
  if (err.message === 'un-authorized') return res.status(401).json({ message: 'un-authorized access' });
  return res.status(400).json({ message: err.message });
});

app.use('/todos', handleResponseError);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
