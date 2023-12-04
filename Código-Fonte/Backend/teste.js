const bcrypt = require("bcrypt");
const saltRounds = 10;
const userEmail = "admin@gmail.com";
const userPasswd = "sysadmin";
const salt = bcrypt.genSaltSync(saltRounds);
const hashedPasswd = bcrypt.hashSync(userPasswd, salt);

console.log(`Email: ${userEmail} - Passwd: ${hashedPasswd}`);