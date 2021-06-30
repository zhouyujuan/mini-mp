module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548089, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcss2 = _interopRequireDefault(_postcss);

var _decl = require('./lib/decl');

var _decl2 = _interopRequireDefault(_decl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _postcss2.default.plugin('postcss-merge-longhand', () => {
    return css => {
        css.walkRules(rule => {
            _decl2.default.forEach(p => {
                p.explode(rule);
                p.merge(rule);
            });
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {"./lib/decl":1625038548090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548090, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _borders = require('./borders');

var _borders2 = _interopRequireDefault(_borders);

var _columns = require('./columns');

var _columns2 = _interopRequireDefault(_columns);

var _margin = require('./margin');

var _margin2 = _interopRequireDefault(_margin);

var _padding = require('./padding');

var _padding2 = _interopRequireDefault(_padding);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_borders2.default, _columns2.default, _margin2.default, _padding2.default];
module.exports = exports['default'];
}, function(modId) { var map = {"./borders":1625038548091,"./columns":1625038548109,"./margin":1625038548110,"./padding":1625038548113}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548091, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _stylehacks = require('stylehacks');

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _parseTrbl = require('../parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

var _hasAllProps = require('../hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _getDecls = require('../getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getRules = require('../getRules');

var _getRules2 = _interopRequireDefault(_getRules);

var _getValue = require('../getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _mergeRules = require('../mergeRules');

var _mergeRules2 = _interopRequireDefault(_mergeRules);

var _minifyTrbl = require('../minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _minifyWsc = require('../minifyWsc');

var _minifyWsc2 = _interopRequireDefault(_minifyWsc);

var _canMerge = require('../canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

var _trbl = require('../trbl');

var _trbl2 = _interopRequireDefault(_trbl);

var _isCustomProp = require('../isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

var _canExplode = require('../canExplode');

var _canExplode2 = _interopRequireDefault(_canExplode);

var _getLastNode = require('../getLastNode');

var _getLastNode2 = _interopRequireDefault(_getLastNode);

var _parseWsc = require('../parseWsc');

var _parseWsc2 = _interopRequireDefault(_parseWsc);

var _validateWsc = require('../validateWsc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wsc = ['width', 'style', 'color'];
const defaults = ['medium', 'none', 'currentcolor'];

function borderProperty(...parts) {
    return `border-${parts.join('-')}`;
}

function mapBorderProperty(value) {
    return borderProperty(value);
}

const directions = _trbl2.default.map(mapBorderProperty);
const properties = wsc.map(mapBorderProperty);
const directionalProperties = directions.reduce((prev, curr) => prev.concat(wsc.map(prop => `${curr}-${prop}`)), []);

const precedence = [['border'], directions.concat(properties), directionalProperties];

const allProperties = precedence.reduce((a, b) => a.concat(b));

function getLevel(prop) {
    for (let i = 0; i < precedence.length; i++) {
        if (!!~precedence[i].indexOf(prop.toLowerCase())) {
            return i;
        }
    }
}

const isValueCustomProp = value => value && !!~value.search(/var\s*\(\s*--/i);

function canMergeValues(values) {
    return !values.some(isValueCustomProp) || values.every(isValueCustomProp);
}

function getColorValue(decl) {
    if (decl.prop.substr(-5) === 'color') {
        return decl.value;
    }

    return (0, _parseWsc2.default)(decl.value)[2] || defaults[2];
}

function diffingProps(values, nextValues) {
    return wsc.reduce((prev, curr, i) => {
        if (values[i] === nextValues[i]) {
            return prev;
        }

        return [...prev, curr];
    }, []);
}

function mergeRedundant({ values, nextValues, decl, nextDecl, index }) {
    if (!(0, _canMerge2.default)([decl, nextDecl])) {
        return;
    }

    if ((0, _stylehacks.detect)(decl) || (0, _stylehacks.detect)(nextDecl)) {
        return;
    }

    const diff = diffingProps(values, nextValues);

    if (diff.length > 1) {
        return;
    }

    const prop = diff.pop();
    const position = wsc.indexOf(prop);

    const prop1 = `${nextDecl.prop}-${prop}`;
    const prop2 = `border-${prop}`;

    let props = (0, _parseTrbl2.default)(values[position]);

    props[index] = nextValues[position];

    const borderValue2 = values.filter((e, i) => i !== position).join(' ');
    const propValue2 = (0, _minifyTrbl2.default)(props);

    const origLength = ((0, _minifyWsc2.default)(decl.value) + nextDecl.prop + nextDecl.value).length;
    const newLength1 = decl.value.length + prop1.length + (0, _minifyWsc2.default)(nextValues[position]).length;
    const newLength2 = borderValue2.length + prop2.length + propValue2.length;

    if (newLength1 < newLength2 && newLength1 < origLength) {
        nextDecl.prop = prop1;
        nextDecl.value = nextValues[position];
    }

    if (newLength2 < newLength1 && newLength2 < origLength) {
        decl.value = borderValue2;
        nextDecl.prop = prop2;
        nextDecl.value = propValue2;
    }
}

function isCloseEnough(mapped) {
    return mapped[0] === mapped[1] && mapped[1] === mapped[2] || mapped[1] === mapped[2] && mapped[2] === mapped[3] || mapped[2] === mapped[3] && mapped[3] === mapped[0] || mapped[3] === mapped[0] && mapped[0] === mapped[1];
}

function getDistinctShorthands(mapped) {
    return mapped.reduce((a, b) => {
        a = Array.isArray(a) ? a : [a];

        if (!~a.indexOf(b)) {
            a.push(b);
        }

        return a;
    });
}

function explode(rule) {
    rule.walkDecls(/^border/i, decl => {
        if (!(0, _canExplode2.default)(decl, false)) {
            return;
        }

        if ((0, _stylehacks.detect)(decl)) {
            return;
        }

        const prop = decl.prop.toLowerCase();

        // border -> border-trbl
        if (prop === 'border') {
            if ((0, _validateWsc.isValidWsc)((0, _parseWsc2.default)(decl.value))) {
                directions.forEach(direction => {
                    (0, _insertCloned2.default)(decl.parent, decl, { prop: direction });
                });

                return decl.remove();
            }
        }

        // border-trbl -> border-trbl-wsc
        if (directions.some(direction => prop === direction)) {
            let values = (0, _parseWsc2.default)(decl.value);

            if ((0, _validateWsc.isValidWsc)(values)) {
                wsc.forEach((d, i) => {
                    (0, _insertCloned2.default)(decl.parent, decl, {
                        prop: `${prop}-${d}`,
                        value: values[i] || defaults[i]
                    });
                });

                return decl.remove();
            }
        }

        // border-wsc -> border-trbl-wsc
        wsc.some(style => {
            if (prop !== borderProperty(style)) {
                return false;
            }

            (0, _parseTrbl2.default)(decl.value).forEach((value, i) => {
                (0, _insertCloned2.default)(decl.parent, decl, {
                    prop: borderProperty(_trbl2.default[i], style),
                    value
                });
            });

            return decl.remove();
        });
    });
}

function merge(rule) {
    // border-trbl-wsc -> border-trbl
    _trbl2.default.forEach(direction => {
        const prop = borderProperty(direction);

        (0, _mergeRules2.default)(rule, wsc.map(style => borderProperty(direction, style)), (rules, lastNode) => {
            if ((0, _canMerge2.default)(rules, false) && !rules.some(_stylehacks.detect)) {
                (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                    prop,
                    value: rules.map(_getValue2.default).join(' ')
                });

                rules.forEach(_remove2.default);

                return true;
            }
        });
    });

    // border-trbl-wsc -> border-wsc
    wsc.forEach(style => {
        const prop = borderProperty(style);

        (0, _mergeRules2.default)(rule, _trbl2.default.map(direction => borderProperty(direction, style)), (rules, lastNode) => {
            if ((0, _canMerge2.default)(rules) && !rules.some(_stylehacks.detect)) {
                (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                    prop,
                    value: (0, _minifyTrbl2.default)(rules.map(_getValue2.default).join(' '))
                });

                rules.forEach(_remove2.default);

                return true;
            }
        });
    });

    // border-trbl -> border-wsc
    (0, _mergeRules2.default)(rule, directions, (rules, lastNode) => {
        if (rules.some(_stylehacks.detect)) {
            return;
        }

        const values = rules.map(({ value }) => value);

        if (!canMergeValues(values)) {
            return;
        }

        const parsed = values.map(value => (0, _parseWsc2.default)(value));

        if (!parsed.every(_validateWsc.isValidWsc)) {
            return;
        }

        wsc.forEach((d, i) => {
            const value = parsed.map(v => v[i] || defaults[i]);

            if (canMergeValues(value)) {
                (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                    prop: borderProperty(d),
                    value: (0, _minifyTrbl2.default)(value)
                });
            } else {
                (0, _insertCloned2.default)(lastNode.parent, lastNode);
            }
        });

        rules.forEach(_remove2.default);

        return true;
    });

    // border-wsc -> border
    // border-wsc -> border + border-color
    // border-wsc -> border + border-dir
    (0, _mergeRules2.default)(rule, properties, (rules, lastNode) => {
        if (rules.some(_stylehacks.detect)) {
            return;
        }

        const values = rules.map(node => (0, _parseTrbl2.default)(node.value));
        const mapped = [0, 1, 2, 3].map(i => [values[0][i], values[1][i], values[2][i]].join(' '));

        if (!canMergeValues(mapped)) {
            return;
        }

        const [width, style, color] = rules;
        const reduced = getDistinctShorthands(mapped);

        if (isCloseEnough(mapped) && (0, _canMerge2.default)(rules, false)) {
            const first = mapped.indexOf(reduced[0]) !== mapped.lastIndexOf(reduced[0]);

            const border = (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                prop: 'border',
                value: first ? reduced[0] : reduced[1]
            });

            if (reduced[1]) {
                const value = first ? reduced[1] : reduced[0];
                const prop = borderProperty(_trbl2.default[mapped.indexOf(value)]);

                rule.insertAfter(border, Object.assign(lastNode.clone(), {
                    prop,
                    value
                }));
            }
            rules.forEach(_remove2.default);

            return true;
        } else if (reduced.length === 1) {
            rule.insertBefore(color, Object.assign(lastNode.clone(), {
                prop: 'border',
                value: [width, style].map(_getValue2.default).join(' ')
            }));
            rules.filter(node => node.prop.toLowerCase() !== properties[2]).forEach(_remove2.default);

            return true;
        }
    });

    // border-wsc -> border + border-trbl
    (0, _mergeRules2.default)(rule, properties, (rules, lastNode) => {
        if (rules.some(_stylehacks.detect)) {
            return;
        }

        const values = rules.map(node => (0, _parseTrbl2.default)(node.value));
        const mapped = [0, 1, 2, 3].map(i => [values[0][i], values[1][i], values[2][i]].join(' '));
        const reduced = getDistinctShorthands(mapped);
        const none = 'medium none currentcolor';

        if (reduced.length > 1 && reduced.length < 4 && reduced.includes(none)) {
            const filtered = mapped.filter(p => p !== none);
            const mostCommon = reduced.sort((a, b) => mapped.filter(v => v === b).length - mapped.filter(v => v === a).length)[0];
            const borderValue = reduced.length === 2 ? filtered[0] : mostCommon;

            rule.insertBefore(lastNode, Object.assign(lastNode.clone(), {
                prop: 'border',
                value: borderValue
            }));

            directions.forEach((dir, i) => {
                if (mapped[i] !== borderValue) {
                    rule.insertBefore(lastNode, Object.assign(lastNode.clone(), {
                        prop: dir,
                        value: mapped[i]
                    }));
                }
            });

            rules.forEach(_remove2.default);

            return true;
        }
    });

    // border-trbl -> border
    // border-trbl -> border + border-trbl
    (0, _mergeRules2.default)(rule, directions, (rules, lastNode) => {
        if (rules.some(_stylehacks.detect)) {
            return;
        }

        const values = rules.map(node => {
            const wscValue = (0, _parseWsc2.default)(node.value);

            if (!(0, _validateWsc.isValidWsc)(wscValue)) {
                return node.value;
            }

            return wscValue.map((value, i) => value || defaults[i]).join(' ');
        });

        const reduced = getDistinctShorthands(values);

        if (isCloseEnough(values)) {
            const first = values.indexOf(reduced[0]) !== values.lastIndexOf(reduced[0]);

            rule.insertBefore(lastNode, Object.assign(lastNode.clone(), {
                prop: 'border',
                value: (0, _minifyWsc2.default)(first ? values[0] : values[1])
            }));

            if (reduced[1]) {
                const value = first ? reduced[1] : reduced[0];
                const prop = directions[values.indexOf(value)];
                rule.insertBefore(lastNode, Object.assign(lastNode.clone(), {
                    prop: prop,
                    value: (0, _minifyWsc2.default)(value)
                }));
            }

            rules.forEach(_remove2.default);

            return true;
        }
    });

    // border-trbl-wsc + border-trbl (custom prop) -> border-trbl + border-trbl-wsc (custom prop)
    directions.forEach(direction => {
        wsc.forEach((style, i) => {
            const prop = `${direction}-${style}`;

            (0, _mergeRules2.default)(rule, [direction, prop], (rules, lastNode) => {
                if (lastNode.prop !== direction) {
                    return;
                }

                const values = (0, _parseWsc2.default)(lastNode.value);

                if (!(0, _validateWsc.isValidWsc)(values)) {
                    return;
                }

                const wscProp = rules.filter(r => r !== lastNode)[0];

                if (!isValueCustomProp(values[i]) || (0, _isCustomProp2.default)(wscProp)) {
                    return;
                }

                const wscValue = values[i];

                values[i] = wscProp.value;

                if ((0, _canMerge2.default)(rules, false) && !rules.some(_stylehacks.detect)) {
                    (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                        prop,
                        value: wscValue
                    });
                    lastNode.value = (0, _minifyWsc2.default)(values);

                    wscProp.remove();

                    return true;
                }
            });
        });
    });

    // border-wsc + border (custom prop) -> border + border-wsc (custom prop)
    wsc.forEach((style, i) => {
        const prop = borderProperty(style);
        (0, _mergeRules2.default)(rule, ['border', prop], (rules, lastNode) => {
            if (lastNode.prop !== 'border') {
                return;
            }

            const values = (0, _parseWsc2.default)(lastNode.value);

            if (!(0, _validateWsc.isValidWsc)(values)) {
                return;
            }

            const wscProp = rules.filter(r => r !== lastNode)[0];

            if (!isValueCustomProp(values[i]) || (0, _isCustomProp2.default)(wscProp)) {
                return;
            }

            const wscValue = values[i];

            values[i] = wscProp.value;

            if ((0, _canMerge2.default)(rules, false) && !rules.some(_stylehacks.detect)) {
                (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                    prop,
                    value: wscValue
                });
                lastNode.value = (0, _minifyWsc2.default)(values);
                wscProp.remove();

                return true;
            }
        });
    });

    // optimize border-trbl
    let decls = (0, _getDecls2.default)(rule, directions);

    while (decls.length) {
        const lastNode = decls[decls.length - 1];

        wsc.forEach((d, i) => {
            const names = directions.filter(name => name !== lastNode.prop).map(name => `${name}-${d}`);

            let nodes = rule.nodes.slice(0, rule.nodes.indexOf(lastNode));

            const border = (0, _getLastNode2.default)(nodes, 'border');

            if (border) {
                nodes = nodes.slice(nodes.indexOf(border));
            }

            const props = nodes.filter(node => node.prop && ~names.indexOf(node.prop) && node.important === lastNode.important);
            const rules = (0, _getRules2.default)(props, names);

            if ((0, _hasAllProps2.default)(rules, ...names) && !rules.some(_stylehacks.detect)) {
                const values = rules.map(node => node ? node.value : null);
                const filteredValues = values.filter(Boolean);
                const lastNodeValue = _postcss.list.space(lastNode.value)[i];

                values[directions.indexOf(lastNode.prop)] = lastNodeValue;

                let value = (0, _minifyTrbl2.default)(values.join(' '));

                if (filteredValues[0] === filteredValues[1] && filteredValues[1] === filteredValues[2]) {
                    value = filteredValues[0];
                }

                let refNode = props[props.length - 1];

                if (value === lastNodeValue) {
                    refNode = lastNode;
                    let valueArray = _postcss.list.space(lastNode.value);
                    valueArray.splice(i, 1);
                    lastNode.value = valueArray.join(' ');
                }

                (0, _insertCloned2.default)(refNode.parent, refNode, {
                    prop: borderProperty(d),
                    value
                });

                decls = decls.filter(node => !~rules.indexOf(node));
                rules.forEach(_remove2.default);
            }
        });

        decls = decls.filter(node => node !== lastNode);
    }

    rule.walkDecls('border', decl => {
        const nextDecl = decl.next();

        if (!nextDecl || nextDecl.type !== 'decl') {
            return;
        }

        const index = directions.indexOf(nextDecl.prop);

        if (!~index) {
            return;
        }

        const values = (0, _parseWsc2.default)(decl.value);
        const nextValues = (0, _parseWsc2.default)(nextDecl.value);

        if (!(0, _validateWsc.isValidWsc)(values) || !(0, _validateWsc.isValidWsc)(nextValues)) {
            return;
        }

        const config = {
            values,
            nextValues,
            decl,
            nextDecl,
            index
        };

        return mergeRedundant(config);
    });

    rule.walkDecls(/^border($|-(top|right|bottom|left)$)/i, decl => {
        let values = (0, _parseWsc2.default)(decl.value);

        if (!(0, _validateWsc.isValidWsc)(values)) {
            return;
        }

        const position = directions.indexOf(decl.prop);
        let dirs = [...directions];

        dirs.splice(position, 1);
        wsc.forEach((d, i) => {
            const props = dirs.map(dir => `${dir}-${d}`);

            (0, _mergeRules2.default)(rule, [decl.prop, ...props], rules => {
                if (!rules.includes(decl)) {
                    return;
                }

                const longhands = rules.filter(p => p !== decl);

                if (longhands[0].value.toLowerCase() === longhands[1].value.toLowerCase() && longhands[1].value.toLowerCase() === longhands[2].value.toLowerCase() && longhands[0].value.toLowerCase() === values[i].toLowerCase()) {
                    longhands.forEach(_remove2.default);

                    (0, _insertCloned2.default)(decl.parent, decl, {
                        prop: borderProperty(d),
                        value: values[i]
                    });

                    values[i] = null;
                }
            });

            const newValue = values.join(' ');

            if (newValue) {
                decl.value = newValue;
            } else {
                decl.remove();
            }
        });
    });

    // clean-up values
    rule.walkDecls(/^border($|-(top|right|bottom|left)$)/i, decl => {
        decl.value = (0, _minifyWsc2.default)(decl.value);
    });

    // border-spacing-hv -> border-spacing
    rule.walkDecls(/^border-spacing$/i, decl => {
        const value = _postcss.list.space(decl.value);

        // merge vertical and horizontal dups
        if (value.length > 1 && value[0] === value[1]) {
            decl.value = value.slice(1).join(' ');
        }
    });

    // clean-up rules
    decls = (0, _getDecls2.default)(rule, allProperties);

    while (decls.length) {
        const lastNode = decls[decls.length - 1];
        const lastPart = lastNode.prop.split('-').pop();

        // remove properties of lower precedence
        const lesser = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && !(0, _isCustomProp2.default)(lastNode) && node !== lastNode && node.important === lastNode.important && getLevel(node.prop) > getLevel(lastNode.prop) && (!!~node.prop.toLowerCase().indexOf(lastNode.prop) || node.prop.toLowerCase().endsWith(lastPart)));

        lesser.forEach(_remove2.default);
        decls = decls.filter(node => !~lesser.indexOf(node));

        // get duplicate properties
        let duplicates = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && node.prop === lastNode.prop && !(!(0, _isCustomProp2.default)(node) && (0, _isCustomProp2.default)(lastNode)));

        if (duplicates.length) {
            if (/hsla\(|rgba\(/i.test(getColorValue(lastNode))) {
                const preserve = duplicates.filter(node => !/hsla\(|rgba\(/i.test(getColorValue(node))).pop();

                duplicates = duplicates.filter(node => node !== preserve);
            }

            duplicates.forEach(_remove2.default);
        }

        decls = decls.filter(node => node !== lastNode && !~duplicates.indexOf(node));
    }
}

exports.default = {
    explode,
    merge
};
module.exports = exports['default'];
}, function(modId) { var map = {"../insertCloned":1625038548092,"../parseTrbl":1625038548093,"../hasAllProps":1625038548094,"../getDecls":1625038548095,"../getRules":1625038548096,"../getValue":1625038548098,"../mergeRules":1625038548099,"../minifyTrbl":1625038548100,"../minifyWsc":1625038548101,"../canMerge":1625038548104,"../remove":1625038548106,"../trbl":1625038548107,"../isCustomProp":1625038548105,"../canExplode":1625038548108,"../getLastNode":1625038548097,"../parseWsc":1625038548102,"../validateWsc":1625038548103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548092, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = insertCloned;
function insertCloned(rule, decl, props) {
    const newNode = Object.assign(decl.clone(), props);

    rule.insertAfter(decl, newNode);

    return newNode;
};
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548093, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

exports.default = v => {
    const s = typeof v === 'string' ? _postcss.list.space(v) : v;
    return [s[0], // top
    s[1] || s[0], // right
    s[2] || s[0], // bottom
    s[3] || s[1] || s[0]];
};

module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548094, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = (rule, ...props) => {
    return props.every(p => rule.some(({ prop }) => prop && ~prop.toLowerCase().indexOf(p)));
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548095, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getDecls;
function getDecls(rule, properties) {
    return rule.nodes.filter(({ prop }) => prop && ~properties.indexOf(prop.toLowerCase()));
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548096, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getRules;

var _getLastNode = require("./getLastNode");

var _getLastNode2 = _interopRequireDefault(_getLastNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRules(props, properties) {
    return properties.map(property => {
        return (0, _getLastNode2.default)(props, property);
    }).filter(Boolean);
}
module.exports = exports["default"];
}, function(modId) { var map = {"./getLastNode":1625038548097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548097, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = (rule, prop) => {
    return rule.filter(n => n.prop && n.prop.toLowerCase() === prop).pop();
};

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548098, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = getValue;
function getValue({ value }) {
    return value;
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548099, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = mergeRules;

var _hasAllProps = require('./hasAllProps');

var _hasAllProps2 = _interopRequireDefault(_hasAllProps);

var _getDecls = require('./getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getRules = require('./getRules');

var _getRules2 = _interopRequireDefault(_getRules);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isConflictingProp(propA, propB) {
    if (!propB.prop || propB.important !== propA.important) {
        return;
    }

    const parts = propA.prop.split('-');

    return parts.some(() => {
        parts.pop();

        return parts.join('-') === propB.prop;
    });
}

function hasConflicts(match, nodes) {
    const firstNode = Math.min.apply(null, match.map(n => nodes.indexOf(n)));
    const lastNode = Math.max.apply(null, match.map(n => nodes.indexOf(n)));
    const between = nodes.slice(firstNode + 1, lastNode);

    return match.some(a => between.some(b => isConflictingProp(a, b)));
}

function mergeRules(rule, properties, callback) {
    let decls = (0, _getDecls2.default)(rule, properties);

    while (decls.length) {
        const last = decls[decls.length - 1];
        const props = decls.filter(node => node.important === last.important);
        const rules = (0, _getRules2.default)(props, properties);

        if ((0, _hasAllProps2.default)(rules, ...properties) && !hasConflicts(rules, rule.nodes)) {
            if (callback(rules, last, props)) {
                decls = decls.filter(node => !~rules.indexOf(node));
            }
        }

        decls = decls.filter(node => node !== last);
    }
}
module.exports = exports['default'];
}, function(modId) { var map = {"./hasAllProps":1625038548094,"./getDecls":1625038548095,"./getRules":1625038548096}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548100, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parseTrbl = require('./parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = v => {
    const value = (0, _parseTrbl2.default)(v);

    if (value[3] === value[1]) {
        value.pop();

        if (value[2] === value[0]) {
            value.pop();

            if (value[0] === value[1]) {
                value.pop();
            }
        }
    }

    return value.join(' ');
};

module.exports = exports['default'];
}, function(modId) { var map = {"./parseTrbl":1625038548093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548101, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parseWsc = require('./parseWsc');

var _parseWsc2 = _interopRequireDefault(_parseWsc);

var _minifyTrbl = require('./minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _validateWsc = require('./validateWsc');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaults = ['medium', 'none', 'currentcolor'];

exports.default = v => {
    const values = (0, _parseWsc2.default)(v);

    if (!(0, _validateWsc.isValidWsc)(values)) {
        return (0, _minifyTrbl2.default)(v);
    }

    const value = [...values, ''].reduceRight((prev, cur, i, arr) => {
        if (cur === undefined || cur.toLowerCase() === defaults[i] && (!i || (arr[i - 1] || '').toLowerCase() !== cur.toLowerCase())) {
            return prev;
        }

        return cur + ' ' + prev;
    }).trim();

    return (0, _minifyTrbl2.default)(value || 'none');
};

module.exports = exports['default'];
}, function(modId) { var map = {"./parseWsc":1625038548102,"./minifyTrbl":1625038548100,"./validateWsc":1625038548103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548102, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = parseWsc;

var _postcss = require('postcss');

var _validateWsc = require('./validateWsc');

const none = /^\s*(none|medium)(\s+none(\s+(none|currentcolor))?)?\s*$/i;

const varRE = /(^.*var)(.*\(.*--.*\))(.*)/i;
const varPreserveCase = p => `${p[1].toLowerCase()}${p[2]}${p[3].toLowerCase()}`;
const toLower = v => {
    const match = varRE.exec(v);
    return match ? varPreserveCase(match) : v.toLowerCase();
};

function parseWsc(value) {
    if (none.test(value)) {
        return ['medium', 'none', 'currentcolor'];
    }

    let width, style, color;

    const values = _postcss.list.space(value);

    if (values.length > 1 && (0, _validateWsc.isStyle)(values[1]) && values[0].toLowerCase() === 'none') {
        values.unshift();
        width = '0';
    }

    const unknown = [];

    values.forEach(v => {
        if ((0, _validateWsc.isStyle)(v)) {
            style = toLower(v);
        } else if ((0, _validateWsc.isWidth)(v)) {
            width = toLower(v);
        } else if ((0, _validateWsc.isColor)(v)) {
            color = toLower(v);
        } else {
            unknown.push(v);
        }
    });

    if (unknown.length) {
        if (!width && style && color) {
            width = unknown.pop();
        }

        if (width && !style && color) {
            style = unknown.pop();
        }

        if (width && style && !color) {
            color = unknown.pop();
        }
    }

    return [width, style, color];
}
module.exports = exports['default'];
}, function(modId) { var map = {"./validateWsc":1625038548103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548103, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isStyle = isStyle;
exports.isWidth = isWidth;
exports.isColor = isColor;
exports.isValidWsc = isValidWsc;

var _cssColorNames = require("css-color-names");

var _cssColorNames2 = _interopRequireDefault(_cssColorNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const widths = ["thin", "medium", "thick"];
const styles = ["none", "hidden", "dotted", "dashed", "solid", "double", "groove", "ridge", "inset", "outset"];
const colors = Object.keys(_cssColorNames2.default);

function isStyle(value) {
    return value && !!~styles.indexOf(value.toLowerCase());
}

function isWidth(value) {
    return value && !!~widths.indexOf(value.toLowerCase()) || /^(\d+(\.\d+)?|\.\d+)(\w+)?$/.test(value);
}

function isColor(value) {
    if (!value) {
        return false;
    }

    value = value.toLowerCase();

    if (/rgba?\(/.test(value)) {
        return true;
    }

    if (/hsla?\(/.test(value)) {
        return true;
    }

    if (/#([0-9a-z]{6}|[0-9a-z]{3})/.test(value)) {
        return true;
    }

    if (value === "transparent") {
        return true;
    }

    if (value === "currentcolor") {
        return true;
    }

    return !!~colors.indexOf(value);
}

function isValidWsc(wscs) {
    const validWidth = isWidth(wscs[0]);
    const validStyle = isStyle(wscs[1]);
    const validColor = isColor(wscs[2]);

    return validWidth && validStyle || validWidth && validColor || validStyle && validColor;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548104, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isCustomProp = require('./isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const important = node => node.important;
const unimportant = node => !node.important;

const hasInherit = node => node.value.toLowerCase() === 'inherit';
const hasInitial = node => node.value.toLowerCase() === 'initial';
const hasUnset = node => node.value.toLowerCase() === 'unset';

exports.default = (props, includeCustomProps = true) => {
    if (props.some(hasInherit) && !props.every(hasInherit)) {
        return false;
    }

    if (props.some(hasInitial) && !props.every(hasInitial)) {
        return false;
    }

    if (props.some(hasUnset) && !props.every(hasUnset)) {
        return false;
    }

    if (includeCustomProps && props.some(_isCustomProp2.default) && !props.every(_isCustomProp2.default)) {
        return false;
    }

    return props.every(unimportant) || props.every(important);
};

module.exports = exports['default'];
}, function(modId) { var map = {"./isCustomProp":1625038548105}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548105, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = node => ~node.value.search(/var\s*\(\s*--/i);

module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548106, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = remove;
function remove(node) {
    return node.remove();
}
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548107, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ['top', 'right', 'bottom', 'left'];
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548108, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _isCustomProp = require("./isCustomProp");

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const hasInherit = node => node.value.toLowerCase().includes("inherit");
const hasInitial = node => node.value.toLowerCase().includes("initial");
const hasUnset = node => node.value.toLowerCase().includes("unset");

exports.default = (prop, includeCustomProps = true) => {
    if (includeCustomProps && (0, _isCustomProp2.default)(prop)) {
        return false;
    }

    return !hasInherit(prop) && !hasInitial(prop) && !hasUnset(prop);
};

module.exports = exports["default"];
}, function(modId) { var map = {"./isCustomProp":1625038548105}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548109, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _postcssValueParser = require('postcss-value-parser');

var _stylehacks = require('stylehacks');

var _canMerge = require('../canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _getDecls = require('../getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _getValue = require('../getValue');

var _getValue2 = _interopRequireDefault(_getValue);

var _mergeRules = require('../mergeRules');

var _mergeRules2 = _interopRequireDefault(_mergeRules);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

var _isCustomProp = require('../isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

var _canExplode = require('../canExplode');

var _canExplode2 = _interopRequireDefault(_canExplode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const properties = ['column-width', 'column-count'];
const auto = 'auto';
const inherit = 'inherit';

/**
 * Normalize a columns shorthand definition. Both of the longhand
 * properties' initial values are 'auto', and as per the spec,
 * omitted values are set to their initial values. Thus, we can
 * remove any 'auto' definition when there are two values.
 *
 * Specification link: https://www.w3.org/TR/css3-multicol/
 */

function normalize(values) {
    if (values[0].toLowerCase() === auto) {
        return values[1];
    }

    if (values[1].toLowerCase() === auto) {
        return values[0];
    }

    if (values[0].toLowerCase() === inherit && values[1].toLowerCase() === inherit) {
        return inherit;
    }

    return values.join(' ');
}

function explode(rule) {
    rule.walkDecls(/^columns$/i, decl => {
        if (!(0, _canExplode2.default)(decl)) {
            return;
        }

        if ((0, _stylehacks.detect)(decl)) {
            return;
        }

        let values = _postcss.list.space(decl.value);

        if (values.length === 1) {
            values.push(auto);
        }

        values.forEach((value, i) => {
            let prop = properties[1];

            if (value.toLowerCase() === auto) {
                prop = properties[i];
            } else if ((0, _postcssValueParser.unit)(value).unit) {
                prop = properties[0];
            }

            (0, _insertCloned2.default)(decl.parent, decl, {
                prop,
                value
            });
        });

        decl.remove();
    });
}

function cleanup(rule) {
    let decls = (0, _getDecls2.default)(rule, ['columns'].concat(properties));

    while (decls.length) {
        const lastNode = decls[decls.length - 1];

        // remove properties of lower precedence
        const lesser = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && lastNode.prop === 'columns' && node.prop !== lastNode.prop);

        lesser.forEach(_remove2.default);
        decls = decls.filter(node => !~lesser.indexOf(node));

        // get duplicate properties
        let duplicates = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && node.prop === lastNode.prop && !(!(0, _isCustomProp2.default)(node) && (0, _isCustomProp2.default)(lastNode)));

        duplicates.forEach(_remove2.default);
        decls = decls.filter(node => node !== lastNode && !~duplicates.indexOf(node));
    }
}

function merge(rule) {
    (0, _mergeRules2.default)(rule, properties, (rules, lastNode) => {
        if ((0, _canMerge2.default)(rules) && !rules.some(_stylehacks.detect)) {
            (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                prop: 'columns',
                value: normalize(rules.map(_getValue2.default))
            });

            rules.forEach(_remove2.default);

            return true;
        }
    });

    cleanup(rule);
}

exports.default = {
    explode,
    merge
};
module.exports = exports['default'];
}, function(modId) { var map = {"../canMerge":1625038548104,"../getDecls":1625038548095,"../getValue":1625038548098,"../mergeRules":1625038548099,"../insertCloned":1625038548092,"../remove":1625038548106,"../isCustomProp":1625038548105,"../canExplode":1625038548108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548110, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boxBase = require('./boxBase');

var _boxBase2 = _interopRequireDefault(_boxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _boxBase2.default)('margin');
module.exports = exports['default'];
}, function(modId) { var map = {"./boxBase":1625038548111}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548111, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stylehacks = require('stylehacks');

var _canMerge = require('../canMerge');

var _canMerge2 = _interopRequireDefault(_canMerge);

var _getDecls = require('../getDecls');

var _getDecls2 = _interopRequireDefault(_getDecls);

var _minifyTrbl = require('../minifyTrbl');

var _minifyTrbl2 = _interopRequireDefault(_minifyTrbl);

var _parseTrbl = require('../parseTrbl');

var _parseTrbl2 = _interopRequireDefault(_parseTrbl);

var _insertCloned = require('../insertCloned');

var _insertCloned2 = _interopRequireDefault(_insertCloned);

var _mergeRules = require('../mergeRules');

var _mergeRules2 = _interopRequireDefault(_mergeRules);

var _mergeValues = require('../mergeValues');

var _mergeValues2 = _interopRequireDefault(_mergeValues);

var _remove = require('../remove');

var _remove2 = _interopRequireDefault(_remove);

var _trbl = require('../trbl');

var _trbl2 = _interopRequireDefault(_trbl);

var _isCustomProp = require('../isCustomProp');

var _isCustomProp2 = _interopRequireDefault(_isCustomProp);

var _canExplode = require('../canExplode');

var _canExplode2 = _interopRequireDefault(_canExplode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = prop => {
    const properties = _trbl2.default.map(direction => `${prop}-${direction}`);

    const cleanup = rule => {
        let decls = (0, _getDecls2.default)(rule, [prop].concat(properties));

        while (decls.length) {
            const lastNode = decls[decls.length - 1];

            // remove properties of lower precedence
            const lesser = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && lastNode.prop === prop && node.prop !== lastNode.prop);

            lesser.forEach(_remove2.default);
            decls = decls.filter(node => !~lesser.indexOf(node));

            // get duplicate properties
            let duplicates = decls.filter(node => !(0, _stylehacks.detect)(lastNode) && !(0, _stylehacks.detect)(node) && node !== lastNode && node.important === lastNode.important && node.prop === lastNode.prop && !(!(0, _isCustomProp2.default)(node) && (0, _isCustomProp2.default)(lastNode)));

            duplicates.forEach(_remove2.default);
            decls = decls.filter(node => node !== lastNode && !~duplicates.indexOf(node));
        }
    };

    const processor = {
        explode: rule => {
            rule.walkDecls(new RegExp("^" + prop + "$", "i"), decl => {
                if (!(0, _canExplode2.default)(decl)) {
                    return;
                }

                if ((0, _stylehacks.detect)(decl)) {
                    return;
                }

                const values = (0, _parseTrbl2.default)(decl.value);

                _trbl2.default.forEach((direction, index) => {
                    (0, _insertCloned2.default)(decl.parent, decl, {
                        prop: properties[index],
                        value: values[index]
                    });
                });

                decl.remove();
            });
        },
        merge: rule => {
            (0, _mergeRules2.default)(rule, properties, (rules, lastNode) => {
                if ((0, _canMerge2.default)(rules) && !rules.some(_stylehacks.detect)) {
                    (0, _insertCloned2.default)(lastNode.parent, lastNode, {
                        prop,
                        value: (0, _minifyTrbl2.default)((0, _mergeValues2.default)(...rules))
                    });
                    rules.forEach(_remove2.default);

                    return true;
                }
            });

            cleanup(rule);
        }
    };

    return processor;
};

module.exports = exports['default'];
}, function(modId) { var map = {"../canMerge":1625038548104,"../getDecls":1625038548095,"../minifyTrbl":1625038548100,"../parseTrbl":1625038548093,"../insertCloned":1625038548092,"../mergeRules":1625038548099,"../mergeValues":1625038548112,"../remove":1625038548106,"../trbl":1625038548107,"../isCustomProp":1625038548105,"../canExplode":1625038548108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548112, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _getValue = require('./getValue');

var _getValue2 = _interopRequireDefault(_getValue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (...rules) => rules.map(_getValue2.default).join(' ');

module.exports = exports['default'];
}, function(modId) { var map = {"./getValue":1625038548098}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548113, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _boxBase = require('./boxBase');

var _boxBase2 = _interopRequireDefault(_boxBase);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _boxBase2.default)('padding');
module.exports = exports['default'];
}, function(modId) { var map = {"./boxBase":1625038548111}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548089);
})()
//# sourceMappingURL=index.js.map