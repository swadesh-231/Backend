import { Blog } from "../models/blog.model.js";

// CREATE - create a new blog
export const createBlog = async (req, res) => {
  try {
    const { title, content, coverImage, author, tags, isPublished } = req.body;

    if (!title || !content || !author) {
      return res
        .status(400)
        .json({ message: "title, content and author are required" });
    }

    const blog = await Blog.create({
      title,
      content,
      coverImage,
      author,
      tags,
      isPublished,
    });

    return res.status(201).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// READ - get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username email avatar");
    return res.status(200).json(blogs);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// READ - get a single blog by id
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate(
      "author",
      "username email avatar"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// UPDATE - update a blog by id
export const updateBlog = async (req, res) => {
  try {
    const { title, content, coverImage, tags, isPublished } = req.body;

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, content, coverImage, tags, isPublished },
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    return res.status(200).json(blog);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE - delete a blog by id
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
