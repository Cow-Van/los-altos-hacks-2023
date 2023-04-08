const cookieParser = require("cookie-parser");
const express = require("express");
const path = require("path");

// Redirect to HTTPS if request is HTTPS
function forceHttps(req, res, next) {
    if (!req.secure) {
        return res.redirect("https://" + req.headers.host + req.url);
    }

    next();
}

module.exports = {
    limitRequestSize: express.json({ limit: "1mb" }), // Limits requests to 1MB
    forceHttps: forceHttps,
    serveStatic: express.static(path.join(__dirname, "public")), // Set up static HTML site
    cookieParser: cookieParser(), // Allow for access to cookies in request header
}