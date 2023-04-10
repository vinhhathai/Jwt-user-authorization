const express = require("express");
const router = express.Router();
const accountModel = require("../models/accountModel");
const path = require("path");
var jwt = require("jsonwebtoken");

// login api
router.post("/login", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  accountModel
    .findOne({
      username: username,
      password: password,
    })
    .then((data) => {
      if (data) {
        const token = jwt.sign({ token: data._id }, "18082003");
        res.send({
          msg: "Login successfully!",
          token: token,
        });
      } else {
        res.send("Tai khoan hoac mat khau khong chinh xac!");
      }
    })
    .catch(() => {
      res.send("Co loi!");
    });
});

//check Login
const checkLogin = (req, res, next) => {
  const cookieValue = req.cookies.token;
  if (!cookieValue) {
    return res.status(400).send("Cookie not found");
  }
  try {
    const decoded = jwt.verify(cookieValue, "18082003");
    accountModel.findById(decoded.token).then((data) => {
      if (data) {
        req.data = data.role;
        next();
      } else {
        res.send("Loi sever khong tìm thấy dữ liệu!!!");
      }
    });
  } catch (err) {
    res.status(500).send("Loi token");
  }
};
// student api
router.get("/student", checkLogin, (req, res, next) => {
  if (req.data >= 1) {
    res.send("Student da dang nhap thanh cong!");
  } else {
    res.send("Student khong co quyen truy cap");
  }
});

router.get("/teacher", checkLogin, (req, res, next) => {
  if (req.data >= 2) {
    res.send("Teacher da dang nhap thanh cong!");
  } else {
    res.send(" khong co quyen truy cap");
  }
});

router.get("/manager", checkLogin, (req, res, next) => {
  if (req.data >= 3) {
    res.send("Manager da dang nhap thanh cong!");
  } else {
    res.send(" khong co quyen truy cap");
  }
});

//-----------------------------------------------------------------
router.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "../views/login.html");
  res.sendFile(filePath);
});
router.get("/", (req, res) => {
  res.send("HOME PAGE");
});

module.exports = router;
