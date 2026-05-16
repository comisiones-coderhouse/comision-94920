import express from "express";
import jsonBodyMiddlware from "./middlewares/json-body.middleware.js"
import queryStringMiddleware from "./middlewares/querystring-body.middleware.js"
import cookieParserMiddleware from "./middlewares/cookie-parser.middleware.js"
import sessionMiddleware from "./middlewares/session.middleware.js"
import authRoutes from "./routes/auth.routes.js"
import appRoutes from "./routes/app.routes.js"

//class App {...}
const app = express();

app.use(jsonBodyMiddlware);
app.use(queryStringMiddleware);
app.use(cookieParserMiddleware);
app.use(sessionMiddleware);

app.use(authRoutes)
app.use(appRoutes)
/* app.get("/session", (req, res) => {
  console.log(req.session.id);
  console.log(req.session);
  res.send("session");
}); */

/* app.get("/", checkLoggedIn, (req, res) => {
  const viewPath = path.join(__dirname, "views", "index.html");
  res.sendFile(viewPath);
}); */

/* app.get("/login", checkLoggedIn, (req, res) => {
  const viewPath = path.join(__dirname, "views", "login.html");
  res.sendFile(viewPath);
}); */

/* app.get("/signup", checkLoggedIn, (req, res) => {
  const viewPath = path.join(__dirname, "views", "signup.html");
  res.sendFile(viewPath);
}); */

/* app.get("/dashboard", (req, res) => {
  if (!req.signedCookies.email) {
    return res.redirect("/login");
  }
  const viewPath = path.join(__dirname, "views", "dashboard.html");
  res.sendFile(viewPath);
}); */

/* app.post("/signup", (req, res) => {
  const { email, password } = req.body;

  UserModel.create({ email, password })
    .then(() => {
      res.send("Usuario creado con exito!");
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      return res.status(500).send("Error al crear usuario");
    });
}); */


export default app