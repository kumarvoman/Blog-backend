import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/User.js";

export const getAllBlogs = async(req, res, next) => {
    let blogs;
    try{
        blogs = await Blog.find();
        //res.json(users); //not in the video
    } catch(err){
        console.log(err);
    }

    if(!blogs){
        res.status(404).json({message: "No blogs found"});
    }
    return res.status(200)
    .json({blogs});
}

export const addBlog = async(req, res, next) => { 
   const { title , content , image , user } = req.body;

    let existinguser;
    try{
        existinguser = await User.findById(user);

    }catch(err) {
        return console.log(err);
    }

    if(!existinguser) {
        return res.status(400).json({message: "unable to find user by this id"});
    }

   const blog = new Blog({  title , content , image , user });

   try{
       //await blog.save();

        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({session});
        existinguser.blogs.push(blog);
        await existinguser.save({session});
        await session.commitTransaction();

   } catch(err) {
        console.log(err);
        return res.status(500).json({message:err});
   }

   return res.status(201).json({blog});
}

export const update = async(req, res, next) => { 
    const blogid = req.params.id;


    const { title , content } = req.body;
    let blog;
    
    try{
        blog = await Blog.findByIdAndUpdate(blogid, {
            title, 
            content}
        );
    } catch(err) {
        return console.log(err);
    }

    if(!blog) {
        return res.status(500).json({message: "unable to update the blog" });
    }
 
    return res.status(200).json({blog});
 }

 export const getByID = async(req, res, next) => { 
    const blogid = req.params.id;
    let blog;
    
    try{
        blog = await Blog.findById(blogid);
    } catch(err) {
        return console.log(err);
    }

    if(!blog) {
        return res.status(404).json({message: "unable to find the blog" });
    }
 
    return res.status(200).json({blog});
 }

 export const deleteBlog = async(req, res, next) => {
    const blogid = req.params.id;
    let blog;
    
    try{
        blog = await Blog.findByIdAndDelete(blogid).populate("user");
        await blog.user.blogs.pull(blog);
        await blog.user.save();

    } catch(err) {
        return console.log(err);
    }

    if(!blog) {
        return res.status(500).json({message: "unable to delete the blog" });
    }
 
    return res.status(200).json({message: "blog deleted"});
 }

 export const getBlogsByUser = async(req, res, next) => { 
    const userid = req.params.id;

    let userBlogs;

    try{
        userBlogs = await User.findById(userid).populate("blogs");
    }
    catch(err){
        return console.log(err);
    }

    if(!userBlogs){
        return res.status(404).json({message: "No blogs found for this user"});
    }   
    return res.status(200).json({blogs: userBlogs});
}