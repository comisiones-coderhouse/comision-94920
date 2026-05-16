import express from "express"
import { loginController } from "../controllers/auth.controllers.js"

const router = express.Router()

router.post("/login", loginController)

/* 
router.get("/login", 

router.get("/signup", 

router.post("/login", 

router.post("/signup", 
*/

export default router