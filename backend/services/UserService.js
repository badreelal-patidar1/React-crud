var User = require("../bean/User");
var BaseService = new require("./BaseService");

class UserService extends BaseService {

    /**
     *Finds user by primary key id
     * returns User Object.
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_user WHERE ID= ?";
        var params = [id];
        super.executeSQL(sql, params, function (err, result) {
            if (result.length > 0) {
                var bean = new User();
                bean.populateResult(result[0]);
                callback(err, bean);
            } else {
                callback("Record not found");
            }
        });
    };

    /**
     * Search user by FirstName,LastName,Login,MobileNo,DOB
     * Returns User bean
     * @param {*} user 
     * @param {*} callback 
     */
    search(user, callback) {
        var sql = "SELECT * FROM st_user where 1=1 ";

        if (user.firstName) {
            sql += " and FIRST_NAME = '" + user.firstName + "'";
        }
        if (user.lastName) {
            sql += " and LAST_NAME = '" + user.lastName + "'";
        }
        if (user.login) {
            sql += " and LOGIN = '" + user.login + "'";
        }
        if (user.mobileNo) {
            sql += " and MOBILE_NO = '" + user.mobileNo + "'";
        }
        if (user.dob) {
            sql += " and DOB = '" + user.dob + "'";
        }
        super.executeSQL(sql, null, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            var list = [];
            result.forEach(function (e) {
                var bean = new User();
                bean.populateResult(e);
                list.push(bean);
            });
            callback(err, list);
        });
    }

    /**
     * Add a record and returns primary key.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    add(user, callback, ctx) {
        var sql = "INSERT INTO st_user (FIRST_NAME,LAST_NAME,LOGIN,PASSWORD,DOB,MOBILE_NO,ROLE_ID,GENDER,IMAGE) "
            + " VALUES (?,?,?,?,?,?,?,?,?)";
        var params = [user.firstName, user.lastName, user.login,
        user.password, user.dob, user.mobileNo, user.roleId, user.gender, user.image];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Update record and return count.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(user, callback, ctx) {
        var sql = "UPDATE st_user SET FIRST_NAME=?,LAST_NAME=?,LOGIN=?,PASSWORD=?,DOB=?,MOBILE_NO=?,ROLE_ID=?,GENDER=? WHERE ID=?"
        var params = [user.firstName, user.lastName, user.login,
        user.password, user.dob, user.mobileNo, user.roleId, user.gender, user.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }

    /**
     * Delete record and return user bean.
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        var sql = "DELETE FROM st_user WHERE ID=?";
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

    /**
     * Authenticate login and password and return result.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    authenticate(user, callback, ctx) {
        var sql = "SELECT * FROM st_user WHERE LOGIN=? and PASSWORD=?";
        var params = [user.login, user.password]
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                if (result.length == 1) {
                    result.recordCount = 1;
                    result.outputBean = result;
                } else if (result.length == 0) {
                    result.length = 0;
                }
                callback(err, result);
            }
        });
    };

    /**
     * Forgot password take LoginId.
     * @param {*} user 
     * @param {*} callback 
     * @param {*} ctx 
     */
    forgotPassword(user, callback, ctx) {
        var sql = "SELECT * FROM st_user WHERE LOGIN=?";
        var params = [user]
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            var list = [];
            result.forEach(function (e) {
                var bean = new User();
                bean.populateResult(e);
                list.push(bean);
            });
            callback(err, list);
        });
    }
}
module.exports = UserService;

