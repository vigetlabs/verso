var libraryConfig = require('./config/webpack.lib')
var examplesConfigs = require('./config/webpack.examples')

module.exports = examplesConfigs.concat([libraryConfig])
