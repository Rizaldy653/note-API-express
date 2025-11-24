const { verifyToken } = require("../utils/jwt");
const redisClient = require("../config/redisClient");

module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers[authorization];
    if (!authHeader) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Malformed Token" });
    }

    let payload = await verifyToken(token);
    try {
      payload = verifyToken(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const redisKey = "sess:${payload.id}";
    const stored = await redisClient.get(redisKey);

    if (!stored) {
      return res.status(401).json({ message: "ISession Expired" });
    }

    if (stored !== token) {
      return res.status(401).json({ message: "Token Mismatch" });
    }

    req.user = { id: payload.id, eamil: payload.email };
    next();
  } catch (err) {
    next(err);
  }
};
