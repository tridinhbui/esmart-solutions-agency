const express = require('express');
const router = express.Router();
const {
  getAllBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getCategories,
  getTags,
  getBlogStats,
} = require('../controllers/blogController');

// Get all blogs with pagination and filtering
router.get('/', getAllBlogs);

// Get blog statistics
router.get('/stats', getBlogStats);

// Get all categories
router.get('/categories', getCategories);

// Get all tags
router.get('/tags', getTags);

// Get single blog by ID or slug
router.get('/:identifier', getBlogByIdOrSlug);

// Create new blog
router.post('/', createBlog);

// Update blog
router.put('/:id', updateBlog);

// Delete blog
router.delete('/:id', deleteBlog);

module.exports = router;
