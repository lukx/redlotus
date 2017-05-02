const argv = require('minimist')(process.argv.slice(2));
const parseFilesFromFilelist = require('./src/filePackage/parseFilesFromFilelist');
const fetch = require('node-fetch');
const downloadWithProgress = require('./src/helper/downloadWithProgress');
const createVersionFile = require('./src/filePackage/createVersionFile');
const path = require('path');
const destination = path.join(__dirname, 'firmware');

if (argv._.length !== 1 || argv._[0].indexOf('http://update.hicloud.com') !== 0) {
    console.log('Usage:');
    console.log('npm run download <FilelistURL>');
    console.log('e.g.');
    console.log('npm run download http://update.hicloud.com:8180/TDS/data/files/p3/s15/G1473/g104/v81733/f1/full/filelist.xml');
    console.log();
    process.exit(0);
}

const folderUrl = argv._[0].replace('update.zip', '').replace('filelist.xml', '');
if (folderUrl === argv._[0]) {
    console.log('Your link does not seem to point to a filelist.xml.');
    process.exit(1);
}

const filelistUrl = folderUrl + 'filelist.xml';

fetch(filelistUrl)
    .then(response => response.text())
    .then(parseFilesFromFilelist)
    .then(() => createVersionFile(path.join(destination, 'version.js'), filelistUrl))
    .then(files => downloadAllFiles(files, destination))
    .catch(console.error);

function downloadAllFiles(files, to) {
    let prms = Promise.resolve();
    files.forEach(function (file) {
        prms = prms.then(() => downloadWithProgress(folderUrl + file.path, path.join(to, file.path)));
    });
    return prms;
}