#!/usr/bin/env node

import path from 'path'
import fs from 'fs-extra'
import arg from 'arg'

import { tscb } from './tscb'

import { type TscbConfig } from './defineConfig'

const cwd = process.cwd()

const args = arg({
  '--config': String,
  '--project': String,

  '-c': '--config',
  '-p': '--project',
})

const packagePath = path.join(cwd, 'package.json')

const projectConfig = args['--project']
let configPath = args['--config']

if (!configPath) {
  const configFilePath = [
    path.join(cwd, 'tscb.config.js'),
    path.join(cwd, 'tscb.config.cjs'),
  ]
  for (const filePath of configFilePath) {
    if (fs.existsSync(filePath)) {
      configPath = filePath
      break
    }
  }
} else {
  configPath = path.join(cwd, configPath)
}

let typescriptOptions: TscbConfig = {}

if (configPath) {
  const configFromFile = require(configPath)
  if (configFromFile) {
    typescriptOptions = configFromFile as TscbConfig
  }
} else {
  const configFromPackageJson = require(packagePath).tscb
  if (configFromPackageJson) {
    typescriptOptions = configFromPackageJson as TscbConfig
  }
}

if (!Array.isArray(typescriptOptions)) {
  typescriptOptions = [typescriptOptions]
}

typescriptOptions.forEach((config) => {
  tscb(config, projectConfig)
})
