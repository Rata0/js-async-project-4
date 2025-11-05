import { test, expect, describe, beforeEach } from '@jest/globals'
import fs from 'fs/promises'
import path from 'path'
import os from 'os'
import nock from 'nock'
import pageLoader from '../src/page-loader'

describe('Page loader', () => {
  let tempDir
  const testUrl = 'https://ru.hexlet.io/courses'
  const expectedFilename = 'ru-hexlet-io-courses.html'
  const mockHtml = '<html><body>Test content</body></html>'

  beforeEach(async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'page-loader-'))

    nock('https://ru.hexlet.io')
      .get('/courses')
      .reply(200, mockHtml)
  })

  test('Test 1', async () => {
    const outputPath = await pageLoader(testUrl, tempDir)
    const expectedPath = path.join(tempDir, expectedFilename)

    console.log(outputPath)
    console.log(expectedPath)

    expect(outputPath).toBe(expectedPath)

    const content = await fs.readFile(outputPath, 'utf-8')

    console.log(content)

    expect(content).toBe(mockHtml)
  })

  test('Test 2', async () => {
    await pageLoader(testUrl, tempDir)

    const files = await fs.readdir(tempDir)

    console.log(files)

    expect(files).toEqual([expectedFilename])
  })
})
