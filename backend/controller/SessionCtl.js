var BaseCtl = require("../controller/BaseCtl");
class SessionCtl extends BaseCtl {

    /**
     *  get session id
     * @param {*} request 
     * @param {*} response 
     */
    session(request, response) {
        if (typeof request.session.login != "undefined") {
            response.status(200).send({ success: true });
        }
        response.end();
    }
}

module.exports = SessionCtl;
