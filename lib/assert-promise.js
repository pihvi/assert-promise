var assert = require('assert')

exports.equal = function(actualPromise, expected, message, assertFn) {
  return actualPromise.then(function(actual) {
    var fn = assertFn ? assertFn : assert.equal
    fn.apply(fn, [actual, expected, message])
  })
}
