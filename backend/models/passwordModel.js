const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const passwordSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Password", passwordSchema);