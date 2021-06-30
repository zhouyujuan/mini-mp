module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548188, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const regexLowerCaseUPrefix = /^u(?=\+)/;

function unicode(range) {
    const values = range.slice(2).split('-');
    if (values.length < 2) {
        return range;
    }
    const left = values[0].split('');
    const right = values[1].split('');

    if (left.length !== right.length) {
        return range;
    }

    let questionCounter = 0;

    const merged = left.reduce((group, value, index) => {
        if (group === false) {
            return false;
        }
        if (value === right[index] && !questionCounter) {
            return group + value;
        }
        if (value === '0' && right[index] === 'f') {
            questionCounter++;
            return group + '?';
        }
        return false;
    }, 'u+');

    /*
     * The maximum number of wildcard characters (?) for ranges is 5.
     */

    if (merged && questionCounter < 6) {
        return merged;
    }

    return range;
}

/*
 * IE and Edge before 16 version ignore the unicode-range if the 'U' is lowercase
 *
 * https://caniuse.com/#search=unicode-range
 */

function hasLowerCaseUPrefixBug(browser) {
    return ~(0, _browserslist2.default)('ie <=11, edge <= 15').indexOf(browser);
}

function transform(legacy = false, node) {
    node.value = (0, _postcssValueParser2.default)(node.value).walk(child => {
        if (child.type === 'word') {
            const transformed = unicode(child.value.toLowerCase());
            child.value = legacy ? transformed.replace(regexLowerCaseUPrefix, 'U') : transformed;
        }
        return false;
    }).toString();
}

exports.default = _postcss2.default.plugin('postcss-normalize-unicode', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        css.walkDecls(/^unicode-range$/i, transform.bind(null, browsers.some(hasLowerCaseUPrefixBug)));
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548188);
})()
//# sourceMappingURL=index.js.map