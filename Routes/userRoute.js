const express = require("express");
const router = express.Router();
const { login, loginSocial } = require("../controller/loginController");
const {
  register,
  registerSocial,
} = require("../controller/registerController");

router.post("/login", login);
router.post("/login-social", loginSocial);

router.post("/register", register);
router.post("/register-social", registerSocial);

module.exports = router;
