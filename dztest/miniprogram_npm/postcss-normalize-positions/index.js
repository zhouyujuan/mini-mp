module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548182, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const directions = ['top', 'right', 'bottom', 'left', 'center'];

const center = '50%';

const horizontal = {
    right: '100%',
    left: '0'
};

const vertical = {
    bottom: '100%',
    top: '0'
};

function transform(value) {
    const parsed = (0, _postcssValueParser2.default)(value);
    const args = (0, _cssnanoUtilGetArguments2.default)(parsed);
    const relevant = [];

    args.forEach(arg => {
        relevant.push({
            start: null,
            end: null
        });

        arg.forEach((part, index) => {
            const isPosition = ~directions.indexOf(part.value.toLowerCase()) || (0, _postcssValueParser.unit)(part.value);
            const len = relevant.length - 1;

            if (relevant[len].start === null && isPosition) {
                relevant[len].start = index;
                relevant[len].end = index;

                return;
            }

            if (relevant[len].start !== null) {
                if (part.type === 'space') {
                    return;
                } else if (isPosition) {
                    relevant[len].end = index;

                    return;
                }

                return;
            }
        });
    });

    relevant.forEach((range, index) => {
        if (range.start === null) {
            return;
        }

        const position = args[index].slice(range.start, range.end + 1);

        if (position.length > 3) {
            return;
        }

        const firstValue = position[0].value.toLowerCase();
        const secondValue = position[2] && position[2].value ? position[2].value.toLowerCase() : null;

        if (position.length === 1 || secondValue === 'center') {
            if (secondValue) {
                position[2].value = position[1].value = '';
            }

            const map = Object.assign({}, horizontal, {
                center
            });

            if ((0, _has2.default)(map, firstValue)) {
                position[0].value = map[firstValue];
            }

            return;
        }

        if (firstValue === 'center' && ~directions.indexOf(secondValue)) {
            position[0].value = position[1].value = '';

            if ((0, _has2.default)(horizontal, secondValue)) {
                position[2].value = horizontal[secondValue];
            }

            return;
        }

        if ((0, _has2.default)(horizontal, firstValue) && (0, _has2.default)(vertical, secondValue)) {
            position[0].value = horizontal[firstValue];
            position[2].value = vertical[secondValue];

            return;
        } else if ((0, _has2.default)(vertical, firstValue) && (0, _has2.default)(horizontal, secondValue)) {
            position[0].value = horizontal[secondValue];
            position[2].value = vertical[firstValue];

            return;
        }
    });

    return parsed.toString();
}

exports.default = (0, _postcss.plugin)('postcss-normalize-positions', () => {
    return css => {
        const cache = {};

        css.walkDecls(/^(background(-position)?|(-webkit-)?perspective-origin)$/i, decl => {
            const value = decl.value;

            if (cache[value]) {
                decl.value = cache[value];

                return;
            }

            const result = transform(value);

            decl.value = result;
            cache[value] = result;
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548182);
})()
//# sourceMappingURL=index.js.map