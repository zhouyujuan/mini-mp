module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548233, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _svgo = require('svgo');

var _svgo2 = _interopRequireDefault(_svgo);

var _url = require('./lib/url');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const PLUGIN = 'postcss-svgo';
const dataURI = /data:image\/svg\+xml(;((charset=)?utf-8|base64))?,/i;
const dataURIBase64 = /data:image\/svg\+xml;base64,/i;

function minifyPromise(decl, getSvgo, opts, postcssResult) {
    const promises = [];
    const parsed = (0, _postcssValueParser2.default)(decl.value);

    decl.value = parsed.walk(node => {
        if (node.type !== 'function' || node.value.toLowerCase() !== 'url' || !node.nodes.length) {
            return;
        }

        let { value, quote } = node.nodes[0];
        let isBase64, isUriEncoded;
        let svg = value.replace(dataURI, '');

        if (dataURIBase64.test(value)) {
            svg = Buffer.from(svg, 'base64').toString('utf8');
            isBase64 = true;
        } else {
            let decodedUri;

            try {
                decodedUri = (0, _url.decode)(svg);
                isUriEncoded = decodedUri !== svg;
            } catch (e) {
                // Swallow exception if we cannot decode the value
                isUriEncoded = false;
            }

            if (isUriEncoded) {
                svg = decodedUri;
            }

            if (opts.encode !== undefined) {
                isUriEncoded = opts.encode;
            }
        }

        promises.push(getSvgo().optimize(svg).then(result => {
            if (result.error) {
                decl.warn(postcssResult, `${result.error}`);
                return;
            }
            let data, optimizedValue;

            if (isBase64) {
                data = Buffer.from(result.data).toString('base64');
                optimizedValue = 'data:image/svg+xml;base64,' + data;
            } else {
                data = isUriEncoded ? (0, _url.encode)(result.data) : result.data;
                // Should always encode # otherwise we yield a broken SVG
                // in Firefox (works in Chrome however). See this issue:
                // https://github.com/cssnano/cssnano/issues/245
                data = data.replace(/#/g, '%23');
                optimizedValue = 'data:image/svg+xml;charset=utf-8,' + data;
                quote = isUriEncoded ? '"' : '\'';
            }

            node.nodes[0] = Object.assign({}, node.nodes[0], {
                value: optimizedValue,
                quote: quote,
                type: 'string',
                before: '',
                after: ''
            });
        }).catch(error => {
            decl.warn(postcssResult, `${error}`);
        }));

        return false;
    });

    return Promise.all(promises).then(() => decl.value = decl.value.toString());
}

exports.default = _postcss2.default.plugin(PLUGIN, (opts = {}) => {
    let svgo = null;

    const getSvgo = () => {
        if (!svgo) {
            svgo = new _svgo2.default(opts);
        }

        return svgo;
    };

    return (css, result) => {
        return new Promise((resolve, reject) => {
            const svgoQueue = [];

            css.walkDecls(decl => {
                if (!dataURI.test(decl.value)) {
                    return;
                }

                svgoQueue.push(minifyPromise(decl, getSvgo, opts, result));
            });

            return Promise.all(svgoQueue).then(resolve, reject);
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {"./lib/url":1625038548234}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548234, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.encode = encode;
function encode(data) {
    return data.replace(/"/g, '\'').replace(/%/g, '%25').replace(/</g, '%3C').replace(/>/g, '%3E').replace(/&/g, '%26').replace(/#/g, '%23').replace(/\s+/g, ' ');
};

const decode = exports.decode = decodeURIComponent;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548233);
})()
//# sourceMappingURL=index.js.map