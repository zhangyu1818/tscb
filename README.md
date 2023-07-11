# tscb

A lightweight TypeScript packaging library that solves the issue of tsconfig not being able to output both cjs and esm files simultaneously.

## Install

```shell
npm install tscb
```

## Usage

`tscb` will read the configuration from `tscb.config.js` or `package.json`, and any new configuration will overwrite the settings in the project's `tsconfig.json`.

```json
// package.json
{
  "tscb": [
    {
      "compilerOptions": {
        "module": "es2015",
        "outDir": "dist",
        "declaration": true
      }
    },
    {
      "compilerOptions": {
        "module": "commonjs",
        "outDir": "dist/cjs"
      },
      "include": ["lib"]
    }
  ]
}
```

```js
// tscb.config.js
module.exports = [
  {
    compilerOptions: {
      module: 'es2015',
      outDir: 'dist',
      declaration: true,
    },
  },
  {
    compilerOptions: {
      module: 'commonjs',
      outDir: 'dist/cjs',
    },
    include: ['lib'],
  },
]
```

Please note, if your project is set to `"type": "module"`, you need to change the configuration file suffix to cjs - `tscb.config.cjs`.

Run the `tscb` command

```shell
tscb
```

or

```shell
npx tscb
```

## Command Line Arguments

```shell
tscb [--config /path/to/config] [--project /path/to/tsconfig]
```

## API

```ts
import { tscb } from 'tscb'

tscb({
  compilerOptions: {
    module: 'commonjs',
    outDir: 'dist/cjs',
  },
  include: ['lib'],
})
```
