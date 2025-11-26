const express = require("express");
const router = express.Router();
const {
  createNote,
  getNotes,
  getNoteById,
  editNote,
  deleteNote,
} = require("../controllers/noteController");
const auth = require("../middleware/auth");

router.get("/", auth, getNotes);
router.get("/:id", auth, getNoteById);
router.post("/", auth, createNote);
router.put("/edit/:id", auth, editNote);
router.delete("/delete/:id", auth, deleteNote);

module.exports = router;
