const mongoose = require("mongoose");
require("dotenv").config();

const URI = process.env.MONGODB_URI;

const connection = () => {
  mongoose.set("strictQuery", false);
  mongoose
    .connect(URI, {})
    .then(() => console.log("Database connected!"))
    .catch((error) => console.log(error));
};

module.exports = connection;
