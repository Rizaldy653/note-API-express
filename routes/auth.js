const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  edit,
  deleteUser,
} = require("../controllers/userController");
const { verifyToken } = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.put("/edit", verifyToken, edit);
router.delete("/delete", verifyToken, deleteUser);

module.exports = router;
