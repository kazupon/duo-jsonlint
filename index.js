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
  return function jsonlint (file, duo) {
    throw new Error('Not Implement');
  };
}
