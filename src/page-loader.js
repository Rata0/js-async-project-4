import axios from 'axios'
import { URL } from 'node:url'
import path from 'node:path'
import fs from 'node:fs/promises'
import generateFileName from './filename-generator.js'

const pageLoader = async (url, outputDir = process.cwd()) => {
  return axios.get(url)
    .then((response) => {
      const urlObj = new URL(url)
      let filename = generateFileName(`${urlObj.hostname}${urlObj.pathname}`)
      const outputPath = path.join(outputDir, filename)

      return fs.writeFile(outputPath, response.data)
        .then(() => outputPath)
    })
    .catch((error) => {
      console.log(error)
      throw new Error(`Error: ${error.message}`)
    })
}

export default pageLoader
