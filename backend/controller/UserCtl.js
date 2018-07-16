var BaseCtl = require("../controller/BaseCtl");
var nodemailer = require('nodemailer');
var User = require("../bean/User");
var ServiceLocator = require("../services/ServiceLocator");

class UserCtl extends BaseCtl {

    constructor() {
        super();
        this.service = ServiceLocator.getUserService();
    }

    /**
     * Get preload data.
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
        var roleService = ServiceLocator.getRoleService();
        roleService.search('', function (err, list) {
            if (err) {
                response.status(500).json(err)
            } else {
                response.status(200).json(list)
            }
        })
    };

    /**
     * Authenticate User with login & password.
     * @param {*} request 
     * @param {*} response 
     */
    login(request, response) {
        var service = this.getService();
        var bean = this.getBean(request);
        service.authenticate(bean, function (err, result) {
            if (err) {
                response.status(500).json(err);
            } else {
                if (result.recordCount == 1) {
                    request.session.login = result
                    response.status(200).json({ "success": true, message: "Logged in successfully", data: result });
                } else {

                    response.status(200).json({ "success": false, message: "Incorrect UserName or password" });
                }
            }
        });
    }
    /**
     * Forgot password and send email to user.
     * @param {*} request 
     * @param {*} response 
     */
    forgotPassword(request, response) {
        var service = this.getService();
        var bean = this.getBean(request);
        service.forgotPassword(bean.login, function (err, result) {
            if (err) {
                response.status(500).json(err);
            } else {
                if (result.length <= 0) {
                    response.status(200).json({ message: "Email sent to " + bean.login });
                }
                else {
                    var transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: 'bldon786@gmail.com',
                            pass: '9424853918'
                        }
                    });
                    var mailOptions = {
                        from: 'bldon786@gmail.com',
                        to: result[0].login,
                        subject: 'Know Your password',
                        text: 'Your password is:' + result[0].password
                    };
                    transporter.sendMail(mailOptions, function (err, info) {
                        if (err) {
                            response.status(500).json(err);
                        } else {
                            response.status(200).json({ message: "Email sent to " + bean.login });
                        }
                    });

                }
            }
        });
    }
    /**
     * Request for user logout and expires session.
     * @param {*} request 
     * @param {*} response 
     */
    logout(request, response) {
        request.session.destroy();
        response.status(200).json({ success: false });
    }

    /**
     * Returns bean of User controller.
     * @param {*} request 
     */
    getBean(request) {
        var user = new User();
        user.populateRequest(request.body);
        return user;
    };

    /**
     * return service of User controller.
     */
    getService() {
        return this.service;
    };
}
module.exports = UserCtl;
