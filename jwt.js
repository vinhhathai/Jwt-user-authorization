var jwt = require("jsonwebtoken");
var data = {
  username: "Ha Thai Vinh",
  password: "vinh0982",
};
var token = jwt.sign(data, "0982989262");
console.log(token);
var decoded = jwt.verify(token, "0982989262");
console.log(decoded); // bar
