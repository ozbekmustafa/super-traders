const { PortfolioShares: schema } = require("../portfolio_shares/schema"),
    portfolio = require("../portfolio/model"),
    shares = require("../shares/model"),
    error = require("../../config/errorCodes");

portfolioShares = module.exports = {
    create: async (portfolio_id, share_id, quantity) => {
        return schema.create({
            portfolio_id: portfolio_id,
            share_id: share_id,
            quantity: quantity
        }).then(portfolioShare => {
            return portfolioShare;
        }).catch(error => {
            return error;
        });
    },
    findOne: async (portfolio_id, share_id) => {
        return schema.findOne({
            where: {
                portfolio_id: portfolio_id,
                share_id: share_id,
            }
        }).then(portfolioShare => {
            if (portfolioShare)
                return portfolioShare;
            else
                return error.PORTFOLIO_SHARE_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
    findAll: async () => {
        return schema.findAll()
            .then(portfolioShare => {
                return portfolioShare;
            }).catch(error => {
                return error;
            });
    },
    update: async (portfolio_id, share_id, quantity) => {
        return schema.increment(
            { quantity: quantity },
            {
                where: {
                    portfolio_id: portfolio_id,
                    share_id: share_id
                }
            })
            .then(portfolioShare => {
                let updatedCount = portfolioShare[0][1];
                if (updatedCount > 0) {
                    return `Portfolio Share updated.`;
                }
                else
                    return error.PORTFOLIO_SHARE_NOT_FOUND;
            }).catch(error => {
                return error;
            });
    },
    deleteOne: async (id) => {
        return schema.destroy({
            where: { id: id }
        }).then(portfolioShare => {
            if (portfolioShare)
                return `Portfolio Share ${symbol} deleted.`;
            else
                return error.PORTFOLIO_SHARE_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
}