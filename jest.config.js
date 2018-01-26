const isBundled = process.env.BUNDLED

module.exports = {
  setupTestFrameworkScriptFile: './test/setup.js',
  setupFiles: ['raf/polyfill'],
  testEnvironment: 'jsdom',
  modulePathIgnorePatterns: ['stories', 'build'],
  moduleNameMapper: {
    '^verso$': `<rootDir>/${isBundled ? 'build/min' : 'src'}`
  }
}
