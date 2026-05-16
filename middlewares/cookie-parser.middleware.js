import cookieParser from "cookie-parser";

const middleware = cookieParser("secret-key")

export default middleware