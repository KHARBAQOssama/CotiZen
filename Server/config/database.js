const mongoose = require("mongoose");
require("dotenv").config();

module.exports = () => {
  mongoose.connect(process.env.DB_URL);

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", async () => {
    console.log("Connected to MongoDB");
  });
};
