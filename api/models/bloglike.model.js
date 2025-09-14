import mongoose, { Types } from "mongoose";


const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },

    blogid:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    },

   
    
},{timestamps: true})

const Like = mongoose.model('Like',likeSchema,'likes')
export default Like