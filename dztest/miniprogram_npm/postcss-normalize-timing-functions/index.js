module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548186, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetMatch = require('cssnano-util-get-match');

var _cssnanoUtilGetMatch2 = _interopRequireDefault(_cssnanoUtilGetMatch);

var _map = require('./lib/map');

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMatch = (0, _cssnanoUtilGetMatch2.default)(_map2.default);
const getValue = node => parseFloat(node.value);

function evenValues(list, index) {
    return index % 2 === 0;
}

function reduce(node) {
    if (node.type !== 'function') {
        return false;
    }

    const lowerCasedValue = node.value.toLowerCase();

    if (lowerCasedValue === 'steps') {
        // Don't bother checking the step-end case as it has the same length
        // as steps(1)
        if (getValue(node.nodes[0]) === 1 && node.nodes[2] && node.nodes[2].value.toLowerCase() === 'start') {
            node.type = 'word';
            node.value = 'step-start';

            delete node.nodes;

            return;
        }

        // The end case is actually the browser default, so it isn't required.
        if (node.nodes[2] && node.nodes[2].value.toLowerCase() === 'end') {
            node.nodes = [node.nodes[0]];

            return;
        }

        return false;
    }

    if (lowerCasedValue === 'cubic-bezier') {
        const match = getMatch(node.nodes.filter(evenValues).map(getValue));

        if (match) {
            node.type = 'word';
            node.value = match;

            delete node.nodes;

            return;
        }
    }
}

exports.default = (0, _postcss.plugin)('postcss-normalize-timing-functions', () => {
    return css => {
        const cache = {};

        css.walkDecls(/(animation|transition)(-timing-function|$)/i, decl => {
            const value = decl.value;

            if (cache[value]) {
                decl.value = cache[value];

                return;
            }

            const result = (0, _postcssValueParser2.default)(value).walk(reduce).toString();

            decl.value = result;
            cache[value] = result;
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {"./lib/map":1625038548187}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548187, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = [['ease', [0.25, 0.1, 0.25, 1]], ['linear', [0, 0, 1, 1]], ['ease-in', [0.42, 0, 1, 1]], ['ease-out', [0, 0, 0.58, 1]], ['ease-in-out', [0.42, 0, 0.58, 1]]];
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548186);
})()
//# sourceMappingURL=index.js.map