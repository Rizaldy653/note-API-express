const Note = require("../models/Note");

async function searchNote(req, res, next) {
  try {
    const q = req.query.q || "";
    const userId = req.user ? req.user.id : null;

    const regex = new RegExp(q, "i");
    const filter = {
      $or: [{ title: regex }, { content: regex }, { tags: regex }],
    };
    if (userId) {
      filter.user = userId;
    }

    const result = await Note.find(filter);
    res.status(200).json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (err) {
    next(err);
  }
}

module.exports = { searchNote };
