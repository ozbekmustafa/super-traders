const { Portfolio: schema } = require("../portfolio/schema"),
    error = require("../../config/errorCodes");

portfolio = module.exports = {
    create: async (user_id, name) => {
        return schema.create({
            user_id: user_id,
            name: name
        }).then(portfolio => {
            return portfolio;
        }).catch(error => {
            return error;
        });
    },
    findOne: async (id) => {
        return schema.findOne({
            where: { id: id }
        }).then(portfolio => {
            if (portfolio)
                return portfolio;
            else
                return error.PORTFOLIO_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
    findAll: async () => {
        return schema.findAll()
            .then(portfolio => {
                return portfolio;
            }).catch(error => {
                return error;
            });
    },
    update: async (user_id, name) => {
        return schema.update(
            { name: name },
            { where: { user_id: user_id } })
            .then(portfolio => {
                if (portfolio > 0) {
                    return `User ${user_id} updated.`;
                }
                else
                    return error.PORTFOLIO_NOT_FOUND;
            }).catch(error => {
                return error;
            });
    },
    deleteOne: async (user_id) => {
        return schema.destroy({
            where: { user_id: user_id }
        }).then(portfolio => {
            if (portfolio)
                return `User ${user_id} deleted.`;
            else
                return error.PORTFOLIO_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
}