const Note = require("../models/Note");

async function createNote(req, res, next) {
  try {
    const userId = req.user.id;
    const { title, content, tags } = req.body;

    const note = new Note({
      title,
      content,
      tags,
      user: userId,
    });

    await note.save();

    res.status(201).json({ note });
  } catch (err) {
    next(err);
  }
}

async function getNotes(req, res, next) {
  try {
    const userId = req.user.id;
    const notes = (await Note.find({ user: userId })).sort({ createdAt: -1 });
    res.status(200).json({ notes });
  } catch (err) {
    next(err);
  }
}

async function getNoteById(req, res, next) {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (err) {
    next(err);
  }
}

async function editNote(req, res, next) {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const note = await Note.findOne({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const { title, content, tags } = req.body;
    if (title !== undefined) note.title = title;
    if (content !== undefined) note.content = content;
    if (tags !== undefined) note.tags = tags;

    await note.save();

    res.status(200).json({ note });
  } catch (err) {
    next(err);
  }
}

async function deleteNote(req, res, next) {
  try {
    const userId = req.user.id;
    const noteId = req.params.id;
    const note = await Note.findOneAndDelete({ _id: noteId, user: userId });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (err) {
    next(err);
  }
}

module.exports = { createNote, getNotes, getNoteById, editNote, deleteNote };
