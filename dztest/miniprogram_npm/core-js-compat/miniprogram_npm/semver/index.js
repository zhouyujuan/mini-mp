module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038545379, function(require, module, exports) {
const lrCache = {}
const lazyRequire = (path, subkey) => {
  const module = lrCache[path] || (lrCache[path] = require(path))
  return subkey ? module[subkey] : module
}

const lazyExport = (key, path, subkey) => {
  Object.defineProperty(exports, key, {
    get: () => {
      const res = lazyRequire(path, subkey)
      Object.defineProperty(exports, key, {
        value: res,
        enumerable: true,
        configurable: true
      })
      return res
    },
    configurable: true,
    enumerable: true
  })
}

lazyExport('re', './internal/re', 're')
lazyExport('src', './internal/re', 'src')
lazyExport('tokens', './internal/re', 't')
lazyExport('SEMVER_SPEC_VERSION', './internal/constants', 'SEMVER_SPEC_VERSION')
lazyExport('SemVer', './classes/semver')
lazyExport('compareIdentifiers', './internal/identifiers', 'compareIdentifiers')
lazyExport('rcompareIdentifiers', './internal/identifiers', 'rcompareIdentifiers')
lazyExport('parse', './functions/parse')
lazyExport('valid', './functions/valid')
lazyExport('clean', './functions/clean')
lazyExport('inc', './functions/inc')
lazyExport('diff', './functions/diff')
lazyExport('major', './functions/major')
lazyExport('minor', './functions/minor')
lazyExport('patch', './functions/patch')
lazyExport('prerelease', './functions/prerelease')
lazyExport('compare', './functions/compare')
lazyExport('rcompare', './functions/rcompare')
lazyExport('compareLoose', './functions/compare-loose')
lazyExport('compareBuild', './functions/compare-build')
lazyExport('sort', './functions/sort')
lazyExport('rsort', './functions/rsort')
lazyExport('gt', './functions/gt')
lazyExport('lt', './functions/lt')
lazyExport('eq', './functions/eq')
lazyExport('neq', './functions/neq')
lazyExport('gte', './functions/gte')
lazyExport('lte', './functions/lte')
lazyExport('cmp', './functions/cmp')
lazyExport('coerce', './functions/coerce')
lazyExport('Comparator', './classes/comparator')
lazyExport('Range', './classes/range')
lazyExport('satisfies', './functions/satisfies')
lazyExport('toComparators', './ranges/to-comparators')
lazyExport('maxSatisfying', './ranges/max-satisfying')
lazyExport('minSatisfying', './ranges/min-satisfying')
lazyExport('minVersion', './ranges/min-version')
lazyExport('validRange', './ranges/valid')
lazyExport('outside', './ranges/outside')
lazyExport('gtr', './ranges/gtr')
lazyExport('ltr', './ranges/ltr')
lazyExport('intersects', './ranges/intersects')

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038545379);
})()
//# sourceMappingURL=index.js.map