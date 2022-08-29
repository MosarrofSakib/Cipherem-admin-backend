const express = require("express");
const router = express.Router();
const { postEmail } = require("../controller/mailController");
const { mailAll } = require("../controller/mailToAllController");
const verifyToken = require("../middleware/jwt.auth");

router.post("/", postEmail);
router.post("/sendmail", [verifyToken], mailAll);

module.exports = router;
