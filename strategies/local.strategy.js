//var LocalStrategy = require('passport-local');
import { Strategy as LocalStrategy } from "passport-local";
import jwt from "jsonwebtoken"

import UserModel from "../models/users.model.js";
import { SECRET_KEY } from "../config/secret-key.config.js";

export const strategy = new LocalStrategy((username, password, cb) => {
    UserModel.find({ email: username })
        .then((laRespuesta) => {

            if (laRespuesta[0].password !== password) {
                return cb(null, false, { message: "Contraseña incorrecta" })
            }

            //const token = jwt.sign({ email: laRespuesta[0].email }, SECRET_KEY)

            cb(null, laRespuesta[0])
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            return cb(err);
        });
})