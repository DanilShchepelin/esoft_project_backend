const {Router} = require('express');
const { getDialogs, getMessages, createChat, addMessage } = require('../controllers/messages');

const router = Router();

router.get('/dialogs', getDialogs);
router.get('/messages/:userTwoId', getMessages);
router.post('/createChat/:userTwoId', createChat);
router.post('/addMessage/:userTwoId', addMessage);

module.exports = router;