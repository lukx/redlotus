const dns = require('dns');
const fetch = require('node-fetch');

const UPSTREAM_HOST = 'query.hicloud.com';

let resolvePrms;

/**
 * Fetch from query.hicloud.com, but replace the url
 *
 * Mimicks the global.fetch signature
 *
 * @param input
 * @param init
 */
module.exports = function (input, init = {}) {
    init.headers = init.headers || {};
    init.headers.Host = UPSTREAM_HOST;

    return resolveUpstreamHost()
        .then(upstreamIp => {
            console.log('Forwarding the request to hicloud...');

            input = 'http://' + upstreamIp + input;
            return fetch(input, init).then(rejectOnHttpError);
        });
};

function rejectOnHttpError(response) {
    if (!response.ok) {
        console.error('Error forwarding');
        response.json().then(console.error);
        throw new Error('Upstream answered with status code ' + response.statusCode);
    }
    console.log('...forward done');
    return response;
}
/**
 * As the usage of RedLotus forces the user to edit his hostsfile, we need to explicitly resolve the original host
 */
function resolveUpstreamHost() {
    if (!resolvePrms) {
        resolvePrms = new Promise((resolve, reject) => {
            dns.resolve4(UPSTREAM_HOST, function (err, res) {
                if (err) {
                    return reject(err);
                }
                if (!res || res.length === 0) {
                    return reject('Sorry, could not resolve the dns entry');
                }
                return resolve(res[0]);
            })
        });
    }
    return resolvePrms;
}