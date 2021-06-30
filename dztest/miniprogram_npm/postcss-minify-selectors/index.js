module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548176, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _alphanumSort = require("alphanum-sort");

var _alphanumSort2 = _interopRequireDefault(_alphanumSort);

var _has = require("has");

var _has2 = _interopRequireDefault(_has);

var _postcssSelectorParser = require("postcss-selector-parser");

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

var _unquote = require("./lib/unquote");

var _unquote2 = _interopRequireDefault(_unquote);

var _canUnquote = require("./lib/canUnquote");

var _canUnquote2 = _interopRequireDefault(_canUnquote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pseudoElements = ["::before", "::after", "::first-letter", "::first-line"];

function getParsed(selectors, callback) {
    return (0, _postcssSelectorParser2.default)(callback).processSync(selectors);
}

function attribute(selector) {
    if (selector.value) {
        // Join selectors that are split over new lines
        selector.value = selector.value.replace(/\\\n/g, "").trim();

        if ((0, _canUnquote2.default)(selector.value)) {
            selector.value = (0, _unquote2.default)(selector.value);
        }

        selector.operator = selector.operator.trim();
    }

    if (!selector.raws) {
        selector.raws = {};
    }

    if (!selector.raws.spaces) {
        selector.raws.spaces = {};
    }

    selector.raws.spaces.attribute = {
        before: "",
        after: ""
    };

    selector.raws.spaces.operator = {
        before: "",
        after: ""
    };

    selector.raws.spaces.value = {
        before: "",
        after: selector.insensitive ? " " : ""
    };

    if (selector.insensitive) {
        selector.raws.spaces.insensitive = {
            before: "",
            after: ""
        };
    }

    selector.attribute = selector.attribute.trim();
}

function combinator(selector) {
    const value = selector.value.trim();

    selector.value = value.length ? value : " ";
}

const pseudoReplacements = {
    ":nth-child": ":first-child",
    ":nth-of-type": ":first-of-type",
    ":nth-last-child": ":last-child",
    ":nth-last-of-type": ":last-of-type"
};

function pseudo(selector) {
    const value = selector.value.toLowerCase();

    if (selector.nodes.length === 1 && pseudoReplacements[value]) {
        const first = selector.at(0);
        const one = first.at(0);

        if (first.length === 1) {
            if (one.value === "1") {
                selector.replaceWith(_postcssSelectorParser2.default.pseudo({
                    value: pseudoReplacements[value]
                }));
            }

            if (one.value.toLowerCase() === "even") {
                one.value = "2n";
            }
        }

        if (first.length === 3) {
            const two = first.at(1);
            const three = first.at(2);

            if (one.value.toLowerCase() === "2n" && two.value === "+" && three.value === "1") {
                one.value = "odd";

                two.remove();
                three.remove();
            }
        }

        return;
    }

    const uniques = [];

    selector.walk(child => {
        if (child.type === "selector") {
            const childStr = String(child);

            if (!~uniques.indexOf(childStr)) {
                uniques.push(childStr);
            } else {
                child.remove();
            }
        }
    });

    if (~pseudoElements.indexOf(value)) {
        selector.value = selector.value.slice(1);
    }
}

const tagReplacements = {
    from: "0%",
    "100%": "to"
};

function tag(selector) {
    const value = selector.value.toLowerCase();

    if ((0, _has2.default)(tagReplacements, value)) {
        selector.value = tagReplacements[value];
    }
}

function universal(selector) {
    const next = selector.next();

    if (next && next.type !== "combinator") {
        selector.remove();
    }
}

const reducers = {
    attribute,
    combinator,
    pseudo,
    tag,
    universal
};

exports.default = (0, _postcss.plugin)("postcss-minify-selectors", () => {
    return css => {
        const cache = {};

        css.walkRules(rule => {
            const selector = rule.raws.selector && rule.raws.selector.value === rule.selector ? rule.raws.selector.raw : rule.selector;

            // If the selector ends with a ':' it is likely a part of a custom mixin,
            // so just pass through.
            if (selector[selector.length - 1] === ":") {
                return;
            }

            if (cache[selector]) {
                rule.selector = cache[selector];

                return;
            }

            const optimizedSelector = getParsed(selector, selectors => {
                selectors.nodes = (0, _alphanumSort2.default)(selectors.nodes, { insensitive: true });

                const uniqueSelectors = [];

                selectors.walk(sel => {
                    const { type } = sel;

                    // Trim whitespace around the value
                    sel.spaces.before = sel.spaces.after = "";

                    if ((0, _has2.default)(reducers, type)) {
                        reducers[type](sel);

                        return;
                    }

                    const toString = String(sel);

                    if (type === "selector" && sel.parent.type !== "pseudo") {
                        if (!~uniqueSelectors.indexOf(toString)) {
                            uniqueSelectors.push(toString);
                        } else {
                            sel.remove();
                        }
                    }
                });
            });

            rule.selector = optimizedSelector;
            cache[selector] = optimizedSelector;
        });
    };
});
module.exports = exports["default"];
}, function(modId) {var map = {"./lib/unquote":1625038548177,"./lib/canUnquote":1625038548178}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548177, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = string => string.replace(/["']/g, '');

module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548178, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = canUnquote;

var _unquote = require('./unquote');

var _unquote2 = _interopRequireDefault(_unquote);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Can unquote attribute detection from mothereff.in
 * Copyright Mathias Bynens <https://mathiasbynens.be/>
 * https://github.com/mathiasbynens/mothereff.in
 */
const escapes = /\\([0-9A-Fa-f]{1,6})[ \t\n\f\r]?/g;
const range = /[\u0000-\u002c\u002e\u002f\u003A-\u0040\u005B-\u005E\u0060\u007B-\u009f]/;

function canUnquote(value) {
    value = (0, _unquote2.default)(value);
    if (value === '-' || value === '') {
        return false;
    }
    value = value.replace(escapes, 'a').replace(/\\./g, 'a');
    return !(range.test(value) || /^(?:-?\d|--)/.test(value));
}
module.exports = exports['default'];
}, function(modId) { var map = {"./unquote":1625038548177}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548176);
})()
//# sourceMappingURL=index.js.map