var express = require("express");
var main = express();

main.use(express.static(__dirname + "/user/export"));

main.get("/", (req, res) => {
  res.sendFile(__dirname + "/user/export/main.html");
});

main.listen(8080);
console.log("Application is running on port 8080");
