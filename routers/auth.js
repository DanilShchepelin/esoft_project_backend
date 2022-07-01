const {Router} = require('express');
const { getUser, addUser, logoutUser, currentUser } = require('../controllers/auth');

const router = Router();

router.post('/auth', getUser);
router.post('/registration', addUser);
router.post('/logout', logoutUser);
router.get('/currentUser', currentUser);

module.exports = router;