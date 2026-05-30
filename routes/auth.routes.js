import passport from "passport"
import express from "express"

import { loginController, loginViewController } from "../controllers/auth.controllers.js"

const router = express.Router()

router.get("/login", loginViewController)
router.post("/login", passport.authenticate("local") /* loginController */)

/* 
router.get("/login", 

router.get("/signup", 

router.post("/login", 

router.post("/signup", 
*/

export default router