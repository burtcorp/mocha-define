global.subject = function(fn) {
  def('subject', fn);
};

global.def = function(name, fn) {
  beforeEach(function() {
    var scope;
    scope = this;
    scope.__subjects = scope.__subjects || {};

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
    this.__subjects = {};
  });
};
