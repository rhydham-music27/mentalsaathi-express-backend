import { Router } from "express"
import profileStorage from "../storage/profile.storage.js"
import { profileUploadController, VideoUploadController, ThumbnailUploadController } from "../controller/media.controller.js"
import videoStorage from "../storage/video.storage.js"
import thumbnailStorage from "../storage/thumbnail.storage.js"
const mediaRouter = Router()
mediaRouter.post('/profile', profileStorage.single('profile'), profileUploadController)
mediaRouter.post('/videos', videoStorage.single('video'), VideoUploadController)
mediaRouter.post('/thumbnail', thumbnailStorage.single('thumbnail'), ThumbnailUploadController)
export default mediaRouter