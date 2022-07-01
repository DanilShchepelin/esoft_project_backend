const {Router} = require('express');
const users = require('./users');
const user = require('./auth');
const posts = require('./posts');

const router = Router();

router.use('/users', users);
router.use('/login', user);
router.use('/posts', posts);

module.exports = router;