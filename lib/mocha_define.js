global.subject = function(fn) {
  def('subject', fn);
};

global.def = function(name, fn) {
  beforeEach(function() {
    this.__defs = this.__defs || {};

    Object.defineProperty(this, name, {
      configurable: true,

      get: function() {
        if (this.__defs[name] === undefined) {
          this.__defs[name] = fn.call(this);
        }

        return this.__defs[name];
      },

      set: function(value) {
        this.__defs[name] = value;
      }
    });
  });

  afterEach(function() {
    this.__defs = {};
  });
};
