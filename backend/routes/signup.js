const express = require("express");
const { createUser } = require("../controllers/userController");

const router = express.Router();

router.post("/", async (req, res) => {
    const { first_name, last_name, username, password, email } = req.body;

    try {
        const user = await createUser(first_name, last_name, username, password, email);
        return res.status(200).json(user);
    } catch (e) {
        switch (e.name) {
            case "MissingFieldsError":
                res.status(400);
                break;
            default:
                res.status(500);
            
            console.error(e.stack);
            return res.send(e.message);
        }
    }
});

module.exports = router;