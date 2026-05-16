import mongoose from "mongoose";
import session from "express-session";
import app from "./app.js";

function checkLoggedIn(req, res, next) {
  if (req.signedCookies.email) {
    res.redirect("/dashboard");
  } else {
    next();
  }
}

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
