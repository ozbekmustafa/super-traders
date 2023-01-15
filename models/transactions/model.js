const { Transactions: schema } = require("../transactions/schema"),
    error = require("../../config/errorCodes"),
    transactionType = require("../../config/transactionTypes"),
    portfolio = require("../portfolio/model"),
    shares = require("../shares/model"),
    portfolio_shares = require("../portfolio_shares/model");

transactions = module.exports = {
    create: async (portfolio_id, share_id, transaction_type, quantity, price) => {
        const user = await portfolio.findOne(portfolio_id);
        const share = await shares.findOne(share_id);
        if (user === error.PORTFOLIO_NOT_FOUND) {
            return error.PORTFOLIO_NOT_FOUND;
        } else if (share === error.SHARE_NOT_FOUND) {
            return error.SHARE_NOT_FOUND;
        } else {
            const portfolioShare = await portfolio_shares.findOne(portfolio_id, share_id);
            quantity = transaction_type == transactionType.BUY ? quantity : quantity * -1;

            if (portfolioShare === error.PORTFOLIO_SHARE_NOT_FOUND) {
                if (transaction_type === transactionType.SELL) {
                    return error.INSUFFICIENT_SHARE;
                }
                const portfolioShare = await portfolio_shares.create(portfolio_id, share_id, quantity);
                console.log(portfolioShare);
                if (!portfolioShare.hasOwnProperty('isNewRecord')) {
                    return error.UNEXPECTED_DB_ERROR;
                }
            } else {
                if (quantity < 0 && (portfolioShare.quantity + quantity < 0)) {
                    return error.INSUFFICIENT_SHARE;
                } else {
                    await portfolio_shares.update(portfolio_id, share_id, quantity);
                }
            }
            return await schema.create({
                portfolio_id: portfolio_id,
                share_id: share_id,
                transaction_type: transaction_type,
                quantity: quantity,
                price: price
            }).then(transaction => {
                return transaction;
            }).catch(error => {
                return error;
            });
        }
    },
    findOne: async (id) => {
        return schema.findOne({
            where: { id: id }
        }).then(transaction => {
            if (transaction)
                return transaction;
            else
                return error.TRANSACTION_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
    findAll: async () => {
        return schema.findAll()
            .then(transaction => {
                return transaction;
            }).catch(error => {
                return error;
            });
    },
    update: async (id, quantity, price) => {
        return schema.update(
            {
                quantity: quantity,
                price: price
            },
            { where: { id: id } })
            .then(transaction => {
                if (transaction > 0) {
                    return `Transaction ${id} updated.`;
                }
                else
                    return error.TRANSACTION_NOT_FOUND;
            }).catch(error => {
                return error;
            });
    },
    deleteOne: async (id) => {
        return schema.destroy({
            where: { id: id }
        }).then(transaction => {
            if (transaction)
                return `Transaction ${id} deleted.`;
            else
                return error.TRANSACTION_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
}