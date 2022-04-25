const express = require('express');
const { 
  BlogPostCreate, 
  getPosts, 
  getPostById, 
  updatePost,
  deletePost,
  getPostBySearch,
} = require('../controllers/blogPostController');
const tokenMiddleware = require('../middlewares/tokenMiddleware');
const blogPostMiddleware = require('../middlewares/blogPostMiddleware');
const blogPostPutMiddleware = require('../middlewares/blogPostPutMiddleware');

const router = express.Router();

router.post('/', tokenMiddleware, blogPostMiddleware, BlogPostCreate);
router.get('/', tokenMiddleware, getPosts);
router.get('/search', tokenMiddleware, getPostBySearch);
router.get('/:id', tokenMiddleware, getPostById);
router.put('/:id', tokenMiddleware, blogPostPutMiddleware, updatePost);
router.delete('/:id', tokenMiddleware, deletePost);

module.exports = router;