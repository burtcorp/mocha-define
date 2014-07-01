require('chai').should();
require('../lib/mocha_define');

describe('mocha define', function() {
  beforeEach(function() {
    this.object = { foo: 'bar' };
  });

  it('exposes object', function() {
    this.object.should.eql({foo: 'bar'});
  });

  describe('#subject', function() {
    subject(function() {
      return this.object;
    });

    it('returns the subject', function() {
      this.subject.should.equal(this.object);
    });

    describe('nested', function() {
      subject(function() {
        return { baz: 'qux' };
      });

      it('returns the new subject', function() {
        this.subject.should.not.equal(this.object);
        this.subject.should.eql({baz: 'qux'});
      });
    });
  });

  describe('#def', function() {
    def('foo', function() {
      return this.object.foo;
    });

    it('returns the def', function() {
      this.foo.should.equal('bar');
    });

    describe('nested', function() {
      def('foo', function() {
        return 'qux';
      });

      it('returns the new def', function() {
        this.foo.should.not.equal(this.object);
        this.foo.should.eql('qux');
      });
    });
  });

  describe('subject/def access', function() {
    def('foo', function() {
      return 'bar';
    });

    subject(function() {
      return this.foo;
    });

    it('is allowed', function() {
      this.subject.should.equal(this.foo);
    });
  });

  describe('assignment', function() {
    def('foo', function() {
      return 'bar';
    });

    describe('nested', function() {
      beforeEach(function() {
        this.foo = 'BAR';
      });

      it('overrites definition', function() {
        this.foo.should.equal('BAR');
      });
    });
  });

  describe('cache', function() {
    def('random', function() {});

    describe('def', function() {
      var read = false;

      def('random', function() {
        if (read) {
          throw new Error('should not read twice, but did');
        } else {
          read = true;
        }

        return 'random';
      });

      it('caches definition', function() {
        this.random.should.equal('random');
        this.random.should.equal('random');
      });
    });

    describe('assignment', function() {
      beforeEach(function() {
        this.random = 'RANDOM';
      });

      it('caches definition', function() {
        this.random.should.equal('RANDOM');
        this.random.should.equal('RANDOM');
      });
    });
  });
});
