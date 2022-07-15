const {Router} = require('express');
const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/users');


const router = Router();

router.get('/', getUsers);
router.get('/user', getUser);
router.put('/update', updateUser);
router.delete('/delete/:userId', deleteUser);

module.exports = router;