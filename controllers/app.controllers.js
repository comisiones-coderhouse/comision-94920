import path from "path";

const __dirname = path.resolve();

export const homeController = (req, res) => {
    const viewPath = path.join(__dirname, "views", "index.html");
    res.sendFile(viewPath);
}

export const dashboardController = (req, res) => {
    const viewPath = path.join(__dirname, "views", "dashboard.html");
    res.sendFile(viewPath);
}