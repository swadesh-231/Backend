import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
} from "../controllers/blog.controller.js";

const router = Router();

router.route("/").post(createBlog).get(getAllBlogs);

router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

export default router;
