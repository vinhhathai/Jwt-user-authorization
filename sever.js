const express = require("express");
const app = express();
const port = 3000;
const router = require("./routes/routers");
const path = require("path");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/public", express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "views")));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
