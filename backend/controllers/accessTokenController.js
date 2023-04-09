const mongoose = require("mongoose");
const customAlphabet = require("nanoid/async");
const AccessToken = require("../models/accessTokenModel");
const { createRefreshToken } = require("./refreshTokenController");

const isAccessTokenValid = async (token) => {
    return await AccessToken.exists({ token: token });
}

const getAccessTokenByRefreshToken = async (refreshToken) => {
    return await AccessToken.findOne({ refresh_token: refreshToken });
}

const createAccessToken = async (user, override = false) => {
    let token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));

    if (override) {
        await AccessToken.deleteOne({ user: user.id });
    }

    while (await isAccessTokenValid(token)) {
        token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));
    }

    const refreshToken = await createRefreshToken();
    const accessToken = new AccessToken({ token: token, refresh_token: refreshToken.token })

    return { accessToken, refreshToken };
}

module.exports = {
    isAccessTokenValid,
    getAccessTokenByRefreshToken,
    createAccessToken,
}