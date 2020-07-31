module.exports = (s3, { key }) => {
  const cloudFrontDomain = process.env.CFD_PUBLIC_DOMAIN
  const params = {
    Bucket: process.env.S3_PUBLIC_BUCKET,
    Key: key
  }
  return s3.getSignedUrlPromise('putObject', params)
    .then(presignedUrl => {
      return {
        presignedUrl,
        imgUrl: `${cloudFrontDomain}/${key}`
      }
    })
}
