const express = require("express");

const selfRoutes = require("./self");
const usersRoutes = require("./users");

const router = express.Router();

router.use("/self", selfRoutes);
router.use("/users", usersRoutes);

module.exports = router;