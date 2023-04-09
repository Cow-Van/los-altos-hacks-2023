const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    description: {
        type: String,
        required: true,
    },
    time: {
        type: Number,
        required: true,
    },
    frequency: {
        type: String,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
        unique: true,
    },
});

module.exports = mongoose.model("Reminder", userSchema);