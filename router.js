const express = require("express"),
    router = express.Router(),
    service = require('./services');

//#region Portfolio

/**
 * @api {post} /portfolio Create user
 * @apiSampleRequest http://localhost:3000/portfolio
 * @apiDescription Create portfolio for given information
 *
 * @apiParam (body) {String} user_id User Identifier
 * @apiParam (body) {String} name User name
 *
**/
router.post('/portfolio', (req, res) => {
    return service.portfolio.create(req.body.user_id, req.body.name).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {get} /portfolio/{id} Get user
 * @apiSampleRequest http://localhost:3000/portfolio/1
 * @apiDescription Get portfolio for given id
 *
 * @apiParam (body) {String} id User Identifier
 *
**/
router.get('/portfolio/:id', (req, res) => {
    return service.portfolio.findOne(req.params.id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {get} /portfolio Get all user
 * @apiSampleRequest http://localhost:3000/portfolio
 * @apiDescription Get all portfolio
 *
**/
router.get('/portfolio', (req, res) => {
    return service.portfolio.findAll().then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});


/**
 * @api {post} /portfolio/update Update user
 * @apiSampleRequest http://localhost:3000/portfolio/update
 * @apiDescription Update user for given user_id
 *
**/
router.post('/portfolio/update', (req, res) => {
    return service.portfolio.update(req.body.user_id, req.body.name).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {delete} /portfolio Delete user
 * @apiSampleRequest http://localhost:3000/portfolio
 * @apiDescription Delete user for given user_id
 *
**/
router.delete('/portfolio', (req, res) => {
    return service.portfolio.deleteOne(req.body.user_id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

//#endregion

//#region  Shares

/**
 * @api {get} /shares Get all shares
 * @apiSampleRequest http://localhost:3000/shares
 * @apiDescription Get all shares
 *
**/
router.get('/shares', (req, res) => {
    return service.shares.findAll().then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {get} /shares/{id} Get share
 * @apiSampleRequest http://localhost:3000/shares/1
 * @apiDescription Get share for given id
 *
 * @apiParam (body) {String} id Share Identifier
 *
**/
router.get('/shares/:id', (req, res) => {
    return service.shares.findOne(req.params.id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {post} /shares Create share
 * @apiSampleRequest http://localhost:3000/shares
 * @apiDescription Create shares for given information
 *
 * @apiParam (body) {String} symbol Share Identifier
 * @apiParam (body) {String} name Share name
 * @apiParam (body) {Decimal} price price
 *
**/
router.post('/shares', (req, res) => {
    return service.shares.create(req.body.symbol, req.body.name, req.body.price).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {post} /shares/update Update share
 * @apiSampleRequest http://localhost:3000/shares/update
 * @apiDescription Update share for given symbol
 *
 * @apiParam (body) {int} id Share Identifier
 * @apiParam (body) {String} name Share name
 * @apiParam (body) {Decimal} price price
**/
router.post('/shares/update', (req, res) => {
    return service.shares.update(req.body.id, req.body.name, req.body.price).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {delete} /shares Delete share
 * @apiSampleRequest http://localhost:3000/shares
 * @apiDescription Delete share for given symbol
 *
**/
router.delete('/shares', (req, res) => {
    return service.shares.deleteOne(req.body.symbol).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

//#endregion

//#region  Transactions

/**
 * @api {post} /transactions Create transaction
 * @apiSampleRequest http://localhost:3000/transactions
 * @apiDescription Create transaction for given information
 *
 * @apiParam (body) {int} portfolio_id Portfolio Identifier
 * @apiParam (body) {int} share_id Share Identifier
 * @apiParam (body) {ENUM} transaction_type Transaction type (BUY/SELL)
 * @apiParam (body) {int} quantity Quantity of transaction
 * @apiParam (body) {decimal} price Price
 *
**/
router.post('/transactions', (req, res) => {
    return service.transactions.create(
        req.body.portfolio_id,
        req.body.share_id,
        req.body.transaction_type,
        req.body.quantity,
        req.body.price)
        .then(response => {
            res.json(response)
        }).catch(error => {
            res.json(error)
        });
});

/**
 * @api {get} /transactions/{id} Get transaction
 * @apiSampleRequest http://localhost:3000/transactions/1
 * @apiDescription Get transaction for given id
 *
 * @apiParam (body) {int} id Transaction Identifier
 *
**/
router.get('/transactions/:id', (req, res) => {
    return service.transactions.findOne(req.params.id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {get} /transactions Get all transactions
 * @apiSampleRequest http://localhost:3000/transactions
 * @apiDescription Get all transactions
 *
**/
router.get('/transactions', (req, res) => {
    return service.transactions.findAll().then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});


/**
 * @api {post} /transactions/update Update transaction
 * @apiSampleRequest http://localhost:3000/transactions/update
 * @apiDescription Update transaction for given id
 *
**/
router.post('/transactions/update', (req, res) => {
    return service.transactions.update(req.body.id, req.body.quantity, req.body.price).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {delete} /transactions Delete transaction
 * @apiSampleRequest http://localhost:3000/transactions
 * @apiDescription Delete transaction for given id
 *
**/
router.delete('/transactions', (req, res) => {
    return service.transactions.deleteOne(req.body.id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

//#endregion

//#region  Portfolio Shares

/**
 * @api {post} /portfolio-shares Create transaction
 * @apiSampleRequest http://localhost:3000/portfolio-shares
 * @apiDescription Create portfolio-shares for given information
 *
 * @apiParam (body) {int} portfolio_id Portfolio Identifier
 * @apiParam (body) {int} share_id Share Identifier
 * @apiParam (body) {int} quantity Quantity of transaction
 *
**/
router.post('/portfolio-shares', (req, res) => {
    return service.portfolio_shares.create(
        req.body.portfolio_id,
        req.body.share_id,
        req.body.quantity)
        .then(response => {
            res.json(response)
        }).catch(error => {
            res.json(error)
        });
});

/**
 * @api {get} /portfolio-shares-one Get portfolio-shares
 * @apiSampleRequest http://localhost:3000/portfolio-shares-one
 * @apiDescription Get portfolio-shares for given id
 *
 * @apiParam (body) {int} id Portfolio-shares Identifier
 *
**/
router.get('/portfolio-shares-one', (req, res) => {
    return service.portfolio_shares.findOne(req.body.portfolio_id, req.body.share_id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {get} /portfolio-shares Get all portfolio-shares
 * @apiSampleRequest http://localhost:3000/portfolio-shares
 * @apiDescription Get all portfolio-shares
 *
**/
router.get('/portfolio-shares', (req, res) => {
    return service.portfolio_shares.findAll().then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});


/**
 * @api {post} /portfolio-shares/update Update portfolio-shares
 * @apiSampleRequest http://localhost:3000/portfolio-shares/update
 * @apiDescription Update portfolio-shares for given id
 *
**/
router.post('/portfolio-shares/update', (req, res) => {
    return service.portfolio_shares.update(req.body.portfolio_id, req.body.share_id, req.body.quantity).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

/**
 * @api {delete} /portfolio-shares Delete portfolio-shares
 * @apiSampleRequest http://localhost:3000/portfolio-shares
 * @apiDescription Delete portfolio-shares for given id
 *
**/
router.delete('/portfolio-shares', (req, res) => {
    return service.portfolio_shares.deleteOne(req.body.id).then(response => {
        res.json(response)
    }).catch(error => {
        res.json(error)
    });
});

//#endregion

module.exports = router;