// const { verifyToken } = require("../utils/jwt");
// const redisClient = require("../config/redisClient");

// module.exports = async function auth(req, res, next) {
//   try {
//     const authHeader = req.headers["authorization"];
//     if (!authHeader) {
//       return res.status(401).json({ message: "No Token Provided" });
//     }

//     const token = authHeader.split(" ")[1];
//     if (!token) {
//       return res.status(401).json({ message: "Malformed Token" });
//     }

//     let payload;
//     try {
//       payload = await verifyToken(token);
//     } catch (err) {
//       return res.status(401).json({ message: "Invalid Token" });
//     }

//     const redisKey = `sess:${payload.id}`;
//     const stored = await redisClient.get(redisKey);

//     if (!stored) {
//       return res.status(401).json({ message: "Session Expired" });
//     }

//     if (stored !== token) {
//       return res.status(401).json({ message: "Token Mismatch" });
//     }

//     req.user = { id: payload.id, email: payload.email };
//     next();
//   } catch (err) {
//     next(err);
//   }
// };

const { verifyToken } = require("../utils/jwt");
const redisClient = require("../config/redisClient");

module.exports = async function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No Token Provided" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Malformed Token" });
    }

    let payload;
    try {
      payload = await verifyToken(token);
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }

    const redisKey = `sess:${payload.id}`;
    const stored = await redisClient.get(redisKey);

    if (!stored) {
      return res.status(401).json({ message: "Session Expired" });
    }

    if (stored !== token) {
      return res.status(401).json({ message: "Token Mismatch" });
    }

    req.user = { id: payload.id, email: payload.email };

    next();
  } catch (err) {
    next(err);
  }
};
