module.exports = ({ s3, bucketName, path }) => {
  const params = {
    Bucket: bucketName,
    Key: path
  }
  return s3.headObject(params).promise()
    .then(() => true)
    .catch(() => false)
}
