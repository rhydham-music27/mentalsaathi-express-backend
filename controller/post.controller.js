import communityPostModel from '../models/community.post.model.js';
import userModel from '../models/user.model.js';
//  {
//     id: 1,
//     title: "Feeling overwhelmed with semester exams",
//     author: "Anonymous Student",
//     time: "2 hours ago",
//     replies: 12,
//     likes: 8,
//     category: "Academic Stress",
//     preview:
//       "Anyone else feeling like they can't breathe thinking about upcoming exams?",
//   }
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

// export default communityController