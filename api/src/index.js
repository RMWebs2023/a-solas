const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const fileUpload = require("express-fileupload");
const connection = require("./utils/database.js");
const router = require("./routes/index.routes.js");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "./images",
  })
);
app.use("/", router);

// función que levanta el servidor
app.listen(3000, () => {
  connection();
  console.log("Server is listening on port", 3000);
});
