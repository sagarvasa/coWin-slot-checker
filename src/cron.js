const express = require("express");
const cron = require("node-cron");
const HttpRequest = require('./utilities/http-request');
const constants = require('./utilities/constants');
const app = express();
const httpRequest = new HttpRequest();
const port = constants.cron_port;

const pattern = `*/${constants.cron_minute_interval} * * * *`;
const serverHost = `${process.env.HOST || 'http://localhost'}:${process.env.PORT || 3000}`;

cron.schedule(pattern, () => {
    const config = {
        url: `${serverHost}/notifyForPincodes.json?age_group=${constants.cron_age_group}`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            "pincodes": constants.cron_pincodes,
            "mobile": constants.cron_notifier_mobile,
            "date": constants.vaccine_date,
            "email": constants.cron_notifier_email
        })
    }

    httpRequest.post(config).then((response) => {
        console.log(response)
    }).catch((err) => {
        console.log("CRON Response error:: ", err.message);
    })
});

app.listen(port, () => {
    console.log(`Cron server started on ${port}`)
})
