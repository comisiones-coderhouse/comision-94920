//1) importar la libreria express
//const express = require("express")
import express from "express"
import cookieParser from "cookie-parser"

//crear una instancia de express
//const express = express
const app = express()
//app.use([path string ,] middleware fn)
//app.METHOD(path string, callback fn)

app.use(express.json())
app.use(cookieParser())


app.get("/", (req, res) => {
    //console.log(req.query)
    console.log(req.cookies)
    if (req.cookies.nombre) {
        res.send("Hola " + req.cookies.nombre)
    } else {
        res.send("Logueate")
    }
})

app.post("/login", (req, res) => {
    //console.log(req.body) //{}
    //req.body.nombre
    res.cookie("nombre", req.body.nombre)
    res.send("Hola Mundo")
})

app.post("/signup", (req, res) => {
    console.log(req.body) //{}
    res.send("Hola Mundo")
})

//prender el puerto
app.listen(3000, () => {
    console.log("Servidor prendido!")
})


/* 
HTTP 

Cliente - Servidor
Request - Response


METODO URL VERSION
Headers
Body

GET / http/1.1
Accept : text/html
Body : 

Metodos/Verbos : GET - POST - PUT - PATCH - DELETE - ...
URL / IP : "/" - "https://google.com" - "https://google.com/search?q=cortauñas"

*/