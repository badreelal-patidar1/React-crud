var BaseCtl = require("../controller/BaseCtl");
var Student = require("../bean/Student");
var ServiceLocator = require("../services/ServiceLocator");

class StudentCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getStudentService();
    }

    /**
     * Get preload data.
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {

        var clgService = ServiceLocator.getCollegeService();
        clgService.search('', function (err, list) {
            if (err) {
                response.status(500).json(err)
            } else {
                response.status(200).json(list)
            }
        })
    };

    getBean(request) {
        var student = new Student();
        student.populateRequest(request.body);
        return student;
    };

    getService() {
        return this.service;
    };
}

module.exports = StudentCtl;