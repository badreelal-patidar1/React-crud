var Marksheet = require("../bean/Marksheet");
var BaseService = require("./BaseService");

class MarksheetService extends BaseService {

    /**
     * Finds marksheet by primary key id
     * returns Marksheet object
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_marksheet WHERE ID= ?";
        var params = [id];
        super.executeSQL(sql, params, function (err, result) {
            if (result.length > 0) {
                var bean = new Marksheet();
                bean.populateResult(result[0]);
                callback(err, bean);
            } else {
                callback("Record not found");
            }
        });
    };

    /**
     * Search marksheet by RollNo,StudentId,Name
     * returns Marksheet Object
     */
    search(marksheet, callback) {
        var sql = "SELECT * FROM st_marksheet where 1=1 ";
        if (marksheet.rollNo) {
            sql += " and ROll_NO = '" + marksheet.rollNo + "'";
        }
        if (marksheet.studentId) {
            sql += " and STUDENT_ID = '" + marksheet.studentId + "'";
        }
        if (marksheet.name) {
            sql += " and NAME = '" + marksheet.name + "'";
        }
        super.executeSQL(sql, null, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            var list = [];
            result.forEach(function (e) {
                var bean = new Marksheet();
                bean.populateResult(e);
                list.push(bean);
            });
            callback(err, list);
        });
    }

    /**
     *  Add a record and returns primary key
     * @param {*} marksheet 
     * @param {*} callback 
     * @param {*} ctx 
     */
    add(marksheet, callback, ctx) {
        var sql = "INSERT INTO st_marksheet (ROLL_NO,STUDENT_ID,NAME,PHYSICS,CHEMISTRY,MATHS) "
            + " VALUES (?,?,?,?,?,?)";
        var params = [marksheet.rollNo, marksheet.studentId,
        marksheet.name, marksheet.physics, marksheet.chemistry, marksheet.maths];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     *  Update a record and return count
     * @param {*} marksheet 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(marksheet, callback, ctx) {
        var sql = "UPDATE st_marksheet SET ROLL_NO=?,STUDENT_ID=?,NAME=?,PHYSICS=?,CHEMISTRY=?,MATHS=?  WHERE ID=?"
        var params = [marksheet.rollNo, marksheet.studentId,
        marksheet.name, marksheet.physics, marksheet.chemistry, marksheet.maths, marksheet.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }

    /**
     *  Delete record and return marksheet bean
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        var sql = "DELETE FROM st_marksheet WHERE ID=?";
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
module.exports = MarksheetService;

