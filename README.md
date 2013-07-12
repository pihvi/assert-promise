## Usage ##
```javascript
var assertPromise = require('assert-promise')

it('assert failing promise', function(done) {
  assertPromise.equal(promiseReturning2, 3).done(done)
})

it('assert passing promise', function(done) {
  assertPromise.equal(promiseReturning2, 2).done(done)
})
```
