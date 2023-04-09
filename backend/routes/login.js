const express = require("express");
const bcrypt = require("bcrypt");
const { findUserByUsername } = require("../controllers/userController");
const { getPassword } = require("../controllers/passwordController");

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;

    const user = await findUserByUsername(username);

    if (!user) {
        return res.status(400).send("Invalid username and password");
    }

    const pwd = await getPassword(user);
    const result = await bcrypt.compare(password, pwd.hash);

    if (result) {
        return res.status(200).send("Logged in");
    } else {
        return res.status(400).send("Invalid username and password");
    }
});

module.exports = router;