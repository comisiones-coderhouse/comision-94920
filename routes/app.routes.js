import express from "express"
import { dashboardController, homeController } from "../controllers/app.controllers.js"
import checkLoggedIn from "../middlewares/check-logged-in.middleware.js"


const router = express.Router()

router.get("/", checkLoggedIn, homeController)
router.get("/dashboard", dashboardController)

export default router