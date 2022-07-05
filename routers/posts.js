const {Router} = require('express');
const { getPosts, deletePost, createPost, getPost } = require('../controllers/posts');

const router = Router();

router.get('/', getPosts);
router.get('/userPosts', getPost);
router.delete('/:postID', deletePost);
router.post('/', createPost);

module.exports = router;