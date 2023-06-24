const express = require("express");
const connection = require("./database.js");
const router = require("./routes/index.js");

const app = express();

app.use(express.json())
app.use("/", router);

app.listen(3000, () => {
  connection();
  console.log("Server is listening on port", 3000);
});
