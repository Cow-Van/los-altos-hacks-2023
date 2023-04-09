const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

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

// Logs errors
const errorLogger = (err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).send(err.message);
} 

module.exports = {
    logger: logger,
    limitRequestSize: express.json({ limit: "1mb" }), // Limits requests to 1MB
    forceHttps: forceHttps,
    serveStatic: express.static(path.join(__dirname, "public")), // Set up static HTML site
    cookieParser: cookieParser(), // Allow for access to cookies in request header
    errorLogger: errorLogger,
}