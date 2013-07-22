require('mocha-as-promised')()
var assertPromise = require('./../lib/assert-promise')
var assert = require('assert')
var Q = require('q')

it('fail assert on non promise', function(done) {
  assertPromise.equal(3, 3).done(done)
})

it('fail basic promise', function(done) {
  promise(2).then(function(two) {
    assert.equal(two, 3)
  }).done(done)
})

it('fail assert promise with equal', function(done) {
  assertPromise.equal(promise(2), 3).done(done)
})

it('fail assert promise with notEqual', function(done) {
  assertPromise.notEqual(promise(3), 3).done(done)
})

it('fail assert promise', function(done) {
  assertPromise(promise(false), "fail on false").done(done)
})

it('fail assert promise with message', function(done) {
  assertPromise.equal(promise(2), 3, 'this should fail').done(done)
})

it('fail assert promise with own assert function', function(done) {
  var alwaysFail = function(actual, expected, message) {
    assert(false, 'Failing anyway. Got ' + actual + ' and ' + expected + ' with message: ' + message)
  }
  assertPromise.withFn(promise(1), true, 'this should fail', alwaysFail).done(done)
})

it('fail assert promise with other assert function', function(done) {
  assertPromise.withFn(promise(1), true, 'using strict, should fail', assert.strictEqual).done(done)
})

it('fail assert mocha-as-promised', function() {
  return assertPromise.equal(promise(2), 3)
})

function promise(val) {
  return Q(val).delay(50)
}
