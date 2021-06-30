module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038547170, function(require, module, exports) {
/*!
 * is-directory <https://github.com/jonschlinkert/is-directory>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */



var fs = require('fs');

/**
 * async
 */

function isDirectory(filepath, cb) {
  if (typeof cb !== 'function') {
    throw new Error('expected a callback function');
  }

  if (typeof filepath !== 'string') {
    cb(new Error('expected filepath to be a string'));
    return;
  }

  fs.stat(filepath, function(err, stats) {
    if (err) {
      if (err.code === 'ENOENT') {
        cb(null, false);
        return;
      }
      cb(err);
      return;
    }
    cb(null, stats.isDirectory());
  });
}

/**
 * sync
 */

isDirectory.sync = function isDirectorySync(filepath) {
  if (typeof filepath !== 'string') {
    throw new Error('expected filepath to be a string');
  }

  try {
    var stat = fs.statSync(filepath);
    return stat.isDirectory();
  } catch (err) {
    if (err.code === 'ENOENT') {
      return false;
    } else {
      throw err;
    }
  }
  return false;
};

/**
 * Expose `isDirectory`
 */

module.exports = isDirectory;

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038547170);
})()
//# sourceMappingURL=index.js.map