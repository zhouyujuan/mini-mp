module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548142, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _postcssValueParser = require('postcss-value-parser');

var _postcssValueParser2 = _interopRequireDefault(_postcssValueParser);

var _minifyWeight = require('./lib/minify-weight');

var _minifyWeight2 = _interopRequireDefault(_minifyWeight);

var _minifyFamily = require('./lib/minify-family');

var _minifyFamily2 = _interopRequireDefault(_minifyFamily);

var _minifyFont = require('./lib/minify-font');

var _minifyFont2 = _interopRequireDefault(_minifyFont);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function transform(opts, decl) {
    let tree;
    let prop = decl.prop.toLowerCase();

    if (prop === 'font-weight') {
        decl.value = (0, _minifyWeight2.default)(decl.value);
    } else if (prop === 'font-family') {
        tree = (0, _postcssValueParser2.default)(decl.value);
        tree.nodes = (0, _minifyFamily2.default)(tree.nodes, opts);
        decl.value = tree.toString();
    } else if (prop === 'font') {
        tree = (0, _postcssValueParser2.default)(decl.value);
        tree.nodes = (0, _minifyFont2.default)(tree.nodes, opts);
        decl.value = tree.toString();
    }
}

exports.default = _postcss2.default.plugin('postcss-minify-font-values', opts => {
    opts = Object.assign({}, {
        removeAfterKeyword: false,
        removeDuplicates: true,
        removeQuotes: true
    }, opts);

    return css => css.walkDecls(/font/i, transform.bind(null, opts));
});
module.exports = exports['default'];
}, function(modId) {var map = {"./lib/minify-weight":1625038548143,"./lib/minify-family":1625038548144,"./lib/minify-font":1625038548146}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548143, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (value) {
    const valueInLowerCase = value.toLowerCase();

    return valueInLowerCase === 'normal' ? '400' : valueInLowerCase === 'bold' ? '700' : value;
};

;
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548144, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (nodes, opts) {
    let family = [];
    let last = null;
    let i, max;

    nodes.forEach((node, index, arr) => {
        if (node.type === 'string' || node.type === 'function') {
            family.push(node);
        } else if (node.type === 'word') {
            if (!last) {
                last = { type: 'word', value: '' };
                family.push(last);
            }

            last.value += node.value;
        } else if (node.type === 'space') {
            if (last && index !== arr.length - 1) {
                last.value += ' ';
            }
        } else {
            last = null;
        }
    });

    family = family.map(node => {
        if (node.type === 'string') {
            const isKeyword = regexKeyword.test(node.value);

            if (!opts.removeQuotes || isKeyword || /[0-9]/.test(node.value.slice(0, 1))) {
                return (0, _postcssValueParser.stringify)(node);
            }

            let escaped = escapeIdentifierSequence(node.value);

            if (escaped.length < node.value.length + 2) {
                return escaped;
            }
        }

        return (0, _postcssValueParser.stringify)(node);
    });

    if (opts.removeAfterKeyword) {
        for (i = 0, max = family.length; i < max; i += 1) {
            if (~genericFontFamilykeywords.indexOf(family[i].toLowerCase())) {
                family = family.slice(0, i + 1);
                break;
            }
        }
    }

    if (opts.removeDuplicates) {
        family = uniqs(family);
    }

    return [{
        type: 'word',
        value: family.join()
    }];
};

var _postcssValueParser = require('postcss-value-parser');

var _uniqs = require('./uniqs');

var _uniqs2 = _interopRequireDefault(_uniqs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const uniqs = (0, _uniqs2.default)('monospace');
const globalKeywords = ['inherit', 'initial', 'unset'];
const genericFontFamilykeywords = ['sans-serif', 'serif', 'fantasy', 'cursive', 'monospace', 'system-ui'];

function makeArray(value, length) {
    let array = [];
    while (length--) {
        array[length] = value;
    }
    return array;
}

const regexSimpleEscapeCharacters = /[ !"#$%&'()*+,.\/;<=>?@\[\\\]^`{|}~]/;

function escape(string, escapeForString) {
    let counter = 0;
    let character = null;
    let charCode = null;
    let value = null;
    let output = '';

    while (counter < string.length) {
        character = string.charAt(counter++);
        charCode = character.charCodeAt();

        // \r is already tokenized away at this point
        // `:` can be escaped as `\:`, but that fails in IE < 8
        if (!escapeForString && /[\t\n\v\f:]/.test(character)) {
            value = '\\' + charCode.toString(16) + ' ';
        } else if (!escapeForString && regexSimpleEscapeCharacters.test(character)) {
            value = '\\' + character;
        } else {
            value = character;
        }

        output += value;
    }

    if (!escapeForString) {
        if (/^-[-\d]/.test(output)) {
            output = '\\-' + output.slice(1);
        }

        const firstChar = string.charAt(0);

        if (/\d/.test(firstChar)) {
            output = '\\3' + firstChar + ' ' + output.slice(1);
        }
    }

    return output;
}

const regexKeyword = new RegExp(genericFontFamilykeywords.concat(globalKeywords).join('|'), 'i');
const regexInvalidIdentifier = /^(-?\d|--)/;
const regexSpaceAtStart = /^\x20/;
const regexWhitespace = /[\t\n\f\r\x20]/g;
const regexIdentifierCharacter = /^[a-zA-Z\d\xa0-\uffff_-]+$/;
const regexConsecutiveSpaces = /(\\(?:[a-fA-F0-9]{1,6}\x20|\x20))?(\x20{2,})/g;
const regexTrailingEscape = /\\[a-fA-F0-9]{0,6}\x20$/;
const regexTrailingSpace = /\x20$/;

function escapeIdentifierSequence(string) {
    let identifiers = string.split(regexWhitespace);
    let index = 0;
    let result = [];
    let escapeResult;

    while (index < identifiers.length) {
        let subString = identifiers[index++];

        if (subString === '') {
            result.push(subString);
            continue;
        }

        escapeResult = escape(subString, false);

        if (regexIdentifierCharacter.test(subString)) {
            // the font family name part consists of allowed characters exclusively
            if (regexInvalidIdentifier.test(subString)) {
                // the font family name part starts with two hyphens, a digit, or a
                // hyphen followed by a digit
                if (index === 1) {
                    // if this is the first item
                    result.push(escapeResult);
                } else {
                    // if it’s not the first item, we can simply escape the space
                    // between the two identifiers to merge them into a single
                    // identifier rather than escaping the start characters of the
                    // second identifier
                    result[index - 2] += '\\';
                    result.push(escape(subString, true));
                }
            } else {
                // the font family name part doesn’t start with two hyphens, a digit,
                // or a hyphen followed by a digit
                result.push(escapeResult);
            }
        } else {
            // the font family name part contains invalid identifier characters
            result.push(escapeResult);
        }
    }

    result = result.join(' ').replace(regexConsecutiveSpaces, ($0, $1, $2) => {
        const spaceCount = $2.length;
        const escapesNeeded = Math.floor(spaceCount / 2);
        const array = makeArray('\\ ', escapesNeeded);

        if (spaceCount % 2) {
            array[escapesNeeded - 1] += '\\ ';
        }

        return ($1 || '') + ' ' + array.join(' ');
    });

    // Escape trailing spaces unless they’re already part of an escape
    if (regexTrailingSpace.test(result) && !regexTrailingEscape.test(result)) {
        result = result.replace(regexTrailingSpace, '\\ ');
    }

    if (regexSpaceAtStart.test(result)) {
        result = '\\ ' + result.slice(1);
    }

    return result;
}

;
module.exports = exports['default'];
}, function(modId) { var map = {"./uniqs":1625038548145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548145, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = uniqueExcept;
function uniqueExcept(exclude) {
    return function unique() {
        const list = Array.prototype.concat.apply([], arguments);
        return list.filter((item, i) => {
            if (item.toLowerCase() === exclude) {
                return true;
            }
            return i === list.indexOf(item);
        });
    };
};
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548146, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (nodes, opts) {
    let i, max, node, familyStart, family;
    let hasSize = false;

    for (i = 0, max = nodes.length; i < max; i += 1) {
        node = nodes[i];
        if (node.type === 'word') {
            if (hasSize) {
                continue;
            }
            const value = node.value.toLowerCase();
            if (value === 'normal' || ~_keywords2.default.style.indexOf(value) || ~_keywords2.default.variant.indexOf(value) || ~_keywords2.default.stretch.indexOf(value)) {
                familyStart = i;
            } else if (~_keywords2.default.weight.indexOf(value)) {
                node.value = (0, _minifyWeight2.default)(value);
                familyStart = i;
            } else if (~_keywords2.default.size.indexOf(value) || (0, _postcssValueParser.unit)(value)) {
                familyStart = i;
                hasSize = true;
            }
        } else if (node.type === 'div' && node.value === '/') {
            familyStart = i + 1;
            break;
        }
    }

    familyStart += 2;
    family = (0, _minifyFamily2.default)(nodes.slice(familyStart), opts);
    return nodes.slice(0, familyStart).concat(family);
};

var _postcssValueParser = require('postcss-value-parser');

var _keywords = require('./keywords');

var _keywords2 = _interopRequireDefault(_keywords);

var _minifyFamily = require('./minify-family');

var _minifyFamily2 = _interopRequireDefault(_minifyFamily);

var _minifyWeight = require('./minify-weight');

var _minifyWeight2 = _interopRequireDefault(_minifyWeight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];
}, function(modId) { var map = {"./keywords":1625038548147,"./minify-family":1625038548144,"./minify-weight":1625038548143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548147, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = {
    style: ['italic', 'oblique'],
    variant: ['small-caps'],
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900', 'bold', 'lighter', 'bolder'],
    stretch: ['ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded'],
    size: ['xx-small', 'x-small', 'small', 'medium', 'large', 'x-large', 'xx-large', 'larger', 'smaller']
};
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548142);
})()
//# sourceMappingURL=index.js.map