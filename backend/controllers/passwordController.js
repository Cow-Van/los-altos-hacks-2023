const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Password = require("../models/passwordModel");

// Password.deleteMany().then((res) => { // DEV
//     console.log(res.deletedCount);
// });

const getPasswords = async () => { // DEV
    return await Password.find();
}

const getPassword = async (user) => {
    if (!mongoose.Types.ObjectId.isValid(user._id)) {
        throw Error("No such user");
    }

    return await Password.findOne({ user: user.id });
}

const createPassword = async (user, password) => {
    const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
    const hash = await bcrypt.hash(password, salt);

    await Password.create({ user, hash, salt });
}

module.exports = {
    getPasswords,
    getPassword,
    createPassword,
}