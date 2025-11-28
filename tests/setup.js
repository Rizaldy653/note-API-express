const mongoose = require("mongoose");

require("dotenv").config();

beforeAll(async () => {
    await mongoose.connect(process.env.Mongo_URI_TEST);
});

 afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
 });