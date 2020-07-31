const AWS = require('aws-sdk')
const objectExists = require('./helpers/object-exists.js')
const listFiles = require('./helpers/list-files.js')

module.exports.handler = async (event) => {
  const path = event.queryStringParameters ? event.queryStringParameters.path : 'imgs/products/'
  const s3 = new AWS.S3({
    region: 'eu-central-1',
    apiVersion: '2006-03-01'
  })
  const bucketName = process.env.S3_PUBLIC_BUCKET
  const baseResponse = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return objectExists(s3, bucketName, path)
    .then(async exists => {
      if (exists) {
        return listFiles(s3, bucketName, path)
          .then(files => {
            baseResponse.body = JSON.stringify({ files })
            return baseResponse
          })
      }
      baseResponse.statusCode = 404
      baseResponse.body = JSON.stringify({ message: `No file/folder was found under ${path}` })
      return baseResponse
    })
}
