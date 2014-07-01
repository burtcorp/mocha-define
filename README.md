# Mocha define

Mocha define is a small plugin for
[Mocha.js](http://visionmedia.github.io/mocha/) that provides lazy
test definitions.

## Installation

```bash
$ npm install mocha-define --save-dev
```

## Usage

Require `mocha-define` in the Mocha tests.

This plugin defines two functions: `def` and `subject`.

For example:

```js
describe('Car', function() {
  def('engine', function() {
    return new Engine;
  });

  def('options', function() {
    return {};
  });

  subject(function() {
    return Car(this.engine, this.options);
  });

  describe('#start', function() {
    it('starts the engine', function(done) {
      this.engine.start = done;
      this.subject.pressStartButton();
    });
  });

  describe('#burnout', function() {
    it('trashes the tires', function(done) {
      this.subject.on('burnout', function(status) {
        if (status.tires === 'GARBAGE') {
          done();
        }
        this.subject.doThatBurnout();
      });
    });
  });
});
```

## Contribution

Be sure to!

Implement the functionality with a test and send us a pull request on
Github.
