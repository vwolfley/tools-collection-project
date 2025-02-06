const express = require("express");
const router = express.Router();

router.use("/users", require("./users"));
router.use("/userTools", require("./userTools"));
router.use("/tools", require("./tools"));
router.use("/toolSets", require("./toolSets"));

module.exports = router;
