import session from "express-session";
import SessionFileStore from "session-file-store";

//https://www.npmjs.com/package/connect-mongo

const FileStore = SessionFileStore(session);

const middleware = session({
    secret: "secret-key",
    cookie: {
        httpOnly: true,
        signed: true,
    },
    resave: false,
    saveUninitialized: false,
    store: new FileStore(),
})

export default middleware