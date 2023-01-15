const Sequelize = require('sequelize');
const { sequelize } = require('../../config/db_connection');

const Portfolio = sequelize.define('portfolio', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
sequelize.sync();
module.exports = { Portfolio };
