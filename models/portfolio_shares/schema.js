const Sequelize = require('sequelize');
const { sequelize } = require('../../config/db_connection');


const PortfolioShares = sequelize.define('portfolio_shares', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  portfolio_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  share_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});
sequelize.sync();
module.exports = { PortfolioShares };