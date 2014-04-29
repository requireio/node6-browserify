var through = require('through2')
var bl = require('bl')
var node6 = require('node6')
module.exports = function(filename) {
  if (!/\.js$/.test(filename)) return through()
  var buffer = bl()
  return through(function(data, enc, fn) {
    buffer.append(data)
    fn()
  }, function(fn) {
    this.push(node6.transpile(buffer.toString()))
    fn()
  })
  return buffer
}
