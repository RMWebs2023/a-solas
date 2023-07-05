const express = require("express");
const cors = require("cors")
const connection = require("./database.js");
const router = require("./routes/index.js");

const app = express();

app.use(cors())
app.use(express.json());
app.use("/", router);

app.listen(3000, () => {
  connection();
  console.log("Server is listening on port", 3000);
});
