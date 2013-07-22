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
  var assertOneLess = function(actual, expected, message) {
    assert.equal(actual + 1, expected, message)
  }
  assertPromise.withFn(Q(2).delay(50), 3, 'this should pass', assertOneLess).done(done)
})

it('assert.equal passing promise', function(done) {
  assertPromise.equal(Q(1).delay(50), 1).done(done)
})

it('assert.notEqual passing promise', function(done) {
  assertPromise.notEqual(Q(1).delay(50), 2).done(done)
})

it('assert.ok passing promise', function(done) {
  assertPromise.ok(Q(1)).done(done)
})

it('assert() passing promise', function(done) {
  assertPromise(Q(1)).done(done)
})

it('assert passing mocha-as-promised', function() {
  return assertPromise.equal(Q(2).delay(50), 2)
    .then(function() {
      return assertPromise.notEqual(Q(3).delay(50), 2)
    }).then(function() {
      return assertPromise(Q(true).delay(50))
    }).then(function() {
      return assertPromise.deepEqual(Q({a: 1}).delay(50), {a: true})
    }).then(function() {
      return assertPromise.notDeepEqual(Q({a: 2}).delay(50), {a: true})
    }).then(function() {
      return assertPromise.strictEqual(Q(1).delay(50), 1)
    }).then(function() {
      return assertPromise.notStrictEqual(Q(true).delay(50), 1)
    })
})
