const express = require("express");
const router = express.Router();
const UserController = require("../../controllers/UserController");
const auth = require("../../middleware/Auth");

router.post("/register", UserController.createUser);
router.post("/login", UserController.loginUser);
router.post("/user", auth.auth, UserController.getUser);
router.post("/me", auth.auth, UserController.getUserProfile);
router.patch("/user/:userId", auth.auth, UserController.updateUser);
router.patch("/user/:userId/password", auth.auth, UserController.updatePassword);

module.exports = router;