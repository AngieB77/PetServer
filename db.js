const Sequelize = require('sequelize');

const sequelize = new Sequelize('rescueblue', 'postgres', 'Letmein1234', {
    host: 'localhost',
    dialect: 'postgres'
});

sequelize.authenticate().then(
    function() {
        console.log('Connected to postgres rescue database');
    },
    function(err){
        console.log(err);
    }
);

module.exports = sequelize;