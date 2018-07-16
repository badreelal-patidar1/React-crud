var Role = require("../bean/Role");
var BaseService = require("./BaseService")

class RoleService extends BaseService {

    /**
     * Finds role by primary key id
     * returns Role Object
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM st_role WHERE ID= ?";
        var params = [id];
        super.executeSQL(sql, params, function (err, result) {
            if (result.length > 0) {
                var bean = new Role();
                bean.populateResult(result[0]);
                callback(err, bean);
            } else {
                callback("Record not found");
            }
        });
    };

    /**
     * Search role by Name
     * returns Role Object
     * @param {*} role 
     * @param {*} callback 
     */
    search(role, callback) {
        var sql = "SELECT * FROM st_role where 1=1 ";
        if (role.name) {
            sql += " and NAME = '" + role.name + "'";
        }
        super.executeSQL(sql, null, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            var list = [];
            result.forEach(function (e) {
                var bean = new Role();
                bean.populateResult(e);
                list.push(bean);
            });
            callback(err, list);
        });
    }
    /**
     * Add a record and returns primary key
     * 
     * @param {*} role 
     * @param {*} callback 
     * @param {*} ctx 
     */

    add(role, callback, ctx) {
        var sql = "INSERT INTO st_role (NAME,DESCRIPTION) "
            + " VALUES (?,?)";
        var params = [role.name, role.description];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Update a record and return count.
     * @param {*} role 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(role, callback, ctx) {
        var sql = "UPDATE st_role SET NAME=?,DESCRIPTION=? WHERE ID=?"
        var params = [role.name, role.description, role.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }

    /**
     * Delete record and return role bean.
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        var sql = "DELETE FROM st_role WHERE ID=?";
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

module.exports = RoleService;

