const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const accessTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    refresh_token: {
        type: Schema.Types.ObjectId,
        ref: "RefreshToken",
        required: true,
        unique: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    created_at: {
        type: Date,
        default: Date.now,
        expires: parseInt(process.env.ACCESS_TOKEN_EXPIRE_TIME),
    },
});

module.exports = mongoose.model("AccessToken", accessTokenSchema);