require('chai').should();
require('../lib/mocha_subject');

describe('mocha subject', function() {
  beforeEach(function() {
    this.object = { foo: 'bar' };
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
});
