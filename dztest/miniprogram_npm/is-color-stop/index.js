module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038547156, function(require, module, exports) {


const isRGB = require('./lib/isRGB');
const isRGBA = require('./lib/isRGBA');
const isHSL = require('./lib/isHSL');
const isHSLA = require('./lib/isHSLA');
const isHex = require('./lib/isHex');
const isCSSColorName = require('./lib/isCSSColorName');
const isTransparent = require('./lib/isTransparent');
const isCSSLengthUnit = require('./lib/isCSSLengthUnit');
const isStop = require('./lib/isStop');

function isColor(colorStr) {
  const color =
    isRGB(colorStr) ||
    isRGBA(colorStr) ||
    isHSL(colorStr) ||
    isHSLA(colorStr) ||
    isHex(colorStr) ||
    isCSSColorName(colorStr) ||
    isTransparent(colorStr);

  return color;
}


module.exports = function isColorStop(color, stop) {
  return isColor(color) && isStop(stop);
};
module.exports.isColor = isColor;
module.exports.isRGB = isRGB;
module.exports.isRGBA = isRGBA;
module.exports.isHSL = isHSL;
module.exports.isHSLA = isHSLA;
module.exports.isHex = isHex;
module.exports.isCSSColorName = isCSSColorName;
module.exports.isTransparent = isTransparent;
module.exports.isCSSLengthUnit = isCSSLengthUnit;

}, function(modId) {var map = {"./lib/isRGB":1625038547157,"./lib/isRGBA":1625038547158,"./lib/isHSL":1625038547159,"./lib/isHSLA":1625038547160,"./lib/isHex":1625038547161,"./lib/isCSSColorName":1625038547162,"./lib/isTransparent":1625038547163,"./lib/isCSSLengthUnit":1625038547164,"./lib/isStop":1625038547165}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547157, function(require, module, exports) {


const rgbRegex = require('rgb-regex');

function isRGB(str) {
  return rgbRegex({ exact: true }).test(str);
}

module.exports = isRGB;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547158, function(require, module, exports) {


const rgbaRegex = require('rgba-regex');

function isRgba(str) {
  return rgbaRegex({ exact: true }).test(str);
}

module.exports = isRgba;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547159, function(require, module, exports) {


const hslRegex = require('hsl-regex');

function isHSL(str) {
  return hslRegex({ exact: true }).test(str);
}

module.exports = isHSL;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547160, function(require, module, exports) {


const hslaRegex = require('hsla-regex');

function isHSLA(str) {
  return hslaRegex({ exact: true }).test(str);
}

module.exports = isHSLA;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547161, function(require, module, exports) {


const hexRegex = require('hex-color-regex');

function isHex(str) {
  return hexRegex({ exact: true }).test(str);
}

module.exports = isHex;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547162, function(require, module, exports) {


const colorNames = require('css-color-names');

function isCSSColorName(str) {
  return !!colorNames[str];
}

module.exports = isCSSColorName;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547163, function(require, module, exports) {


function isTransparent(str) {
  return str === 'transparent';
}

module.exports = isTransparent;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547164, function(require, module, exports) {


const lengthArray = [
  'PX',
  'IN',
  'CM',
  'MM',
  'EM',
  'REM',
  'POINTS',
  'PC',
  'EX',
  'CH',
  'VW',
  'VH',
  'VMIN',
  'VMAX',
  '%',
];

function isCSSLengthUnit(unit) {
  return lengthArray.indexOf(unit.toUpperCase()) >= 0;
}

module.exports = isCSSLengthUnit;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547165, function(require, module, exports) {


const isCSSLengthUnit = require('./isCSSLengthUnit');
const unit = require('../util/unit');

function isStop(str) {
  let stop = !str;
  
  if (!stop) {
    const node = unit(str);
    if (node) {
      if (node.number === 0 || (!isNaN(node.number) && isCSSLengthUnit(node.unit))) {
        stop = true;
      }
    } else {
      stop = (/^calc\(\S+\)$/g).test(str);
    }
  }

  return stop;
}

module.exports = isStop;

}, function(modId) { var map = {"./isCSSLengthUnit":1625038547164,"../util/unit":1625038547166}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547166, function(require, module, exports) {


/**
 * https://github.com/TrySound/postcss-value-parser/blob/fc679a7e17877841ff9fe455722280b65abd4f28/lib/unit.js
 * parse node -> number and unit
 */

const minus = '-'.charCodeAt(0);
const plus = '+'.charCodeAt(0);
const dot = '.'.charCodeAt(0);

module.exports = function unit(value) {
  let pos = 0;
  const length = value.length;
  let dotted = false;
  let containsNumber = false;
  let code;
  let number = '';

  while (pos < length) {
    code = value.charCodeAt(pos);

    if (code >= 48 && code <= 57) {
      number += value[pos];
      containsNumber = true;
    } else if (code === dot) {
      if (dotted) {
        break;
      }
      dotted = true;
      number += value[pos];
    } else if (code === plus || code === minus) {
      if (pos !== 0) {
        break;
      }
      number += value[pos];
    } else {
      break;
    }

    pos += 1;
  }

  return containsNumber ? {
    number,
    unit: value.slice(pos),
  } : false;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038547156);
})()
//# sourceMappingURL=index.js.map