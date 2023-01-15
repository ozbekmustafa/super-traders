const gulp = require("gulp");
const mysql = require("mysql2");
const { DB_SETTINGS } = require('./config/config');
const services = require("./services");


const mysqlConnection = mysql.createConnection({
    host: DB_SETTINGS.HOST,
    user: DB_SETTINGS.USER,
    password: DB_SETTINGS.PASS,
});

gulp.task("create-dummy", (done) => {
    return new Promise(async (resolve, reject)=> {
        services.portfolio.create(1, 'Mustafa Ozbek');
        services.portfolio.create(2, 'Hasan Ozbek');
        services.portfolio.create(3, 'Huseyin Ozbek');
        services.portfolio.create(4, 'Mehmet Ozbek');
        services.portfolio.create(5, 'Deniz Ozbek');
        services.shares.create('AAA', 'Share A', 10.50);
        services.shares.create('BBB', 'Share B', 20.75);
        services.shares.create('CCC', 'Share C', 30.00);
        services.shares.create('ABC', 'Share D', 40.50);
        services.shares.create('EDC', 'Share E', 50.10);
        services.portfolio_shares.create(1, 1, 30);
        services.portfolio_shares.create(2, 2, 40);
        services.portfolio_shares.create(3, 3, 50);
        services.portfolio_shares.create(4, 4, 60);
        services.portfolio_shares.create(5, 5, 70);
        done();
    });
});

gulp.task("create-dummy-transactions", (done) => {
    return new Promise(async (resolve, reject)=> {
        services.transactions.create(1, 1, 1, 10, 10.50);
        services.transactions.create(1, 1, 2, 5, 10.50);
        services.transactions.create(2, 2, 1, 20, 20.75);
        services.transactions.create(2, 2, 2, 10, 20.75);
        services.transactions.create(3, 3, 1, 30, 30.00);
        services.transactions.create(3, 3, 2, 40, 30.00);
        services.transactions.create(4, 4, 1, 50, 40.50);
        services.transactions.create(4, 4, 2, 60, 40.50);
        services.transactions.create(5, 5, 1, 50, 50.10);
        services.transactions.create(5, 5, 2, 60, 50.10);
        done();
    });
});


gulp.task("init-db", (done) => {
    return new Promise((resolve, reject) => {
        let result = mysqlConnection.promise().query(`CREATE DATABASE IF NOT EXISTS SuperTraders`)
            .then(() => {
                console.log("Database initialized.");
                return resolve();
            }).catch((error) => {
                console.log("Error: " + JSON.stringify(error));
                return reject();
            }).then(mysqlConnection.end());
        done();
    });
});

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
} 
