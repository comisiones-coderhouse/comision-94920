import passport from "passport";
import express from "express";

import jsonBodyMiddlware from "./middlewares/json-body.middleware.js"
import queryStringMiddleware from "./middlewares/querystring-body.middleware.js"
import cookieParserMiddleware from "./middlewares/cookie-parser.middleware.js"
import sessionMiddleware from "./middlewares/session.middleware.js"
import authRoutes from "./routes/auth.routes.js"
import appRoutes from "./routes/app.routes.js"
import { strategy } from "./strategies/local.strategy.js";

const app = express();

app.use(jsonBodyMiddlware);
app.use(queryStringMiddleware);
app.use(cookieParserMiddleware);
app.use(sessionMiddleware);
app.use(passport.authenticate('session'));

passport.serializeUser((user, cb) => {
  console.log("Serializando user...")
  cb(null, user._id);
})  

passport.deserializeUser((user, cb) => {
  console.log("Deserializando user...")
  return cb(null, user);
})

passport.use(strategy);

app.use(authRoutes)
app.use(appRoutes)

export default app