module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548180, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetMatch = require("cssnano-util-get-match");

var _cssnanoUtilGetMatch2 = _interopRequireDefault(_cssnanoUtilGetMatch);

var _map = require("./lib/map");

var _map2 = _interopRequireDefault(_map);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getMatch = (0, _cssnanoUtilGetMatch2.default)(_map2.default);

function evenValues(list, index) {
    return index % 2 === 0;
}

exports.default = _postcss2.default.plugin("postcss-normalize-display-values", () => {
    return css => {
        const cache = {};

        css.walkDecls(/display/i, decl => {
            const value = decl.value;

            if (cache[value]) {
                decl.value = cache[value];

                return;
            }

            const { nodes } = (0, _postcssValueParser2.default)(value);

            if (nodes.length === 1) {
                cache[value] = value;

                return;
            }

            const match = getMatch(nodes.filter(evenValues).map(n => n.value.toLowerCase()));

            if (!match) {
                cache[value] = value;

                return;
            }

            const result = match;

            decl.value = result;
            cache[value] = result;
        });
    };
});
module.exports = exports["default"];
}, function(modId) {var map = {"./lib/map":1625038548181}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548181, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
const block = 'block';
const flex = 'flex';
const flow = 'flow';
const flowRoot = 'flow-root';
const grid = 'grid';
const inline = 'inline';
const inlineBlock = 'inline-block';
const inlineFlex = 'inline-flex';
const inlineGrid = 'inline-grid';
const inlineTable = 'inline-table';
const listItem = 'list-item';
const ruby = 'ruby';
const rubyBase = 'ruby-base';
const rubyText = 'ruby-text';
const runIn = 'run-in';
const table = 'table';
const tableCell = 'table-cell';
const tableCaption = 'table-caption';

/**
 * Specification: https://drafts.csswg.org/css-display/#the-display-properties
 */

exports.default = [[block, [block, flow]], [flowRoot, [block, flowRoot]], [inline, [inline, flow]], [inlineBlock, [inline, flowRoot]], [runIn, [runIn, flow]], [listItem, [listItem, block, flow]], [inline + ' ' + listItem, [inline, flow, listItem]], [flex, [block, flex]], [inlineFlex, [inline, flex]], [grid, [block, grid]], [inlineGrid, [inline, grid]], [ruby, [inline, ruby]],
// `block ruby` is same
[table, [block, table]], [inlineTable, [inline, table]], [tableCell, [tableCell, flow]], [tableCaption, [tableCaption, flow]], [rubyBase, [rubyBase, flow]], [rubyText, [rubyText, flow]]];
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548180);
})()
//# sourceMappingURL=index.js.map