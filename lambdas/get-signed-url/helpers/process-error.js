module.exports = baseResponse => err => {
  const { customStatusCode, customMessage } = err
  console.log(JSON.stringify(err, null, 2))
  return {
    ...baseResponse,
    statusCode: customStatusCode || 502,
    body: JSON.stringify({ message: customMessage || 'An error occured...' })
  }
}
