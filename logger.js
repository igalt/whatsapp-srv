const users = require("./users");

function log(msg) {
  global.console.log(`Great Logger Says::: ${msg}`);
}

users.on("createdNew", (arg) => {
  log(`new user created! \n ${arg}`);
});

module.exports.log = log;
