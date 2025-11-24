const User = require("../models/User");
const { signToken } = require("../utils/jwt");
const redisClient = require("../config/redisClient");

async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      return res.status(400).json({ message: "Email already exist" });
    }
    const user = new User({
      name,
      email,
      password,
    });
    await user.save();
    const token = signToken({ id: user._id.toString(), email: user.email });
    await redisClient.set(`sess:${user._id}`, token, "EX", 60 * 60 * 24);
    res.status(201).json({
      user: { id: user._id.toString(), name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const isValid = await user.comparePassword(password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    const token = signToken({ id: user._id.toString(), email: user.email });
    await redisClient.set(`sess:${user._id}`, token, "EX", 60 * 60 * 24);
    res.status(200).json({
      user: { id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { id } = req.user;
    await redisClient.del(`sess:${id}`);
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    next(err);
  }
}

async function edit(req, res, next) {
  try {
    const userId = req.user.id;
    const updates = {};
    if (req.body.name) updates.name = req.body.name;
    if (req.body.email) updates.email = req.body.email;
    if (req.body.password) updates.password = req.body.password;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    Object.assign(user, updates);
    await user.save();

    res
      .status(200)
      .json({ user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    next(err);
  }
}

async function deleteUser(req, res, next) {
  try {
    const userId = req.user.id;
    await User.findByIdAndDelete(userId);
    await redisClient.del(`sess:${userId}`);

    const Note = require("../models/Note");
    await Note.deleteMany({ user: userId });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
}

async function getUser(req, res, next) {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, logout, edit, deleteUser };
