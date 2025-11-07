const generateFileName = filename => filename.replaceAll(/[^a-zA-Z0-9]/g, '-') + '.html'

export default generateFileName
