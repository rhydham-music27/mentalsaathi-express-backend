import { Router } from "express";
import { detectControllerasync } from "../controller/hf.controller.js";

const hfRouter = Router()

hfRouter.post('/detect', detectControllerasync)
export default hfRouter