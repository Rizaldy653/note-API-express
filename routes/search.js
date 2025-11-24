const express = require("express");
const router = express.Router();
const { searchNote } = require("../controllers/user");
const { verifyToken } = require("../middleware/auth");

router.get("/", verifyToken, searchNote);

module.exports = router;
