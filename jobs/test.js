const euler = require("../methods/euler_1");
const test = require("../functions/test");

// 予備実験

for (let line of euler(test, 0, 0, "0.01", 4 * Math.PI)) {
  console.log(line.map(a => +a).join(" "));
}
