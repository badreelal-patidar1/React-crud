class BaseCtl {

    constructor() { };

    /**
     * Apply input validations 
     * 
     * @param {*} request 
     */
    validate(request) {
        return true;
    };


    /**
     * Writes preload data to response object
     * @param {*} request 
     * @param {*} response 
     */
    preload(request, response) {
    };

    /**
     * Returns bean of this controller. It populates bean properties from request parameters
     * @param {*} request 
     */
    getBean(request) {
        return null;
    };

    /**
     * Returns service of this controller
     */
    getService() {
        return null;
    };

    /**
     * Gets bean using primary key
     * @param {*} request 
     * @param {*} response 
     */
    get(request, response) {
        var service = this.getService();
        var id = request.params[0];
        service.findByPk(id, function (err, bean) {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(200).json(bean);
            }
        });
    };


    /**
     * Delets a record and returns deleted bean
     * @param {*} request 
     * @param {*} response 
     */
    delete(request, response) {
        var service = this.getService();
        var id = request.params[0];
        service.delete(id, function (err, bean) {
            if (err) {
                response.status(500).json(err);
            } else {
                response.status(200).json(bean);
            }
        });
    };

    /**
     * Add or update a record
     * @param {*} request 
     * @param {*} response 
     */
    save(request, response) {
        var service = this.getService();
        var bean = this.getBean(request);
        if (bean.id != '') {
            service.update(bean, function (err, count) {
                if (err) {
                    response.status(500).json(err)
                } else {
                    response.status(200).json(count);
                }
            });
        } else {
            service.add(bean, function (err, pk) {
                if (err) {
                    response.status(500).json(err);
                } else {
                    response.status(200).json(pk);
                }
            });
        }
    };

    /**
     * Search and returns list of beans
     * @param {*} request 
     * @param {*} response 
     */
    search(request, response) {
        var service = this.getService();
        var bean = this.getBean(request);
        service.search(bean, function (err, result) {
            if (err) {
                response.status(500).json(err)
            } else {
                response.status(200).json(result)
            }
        });
    };
}

module.exports = BaseCtl;