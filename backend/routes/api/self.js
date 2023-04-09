const express = require("express");
const { isAccessTokenValid, getAccessToken } = require("../../controllers/accessTokenController");
const { getUser } = require("../../controllers/userController");

const router = express.Router();

router.get("/", async (req, res) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ description: "Missing Authorization header" });
    }

    const [authType, authToken] = authHeader.split(" ");
    if (authType !== "Bearer" || !authToken) {
        return res.status(401).json({ description: "Invalid Authorization header" });
    }

    try {
        if (!(await isAccessTokenValid(authToken))) {
            return res.status(401).json({ description: "Invalid Authorization token" });
        }

        const accessToken = await getAccessToken(authToken);

        return res.status(200).json(await getUser(accessToken.user));
    } catch (e) {
        return res.status(500).json({ description: e.message });
    }
});

module.exports = router;