import { handleError } from "../helpers/handleError.js"
import Like from "../models/bloglike.model.js"


export const doLike = async (req, res, next) => {
    try {
        const { user, blogid } = req.body
        //check user like this blog before or not so get the like
        let like
        like = await Like.findOne({ user, blogid })

        if (!like) {
            const addLike = new Like({
                user, blogid
            })
            like = await addLike.save()
        } else {
            //remove like
            await Like.findByIdAndDelete(like._id)
        }

        //count total like 
        const likecount = await Like.countDocuments({ blogid })

        res.status(200).json({
            likecount

        })

    } catch (error) {
        next(handleError(500, error.message))
    }


}
export const LikeCount = async (req, res, next) => {
    try {

        const { blogid, userid } = req.params

        const likecount = await Like.countDocuments({ blogid })
        let isUserLiked = false
        if(userid){
            const getuserlike = await Like.countDocuments({blogid, user:userid})
            if(getuserlike>0){
                isUserLiked = true
            }
        
        }

        res.status(200).json({
            likecount,
            isUserLiked

        })

    } catch (error) {
        next(handleError(500, error.message))
    }
}