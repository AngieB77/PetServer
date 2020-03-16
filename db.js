const Sequelize = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres"
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to postgres rescueblue database"))
  .catch(err => console.log(err));

let User = sequelize.import("./models/user");
let Pets = sequelize.import("./models/pet");

Pets.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Pets);

module.exports = sequelize;
