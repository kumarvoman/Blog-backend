import express from 'express';
import { addBlog, deleteBlog, getAllBlogs, getBlogsByUser, getByID, update } from '../controllers/blog-controller.js';


const blogrouter =express.Router();

blogrouter.get("/", getAllBlogs);

blogrouter.post("/add", addBlog);

blogrouter.put("/update/:id", update);

blogrouter.get("/:id", getByID);

blogrouter.delete("/:id", deleteBlog);

blogrouter.get('/user/:id', getBlogsByUser);

export default blogrouter;

