module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548179, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let charset = 'charset';

exports.default = _postcss2.default.plugin('postcss-normalize-' + charset, (opts = {}) => {
    return css => {
        let charsetRule;
        let nonAsciiNode;
        let nonAscii = /[^\x00-\x7F]/;

        css.walk(node => {
            if (node.type === 'atrule' && node.name === charset) {
                if (!charsetRule) {
                    charsetRule = node;
                }
                node.remove();
            } else if (!nonAsciiNode && node.parent === css && nonAscii.test(node)) {
                nonAsciiNode = node;
            }
        });

        if (nonAsciiNode) {
            if (!charsetRule && opts.add !== false) {
                charsetRule = _postcss2.default.atRule({
                    name: charset,
                    params: '"utf-8"'
                });
            }
            if (charsetRule) {
                charsetRule.source = nonAsciiNode.source;
                css.prepend(charsetRule);
            }
        }
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548179);
})()
//# sourceMappingURL=index.js.map