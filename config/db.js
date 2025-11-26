const mongoose = require("mongoose");

module.exports = function connectDB() {
  const URI = process.env.MONGO_URI;
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => {
      console.log(err);
      process.exit(1);
    });
};
