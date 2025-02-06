const express = require("express");
const router = express.Router();

router.use("/", require("./lesson1"));
router.use("/users", require("./users"));
router.use("/tools", require("./tools"));

module.exports = router;
