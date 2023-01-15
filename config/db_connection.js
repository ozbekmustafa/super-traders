const Sequelize = require('sequelize');
const { DB_SETTINGS } = require('./config');

const sequelize = new Sequelize(DB_SETTINGS.NAME, DB_SETTINGS.USER, DB_SETTINGS.PASS, {
    host: DB_SETTINGS.HOST,
    dialect: DB_SETTINGS.DIALECT,
    logging: DB_SETTINGS.LOGGING
});

sequelize.authenticate()
    .then(async () => {
        console.log("Connected to the database successfuly !");
        sync();
    }).catch((err) => {
        console.log("Error: " + err)
    });


function sync() {
    console.log("Database sync...");
    require("../models/portfolio/schema");
    require("../models/shares/schema");
    require("../models/portfolio_shares/schema");
    require("../models/transactions/schema");
}

module.exports = {
    sequelize: sequelize
}

