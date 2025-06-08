import express  from 'express'
import { Authenticator } from '../middleware/auth.middleware.js'
import { getJournalController, journalController } from '../controller/tools.controller.js'
const toolsRouter = express.Router()
toolsRouter.post('/journal', Authenticator,journalController)
toolsRouter.get('/get-journal',Authenticator,getJournalController)
export default toolsRouter