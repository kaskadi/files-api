// ************
// NOTE: this lambda shouldn't need much update to handle any type of get files. Maybe do not default to 'imgs/products/' for our path though.
// ************

const AWS = require('aws-sdk')
const getData = require('./helpers/get-data')

module.exports.handler = async (event) => {
  const params = {
    path: event.queryStringParameters ? event.queryStringParameters.path : 'imgs/products/',
    s3: new AWS.S3({
      region: 'eu-central-1',
      apiVersion: '2006-03-01'
    }),
    bucketName: process.env.S3_PUBLIC_BUCKET
  }
  const baseResponse = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return await getData(params, baseResponse)
}
