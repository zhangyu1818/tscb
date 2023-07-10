import path from 'path'
import fs from 'fs-extra'
import { spawnSync } from 'child_process'

import type { JSONSchemaForTheTypeScriptCompilerSConfigurationFile as TypeScriptOptions } from './interface'

const cwd = process.cwd()
export const tscb = (options: TypeScriptOptions = {}, configPath?: string) => {
  if (!configPath) {
    configPath = path.join(cwd, 'tsconfig.json')
  }

  let tsconfig: TypeScriptOptions = {}
  eval(`tsconfig = ${fs.readFileSync(configPath, 'utf-8')}`)

  const { compilerOptions, ...restOptions } = options

  tsconfig = {
    ...tsconfig,
    ...restOptions,
    compilerOptions: {
      ...tsconfig.compilerOptions,
      ...compilerOptions,
    },
  }

  const tempPath = path.join(cwd, '.temp.json')
  try {
    fs.writeJSONSync(tempPath, tsconfig)
    spawnSync('tsc', ['--project', tempPath], { stdio: 'inherit' })
  } catch (e) {
  } finally {
    fs.unlinkSync(tempPath)
  }
}
