module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548140, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _vendors = require('vendors');

var _vendors2 = _interopRequireDefault(_vendors);

var _cssnanoUtilSameParent = require('cssnano-util-same-parent');

var _cssnanoUtilSameParent2 = _interopRequireDefault(_cssnanoUtilSameParent);

var _ensureCompatibility = require('./lib/ensureCompatibility');

var _ensureCompatibility2 = _interopRequireDefault(_ensureCompatibility);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const prefixes = _vendors2.default.map(v => `-${v}-`);

function intersect(a, b, not) {
    return a.filter(c => {
        const index = ~b.indexOf(c);
        return not ? !index : index;
    });
}

// Internet Explorer use :-ms-input-placeholder.
// Microsoft Edge use ::-ms-input-placeholder.
const findMsInputPlaceholder = selector => ~selector.search(/-ms-input-placeholder/i);
const different = (a, b) => intersect(a, b, true).concat(intersect(b, a, true));
const filterPrefixes = selector => intersect(prefixes, selector);

function sameVendor(selectorsA, selectorsB) {
    let same = selectors => selectors.map(filterPrefixes).join();
    let findMsVendor = selectors => selectors.find(findMsInputPlaceholder);
    return same(selectorsA) === same(selectorsB) && !(findMsVendor(selectorsA) && findMsVendor(selectorsB));
}

const noVendor = selector => !filterPrefixes(selector).length;

function canMerge(ruleA, ruleB, browsers, compatibilityCache) {
    const a = ruleA.selectors;
    const b = ruleB.selectors;

    const selectors = a.concat(b);

    if (!(0, _ensureCompatibility2.default)(selectors, browsers, compatibilityCache)) {
        return false;
    }

    const parent = (0, _cssnanoUtilSameParent2.default)(ruleA, ruleB);
    const { name } = ruleA.parent;
    if (parent && name && ~name.indexOf('keyframes')) {
        return false;
    }
    return parent && (selectors.every(noVendor) || sameVendor(a, b));
}

const getDecls = rule => rule.nodes && rule.nodes.map(String);
const joinSelectors = (...rules) => rules.map(s => s.selector).join();

function ruleLength(...rules) {
    return rules.map(r => r.nodes.length ? String(r) : '').join('').length;
}

function splitProp(prop) {
    const parts = prop.split('-');
    let base, rest;
    // Treat vendor prefixed properties as if they were unprefixed;
    // moving them when combined with non-prefixed properties can
    // cause issues. e.g. moving -webkit-background-clip when there
    // is a background shorthand definition.
    if (prop[0] === '-') {
        base = parts[2];
        rest = parts.slice(3);
    } else {
        base = parts[0];
        rest = parts.slice(1);
    }
    return [base, rest];
}

function isConflictingProp(propA, propB) {
    if (propA === propB) {
        return true;
    }
    const a = splitProp(propA);
    const b = splitProp(propB);
    return a[0] === b[0] && a[1].length !== b[1].length;
}

function hasConflicts(declProp, notMoved) {
    return notMoved.some(prop => isConflictingProp(prop, declProp));
}

function partialMerge(first, second) {
    let intersection = intersect(getDecls(first), getDecls(second));
    if (!intersection.length) {
        return second;
    }
    let nextRule = second.next();
    if (nextRule && nextRule.type === 'rule' && canMerge(second, nextRule)) {
        let nextIntersection = intersect(getDecls(second), getDecls(nextRule));
        if (nextIntersection.length > intersection.length) {
            first = second;second = nextRule;intersection = nextIntersection;
        }
    }
    const recievingBlock = second.clone();
    recievingBlock.selector = joinSelectors(first, second);
    recievingBlock.nodes = [];
    const difference = different(getDecls(first), getDecls(second));
    const filterConflicts = (decls, intersectn) => {
        let willNotMove = [];
        return decls.reduce((willMove, decl) => {
            let intersects = ~intersectn.indexOf(decl);
            let prop = decl.split(':')[0];
            let base = prop.split('-')[0];
            let canMove = difference.every(d => d.split(':')[0] !== base);
            if (intersects && canMove && !hasConflicts(prop, willNotMove)) {
                willMove.push(decl);
            } else {
                willNotMove.push(prop);
            }
            return willMove;
        }, []);
    };
    const containsAllDeclaration = intersectionList => {
        return intersectionList.some(declaration => {
            return declaration.split(':')[0].toLowerCase() === 'all';
        });
    };
    intersection = filterConflicts(getDecls(first).reverse(), intersection);
    intersection = filterConflicts(getDecls(second), intersection);

    // Rules with "all" declarations must be on top
    if (containsAllDeclaration(intersection)) {
        second.parent.insertBefore(first, recievingBlock);
    } else {
        second.parent.insertBefore(second, recievingBlock);
    }

    const firstClone = first.clone();
    const secondClone = second.clone();
    const moveDecl = callback => {
        return decl => {
            if (~intersection.indexOf(String(decl))) {
                callback.call(this, decl);
            }
        };
    };
    firstClone.walkDecls(moveDecl(decl => {
        decl.remove();
        recievingBlock.append(decl);
    }));
    secondClone.walkDecls(moveDecl(decl => decl.remove()));
    const merged = ruleLength(firstClone, recievingBlock, secondClone);
    const original = ruleLength(first, second);
    if (merged < original) {
        first.replaceWith(firstClone);
        second.replaceWith(secondClone);
        [firstClone, recievingBlock, secondClone].forEach(r => {
            if (!r.nodes.length) {
                r.remove();
            }
        });
        if (!secondClone.parent) {
            return recievingBlock;
        }
        return secondClone;
    } else {
        recievingBlock.remove();
        return second;
    }
}

function selectorMerger(browsers, compatibilityCache) {
    let cache = null;
    return function (rule) {
        // Prime the cache with the first rule, or alternately ensure that it is
        // safe to merge both declarations before continuing
        if (!cache || !canMerge(rule, cache, browsers, compatibilityCache)) {
            cache = rule;
            return;
        }
        // Ensure that we don't deduplicate the same rule; this is sometimes
        // caused by a partial merge
        if (cache === rule) {
            cache = rule;
            return;
        }
        // Merge when declarations are exactly equal
        // e.g. h1 { color: red } h2 { color: red }
        if (getDecls(rule).join(';') === getDecls(cache).join(';')) {
            rule.selector = joinSelectors(cache, rule);
            cache.remove();
            cache = rule;
            return;
        }
        // Merge when both selectors are exactly equal
        // e.g. a { color: blue } a { font-weight: bold }
        if (cache.selector === rule.selector) {
            const cached = getDecls(cache);
            rule.walk(decl => {
                if (~cached.indexOf(String(decl))) {
                    return decl.remove();
                }
                cache.append(decl);
            });
            rule.remove();
            return;
        }
        // Partial merge: check if the rule contains a subset of the last; if
        // so create a joined selector with the subset, if smaller.
        cache = partialMerge(cache, rule);
    };
}

exports.default = _postcss2.default.plugin('postcss-merge-rules', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });
        const compatibilityCache = {};
        css.walkRules(selectorMerger(browsers, compatibilityCache));
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {"./lib/ensureCompatibility":1625038548141}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548141, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.pseudoElements = undefined;
exports.default = ensureCompatibility;

var _caniuseApi = require('caniuse-api');

var _postcssSelectorParser = require('postcss-selector-parser');

var _postcssSelectorParser2 = _interopRequireDefault(_postcssSelectorParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const simpleSelectorRe = /^#?[-._a-z0-9 ]+$/i;

const cssSel2 = 'css-sel2';
const cssSel3 = 'css-sel3';
const cssGencontent = 'css-gencontent';
const cssFirstLetter = 'css-first-letter';
const cssFirstLine = 'css-first-line';
const cssInOutOfRange = 'css-in-out-of-range';

const pseudoElements = exports.pseudoElements = {
    ':active': cssSel2,
    ':after': cssGencontent,
    ':before': cssGencontent,
    ':checked': cssSel3,
    ':default': 'css-default-pseudo',
    ':dir': 'css-dir-pseudo',
    ':disabled': cssSel3,
    ':empty': cssSel3,
    ':enabled': cssSel3,
    ':first-child': cssSel2,
    ':first-letter': cssFirstLetter,
    ':first-line': cssFirstLine,
    ':first-of-type': cssSel3,
    ':focus': cssSel2,
    ':focus-within': 'css-focus-within',
    ':has': 'css-has',
    ':hover': cssSel2,
    ':in-range': cssInOutOfRange,
    ':indeterminate': 'css-indeterminate-pseudo',
    ':lang': cssSel2,
    ':last-child': cssSel3,
    ':last-of-type': cssSel3,
    ':matches': 'css-matches-pseudo',
    ':not': cssSel3,
    ':nth-child': cssSel3,
    ':nth-last-child': cssSel3,
    ':nth-last-of-type': cssSel3,
    ':nth-of-type': cssSel3,
    ':only-child': cssSel3,
    ':only-of-type': cssSel3,
    ':optional': 'css-optional-pseudo',
    ':out-of-range': cssInOutOfRange,
    ':placeholder-shown': 'css-placeholder-shown',
    ':root': cssSel3,
    ':target': cssSel3,
    '::after': cssGencontent,
    '::backdrop': 'dialog',
    '::before': cssGencontent,
    '::first-letter': cssFirstLetter,
    '::first-line': cssFirstLine,
    '::marker': 'css-marker-pseudo',
    '::placeholder': 'css-placeholder',
    '::selection': 'css-selection'
};

function isCssMixin(selector) {
    return selector[selector.length - 1] === ':';
}

const isSupportedCache = {};

// Move to util in future
function isSupportedCached(feature, browsers) {
    const key = JSON.stringify({ feature, browsers });
    let result = isSupportedCache[key];

    if (!result) {
        result = (0, _caniuseApi.isSupported)(feature, browsers);
        isSupportedCache[key] = result;
    }

    return result;
}

function ensureCompatibility(selectors, browsers, compatibilityCache) {
    // Should not merge mixins
    if (selectors.some(isCssMixin)) {
        return false;
    }
    return selectors.every(selector => {
        if (simpleSelectorRe.test(selector)) {
            return true;
        }
        if (compatibilityCache && selector in compatibilityCache) {
            return compatibilityCache[selector];
        }
        let compatible = true;
        (0, _postcssSelectorParser2.default)(ast => {
            ast.walk(node => {
                const { type, value } = node;
                if (type === 'pseudo') {
                    const entry = pseudoElements[value];
                    if (entry && compatible) {
                        compatible = isSupportedCached(entry, browsers);
                    }
                }
                if (type === 'combinator') {
                    if (~value.indexOf('~')) {
                        compatible = isSupportedCached(cssSel3, browsers);
                    }
                    if (~value.indexOf('>') || ~value.indexOf('+')) {
                        compatible = isSupportedCached(cssSel2, browsers);
                    }
                }
                if (type === 'attribute' && node.attribute) {
                    // [foo]
                    if (!node.operator) {
                        compatible = isSupportedCached(cssSel2, browsers);
                    }

                    if (value) {
                        // [foo="bar"], [foo~="bar"], [foo|="bar"]
                        if (~['=', '~=', '|='].indexOf(node.operator)) {
                            compatible = isSupportedCached(cssSel2, browsers);
                        }
                        // [foo^="bar"], [foo$="bar"], [foo*="bar"]
                        if (~['^=', '$=', '*='].indexOf(node.operator)) {
                            compatible = isSupportedCached(cssSel3, browsers);
                        }
                    }

                    // [foo="bar" i]
                    if (node.insensitive) {
                        compatible = isSupportedCached('css-case-insensitive', browsers);
                    }
                }
                if (!compatible) {
                    // If this node was not compatible,
                    // break out early from walking the rest
                    return false;
                }
            });
        }).processSync(selector);
        if (compatibilityCache) {
            compatibilityCache[selector] = compatible;
        }
        return compatible;
    });
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548140);
})()
//# sourceMappingURL=index.js.map