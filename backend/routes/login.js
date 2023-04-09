const express = require("express");
const bcrypt = require("bcrypt");
const { findUserByUsername } = require("../controllers/userController");
const { getPassword } = require("../controllers/passwordController");

const router = express.Router();

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    let user;

    try {
        user = await findUserByUsername(username);
    } catch (e) {
        switch (e.name) {
            case "InvalidUsernameError":
                return res.status(400).send({ description: "Invalid username and password" });
            default:
                console.error(e.stack);
                return res.status(500).send({ description: e.message });
        }
    }

    let pwd;
    let result;
    try {
        pwd = await getPassword(user);
        result = await bcrypt.compare(password, pwd.hash);
    } catch (e) {
        console.error(e.stack);
        return res.status(500).send({ description: e.message });
    }

    if (result) {
        return res.status(200).send({ description: "Logged in" });
    } else {
        return res.status(400).send({ description: "Invalid username and password" });
    }
});

module.exports = router;