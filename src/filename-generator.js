const generateFileName = filename => filename.replace(/[^a-zA-Z0-9]/g, '-') + '.html'

export default generateFileName
