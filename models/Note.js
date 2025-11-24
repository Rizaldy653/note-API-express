const moongose = require("mongoose");

const NoteSchema = new moongose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    tags: {
      type: [String],
    },
    user: {
      type: moongose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

NoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = moongose.model("Note", NoteSchema);
