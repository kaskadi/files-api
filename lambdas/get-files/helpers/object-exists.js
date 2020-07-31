module.exports = ({ s3, bucketName, path }) => {
  // somehow headObject/getObject are sending a NotFound error when we're testing a folder which contains only files (no sub folders) so I went with the listObjects approach
  return s3.listObjectsV2({ Bucket: bucketName, Prefix: path, MaxKeys: 1 }).promise()
    .then(objects => objects.Contents.length > 0)
}
