const mongoose = require('mongoose');
const router = require('express').Router();
const { body, query, validationResult } = require('express-validator');
const passport = require('passport');
const User = mongoose.model('User');

router.post('/login',[
    body('user.email').isEmail(),
    body('user.password').not().isEmpty(),
], function(req, res, next) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    passport.authenticate('local', { session: false }, function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.json({user: null}) }
        return res.json({user: user.toAuthJSON()});
    })(req, res, next);
});

router.post('/register', [
    body('user.email').isEmail(),
    body('user.password').isLength({min: 8}),
], async function(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    let user = new User();
    user.email = req.body.user.email.trim();
    user.setPassword(req.body.user.password);
    user.questions = []
    user.save(function (err) {
        if (err) {
            return res.json({errors: { error: err.message }});
        }
        return res.json({user: user.toAuthJSON()});
    });
});

module.exports = router;
