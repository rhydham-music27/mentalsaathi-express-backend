import communityPostModel from '../models/community.post.model.js';
import likeModel from '../models/like.model.js';
import userModel from '../models/user.model.js';

export const communityController = async (request, response) => {
    const { title, category, preview } = request.body
    const { name } = await userModel.findById(request.user._id)
    if (!title) return response.status(400)
        .send({
            message: "enter your post title",
            success: false
        })
    if (!preview) return response.status(400)
        .send({
            message: "enter your post preview",
            success: false
        })
    if (!category) return response.status(400)
        .send({
            message: "enter your category tags",
            success: false
        })
    if (!name) return response.status(503).send({
        message: "cannot get your name from database. please make sure that you are login",
        success: false
    })
    try {
        const postData = await new communityPostModel({ author: name, title, category, preview }).save()
        response.status(201).send({
            message: "post created succesfully",
            success: true,
            ...postData
        })
    } catch (error) {
        console.log(error)
        return response.status(503).send({
            message: "database server is unreachable ",
            success: false
        })
    }

}
export const getCommunityController = async (request, response) => {
    try {
        const communityPostData = await communityPostModel.find({})
        return response.status(200).send({
            message: "community post get succesfull",
            success: true,
            communityPostData
        })
    } catch (error) {
        return response.status(503).send({
            message: "database server unreachable ",
            success: false
        })
    }

}

export const LikeByIdController = async (request, response) => {
    const postId = request.params.id
    // const { userMail } = request.body
    const userData = await userModel.findById(request.user._id)
    const userMail = userData.email
    try {
        if (!postId) return response.status(400)
            .send({
                message: "please enter post id",
                success: false
            })
        if (!userMail) return response.status(400)
            .send({
                message: "please enter user mail",
                success: false
            })
        //check if post exists
        const postData = await communityPostModel.findById(postId)
        if (!postData) return response.status(404)
            .send({
                message: "this post doesnot exist",
                success: false
            })
        //check if user like exist
        const userLike = await likeModel.findOne({ userMail, postId })
        // console.log(userLike)
        //if dont then like it otherwise dont
        if (!userLike) {
            const likeData = await likeModel({ postId, userMail }).save()
            return response.status(201)
                .send({
                    message: "post is liked",
                    success: true
                })
        }
        if (userLike) {
            await likeModel.deleteOne({ postId, userMail })
            return response.status(200)
                .send({
                    message: "like was removed",
                    success: true
                })
        }
    } catch (error) {
        return response.status(503)
            .send({
                ...error,
                message: "unknown error occurred",
                success: false
            })
    }
}
export const getLikeController = async (request, response) => {
    try {
        const likeData = await likeModel.find({})
        return response.status(200).send({
            message: "data fetched successfully",
            success: true,
            likeData
        })
    } catch (error) {
        return response.status(503).send({
            message: "database error occured",
            success: false
        })
    }

}
// export default communityController