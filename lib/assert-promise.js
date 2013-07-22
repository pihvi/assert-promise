var assert = require('assert')

module.exports = exports = function(promise, message) {
  return promise.then(function(actual) {
    assert(actual, message)
  })
}

Object.keys(assert).forEach(function(key) {
  module.exports[key] = function(promise) {
    var args = arguments
    return promise.then(function(actual) {
      args[0] = actual
      assert[key].apply(assert[key], args)
    })
  }
})

exports.withFn = function(promise, expected, message, assertFn) {
  return promise.then(function(actual) {
    assertFn(actual, expected, message)
  })
}
