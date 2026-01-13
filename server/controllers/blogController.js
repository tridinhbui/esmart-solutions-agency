const Blog = require('../models/Blog');
const { Op } = require('sequelize');

// Helper function to generate slug from title
const generateSlug = (title) => {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
};

// Get all blogs (with pagination and filtering)
const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status = 'published',
      category,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'DESC',
    } = req.query;

    const offset = (page - 1) * limit;
    const where = {};

    // Filter by status
    if (status) {
      where.status = status;
    }

    // Filter by category
    if (category) {
      where.category = category;
    }

    // Filter by tag
    if (tag) {
      where.tags = {
        [Op.contains]: [tag],
      };
    }

    // Search in title, content, or excerpt
    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { content: { [Op.iLike]: `%${search}%` } },
        { excerpt: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const { count, rows } = await Blog.findAndCountAll({
      where,
      limit: parseInt(limit),
      offset: parseInt(offset),
      order: [[sortBy, sortOrder]],
    });

    res.json({
      success: true,
      data: rows,
      pagination: {
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message,
    });
  }
};

// Get single blog by ID or slug
const getBlogByIdOrSlug = async (req, res) => {
  try {
    const { identifier } = req.params;
    const incrementViews = req.query.incrementViews === 'true';

    // Check if identifier is numeric (ID) or string (slug)
    const where = isNaN(identifier)
      ? { slug: identifier }
      : { id: parseInt(identifier) };

    const blog = await Blog.findOne({ where });

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // Increment views if requested
    if (incrementViews) {
      await blog.increment('views');
      await blog.reload();
    }

    res.json({
      success: true,
      data: blog,
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog',
      error: error.message,
    });
  }
};

// Create new blog
const createBlog = async (req, res) => {
  try {
    const {
      title,
      content,
      excerpt,
      author,
      authorEmail,
      coverImage,
      tags,
      category,
      status,
      publishedAt,
      metaTitle,
      metaDescription,
      metaKeywords,
    } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        message: 'Title, content, and author are required',
      });
    }

    // Generate slug from title
    let slug = generateSlug(title);

    // Check if slug already exists
    const existingBlog = await Blog.findOne({ where: { slug } });
    if (existingBlog) {
      // Append timestamp to make slug unique
      slug = `${slug}-${Date.now()}`;
    }

    // Create blog
    const blog = await Blog.create({
      title,
      slug,
      content,
      excerpt,
      author,
      authorEmail,
      coverImage,
      tags: tags || [],
      category,
      status: status || 'draft',
      publishedAt: publishedAt || (status === 'published' ? new Date() : null),
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      metaKeywords: metaKeywords || [],
    });

    res.status(201).json({
      success: true,
      message: 'Blog created successfully',
      data: blog,
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating blog',
      error: error.message,
    });
  }
};

// Update blog
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    // If title is being updated, regenerate slug
    if (updates.title && updates.title !== blog.title) {
      let newSlug = generateSlug(updates.title);
      const existingBlog = await Blog.findOne({ 
        where: { 
          slug: newSlug,
          id: { [Op.ne]: id }
        } 
      });
      if (existingBlog) {
        newSlug = `${newSlug}-${Date.now()}`;
      }
      updates.slug = newSlug;
    }

    // If status is being changed to published, set publishedAt if not already set
    if (updates.status === 'published' && !blog.publishedAt) {
      updates.publishedAt = new Date();
    }

    await blog.update(updates);

    res.json({
      success: true,
      message: 'Blog updated successfully',
      data: blog,
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating blog',
      error: error.message,
    });
  }
};

// Delete blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByPk(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog not found',
      });
    }

    await blog.destroy();

    res.json({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting blog',
      error: error.message,
    });
  }
};

// Get blog categories
const getCategories = async (req, res) => {
  try {
    const categories = await Blog.findAll({
      attributes: ['category'],
      where: {
        category: { [Op.ne]: null },
        status: 'published',
      },
      group: ['category'],
      raw: true,
    });

    const categoryList = categories.map(c => c.category).filter(Boolean);

    res.json({
      success: true,
      data: categoryList,
    });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching categories',
      error: error.message,
    });
  }
};

// Get popular tags
const getTags = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ['tags'],
      where: {
        status: 'published',
        tags: { [Op.ne]: [] },
      },
      raw: true,
    });

    // Flatten and count tags
    const tagCount = {};
    blogs.forEach(blog => {
      if (blog.tags) {
        blog.tags.forEach(tag => {
          tagCount[tag] = (tagCount[tag] || 0) + 1;
        });
      }
    });

    // Sort by popularity
    const sortedTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .map(([tag, count]) => ({ tag, count }));

    res.json({
      success: true,
      data: sortedTags,
    });
  } catch (error) {
    console.error('Error fetching tags:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: error.message,
    });
  }
};

// Get blog stats
const getBlogStats = async (req, res) => {
  try {
    const totalBlogs = await Blog.count();
    const publishedBlogs = await Blog.count({ where: { status: 'published' } });
    const draftBlogs = await Blog.count({ where: { status: 'draft' } });
    const totalViews = await Blog.sum('views');

    res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching blog stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching blog stats',
      error: error.message,
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogByIdOrSlug,
  createBlog,
  updateBlog,
  deleteBlog,
  getCategories,
  getTags,
  getBlogStats,
};
