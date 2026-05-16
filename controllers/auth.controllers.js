import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken"

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

            const token = jwt.sign({ email: laRespuesta[0].email }, "secret-key")

            console.log("🚀 ~ auth.controllers.js:21 ~ loginController ~ token:", token)

            jwt.
            req.session.email = laRespuesta[0].email;
            res.redirect("/dashboard");
        })
        .catch((err) => {
            console.error("Error finding user:", err);
            return res.status(500).send("Error al buscar usuario");
        });
}
