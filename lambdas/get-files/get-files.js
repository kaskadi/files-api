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
  let path = event.queryStringParameters ? event.queryStringParameters.path : undefined
  path = path && path.trim() !== '' ? path.trim() : undefined
  path = path && path[path.length - 1] !== '/' ? `${path}/` : path
  const params = {
    path,
    s3: new AWS.S3({
      region: 'eu-central-1',
      apiVersion: '2006-03-01'
    }),
    bucketName: process.env.S3_PUBLIC_BUCKET
  }
  return await getData(params, baseResponse)
}
