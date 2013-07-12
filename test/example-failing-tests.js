require('mocha-as-promised')()
var assertPromise = require('./../lib/assert-promise')
var assert = require('assert')
var Q = require('q')

it('basic failing promise', function(done) {
  Q(2).delay(50).then(function(two) {
    assert.equal(two, 3)
  }).done(done)
})

it('basic passing promise', function(done) {
  Q(2).delay(50).then(function(two) {
    assert.equal(two, 2)
  }).done(done)
})

it('assert non promise', function(done) {
  assertPromise.equal(3, 3).done(done)
})

it('assert failing promise', function(done) {
  assertPromise.equal(Q(2).delay(50), 3).done(done)
})

it('assert failing promise with message', function(done) {
  assertPromise.equal(Q(2).delay(50), 3, 'this should fail').done(done)
})

it('assert failing promise with own assert function', function(done) {
  var alwaysFail = function(actual, expected, message) {
    assert(false, 'Failing anyway. Got ' + actual + ' and ' + expected + ' with message: ' + message)
  }
  assertPromise.equal(Q(1).delay(50), true, 'this should fail', alwaysFail).done(done)
})

it('assert failing promise with other assert function', function(done) {
  assertPromise.equal(Q(1).delay(50), true, 'using strict, should fail', assert.strictEqual).done(done)
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

it('assert fail mocha-as-promised', function() {
  return assertPromise.equal(Q(2).delay(50), 3)
})

