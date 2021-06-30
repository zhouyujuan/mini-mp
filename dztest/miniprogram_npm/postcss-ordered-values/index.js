module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548191, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _animation = require('./rules/animation');

var _animation2 = _interopRequireDefault(_animation);

var _border = require('./rules/border');

var _border2 = _interopRequireDefault(_border);

var _boxShadow = require('./rules/boxShadow');

var _boxShadow2 = _interopRequireDefault(_boxShadow);

var _flexFlow = require('./rules/flexFlow');

var _flexFlow2 = _interopRequireDefault(_flexFlow);

var _transition = require('./rules/transition');

var _transition2 = _interopRequireDefault(_transition);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable quote-props */

const rules = {
    'animation': _animation2.default,
    '-webkit-animation': _animation2.default,
    'border': _border2.default,
    'border-top': _border2.default,
    'border-right': _border2.default,
    'border-bottom': _border2.default,
    'border-left': _border2.default,
    'outline': _border2.default,
    'box-shadow': _boxShadow2.default,
    'flex-flow': _flexFlow2.default,
    'transition': _transition2.default,
    '-webkit-transition': _transition2.default
};

/* eslint-enable */

// rules
function shouldAbort(parsed) {
    let abort = false;

    parsed.walk(({ type, value }) => {
        if (type === 'comment' || type === 'function' && value.toLowerCase() === 'var' || type === 'word' && ~value.indexOf(`___CSS_LOADER_IMPORT___`)) {
            abort = true;

            return false;
        }
    });

    return abort;
}

function getValue(decl) {
    let { value, raws } = decl;

    if (raws && raws.value && raws.value.raw) {
        value = raws.value.raw;
    }

    return value;
}

exports.default = _postcss2.default.plugin('postcss-ordered-values', () => {
    return css => {
        const cache = {};

        css.walkDecls(decl => {
            const lowerCasedProp = decl.prop.toLowerCase();
            const processor = rules[lowerCasedProp];

            if (!processor) {
                return;
            }

            const value = getValue(decl);

            if (cache[value]) {
                decl.value = cache[value];

                return;
            }

            const parsed = (0, _postcssValueParser2.default)(value);

            if (parsed.nodes.length < 2 || shouldAbort(parsed)) {
                cache[value] = value;

                return;
            }

            const result = processor(parsed);

            decl.value = result;
            cache[value] = result;
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {"./rules/animation":1625038548192,"./rules/border":1625038548195,"./rules/boxShadow":1625038548196,"./rules/flexFlow":1625038548197,"./rules/transition":1625038548198}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548192, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeAnimation;

var _postcssValueParser = require('postcss-value-parser');

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _addSpace = require('../lib/addSpace');

var _addSpace2 = _interopRequireDefault(_addSpace);

var _getValue = require('../lib/getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// animation: [ none | <keyframes-name> ] || <time> || <single-timing-function> || <time> || <single-animation-iteration-count> || <single-animation-direction> || <single-animation-fill-mode> || <single-animation-play-state>

const isTimingFunction = (value, type) => {
    const functions = ['steps', 'cubic-bezier', 'frames'];
    const keywords = ['ease', 'ease-in', 'ease-in-out', 'ease-out', 'linear', 'step-end', 'step-start'];

    return type === 'function' && functions.includes(value) || keywords.includes(value);
};

const isDirection = value => {
    return ['normal', 'reverse', 'alternate', 'alternate-reverse'].includes(value);
};

const isFillMode = value => {
    return ['none', 'forwards', 'backwards', 'both'].includes(value);
};

const isPlayState = value => {
    return ['running', 'paused'].includes(value);
};

const isTime = value => {
    const quantity = (0, _postcssValueParser.unit)(value);

    return quantity && ['ms', 's'].includes(quantity.unit);
};

const isIterationCount = value => {
    const quantity = (0, _postcssValueParser.unit)(value);

    return value === 'infinite' || quantity && !quantity.unit;
};

function normalizeAnimation(parsed) {
    const args = (0, _cssnanoUtilGetArguments2.default)(parsed);

    const values = args.reduce((list, arg) => {
        const state = {
            name: [],
            duration: [],
            timingFunction: [],
            delay: [],
            iterationCount: [],
            direction: [],
            fillMode: [],
            playState: []
        };
        const stateConditions = [{ property: 'duration', delegate: isTime }, { property: 'timingFunction', delegate: isTimingFunction }, { property: 'delay', delegate: isTime }, { property: 'iterationCount', delegate: isIterationCount }, { property: 'direction', delegate: isDirection }, { property: 'fillMode', delegate: isFillMode }, { property: 'playState', delegate: isPlayState }];

        arg.forEach(node => {
            let { type, value } = node;

            if (type === 'space') {
                return;
            }

            value = value.toLowerCase();

            const hasMatch = stateConditions.some(({ property, delegate }) => {
                if (delegate(value, type) && !state[property].length) {
                    state[property] = [node, (0, _addSpace2.default)()];
                    return true;
                }
            });

            if (!hasMatch) {
                state.name = [...state.name, node, (0, _addSpace2.default)()];
            }
        });
        return [...list, [...state.name, ...state.duration, ...state.timingFunction, ...state.delay, ...state.iterationCount, ...state.direction, ...state.fillMode, ...state.playState]];
    }, []);

    return (0, _getValue2.default)(values);
};
module.exports = exports['default'];
}, function(modId) { var map = {"../lib/addSpace":1625038548193,"../lib/getValue":1625038548194}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548193, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = addSpace;
function addSpace() {
    return { type: 'space', value: ' ' };
}
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548194, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getValue;

var _postcssValueParser = require('postcss-value-parser');

function getValue(values) {
    return (0, _postcssValueParser.stringify)({
        nodes: values.reduce((nodes, arg, index) => {
            arg.forEach((val, idx) => {
                if (idx === arg.length - 1 && index === values.length - 1 && val.type === 'space') {
                    return;
                }
                nodes.push(val);
            });

            if (index !== values.length - 1) {
                nodes[nodes.length - 1].type = 'div';
                nodes[nodes.length - 1].value = ',';
            }

            return nodes;
        }, [])
    });
}
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548195, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeBorder;

var _postcssValueParser = require('postcss-value-parser');

// border: <line-width> || <line-style> || <color>
// outline: <outline-color> || <outline-style> || <outline-width>

const borderWidths = ['thin', 'medium', 'thick'];

const borderStyles = ['none', 'auto', // only in outline-style
'hidden', 'dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'];

function normalizeBorder(border) {
    const order = { width: '', style: '', color: '' };

    border.walk(node => {
        const { type, value } = node;
        if (type === 'word') {
            if (~borderStyles.indexOf(value.toLowerCase())) {
                order.style = value;
                return false;
            }
            if (~borderWidths.indexOf(value.toLowerCase()) || (0, _postcssValueParser.unit)(value.toLowerCase())) {
                if (order.width !== '') {
                    order.width = `${order.width} ${value}`;
                    return false;
                }
                order.width = value;
                return false;
            }
            order.color = value;
            return false;
        }
        if (type === 'function') {
            if (value.toLowerCase() === 'calc') {
                order.width = (0, _postcssValueParser.stringify)(node);
            } else {
                order.color = (0, _postcssValueParser.stringify)(node);
            }
            return false;
        }
    });

    return `${order.width} ${order.style} ${order.color}`.trim();
};
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548196, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeBoxShadow;

var _postcssValueParser = require('postcss-value-parser');

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _addSpace = require('../lib/addSpace');

var _addSpace2 = _interopRequireDefault(_addSpace);

var _getValue = require('../lib/getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// box-shadow: inset? && <length>{2,4} && <color>?

function normalizeBoxShadow(parsed) {
    let args = (0, _cssnanoUtilGetArguments2.default)(parsed);
    let abort = false;

    let values = args.reduce((list, arg) => {
        let val = [];
        let state = {
            inset: [],
            color: []
        };

        arg.forEach(node => {
            const { type, value } = node;

            if (type === 'function' && ~value.toLowerCase().indexOf('calc')) {
                abort = true;
                return;
            }

            if (type === 'space') {
                return;
            }

            if ((0, _postcssValueParser.unit)(value)) {
                val = [...val, node, (0, _addSpace2.default)()];
            } else if (value.toLowerCase() === 'inset') {
                state.inset = [...state.inset, node, (0, _addSpace2.default)()];
            } else {
                state.color = [...state.color, node, (0, _addSpace2.default)()];
            }
        });

        return [...list, [...state.inset, ...val, ...state.color]];
    }, []);

    if (abort) {
        return parsed.toString();
    }

    return (0, _getValue2.default)(values);
}
module.exports = exports['default'];
}, function(modId) { var map = {"../lib/addSpace":1625038548193,"../lib/getValue":1625038548194}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548197, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeFlexFlow;
// flex-flow: <flex-direction> || <flex-wrap>

const flexDirection = ['row', 'row-reverse', 'column', 'column-reverse'];

const flexWrap = ['nowrap', 'wrap', 'wrap-reverse'];

function normalizeFlexFlow(flexFlow) {
    let order = {
        direction: '',
        wrap: ''
    };

    flexFlow.walk(({ value }) => {
        if (~flexDirection.indexOf(value.toLowerCase())) {
            order.direction = value;
            return;
        }

        if (~flexWrap.indexOf(value.toLowerCase())) {
            order.wrap = value;

            return;
        }
    });

    return `${order.direction} ${order.wrap}`.trim();
};
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548198, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = normalizeTransition;

var _postcssValueParser = require('postcss-value-parser');

var _cssnanoUtilGetArguments = require('cssnano-util-get-arguments');

var _cssnanoUtilGetArguments2 = _interopRequireDefault(_cssnanoUtilGetArguments);

var _addSpace = require('../lib/addSpace');

var _addSpace2 = _interopRequireDefault(_addSpace);

var _getValue = require('../lib/getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// transition: [ none | <single-transition-property> ] || <time> || <single-transition-timing-function> || <time>

const timingFunctions = ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out', 'step-start', 'step-end'];

function normalizeTransition(parsed) {
    let args = (0, _cssnanoUtilGetArguments2.default)(parsed);

    let values = args.reduce((list, arg) => {
        let state = {
            timingFunction: [],
            property: [],
            time1: [],
            time2: []
        };

        arg.forEach(node => {
            const { type, value } = node;

            if (type === 'space') {
                return;
            }

            if (type === 'function' && ~['steps', 'cubic-bezier'].indexOf(value.toLowerCase())) {
                state.timingFunction = [...state.timingFunction, node, (0, _addSpace2.default)()];
            } else if ((0, _postcssValueParser.unit)(value)) {
                if (!state.time1.length) {
                    state.time1 = [...state.time1, node, (0, _addSpace2.default)()];
                } else {
                    state.time2 = [...state.time2, node, (0, _addSpace2.default)()];
                }
            } else if (~timingFunctions.indexOf(value.toLowerCase())) {
                state.timingFunction = [...state.timingFunction, node, (0, _addSpace2.default)()];
            } else {
                state.property = [...state.property, node, (0, _addSpace2.default)()];
            }
        });

        return [...list, [...state.property, ...state.time1, ...state.timingFunction, ...state.time2]];
    }, []);

    return (0, _getValue2.default)(values);
}
module.exports = exports['default'];
}, function(modId) { var map = {"../lib/addSpace":1625038548193,"../lib/getValue":1625038548194}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548191);
})()
//# sourceMappingURL=index.js.map