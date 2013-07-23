require('mocha-as-promised')()
var assertPromise = require('./../lib/assert-promise')
var assert = require('assert')
var Q = require('q')

it('basic passing promise', function(done) {
  promise(2).then(function(two) {
    assert.equal(two, 2)
  }).done(done)
})

it('assert passing promise with own assert function', function(done) {
  var assertOneLess = function(actual, expected, message) {
    assert.equal(actual + 1, expected, message)
  }
  assertPromise.withFn(promise(2), 3, 'this should pass', assertOneLess).done(done)
})

it('assert.equal passing promise', function(done) {
  assertPromise.equal(promise(1), 1)
    .then(function(){done()}, done)
})

it('assert.notEqual passing promise', function(done) {
  assertPromise.notEqual(promise(1), 2)
    .then(function(){done()}, done)
})

it('assert.ok passing promise', function(done) {
  assertPromise.ok(promise(1))
    .then(function(){done()}, done)
})

it('assert() passing promise', function(done) {
  assertPromise(promise(1))
    .then(function(){done()}, done)
})

it('assert passing mocha-as-promised', function() {
  return assertPromise.equal(promise(2), 2)
    .then(function() {
      return assertPromise.notEqual(promise(3), 2)
    }).then(function() {
      return assertPromise(promise(true))
    }).then(function() {
      return assertPromise.deepEqual(promise({a: 1}), {a: true})
    }).then(function() {
      return assertPromise.notDeepEqual(promise({a: 2}), {a: true})
    }).then(function() {
      return assertPromise.strictEqual(promise(1), 1)
    }).then(function() {
      return assertPromise.notStrictEqual(promise(true), 1)
    })
})

it('assert nested promises as mocha', function(done) {
  var nestedPromise = promise([promise(1), promise(2)])
  return assertPromise(nestedPromise)
    .then(function(arr) {
      assert.equal(arr.length, 2)
      return arr
    })
    .then(function(arr) {
      return Q.all([
        assertPromise.equal(arr[0], 1),
        assertPromise.equal(arr[1], 2)
      ])
    })
})

function promise(val) {
  return Q(val).delay(10)
}
