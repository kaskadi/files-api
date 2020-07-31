const objectExists = require('./object-exists.js')
const listFiles = require('./list-files.js')
const processRes = require('./process-response.js')

module.exports = (params, baseResponse) => {
  return objectExists(params)
    .then(dataExists => dataExists ? listFiles(params) : [])
    .then(processRes(baseResponse, params))
}
