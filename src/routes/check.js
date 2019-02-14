module.exports = function(directory) {
    return function (req, res) {
        let parsedBody;
        try {
            // yeah, the body is actually x-www-form-urlencoded, but
            // contains JSON data... Funny?
            parsedBody = JSON.parse(req.body);
        } catch (e) {
            res.status(404).send();
            console.log('sorry, that was no real body');
            return;
        }

        if (parsedBody.rules && parsedBody.rules.PackageType.substring(0, 4) === 'full') {
            const updateResponse = getUpdateResponse(directory);
            console.log(updateResponse);
            return res.status(200).send(updateResponse);
        }

        return res.status(500).send();
    };
};

function getUpdateResponse(directory) {
    const version = require(directory + '/version.js');
    return {
        "status": "0",
        "autoPollingCycle": "1",
        "components": [{
            "name": "REDLOTUS-OTA",
            "version": "REDLOTUS",
            "versionID": version,
            "description": "Red Lotus Flash",
            "createTime": "2017-04-04T03:18:12+0000",
            "url": "http://query.hicloud.com/redlotus/firmware/"
        }]
    };
}

