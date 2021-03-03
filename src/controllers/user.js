const mongoose = require('mongoose');
const router = require('express').Router();
const { body, query, validationResult } = require('express-validator');
const passport = require('passport');
const User = mongoose.model('User');
const auth = require('./auth');

router.post(
  '/login',
  [body('user.email').isEmail(), body('user.password').not().isEmpty()],
  function (req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    passport.authenticate('local', { session: false }, function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: 'Invalid credentials' });
      }
      return res.json({ user: user.toAuthJSON() });
    })(req, res, next);
  }
);

router.post(
  '/register',
  [body('user.email').isEmail(), body('user.password').isLength({ min: 8 })],
  async function (req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    let user = new User();
    user.email = req.body.user.email.trim();
    user.setPassword(req.body.user.password);
    user.questions = [];
    user.save(function (err) {
      if (err) {
        return res.json({ errors: { error: err.message } });
      }
      return res.json({ user: user.toAuthJSON() });
    });
  }
);

router.get('/:id', auth.required, async function (req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  return res.json({ user: user.toAuthJSON() });
});

router.delete('/me', auth.required, async function (req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  const user = await User.findByIdAndDelete(req.payload.id);
  if (!user) return res.status(422).json({ message: 'User not found' });
  return res.json({ message: 'Successfully deleted.', _id: user._id });
});

module.exports = router;
