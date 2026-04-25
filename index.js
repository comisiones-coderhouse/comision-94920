import express from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import path from "path";
import session from "express-session";
import SessionFileStore from "session-file-store";
const FileStore = SessionFileStore(session);

const __dirname = path.resolve();

const app = express();

app.use(express.json()); //{ nombre : "horacio", edad : 35}
app.use(express.urlencoded()); //nombre=horacio&edad=35
app.use(cookieParser("secret-key"));
app.use(
  session({
    secret: "secret-key",
    cookie: {
      httpOnly: true,
      signed: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
  }),
);

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (elDato) => {
          console.log("🚀 ~ index.js:19 ~ elDato:", elDato);

          return elDato.includes("@");
        },
        message: "El email no es válido",
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const UserModel = mongoose.model("User", userSchema);

function checkLoggedIn(req, res, next) {
  if (req.signedCookies.email) {
    res.redirect("/dashboard");
  } else {
    next();
  }
}

console.log("Hola Mundo");

app.get("/session", (req, res) => {
  console.log(req.session.id);
  console.log(req.session);
  res.send("session");
});

app.get("/", checkLoggedIn, (req, res) => {
  const viewPath = path.join(__dirname, "views", "index.html");
  res.sendFile(viewPath);
});

app.get("/login", checkLoggedIn, (req, res) => {
  const viewPath = path.join(__dirname, "views", "login.html");
  res.sendFile(viewPath);
});

app.get("/signup", checkLoggedIn, (req, res) => {
  const viewPath = path.join(__dirname, "views", "signup.html");
  res.sendFile(viewPath);
});

app.get("/dashboard", (req, res) => {
  if (!req.signedCookies.email) {
    return res.redirect("/login");
  }
  const viewPath = path.join(__dirname, "views", "dashboard.html");
  res.sendFile(viewPath);
});

app.post("/login", (req, res) => {
  if (!req.body) {
    return res.status(400).send("Faltan datos en el body");
  }

  const { email, password } = req.body;

  UserModel.find({ email: email })
    .then((laRespuesta) => {
      if (laRespuesta[0].password !== password) {
        return res.status(401).send("Contraseña incorrecta");
      }

      //req.session.nuevaProp = "nuevoValor"
      req.session.email = laRespuesta[0].email;
      /* res.cookie("email", laRespuesta[0].email, {
        httpOnly: true,
        signed: true,
      }); */
      //return res.send(laRespuesta);
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.error("Error finding user:", err);
      return res.status(500).send("Error al buscar usuario");
    });
});

app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  /*
    const inst = new UserModel()
    inst.save()
    */

  UserModel.create({ email, password })
    .then(() => {
      res.send("Usuario creado con exito!");
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      return res.status(500).send("Error al crear usuario");
    });
});

mongoose
  .connect("mongodb://127.0.0.1:27017/miapp")
  .then(() => {
    console.log("Conectado a MongoDB");
    app.listen(3000, () => {
      console.log("Servidor prendido!");
    });
  })
  .catch((err) => {
    console.log(err);
  });
