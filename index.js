const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetchFromUpstream = require('./src/helper/fetchFromUpstream');
const authorizeRoute = require('./src/routes/authorize');
const pathToFirmware = './firmware/';
const checkRoute = require('./src/routes/check')(pathToFirmware);

const ensureHosts = require('./src/hosts/ensureHosts');
//require('./src/hosts/dnsproxy');

app.use(bodyParser.text({
    type: 'application/x-www-form-urlencoded'
}));

app.use(bodyParser.json());

app.use(function (req, res, next) {
    console.log(req.method + ' ' + req.hostname + req.originalUrl);
    next();
});

app.use('/redlotus/firmware/full', express.static(pathToFirmware));

app.post('/sp_ard_common/v2/Check.action', checkRoute);

app.post('/sp_ard_common/v1/authorize.action', authorizeRoute);

ensureHosts().then(()=> {
    app.listen(80, '0.0.0.0', function (err, noerr) {
        if (err) {
            return console.error(err);
        }
        console.log('Okay, Listening for HiSuite');
    });
});
