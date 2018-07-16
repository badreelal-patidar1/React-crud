var BaseCtl = require("../controller/BaseCtl");
var Marksheet = require("../bean/Marksheet");
var ServiceLocator = require("../services/ServiceLocator");

class MarksheetCtl extends BaseCtl {
    constructor() {
        super();
        this.service = ServiceLocator.getMarksheetService();
    }
    /**
     * Get preload data.
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var stdService = ServiceLocator.getStudentService();
        stdService.search('', function (err, list) {
            if (err) {
                response.status(500).json(err)
            } else {
                response.status(200).json(list)
            }
        })
    };

    /**
     * Returns bean of Marksheet controller.
     */
    getBean(request) {
        var marksheet = new Marksheet();
        marksheet.populateRequest(request.body);
        return marksheet;
    };
    /**
     * return service of Marksheet controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = MarksheetCtl;
