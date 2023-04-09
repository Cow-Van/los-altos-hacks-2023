const mongoose = require("mongoose");
const { createPassword } = require("./passwordController");
const { MissingFieldsError, InvalidUsernameError, UserNotFoundError } = require("../util/error");
const User = require("../models/userModel");

// User.deleteMany().then((res) => { // DEV
//     console.log(res.deletedCount);
// });

const getUsers = async () => {
    return await User.find().sort({ createdAt: -1 });
}

const getUser = async (id) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return new UserNotFoundError("No such user");
    }

    const user = await User.findById(id);

    if (!user) {
        return new UserNotFoundError("No such user");
    }

    return user
}

const isValidUserId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
}

const createUser = async (firstName, lastName, username, password, email) => {
    let emptyFields = [];

    if (!firstName) {
        emptyFields.push("first_name");
    }
    if (!lastName) {
        emptyFields.push("last_name");
    }
    if (!username) {
        emptyFields.push("username");
    }
    if (!password) {
        emptyFields.push("password");
    }
    if (!email) {
        emptyFields.push("email");
    }

    if (emptyFields.length > 0) {
        return new MissingFieldsError("Please fill in all fields: "+ emptyFields.join(", "));
    }

    const user = await User.create({ first_name: firstName, last_name: lastName, username: username, email: email });
    await createPassword(user._id, password);

    return user;
}

const findUserByUsername = async (username) => {
    const user = await User.findOne({ username: username });

    if (!user) {
        throw new InvalidUsernameError(`No such user with username: ${username}`);
    }

    return user;
}

module.exports = {
    getUsers,
    getUser,
    isValidUserId,
    createUser,
    findUserByUsername,
}