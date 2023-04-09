const mongoose = require("mongoose");
const customAlphabet = require("nanoid/async")
const RefreshToken = require("../models/refreshTokenModel");

const isRefreshTokenValid = async (token) => {
    return await RefreshToken.exists({ token: token });
}

const deleteRefreshToken = async (token) => {
    await RefreshToken.deleteOne({ token: token });
}

const createRefreshToken = async () => {
    let token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));

    while (await isRefreshTokenValid(token)) {
        token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));
    }

    return new RefreshToken({ token: token });
}

module.exports = {
    isRefreshTokenValid,
    createRefreshToken,
}