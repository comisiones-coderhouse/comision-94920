import { SECRET_KEY } from "../config/secret-key.config.js";
import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken"
import path from "path"

export const loginController = (req, res) => {

    if (!req.body.email || !req.body.password) {
        return res.status(400).send("Faltan datos en el body");
    }

    const { email, password } = req.body;

    UserModel.find({ email: email })
        .then((laRespuesta) => {

            if (laRespuesta[0].password !== password) {
                return res.status(401).send("Contraseña incorrecta");
            }

            const token = jwt.sign({ email: laRespuesta[0].email }, SECRET_KEY)

            //req.session.token = token;
            res.cookie("token", token, { httpOnly: true, signed: true })
            res.redirect("/dashboard");
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            return res.status(500).send("Error al buscar usuario");
        });
}

export const loginViewController = (req, res) => {

    const __dirname = path.resolve();

    const viewPath = path.join(__dirname, "views", "login.html");
    res.sendFile(viewPath);
}