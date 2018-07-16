var pool = require("./MySQLPool");
/**
 * Provides Base services.
 */
class BaseService {
  /**
   * Executes SQL with given paranters. Passes error or result to callback.
   * @param {*} sql 
   * @param {*} params 
   * @param {*} callback 
   */
  executeSQL(sql, params, callback) {
    pool.getConnection(function (error, connection) {
      if (error) {
        console.error(error);
        callback(error);
        connection.release();
      }
      connection.query(sql, params, function (error, results) {
        callback(error, results);
        connection.release();
      });
    });
  }
}
module.exports = BaseService;

