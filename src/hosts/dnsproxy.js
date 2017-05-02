const jack = require('dnsjack').createServer();

// route the huawei domain to 127.0.0.1
jack.route(['query.hicloud.com'], function(data, callback) {
    callback(null, {ip: '127.0.0.1', ttl: 300});
});

jack.listen(); // it listens on the standard DNS port of 53 per default
