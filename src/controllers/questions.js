const router = require('express').Router();
const mongoose = require('mongoose');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const { getRandomInt } = require('../helpers/random');
const auth = require('./auth');
const User = mongoose.model('User');

router.get('/all', auth.required, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const response = await fetch('https://leetcode.com/api/problems/algorithms/');
  const body = await response.text();
  const data = JSON.parse(body);
  return res.json(data.stat_status_pairs);
});

router.get('/free', auth.required, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const response = await fetch('https://leetcode.com/api/problems/algorithms/');
  const body = await response.text();
  let data = JSON.parse(body);
  data = data.stat_status_pairs.filter((question) => !question.paid_only);
  return res.json(data);
});

router.get('/paid', auth.required, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const response = await fetch('https://leetcode.com/api/problems/algorithms/');
  const body = await response.text();
  let data = JSON.parse(body);
  data = data.stat_status_pairs.filter((question) => question.paid_only);
  return res.json(data);
});

router.get('/free/random', auth.required, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const response = await fetch('https://leetcode.com/api/problems/algorithms/');
  const body = await response.text();
  let data = JSON.parse(body);
  data = data.stat_status_pairs.filter((question) => !question.paid_only);
  const user = await User.findById(req.payload.id);
  let newQuestion = null;
  let temp;
  while (!newQuestion) {
    temp = data[getRandomInt(data.length - 1)];
    if (!user.questions.includes(temp.stat.question_id)) {
      user.questions.unshift(temp.stat.question_id);
      newQuestion = temp;
    }
  }
  await user.save();
  return res.json(newQuestion);
});

router.get('/paid/random', auth.required, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const response = await fetch('https://leetcode.com/api/problems/algorithms/');
  const body = await response.text();
  let data = JSON.parse(body);
  data = data.stat_status_pairs.filter((question) => question.paid_only);
  const user = await User.findById(req.payload.id);
  let newQuestion = null;
  let temp;
  while (!newQuestion) {
    temp = data[getRandomInt(data.length - 1)];
    if (!user.questions.includes(temp.stat.question_id)) {
      user.questions.unshift(temp.stat.question_id);
      newQuestion = temp;
    }
  }
  await user.save();
  return res.json(newQuestion);
});

router.get('/random', auth.required, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const response = await fetch('https://leetcode.com/api/problems/algorithms/');
  const body = await response.text();
  let data = JSON.parse(body);
  data = data.stat_status_pairs;
  const user = await User.findById(req.payload.id);
  let newQuestion = null;
  let temp;
  while (!newQuestion) {
    temp = data[getRandomInt(data.length - 1)];
    if (!user.questions.includes(temp.stat.question_id)) {
      user.questions.unshift(temp.stat.question_id);
      newQuestion = temp;
    }
  }
  await user.save();
  return res.json(newQuestion);
});

module.exports = router;
