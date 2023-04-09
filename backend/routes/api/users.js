const express = require("express");
const { isValidUserId, getUser } = require("../../controllers/userController");

const router = express.Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!id || !isValidUserId(id)) {
        res.status(400).json({ description: "Invalid id" });
    }

    try {
        const user = await getUser(id);
        return res.status(200).json({ user });
    } catch (e) {
        switch (e.name) {
            case "UserNotFoundError":
                res.status(404);
                break;
            default:
                res.status(500);
        }

        res.json({ description: e.message })
    }
});

module.exports = router;