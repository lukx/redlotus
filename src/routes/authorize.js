const fetchFromUpstream = require('../helper/fetchFromUpstream');

module.exports = function (req, res) {
    console.log('Got an authorize request for ', req.body);
    fetchFromUpstream('/sp_ard_common/v1/authorize.action', {
            body: JSON.stringify(req.body),
            method: 'POST'
        })
        .then(response => response.text())
        //.then(authResponse => console.log(authResponse) && res.status(500).send()) // DEBUG PURPOSES
        .then(authResponse => res.send(authResponse))
        .catch(err => {
            console.error(err);
            res.status(500).send(err.message);
        })
};