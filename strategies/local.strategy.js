//var LocalStrategy = require('passport-local');
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken"

import UserModel from "../models/users.model.js";
import { SECRET_KEY } from "../config/secret-key.config.js";

export const strategy = new LocalStrategy((username, password, cb) => {
    UserModel.find({ email: email })
        .then((laRespuesta) => {

            if (laRespuesta[0].password !== password) {
                //return res.status(401).send("Contraseña incorrecta");
                return cb(null, false, { message: "Contraseña incorrecta" })
            }

            const token = jwt.sign({ email: laRespuesta[0].email }, SECRET_KEY)

            //req.session.token = token;
            //res.cookie("token", token, { httpOnly: true, signed: true })
            //res.redirect("/dashboard");
            cb(null, laRespuesta[0])
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            return res.status(500).send("Error al buscar usuario");
        });
})