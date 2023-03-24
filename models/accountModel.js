const mongoose = require("mongoose");
const { Schema } = mongoose;

mongoose
  .connect("mongodb://127.0.0.1:27017/test")
  .then((data) => {
    console.log("Completed!");
  })
  .catch((err) => {
    console.log("Loi khi ket noi den CSDL!");
  });
//--------------------------
const accountSchema = new Schema(
  {
    username: String,
    password: String,
    role: Number,
  },
  {
    collection: "account",
  }
);

const accountModel = mongoose.model("account", accountSchema);
module.exports = accountModel;
/*
const checkLogin = (req, res, next) => {
  //check login
  try {
    const cookies = req.cookies.token;
    var decoded = jwt.verify(cookies, "0982");
    accountModel
      .findOne({
        _id: decoded.codeID,
      })
      .then((data) => {
        if (data) {
          req.data = data;
          next();
        } else {
          res.json("Not permission");
        }
      })
      .catch(() => {
        res.json("token khong ton tai!");
      });
  } catch {
    res.json("token khong ton tai!");
  }
};

router.get("/task", checkLogin, (req, res, next) => {
  res.send("All task!!!");
});

router.get(
  "/student",
  checkLogin,
  (req, res, next) => {
    if (req.data.role >= 2) {
      next();
    } else {
      res.send("Ban ko co quyen dang nhap!");
    }
  },
  (req, res, next) => {
    res.json("Student");
  }
);

router.get(
  "/teacher",
  checkLogin,
  (req, res, next) => {
    if (req.data.role >= 3) {
      next();
    } else {
      res.send("Ban ko co quyen dang nhap");
    }
  },
  (req, res, next) => {
    res.json("teacher");
  }
);

//---------------------------------
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
        var codeID = data._id;
        var token = jwt.sign(
          {
            codeID,
          },
          "0982"
        );
        res.send({
          data: "Thành công đăng nhập!",
          token: token,
        });
      } else {
        res.send("Tai khoan khong ton tai!");
      }
    })
    .catch(() => {
      res.send("Loi!");
    });
});
router.get("/login", (req, res) => {
  const filePath = path.join(__dirname, "../views/login.html");
  res.sendFile(filePath);
});
*/
