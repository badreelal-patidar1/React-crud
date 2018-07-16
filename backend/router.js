var express = require('express');
var router = express.Router();

//import require controller module.
var CollegeCtl = require("./controller/CollegeCtl");
var MarksheetCtl = require("./controller/MarksheetCtl");
var RoleCtl = require("./controller/RoleCtl");
var UserCtl = require("./controller/UserCtl");
var StudentCtl = require("./controller/StudentCtl");
var SessionCtl = require("./controller/SessionCtl");

/**
 * GET method take path and mehtod as query params
 * like: http://localhost:3000/College/preload,  path=College,method=preload,
 *       http://localhost:3000/College/get/1,    path=College,method=undefined,params=1,
 *       http://localhost:3000/Student/delete,   path=Student,method=delete,
 */
router.get('/:path/:method?/*', function (request, response) {
    var name = request.params.path + "Ctl()";
    var ctl = eval("new " + name);
    if (request.params.method == undefined) {
        var exp = "ctl." + request.params[0] + "(request, response)";
        eval(exp);
    } else {
        var exp = "ctl." + request.params.method + "(request, response)";
        eval(exp);
    }


});

/**
 * POST method take path and mehtod as query params
 * like: http://localhost:3000/College/save,   path=College,method=save,
 *       http://localhost:3000/Student/search, path=Student,method=search,
 */
router.post('/:path/:method?/*', function (request, response) {

    var name = request.params.path + "Ctl()";
    var ctl = eval("new " + name);
    var exp = "ctl." + request.params[0] + "(request, response)";
    eval(exp);
})
module.exports = router;