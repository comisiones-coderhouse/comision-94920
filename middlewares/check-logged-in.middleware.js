import jwt from "jsonwebtoken"
import { SECRET_KEY } from "../config/secret-key.config.js"

function checkLoggedIn(req, res, next) {
    //if (req.signedCookies.email) {
    //Header : Authorization : Bearer token
    //req.headers.authorization -> 

    const headers = req.headers //{...., authorization : "", ...}
    const authorizationHeader = headers.authorization // "Bearer token....."

    if(!authorizationHeader) {
        return next();
    }

    const authorizacionArray = authorizationHeader.split(" ") // ["Bearer", "token....."]
    const token = authorizacionArray[1]; // "token....."

    try {
        const decoded = jwt.verify(token, SECRET_KEY)

        if (decoded) {
            res.redirect("/dashboard");
        } else {
            next();
        }

    } catch (error) {
        console.log(error)
    }

}

export default checkLoggedIn;