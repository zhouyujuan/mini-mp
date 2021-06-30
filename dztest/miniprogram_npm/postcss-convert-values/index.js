module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548081, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _convert = require('./lib/convert');

var _convert2 = _interopRequireDefault(_convert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LENGTH_UNITS = ['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'q', 'in', 'pt', 'pc', 'px'];

function parseWord(node, opts, keepZeroUnit) {
    const pair = (0, _postcssValueParser.unit)(node.value);
    if (pair) {
        const num = Number(pair.number);
        const u = pair.unit;
        if (num === 0) {
            node.value = keepZeroUnit || !~LENGTH_UNITS.indexOf(u.toLowerCase()) && u !== '%' ? 0 + u : 0;
        } else {
            node.value = (0, _convert2.default)(num, u, opts);

            if (typeof opts.precision === 'number' && u.toLowerCase() === 'px' && ~pair.number.indexOf('.')) {
                const precision = Math.pow(10, opts.precision);
                node.value = Math.round(parseFloat(node.value) * precision) / precision + u;
            }
        }
    }
}

function clampOpacity(node) {
    const pair = (0, _postcssValueParser.unit)(node.value);
    if (!pair) {
        return;
    }
    let num = Number(pair.number);
    if (num > 1) {
        node.value = 1 + pair.unit;
    } else if (num < 0) {
        node.value = 0 + pair.unit;
    }
}

function shouldStripPercent(decl) {
    const { parent } = decl;
    const lowerCasedProp = decl.prop.toLowerCase();
    return ~decl.value.indexOf('%') && (lowerCasedProp === 'max-height' || lowerCasedProp === 'height') || parent.parent && parent.parent.name && parent.parent.name.toLowerCase() === 'keyframes' && lowerCasedProp === 'stroke-dasharray' || lowerCasedProp === 'stroke-dashoffset' || lowerCasedProp === 'stroke-width';
}

function transform(opts, decl) {
    const lowerCasedProp = decl.prop.toLowerCase();
    if (~lowerCasedProp.indexOf('flex') || lowerCasedProp.indexOf('--') === 0) {
        return;
    }

    decl.value = (0, _postcssValueParser2.default)(decl.value).walk(node => {
        const lowerCasedValue = node.value.toLowerCase();

        if (node.type === 'word') {
            parseWord(node, opts, shouldStripPercent(decl));
            if (lowerCasedProp === 'opacity' || lowerCasedProp === 'shape-image-threshold') {
                clampOpacity(node);
            }
        } else if (node.type === 'function') {
            if (lowerCasedValue === 'calc' || lowerCasedValue === 'hsl' || lowerCasedValue === 'hsla') {
                (0, _postcssValueParser.walk)(node.nodes, n => {
                    if (n.type === 'word') {
                        parseWord(n, opts, true);
                    }
                });
                return false;
            }
            if (lowerCasedValue === 'url') {
                return false;
            }
        }
    }).toString();
}

const plugin = 'postcss-convert-values';

exports.default = _postcss2.default.plugin(plugin, (opts = { precision: false }) => {
    return css => css.walkDecls(transform.bind(null, opts));
});
module.exports = exports['default'];
}, function(modId) {var map = {"./lib/convert":1625038548082}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548082, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (number, unit, { time, length, angle }) {
    let value = dropLeadingZero(number) + (unit ? unit : '');
    let converted;

    if (length !== false && unit.toLowerCase() in lengthConv) {
        converted = transform(number, unit, lengthConv);
    }

    if (time !== false && unit.toLowerCase() in timeConv) {
        converted = transform(number, unit, timeConv);
    }

    if (angle !== false && unit.toLowerCase() in angleConv) {
        converted = transform(number, unit, angleConv);
    }

    if (converted && converted.length < value.length) {
        value = converted;
    }

    return value;
};

const lengthConv = {
    in: 96,
    px: 1,
    pt: 4 / 3,
    pc: 16
};

const timeConv = {
    s: 1000,
    ms: 1
};

const angleConv = {
    turn: 360,
    deg: 1
};

function dropLeadingZero(number) {
    const value = String(number);

    if (number % 1) {
        if (value[0] === '0') {
            return value.slice(1);
        }

        if (value[0] === '-' && value[1] === '0') {
            return '-' + value.slice(2);
        }
    }

    return value;
}

function transform(number, unit, conversion) {
    const lowerCasedUnit = unit.toLowerCase();
    let one, base;
    let convertionUnits = Object.keys(conversion).filter(u => {
        if (conversion[u] === 1) {
            one = u;
        }
        return lowerCasedUnit !== u;
    });

    if (lowerCasedUnit === one) {
        base = number / conversion[lowerCasedUnit];
    } else {
        base = number * conversion[lowerCasedUnit];
    }

    return convertionUnits.map(u => dropLeadingZero(base / conversion[u]) + u).reduce((a, b) => a.length < b.length ? a : b);
}

module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548081);
})()
//# sourceMappingURL=index.js.map