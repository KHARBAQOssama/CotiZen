const mongoose = require("mongoose");
const User = require("../api/components/users/models");
require("dotenv").config();

module.exports = () => {
  mongoose.connect(process.env.DB_URL);

  const db = mongoose.connection;

  db.on("error", (err) => {
    console.error("MongoDB connection error:", err);
  });

  db.once("open", async () => {
    console.log("Connected to MongoDB");
    seedDefaultSyndic();
  });
};

async function seedDefaultSyndic() {
  const existingUser = await User.findOne({
    email: process.env.DEFAULT_SYNDIC_EMAIL,
  });

  if (!existingUser) {
    let user = new User({
      full_name: process.env.DEFAULT_SYNDIC_FULL_NAME,
      email: process.env.DEFAULT_SYNDIC_EMAIL,
      password: process.env.DEFAULT_SYNDIC_PASSWORD,
    });
    let insertedUser = await user.save();
    console.log("User inserted successfully!");
    return insertedUser;
  } else {
    console.log("User already exists!");
  }
}
