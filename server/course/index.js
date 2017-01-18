'use strict';

const express = require('express');
const io = require('../shared/io');
const controller = require('./course.controller').controller;
const model = require('./course.model').model;
const middleware = require('./middleware');
const { requireUser } = require('../user').middleware;
const queryParams = require('../shared/middleware').queryParamParsers;

const router = express.Router();
const input = io.input();
const output = io.output();

// TODO(marko): Implement permission checking. Implement role
// checking depending on inviting user.
if (process.env.NODE_ENV !== 'production') {
  router.post('/courses/:courseKey/users',
    input,
    controller.inviteUser,
    output);

  router.delete('/courses/:courseKey/users/:userKey',
    input,
    controller.revokeAccess,
    output);
}

router.get('/courses',
  input,
  requireUser,
  queryParams.parsePagination,
  queryParams.parseSearch,
  queryParams.parseSort,
  controller.listCoursesForUser,
  output);

router.get('/courses/:courseKey',
  input,
  middleware.requireCourseAccess,
  controller.show,
  output);

router.post('/courses',
  input,
  middleware.requireCourseAccess,
  controller.create,
  output);

router.patch('/courses/:courseKey',
  input,
  middleware.requireCourseAccess,
  controller.patch,
  output);

router.put('/courses/:courseKey',
  input,
  middleware.requireCourseAccess,
  controller.replace,
  output);

router.delete('/courses/:courseKey',
  input,
  middleware.requireCourseAccess,
  controller.remove,
  output);

router.get('/courses/:courseKey/users',
  input,
  middleware.requireCourseAccess,
  queryParams.parseSearch,
  controller.listUsersForCourse,
  output);

module.exports = {
  controller,
  middleware,
  model,
  router
};
