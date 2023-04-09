/* ------------------- IMPORTS ------------------- */
require("dotenv").config(); // Loads .env contents to process.env

const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const mongoose = require("mongoose");

const middleware = require("./util/middleware");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");
const refreshTokenRoutes = require("./routes/refreshToken");
const apiRoutes = require("./routes/api/api");
/* ------------------- IMPORTS END ------------------- */

/* ------------------- CONSTANTS ------------------- */
const expressServer = express();

const privateKey = fs.readFileSync(path.join(__dirname, "/secrets/server.key"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "/secrets/server.crt"), "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(expressServer);
const httpsServer = https.createServer(credentials, expressServer);
/* ------------------- CONSTANTS END ------------------- */

/* ------------------- MIDDLEWARE ------------------- */
expressServer.use(middleware.logger);
expressServer.use(middleware.limitRequestSize);
expressServer.use(middleware.forceHttps);
expressServer.use(middleware.cors);
expressServer.use(middleware.serveStatic);
expressServer.use(middleware.cookieParser);
/* ------------------- MIDDLEWARE END ------------------- */

/* ------------------- ROUTES ------------------- */
expressServer.use("/login", loginRoutes);
expressServer.use("/signup", signupRoutes);
expressServer.use("/refresh_token", refreshTokenRoutes);
expressServer.use("/api", apiRoutes);

expressServer.get("/api/users", async (req, res) => { // DEV
    res.send(await require("./controllers/userController").getUsers());
});
expressServer.get("/api/passwords", async (req, res) => { // DEV
    res.send(await require("./controllers/passwordController").getPasswords())
});
/* ------------------- ROUTES END ------------------- */

/* ------------------- SERVER LISTENING ------------------- */
// Connect to DB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to DB");

        // Http listen on port
        httpServer.listen(process.env.HTTP_PORT, process.env.HTTP_HOSTNAME, () => {
            console.log(`HTTP Express Server listening on port ${process.env.HTTP_PORT}!`);
        });

        // Https listen on port
        httpsServer.listen(process.env.HTTPS_PORT, process.env.HTTPS_HOSTNAME, () => {
            console.log(`HTTPS Express Server listening on port ${process.env.HTTPS_PORT}!`);
        });
    }).catch((e) => {
        console.error(e);
    })
/* ------------------- SERVER LISTENING END ------------------- */