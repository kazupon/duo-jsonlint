/**
 * import(s)
 */

var expect = require('expect.js');
var Duo = require('duo');
var vm = require('vm');
var join = require('path').join;
var jsonlint = require('../');


/**
 * function(s)
 */

/**
 * Build js `fixture` and return `str`.
 */

function build (fixture, file) {
  var root = path(fixture);
  var duo = Duo(root).entry(file || 'index.js');
  return duo;
}

/**
 * Path to `fixture`
 */

function path (fixture) {
  return join(__dirname, 'fixtures', fixture);
}

/**
 * Evaluate `js`.
 */

function evaluate (js, ctx) {
  var ctx = { window: {}, document: {} };
  vm.runInNewContext('main =' + js + '(1)', ctx, 'main.vm');
  vm.runInNewContext('require =' + js + '', ctx, 'require.vm');
  return ctx;
}


/**
 * test(s)
 */

describe('duo-jsonlint', function () {
  describe('valid json', function () {
    it('should be no error', function (done) {
      var duo = build('valid');
      duo.use(jsonlint());
      duo.run(function (err, js) {
        if (err) { return done(err); }

        var ctx = evaluate(js).main;
        expect(ctx).to.eql({ key: 'value' });
        done();
      });
    });
  });

  describe('invalid json', function () {
    it('should raise SyntaxError', function (done) {
      var duo = build('invalid');
      duo.use(jsonlint());
      duo.run(function (err, js) {
        expect(err).to.be.a(SyntaxError);
        done();
      });
    });
  });
});


