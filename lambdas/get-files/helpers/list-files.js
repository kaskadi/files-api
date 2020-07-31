module.exports = ({ s3, bucketName, path }) => {
  const params = {
    Bucket: bucketName,
    Delimiter: '/',
    Prefix: path
  }
  return s3.listObjectsV2(params).promise()
    .then(extractData)
    .then(processData(s3, bucketName))
}

function extractData (folderData) {
  var files = folderData.Contents
  files.shift() // the first element is always the base folder which we don't want to list
  return {
    files,
    folders: folderData.CommonPrefixes
  }
}

function processData (s3, bucketName) {
  const parseFolders = require('./parse-folders.js')
  const parseFiles = require('./parse-files.js')
  return data => parseFolders(s3, data.folders, bucketName)
    .then(folders => [...folders, ...parseFiles(data.files)])
}
