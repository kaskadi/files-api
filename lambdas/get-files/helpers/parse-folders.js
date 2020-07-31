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
          size: meta.Size,
          lastModified: meta.LastModified,
          path
        }
      })
  }
}

function getFolderMetaData (s3, bucketName, path) {
  return s3.listObjectsV2({ Bucket: bucketName, Prefix: path, MaxKeys: 1 }).promise()
    .then(objects => objects.Contents[0])
}
