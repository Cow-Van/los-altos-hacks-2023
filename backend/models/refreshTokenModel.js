const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const refreshTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: parseInt(process.env.REFRESH_TOKEN_EXPIRE_TIME),
    },
});

module.exports = mongoose.model("RefreshToken", refreshTokenSchema);