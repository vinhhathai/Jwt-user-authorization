const express = require("express");
const router = express.Router();
const accountModel = require("../models/accountModel");
const path = require("path");
var jwt = require("jsonwebtoken");

router.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  accountModel
    .findOne({
      username: username,
      password: password,
    })
    .then((data) => {
      if (data) {
        var token = jwt.sign(
          {
            secret: data._id,
          },
          "0982"
        );
        res.send({
          token: token,
          status: "Đăng nhập thành công!",
        });
      } else {
        res.send("Tai khoan hoan mat khau khong chinh xac!");
      }
    })
    .catch(() => {
      res.send("Loi sever!");
    });
});
//-----------------------------------------------
const checkLogin = (req, res, next) => {
  try {
    var decoded = jwt.verify(req.cookies.token, "0982");
    accountModel
      .findOne({
        _id: decoded.secret,
      })
      .then((data) => {
        req.data = data.role;
        next();
      })
      .catch(() => {
        console.log("Loi sever");
      });
  } catch {
    res.send("Token khong ton tai");
  }
};

router.get("/student", checkLogin, (req, res, next) => {
  res.send("Student!!!");
});
router.get(
  "/teacher",
  checkLogin,
  (req, res, next) => {
    if (req.data >= 2) {
      next();
    } else {
      res.send("Not permission!!!!!!");
    }
  },
  (req, res, next) => {
    res.send("Teacher!!!");
  }
);
router.get(
  "/manager",
  checkLogin,
  (req, res, next) => {
    if (req.data >= 3) {
      next();
    } else {
      res.send("Not permission!!!!!!");
    }
  },
  (req, res, next) => {
    res.send("Manager!!!");
  }
);
//-----------------------------------------------------------------
router.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "../views/login.html");
  res.sendFile(filePath);
});
router.get("/", (req, res) => {
  res.send("HOME PAGE");
});

module.exports = router;
