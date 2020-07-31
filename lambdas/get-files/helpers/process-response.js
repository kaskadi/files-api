module.exports = (baseResponse, { path }) => {
  return files => {
    return {
      ...baseResponse,
      statusCode: files.length > 0 ? 200 : 404,
      body: files.length > 0 ? JSON.stringify(files) : JSON.stringify({ message: `No file/folder was found under ${path}` })
    }
  }
}
