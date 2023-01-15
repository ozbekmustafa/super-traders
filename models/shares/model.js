const { Shares: schema } = require("../shares/schema"),
    error = require("../../config/errorCodes");

shares = module.exports = {
    create: async (symbol, name, price) => {
        return schema.create({
            symbol: symbol,
            name: name,
            price: price
        }).then(share => {
            return share;
        }).catch(error => {
            return error;
        });
    },
    findOne: async (id) => {
        return schema.findOne({
            where: { id: id }
        }).then(share => {
            if (share)
                return share;
            else
                return error.SHARE_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
    findAll: async () => {
        return schema.findAll()
            .then(share => {
                return share;
            }).catch(error => {
                return error;
            });
    },
    update: async (id, name, price) => {
        const share = await module.exports.findOne(id);
        let timeDiffInHour = Math.abs(new Date() - share.updatedAt) / 36e5;
        if (timeDiffInHour >= 1) {
            return schema.update(
                {
                    name: name,
                    price: price
                },
                { where: { id: id } })
                .then(share => {
                    if (share > 0) {
                        return `Share ${id} updated.`;
                    }
                    else
                        return error.SHARE_NOT_FOUND;
                }).catch(error => {
                    return error;
                });
        } else {
            return error.SHARE_UPDATE_LIMIT;
        }

    },
    deleteOne: async (symbol) => {
        return schema.destroy({
            where: { symbol: symbol }
        }).then(share => {
            if (share)
                return `Share ${symbol} deleted.`;
            else
                return error.SHARE_NOT_FOUND;
        }).catch(error => {
            return error;
        });
    },
}