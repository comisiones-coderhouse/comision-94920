import { SECRET_KEY } from "../config/secret-key.config.js";
import UserModel from "../models/users.model.js";
import jwt from "jsonwebtoken"
import path from "path"
import bcrypt from "bcrypt"

const __dirname = path.resolve();

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

    const viewPath = path.join(__dirname, "views", "login.html");
    res.sendFile(viewPath);
}

export const signupController = (req, res) => {
    const { email, password } = req.body;

    bcrypt.hash(password, 12, (err, hash) => {
        // Store hash in your password DB.

        UserModel.create({ email, password: hash })
            .then(() => {

                //Devolver 201 aca no lo quiero por ahora, porque no quiero interactuar con esta ruta/controlador como si fuera una API, sino que quiero que el flujo sea : formulario de signup -> redireccion a login -> formulario de login -> redireccion a dashboard. Si devuelvo un 201, lo que espero es que el front se encargue de hacer la redireccion, pero como no tengo un front separado, sino que estoy usando el mismo servidor para servir las vistas, lo que voy a hacer es directamente la redireccion desde el controlador. De esta forma, el flujo queda mas claro y no tengo que preocuparme por manejar la redireccion desde el front.
                //200 : OK
                //201 : Created
                //res.status(201).send("Usuario creado con exito!");
                res.redirect("/login");
            })
            .catch((err) => {
                return res.status(500).send("Error al crear usuario");
            });
    });


}

export const signupViewController = (req, res) => {

    const viewPath = path.join(__dirname, "views", "signup.html");
    res.sendFile(viewPath);
}
