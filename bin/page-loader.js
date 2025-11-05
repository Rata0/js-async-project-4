#!/usr/bin/env node

import { program } from 'commander'
import pageLoader from '../src/page-loader.js'

const command = async (url, options) => {
  try {
    const data = await pageLoader(url, options.output)
    console.log(data)
    process.exit(0)
  }
  catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

program
  .name('page-loader')
  .description('Page loader utility')
  .version('0.0.1')
  .option('-o, --output [dir]', 'output dir', process.cwd())
  .argument('<url>', 'URL to download')
  .action(command)
  .parse(process.argv)
