module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548190, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _postcssValueParser = require("postcss-value-parser");

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const atrule = "atrule";
const decl = "decl";
const rule = "rule";

function reduceCalcWhitespaces(node) {
    if (node.type === "space") {
        node.value = " ";
    } else if (node.type === "function") {
        node.before = node.after = "";
    }
}

function reduceWhitespaces(node) {
    if (node.type === "space") {
        node.value = " ";
    } else if (node.type === "div") {
        node.before = node.after = "";
    } else if (node.type === "function") {
        node.before = node.after = "";

        if (node.value.toLowerCase() === "calc") {
            _postcssValueParser2.default.walk(node.nodes, reduceCalcWhitespaces);
            return false;
        }
    }
}

exports.default = (0, _postcss.plugin)("postcss-normalize-whitespace", () => {
    return css => {
        const cache = {};

        css.walk(node => {
            const { type } = node;

            if (~[decl, rule, atrule].indexOf(type) && node.raws.before) {
                node.raws.before = node.raws.before.replace(/\s/g, "");
            }

            if (type === decl) {
                // Ensure that !important values do not have any excess whitespace
                if (node.important) {
                    node.raws.important = "!important";
                }

                // Remove whitespaces around ie 9 hack
                node.value = node.value.replace(/\s*(\\9)\s*/, "$1");

                const value = node.value;

                if (cache[value]) {
                    node.value = cache[value];
                } else {
                    const parsed = (0, _postcssValueParser2.default)(node.value);
                    const result = parsed.walk(reduceWhitespaces).toString();

                    // Trim whitespace inside functions & dividers
                    node.value = result;
                    cache[value] = result;
                }

                // Remove extra semicolons and whitespace before the declaration
                if (node.raws.before) {
                    const prev = node.prev();

                    if (prev && prev.type !== rule) {
                        node.raws.before = node.raws.before.replace(/;/g, "");
                    }
                }

                node.raws.between = ":";
                node.raws.semicolon = false;
            } else if (type === rule || type === atrule) {
                node.raws.between = node.raws.after = "";
                node.raws.semicolon = false;
            }
        });

        // Remove final newline
        css.raws.after = "";
    };
});
module.exports = exports["default"];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548190);
})()
//# sourceMappingURL=index.js.map