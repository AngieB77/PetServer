require("dotenv").config();

const express = require("express");
const app = express();
const sequelize = require("./db");
const sign = require("./controllers/signincontroller");
const pet = require("./controllers/petcontroller");

sequelize.sync();
// sequelize.sync({ force: true });

// app.use("/api/test", function(req, res) {
//   res.send("This is api new");
// });
app.use(express.json());

app.use("/signin", sign);
app.use("rescue/pet", pet);

app.listen(process.env.PORT, function(req, res) {
  console.log(`Listening ${process.env.PORT}`);
});
