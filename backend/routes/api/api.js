const express = require("express");

const selfRoutes = require("./self");
const usersRoutes = require("./users");
const recipesRoutes = require("./recipes");

const router = express.Router();

router.use("/self", selfRoutes);
router.use("/users", usersRoutes);
router.use("/recipes", recipesRoutes);

module.exports = router;