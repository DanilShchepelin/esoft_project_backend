const {Router} = require('express');
const users = require('./users');
const passport = require('passport');

const router = Router();

router.use('/users', users);
// router.post('/login', passport.authenticate('local', {successRedirect: 'http://localhost:3000/profile'}));


module.exports = router;