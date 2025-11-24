require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");
const userRoutes = require("./routes/user");
const searchRoutes = require("./routes/search");

const app = express();
app.use(cors());
app.use(bodyParser.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/note", noteRoutes);
app.use("/api/user", userRoutes);
app.use("/api/search", searchRoutes);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
