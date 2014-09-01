/**
 * import(s)
 */

var debug = require('debug')('duo-jsonlint');
var jsonlint = require('jsonlint');


/**
 * export(s)
 */

module.exports = plugin;

function plugin () {
  return function validJSON (file) {
    if (file.type === 'js') { return; }
    if (file.type === 'json') {
      try {
        jsonlint.parse(file.src);
      } catch (e) {
        debug('jsonlint.parse error', e.message);
        throw new SyntaxError(message(e, file));
      }
    }
  };
}


/**
 * create message
 */

function message (err, file) {
  var msg = '';

  msg += 'id: ' + file.id + '\n';
  if (file.path) {
    msg += 'path: ' + file.path + '\n';
  }
  msg += 'message: \n' + err.message;

  return msg;
}
