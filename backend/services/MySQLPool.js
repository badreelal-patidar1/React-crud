var mysql = require('mysql');
/**
 * Create pool
 */
var pool = mysql.createPool({
    connectionLimit: 20,
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'demo_ors',
    debug: false
});
module.exports = pool;
