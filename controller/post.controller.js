import communityPostModel from '../models/community.post.model.js';
import userModel from '../models/user.model.js';
export const communityController = async (request, response) => {
    const { title, post, description } = request.body
    const { name } = await userModel.findById(request.user._id)
    if (!title) return response.status(400)
        .send({
            message: "enter your post title",
            success: false
        })
    if (!description) return response.status(400)
        .send({
            message: "enter your post description",
            success: false
        })
    if (!post) return response.status(400)
        .send({
            message: "enter your post tags",
            success: false
        })
    if (!name) return response.status(503).send({
        message: "cannot get your name from database. please make sure that you are login",
        success: false
    })
    try {
        const postData = await new communityPostModel({ name, title, description, post }).save()
        response.status(201).send({
            message: "post created succesfully",
            success: true
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

// export default communityController