const axios = require('axios');
const errorConst = require('./errors');

class HTTPRequest {
    get(parameters, res) {
        return new Promise((resolve, reject) => {
            const { url, headers, queryParams } = parameters;
            const options = {
                headers: {},
                params: {},
            };
            Object.assign(options.params, queryParams);
            Object.assign(options.headers, headers);
            if (res && res.get('watchdog_cr_id')) {
                options.headers['watchdog_cr_id'] = res && res.get('watchdog_cr_id');
            }

            axios
                .get(url, options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err.response.data);
                    } else if (err.request) {
                        reject(this.formRequestError());
                    } else {
                        reject(err);
                    }
                });
        });
    }

    post(parameters, res) {
        return new Promise((resolve, reject) => {
            const { url, data = {}, headers } = parameters;
            const options = {
                headers: {},
            };
            Object.assign(options.headers, headers);
            if (res && res.get('watchdog_cr_id')) {
                options.headers['watchdog_cr_id'] = res && res.get('watchdog_cr_id');
            }

            axios
                .post(url, data, options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err.response.data);
                    } else if (err.request) {
                        reject(this.formRequestError());
                    } else {
                        reject(err);
                    }
                });
        });
    }

    put(parameters, res) {
        return new Promise((resolve, reject) => {
            const { url, data = {}, headers } = parameters;
            const options = {
                headers: {},
            };
            Object.assign(options.headers, headers);
            if (res && res.get('watchdog_cr_id')) {
                options.headers['watchdog_cr_id'] = res.get('watchdog_cr_id');
            }

            axios
                .put(url, data, options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err.response.data);
                    } else if (err.request) {
                        reject(this.formRequestError());
                    } else {
                        reject(err);
                    }
                });
        });
    }

    postForm(parameters, res) {
        return new Promise((resolve, reject) => {
            const { url, form = {}, headers } = parameters;
            const options = {
                headers: {},
            };
            Object.assign(options.headers, headers);
            if (res && res.get('watchdog_cr_id')) {
                options.headers['watchdog_cr_id'] = res.get('watchdog_cr_id');
            }

            axios
                .post(url, form, options)
                .then(response => {
                    resolve(response.data);
                })
                .catch(err => {
                    if (err.response) {
                        reject(err.response.data);
                    } else if (err.request) {
                        reject(this.formRequestError());
                    } else {
                        reject(err);
                    }
                });
        });
    }

    formRequestError() {
        const err = new Error(errorConst.REQUEST_ERROR);
        err.status = errorConst.SERVICE_UNAVAILABLE;
        return err;
    }
}

module.exports = HTTPRequest;
