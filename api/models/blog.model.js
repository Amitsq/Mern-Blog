import mongoose, { Types } from "mongoose";
import Comment from "./comment.model.js";
import Like from "./bloglike.model.js";

const blogSchema = new mongoose.Schema({
    author:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },

    category:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Category'
    },

    title: {
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique: true,
        trim:true
    },
    blogContent:{
        type:String,
        required:true,
        
        trim:true
    },
    featuredImage:{
        type: String,
        required: true,
        trim: true
    }
    
},{timestamps: true})

//middleware: run before deleting blog

blogSchema.pre("findOneAndDelete", async function (next) {
    const blog  = await this.model.findOne(this.getFilter()) //get the blog which need to delete
if (blog) {
    // Delete related comments
    await Comment.deleteMany({ blogid: blog._id });

    // Delete related likes
    await Like.deleteMany({ blogid: blog._id });
  }

    next()
})





const Blog = mongoose.model('Blog',blogSchema,'blogs')
export default Blog