const {Router} = require('express');
const users = require('./users');
const user = require('./auth');
const posts = require('./posts');
const messages = require('./messages');

const router = Router();

router.use('/users', users);
router.use('/login', user);
router.use('/posts', posts);
router.use('/messages', messages);

module.exports = router;