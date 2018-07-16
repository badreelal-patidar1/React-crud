var College = require("../bean/College");
var BaseService = require("./BaseService");

class CollegeService extends BaseService {

    /**
     * Finds college by primary key id
     * returns College object
     */

    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_college WHERE ID= ?";
        var params = [id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err)
            
            } else if (result.length > 0) {
                var bean = new College();
                bean.populateResult(result[0]);
                callback(err, bean);
            } else {
                callback("Record not found");
            }
        });
    };

    /**
    * Search college by Name,Address,PhoneNo
     * returns College Object
     * @param {*} college 
     * @param {*} callback 
     */
    search(college, callback) {
        var sql = "SELECT * FROM st_college where 1=1 ";

        if (college.name) {
            sql += " and NAME = '" + college.name + "'";
        }
        if (college.address) {
            sql += "and ADDRESS='" + college.address + "'";
        }
        if (college.phoneNo) {
            sql += "and PHONE_NO='" + college.phoneNo + "'";
        }
        super.executeSQL(sql, null, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            var list = [];
            result.forEach(function (e) {
                var bean = new College();
                bean.populateResult(e);
                list.push(bean);
            });
            callback(err, list);
        });
    }

    /**
     * Add a record and returns primary key
     * 
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(college, callback, ctx) {
        var sql = "INSERT INTO st_college (NAME,ADDRESS,STATE,CITY,PHONE_NO) "
            + " VALUES (?,?,?,?,?)";
        var params = [college.name, college.address, college.state,
        college.city, college.phoneNo];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Update a record and return count
     * @param {*} college 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(college, callback, ctx) {
        var sql = "UPDATE st_college SET NAME=?,ADDRESS=?,STATE=?,CITY=?,PHONE_NO=?  WHERE ID=?"
        var params = [college.name, college.address, college.state,
        college.city, college.phoneNo, college.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }

    /**
     *  Delete record and return college bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {

        var sql = "DELETE FROM st_college WHERE ID=?";
        var params = [id];

        this.findByPk(id, function (err, bean) {
            if (err) {
                callback(err);
            } else {
                var baseService = new BaseService();
                baseService.executeSQL(sql, params, function (err, count) {
                    if (err) {
                        callback(err);
                    } else {
                        callback(err, bean);
                    }
                });
            }
        });
    }
}
module.exports = CollegeService;

