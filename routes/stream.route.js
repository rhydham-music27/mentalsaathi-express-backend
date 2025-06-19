import { Router } from "express";
import { tokenController } from "../controller/stream.controller.js";

const streamRouter = Router();
streamRouter.post('/token', tokenController)
export default streamRouter