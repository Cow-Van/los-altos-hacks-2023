const express = require("express");
const { getAccessTokenByRefreshToken, isAccessTokenValid, createAccessToken } = require("../controllers/accessTokenController");
const { isRefreshTokenValid } = require("../controllers/refreshTokenController");

const router = express.Router();

// Sends new access & refresh token when old refresh token is recieved
router.get("/", async (req, res) => {
    const oldRefreshToken = req.cookies["refresh_token"];
    
    if (!(await isRefreshTokenValid(oldRefreshToken))) {
        return res.status(400).send({ description: "Refresh token expired" });
    }

    const oldAccessToken = await getAccessTokenByRefreshToken(oldRefreshToken);

    if (!(await isAccessTokenValid(oldAccessToken.token))) {
        return res.status(401).send({ description: "Access token invalid" });
    }

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
});

module.exports = router;