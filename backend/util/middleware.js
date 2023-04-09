const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");
const cors = require("cors");

const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.indexOf(origin) !== -1 || origin === undefined) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
};

// Logs requests
const logger = (req, res, next) => {
    console.log(req.method + ": " + req.protocol + "://" + req.headers.host + req.url);

    next();
}

// Redirect to HTTPS if request is HTTPS
const forceHttps = (req, res, next) => {
    if (!req.secure) {
        return res.redirect("https://" + req.headers.host + req.url);
    }

    next();
}

module.exports = {
    logger: logger,
    limitRequestSize: express.json({ limit: "1mb" }), // Limits requests to 1MB
    forceHttps: forceHttps,
    cors: cors(corsOptions),
    serveStatic: express.static(path.join(path.dirname(path.dirname(__dirname)), "frontend")), // Set up static HTML site
    cookieParser: cookieParser(), // Allow for access to cookies in request header
}