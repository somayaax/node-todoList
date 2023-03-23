/* eslint-disable linebreak-style */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  password: {
    type: String,
    required: true,
  },
  quote: {
    type: String,
    required: true,
  },
}, {
  toJSON: {
    // eslint-disable-next-line func-names, object-shorthand
    transform: function (doc, ret) {
      delete ret.password;
    },
  },
}, {
  timestamps: true,
});

userSchema.pre('save', function hashPass(next) {
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.verifyPassword = function verifyPassword(pass) {
  return bcrypt.compareSync(pass, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
