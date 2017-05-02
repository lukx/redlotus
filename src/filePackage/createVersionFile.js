const fs = require('fs');

module.exports = function (destination, filelistUrl) {
    fs.writeFileSync(destination, 'module.exports="' + findVersionNumber(filelistUrl) + '";')
};

function findVersionNumber(url) {
    let parts = url.split('/');
    return parts.find((segment => segment.indexOf('v') === 0)).replace('v', '');
}