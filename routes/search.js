const express = require("express");
const router = express.Router();
const { searchNote } = require("../controllers/searchController");
const auth = require("../middleware/auth");

router.get("/", auth, searchNote);

module.exports = router;
