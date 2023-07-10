import path from 'path'
import url from 'url'
import fs from 'fs-extra'
import { exec } from 'child_process'

import { compile } from 'json-schema-to-typescript'

const scriptPath = path.dirname(url.fileURLToPath(import.meta.url))
const outputPath = path.resolve(scriptPath, '../lib', 'interface.ts')

const requestJson = () =>
  fetch('http://json.schemastore.org/tsconfig').then((res) => res.json())

;(async () => {
  const json = await requestJson()
  const result = await compile(json)
  await fs.writeFile(outputPath, result)
})()
