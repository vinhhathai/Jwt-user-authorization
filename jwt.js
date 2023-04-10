var jwt = require("jsonwebtoken");
const fs = require("fs");
var data = {
  username: "Ha Thai Vinh",
  password: "vinh0982",
};
var privateKey = fs.readFileSync("./key/privatekey.pem");
var token = jwt.sign({ foo: "bar" }, privateKey, { algorithm: "RS256" });
console.log(token);

var cert = fs.readFileSync("./key/publickey.pem"); // get public key
jwt.verify(token, cert, { algorithms: ["RS256"] }, function (err, payload) {
  console.log(err)
  console.log(payload)

});
