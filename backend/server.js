/* ------------------- IMPORTS ------------------- */
require("dotenv").config(); // Loads .env contents to process.env

const express = require("express");
const fs = require("fs");
const http = require("http");
const https = require("https");
const path = require("path");
const middleware = require("./middleware");
/* ------------------- IMPORTS END ------------------- */

/* ------------------- CONSTANTS ------------------- */
const expressServer = express();

const privateKey = fs.readFileSync(path.join(__dirname, "/secrets/server.key"), "utf8");
const certificate = fs.readFileSync(path.join(__dirname, "/secrets/server.crt"), "utf8");
const credentials = { key: privateKey, cert: certificate };

const httpServer = http.createServer(expressServer);
const httpsServer = https.createServer(credentials, expressServer);
/* ------------------- CONSTANTS END ------------------- */
expressServer.use(middleware.limitRequestSize);
expressServer.use(middleware.forceHttps);
expressServer.use(middleware.serveStatic);
expressServer.use(middleware.cookieParser);
/* ------------------- MIDDLEWARE END ------------------- */

/* ------------------- ROUTES ------------------- */
/* ------------------- ROUTES END ------------------- */

/* ------------------- SERVER LISTENING ------------------- */
// Http listen on port
httpServer.listen(process.env.HTTP_PORT, process.env.HTTP_HOSTNAME, () => {
    console.log(`HTTP Express Server listening on port ${process.env.HTTP_PORT}!`);
});

// Https listen on port
httpsServer.listen(process.env.HTTPS_PORT, process.env.HTTPS_HOSTNAME, () => {
    console.log(`HTTPS Express Server listening on port ${process.env.HTTPS_PORT}!`);
});
/* ------------------- SERVER LISTENING END ------------------- */