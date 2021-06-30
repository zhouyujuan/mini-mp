module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548077, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserslist = require("browserslist");

var _browserslist2 = _interopRequireDefault(_browserslist);

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _colours = require("./colours");

var _colours2 = _interopRequireDefault(_colours);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function walk(parent, callback) {
    parent.nodes.forEach((node, index) => {
        const bubble = callback(node, index, parent);

        if (node.nodes && bubble !== false) {
            walk(node, callback);
        }
    });
}

/*
 * IE 8 & 9 do not properly handle clicks on elements
 * with a `transparent` `background-color`.
 *
 * https://developer.mozilla.org/en-US/docs/Web/Events/click#Internet_Explorer
 */

function hasTransparentBug(browser) {
    return ~["ie 8", "ie 9"].indexOf(browser);
}

exports.default = _postcss2.default.plugin("postcss-colormin", () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        const isLegacy = browsers.some(hasTransparentBug);
        const colorminCache = {};
        const cache = {};

        css.walkDecls(decl => {
            if (/^(composes|font|filter|-webkit-tap-highlight-color)/i.test(decl.prop)) {
                return;
            }

            if (cache[decl.value]) {
                decl.value = cache[decl.value];

                return;
            }

            const parsed = (0, _postcssValueParser2.default)(decl.value);

            walk(parsed, (node, index, parent) => {
                if (node.type === "function") {
                    if (/^(rgb|hsl)a?$/i.test(node.value)) {
                        const { value } = node;

                        node.value = (0, _colours2.default)((0, _postcssValueParser.stringify)(node), isLegacy, colorminCache);
                        node.type = "word";

                        const next = parent.nodes[index + 1];

                        if (node.value !== value && next && (next.type === "word" || next.type === "function")) {
                            parent.nodes.splice(index + 1, 0, {
                                type: "space",
                                value: " "
                            });
                        }
                    } else if (node.value.toLowerCase() === "calc") {
                        return false;
                    }
                } else if (node.type === "word") {
                    node.value = (0, _colours2.default)(node.value, isLegacy, colorminCache);
                }
            });

            const optimizedValue = parsed.toString();

            decl.value = optimizedValue;
            cache[decl.value] = optimizedValue;
        });
    };
});
}, function(modId) {var map = {"./colours":1625038548078}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548078, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _keywords = require('./keywords.json');

var _keywords2 = _interopRequireDefault(_keywords);

var _toShorthand = require('./lib/toShorthand');

var _toShorthand2 = _interopRequireDefault(_toShorthand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shorter = (a, b) => (a && a.length < b.length ? a : b).toLowerCase();

exports.default = (colour, isLegacy = false, cache = false) => {
    const key = colour + "|" + isLegacy;

    if (cache && cache[key]) {
        return cache[key];
    }

    try {
        const parsed = (0, _color2.default)(colour.toLowerCase());
        const alpha = parsed.alpha();

        if (alpha === 1) {
            const toHex = (0, _toShorthand2.default)(parsed.hex().toLowerCase());
            const result = shorter(_keywords2.default[toHex], toHex);

            if (cache) {
                cache[key] = result;
            }

            return result;
        } else {
            const rgb = parsed.rgb();

            if (!isLegacy && !rgb.color[0] && !rgb.color[1] && !rgb.color[2] && !alpha) {
                const result = 'transparent';

                if (cache) {
                    cache[key] = result;
                }

                return result;
            }

            let hsla = parsed.hsl().string();
            let rgba = rgb.string();
            let result = hsla.length < rgba.length ? hsla : rgba;

            if (cache) {
                cache[key] = result;
            }

            return result;
        }
    } catch (e) {
        // Possibly malformed, so pass through
        const result = colour;

        if (cache) {
            cache[key] = result;
        }

        return result;
    }
};
}, function(modId) { var map = {"./keywords.json":1625038548079,"./lib/toShorthand":1625038548080}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548079, function(require, module, exports) {
module.exports = {
  "#f0ffff": "azure",
  "#f5f5dc": "beige",
  "#ffe4c4": "bisque",
  "#a52a2a": "brown",
  "#ff7f50": "coral",
  "#ffd700": "gold",
  "#808080": "grey",
  "#008000": "green",
  "#4b0082": "indigo",
  "#fffff0": "ivory",
  "#f0e68c": "khaki",
  "#faf0e6": "linen",
  "#800000": "maroon",
  "#000080": "navy",
  "#808000": "olive",
  "#ffa500": "orange",
  "#da70d6": "orchid",
  "#cd853f": "peru",
  "#ffc0cb": "pink",
  "#dda0dd": "plum",
  "#800080": "purple",
  "#f00": "red",
  "#fa8072": "salmon",
  "#a0522d": "sienna",
  "#c0c0c0": "silver",
  "#fffafa": "snow",
  "#d2b48c": "tan",
  "#008080": "teal",
  "#ff6347": "tomato",
  "#ee82ee": "violet",
  "#f5deb3": "wheat"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548080, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = hex => {
    if (hex[1] === hex[2] && hex[3] === hex[4] && hex[5] === hex[6]) {
        return '#' + hex[2] + hex[4] + hex[6];
    }

    return hex;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548077);
})()
//# sourceMappingURL=index.js.map