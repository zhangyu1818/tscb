module.exports = [
  {
    compilerOptions: {
      module: 'CommonJS',
      outDir: 'dist/cjs',
    },
  },
  {
    compilerOptions: {
      module: 'ES2020',
      outDir: 'dist/esm',
    },
  },
  {
    compilerOptions: {
      outDir: 'dist/type',
      declaration: true,
      emitDeclarationOnly: true,
    },
  },
]
