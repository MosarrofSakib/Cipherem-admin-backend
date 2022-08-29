const express = require("express");
const router = express.Router();
const {
  userPending,
  userAprove,
  userAll,
  AprovedUser,
} = require("../controller/adminController");
const { login, createAdmin } = require("../controller/auth.controller");
const verifyToken = require("../middleware/jwt.auth");

router.post("/login", login);
router.post("/create-admin", [verifyToken], createAdmin);
router.get("/user/all", [verifyToken], userAll);
router.get("/user/pending", [verifyToken], userPending);
router.get("/user/approved", [verifyToken], AprovedUser);
router.post("/user/approve", [verifyToken], userAprove);

module.exports = router;
