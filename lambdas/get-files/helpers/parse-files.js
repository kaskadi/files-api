module.exports = (files) => {
  return files.map(file => {
    return {
      type: 'file',
      size: file.Size,
      lastModified: file.LastModified,
      path: `${process.env.CFD_PUBLIC_DOMAIN}/${file.Key}`
    }
  })
}
