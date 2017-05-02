module.exports = function (req, res) {
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

    if (parsedBody.rules && parsedBody.rules.PackageType === 'full') {
        return res.status(200).send(updateResponse);
    }

    return res.status(500).send();
};


const updateResponse = {
    "status": "0",
    "autoPollingCycle": "1",
    "components": [{
        "name": "REDLOTUS-OTA",
        "version": "REDLOTUS",
        "versionID": "81749",
        "description": "Red Lotus Flash",
        "createTime": "2017-04-04T03:18:12+0000",
        "url": "http://query.hicloud.com/redlotus/firmware/"
    }]
};
