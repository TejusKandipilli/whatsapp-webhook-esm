import Router from "express"
import { sendHelloCat } from "../controllers/sendImage.controller.js"

const router = Router()

router.post('/sendHello/:number',sendHelloCat)



export default router