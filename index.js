import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"

const app = express()

app.use(express.json())
app.use(cookieParser())


const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (elDato) => {

                console.log("🚀 ~ index.js:19 ~ elDato:", elDato)

                return elDato.includes("@")
            },
            message: "El email no es válido"
        }
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })

const UserModel = mongoose.model("User", userSchema)


app.get("/", (req, res) => {
    if (req.cookies.nombre) {
        res.send("Hola " + req.cookies.nombre)
    } else {
        res.send("Logueate")
    }
})

app.post("/login", (req, res) => {

    /* let nombre = "Horacio";

    if (req.body && req.body.nombre) {
        nombre = req.body.nombre
    }

     */
    if (!req.body) {
        return res.status(400).send("Faltan datos en el body")
    }

    const { email, password } = req.body

    UserModel.find({ email: email })
        .then((laRespuesta) => {

            console.log("🚀 ~ index.js:61 ~ laRespuesta:", laRespuesta)
            console.log("🚀 ~ index.js:58 ~ password:", password)


            if (laRespuesta[0].password !== password) {
                return res.status(401).send("Contraseña incorrecta")
            }

            res.cookie("nombre", laRespuesta[0])
            return res.send(laRespuesta)
        })
        .catch((err) => {
            console.error("Error finding user:", err)
            return res.status(500).send("Error al buscar usuario")
        })
})

app.post("/signup", (req, res) => {

    const { email, password } = req.body

    /* 
    const inst = new UserModel()
    inst.save()
    */

    UserModel.create({ email, password })
        .then(() => {
            res.send("Usuario creado con exito!")
        })
        .catch((err) => {
            console.error("Error creating user:", err)
            return res.status(500).send("Error al crear usuario")
        })


})

mongoose.connect("mongodb://127.0.0.1:27017/miapp")
    .then(() => {
        console.log("Conectado a MongoDB")
        app.listen(3000, () => {
            console.log("Servidor prendido!")
        })
    })
    .catch((err) => {
        console.log(err)
    })
