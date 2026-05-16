import express from "express"
import { dashboardController } from "../controllers/app.controllers.js"


const router = express.Router()

router.get("/dashboard", dashboardController)

export default router