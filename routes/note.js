const express = require("express");
const router = express.Router();
const {
  createNote,
  getNote,
  getNoteById,
  editNote,
  deleteNote,
} = require("../controllers/note");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, getNote);
router.get("/:id", verifyToken, getNoteById);
router.post("/", verifyToken, createNote);
router.put("/edit/:id", verifyToken, editNote);
router.delete("/delete/:id", verifyToken, deleteNote);

module.exports = router;
