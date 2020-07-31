module.exports = baseResponse => res => {
  return {
    ...baseResponse,
    body: JSON.stringify(res)
  }
}
