var Student = require("../bean/Student");
var BaseService = require("./BaseService");

class StudentService extends BaseService {

    /**
     *Finds student by primary key id
     * returns Student Object
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    findByPk(id, callback, ctx) {
        var sql = "SELECT * FROM student WHERE ID= ?";
        var params = [id];
        super.executeSQL(sql, params, function (err, result) {
            if (result.length > 0) {
                var bean = new Student();
                bean.populateResult(result[0]);
                callback(err, bean);
            } else {
                callback("Record not found");
            }
        });
    };

    /**
     * Search student by CollegeId,CollegeName,FirstName,LastName,DateOfBirth
     * MobileNo,Email
     * returns Student Object
     * @param {*} student 
     * @param {*} callback 
     */
    search(student, callback) {
        var sql = "SELECT * FROM student where 1=1 ";
        if (student.collegeId) {
            sql += " and COLLEGE_ID = '" + student.collegeId + "'";
        }
        if (student.collegeName) {
            sql += " and COLLEGE_NAME = '" + student.collegeName + "'";
        }
        if (student.firstName) {
            sql += " and FIRST_NAME = '" + student.firstName + "'";
        }
        if (student.lastName) {
            sql += " and LAST_NAME = '" + student.lastName + "'";
        }
        if (student.dob) {
            sql += " and DATE_OF_BIRTH = '" + student.dob + "'";
        }
        if (student.mobileNo) {
            sql += " and MOBILE_NO = '" + student.mobileNo + "'";
        }
        if (student.email) {
            sql += " and EMAIL = '" + student.email + "'";
        }
        super.executeSQL(sql, null, function (err, result) {
            if (err) {
                callback(err);
                return;
            }
            var list = [];
            result.forEach(function (e) {
                var bean = new Student();
                bean.populateResult(e);
                list.push(bean);
            });
            callback(err, list);
        });
    }

    /**
     * Add a record and returns primary key
     * @param {*} student 
     * @param {*} callback 
     * @param {*} ctx 
     */
    add(student, callback, ctx) {
        var sql = "INSERT INTO student (COLLEGE_ID,COLLEGE_NAME,FIRST_NAME,LAST_NAME,DATE_OF_BIRTH,MOBILE_NO,EMAIL) "
            + " VALUES (?,?,?,?,?,?,?)";
        var params = [student.collegeId, student.collegeName, student.firstName,
        student.lastName, student.dob, student.mobileNo, student.email];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result.insertId);
            }
        });
    };

    /**
     * Update a record
     * return count.
     * @param {*} student 
     * @param {*} callback 
     * @param {*} ctx 
     */
    update(student, callback, ctx) {
        var sql = "UPDATE student SET COLLEGE_ID=?,COLLEGE_NAME=?,FIRST_NAME=?,LAST_NAME=?,DATE_OF_BIRTH=?,MOBILE_NO=?,EMAIL=?  WHERE ID=?"
        var params = [student.collegeId, student.collegeName, student.firstName,
        student.lastName, student.dob, student.mobileNo, student.email, student.id];
        super.executeSQL(sql, params, function (err, result) {
            if (err) {
                callback(err);
            } else {
                callback(err, result);
            }
        });
    }

    /**
     * Delete record.
     * return student bean.
     * @param {*} id 
     * @param {*} callback 
     * @param {*} ctx 
     */
    delete(id, callback, ctx) {
        var sql = "DELETE FROM student WHERE ID=?";
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
module.exports = StudentService;

