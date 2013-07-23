Has all the functions from Node's assert, where the first param is a promise containing the actual value.

## Usage ##
```javascript
var assertPromise = require('assert-promise')

it('assert.equal passing promise', function(done) {
  assertPromise.equal(Q(1).delay(50), 1).done(done)
})

it('assert passing promise with own assert function', function(done) {
  var assertOneLess = function(actual, expected, message) {
    assert.equal(actual + 1, expected, message)
  }
  assertPromise.withFn(Q(2).delay(50), 3, 'this should pass', assertOneLess).done(done)
})
```
or

```javascript
require('mocha-as-promised')()
var assertPromise = require('assert-promise')

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

it('assert nested promises as mocha', function(done) {
  var nestedPromise = promise([promise(1), promise(2)])
  return assertPromise(nestedPromise).then(function(arr) {
      assert.equal(arr.length, 2)
      return arr
    }).then(function(arr) {
      return Q.all([
        assertPromise.equal(arr[0], 1),
        assertPromise.equal(arr[1], 2)
      ])
    })
})
```
