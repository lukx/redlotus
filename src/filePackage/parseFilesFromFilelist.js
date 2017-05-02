const path = require('path');
const parseString = require('xml2js').parseString;

module.exports = function getFilesFromFilelist(filelistXmlString) {
    return new Promise(function (resolve, reject) {
        parseString(filelistXmlString, function (err, parsed) {
            if (err) {
                return reject(err);
            }
            return resolve(parsed);
        });
    }).then(gatherFiles);
};

function gatherFiles(fileXml) {
    const files = [{
        path: 'filelist.xml'
    }];
    fileXml.root.vendorInfo.forEach((fileInfo) => {
        fileInfo = fileInfo.$;
        if (fileInfo.logfile && fileInfo.logfile.length > 0) {
            files.push({
                path: fileInfo.logfile,
                md5: findChecksum(fileXml.root.files[0].file, fileInfo.logfile)
            });
        }
        files.push({
            path: assembleFilenameAndPath(fileInfo),
            md5: findChecksum(fileXml.root.files[0].file, fileInfo.package)
        });
    });
    return files;
}

function assembleFilenameAndPath(fileInfo) {
    if (fileInfo.subpath && fileInfo.subpath.length > 0) {
        return path.join(fileInfo.subpath, fileInfo.package);
    }
    return fileInfo.package;
}

function findChecksum(files, fileName) {
    return files.find((file => file.spath[0] === fileName)).md5[0];
}