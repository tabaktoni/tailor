'use strict';

const { createError, validationError } = require('../shared/error/helpers');
const { NOT_FOUND } = require('http-status-codes');
const { User } = require('../shared/database');

function index(req, res) {
  const attributes = ['id', 'email', 'role'];
  return User.findAll({ attributes })
    .then(users => res.json({ data: users }));
}

function forgotPassword({ body }, res) {
  const { email } = body;
  return User.find({ where: { email } })
    .then(user => user || createError(NOT_FOUND, 'User not found'))
    .then(user => user.sendResetToken())
    .then(() => res.end());
}

function resetPassword({ body, params }, res) {
  const { password, token } = body;
  return User.find({ where: { token } })
    .then(user => user || createError(NOT_FOUND, 'Invalid token'))
    .then(user => {
      user.password = password;
      return user.save().catch(validationError);
    })
    .then(() => res.end());
}

function login({ body }, res) {
  const { email, password } = body;
  if (!email || !password) {
    createError(400, 'Please enter email and password');
  }
  return User.find({ where: { email } })
    .then(user => user || createError(NOT_FOUND, 'User does not exist'))
    .then(user => user.authenticate(password))
    .then(user => user || createError(NOT_FOUND, 'Wrong password'))
    .then(user => {
      const token = user.createToken({ expiresIn: '5 days' });
      res.json({ data: { token, user: user.profile } });
    });
}

function updateProfile({ body: { user } }, res, next) {
  const { id, email, firstName, lastName } = user;
  return User.findByPk(id)
    .then(user => user.update({ email, firstName, lastName })
    .then(updatedUser => res.json({ user: updatedUser.profile }))
    .catch(err => next(err)));
}

function changePassword({ body: { password }, params: { id } }, res) {
  return User.findByPk(id)
    .then(user => {
      user.password = password;
      return user.save().catch(validationError);
    })
    .then(() => res.sendStatus(200));
}

function saveImageKey({ body: { key }, params: { id } }, res, next) {
  return User.findByPk(id)
    .then(user => user.update({ imgUrl: key }))
    .then(updatedUser => res.json({ user: updatedUser.profile }))
    .catch(err => next(err));
}

function deleteImageKey({ params: { id } }, res, next) {
  return User.findByPk(id)
    .then(user => user.update({ imgUrl: '' }))
    .then(updatedUser => res.json({ user: updatedUser.profile }))
    .catch(err => next(err));
}

module.exports = {
  index,
  forgotPassword,
  resetPassword,
  login,
  updateProfile,
  changePassword,
  saveImageKey,
  deleteImageKey
};
