const mongoose = require("mongoose");
const customAlphabet = require("nanoid/async")
const RefreshToken = require("../models/refreshTokenModel");

const getRefreshTokens = async (token) => { // DEV
    return await RefreshToken.find();
}

const isRefreshTokenValid = async (token) => {
    return await RefreshToken.exists({ token: token });
}

const getRefreshToken = async (token) => {
    return await RefreshToken.findOne({ token: token });
}

const deleteRefreshToken = async (token) => {
    await RefreshToken.deleteOne({ token: token });
}

const createRefreshToken = async () => {
    let token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));

    while (await isRefreshTokenValid(token)) {
        token = await customAlphabet(parseInt(process.env.ACCESS_TOKEN_LENGTH));
    }

    return RefreshToken.create({ token: token });
}

module.exports = {
    getRefreshTokens,
    isRefreshTokenValid,
    getRefreshToken,
    deleteRefreshToken,
    createRefreshToken,
}