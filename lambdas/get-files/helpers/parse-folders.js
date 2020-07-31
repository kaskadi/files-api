module.exports = (s3, folders, bucketName) => {
  return Promise.all(folders.map(parseFolder(s3, bucketName)))
}

function parseFolder (s3, bucketName) {
  return folder => {
    const path = folder.Prefix
    return getFolderMetaData(s3, bucketName, path)
      .then(meta => {
        return {
          type: 'folder',
          size: meta.ContentLength,
          lastModified: meta.LastModified,
          path
        }
      })
  }
}

function getFolderMetaData (s3, bucketName, path) {
  const params = {
    Bucket: bucketName,
    Key: path
  }
  return s3.headObject(params).promise()
}
