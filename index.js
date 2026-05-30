import mongoose from "mongoose";
import session from "express-session";
import app from "./app.js";
import { SECRET_KEY } from "./config/secret-key.config.js";

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
