var BaseCtl = require("../controller/BaseCtl");
var College = require("../bean/College");
var ServiceLocator = require("../services/ServiceLocator");

class CollegeCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getCollegeService();
    }
    /**
     * writes preload data.
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var state = [{ "id": 1, "name": "Madhya Pradesh" }, { "id": 2, "name": "Uttar Pradesh" }, { "id": 3, "name": "Punjab" }]
        var city = [{ "id": 1, "name": "Bhopal", "state_id": "1" },
        { "id": 1, "name": "Indore", "state_id": "1" },
        { "id": 1, "name": "Mandsaur", "state_id": "1" },
        { "id": 1, "name": "Ajhuwa", "state_id": "2" },
        { "id": 1, "name": "Aligarh", "state_id": "2" },
        { "id": 1, "name": "Adampur", "state_id": "3" },
        { "id": 1, "name": "Hajipur", "state_id": "3" }]

        var data = {
            "stateList": state,
            "cityList": city
        };
        response.status(200).json(data)
    };

    /**
     * Returns bean of College controller.
     */

    getBean(request) {
        var college = new College();
        college.populateRequest(request.body);
        return college;
    };

    /**
     * return serivce of College controller.
     */
    getService() {
        return this.service;
    };
}

module.exports = CollegeCtl;
