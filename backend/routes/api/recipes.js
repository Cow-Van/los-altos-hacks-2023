const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { isAccessTokenValid, getAccessToken } = require("../../controllers/accessTokenController");
const { addRecipe, getRecipes } = require("../../controllers/recipeController");

const router = express.Router();
const upload = multer({ dest: "../frontend/uploads" })

router.post("/upload", upload.single("image"), (req, res, next) => {
    fs.rename("../frontend/uploads/" + req.file.filename, "../frontend/uploads/" + req.file.filename + "." + req.file.originalname.split(".").pop(), (e) => {
        if (e) {
            console.error(e);
        }
    })
    res.status(200).send({ "path": "/uploads/" + req.file.filename + "." + req.file.originalname.split(".").pop() });
});

router.post("/", async (req, res) => {
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
        const recipe = await addRecipe(accessToken.user, req.body.meal_of_day, req.body.ingredients, req.body.steps, req.body.image);

        return res.status(200).json(recipe);
    } catch (e) {
        console.error(e.stack);
        return res.status(500).json({ description: e.message });
    }
});

router.get("/", async (req, res) => {
    return res.status(200).json(await getRecipes({ meal_of_day: req.query.meal_of_day }, parseInt(req.query.limit)));
});

module.exports = router;