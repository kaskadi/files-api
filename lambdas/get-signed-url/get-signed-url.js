// ************
// Note: this lambda shouldn't need much update to handle any type of upload files.
// Ideas:
//    - be able to support CDN/S3 selection between public and private one, would probably need a bit more check for access control
// ************

const AWS = require('aws-sdk')
const createSignedUrl = require('./helpers/create-signed-url.js')
const processRes = require('./helpers/process-response.js')
const processErr = require('./helpers/process-error.js')
const { getBaseResponse } = require('files-api-utils')

const s3 = new AWS.S3({
  region: 'eu-central-1',
  apiVersion: '2006-03-01'
})

module.exports.handler = async (event) => {
  const baseResponse = getBaseResponse()
  return await createSignedUrl(s3, event.queryStringParameters || {})
    .then(processRes(baseResponse))
    .catch(processErr(baseResponse))
}
