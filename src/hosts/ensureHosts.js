const dns = require('dns');

module.exports = function() {
    return new Promise(function(resolve, reject) {
        dns.lookup('query.hicloud.com', function(err, ip) {
            if(ip !== '127.0.0.1') {
                return reject(new Error('query.hicloud.com does not resolve to localhost. Please make sure your hostsfile is correct.'))
            }

            resolve();
        });
    })
};

module.exports();