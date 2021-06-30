module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548148, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _isColorStop = require('is-color-stop');

var _isColorStop2 = _interopRequireDefault(_isColorStop);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const angles = {
    top: '0deg',
    right: '90deg',
    bottom: '180deg',
    left: '270deg'
};

function isLessThan(a, b) {
    return a.unit.toLowerCase() === b.unit.toLowerCase() && parseFloat(a.number) >= parseFloat(b.number);
}

function optimise(decl) {
    const value = decl.value;

    if (!~value.toLowerCase().indexOf('gradient')) {
        return;
    }

    decl.value = (0, _postcssValueParser2.default)(value).walk(node => {
        if (node.type !== 'function' || !node.nodes.length) {
            return false;
        }

        const lowerCasedValue = node.value.toLowerCase();

        if (lowerCasedValue === 'linear-gradient' || lowerCasedValue === 'repeating-linear-gradient' || lowerCasedValue === '-webkit-linear-gradient' || lowerCasedValue === '-webkit-repeating-linear-gradient') {
            let args = (0, _cssnanoUtilGetArguments2.default)(node);

            if (node.nodes[0].value.toLowerCase() === 'to' && args[0].length === 3) {
                node.nodes = node.nodes.slice(2);
                node.nodes[0].value = angles[node.nodes[0].value.toLowerCase()];
            }

            let lastStop = null;

            args.forEach((arg, index) => {
                if (!arg[2]) {
                    return;
                }

                let isFinalStop = index === args.length - 1;
                let thisStop = (0, _postcssValueParser.unit)(arg[2].value);

                if (lastStop === null) {
                    lastStop = thisStop;

                    if (!isFinalStop && lastStop && lastStop.number === '0' && lastStop.unit.toLowerCase() !== 'deg') {
                        arg[1].value = arg[2].value = '';
                    }

                    return;
                }

                if (lastStop && thisStop && isLessThan(lastStop, thisStop)) {
                    arg[2].value = 0;
                }

                lastStop = thisStop;

                if (isFinalStop && arg[2].value === '100%') {
                    arg[1].value = arg[2].value = '';
                }
            });

            return false;
        }

        if (lowerCasedValue === 'radial-gradient' || lowerCasedValue === 'repeating-radial-gradient') {
            let args = (0, _cssnanoUtilGetArguments2.default)(node);
            let lastStop;

            const hasAt = args[0].find(n => n.value.toLowerCase() === 'at');

            args.forEach((arg, index) => {
                if (!arg[2] || !index && hasAt) {
                    return;
                }

                let thisStop = (0, _postcssValueParser.unit)(arg[2].value);

                if (!lastStop) {
                    lastStop = thisStop;

                    return;
                }

                if (lastStop && thisStop && isLessThan(lastStop, thisStop)) {
                    arg[2].value = 0;
                }

                lastStop = thisStop;
            });

            return false;
        }

        if (lowerCasedValue === '-webkit-radial-gradient' || lowerCasedValue === '-webkit-repeating-radial-gradient') {
            let args = (0, _cssnanoUtilGetArguments2.default)(node);
            let lastStop;

            args.forEach(arg => {
                let color;
                let stop;

                if (arg[2] !== undefined) {
                    if (arg[0].type === 'function') {
                        color = `${arg[0].value}(${(0, _postcssValueParser.stringify)(arg[0].nodes)})`;
                    } else {
                        color = arg[0].value;
                    }

                    if (arg[2].type === 'function') {
                        stop = `${arg[2].value}(${(0, _postcssValueParser.stringify)(arg[2].nodes)})`;
                    } else {
                        stop = arg[2].value;
                    }
                } else {
                    if (arg[0].type === 'function') {
                        color = `${arg[0].value}(${(0, _postcssValueParser.stringify)(arg[0].nodes)})`;
                    }

                    color = arg[0].value;
                }

                color = color.toLowerCase();

                const colorStop = stop || stop === 0 ? (0, _isColorStop2.default)(color, stop.toLowerCase()) : (0, _isColorStop2.default)(color);

                if (!colorStop || !arg[2]) {
                    return;
                }

                let thisStop = (0, _postcssValueParser.unit)(arg[2].value);

                if (!lastStop) {
                    lastStop = thisStop;

                    return;
                }

                if (lastStop && thisStop && isLessThan(lastStop, thisStop)) {
                    arg[2].value = 0;
                }

                lastStop = thisStop;
            });

            return false;
        }
    }).toString();
}

exports.default = _postcss2.default.plugin('postcss-minify-gradients', () => {
    return css => css.walkDecls(optimise);
});
module.exports = exports['default'];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548148);
})()
//# sourceMappingURL=index.js.map