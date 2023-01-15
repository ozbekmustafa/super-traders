const portfolio = require('./models/portfolio/model'),
    portfolio_shares = require('./models/portfolio_shares/model'),
    shares = require('./models/shares/model'),
    transactions = require('./models/transactions/model');

module.exports = {
    portfolio: portfolio,
    portfolio_shares: portfolio_shares,
    shares: shares,
    transactions: transactions
}