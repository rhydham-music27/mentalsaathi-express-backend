import { Router } from "express"
import { verifyController } from "../controller/user.controller.js"

const userRouter = Router()

userRouter.get('/verify/:id',verifyController )
export default userRouter