import passport from "passport"
import express from "express"

import { loginController, loginViewController, signupController, signupViewController } from "../controllers/auth.controllers.js"
import UserModel from "../models/users.model.js"

const router = express.Router()

router.get("/login", loginViewController)
router.post("/login", passport.authenticate("local", { successRedirect: "/dashboard", failureRedirect: "/login" }))
router.post("/signup", signupController);
router.get("/signup", signupViewController);

export default router