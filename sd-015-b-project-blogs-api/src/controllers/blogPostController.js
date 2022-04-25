const blogPostService = require('../services/blogPostService');

const BlogPostCreate = async (req, res, _next) => {
  const { title, content, categoryIds } = req.body;
  const { id } = req.tokenData;

  const data = { title, content, categoryIds, userId: id };
  const { code, message, newPost } = await blogPostService.BlogPostCreate(data);

  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(newPost);
};

const getPosts = async (req, res, _next) => {
  const { code, message, posts } = await blogPostService.getPosts();

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(posts);
};

const getPostById = async (req, res, _next) => {
  const { id } = req.params;

  const { code, message, post } = await blogPostService.getPostById(id);

  if (message) {
    return res.status(code).json({ message });
  }

  return res.status(code).json(post);
};

const updatePost = async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.tokenData;

  const { code, message, postUpdated } = await blogPostService.updatePost(req.body, id, userId);

  if (message) {
    return res.status(code).json({ message });
  }
  return res.status(code).json(postUpdated);
};

const deletePost = async (req, res, _next) => {
  const { id } = req.params;
  const { id: userId } = req.tokenData;

  const { code, message } = await blogPostService.deletePost(id, userId);

  if (message) return res.status(code).json({ message });

  return res.status(code).end();
};

const getPostBySearch = async (req, res, _next) => {
  // console.log('queryyy', req.query);

  const { q } = req.query;
  const { code, message, posts } = await blogPostService.getPostBySearch(q);

  if (message) return res.status(code).json(message);
  return res.status(code).json(posts);
};

module.exports = {
  BlogPostCreate,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostBySearch,
};