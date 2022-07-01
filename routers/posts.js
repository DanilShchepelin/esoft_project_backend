const {Router} = require('express');
const { getPosts, deletePost, createPost } = require('../controllers/posts');

const router = Router();

router.get('/', getPosts);
router.delete('/:postID', deletePost);
router.post('/', createPost);

module.exports = router;