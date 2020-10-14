module.exports = (s3, { key }) => {
  if (!key) {
    throw new Error({
      customStatusCode: 400,
      customMessage: 'Please provide a key for the file you would like to upload in your query string parameters.'
    })
  }
  const cloudFrontDomain = process.env.CFD_PUBLIC_DOMAIN
  const params = {
    Bucket: process.env.S3_PUBLIC_BUCKET,
    Key: key,
    Expires: 120
  }
  return s3.getSignedUrlPromise('putObject', params)
    .then(presignedUrl => {
      return {
        presignedUrl,
        imgUrl: `${cloudFrontDomain}/${key}`
      }
    })
}
