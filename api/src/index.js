const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const fileUpload = require("express-fileupload");
const connection = require("./utils/database.js");
const router = require("./routes/index.routes.js");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./images",
  })
);
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://asolas.com.ar');
  next();
});
app.use("/", router);

// función que levanta el servidor
app.listen(PORT, () => {
  connection();
  console.log("Server is listening on port", PORT);
});
