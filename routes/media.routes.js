import { Router } from "express"
import profileStorage from "../storage/profile.storage.js"
import { profileUploadController } from "../controller/media.controller.js"
const mediaRouter = Router()
mediaRouter.post('/profile', profileStorage.single('profile'), profileUploadController)
export default mediaRouter