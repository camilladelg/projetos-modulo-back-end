const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { BlogPost, Category, PostCategory, User } = require('../models');

const config = require('../config/config');

const sequelize = new Sequelize(config.development);

const BlogPostCreate = async ({ title, content, categoryIds, userId }) => {
  try {
    const result = await sequelize.transaction(async (t) => {
      const categories = await Category.findAll({ attributes: ['id'] });
  
      const arrayCat = categories.map((c) => c.id);
  
      const allCategoriesExist = categoryIds.every((id) => arrayCat.includes(id));
  
      if (!allCategoriesExist) { return { code: 400, message: '"categoryIds" not found' }; }
  
      const newPost = await BlogPost.create({ title, content, userId }, { transaction: t });
  
      await Promise.all(categoryIds.map((categoryId) => PostCategory.create(
        { postId: newPost.id, categoryId }, { transaction: t },
      )));

      return { code: 201, newPost };
    });
    return result;
  } catch (e) {
    console.log(e.message);

    if (e.name.includes('Validation')) { return ({ code: 400, message: e.message }); }
    // Se não informar os parametros postId ou categoryId na função create do PostCategory da o erro SequelizeValidationError
    return { code: 500, message: e.message };
  }
};

// referencia: monitoria(esquenta) Gaspar

const getPosts = async () => {
  try {
    const posts = await BlogPost.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    return { code: 200, posts };
  } catch (e) {
    console.log(e);
    return { code: 500, message: e.message };
  }
};

const getPostById = async (id) => {
  try {
    const post = await BlogPost.findByPk(id, {
      include: [
        { model: User,
          as: 'user',
          attributes: { exclude: ['password'] },
        },
        { model: Category, as: 'categories', through: { attributes: [] } },
      ],
    });

    if (!post) {
      return { code: 404, message: 'Post does not exist' };
    }

    return { code: 200, post };
  } catch (e) {
    console.log(e);
    return { code: 500, message: e.message };
  }
};

const updatePost = async (data, id, userId) => {
  try {
    const { title, content } = data;
    const post = await BlogPost.findByPk(id);
    
    if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };

    // if (data.categoryIds) return { code: 400, message: 'Categories cannot be edited' }; 

    await BlogPost.update({ title, content }, { where: { id } });

    const postUpdated = await BlogPost.findByPk(id, { 
      attributes: { exclude: ['id', 'published', 'updated'] },
      include: [{ model: Category, as: 'categories', through: { attributes: [] } }],
    });

    return { code: 200, postUpdated };
  } catch (e) {
    console.log(e.message);
    return { code: 500, message: e.message };
  }
};

const deletePost = async (id, userId) => {
  try {
    const post = await BlogPost.findByPk(id);
    
    if (!post) return { code: 404, message: 'Post does not exist' };
    if (post.userId !== userId) return { code: 401, message: 'Unauthorized user' };

    const result = await sequelize.transaction(async (t) => {
      await PostCategory.destroy({ where: { postId: id } }, { transaction: t });
      
      await BlogPost.destroy({ where: { id } }, { transaction: t });

      return { code: 204 };
    });
    return result;
  } catch (e) {
    console.log(e);
    return { code: 500, message: e.message };
  }
};

const getPostBySearch = async (q) => {
  try {
    if (!q) {
      const { code, posts } = await getPosts();
      return { code, posts };
    }

    const posts = await BlogPost.findAll({
      include: [
        { model: User, as: 'user', attributes: { exclude: ['password'] } },
        { model: Category, as: 'categories', through: { attributes: [] } }],
      where: { 
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
      },
    });

    return { code: 200, posts };
  } catch (e) {
    console.log(e.message);
    return { code: 500, message: e.message };
  }
}; 

module.exports = {
  BlogPostCreate,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  getPostBySearch,
};