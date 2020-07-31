const AWS = require('aws-sdk')
const createSignedUrl = require('./helpers/create-signed-url.js')
const processRes = require('./helpers/process-response.js')
const processErr = require('./helpers/process-error.js')

const s3 = new AWS.S3({
  region: 'eu-central-1',
  apiVersion: '2006-03-01'
})

module.exports.handler = async (event) => {
  const baseResponse = {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
  return await createSignedUrl(s3, JSON.parse(event.body))
    .then(processRes(baseResponse))
    .catch(processErr(baseResponse))
}
