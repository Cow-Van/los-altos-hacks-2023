const mongoose = require("mongoose");
const customAlphabet = require("nanoid/async");
const AccessToken = require("../models/accessTokenModel");
const { createRefreshToken } = require("./refreshTokenController");

const getAccessTokens = async (token) => { // DEV
    return await AccessToken.find();
}

const isAccessTokenValid = async (token) => {
    return await AccessToken.exists({ token: token });
}

const getAccessToken = async (token) => {
    return await AccessToken.findOne({ token: token });
}

const getAccessTokenByRefreshToken = async (refreshToken) => {
    return await AccessToken.findOne({ refresh_token: refreshToken });
}

const getAccessTokenByUserId = async (userId) => {
    return await AccessToken.findOne({ user: userId });
}

const deleteAccessToken = async (token) => {
    return await AccessToken.deleteOne({ token: token });
}

const createAccessToken = async (user, override = false) => {
    let token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));

    if (override) {
        await AccessToken.deleteOne({ user: user._id });
    }

    while (await isAccessTokenValid(token)) {
        token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));
    }

    const refreshToken = await createRefreshToken();
    const accessToken = await AccessToken.create({ token: token, refresh_token: refreshToken.token, user: user._id })

    return { accessToken, refreshToken };
}

module.exports = {
    getAccessTokens,
    isAccessTokenValid,
    getAccessToken,
    getAccessTokenByRefreshToken,
    getAccessTokenByUserId,
    deleteAccessToken,
    createAccessToken,
}