const url = require('url'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    http = require('http');
    md5sum = require('./md5');

module.exports = function mkdirAndDownload(fileUrl, destination) {
    return mkdirpromise(path.dirname(destination)).then(() => download(fileUrl, destination));
};

function download(fileUrl, destination) {
    return new Promise((resolve, reject) => {

        const p = url.parse(fileUrl);

        const file = fs.createWriteStream(destination);

        http.get(fileUrl).on('response', function (res) {
            const len = parseInt(res.headers['content-length'], 10);
            console.log('Starting to download ' + destination + ', with a total of ' + len + ' bytes');
            let downloaded = 0;
            let downloadedPerc = '0.0';
            md5 = new md5sum.ArrayBuffer();
            res.on('data', function (chunk) {
                file.write(chunk);
                downloaded += chunk.length;
                let newDlPerc = '' + (100.0 * downloaded / len).toFixed(1);
                md5.append(chunk);
                if (newDlPerc !== downloadedPerc) {
                    process.stdout.write(destination + ": " + newDlPerc + "%\n");
                }
                downloadedPerc = newDlPerc;
            }).on('end', function () {
                file.end();
                console.log('md5 = '+md5.end());
                console.log('downloaded to: ' + destination);
                resolve(destination);
            }).on('error', function (err) {
                reject(err);
            });
        }).on('error', reject);
    });
}


function mkdirpromise(destination) {
    return new Promise(function (resolve, reject) {
        mkdirp(destination, function (err) {
            if (err) {
                return reject(err);
            }
            resolve();
        });
    });
}
