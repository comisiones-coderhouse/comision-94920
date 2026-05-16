import path from "path";

const __dirname = path.resolve();

export const dashboardController = (req, res) => {
    /* if (!req.signedCookies.email) {
        return res.redirect("/login");
    } */
    const viewPath = path.join(__dirname, "views", "dashboard.html");
    res.sendFile(viewPath);
}