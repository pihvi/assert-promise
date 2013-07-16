require('mocha-as-promised')()
var assertPromise = require('./../lib/assert-promise')
var assert = require('assert')
var Q = require('q')

it('basic passing promise', function(done) {
  Q(2).delay(50).then(function(two) {
    assert.equal(two, 2)
  }).done(done)
})

it('assert passing promise with own assert function', function(done) {
  var alwaysPass = function() {
  }
  assertPromise.equal(Q(2).delay(50), 3, 'this should pass', alwaysPass).done(done)
})

it('assert passing promise', function(done) {
  assertPromise.equal(Q(1).delay(50), true).done(done)
})

it('assert passing mocha-as-promised', function() {
  return assertPromise.equal(Q(2).delay(50), 2)
})
