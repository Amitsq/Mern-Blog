import { handleError } from '../helpers/handleError.js'
import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import cloudinary from "../config/cloudinary.js"
import Blog from '../models/blog.model.js'
import Comment from '../models/comment.model.js'

export const getUser = async(req,res,next)=>{
    try {
        const {userid} = req.params
        const user = await User.findOne({_id: userid}).lean().exec()
        if(!user){
            next(handleError(404,'User not found.'))
        }
        res.status(200).json({
            success: true,
            message: 'user data found.',
            user
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const updateUser =async(req,res,next)=>{
    try {
        const data = JSON.parse(req.body.data)
        const {userid} = req.params
        const user = await User.findById(userid)
        user.name = data.name
        user.email = data.email
        user.bio = data.bio

        if(data.password && data.password.length>=6){
            const hashedPassword = bcryptjs.hashSync(data.password)
            user.password =hashedPassword
        }
        if(req.file){
        // upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'mern-blog', resource_type: 'auto' }
                )
                .catch((error) => {
                    next(handleError(500, error.message))
                })

            user.avatar = uploadResult.secure_url
        }


        await user.save()
        const newUser = user.toObject({getters: true})
        delete newUser.password

        res.status(200).json({
            success: true,
            message: ' data updated.',
            user : newUser
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}

export const getAllUser = async(req, res, next) =>{
    try {
        const user = await User.find().sort({createdAt:-1})

        res.status(200).json({
            user
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}
export const deleteUser = async(req, res, next) =>{
    try {
        const {id} = req.params
     await User.findByIdAndDelete(id)

     //delete user's blogs
     await Blog.updateMany({ author: id }, { author: null });

     //delete user's comments
       await Comment.updateMany({ blogid: id }, { user: null });


        res.status(200).json({
            success: true,
            message: "User Deleted."
        })
    } catch (error) {
        next(handleError(500,error.message))
    }
}