(function(exports) {
  exports.subject = function(fn) {
    def('subject', fn);
  };

  exports.def = function(name, fn) {
    var scope;
    scope = this;
    scope.__subjects = {};

    beforeEach(function() {
      this.__defineGetter__(name, function() {
        if (scope.__subjects[name] === undefined) {
          scope.__subjects[name] = fn.call(this);
        }

        return scope.__subjects[name];
      });

      this.__defineSetter__(name, function(value) {
        scope.__subjects[name] = value;
      });
    });

    afterEach(function() {
      scope.__subjects = {};
    });
  };
})(typeof exports === 'undefined' ? this : global);
