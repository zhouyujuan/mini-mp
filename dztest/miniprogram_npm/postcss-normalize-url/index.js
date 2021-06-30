module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548189, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _normalizeUrl = require('normalize-url');

var _normalizeUrl2 = _interopRequireDefault(_normalizeUrl);

var _isAbsoluteUrl = require('is-absolute-url');

var _isAbsoluteUrl2 = _interopRequireDefault(_isAbsoluteUrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const multiline = /\\[\r\n]/;
const escapeChars = /([\s\(\)"'])/g;

function convert(url, options) {
    if ((0, _isAbsoluteUrl2.default)(url) || url.startsWith('//')) {
        let normalizedURL = null;

        try {
            normalizedURL = (0, _normalizeUrl2.default)(url, options);
        } catch (e) {
            normalizedURL = url;
        }

        return normalizedURL;
    }

    // `path.normalize` always returns backslashes on Windows, need replace in `/`
    return _path2.default.normalize(url).replace(new RegExp('\\' + _path2.default.sep, 'g'), '/');
}

function transformNamespace(rule) {
    rule.params = (0, _postcssValueParser2.default)(rule.params).walk(node => {
        if (node.type === 'function' && node.value.toLowerCase() === 'url' && node.nodes.length) {
            node.type = 'string';
            node.quote = node.nodes[0].quote || '"';
            node.value = node.nodes[0].value;
        }
        if (node.type === 'string') {
            node.value = node.value.trim();
        }
        return false;
    }).toString();
}

function transformDecl(decl, opts) {
    decl.value = (0, _postcssValueParser2.default)(decl.value).walk(node => {
        if (node.type !== 'function' || node.value.toLowerCase() !== 'url' || !node.nodes.length) {
            return false;
        }

        let url = node.nodes[0];
        let escaped;

        node.before = node.after = '';
        url.value = url.value.trim().replace(multiline, '');

        // Skip empty URLs
        // Empty URL function equals request to current stylesheet where it is declared
        if (url.value.length === 0) {
            url.quote = '';

            return false;
        }

        if (/^data:(.*)?,/i.test(url.value)) {
            return false;
        }

        if (!/^.+-extension:\//i.test(url.value)) {
            url.value = convert(url.value, opts);
        }

        if (escapeChars.test(url.value) && url.type === 'string') {
            escaped = url.value.replace(escapeChars, '\\$1');
            if (escaped.length < url.value.length + 2) {
                url.value = escaped;
                url.type = 'word';
            }
        } else {
            url.type = 'word';
        }

        return false;
    }).toString();
}

exports.default = _postcss2.default.plugin('postcss-normalize-url', opts => {
    opts = Object.assign({}, {
        normalizeProtocol: false,
        stripFragment: false,
        stripWWW: false
    }, opts);

    return css => {
        css.walk(node => {
            if (node.type === 'decl') {
                return transformDecl(node, opts);
            } else if (node.type === 'atrule' && node.name.toLowerCase() === 'namespace') {
                return transformNamespace(node);
            }
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548189);
})()
//# sourceMappingURL=index.js.map