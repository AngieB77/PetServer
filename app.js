require("dotenv").config();

const express = require("express");
const app = express();
const sequelize = require("./db");
const user = require("./controllers/signincontroller");
const pet = require("./controllers/petcontroller");

sequelize.sync();
// sequelize.sync({ force: true });

// app.use("/api/test", function(req, res) {
//   res.send("This is api new");
// });
app.use(express.json());
app.use(require("./middleware/headers"));
app.use(require("./middleware/validate-session"));

app.use("/signin", user);
app.use("/pet", pet);
app.use("/pet", pet);

app.listen(process.env.PORT, function(req, res) {
  console.log(`Listening`);
});
