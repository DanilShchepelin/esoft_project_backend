const {Router} = require('express');
const { getUsers, getUser } = require('../controllers/users');


const router = Router();

router.get('/', getUsers);
router.get('/user', getUser);

module.exports = router;