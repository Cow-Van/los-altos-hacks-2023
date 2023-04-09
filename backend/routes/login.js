const express = require("express");
const bcrypt = require("bcrypt");
const { findUserByUsername } = require("../controllers/userController");
const { getPassword } = require("../controllers/passwordController");
const { createAccessToken } = require("../controllers/accessTokenController");

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    let user;

    try {
        user = await findUserByUsername(username);
    } catch (e) {
        switch (e.name) {
            case "InvalidUsernameError":
                return res.status(400).send({ description: "Invalid username and password" });
            default:
                console.error(e.stack);
                return res.status(500).send({ description: e.message });
        }
    }

    let pwd;
    let result;
    try {
        pwd = await getPassword(user);
        result = await bcrypt.compare(password, pwd.hash);
    } catch (e) {
        console.error(e.stack);
        return res.status(500).send({ description: e.message });
    }

    if (result) {
        const { accessToken, refreshToken } = await createAccessToken();

        res.cookie("refresh_token", refreshToken.token), {
            domain: process.env.DOMAIN,
            path: "/refresh_token",
            secure: true,
            httpOnly: true,
            sameSite: "strict",
            maxAge: parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME),
        };

        return res.status(200).send({ "credential": accessToken.token });
    } else {
        return res.status(400).send({ description: "Invalid username and password" });
    }
});

module.exports = router;