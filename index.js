"use strict";
const {argv} = require("node:process");
var creditcard = require("./creditcard.js");

if (1 < argv.length) {
  let cli = argv.slice(2);
  let cc = creditcard.normalize(cli);
  console.log(cc + ": " + creditcard.type(cc));
}
