const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  edit,
  deleteUser,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", auth, logout);
router.put("/edit", auth, edit);
router.delete("/delete", auth, deleteUser);

module.exports = router;
