// ************
// Note: this lambda shouldn't need much update to handle any type of get files.
// Ideas:
//    - do not default to 'imgs/products/' for our path
//    - be able to support CDN/S3 selection between public and private one, would probably need a bit more check for access control
// ************

const AWS = require('aws-sdk')
const getData = require('./helpers/get-data')

module.exports.handler = async (event) => {
  const baseResponse = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  const params = {
    path: !event.queryStringParameters ? undefined : event.queryStringParameters.path,
    s3: new AWS.S3({
      region: 'eu-central-1',
      apiVersion: '2006-03-01'
    }),
    bucketName: process.env.S3_PUBLIC_BUCKET
  }
  return await getData(params, baseResponse)
}
