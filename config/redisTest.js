require("dotenv").config();
const client = require("./redisClient");

client.on("connect", () => {
  console.log("Redis connected successfully!");
});

client.on("error", (err) => {
  console.error("Redis error:", err);
});

(async () => {
  await client.connect();
})();
