module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038544342, function(require, module, exports) {


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var browserslist = require('browserslist');
var postcss = require('postcss');

var Browsers = require('./browsers');
var Prefixes = require('./prefixes');

function isPlainObject(obj) {
    return Object.prototype.toString.apply(obj) === '[object Object]';
}

var cache = {};

function timeCapsule(result, prefixes) {
    if (prefixes.browsers.selected.length === 0) {
        return;
    }
    if (prefixes.add.selectors.length > 0) {
        return;
    }
    if (Object.keys(prefixes.add).length > 2) {
        return;
    }

    /* istanbul ignore next */
    result.warn('Greetings, time traveller. ' + 'We are in the golden age of prefix-less CSS, ' + 'where Autoprefixer is no longer needed for your stylesheet.');
}

module.exports = postcss.plugin('autoprefixer', function () {
    for (var _len = arguments.length, reqs = Array(_len), _key = 0; _key < _len; _key++) {
        reqs[_key] = arguments[_key];
    }

    var options = void 0;
    if (reqs.length === 1 && isPlainObject(reqs[0])) {
        options = reqs[0];
        reqs = undefined;
    } else if (reqs.length === 0 || reqs.length === 1 && !reqs[0]) {
        reqs = undefined;
    } else if (reqs.length <= 2 && (reqs[0] instanceof Array || !reqs[0])) {
        options = reqs[1];
        reqs = reqs[0];
    } else if (_typeof(reqs[reqs.length - 1]) === 'object') {
        options = reqs.pop();
    }

    if (!options) {
        options = {};
    }

    if (options.browser) {
        throw new Error('Change `browser` option to `browsers` in Autoprefixer');
    } else if (options.browserslist) {
        throw new Error('Change `browserslist` option to `browsers` in Autoprefixer');
    }

    if (options.browsers) {
        reqs = options.browsers;
    }

    if (typeof options.grid === 'undefined') {
        options.grid = false;
    }

    var loadPrefixes = function loadPrefixes(opts) {
        var data = module.exports.data;
        var browsers = new Browsers(data.browsers, reqs, opts, options.stats);
        var key = browsers.selected.join(', ') + JSON.stringify(options);

        if (!cache[key]) {
            cache[key] = new Prefixes(data.prefixes, browsers, options);
        }

        return cache[key];
    };

    var plugin = function plugin(css, result) {
        var prefixes = loadPrefixes({
            from: css.source && css.source.input.file,
            env: options.env
        });
        timeCapsule(result, prefixes);
        if (options.remove !== false) {
            prefixes.processor.remove(css, result);
        }
        if (options.add !== false) {
            prefixes.processor.add(css, result);
        }
    };

    plugin.options = options;

    plugin.browsers = reqs;

    plugin.info = function (opts) {
        opts = opts || {};
        opts.from = opts.from || process.cwd();

        return require('./info')(loadPrefixes(opts));
    };

    return plugin;
});

/**
 * Autoprefixer data
 */
module.exports.data = {
    browsers: require('caniuse-lite').agents,
    prefixes: require('../data/prefixes')
};

/**
 * Autoprefixer default browsers
 */
module.exports.defaults = browserslist.defaults;

/**
 * Inspect with default Autoprefixer
 */
module.exports.info = function () {
    return module.exports().info();
};
}, function(modId) {var map = {"./browsers":1625038544343,"./prefixes":1625038544345,"./info":1625038544406,"../data/prefixes":1625038544407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544343, function(require, module, exports) {


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var browserslist = require('browserslist');

var utils = require('./utils');

var Browsers = function () {

    /**
     * Return all prefixes for default browser data
     */
    Browsers.prefixes = function prefixes() {
        if (this.prefixesCache) {
            return this.prefixesCache;
        }

        var data = require('caniuse-lite').agents;

        this.prefixesCache = [];
        for (var name in data) {
            this.prefixesCache.push('-' + data[name].prefix + '-');
        }

        this.prefixesCache = utils.uniq(this.prefixesCache).sort(function (a, b) {
            return b.length - a.length;
        });

        return this.prefixesCache;
    };

    /**
     * Check is value contain any possibe prefix
     */


    Browsers.withPrefix = function withPrefix(value) {
        if (!this.prefixesRegexp) {
            this.prefixesRegexp = new RegExp(this.prefixes().join('|'));
        }

        return this.prefixesRegexp.test(value);
    };

    function Browsers(data, requirements, options, stats) {
        _classCallCheck(this, Browsers);

        this.data = data;
        this.options = options || {};
        this.stats = stats;
        this.selected = this.parse(requirements);
    }

    /**
     * Return browsers selected by requirements
     */


    Browsers.prototype.parse = function parse(requirements) {
        return browserslist(requirements, {
            stats: this.stats,
            path: this.options.from,
            env: this.options.env
        });
    };

    /**
     * Return prefix for selected browser
     */


    Browsers.prototype.prefix = function prefix(browser) {
        var _browser$split = browser.split(' '),
            name = _browser$split[0],
            version = _browser$split[1];

        var data = this.data[name];

        var prefix = data.prefix_exceptions && data.prefix_exceptions[version];
        if (!prefix) {
            prefix = data.prefix;
        }
        return '-' + prefix + '-';
    };

    /**
     * Is browser is selected by requirements
     */


    Browsers.prototype.isSelected = function isSelected(browser) {
        return this.selected.indexOf(browser) !== -1;
    };

    return Browsers;
}();

module.exports = Browsers;
}, function(modId) { var map = {"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544344, function(require, module, exports) {


var list = require('postcss').list;

module.exports = {

    /**
     * Throw special error, to tell beniary,
     * that this error is from Autoprefixer.
     */
    error: function error(text) {
        var err = new Error(text);
        err.autoprefixer = true;
        throw err;
    },


    /**
     * Return array, that doesn’t contain duplicates.
     */
    uniq: function uniq(array) {
        var filtered = [];
        for (var _iterator = array, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var i = _ref;

            if (filtered.indexOf(i) === -1) {
                filtered.push(i);
            }
        }
        return filtered;
    },


    /**
     * Return "-webkit-" on "-webkit- old"
     */
    removeNote: function removeNote(string) {
        if (string.indexOf(' ') === -1) {
            return string;
        }

        return string.split(' ')[0];
    },


    /**
     * Escape RegExp symbols
     */
    escapeRegexp: function escapeRegexp(string) {
        return string.replace(/[.?*+\^\$\[\]\\(){}|\-]/g, '\\$&');
    },


    /**
     * Return regexp to check, that CSS string contain word
     */
    regexp: function regexp(word) {
        var escape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        if (escape) {
            word = this.escapeRegexp(word);
        }
        return new RegExp('(^|[\\s,(])(' + word + '($|[\\s(,]))', 'gi');
    },


    /**
     * Change comma list
     */
    editList: function editList(value, callback) {
        var origin = list.comma(value);
        var changed = callback(origin, []);

        if (origin === changed) {
            return value;
        }

        var join = value.match(/,\s*/);
        join = join ? join[0] : ', ';
        return changed.join(join);
    }
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544345, function(require, module, exports) {


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Declaration = require('./declaration');
var Resolution = require('./resolution');
var Transition = require('./transition');
var Processor = require('./processor');
var Supports = require('./supports');
var Browsers = require('./browsers');
var Selector = require('./selector');
var AtRule = require('./at-rule');
var Value = require('./value');
var utils = require('./utils');

var vendor = require('postcss').vendor;

Selector.hack(require('./hacks/fullscreen'));
Selector.hack(require('./hacks/placeholder'));

Declaration.hack(require('./hacks/flex'));
Declaration.hack(require('./hacks/order'));
Declaration.hack(require('./hacks/filter'));
Declaration.hack(require('./hacks/grid-end'));
Declaration.hack(require('./hacks/animation'));
Declaration.hack(require('./hacks/flex-flow'));
Declaration.hack(require('./hacks/flex-grow'));
Declaration.hack(require('./hacks/flex-wrap'));
Declaration.hack(require('./hacks/grid-area'));
Declaration.hack(require('./hacks/grid-start'));
Declaration.hack(require('./hacks/align-self'));
Declaration.hack(require('./hacks/appearance'));
Declaration.hack(require('./hacks/flex-basis'));
Declaration.hack(require('./hacks/mask-border'));
Declaration.hack(require('./hacks/align-items'));
Declaration.hack(require('./hacks/flex-shrink'));
Declaration.hack(require('./hacks/break-props'));
Declaration.hack(require('./hacks/writing-mode'));
Declaration.hack(require('./hacks/border-image'));
Declaration.hack(require('./hacks/align-content'));
Declaration.hack(require('./hacks/border-radius'));
Declaration.hack(require('./hacks/block-logical'));
Declaration.hack(require('./hacks/grid-template'));
Declaration.hack(require('./hacks/inline-logical'));
Declaration.hack(require('./hacks/grid-row-align'));
Declaration.hack(require('./hacks/transform-decl'));
Declaration.hack(require('./hacks/flex-direction'));
Declaration.hack(require('./hacks/image-rendering'));
Declaration.hack(require('./hacks/text-decoration'));
Declaration.hack(require('./hacks/justify-content'));
Declaration.hack(require('./hacks/background-size'));
Declaration.hack(require('./hacks/grid-row-column'));
Declaration.hack(require('./hacks/grid-rows-columns'));
Declaration.hack(require('./hacks/grid-column-align'));
Declaration.hack(require('./hacks/grid-template-areas'));
Declaration.hack(require('./hacks/text-emphasis-position'));

Value.hack(require('./hacks/gradient'));
Value.hack(require('./hacks/intrinsic'));
Value.hack(require('./hacks/pixelated'));
Value.hack(require('./hacks/image-set'));
Value.hack(require('./hacks/cross-fade'));
Value.hack(require('./hacks/display-flex'));
Value.hack(require('./hacks/display-grid'));
Value.hack(require('./hacks/filter-value'));

var declsCache = {};

var Prefixes = function () {
    function Prefixes(data, browsers) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, Prefixes);

        this.data = data;
        this.browsers = browsers;
        this.options = options;

        var _preprocess = this.preprocess(this.select(this.data));

        this.add = _preprocess[0];
        this.remove = _preprocess[1];

        this.transition = new Transition(this);
        this.processor = new Processor(this);
    }

    /**
     * Return clone instance to remove all prefixes
     */


    Prefixes.prototype.cleaner = function cleaner() {
        if (this.cleanerCache) {
            return this.cleanerCache;
        }

        if (this.browsers.selected.length) {
            var empty = new Browsers(this.browsers.data, []);
            this.cleanerCache = new Prefixes(this.data, empty, this.options);
        } else {
            return this;
        }

        return this.cleanerCache;
    };

    /**
     * Select prefixes from data, which is necessary for selected browsers
     */


    Prefixes.prototype.select = function select(list) {
        var _this = this;

        var selected = { add: {}, remove: {} };

        var _loop = function _loop(name) {
            var data = list[name];
            var add = data.browsers.map(function (i) {
                var params = i.split(' ');
                return {
                    browser: params[0] + ' ' + params[1],
                    note: params[2]
                };
            });

            var notes = add.filter(function (i) {
                return i.note;
            }).map(function (i) {
                return _this.browsers.prefix(i.browser) + ' ' + i.note;
            });
            notes = utils.uniq(notes);

            add = add.filter(function (i) {
                return _this.browsers.isSelected(i.browser);
            }).map(function (i) {
                var prefix = _this.browsers.prefix(i.browser);
                if (i.note) {
                    return prefix + ' ' + i.note;
                } else {
                    return prefix;
                }
            });
            add = _this.sort(utils.uniq(add));

            if (_this.options.flexbox === 'no-2009') {
                add = add.filter(function (i) {
                    return i.indexOf('2009') === -1;
                });
            }

            var all = data.browsers.map(function (i) {
                return _this.browsers.prefix(i);
            });
            if (data.mistakes) {
                all = all.concat(data.mistakes);
            }
            all = all.concat(notes);
            all = utils.uniq(all);

            if (add.length) {
                selected.add[name] = add;
                if (add.length < all.length) {
                    selected.remove[name] = all.filter(function (i) {
                        return add.indexOf(i) === -1;
                    });
                }
            } else {
                selected.remove[name] = all;
            }
        };

        for (var name in list) {
            _loop(name);
        }

        return selected;
    };

    /**
     * Sort vendor prefixes
     */


    Prefixes.prototype.sort = function sort(prefixes) {
        return prefixes.sort(function (a, b) {
            var aLength = utils.removeNote(a).length;
            var bLength = utils.removeNote(b).length;

            if (aLength === bLength) {
                return b.length - a.length;
            } else {
                return bLength - aLength;
            }
        });
    };

    /**
     * Cache prefixes data to fast CSS processing
     */


    Prefixes.prototype.preprocess = function preprocess(selected) {
        var add = {
            'selectors': [],
            '@supports': new Supports(Prefixes, this)
        };
        for (var name in selected.add) {
            var prefixes = selected.add[name];
            if (name === '@keyframes' || name === '@viewport') {
                add[name] = new AtRule(name, prefixes, this);
            } else if (name === '@resolution') {
                add[name] = new Resolution(name, prefixes, this);
            } else if (this.data[name].selector) {
                add.selectors.push(Selector.load(name, prefixes, this));
            } else {
                var props = this.data[name].props;

                if (props) {
                    var value = Value.load(name, prefixes, this);
                    for (var _iterator = props, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var prop = _ref;

                        if (!add[prop]) {
                            add[prop] = { values: [] };
                        }
                        add[prop].values.push(value);
                    }
                } else {
                    var values = add[name] && add[name].values || [];
                    add[name] = Declaration.load(name, prefixes, this);
                    add[name].values = values;
                }
            }
        }

        var remove = { selectors: [] };
        for (var _name in selected.remove) {
            var _prefixes = selected.remove[_name];
            if (this.data[_name].selector) {
                var selector = Selector.load(_name, _prefixes);
                for (var _iterator2 = _prefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                    var _ref2;

                    if (_isArray2) {
                        if (_i2 >= _iterator2.length) break;
                        _ref2 = _iterator2[_i2++];
                    } else {
                        _i2 = _iterator2.next();
                        if (_i2.done) break;
                        _ref2 = _i2.value;
                    }

                    var prefix = _ref2;

                    remove.selectors.push(selector.old(prefix));
                }
            } else if (_name === '@keyframes' || _name === '@viewport') {
                for (var _iterator3 = _prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }

                    var _prefix = _ref3;

                    var prefixed = '@' + _prefix + _name.slice(1);
                    remove[prefixed] = { remove: true };
                }
            } else if (_name === '@resolution') {
                remove[_name] = new Resolution(_name, _prefixes, this);
            } else {
                var _props = this.data[_name].props;
                if (_props) {
                    var _value = Value.load(_name, [], this);
                    for (var _iterator4 = _prefixes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                        var _ref4;

                        if (_isArray4) {
                            if (_i4 >= _iterator4.length) break;
                            _ref4 = _iterator4[_i4++];
                        } else {
                            _i4 = _iterator4.next();
                            if (_i4.done) break;
                            _ref4 = _i4.value;
                        }

                        var _prefix2 = _ref4;

                        var old = _value.old(_prefix2);
                        if (old) {
                            for (var _iterator5 = _props, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                                var _ref5;

                                if (_isArray5) {
                                    if (_i5 >= _iterator5.length) break;
                                    _ref5 = _iterator5[_i5++];
                                } else {
                                    _i5 = _iterator5.next();
                                    if (_i5.done) break;
                                    _ref5 = _i5.value;
                                }

                                var _prop = _ref5;

                                if (!remove[_prop]) {
                                    remove[_prop] = {};
                                }
                                if (!remove[_prop].values) {
                                    remove[_prop].values = [];
                                }
                                remove[_prop].values.push(old);
                            }
                        }
                    }
                } else {
                    for (var _iterator6 = _prefixes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
                        var _ref6;

                        if (_isArray6) {
                            if (_i6 >= _iterator6.length) break;
                            _ref6 = _iterator6[_i6++];
                        } else {
                            _i6 = _iterator6.next();
                            if (_i6.done) break;
                            _ref6 = _i6.value;
                        }

                        var _prefix3 = _ref6;

                        var olds = this.decl(_name).old(_name, _prefix3);
                        if (_name === 'align-self') {
                            var a = add[_name] && add[_name].prefixes;
                            if (a) {
                                if (_prefix3 === '-webkit- 2009' && a.indexOf('-webkit-') !== -1) {
                                    continue;
                                } else if (_prefix3 === '-webkit-' && a.indexOf('-webkit- 2009') !== -1) {
                                    continue;
                                }
                            }
                        }
                        for (var _iterator7 = olds, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
                            var _ref7;

                            if (_isArray7) {
                                if (_i7 >= _iterator7.length) break;
                                _ref7 = _iterator7[_i7++];
                            } else {
                                _i7 = _iterator7.next();
                                if (_i7.done) break;
                                _ref7 = _i7.value;
                            }

                            var _prefixed = _ref7;

                            if (!remove[_prefixed]) {
                                remove[_prefixed] = {};
                            }
                            remove[_prefixed].remove = true;
                        }
                    }
                }
            }
        }

        return [add, remove];
    };

    /**
     * Declaration loader with caching
     */


    Prefixes.prototype.decl = function decl(prop) {
        var decl = declsCache[prop];

        if (decl) {
            return decl;
        } else {
            declsCache[prop] = Declaration.load(prop);
            return declsCache[prop];
        }
    };

    /**
     * Return unprefixed version of property
     */


    Prefixes.prototype.unprefixed = function unprefixed(prop) {
        var value = this.normalize(vendor.unprefixed(prop));
        if (value === 'flex-direction') {
            value = 'flex-flow';
        }
        return value;
    };

    /**
     * Normalize prefix for remover
     */


    Prefixes.prototype.normalize = function normalize(prop) {
        return this.decl(prop).normalize(prop);
    };

    /**
     * Return prefixed version of property
     */


    Prefixes.prototype.prefixed = function prefixed(prop, prefix) {
        prop = vendor.unprefixed(prop);
        return this.decl(prop).prefixed(prop, prefix);
    };

    /**
     * Return values, which must be prefixed in selected property
     */


    Prefixes.prototype.values = function values(type, prop) {
        var data = this[type];

        var global = data['*'] && data['*'].values;
        var values = data[prop] && data[prop].values;

        if (global && values) {
            return utils.uniq(global.concat(values));
        } else {
            return global || values || [];
        }
    };

    /**
     * Group declaration by unprefixed property to check them
     */


    Prefixes.prototype.group = function group(decl) {
        var _this2 = this;

        var rule = decl.parent;
        var index = rule.index(decl);
        var length = rule.nodes.length;

        var unprefixed = this.unprefixed(decl.prop);

        var checker = function checker(step, callback) {
            index += step;
            while (index >= 0 && index < length) {
                var other = rule.nodes[index];
                if (other.type === 'decl') {

                    if (step === -1 && other.prop === unprefixed) {
                        if (!Browsers.withPrefix(other.value)) {
                            break;
                        }
                    }

                    if (_this2.unprefixed(other.prop) !== unprefixed) {
                        break;
                    } else if (callback(other) === true) {
                        return true;
                    }

                    if (step === +1 && other.prop === unprefixed) {
                        if (!Browsers.withPrefix(other.value)) {
                            break;
                        }
                    }
                }

                index += step;
            }
            return false;
        };

        return {
            up: function up(callback) {
                return checker(-1, callback);
            },
            down: function down(callback) {
                return checker(+1, callback);
            }
        };
    };

    return Prefixes;
}();

module.exports = Prefixes;
}, function(modId) { var map = {"./declaration":1625038544346,"./resolution":1625038544348,"./transition":1625038544349,"./processor":1625038544350,"./supports":1625038544353,"./browsers":1625038544343,"./selector":1625038544355,"./at-rule":1625038544357,"./value":1625038544351,"./utils":1625038544344,"./hacks/fullscreen":1625038544358,"./hacks/placeholder":1625038544359,"./hacks/flex":1625038544360,"./hacks/order":1625038544362,"./hacks/filter":1625038544363,"./hacks/grid-end":1625038544364,"./hacks/animation":1625038544365,"./hacks/flex-flow":1625038544366,"./hacks/flex-grow":1625038544367,"./hacks/flex-wrap":1625038544368,"./hacks/grid-area":1625038544369,"./hacks/grid-start":1625038544371,"./hacks/align-self":1625038544372,"./hacks/appearance":1625038544373,"./hacks/flex-basis":1625038544374,"./hacks/mask-border":1625038544375,"./hacks/align-items":1625038544376,"./hacks/flex-shrink":1625038544377,"./hacks/break-props":1625038544378,"./hacks/writing-mode":1625038544379,"./hacks/border-image":1625038544380,"./hacks/align-content":1625038544381,"./hacks/border-radius":1625038544382,"./hacks/block-logical":1625038544383,"./hacks/grid-template":1625038544384,"./hacks/inline-logical":1625038544385,"./hacks/grid-row-align":1625038544386,"./hacks/transform-decl":1625038544387,"./hacks/flex-direction":1625038544388,"./hacks/image-rendering":1625038544389,"./hacks/text-decoration":1625038544390,"./hacks/justify-content":1625038544391,"./hacks/background-size":1625038544392,"./hacks/grid-row-column":1625038544393,"./hacks/grid-rows-columns":1625038544394,"./hacks/grid-column-align":1625038544395,"./hacks/grid-template-areas":1625038544396,"./hacks/text-emphasis-position":1625038544397,"./hacks/gradient":1625038544398,"./hacks/intrinsic":1625038544399,"./hacks/pixelated":1625038544400,"./hacks/image-set":1625038544401,"./hacks/cross-fade":1625038544402,"./hacks/display-flex":1625038544403,"./hacks/display-grid":1625038544404,"./hacks/filter-value":1625038544405}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544346, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');
var Browsers = require('./browsers');
var utils = require('./utils');

var Declaration = function (_Prefixer) {
    _inherits(Declaration, _Prefixer);

    function Declaration() {
        _classCallCheck(this, Declaration);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Always true, because we already get prefixer by property name
     */
    Declaration.prototype.check = function check() /* decl */{
        return true;
    };

    /**
     * Return prefixed version of property
     */


    Declaration.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + prop;
    };

    /**
     * Return unprefixed version of property
     */


    Declaration.prototype.normalize = function normalize(prop) {
        return prop;
    };

    /**
     * Check `value`, that it contain other prefixes, rather than `prefix`
     */


    Declaration.prototype.otherPrefixes = function otherPrefixes(value, prefix) {
        for (var _iterator = Browsers.prefixes(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var other = _ref;

            if (other === prefix) {
                continue;
            }
            if (value.indexOf(other) !== -1) {
                return true;
            }
        }
        return false;
    };

    /**
     * Set prefix to declaration
     */


    Declaration.prototype.set = function set(decl, prefix) {
        decl.prop = this.prefixed(decl.prop, prefix);
        return decl;
    };

    /**
     * Should we use visual cascade for prefixes
     */


    Declaration.prototype.needCascade = function needCascade(decl) {
        if (!decl._autoprefixerCascade) {
            decl._autoprefixerCascade = this.all.options.cascade !== false && decl.raw('before').indexOf('\n') !== -1;
        }
        return decl._autoprefixerCascade;
    };

    /**
     * Return maximum length of possible prefixed property
     */


    Declaration.prototype.maxPrefixed = function maxPrefixed(prefixes, decl) {
        if (decl._autoprefixerMax) {
            return decl._autoprefixerMax;
        }

        var max = 0;
        for (var _iterator2 = prefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var prefix = _ref2;

            prefix = utils.removeNote(prefix);
            if (prefix.length > max) {
                max = prefix.length;
            }
        }
        decl._autoprefixerMax = max;

        return decl._autoprefixerMax;
    };

    /**
     * Calculate indentation to create visual cascade
     */


    Declaration.prototype.calcBefore = function calcBefore(prefixes, decl) {
        var prefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

        var max = this.maxPrefixed(prefixes, decl);
        var diff = max - utils.removeNote(prefix).length;

        var before = decl.raw('before');
        if (diff > 0) {
            before += Array(diff).fill(' ').join('');
        }

        return before;
    };

    /**
     * Remove visual cascade
     */


    Declaration.prototype.restoreBefore = function restoreBefore(decl) {
        var lines = decl.raw('before').split('\n');
        var min = lines[lines.length - 1];

        this.all.group(decl).up(function (prefixed) {
            var array = prefixed.raw('before').split('\n');
            var last = array[array.length - 1];
            if (last.length < min.length) {
                min = last;
            }
        });

        lines[lines.length - 1] = min;
        decl.raws.before = lines.join('\n');
    };

    /**
     * Clone and insert new declaration
     */


    Declaration.prototype.insert = function insert(decl, prefix, prefixes) {
        var cloned = this.set(this.clone(decl), prefix);
        if (!cloned) return undefined;

        var already = decl.parent.some(function (i) {
            return i.prop === cloned.prop && i.value === cloned.value;
        });
        if (already) {
            return undefined;
        }

        if (this.needCascade(decl)) {
            cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
        }
        return decl.parent.insertBefore(decl, cloned);
    };

    /**
     * Did this declaration has this prefix above
     */


    Declaration.prototype.isAlready = function isAlready(decl, prefixed) {
        var already = this.all.group(decl).up(function (i) {
            return i.prop === prefixed;
        });
        if (!already) {
            already = this.all.group(decl).down(function (i) {
                return i.prop === prefixed;
            });
        }
        return already;
    };

    /**
     * Clone and add prefixes for declaration
     */


    Declaration.prototype.add = function add(decl, prefix, prefixes, result) {
        var prefixed = this.prefixed(decl.prop, prefix);
        if (this.isAlready(decl, prefixed) || this.otherPrefixes(decl.value, prefix)) {
            return undefined;
        }
        return this.insert(decl, prefix, prefixes, result);
    };

    /**
     * Add spaces for visual cascade
     */


    Declaration.prototype.process = function process(decl, result) {
        if (!this.needCascade(decl)) {
            _Prefixer.prototype.process.call(this, decl, result);
            return;
        }

        var prefixes = _Prefixer.prototype.process.call(this, decl, result);

        if (!prefixes || !prefixes.length) {
            return;
        }

        this.restoreBefore(decl);
        decl.raws.before = this.calcBefore(prefixes, decl);
    };

    /**
     * Return list of prefixed properties to clean old prefixes
     */


    Declaration.prototype.old = function old(prop, prefix) {
        return [this.prefixed(prop, prefix)];
    };

    return Declaration;
}(Prefixer);

module.exports = Declaration;
}, function(modId) { var map = {"./prefixer":1625038544347,"./browsers":1625038544343,"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544347, function(require, module, exports) {


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Browsers = require('./browsers');
var utils = require('./utils');

var vendor = require('postcss').vendor;

/**
 * Recursivly clone objects
 */
function _clone(obj, parent) {
    var cloned = new obj.constructor();

    for (var _iterator = Object.keys(obj || {}), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var i = _ref;

        var value = obj[i];
        if (i === 'parent' && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
            if (parent) {
                cloned[i] = parent;
            }
        } else if (i === 'source' || i === null) {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (x) {
                return _clone(x, cloned);
            });
        } else if (i !== '_autoprefixerPrefix' && i !== '_autoprefixerValues') {
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
                value = _clone(value, cloned);
            }
            cloned[i] = value;
        }
    }

    return cloned;
}

var Prefixer = function () {

    /**
     * Add hack to selected names
     */
    Prefixer.hack = function hack(klass) {
        var _this = this;

        if (!this.hacks) {
            this.hacks = {};
        }
        return klass.names.map(function (name) {
            _this.hacks[name] = klass;
            return _this.hacks[name];
        });
    };

    /**
     * Load hacks for some names
     */


    Prefixer.load = function load(name, prefixes, all) {
        var Klass = this.hacks && this.hacks[name];
        if (Klass) {
            return new Klass(name, prefixes, all);
        } else {
            return new this(name, prefixes, all);
        }
    };

    /**
     * Clone node and clean autprefixer custom caches
     */


    Prefixer.clone = function clone(node, overrides) {
        var cloned = _clone(node);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    function Prefixer(name, prefixes, all) {
        _classCallCheck(this, Prefixer);

        this.name = name;
        this.prefixes = prefixes;
        this.all = all;
    }

    /**
     * Find prefix in node parents
     */


    Prefixer.prototype.parentPrefix = function parentPrefix(node) {
        var prefix = void 0;

        if (typeof node._autoprefixerPrefix !== 'undefined') {
            prefix = node._autoprefixerPrefix;
        } else if (node.type === 'decl' && node.prop[0] === '-') {
            prefix = vendor.prefix(node.prop);
        } else if (node.type === 'root') {
            prefix = false;
        } else if (node.type === 'rule' && node.selector.indexOf(':-') !== -1 && /:(-\w+-)/.test(node.selector)) {
            prefix = node.selector.match(/:(-\w+-)/)[1];
        } else if (node.type === 'atrule' && node.name[0] === '-') {
            prefix = vendor.prefix(node.name);
        } else {
            prefix = this.parentPrefix(node.parent);
        }

        if (Browsers.prefixes().indexOf(prefix) === -1) {
            prefix = false;
        }

        node._autoprefixerPrefix = prefix;

        return node._autoprefixerPrefix;
    };

    /**
     * Clone node with prefixes
     */


    Prefixer.prototype.process = function process(node, result) {
        if (!this.check(node)) {
            return undefined;
        }

        var parent = this.parentPrefix(node);

        var prefixes = this.prefixes.filter(function (prefix) {
            return !parent || parent === utils.removeNote(prefix);
        });

        var added = [];
        for (var _iterator2 = prefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var prefix = _ref2;

            if (this.add(node, prefix, added.concat([prefix]), result)) {
                added.push(prefix);
            }
        }

        return added;
    };

    /**
     * Shortcut for Prefixer.clone
     */


    Prefixer.prototype.clone = function clone(node, overrides) {
        return Prefixer.clone(node, overrides);
    };

    return Prefixer;
}();

module.exports = Prefixer;
}, function(modId) { var map = {"./browsers":1625038544343,"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544348, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');
var utils = require('./utils');

var n2f = require('num2fraction');

var regexp = /(min|max)-resolution\s*:\s*\d*\.?\d+(dppx|dpi)/gi;
var split = /(min|max)-resolution(\s*:\s*)(\d*\.?\d+)(dppx|dpi)/i;

var Resolution = function (_Prefixer) {
    _inherits(Resolution, _Prefixer);

    function Resolution() {
        _classCallCheck(this, Resolution);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Return prefixed query name
     */
    Resolution.prototype.prefixName = function prefixName(prefix, name) {
        var newName = prefix === '-moz-' ? name + '--moz-device-pixel-ratio' : prefix + name + '-device-pixel-ratio';
        return newName;
    };

    /**
     * Return prefixed query
     */


    Resolution.prototype.prefixQuery = function prefixQuery(prefix, name, colon, value, units) {
        if (units === 'dpi') {
            value = Number(value / 96);
        }
        if (prefix === '-o-') {
            value = n2f(value);
        }
        return this.prefixName(prefix, name) + colon + value;
    };

    /**
     * Remove prefixed queries
     */


    Resolution.prototype.clean = function clean(rule) {
        var _this2 = this;

        if (!this.bad) {
            this.bad = [];
            for (var _iterator = this.prefixes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var prefix = _ref;

                this.bad.push(this.prefixName(prefix, 'min'));
                this.bad.push(this.prefixName(prefix, 'max'));
            }
        }

        rule.params = utils.editList(rule.params, function (queries) {
            return queries.filter(function (query) {
                return _this2.bad.every(function (i) {
                    return query.indexOf(i) === -1;
                });
            });
        });
    };

    /**
     * Add prefixed queries
     */


    Resolution.prototype.process = function process(rule) {
        var _this3 = this;

        var parent = this.parentPrefix(rule);
        var prefixes = parent ? [parent] : this.prefixes;

        rule.params = utils.editList(rule.params, function (origin, prefixed) {
            for (var _iterator2 = origin, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var query = _ref2;

                if (query.indexOf('min-resolution') === -1 && query.indexOf('max-resolution') === -1) {
                    prefixed.push(query);
                    continue;
                }

                var _loop = function _loop(prefix) {
                    var processed = query.replace(regexp, function (str) {
                        var parts = str.match(split);
                        return _this3.prefixQuery(prefix, parts[1], parts[2], parts[3], parts[4]);
                    });
                    prefixed.push(processed);
                };

                for (var _iterator3 = prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                    var _ref3;

                    if (_isArray3) {
                        if (_i3 >= _iterator3.length) break;
                        _ref3 = _iterator3[_i3++];
                    } else {
                        _i3 = _iterator3.next();
                        if (_i3.done) break;
                        _ref3 = _i3.value;
                    }

                    var prefix = _ref3;

                    _loop(prefix);
                }
                prefixed.push(query);
            }

            return utils.uniq(prefixed);
        });
    };

    return Resolution;
}(Prefixer);

module.exports = Resolution;
}, function(modId) { var map = {"./prefixer":1625038544347,"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544349, function(require, module, exports) {


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var parser = require('postcss-value-parser');
var vendor = require('postcss').vendor;
var list = require('postcss').list;

var Transition = function () {
    function Transition(prefixes) {
        _classCallCheck(this, Transition);

        Object.defineProperty(this, 'props', {
            enumerable: true,
            writable: true,
            value: ['transition', 'transition-property']
        });

        this.prefixes = prefixes;
    }

    /**
     * Process transition and add prefies for all necessary properties
     */


    Transition.prototype.add = function add(decl, result) {
        var _this = this;

        var prefix = void 0,
            prop = void 0;
        var declPrefixes = this.prefixes.add[decl.prop] && this.prefixes.add[decl.prop].prefixes || [];

        var params = this.parse(decl.value);
        var names = params.map(function (i) {
            return _this.findProp(i);
        });
        var added = [];

        if (names.some(function (i) {
            return i[0] === '-';
        })) {
            return;
        }

        for (var _iterator = params, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var param = _ref;

            prop = this.findProp(param);
            if (prop[0] === '-') continue;

            var prefixer = this.prefixes.add[prop];
            if (!prefixer || !prefixer.prefixes) continue;

            for (var _iterator3 = prefixer.prefixes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    prefix = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    prefix = _i3.value;
                }

                var prefixed = this.prefixes.prefixed(prop, prefix);
                if (prefixed !== '-ms-transform' && names.indexOf(prefixed) === -1) {
                    if (!this.disabled(prop, prefix)) {
                        added.push(this.clone(prop, prefixed, param));
                    }
                }
            }
        }

        params = params.concat(added);
        var value = this.stringify(params);

        var webkitClean = this.stringify(this.cleanFromUnprefixed(params, '-webkit-'));
        if (declPrefixes.indexOf('-webkit-') !== -1) {
            this.cloneBefore(decl, '-webkit-' + decl.prop, webkitClean);
        }
        this.cloneBefore(decl, decl.prop, webkitClean);
        if (declPrefixes.indexOf('-o-') !== -1) {
            var operaClean = this.stringify(this.cleanFromUnprefixed(params, '-o-'));
            this.cloneBefore(decl, '-o-' + decl.prop, operaClean);
        }

        for (var _iterator2 = declPrefixes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                prefix = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                prefix = _i2.value;
            }

            if (prefix !== '-webkit-' && prefix !== '-o-') {
                var prefixValue = this.stringify(this.cleanOtherPrefixes(params, prefix));
                this.cloneBefore(decl, prefix + decl.prop, prefixValue);
            }
        }

        if (value !== decl.value && !this.already(decl, decl.prop, value)) {
            this.checkForWarning(result, decl);
            decl.cloneBefore();
            decl.value = value;
        }
    };

    /**
     * Find property name
     */


    Transition.prototype.findProp = function findProp(param) {
        var prop = param[0].value;
        if (/^\d/.test(prop)) {
            for (var i = 0; i < param.length; i++) {
                var token = param[i];
                if (i !== 0 && token.type === 'word') {
                    return token.value;
                }
            }
        }
        return prop;
    };

    /**
     * Does we aready have this declaration
     */


    Transition.prototype.already = function already(decl, prop, value) {
        return decl.parent.some(function (i) {
            return i.prop === prop && i.value === value;
        });
    };

    /**
     * Add declaration if it is not exist
     */


    Transition.prototype.cloneBefore = function cloneBefore(decl, prop, value) {
        if (!this.already(decl, prop, value)) {
            decl.cloneBefore({ prop: prop, value: value });
        }
    };

    /**
     * Show transition-property warning
     */


    Transition.prototype.checkForWarning = function checkForWarning(result, decl) {
        if (decl.prop !== 'transition-property') {
            return;
        }

        decl.parent.each(function (i) {
            if (i.type !== 'decl') {
                return undefined;
            }
            if (i.prop.indexOf('transition-') !== 0) {
                return undefined;
            }
            if (i.prop === 'transition-property') {
                return undefined;
            }

            if (list.comma(i.value).length > 1) {
                decl.warn(result, 'Replace transition-property to transition, ' + 'because Autoprefixer could not support ' + 'any cases of transition-property ' + 'and other transition-*');
            }
            return false;
        });
    };

    /**
     * Process transition and remove all unnecessary properties
     */


    Transition.prototype.remove = function remove(decl) {
        var _this2 = this;

        var params = this.parse(decl.value);
        params = params.filter(function (i) {
            var prop = _this2.prefixes.remove[_this2.findProp(i)];
            return !prop || !prop.remove;
        });
        var value = this.stringify(params);

        if (decl.value === value) {
            return;
        }

        if (params.length === 0) {
            decl.remove();
            return;
        }

        var double = decl.parent.some(function (i) {
            return i.prop === decl.prop && i.value === value;
        });
        var smaller = decl.parent.some(function (i) {
            return i !== decl && i.prop === decl.prop && i.value.length > value.length;
        });

        if (double || smaller) {
            decl.remove();
            return;
        }

        decl.value = value;
    };

    /**
     * Parse properties list to array
     */


    Transition.prototype.parse = function parse(value) {
        var ast = parser(value);
        var result = [];
        var param = [];
        for (var _iterator4 = ast.nodes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref2 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref2 = _i4.value;
            }

            var node = _ref2;

            param.push(node);
            if (node.type === 'div' && node.value === ',') {
                result.push(param);
                param = [];
            }
        }
        result.push(param);
        return result.filter(function (i) {
            return i.length > 0;
        });
    };

    /**
     * Return properties string from array
     */


    Transition.prototype.stringify = function stringify(params) {
        if (params.length === 0) {
            return '';
        }
        var nodes = [];
        for (var _iterator5 = params, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray5) {
                if (_i5 >= _iterator5.length) break;
                _ref3 = _iterator5[_i5++];
            } else {
                _i5 = _iterator5.next();
                if (_i5.done) break;
                _ref3 = _i5.value;
            }

            var param = _ref3;

            if (param[param.length - 1].type !== 'div') {
                param.push(this.div(params));
            }
            nodes = nodes.concat(param);
        }
        if (nodes[0].type === 'div') {
            nodes = nodes.slice(1);
        }
        if (nodes[nodes.length - 1].type === 'div') {
            nodes = nodes.slice(0, +-2 + 1 || undefined);
        }
        return parser.stringify({ nodes: nodes });
    };

    /**
     * Return new param array with different name
     */


    Transition.prototype.clone = function clone(origin, name, param) {
        var result = [];
        var changed = false;
        for (var _iterator6 = param, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref4 = _iterator6[_i6++];
            } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref4 = _i6.value;
            }

            var i = _ref4;

            if (!changed && i.type === 'word' && i.value === origin) {
                result.push({ type: 'word', value: name });
                changed = true;
            } else {
                result.push(i);
            }
        }
        return result;
    };

    /**
     * Find or create seperator
     */


    Transition.prototype.div = function div(params) {
        for (var _iterator7 = params, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
            var _ref5;

            if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref5 = _iterator7[_i7++];
            } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref5 = _i7.value;
            }

            var param = _ref5;

            for (var _iterator8 = param, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
                var _ref6;

                if (_isArray8) {
                    if (_i8 >= _iterator8.length) break;
                    _ref6 = _iterator8[_i8++];
                } else {
                    _i8 = _iterator8.next();
                    if (_i8.done) break;
                    _ref6 = _i8.value;
                }

                var node = _ref6;

                if (node.type === 'div' && node.value === ',') {
                    return node;
                }
            }
        }
        return { type: 'div', value: ',', after: ' ' };
    };

    Transition.prototype.cleanOtherPrefixes = function cleanOtherPrefixes(params, prefix) {
        var _this3 = this;

        return params.filter(function (param) {
            var current = vendor.prefix(_this3.findProp(param));
            return current === '' || current === prefix;
        });
    };

    /**
     * Remove all non-webkit prefixes and unprefixed params if we have prefixed
     */


    Transition.prototype.cleanFromUnprefixed = function cleanFromUnprefixed(params, prefix) {
        var _this4 = this;

        var remove = params.map(function (i) {
            return _this4.findProp(i);
        }).filter(function (i) {
            return i.slice(0, prefix.length) === prefix;
        }).map(function (i) {
            return _this4.prefixes.unprefixed(i);
        });

        var result = [];
        for (var _iterator9 = params, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
            var _ref7;

            if (_isArray9) {
                if (_i9 >= _iterator9.length) break;
                _ref7 = _iterator9[_i9++];
            } else {
                _i9 = _iterator9.next();
                if (_i9.done) break;
                _ref7 = _i9.value;
            }

            var param = _ref7;

            var prop = this.findProp(param);
            var p = vendor.prefix(prop);
            if (remove.indexOf(prop) === -1 && (p === prefix || p === '')) {
                result.push(param);
            }
        }
        return result;
    };

    /**
     * Check property for disabled by option
     */


    Transition.prototype.disabled = function disabled(prop, prefix) {
        var other = ['order', 'justify-content', 'align-self', 'align-content'];
        if (prop.indexOf('flex') !== -1 || other.indexOf(prop) !== -1) {
            if (this.prefixes.options.flexbox === false) {
                return true;
            }

            if (this.prefixes.options.flexbox === 'no-2009') {
                return prefix.indexOf('2009') !== -1;
            }
        }
        return undefined;
    };

    return Transition;
}();

module.exports = Transition;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544350, function(require, module, exports) {


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Value = require('./value');

var OLD_LINEAR = /(^|[^-])linear-gradient\(\s*(top|left|right|bottom)/i;
var OLD_RADIAL = /(^|[^-])radial-gradient\(\s*\d+(\w*|%)\s+\d+(\w*|%)\s*,/i;

var SIZES = ['width', 'height', 'min-width', 'max-width', 'min-height', 'max-height', 'inline-size', 'min-inline-size', 'max-inline-size', 'block-size', 'min-block-size', 'max-block-size'];

var Processor = function () {
    function Processor(prefixes) {
        _classCallCheck(this, Processor);

        this.prefixes = prefixes;
    }

    /**
     * Add necessary prefixes
     */


    Processor.prototype.add = function add(css, result) {
        var _this = this;

        // At-rules
        var resolution = this.prefixes.add['@resolution'];
        var keyframes = this.prefixes.add['@keyframes'];
        var viewport = this.prefixes.add['@viewport'];
        var supports = this.prefixes.add['@supports'];

        css.walkAtRules(function (rule) {
            if (rule.name === 'keyframes') {
                if (!_this.disabled(rule, result)) {
                    return keyframes && keyframes.process(rule);
                }
            } else if (rule.name === 'viewport') {
                if (!_this.disabled(rule, result)) {
                    return viewport && viewport.process(rule);
                }
            } else if (rule.name === 'supports') {
                if (_this.prefixes.options.supports !== false && !_this.disabled(rule, result)) {
                    return supports.process(rule);
                }
            } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1) {
                if (!_this.disabled(rule, result)) {
                    return resolution && resolution.process(rule);
                }
            }

            return undefined;
        });

        // Selectors
        css.walkRules(function (rule) {
            if (_this.disabled(rule, result)) return undefined;

            return _this.prefixes.add.selectors.map(function (selector) {
                return selector.process(rule, result);
            });
        });

        css.walkDecls(function (decl) {
            if (_this.disabledDecl(decl, result)) return undefined;

            if (decl.prop === 'display' && decl.value === 'box') {
                result.warn('You should write display: flex by final spec ' + 'instead of display: box', { node: decl });
                return undefined;
            }
            if (decl.value.indexOf('linear-gradient') !== -1) {
                if (OLD_LINEAR.test(decl.value)) {
                    result.warn('Gradient has outdated direction syntax. ' + 'New syntax is like `to left` instead of `right`.', { node: decl });
                }
            }
            if (decl.value.indexOf('radial-gradient') !== -1) {
                if (OLD_RADIAL.test(decl.value)) {
                    result.warn('Gradient has outdated direction syntax. ' + 'New syntax is like `closest-side at 0 0` ' + 'instead of `0 0, closest-side`.', { node: decl });
                } else if (/[^-]cover/.test(decl.value)) {
                    result.warn('Gradient has outdated direction syntax. ' + 'Replace `cover` to `farthest-corner`.', { node: decl });
                } else if (/[^-]contain/.test(decl.value)) {
                    result.warn('Gradient has outdated direction syntax. ' + 'Replace `contain` to `closest-side`.', { node: decl });
                }
            }
            if (decl.prop === 'text-emphasis-position') {
                if (decl.value === 'under' || decl.value === 'over') {
                    result.warn('You should use 2 values for text-emphasis-position ' + 'For example, `under left` instead of just `under`.', { node: decl });
                }
            }

            if (SIZES.indexOf(decl.prop) !== -1) {
                if (decl.value.indexOf('fill-available') !== -1) {
                    result.warn('Replace fill-available to stretch, ' + 'because spec had been changed', { node: decl });
                } else if (decl.value.indexOf('fill') !== -1) {
                    result.warn('Replace fill to stretch, ' + 'because spec had been changed', { node: decl });
                }
            }

            var prefixer = void 0;

            if (decl.prop === 'transition' || decl.prop === 'transition-property') {
                // Transition
                return _this.prefixes.transition.add(decl, result);
            } else if (decl.prop === 'align-self') {
                // align-self flexbox or grid
                var display = _this.displayType(decl);
                if (display !== 'grid' && _this.prefixes.options.flexbox !== false) {
                    prefixer = _this.prefixes.add['align-self'];
                    if (prefixer && prefixer.prefixes) {
                        prefixer.process(decl);
                    }
                }
                if (display !== 'flex' && _this.prefixes.options.grid !== false) {
                    prefixer = _this.prefixes.add['grid-row-align'];
                    if (prefixer && prefixer.prefixes) {
                        return prefixer.process(decl, result);
                    }
                }
            } else if (decl.prop === 'justify-self') {
                // justify-self flexbox or grid
                var _display = _this.displayType(decl);
                if (_display !== 'flex' && _this.prefixes.options.grid !== false) {
                    prefixer = _this.prefixes.add['grid-column-align'];
                    if (prefixer && prefixer.prefixes) {
                        return prefixer.process(decl, result);
                    }
                }
            } else {
                // Properties
                prefixer = _this.prefixes.add[decl.prop];
                if (prefixer && prefixer.prefixes) {
                    return prefixer.process(decl, result);
                }
            }

            return undefined;
        });

        // Values
        return css.walkDecls(function (decl) {
            if (_this.disabledValue(decl, result)) return;

            var unprefixed = _this.prefixes.unprefixed(decl.prop);
            for (var _iterator = _this.prefixes.values('add', unprefixed), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var value = _ref;

                value.process(decl, result);
            }
            Value.save(_this.prefixes, decl);
        });
    };

    /**
     * Remove unnecessary pefixes
     */


    Processor.prototype.remove = function remove(css, result) {
        var _this2 = this;

        // At-rules
        var resolution = this.prefixes.remove['@resolution'];

        css.walkAtRules(function (rule, i) {
            if (_this2.prefixes.remove['@' + rule.name]) {
                if (!_this2.disabled(rule, result)) {
                    rule.parent.removeChild(i);
                }
            } else if (rule.name === 'media' && rule.params.indexOf('-resolution') !== -1 && resolution) {
                resolution.clean(rule);
            }
        });

        // Selectors

        var _loop = function _loop(checker) {
            css.walkRules(function (rule, i) {
                if (checker.check(rule)) {
                    if (!_this2.disabled(rule, result)) {
                        rule.parent.removeChild(i);
                    }
                }
            });
        };

        for (var _iterator2 = this.prefixes.remove.selectors, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var checker = _ref2;

            _loop(checker);
        }

        return css.walkDecls(function (decl, i) {
            if (_this2.disabled(decl, result)) return;

            var rule = decl.parent;
            var unprefixed = _this2.prefixes.unprefixed(decl.prop);

            // Transition
            if (decl.prop === 'transition' || decl.prop === 'transition-property') {
                _this2.prefixes.transition.remove(decl);
            }

            // Properties
            if (_this2.prefixes.remove[decl.prop] && _this2.prefixes.remove[decl.prop].remove) {
                var notHack = _this2.prefixes.group(decl).down(function (other) {
                    return _this2.prefixes.normalize(other.prop) === unprefixed;
                });

                if (unprefixed === 'flex-flow') {
                    notHack = true;
                }

                if (notHack && !_this2.withHackValue(decl)) {
                    if (decl.raw('before').indexOf('\n') > -1) {
                        _this2.reduceSpaces(decl);
                    }
                    rule.removeChild(i);
                    return;
                }
            }

            // Values
            for (var _iterator3 = _this2.prefixes.values('remove', unprefixed), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
                var _ref3;

                if (_isArray3) {
                    if (_i3 >= _iterator3.length) break;
                    _ref3 = _iterator3[_i3++];
                } else {
                    _i3 = _iterator3.next();
                    if (_i3.done) break;
                    _ref3 = _i3.value;
                }

                var checker = _ref3;

                if (!checker.check(decl.value)) {
                    continue;
                }

                unprefixed = checker.unprefixed;
                var _notHack = _this2.prefixes.group(decl).down(function (other) {
                    return other.value.indexOf(unprefixed) !== -1;
                });

                if (_notHack) {
                    rule.removeChild(i);
                    return;
                }
            }
        });
    };

    /**
     * Some rare old values, which is not in standard
     */


    Processor.prototype.withHackValue = function withHackValue(decl) {
        return decl.prop === '-webkit-background-clip' && decl.value === 'text';
    };

    /**
     * Check for grid/flexbox options.
     */


    Processor.prototype.disabledValue = function disabledValue(node, result) {
        if (this.prefixes.options.grid === false && node.type === 'decl') {
            if (node.prop === 'display' && node.value.indexOf('grid') !== -1) {
                return true;
            }
        }
        if (this.prefixes.options.flexbox === false && node.type === 'decl') {
            if (node.prop === 'display' && node.value.indexOf('flex') !== -1) {
                return true;
            }
        }

        return this.disabled(node, result);
    };

    /**
     * Check for grid/flexbox options.
     */


    Processor.prototype.disabledDecl = function disabledDecl(node, result) {
        if (this.prefixes.options.grid === false && node.type === 'decl') {
            if (node.prop.indexOf('grid') !== -1 || node.prop === 'justify-items') {
                return true;
            }
        }
        if (this.prefixes.options.flexbox === false && node.type === 'decl') {
            var other = ['order', 'justify-content', 'align-items', 'align-content'];
            if (node.prop.indexOf('flex') !== -1 || other.indexOf(node.prop) !== -1) {
                return true;
            }
        }

        return this.disabled(node, result);
    };

    /**
     * Check for control comment and global options
     */


    Processor.prototype.disabled = function disabled(node, result) {
        if (!node) return false;
        if (node._autoprefixerDisabled !== undefined) {
            return node._autoprefixerDisabled;
        }

        if (node.nodes) {
            var status = undefined;
            node.each(function (i) {
                if (i.type !== 'comment') return;
                if (/(!\s*)?autoprefixer:\s*(off|on)/i.test(i.text)) {
                    if (typeof status !== 'undefined') {
                        result.warn('Second Autoprefixer control comment ' + 'was ignored. Autoprefixer applies control ' + 'comment to whole block, not to next rules.', { node: i });
                    } else {
                        status = /on/i.test(i.text);
                    }
                }
            });

            var value = false;
            if (status !== undefined) {
                value = !status;
            } else if (node.parent) {
                value = this.disabled(node.parent, result);
            }

            node._autoprefixerDisabled = value;
            return node._autoprefixerDisabled;
        } else {
            node._autoprefixerDisabled = this.disabled(node.parent, result);
            return node._autoprefixerDisabled;
        }
    };

    /**
     * Normalize spaces in cascade declaration group
     */


    Processor.prototype.reduceSpaces = function reduceSpaces(decl) {
        var stop = false;
        this.prefixes.group(decl).up(function () {
            stop = true;
            return true;
        });
        if (stop) {
            return;
        }

        var parts = decl.raw('before').split('\n');
        var prevMin = parts[parts.length - 1].length;
        var diff = false;

        this.prefixes.group(decl).down(function (other) {
            parts = other.raw('before').split('\n');
            var last = parts.length - 1;

            if (parts[last].length > prevMin) {
                if (diff === false) {
                    diff = parts[last].length - prevMin;
                }

                parts[last] = parts[last].slice(0, -diff);
                other.raws.before = parts.join('\n');
            }
        });
    };

    /**
     * Is it flebox or grid rule
     */


    Processor.prototype.displayType = function displayType(decl) {
        for (var _iterator4 = decl.parent.nodes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var i = _ref4;

            if (i.prop !== 'display') {
                continue;
            }

            if (i.value.indexOf('flex') !== -1) {
                return 'flex';
            }

            if (i.value.indexOf('grid') !== -1) {
                return 'grid';
            }
        }

        return false;
    };

    return Processor;
}();

module.exports = Processor;
}, function(modId) { var map = {"./value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544351, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');
var OldValue = require('./old-value');
var utils = require('./utils');

var vendor = require('postcss').vendor;

var Value = function (_Prefixer) {
    _inherits(Value, _Prefixer);

    function Value() {
        _classCallCheck(this, Value);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Clone decl for each prefixed values
     */
    Value.save = function save(prefixes, decl) {
        var _this2 = this;

        var prop = decl.prop;
        var result = [];

        var _loop = function _loop(prefix) {
            var value = decl._autoprefixerValues[prefix];

            if (value === decl.value) {
                return 'continue';
            }

            var item = void 0;
            var propPrefix = vendor.prefix(prop);

            if (propPrefix === '-pie-') {
                return 'continue';
            }

            if (propPrefix === prefix) {
                item = decl.value = value;
                result.push(item);
                return 'continue';
            }

            var prefixed = prefixes.prefixed(prop, prefix);
            var rule = decl.parent;

            if (!rule.every(function (i) {
                return i.prop !== prefixed;
            })) {
                result.push(item);
                return 'continue';
            }

            var trimmed = value.replace(/\s+/, ' ');
            var already = rule.some(function (i) {
                return i.prop === decl.prop && i.value.replace(/\s+/, ' ') === trimmed;
            });

            if (already) {
                result.push(item);
                return 'continue';
            }

            var cloned = _this2.clone(decl, { value: value });
            item = decl.parent.insertBefore(decl, cloned);

            result.push(item);
        };

        for (var prefix in decl._autoprefixerValues) {
            var _ret = _loop(prefix);

            if (_ret === 'continue') continue;
        }

        return result;
    };

    /**
     * Is declaration need to be prefixed
     */


    Value.prototype.check = function check(decl) {
        var value = decl.value;
        if (value.indexOf(this.name) === -1) {
            return false;
        }

        return !!value.match(this.regexp());
    };

    /**
     * Lazy regexp loading
     */


    Value.prototype.regexp = function regexp() {
        return this.regexpCache || (this.regexpCache = utils.regexp(this.name));
    };

    /**
     * Add prefix to values in string
     */


    Value.prototype.replace = function replace(string, prefix) {
        return string.replace(this.regexp(), '$1' + prefix + '$2');
    };

    /**
     * Get value with comments if it was not changed
     */


    Value.prototype.value = function value(decl) {
        if (decl.raws.value && decl.raws.value.value === decl.value) {
            return decl.raws.value.raw;
        } else {
            return decl.value;
        }
    };

    /**
     * Save values with next prefixed token
     */


    Value.prototype.add = function add(decl, prefix) {
        if (!decl._autoprefixerValues) {
            decl._autoprefixerValues = {};
        }
        var value = decl._autoprefixerValues[prefix] || this.value(decl);

        var before = void 0;
        do {
            before = value;
            value = this.replace(value, prefix);
            if (value === false) return;
        } while (value !== before);

        decl._autoprefixerValues[prefix] = value;
    };

    /**
     * Return function to fast find prefixed value
     */


    Value.prototype.old = function old(prefix) {
        return new OldValue(this.name, prefix + this.name);
    };

    return Value;
}(Prefixer);

module.exports = Value;
}, function(modId) { var map = {"./prefixer":1625038544347,"./old-value":1625038544352,"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544352, function(require, module, exports) {


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var utils = require('./utils');

var OldValue = function () {
    function OldValue(unprefixed, prefixed, string, regexp) {
        _classCallCheck(this, OldValue);

        this.unprefixed = unprefixed;
        this.prefixed = prefixed;
        this.string = string || prefixed;
        this.regexp = regexp || utils.regexp(prefixed);
    }

    /**
     * Check, that value contain old value
     */


    OldValue.prototype.check = function check(value) {
        if (value.indexOf(this.string) !== -1) {
            return !!value.match(this.regexp);
        }
        return false;
    };

    return OldValue;
}();

module.exports = OldValue;
}, function(modId) { var map = {"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544353, function(require, module, exports) {


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Browsers = require('./browsers');
var brackets = require('./brackets');
var Value = require('./value');
var utils = require('./utils');

var postcss = require('postcss');

var supported = [];
var data = require('caniuse-lite').feature(require('caniuse-lite/data/features/css-featurequeries.js'));
for (var browser in data.stats) {
    var versions = data.stats[browser];
    for (var version in versions) {
        var support = versions[version];
        if (/y/.test(support)) {
            supported.push(browser + ' ' + version);
        }
    }
}

var Supports = function () {
    function Supports(Prefixes, all) {
        _classCallCheck(this, Supports);

        this.Prefixes = Prefixes;
        this.all = all;
    }

    /**
     * Return prefixer only with @supports supported browsers
     */


    Supports.prototype.prefixer = function prefixer() {
        if (this.prefixerCache) {
            return this.prefixerCache;
        }

        var filtered = this.all.browsers.selected.filter(function (i) {
            return supported.indexOf(i) !== -1;
        });

        var browsers = new Browsers(this.all.browsers.data, filtered, this.all.options);
        this.prefixerCache = new this.Prefixes(this.all.data, browsers, this.all.options);
        return this.prefixerCache;
    };

    /**
     * Parse string into declaration property and value
     */


    Supports.prototype.parse = function parse(str) {
        var _str$split = str.split(':'),
            prop = _str$split[0],
            value = _str$split[1];

        if (!value) value = '';
        return [prop.trim(), value.trim()];
    };

    /**
     * Create virtual rule to process it by prefixer
     */


    Supports.prototype.virtual = function virtual(str) {
        var _parse = this.parse(str),
            prop = _parse[0],
            value = _parse[1];

        var rule = postcss.parse('a{}').first;
        rule.append({ prop: prop, value: value, raws: { before: '' } });
        return rule;
    };

    /**
     * Return array of Declaration with all necessary prefixes
     */


    Supports.prototype.prefixed = function prefixed(str) {
        var rule = this.virtual(str);
        if (this.disabled(rule.first)) {
            return rule.nodes;
        }

        var prefixer = this.prefixer().add[rule.first.prop];
        prefixer && prefixer.process && prefixer.process(rule.first);

        for (var _iterator = rule.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var decl = _ref;

            for (var _iterator2 = this.prefixer().values('add', rule.first.prop), _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var value = _ref2;

                value.process(decl);
            }
            Value.save(this.all, decl);
        }

        return rule.nodes;
    };

    /**
     * Return true if brackets node is "not" word
     */


    Supports.prototype.isNot = function isNot(node) {
        return typeof node === 'string' && /not\s*/i.test(node);
    };

    /**
     * Return true if brackets node is "or" word
     */


    Supports.prototype.isOr = function isOr(node) {
        return typeof node === 'string' && /\s*or\s*/i.test(node);
    };

    /**
     * Return true if brackets node is (prop: value)
     */


    Supports.prototype.isProp = function isProp(node) {
        return (typeof node === 'undefined' ? 'undefined' : _typeof(node)) === 'object' && node.length === 1 && typeof node[0] === 'string';
    };

    /**
     * Return true if prefixed property has no unprefixed
     */


    Supports.prototype.isHack = function isHack(all, unprefixed) {
        var check = new RegExp('(\\(|\\s)' + utils.escapeRegexp(unprefixed) + ':');
        return !check.test(all);
    };

    /**
     * Return true if we need to remove node
     */


    Supports.prototype.toRemove = function toRemove(str, all) {
        var _parse2 = this.parse(str),
            prop = _parse2[0],
            value = _parse2[1];

        var unprefixed = this.all.unprefixed(prop);

        var cleaner = this.all.cleaner();

        if (cleaner.remove[prop] && cleaner.remove[prop].remove && !this.isHack(all, unprefixed)) {
            return true;
        }

        for (var _iterator3 = cleaner.values('remove', unprefixed), _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var checker = _ref3;

            if (checker.check(value)) {
                return true;
            }
        }

        return false;
    };

    /**
     * Remove all unnecessary prefixes
     */


    Supports.prototype.remove = function remove(nodes, all) {
        var i = 0;
        while (i < nodes.length) {
            if (!this.isNot(nodes[i - 1]) && this.isProp(nodes[i]) && this.isOr(nodes[i + 1])) {
                if (this.toRemove(nodes[i][0], all)) {
                    nodes.splice(i, 2);
                    continue;
                }

                i += 2;
                continue;
            }

            if (_typeof(nodes[i]) === 'object') {
                nodes[i] = this.remove(nodes[i], all);
            }

            i += 1;
        }
        return nodes;
    };

    /**
     * Clean brackets with one child
     */


    Supports.prototype.cleanBrackets = function cleanBrackets(nodes) {
        var _this = this;

        return nodes.map(function (i) {
            if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) !== 'object') {
                return i;
            }

            if (i.length === 1 && _typeof(i[0]) === 'object') {
                return _this.cleanBrackets(i[0]);
            }

            return _this.cleanBrackets(i);
        });
    };

    /**
     * Add " or " between properties and convert it to brackets format
     */


    Supports.prototype.convert = function convert(progress) {
        var result = [''];
        for (var _iterator4 = progress, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var i = _ref4;

            result.push([i.prop + ': ' + i.value]);
            result.push(' or ');
        }
        result[result.length - 1] = '';
        return result;
    };

    /**
     * Compress value functions into a string nodes
     */


    Supports.prototype.normalize = function normalize(nodes) {
        var _this2 = this;

        if ((typeof nodes === 'undefined' ? 'undefined' : _typeof(nodes)) !== 'object') {
            return nodes;
        }

        nodes = nodes.filter(function (i) {
            return i !== '';
        });
        if (typeof nodes[0] === 'string' && nodes[0].indexOf(':') !== -1) {
            return [brackets.stringify(nodes)];
        }

        return nodes.map(function (i) {
            return _this2.normalize(i);
        });
    };

    /**
     * Add prefixes
     */


    Supports.prototype.add = function add(nodes, all) {
        var _this3 = this;

        return nodes.map(function (i) {
            if (_this3.isProp(i)) {
                var prefixed = _this3.prefixed(i[0]);
                if (prefixed.length > 1) {
                    return _this3.convert(prefixed);
                }

                return i;
            }

            if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object') {
                return _this3.add(i, all);
            }

            return i;
        });
    };

    /**
     * Add prefixed declaration
     */


    Supports.prototype.process = function process(rule) {
        var ast = brackets.parse(rule.params);
        ast = this.normalize(ast);
        ast = this.remove(ast, rule.params);
        ast = this.add(ast, rule.params);
        ast = this.cleanBrackets(ast);
        rule.params = brackets.stringify(ast);
    };

    /**
     * Check global options
     */


    Supports.prototype.disabled = function disabled(node) {
        if (!this.all.options.grid) {
            if (node.prop === 'display' && node.value.indexOf('grid') !== -1) {
                return true;
            }
            if (node.prop.indexOf('grid') !== -1 || node.prop === 'justify-items') {
                return true;
            }
        }

        if (this.all.options.flexbox === false) {
            if (node.prop === 'display' && node.value.indexOf('flex') !== -1) {
                return true;
            }
            var other = ['order', 'justify-content', 'align-items', 'align-content'];
            if (node.prop.indexOf('flex') !== -1 || other.indexOf(node.prop) !== -1) {
                return true;
            }
        }

        return false;
    };

    return Supports;
}();

module.exports = Supports;
}, function(modId) { var map = {"./browsers":1625038544343,"./brackets":1625038544354,"./value":1625038544351,"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544354, function(require, module, exports) {


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var last = function last(array) {
    return array[array.length - 1];
};

var brackets = {

    /**
     * Parse string to nodes tree
     */
    parse: function parse(str) {
        var current = [''];
        var stack = [current];

        for (var i = 0; i < str.length; i++) {
            var sym = str[i];
            if (sym === '(') {
                current = [''];
                last(stack).push(current);
                stack.push(current);
                continue;
            }

            if (sym === ')') {
                stack.pop();
                current = last(stack);
                current.push('');
                continue;
            }

            current[current.length - 1] += sym;
        }

        return stack[0];
    },


    /**
     * Generate output string by nodes tree
     */
    stringify: function stringify(ast) {
        var result = '';
        for (var _iterator = ast, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var i = _ref;

            if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object') {
                result += '(' + brackets.stringify(i) + ')';
                continue;
            }

            result += i;
        }
        return result;
    }
};

module.exports = brackets;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544355, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OldSelector = require('./old-selector');
var Prefixer = require('./prefixer');
var Browsers = require('./browsers');
var utils = require('./utils');

var Selector = function (_Prefixer) {
    _inherits(Selector, _Prefixer);

    function Selector(name, prefixes, all) {
        _classCallCheck(this, Selector);

        var _this = _possibleConstructorReturn(this, _Prefixer.call(this, name, prefixes, all));

        _this.regexpCache = {};
        return _this;
    }

    /**
     * Is rule selectors need to be prefixed
     */


    Selector.prototype.check = function check(rule) {
        if (rule.selector.indexOf(this.name) !== -1) {
            return !!rule.selector.match(this.regexp());
        }

        return false;
    };

    /**
     * Return prefixed version of selector
     */


    Selector.prototype.prefixed = function prefixed(prefix) {
        return this.name.replace(/^([^\w]*)/, '$1' + prefix);
    };

    /**
     * Lazy loadRegExp for name
     */


    Selector.prototype.regexp = function regexp(prefix) {
        if (this.regexpCache[prefix]) {
            return this.regexpCache[prefix];
        }

        var name = prefix ? this.prefixed(prefix) : this.name;
        this.regexpCache[prefix] = new RegExp('(^|[^:"\'=])' + utils.escapeRegexp(name), 'gi');
        return this.regexpCache[prefix];
    };

    /**
     * All possible prefixes
     */


    Selector.prototype.possible = function possible() {
        return Browsers.prefixes();
    };

    /**
     * Return all possible selector prefixes
     */


    Selector.prototype.prefixeds = function prefixeds(rule) {
        if (rule._autoprefixerPrefixeds) {
            return rule._autoprefixerPrefixeds;
        }

        var prefixeds = {};
        for (var _iterator = this.possible(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var prefix = _ref;

            prefixeds[prefix] = this.replace(rule.selector, prefix);
        }

        rule._autoprefixerPrefixeds = prefixeds;
        return rule._autoprefixerPrefixeds;
    };

    /**
     * Is rule already prefixed before
     */


    Selector.prototype.already = function already(rule, prefixeds, prefix) {
        var index = rule.parent.index(rule) - 1;

        while (index >= 0) {
            var before = rule.parent.nodes[index];

            if (before.type !== 'rule') {
                return false;
            }

            var some = false;
            for (var key in prefixeds) {
                var prefixed = prefixeds[key];
                if (before.selector === prefixed) {
                    if (prefix === key) {
                        return true;
                    } else {
                        some = true;
                        break;
                    }
                }
            }
            if (!some) {
                return false;
            }

            index -= 1;
        }

        return false;
    };

    /**
     * Replace selectors by prefixed one
     */


    Selector.prototype.replace = function replace(selector, prefix) {
        return selector.replace(this.regexp(), '$1' + this.prefixed(prefix));
    };

    /**
     * Clone and add prefixes for at-rule
     */


    Selector.prototype.add = function add(rule, prefix) {
        var prefixeds = this.prefixeds(rule);

        if (this.already(rule, prefixeds, prefix)) {
            return;
        }

        var cloned = this.clone(rule, { selector: prefixeds[prefix] });
        rule.parent.insertBefore(rule, cloned);
    };

    /**
     * Return function to fast find prefixed selector
     */


    Selector.prototype.old = function old(prefix) {
        return new OldSelector(this, prefix);
    };

    return Selector;
}(Prefixer);

module.exports = Selector;
}, function(modId) { var map = {"./old-selector":1625038544356,"./prefixer":1625038544347,"./browsers":1625038544343,"./utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544356, function(require, module, exports) {


function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OldSelector = function () {
    function OldSelector(selector, prefix) {
        _classCallCheck(this, OldSelector);

        this.prefix = prefix;
        this.prefixed = selector.prefixed(this.prefix);
        this.regexp = selector.regexp(this.prefix);

        this.prefixeds = selector.possible().map(function (x) {
            return [selector.prefixed(x), selector.regexp(x)];
        });

        this.unprefixed = selector.name;
        this.nameRegexp = selector.regexp();
    }

    /**
     * Is rule a hack without unprefixed version bottom
     */


    OldSelector.prototype.isHack = function isHack(rule) {
        var index = rule.parent.index(rule) + 1;
        var rules = rule.parent.nodes;

        while (index < rules.length) {
            var before = rules[index].selector;
            if (!before) {
                return true;
            }

            if (before.indexOf(this.unprefixed) !== -1 && before.match(this.nameRegexp)) {
                return false;
            }

            var some = false;
            for (var _iterator = this.prefixeds, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref2 = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref2 = _i.value;
                }

                var _ref = _ref2;
                var string = _ref[0];
                var regexp = _ref[1];

                if (before.indexOf(string) !== -1 && before.match(regexp)) {
                    some = true;
                    break;
                }
            }

            if (!some) {
                return true;
            }

            index += 1;
        }

        return true;
    };

    /**
     * Does rule contain an unnecessary prefixed selector
     */


    OldSelector.prototype.check = function check(rule) {
        if (rule.selector.indexOf(this.prefixed) === -1) {
            return false;
        }
        if (!rule.selector.match(this.regexp)) {
            return false;
        }
        if (this.isHack(rule)) {
            return false;
        }
        return true;
    };

    return OldSelector;
}();

module.exports = OldSelector;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544357, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Prefixer = require('./prefixer');

var AtRule = function (_Prefixer) {
    _inherits(AtRule, _Prefixer);

    function AtRule() {
        _classCallCheck(this, AtRule);

        return _possibleConstructorReturn(this, _Prefixer.apply(this, arguments));
    }

    /**
     * Clone and add prefixes for at-rule
     */
    AtRule.prototype.add = function add(rule, prefix) {
        var prefixed = prefix + rule.name;

        var already = rule.parent.some(function (i) {
            return i.name === prefixed && i.params === rule.params;
        });
        if (already) {
            return undefined;
        }

        var cloned = this.clone(rule, { name: prefixed });
        return rule.parent.insertBefore(rule, cloned);
    };

    /**
     * Clone node with prefixes
     */


    AtRule.prototype.process = function process(node) {
        var parent = this.parentPrefix(node);

        for (var _iterator = this.prefixes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var prefix = _ref;

            if (!parent || parent === prefix) {
                this.add(node, prefix);
            }
        }
    };

    return AtRule;
}(Prefixer);

module.exports = AtRule;
}, function(modId) { var map = {"./prefixer":1625038544347}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544358, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Selector = require('../selector');

var Fullscreen = function (_Selector) {
    _inherits(Fullscreen, _Selector);

    function Fullscreen() {
        _classCallCheck(this, Fullscreen);

        return _possibleConstructorReturn(this, _Selector.apply(this, arguments));
    }

    /**
     * Return different selectors depend on prefix
     */
    Fullscreen.prototype.prefixed = function prefixed(prefix) {
        if (prefix === '-webkit-') {
            return ':-webkit-full-screen';
        } else if (prefix === '-moz-') {
            return ':-moz-full-screen';
        } else {
            return ':' + prefix + 'fullscreen';
        }
    };

    return Fullscreen;
}(Selector);

Object.defineProperty(Fullscreen, 'names', {
    enumerable: true,
    writable: true,
    value: [':fullscreen']
});


module.exports = Fullscreen;
}, function(modId) { var map = {"../selector":1625038544355}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544359, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Selector = require('../selector');

var Placeholder = function (_Selector) {
    _inherits(Placeholder, _Selector);

    function Placeholder() {
        _classCallCheck(this, Placeholder);

        return _possibleConstructorReturn(this, _Selector.apply(this, arguments));
    }

    /**
     * Add old mozilla to possible prefixes
     */
    Placeholder.prototype.possible = function possible() {
        return _Selector.prototype.possible.call(this).concat(['-moz- old', '-ms- old']);
    };

    /**
     * Return different selectors depend on prefix
     */


    Placeholder.prototype.prefixed = function prefixed(prefix) {
        if (prefix === '-webkit-') {
            return '::-webkit-input-placeholder';
        } else if (prefix === '-ms-') {
            return '::-ms-input-placeholder';
        } else if (prefix === '-ms- old') {
            return ':-ms-input-placeholder';
        } else if (prefix === '-moz- old') {
            return ':-moz-placeholder';
        } else {
            return '::' + prefix + 'placeholder';
        }
    };

    return Placeholder;
}(Selector);

Object.defineProperty(Placeholder, 'names', {
    enumerable: true,
    writable: true,
    value: ['::placeholder']
});


module.exports = Placeholder;
}, function(modId) { var map = {"../selector":1625038544355}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544360, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var list = require('postcss').list;

var Flex = function (_Declaration) {
    _inherits(Flex, _Declaration);

    function Flex() {
        _classCallCheck(this, Flex);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2009 spec
     */
    Flex.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2009) {
            return prefix + 'box-flex';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    Flex.prototype.normalize = function normalize() {
        return 'flex';
    };

    /**
     * Spec 2009 supports only first argument
     * Spec 2012 disallows unitless basis
     */


    Flex.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2009) {
            decl.value = list.space(decl.value)[0];
            decl.value = Flex.oldValues[decl.value] || decl.value;
            return _Declaration.prototype.set.call(this, decl, prefix);
        } else if (spec === 2012) {
            var components = list.space(decl.value);
            if (components.length === 3 && components[2] === '0') {
                decl.value = components.slice(0, 2).concat('0px').join(' ');
            }
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return Flex;
}(Declaration);

Object.defineProperty(Flex, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex', 'box-flex']
});
Object.defineProperty(Flex, 'oldValues', {
    enumerable: true,
    writable: true,
    value: {
        auto: '1',
        none: '0'
    }
});


module.exports = Flex;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544361, function(require, module, exports) {


/**
 * Return flexbox spec versions by prefix
 */
module.exports = function (prefix) {
    var spec = void 0;
    if (prefix === '-webkit- 2009' || prefix === '-moz-') {
        spec = 2009;
    } else if (prefix === '-ms-') {
        spec = 2012;
    } else if (prefix === '-webkit-') {
        spec = 'final';
    }

    if (prefix === '-webkit- 2009') {
        prefix = '-webkit-';
    }

    return [spec, prefix];
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544362, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var Order = function (_Declaration) {
    _inherits(Order, _Declaration);

    function Order() {
        _classCallCheck(this, Order);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    Order.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2009) {
            return prefix + 'box-ordinal-group';
        } else if (spec === 2012) {
            return prefix + 'flex-order';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    Order.prototype.normalize = function normalize() {
        return 'order';
    };

    /**
     * Fix value for 2009 spec
     */


    Order.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2009 && /\d/.test(decl.value)) {
            decl.value = (parseInt(decl.value) + 1).toString();
            return _Declaration.prototype.set.call(this, decl, prefix);
        } else {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
    };

    return Order;
}(Declaration);

Object.defineProperty(Order, 'names', {
    enumerable: true,
    writable: true,
    value: ['order', 'flex-order', 'box-ordinal-group']
});


module.exports = Order;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544363, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var Filter = function (_Declaration) {
    _inherits(Filter, _Declaration);

    function Filter() {
        _classCallCheck(this, Filter);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Check is it Internet Explorer filter
     */
    Filter.prototype.check = function check(decl) {
        var v = decl.value;
        return v.toLowerCase().indexOf('alpha(') === -1 && v.indexOf('DXImageTransform.Microsoft') === -1 && v.indexOf('data:image/svg+xml') === -1;
    };

    return Filter;
}(Declaration);

Object.defineProperty(Filter, 'names', {
    enumerable: true,
    writable: true,
    value: ['filter']
});


module.exports = Filter;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544364, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridEnd = function (_Declaration) {
    _inherits(GridEnd, _Declaration);

    function GridEnd() {
        _classCallCheck(this, GridEnd);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not add prefix for unsupported value in IE
     */
    GridEnd.prototype.check = function check(decl) {
        return decl.value.indexOf('span') !== -1;
    };

    /**
     * Return a final spec property
     */


    GridEnd.prototype.normalize = function normalize(prop) {
        return prop.replace(/(-span|-end)/, '');
    };

    /**
     * Change property name for IE
     */


    GridEnd.prototype.prefixed = function prefixed(prop, prefix) {
        var result = _Declaration.prototype.prefixed.call(this, prop, prefix);
        if (prefix === '-ms-') {
            result = result.replace('-end', '-span');
        }
        return result;
    };

    /**
     * Change repeating syntax for IE
     */


    GridEnd.prototype.set = function set(decl, prefix) {
        if (prefix === '-ms-') {
            decl.value = decl.value.replace(/span\s/i, '');
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return GridEnd;
}(Declaration);

Object.defineProperty(GridEnd, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row-end', 'grid-column-end', 'grid-row-span', 'grid-column-span']
});


module.exports = GridEnd;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544365, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var Animation = function (_Declaration) {
    _inherits(Animation, _Declaration);

    function Animation() {
        _classCallCheck(this, Animation);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Don’t add prefixes for modern values.
     */
    Animation.prototype.check = function check(decl) {
        return !decl.value.split(/\s+/).some(function (i) {
            var lower = i.toLowerCase();
            return lower === 'reverse' || lower === 'alternate-reverse';
        });
    };

    return Animation;
}(Declaration);

Object.defineProperty(Animation, 'names', {
    enumerable: true,
    writable: true,
    value: ['animation', 'animation-direction']
});


module.exports = Animation;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544366, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexFlow = function (_Declaration) {
    _inherits(FlexFlow, _Declaration);

    function FlexFlow() {
        _classCallCheck(this, FlexFlow);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Use two properties for 2009 spec
     */
    FlexFlow.prototype.insert = function insert(decl, prefix, prefixes) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec !== 2009) {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        } else {
            var values = decl.value.split(/\s+/).filter(function (i) {
                return i !== 'wrap' && i !== 'nowrap' && 'wrap-reverse';
            });
            if (values.length === 0) {
                return undefined;
            }

            var already = decl.parent.some(function (i) {
                return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
            });
            if (already) {
                return undefined;
            }

            var value = values[0];
            var orient = value.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
            var dir = value.indexOf('reverse') !== -1 ? 'reverse' : 'normal';

            var cloned = this.clone(decl);
            cloned.prop = prefix + 'box-orient';
            cloned.value = orient;
            if (this.needCascade(decl)) {
                cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
            }
            decl.parent.insertBefore(decl, cloned);

            cloned = this.clone(decl);
            cloned.prop = prefix + 'box-direction';
            cloned.value = dir;
            if (this.needCascade(decl)) {
                cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
            }
            return decl.parent.insertBefore(decl, cloned);
        }
    };

    return FlexFlow;
}(Declaration);

Object.defineProperty(FlexFlow, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-flow', 'box-direction', 'box-orient']
});


module.exports = FlexFlow;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544367, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var Flex = function (_Declaration) {
    _inherits(Flex, _Declaration);

    function Flex() {
        _classCallCheck(this, Flex);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Return property name by final spec
     */
    Flex.prototype.normalize = function normalize() {
        return 'flex';
    };

    /**
     * Return flex property for 2009 and 2012 specs
     */


    Flex.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2009) {
            return prefix + 'box-flex';
        } else if (spec === 2012) {
            return prefix + 'flex-positive';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    return Flex;
}(Declaration);

Object.defineProperty(Flex, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-grow', 'flex-positive']
});


module.exports = Flex;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544368, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexWrap = function (_Declaration) {
    _inherits(FlexWrap, _Declaration);

    function FlexWrap() {
        _classCallCheck(this, FlexWrap);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Don't add prefix for 2009 spec
     */
    FlexWrap.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec !== 2009) {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return FlexWrap;
}(Declaration);

Object.defineProperty(FlexWrap, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-wrap']
});


module.exports = FlexWrap;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544369, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var shorthand = require('./grid-shorthand');

var GridArea = function (_Declaration) {
    _inherits(GridArea, _Declaration);

    function GridArea() {
        _classCallCheck(this, GridArea);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Translate grid-area to separate -ms- prefixed properties
     */
    GridArea.prototype.insert = function insert(decl, prefix, prefixes) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        if (decl.parent.some(function (i) {
            return i.prop === '-ms-grid-row';
        })) {
            return undefined;
        }

        var values = shorthand.parse(decl);

        var _shorthand$translate = shorthand.translate(values, 0, 2),
            rowStart = _shorthand$translate[0],
            rowSpan = _shorthand$translate[1];

        var _shorthand$translate2 = shorthand.translate(values, 1, 3),
            columnStart = _shorthand$translate2[0],
            columnSpan = _shorthand$translate2[1];

        if (rowStart) {
            decl.cloneBefore({
                prop: '-ms-grid-row',
                value: rowStart.toString()
            });
        }

        if (rowSpan) {
            decl.cloneBefore({
                prop: '-ms-grid-row-span',
                value: rowSpan.toString()
            });
        }

        if (columnStart) {
            decl.cloneBefore({
                prop: '-ms-grid-column',
                value: columnStart.toString()
            });
        }

        if (columnSpan) {
            decl.cloneBefore({
                prop: '-ms-grid-column-span',
                value: columnSpan.toString()
            });
        }

        return undefined;
    };

    return GridArea;
}(Declaration);

Object.defineProperty(GridArea, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-area']
});


module.exports = GridArea;
}, function(modId) { var map = {"../declaration":1625038544346,"./grid-shorthand":1625038544370}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544370, function(require, module, exports) {


var parser = require('postcss-value-parser');

function convert(value) {
    if (value && value.length === 2 && value[0] === 'span' && parseInt(value[1], 10) > 0) {
        return [false, parseInt(value[1], 10)];
    }

    if (value && value.length === 1 && parseInt(value[0], 10) > 0) {
        return [parseInt(value[0], 10), false];
    }

    return [false, false];
}

function translate(values, startIndex, endIndex) {
    var startValue = values[startIndex];
    var endValue = values[endIndex];

    if (!startValue) {
        return [false, false];
    }

    var _convert = convert(startValue),
        start = _convert[0],
        spanStart = _convert[1];

    var _convert2 = convert(endValue),
        end = _convert2[0],
        spanEnd = _convert2[1];

    if (start && !endValue) {
        return [start, false];
    }

    if (spanStart && end) {
        return [end - spanStart, spanStart];
    }

    if (start && spanEnd) {
        return [start, spanEnd];
    }

    if (start && end) {
        return [start, end - start];
    }

    return [false, false];
}

function parse(decl) {
    var node = parser(decl.value);

    var values = [];
    var current = 0;
    values[current] = [];

    for (var _iterator = node.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var i = _ref;

        if (i.type === 'div') {
            current += 1;
            values[current] = [];
        } else if (i.type === 'word') {
            values[current].push(i.value);
        }
    }

    return values;
}

function parseTemplateShortcut(decl) {
    var node = parser(decl.value, { loose: true });

    var values = [];
    var current = 0;
    values[current] = [];

    for (var _iterator2 = node.nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var i = _ref2;

        if (i.type === 'div') {
            current += 1;
            values[current] = [];
        } else {
            values[current].push(parser.stringify(i));
        }
    }

    return values;
}

function walkRepeat(node) {
    var fixed = [];
    for (var _iterator3 = node.nodes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray3) {
            if (_i3 >= _iterator3.length) break;
            _ref3 = _iterator3[_i3++];
        } else {
            _i3 = _iterator3.next();
            if (_i3.done) break;
            _ref3 = _i3.value;
        }

        var i = _ref3;

        if (i.nodes) {
            walkRepeat(i);
        }
        fixed.push(i);
        if (i.type === 'function' && i.value === 'repeat') {
            var first = i.nodes.shift();
            if (first) {
                var count = first.value;
                i.nodes.shift();
                i.value = '';
                fixed.push({ type: 'word', value: '[' + count + ']' });
            }
        }
    }
    node.nodes = fixed;
}

function changeRepeat(value) {
    var ast = parser(value);
    walkRepeat(ast);
    return ast.toString();
}

module.exports = {
    parse: parse,
    translate: translate,
    changeRepeat: changeRepeat,
    parseTemplateShortcut: parseTemplateShortcut
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544371, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridStart = function (_Declaration) {
    _inherits(GridStart, _Declaration);

    function GridStart() {
        _classCallCheck(this, GridStart);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not add prefix for unsupported value in IE
     */
    GridStart.prototype.check = function check(decl) {
        var value = decl.value;
        return value.indexOf('/') === -1 || value.indexOf('span') !== -1;
    };

    /**
     * Return a final spec property
     */


    GridStart.prototype.normalize = function normalize(prop) {
        return prop.replace('-start', '');
    };

    /**
     * Change property name for IE
     */


    GridStart.prototype.prefixed = function prefixed(prop, prefix) {
        var result = _Declaration.prototype.prefixed.call(this, prop, prefix);
        if (prefix === '-ms-') {
            result = result.replace('-start', '');
        }
        return result;
    };

    return GridStart;
}(Declaration);

Object.defineProperty(GridStart, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row-start', 'grid-column-start']
});


module.exports = GridStart;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544372, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var AlignSelf = function (_Declaration) {
    _inherits(AlignSelf, _Declaration);

    function AlignSelf() {
        _classCallCheck(this, AlignSelf);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2012 specs
     */
    AlignSelf.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2012) {
            return prefix + 'flex-item-align';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    AlignSelf.prototype.normalize = function normalize() {
        return 'align-self';
    };

    /**
     * Change value for 2012 spec and ignore prefix for 2009
     */


    AlignSelf.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2012) {
            decl.value = AlignSelf.oldValues[decl.value] || decl.value;
            return _Declaration.prototype.set.call(this, decl, prefix);
        } else if (spec === 'final') {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return AlignSelf;
}(Declaration);

Object.defineProperty(AlignSelf, 'names', {
    enumerable: true,
    writable: true,
    value: ['align-self', 'flex-item-align']
});
Object.defineProperty(AlignSelf, 'oldValues', {
    enumerable: true,
    writable: true,
    value: {
        'flex-end': 'end',
        'flex-start': 'start'
    }
});


module.exports = AlignSelf;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544373, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var utils = require('../utils');

var Appearance = function (_Declaration) {
    _inherits(Appearance, _Declaration);

    function Appearance(name, prefixes, all) {
        _classCallCheck(this, Appearance);

        var _this = _possibleConstructorReturn(this, _Declaration.call(this, name, prefixes, all));

        if (_this.prefixes) {
            _this.prefixes = utils.uniq(_this.prefixes.map(function (i) {
                if (i === '-ms-') {
                    return '-webkit-';
                } else {
                    return i;
                }
            }));
        }
        return _this;
    }

    return Appearance;
}(Declaration);

Object.defineProperty(Appearance, 'names', {
    enumerable: true,
    writable: true,
    value: ['appearance']
});


module.exports = Appearance;
}, function(modId) { var map = {"../declaration":1625038544346,"../utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544374, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexBasis = function (_Declaration) {
    _inherits(FlexBasis, _Declaration);

    function FlexBasis() {
        _classCallCheck(this, FlexBasis);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Return property name by final spec
     */
    FlexBasis.prototype.normalize = function normalize() {
        return 'flex-basis';
    };

    /**
     * Return flex property for 2012 spec
     */


    FlexBasis.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2012) {
            return prefix + 'flex-preferred-size';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Ignore 2009 spec and use flex property for 2012
     */


    FlexBasis.prototype.set = function set(decl, prefix) {
        var spec = void 0;

        var _flexSpec2 = flexSpec(prefix);

        spec = _flexSpec2[0];
        prefix = _flexSpec2[1];

        if (spec === 2012 || spec === 'final') {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return FlexBasis;
}(Declaration);

Object.defineProperty(FlexBasis, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-basis', 'flex-preferred-size']
});


module.exports = FlexBasis;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544375, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var MaskBorder = function (_Declaration) {
    _inherits(MaskBorder, _Declaration);

    function MaskBorder() {
        _classCallCheck(this, MaskBorder);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Return property name by final spec
     */
    MaskBorder.prototype.normalize = function normalize() {
        return this.name.replace('box-image', 'border');
    };

    /**
     * Return flex property for 2012 spec
     */


    MaskBorder.prototype.prefixed = function prefixed(prop, prefix) {
        var result = _Declaration.prototype.prefixed.call(this, prop, prefix);
        if (prefix === '-webkit-') {
            result = result.replace('border', 'box-image');
        }
        return result;
    };

    return MaskBorder;
}(Declaration);

Object.defineProperty(MaskBorder, 'names', {
    enumerable: true,
    writable: true,
    value: ['mask-border', 'mask-border-source', 'mask-border-slice', 'mask-border-width', 'mask-border-outset', 'mask-border-repeat', 'mask-box-image', 'mask-box-image-source', 'mask-box-image-slice', 'mask-box-image-width', 'mask-box-image-outset', 'mask-box-image-repeat']
});


module.exports = MaskBorder;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544376, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var AlignItems = function (_Declaration) {
    _inherits(AlignItems, _Declaration);

    function AlignItems() {
        _classCallCheck(this, AlignItems);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    AlignItems.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2009) {
            return prefix + 'box-align';
        } else if (spec === 2012) {
            return prefix + 'flex-align';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    AlignItems.prototype.normalize = function normalize() {
        return 'align-items';
    };

    /**
     * Change value for 2009 and 2012 specs
     */


    AlignItems.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2009 || spec === 2012) {
            decl.value = AlignItems.oldValues[decl.value] || decl.value;
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return AlignItems;
}(Declaration);

Object.defineProperty(AlignItems, 'names', {
    enumerable: true,
    writable: true,
    value: ['align-items', 'flex-align', 'box-align']
});
Object.defineProperty(AlignItems, 'oldValues', {
    enumerable: true,
    writable: true,
    value: {
        'flex-end': 'end',
        'flex-start': 'start'
    }
});


module.exports = AlignItems;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544377, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexShrink = function (_Declaration) {
    _inherits(FlexShrink, _Declaration);

    function FlexShrink() {
        _classCallCheck(this, FlexShrink);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Return property name by final spec
     */
    FlexShrink.prototype.normalize = function normalize() {
        return 'flex-shrink';
    };

    /**
     * Return flex property for 2012 spec
     */


    FlexShrink.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2012) {
            return prefix + 'flex-negative';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Ignore 2009 spec and use flex property for 2012
     */


    FlexShrink.prototype.set = function set(decl, prefix) {
        var spec = void 0;

        var _flexSpec2 = flexSpec(prefix);

        spec = _flexSpec2[0];
        prefix = _flexSpec2[1];

        if (spec === 2012 || spec === 'final') {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return FlexShrink;
}(Declaration);

Object.defineProperty(FlexShrink, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-shrink', 'flex-negative']
});


module.exports = FlexShrink;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544378, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BreakProps = function (_Declaration) {
    _inherits(BreakProps, _Declaration);

    function BreakProps() {
        _classCallCheck(this, BreakProps);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change name for -webkit- and -moz- prefix
     */
    BreakProps.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-moz-') {
            return 'page-' + prop;
        } else {
            return prefix + 'column-' + prop;
        }
    };

    /**
     * Return property name by final spec
     */


    BreakProps.prototype.normalize = function normalize(prop) {
        if (prop.indexOf('inside') !== -1) {
            return 'break-inside';
        } else if (prop.indexOf('before') !== -1) {
            return 'break-before';
        } else {
            return 'break-after';
        }
    };

    /**
     * Change prefixed value for avoid-column and avoid-page
     */


    BreakProps.prototype.set = function set(decl, prefix) {
        if (decl.prop === 'break-inside' && decl.value === 'avoid-column' || decl.value === 'avoid-page') {
            decl.value = 'avoid';
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    /**
     * Don’t prefix some values
     */


    BreakProps.prototype.insert = function insert(decl, prefix, prefixes) {
        if (decl.prop !== 'break-inside') {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        } else if (decl.value === 'avoid-region') {
            return undefined;
        } else if (decl.value === 'avoid-page' && prefix === '-webkit-') {
            return undefined;
        } else {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        }
    };

    return BreakProps;
}(Declaration);

Object.defineProperty(BreakProps, 'names', {
    enumerable: true,
    writable: true,
    value: ['break-inside', 'page-break-inside', 'column-break-inside', 'break-before', 'page-break-before', 'column-break-before', 'break-after', 'page-break-after', 'column-break-after']
});


module.exports = BreakProps;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544379, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var WritingMode = function (_Declaration) {
    _inherits(WritingMode, _Declaration);

    function WritingMode() {
        _classCallCheck(this, WritingMode);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    WritingMode.prototype.set = function set(decl, prefix) {
        if (prefix === '-ms-') {
            decl.value = WritingMode.msValues[decl.value] || decl.value;
            return _Declaration.prototype.set.call(this, decl, prefix);
        } else {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
    };

    return WritingMode;
}(Declaration);

Object.defineProperty(WritingMode, 'names', {
    enumerable: true,
    writable: true,
    value: ['writing-mode']
});
Object.defineProperty(WritingMode, 'msValues', {
    enumerable: true,
    writable: true,
    value: {
        'horizontal-tb': 'lr-tb',
        'vertical-rl': 'tb-rl',
        'vertical-lr': 'tb-lr'
    }
});


module.exports = WritingMode;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544380, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BorderImage = function (_Declaration) {
    _inherits(BorderImage, _Declaration);

    function BorderImage() {
        _classCallCheck(this, BorderImage);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Remove fill parameter for prefixed declarations
     */
    BorderImage.prototype.set = function set(decl, prefix) {
        decl.value = decl.value.replace(/\s+fill(\s)/, '$1');
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return BorderImage;
}(Declaration);

Object.defineProperty(BorderImage, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-image']
});


module.exports = BorderImage;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544381, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var AlignContent = function (_Declaration) {
    _inherits(AlignContent, _Declaration);

    function AlignContent() {
        _classCallCheck(this, AlignContent);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2012 spec
     */
    AlignContent.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2012) {
            return prefix + 'flex-line-pack';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    AlignContent.prototype.normalize = function normalize() {
        return 'align-content';
    };

    /**
     * Change value for 2012 spec and ignore prefix for 2009
     */


    AlignContent.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2012) {
            decl.value = AlignContent.oldValues[decl.value] || decl.value;
            return _Declaration.prototype.set.call(this, decl, prefix);
        } else if (spec === 'final') {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return AlignContent;
}(Declaration);

Object.defineProperty(AlignContent, 'names', {
    enumerable: true,
    writable: true,
    value: ['align-content', 'flex-line-pack']
});
Object.defineProperty(AlignContent, 'oldValues', {
    enumerable: true,
    writable: true,
    value: {
        'flex-end': 'end',
        'flex-start': 'start',
        'space-between': 'justify',
        'space-around': 'distribute'
    }
});


module.exports = AlignContent;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544382, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BorderRadius = function (_Declaration) {
    _inherits(BorderRadius, _Declaration);

    function BorderRadius() {
        _classCallCheck(this, BorderRadius);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change syntax, when add Mozilla prefix
     */
    BorderRadius.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-moz-') {
            return prefix + (BorderRadius.toMozilla[prop] || prop);
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return unprefixed version of property
     */


    BorderRadius.prototype.normalize = function normalize(prop) {
        return BorderRadius.toNormal[prop] || prop;
    };

    return BorderRadius;
}(Declaration);

Object.defineProperty(BorderRadius, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-radius']
});
Object.defineProperty(BorderRadius, 'toMozilla', {
    enumerable: true,
    writable: true,
    value: {}
});
Object.defineProperty(BorderRadius, 'toNormal', {
    enumerable: true,
    writable: true,
    value: {}
});
var _arr = ['top', 'bottom'];


for (var _i = 0; _i < _arr.length; _i++) {
    var ver = _arr[_i];var _arr2 = ['left', 'right'];

    for (var _i2 = 0; _i2 < _arr2.length; _i2++) {
        var hor = _arr2[_i2];
        var normal = 'border-' + ver + '-' + hor + '-radius';
        var mozilla = 'border-radius-' + ver + hor;

        BorderRadius.names.push(normal);
        BorderRadius.names.push(mozilla);

        BorderRadius.toMozilla[normal] = mozilla;
        BorderRadius.toNormal[mozilla] = normal;
    }
}

module.exports = BorderRadius;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544383, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BlockLogical = function (_Declaration) {
    _inherits(BlockLogical, _Declaration);

    function BlockLogical() {
        _classCallCheck(this, BlockLogical);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Use old syntax for -moz- and -webkit-
     */
    BlockLogical.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + (prop.indexOf('-start') !== -1 ? prop.replace('-block-start', '-before') : prop.replace('-block-end', '-after'));
    };

    /**
     * Return property name by spec
     */


    BlockLogical.prototype.normalize = function normalize(prop) {
        if (prop.indexOf('-before') !== -1) {
            return prop.replace('-before', '-block-start');
        } else {
            return prop.replace('-after', '-block-end');
        }
    };

    return BlockLogical;
}(Declaration);

Object.defineProperty(BlockLogical, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end', 'border-before', 'border-after', 'margin-before', 'margin-after', 'padding-before', 'padding-after']
});


module.exports = BlockLogical;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544384, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var shorthand = require('./grid-shorthand');

var GridTemplate = function (_Declaration) {
    _inherits(GridTemplate, _Declaration);

    function GridTemplate() {
        _classCallCheck(this, GridTemplate);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not add prefix for unsupported value in IE
     */
    GridTemplate.prototype.check = function check(decl) {
        return decl.value.includes('/') && !decl.value.includes('[') && !decl.value.includes('"') && !decl.value.includes('\'');
    };

    /**
     * Translate grid-template to separate -ms- prefixed properties
     */


    GridTemplate.prototype.insert = function insert(decl, prefix, prefixes) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        if (decl.parent.some(function (i) {
            return i.prop === '-ms-grid-rows';
        })) {
            return undefined;
        }

        var _shorthand$parseTempl = shorthand.parseTemplateShortcut(decl),
            templateRows = _shorthand$parseTempl[0],
            templateColumns = _shorthand$parseTempl[1];

        if (templateRows) {
            decl.cloneBefore({
                prop: '-ms-grid-rows',
                value: shorthand.changeRepeat(templateRows.join(''))
            });
        }

        if (templateColumns) {
            decl.cloneBefore({
                prop: '-ms-grid-columns',
                value: shorthand.changeRepeat(templateColumns.join(''))
            });
        }

        return decl;
    };

    return GridTemplate;
}(Declaration);

Object.defineProperty(GridTemplate, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-template']
});


module.exports = GridTemplate;
}, function(modId) { var map = {"../declaration":1625038544346,"./grid-shorthand":1625038544370}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544385, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var InlineLogical = function (_Declaration) {
    _inherits(InlineLogical, _Declaration);

    function InlineLogical() {
        _classCallCheck(this, InlineLogical);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Use old syntax for -moz- and -webkit-
     */
    InlineLogical.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + prop.replace('-inline', '');
    };

    /**
     * Return property name by spec
     */


    InlineLogical.prototype.normalize = function normalize(prop) {
        return prop.replace(/(margin|padding|border)-(start|end)/, '$1-inline-$2');
    };

    return InlineLogical;
}(Declaration);

Object.defineProperty(InlineLogical, 'names', {
    enumerable: true,
    writable: true,
    value: ['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end', 'border-start', 'border-end', 'margin-start', 'margin-end', 'padding-start', 'padding-end']
});


module.exports = InlineLogical;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544386, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridRowAlign = function (_Declaration) {
    _inherits(GridRowAlign, _Declaration);

    function GridRowAlign() {
        _classCallCheck(this, GridRowAlign);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not prefix flexbox values
     */
    GridRowAlign.prototype.check = function check(decl) {
        return decl.value.indexOf('flex-') === -1 && decl.value !== 'baseline';
    };

    /**
     * Change property name for IE
     */


    GridRowAlign.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + 'grid-row-align';
    };

    /**
     * Change IE property back
     */


    GridRowAlign.prototype.normalize = function normalize() {
        return 'align-self';
    };

    return GridRowAlign;
}(Declaration);

Object.defineProperty(GridRowAlign, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row-align']
});


module.exports = GridRowAlign;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544387, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var TransformDecl = function (_Declaration) {
    _inherits(TransformDecl, _Declaration);

    function TransformDecl() {
        _classCallCheck(this, TransformDecl);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Recursively check all parents for @keyframes
     */
    TransformDecl.prototype.keyframeParents = function keyframeParents(decl) {
        var parent = decl.parent;

        while (parent) {
            if (parent.type === 'atrule' && parent.name === 'keyframes') {
                return true;
            }
            var _parent = parent;
            parent = _parent.parent;
        }
        return false;
    };

    /**
     * Is transform contain 3D commands
     */


    TransformDecl.prototype.contain3d = function contain3d(decl) {
        if (decl.prop === 'transform-origin') {
            return false;
        }

        for (var _iterator = TransformDecl.functions3d, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var func = _ref;

            if (decl.value.indexOf(func + '(') !== -1) {
                return true;
            }
        }

        return false;
    };

    /**
     * Replace rotateZ to rotate for IE 9
     */


    TransformDecl.prototype.set = function set(decl, prefix) {
        decl = _Declaration.prototype.set.call(this, decl, prefix);
        if (prefix === '-ms-') {
            decl.value = decl.value.replace(/rotateZ/gi, 'rotate');
        }
        return decl;
    };

    /**
     * Don't add prefix for IE in keyframes
     */


    TransformDecl.prototype.insert = function insert(decl, prefix, prefixes) {
        if (prefix === '-ms-') {
            if (!this.contain3d(decl) && !this.keyframeParents(decl)) {
                return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
            }
        } else if (prefix === '-o-') {
            if (!this.contain3d(decl)) {
                return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
            }
        } else {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        }
        return undefined;
    };

    return TransformDecl;
}(Declaration);

Object.defineProperty(TransformDecl, 'names', {
    enumerable: true,
    writable: true,
    value: ['transform', 'transform-origin']
});
Object.defineProperty(TransformDecl, 'functions3d', {
    enumerable: true,
    writable: true,
    value: ['matrix3d', 'translate3d', 'translateZ', 'scale3d', 'scaleZ', 'rotate3d', 'rotateX', 'rotateY', 'perspective']
});


module.exports = TransformDecl;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544388, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var FlexDirection = function (_Declaration) {
    _inherits(FlexDirection, _Declaration);

    function FlexDirection() {
        _classCallCheck(this, FlexDirection);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Return property name by final spec
     */
    FlexDirection.prototype.normalize = function normalize() {
        return 'flex-direction';
    };

    /**
     * Use two properties for 2009 spec
     */


    FlexDirection.prototype.insert = function insert(decl, prefix, prefixes) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec !== 2009) {
            return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);
        } else {
            var already = decl.parent.some(function (i) {
                return i.prop === prefix + 'box-orient' || i.prop === prefix + 'box-direction';
            });
            if (already) {
                return undefined;
            }

            var v = decl.value;
            var orient = void 0,
                dir = void 0;
            if (v === 'inherit' || v === 'initial' || v === 'unset') {
                orient = v;
                dir = v;
            } else {
                orient = v.indexOf('row') !== -1 ? 'horizontal' : 'vertical';
                dir = v.indexOf('reverse') !== -1 ? 'reverse' : 'normal';
            }

            var cloned = this.clone(decl);
            cloned.prop = prefix + 'box-orient';
            cloned.value = orient;
            if (this.needCascade(decl)) {
                cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
            }
            decl.parent.insertBefore(decl, cloned);

            cloned = this.clone(decl);
            cloned.prop = prefix + 'box-direction';
            cloned.value = dir;
            if (this.needCascade(decl)) {
                cloned.raws.before = this.calcBefore(prefixes, decl, prefix);
            }
            return decl.parent.insertBefore(decl, cloned);
        }
    };

    /**
     * Clean two properties for 2009 spec
     */


    FlexDirection.prototype.old = function old(prop, prefix) {
        var spec = void 0;

        var _flexSpec2 = flexSpec(prefix);

        spec = _flexSpec2[0];
        prefix = _flexSpec2[1];

        if (spec === 2009) {
            return [prefix + 'box-orient', prefix + 'box-direction'];
        } else {
            return _Declaration.prototype.old.call(this, prop, prefix);
        }
    };

    return FlexDirection;
}(Declaration);

Object.defineProperty(FlexDirection, 'names', {
    enumerable: true,
    writable: true,
    value: ['flex-direction', 'box-direction', 'box-orient']
});


module.exports = FlexDirection;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544389, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var ImageRendering = function (_Declaration) {
    _inherits(ImageRendering, _Declaration);

    function ImageRendering() {
        _classCallCheck(this, ImageRendering);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Add hack only for crisp-edges
     */
    ImageRendering.prototype.check = function check(decl) {
        return decl.value === 'pixelated';
    };

    /**
     * Change property name for IE
     */


    ImageRendering.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-ms-') {
            return '-ms-interpolation-mode';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Change property and value for IE
     */


    ImageRendering.prototype.set = function set(decl, prefix) {
        if (prefix !== '-ms-') return _Declaration.prototype.set.call(this, decl, prefix);
        decl.prop = '-ms-interpolation-mode';
        decl.value = 'nearest-neighbor';
        return decl;
    };

    /**
     * Return property name by spec
     */


    ImageRendering.prototype.normalize = function normalize() {
        return 'image-rendering';
    };

    /**
     * Warn on old value
     */


    ImageRendering.prototype.process = function process(node, result) {
        return _Declaration.prototype.process.call(this, node, result);
    };

    return ImageRendering;
}(Declaration);

Object.defineProperty(ImageRendering, 'names', {
    enumerable: true,
    writable: true,
    value: ['image-rendering', 'interpolation-mode']
});


module.exports = ImageRendering;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544390, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BASIC = ['none', 'underline', 'overline', 'line-through', 'blink', 'inherit', 'initial', 'unset'];

var TextDecoration = function (_Declaration) {
    _inherits(TextDecoration, _Declaration);

    function TextDecoration() {
        _classCallCheck(this, TextDecoration);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not add prefixes for basic values.
     */
    TextDecoration.prototype.check = function check(decl) {
        return decl.value.split(/\s+/).some(function (i) {
            return BASIC.indexOf(i) === -1;
        });
    };

    return TextDecoration;
}(Declaration);

Object.defineProperty(TextDecoration, 'names', {
    enumerable: true,
    writable: true,
    value: ['text-decoration']
});


module.exports = TextDecoration;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544391, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var Declaration = require('../declaration');

var JustifyContent = function (_Declaration) {
    _inherits(JustifyContent, _Declaration);

    function JustifyContent() {
        _classCallCheck(this, JustifyContent);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for 2009 and 2012 specs
     */
    JustifyContent.prototype.prefixed = function prefixed(prop, prefix) {
        var spec = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];

        if (spec === 2009) {
            return prefix + 'box-pack';
        } else if (spec === 2012) {
            return prefix + 'flex-pack';
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Return property name by final spec
     */


    JustifyContent.prototype.normalize = function normalize() {
        return 'justify-content';
    };

    /**
     * Change value for 2009 and 2012 specs
     */


    JustifyContent.prototype.set = function set(decl, prefix) {
        var spec = flexSpec(prefix)[0];
        if (spec === 2009 || spec === 2012) {
            var value = JustifyContent.oldValues[decl.value] || decl.value;
            decl.value = value;
            if (spec !== 2009 || value !== 'distribute') {
                return _Declaration.prototype.set.call(this, decl, prefix);
            }
        } else if (spec === 'final') {
            return _Declaration.prototype.set.call(this, decl, prefix);
        }
        return undefined;
    };

    return JustifyContent;
}(Declaration);

Object.defineProperty(JustifyContent, 'names', {
    enumerable: true,
    writable: true,
    value: ['justify-content', 'flex-pack', 'box-pack']
});
Object.defineProperty(JustifyContent, 'oldValues', {
    enumerable: true,
    writable: true,
    value: {
        'flex-end': 'end',
        'flex-start': 'start',
        'space-between': 'justify',
        'space-around': 'distribute'
    }
});


module.exports = JustifyContent;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544392, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var BackgroundSize = function (_Declaration) {
    _inherits(BackgroundSize, _Declaration);

    function BackgroundSize() {
        _classCallCheck(this, BackgroundSize);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Duplication parameter for -webkit- browsers
     */
    BackgroundSize.prototype.set = function set(decl, prefix) {
        var value = decl.value.toLowerCase();
        if (prefix === '-webkit-' && value.indexOf(' ') === -1 && value !== 'contain' && value !== 'cover') {
            decl.value = decl.value + ' ' + decl.value;
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return BackgroundSize;
}(Declaration);

Object.defineProperty(BackgroundSize, 'names', {
    enumerable: true,
    writable: true,
    value: ['background-size']
});


module.exports = BackgroundSize;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544393, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var shorthand = require('./grid-shorthand');

var GridRowColumn = function (_Declaration) {
    _inherits(GridRowColumn, _Declaration);

    function GridRowColumn() {
        _classCallCheck(this, GridRowColumn);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Translate grid-row / grid-column to separate -ms- prefixed properties
     */
    GridRowColumn.prototype.insert = function insert(decl, prefix, prefixes) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        var values = shorthand.parse(decl);

        var _shorthand$translate = shorthand.translate(values, 0, 1),
            start = _shorthand$translate[0],
            span = _shorthand$translate[1];

        if (start) {
            decl.cloneBefore({
                prop: '-ms-' + decl.prop,
                value: start.toString()
            });
        }

        if (span) {
            decl.cloneBefore({
                prop: '-ms-' + decl.prop + '-span',
                value: span.toString()
            });
        }

        return undefined;
    };

    return GridRowColumn;
}(Declaration);

Object.defineProperty(GridRowColumn, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-row', 'grid-column']
});


module.exports = GridRowColumn;
}, function(modId) { var map = {"../declaration":1625038544346,"./grid-shorthand":1625038544370}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544394, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');
var shorthand = require('./grid-shorthand');

var GridRowsColumns = function (_Declaration) {
    _inherits(GridRowsColumns, _Declaration);

    function GridRowsColumns() {
        _classCallCheck(this, GridRowsColumns);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Change property name for IE
     */
    GridRowsColumns.prototype.prefixed = function prefixed(prop, prefix) {
        if (prefix === '-ms-') {
            return prefix + prop.replace('template-', '');
        } else {
            return _Declaration.prototype.prefixed.call(this, prop, prefix);
        }
    };

    /**
     * Change IE property back
     */


    GridRowsColumns.prototype.normalize = function normalize(prop) {
        return prop.replace(/^grid-(rows|columns)/, 'grid-template-$1');
    };

    /**
     * Change repeating syntax for IE
     */


    GridRowsColumns.prototype.set = function set(decl, prefix) {
        if (prefix === '-ms-' && decl.value.indexOf('repeat(') !== -1) {
            decl.value = shorthand.changeRepeat(decl.value);
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return GridRowsColumns;
}(Declaration);

Object.defineProperty(GridRowsColumns, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-template-rows', 'grid-template-columns', 'grid-rows', 'grid-columns']
});


module.exports = GridRowsColumns;
}, function(modId) { var map = {"../declaration":1625038544346,"./grid-shorthand":1625038544370}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544395, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var GridColumnAlign = function (_Declaration) {
    _inherits(GridColumnAlign, _Declaration);

    function GridColumnAlign() {
        _classCallCheck(this, GridColumnAlign);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    /**
     * Do not prefix flexbox values
     */
    GridColumnAlign.prototype.check = function check(decl) {
        return decl.value.indexOf('flex-') === -1 && decl.value !== 'baseline';
    };

    /**
     * Change property name for IE
     */


    GridColumnAlign.prototype.prefixed = function prefixed(prop, prefix) {
        return prefix + 'grid-column-align';
    };

    /**
     * Change IE property back
     */


    GridColumnAlign.prototype.normalize = function normalize() {
        return 'justify-self';
    };

    return GridColumnAlign;
}(Declaration);

Object.defineProperty(GridColumnAlign, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-column-align']
});


module.exports = GridColumnAlign;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544396, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var DOTS = /^\.+$/;

function track(start, end) {
    return { start: start, end: end, span: end - start };
}

function getRows(tpl) {
    return tpl.trim().slice(1, -1).split(/['"]\s*['"]?/g);
}

function getColumns(line) {
    return line.trim().split(/\s+/g);
}

function parseGridAreas(tpl) {
    return getRows(tpl).reduce(function (areas, line, rowIndex) {
        if (line.trim() === '') return areas;
        getColumns(line).forEach(function (area, columnIndex) {
            if (DOTS.test(area)) return;
            if (typeof areas[area] === 'undefined') {
                areas[area] = {
                    column: track(columnIndex + 1, columnIndex + 2),
                    row: track(rowIndex + 1, rowIndex + 2)
                };
            } else {
                var _areas$area = areas[area],
                    column = _areas$area.column,
                    row = _areas$area.row;


                column.start = Math.min(column.start, columnIndex + 1);
                column.end = Math.max(column.end, columnIndex + 2);
                column.span = column.end - column.start;

                row.start = Math.min(row.start, rowIndex + 1);
                row.end = Math.max(row.end, rowIndex + 2);
                row.span = row.end - row.start;
            }
        });
        return areas;
    }, {});
}

var GridTemplateAreas = function (_Declaration) {
    _inherits(GridTemplateAreas, _Declaration);

    function GridTemplateAreas() {
        _classCallCheck(this, GridTemplateAreas);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    GridTemplateAreas.prototype.getRoot = function getRoot(parent) {
        if (parent.type === 'atrule' || !parent.parent) {
            return parent;
        }
        return this.getRoot(parent.parent);
    };

    /**
     * Translate grid-template-areas to separate -ms- prefixed properties
     */


    GridTemplateAreas.prototype.insert = function insert(decl, prefix, prefixes, result) {
        if (prefix !== '-ms-') return _Declaration.prototype.insert.call(this, decl, prefix, prefixes);

        var areas = parseGridAreas(decl.value);
        var missed = Object.keys(areas);

        this.getRoot(decl.parent).walkDecls('grid-area', function (gridArea) {
            var value = gridArea.value;
            var area = areas[value];

            missed = missed.filter(function (e) {
                return e !== value;
            });

            if (area) {
                gridArea.parent.walkDecls(/-ms-grid-(row|column)/, function (d) {
                    d.remove();
                });

                gridArea.cloneBefore({
                    prop: '-ms-grid-row',
                    value: String(area.row.start)
                });
                if (area.row.span > 1) {
                    gridArea.cloneBefore({
                        prop: '-ms-grid-row-span',
                        value: String(area.row.span)
                    });
                }
                gridArea.cloneBefore({
                    prop: '-ms-grid-column',
                    value: String(area.column.start)
                });
                if (area.column.span > 1) {
                    gridArea.cloneBefore({
                        prop: '-ms-grid-column-span',
                        value: String(area.column.span)
                    });
                }
            }
            return undefined;
        });

        if (missed.length > 0) {
            decl.warn(result, 'Can not find grid areas: ' + missed.join(', '));
        }

        return decl;
    };

    return GridTemplateAreas;
}(Declaration);

Object.defineProperty(GridTemplateAreas, 'names', {
    enumerable: true,
    writable: true,
    value: ['grid-template-areas']
});


module.exports = GridTemplateAreas;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544397, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Declaration = require('../declaration');

var TextEmphasisPosition = function (_Declaration) {
    _inherits(TextEmphasisPosition, _Declaration);

    function TextEmphasisPosition() {
        _classCallCheck(this, TextEmphasisPosition);

        return _possibleConstructorReturn(this, _Declaration.apply(this, arguments));
    }

    TextEmphasisPosition.prototype.set = function set(decl, prefix) {
        if (prefix === '-webkit-') {
            decl.value = decl.value.replace(/\s*(right|left)\s*/i, '');
        }
        return _Declaration.prototype.set.call(this, decl, prefix);
    };

    return TextEmphasisPosition;
}(Declaration);

Object.defineProperty(TextEmphasisPosition, 'names', {
    enumerable: true,
    writable: true,
    value: ['text-emphasis-position']
});


module.exports = TextEmphasisPosition;
}, function(modId) { var map = {"../declaration":1625038544346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544398, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OldValue = require('../old-value');
var Value = require('../value');
var utils = require('../utils');

var parser = require('postcss-value-parser');
var range = require('normalize-range');

var isDirection = /top|left|right|bottom/gi;

var Gradient = function (_Value) {
    _inherits(Gradient, _Value);

    function Gradient() {
        var _temp, _this, _ret;

        _classCallCheck(this, Gradient);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Value.call.apply(_Value, [this].concat(args))), _this), Object.defineProperty(_this, 'directions', {
            enumerable: true,
            writable: true,
            value: {
                top: 'bottom',
                left: 'right',
                bottom: 'top',
                right: 'left'
            }
        }), Object.defineProperty(_this, 'oldDirections', {
            enumerable: true,
            writable: true,
            value: {
                'top': 'left bottom, left top',
                'left': 'right top, left top',
                'bottom': 'left top, left bottom',
                'right': 'left top, right top',

                'top right': 'left bottom, right top',
                'top left': 'right bottom, left top',
                'right top': 'left bottom, right top',
                'right bottom': 'left top, right bottom',
                'bottom right': 'left top, right bottom',
                'bottom left': 'right top, left bottom',
                'left top': 'right bottom, left top',
                'left bottom': 'right top, left bottom'
            }
        }), _temp), _possibleConstructorReturn(_this, _ret);
    }

    // Direction to replace


    // Direction to replace


    /**
     * Change degrees for webkit prefix
     */
    Gradient.prototype.replace = function replace(string, prefix) {
        var ast = parser(string);
        for (var _iterator = ast.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var node = _ref;

            if (node.type === 'function' && node.value === this.name) {
                node.nodes = this.newDirection(node.nodes);
                node.nodes = this.normalize(node.nodes);
                if (prefix === '-webkit- old') {
                    var changes = this.oldWebkit(node);
                    if (!changes) {
                        return false;
                    }
                } else {
                    node.nodes = this.convertDirection(node.nodes);
                    node.value = prefix + node.value;
                }
            }
        }
        return ast.toString();
    };

    /**
     * Replace first token
     */


    Gradient.prototype.replaceFirst = function replaceFirst(params) {
        for (var _len2 = arguments.length, words = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            words[_key2 - 1] = arguments[_key2];
        }

        var prefix = words.map(function (i) {
            if (i === ' ') {
                return { type: 'space', value: i };
            } else {
                return { type: 'word', value: i };
            }
        });
        return prefix.concat(params.slice(1));
    };

    /**
     * Convert angle unit to deg
     */


    Gradient.prototype.normalizeUnit = function normalizeUnit(str, full) {
        var num = parseFloat(str);
        var deg = num / full * 360;
        return deg + 'deg';
    };

    /**
     * Normalize angle
     */


    Gradient.prototype.normalize = function normalize(nodes) {
        if (!nodes[0]) return nodes;

        if (/-?\d+(.\d+)?grad/.test(nodes[0].value)) {
            nodes[0].value = this.normalizeUnit(nodes[0].value, 400);
        } else if (/-?\d+(.\d+)?rad/.test(nodes[0].value)) {
            nodes[0].value = this.normalizeUnit(nodes[0].value, 2 * Math.PI);
        } else if (/-?\d+(.\d+)?turn/.test(nodes[0].value)) {
            nodes[0].value = this.normalizeUnit(nodes[0].value, 1);
        } else if (nodes[0].value.indexOf('deg') !== -1) {
            var num = parseFloat(nodes[0].value);
            num = range.wrap(0, 360, num);
            nodes[0].value = num + 'deg';
        }

        if (nodes[0].value === '0deg') {
            nodes = this.replaceFirst(nodes, 'to', ' ', 'top');
        } else if (nodes[0].value === '90deg') {
            nodes = this.replaceFirst(nodes, 'to', ' ', 'right');
        } else if (nodes[0].value === '180deg') {
            nodes = this.replaceFirst(nodes, 'to', ' ', 'bottom');
        } else if (nodes[0].value === '270deg') {
            nodes = this.replaceFirst(nodes, 'to', ' ', 'left');
        }

        return nodes;
    };

    /**
     * Replace old direction to new
     */


    Gradient.prototype.newDirection = function newDirection(params) {
        if (params[0].value === 'to') {
            return params;
        }
        isDirection.lastIndex = 0; // reset search index of global regexp
        if (!isDirection.test(params[0].value)) {
            return params;
        }

        params.unshift({
            type: 'word',
            value: 'to'
        }, {
            type: 'space',
            value: ' '
        });

        for (var i = 2; i < params.length; i++) {
            if (params[i].type === 'div') {
                break;
            }
            if (params[i].type === 'word') {
                params[i].value = this.revertDirection(params[i].value);
            }
        }

        return params;
    };

    /**
     * Change new direction to old
     */


    Gradient.prototype.convertDirection = function convertDirection(params) {
        if (params.length > 0) {
            if (params[0].value === 'to') {
                this.fixDirection(params);
            } else if (params[0].value.indexOf('deg') !== -1) {
                this.fixAngle(params);
            } else if (params[2] && params[2].value === 'at') {
                this.fixRadial(params);
            }
        }
        return params;
    };

    /**
     * Replace `to top left` to `bottom right`
     */


    Gradient.prototype.fixDirection = function fixDirection(params) {
        params.splice(0, 2);

        for (var _iterator2 = params, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
            var _ref2;

            if (_isArray2) {
                if (_i2 >= _iterator2.length) break;
                _ref2 = _iterator2[_i2++];
            } else {
                _i2 = _iterator2.next();
                if (_i2.done) break;
                _ref2 = _i2.value;
            }

            var param = _ref2;

            if (param.type === 'div') {
                break;
            }
            if (param.type === 'word') {
                param.value = this.revertDirection(param.value);
            }
        }
    };

    /**
     * Add 90 degrees
     */


    Gradient.prototype.fixAngle = function fixAngle(params) {
        var first = params[0].value;
        first = parseFloat(first);
        first = Math.abs(450 - first) % 360;
        first = this.roundFloat(first, 3);
        params[0].value = first + 'deg';
    };

    /**
     * Fix radial direction syntax
     */


    Gradient.prototype.fixRadial = function fixRadial(params) {
        var first = params[0];
        var second = [];
        var i = void 0;

        var div = void 0;
        for (i = 4; i < params.length; i++) {
            if (params[i].type === 'div') {
                div = params[i];
                break;
            } else {
                second.push(params[i]);
            }
        }

        params.splice.apply(params, [0, i].concat(second, [div, first]));
    };

    Gradient.prototype.revertDirection = function revertDirection(word) {
        return this.directions[word.toLowerCase()] || word;
    };

    /**
     * Round float and save digits under dot
     */


    Gradient.prototype.roundFloat = function roundFloat(float, digits) {
        return parseFloat(float.toFixed(digits));
    };

    /**
     * Convert to old webkit syntax
     */


    Gradient.prototype.oldWebkit = function oldWebkit(node) {
        var nodes = node.nodes;

        var string = parser.stringify(node.nodes);

        if (this.name !== 'linear-gradient') {
            return false;
        }
        if (nodes[0] && nodes[0].value.indexOf('deg') !== -1) {
            return false;
        }
        if (string.indexOf('px') !== -1 || string.indexOf('-corner') !== -1 || string.indexOf('-side') !== -1) {
            return false;
        }

        var params = [[]];
        for (var _iterator3 = nodes, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var i = _ref3;

            params[params.length - 1].push(i);
            if (i.type === 'div' && i.value === ',') {
                params.push([]);
            }
        }

        this.oldDirection(params);
        this.colorStops(params);

        node.nodes = [];
        for (var _iterator4 = params, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
            var _ref4;

            if (_isArray4) {
                if (_i4 >= _iterator4.length) break;
                _ref4 = _iterator4[_i4++];
            } else {
                _i4 = _iterator4.next();
                if (_i4.done) break;
                _ref4 = _i4.value;
            }

            var param = _ref4;

            node.nodes = node.nodes.concat(param);
        }

        node.nodes.unshift({ type: 'word', value: 'linear' }, this.cloneDiv(node.nodes));
        node.value = '-webkit-gradient';

        return true;
    };

    /**
     * Change direction syntax to old webkit
     */


    Gradient.prototype.oldDirection = function oldDirection(params) {
        var div = this.cloneDiv(params[0]);

        if (params[0][0].value !== 'to') {
            return params.unshift([{ type: 'word', value: this.oldDirections.bottom }, div]);
        } else {
            var _words = [];
            for (var _iterator5 = params[0].slice(2), _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var node = _ref5;

                if (node.type === 'word') {
                    _words.push(node.value.toLowerCase());
                }
            }

            _words = _words.join(' ');
            var old = this.oldDirections[_words] || _words;

            params[0] = [{ type: 'word', value: old }, div];
            return params[0];
        }
    };

    /**
     * Get div token from exists parameters
     */


    Gradient.prototype.cloneDiv = function cloneDiv(params) {
        for (var _iterator6 = params, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref6 = _iterator6[_i6++];
            } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref6 = _i6.value;
            }

            var i = _ref6;

            if (i.type === 'div' && i.value === ',') {
                return i;
            }
        }
        return { type: 'div', value: ',', after: ' ' };
    };

    /**
     * Change colors syntax to old webkit
     */


    Gradient.prototype.colorStops = function colorStops(params) {
        var result = [];
        for (var i = 0; i < params.length; i++) {
            var pos = void 0;
            var param = params[i];
            var item = void 0;
            if (i === 0) {
                continue;
            }

            var color = parser.stringify(param[0]);
            if (param[1] && param[1].type === 'word') {
                pos = param[1].value;
            } else if (param[2] && param[2].type === 'word') {
                pos = param[2].value;
            }

            var stop = void 0;
            if (i === 1 && (!pos || pos === '0%')) {
                stop = 'from(' + color + ')';
            } else if (i === params.length - 1 && (!pos || pos === '100%')) {
                stop = 'to(' + color + ')';
            } else if (pos) {
                stop = 'color-stop(' + pos + ', ' + color + ')';
            } else {
                stop = 'color-stop(' + color + ')';
            }

            var div = param[param.length - 1];
            params[i] = [{ type: 'word', value: stop }];
            if (div.type === 'div' && div.value === ',') {
                item = params[i].push(div);
            }
            result.push(item);
        }
        return result;
    };

    /**
     * Remove old WebKit gradient too
     */


    Gradient.prototype.old = function old(prefix) {
        if (prefix === '-webkit-') {
            var type = this.name === 'linear-gradient' ? 'linear' : 'radial';
            var string = '-gradient';
            var regexp = utils.regexp('-webkit-(' + type + '-gradient|gradient\\(\\s*' + type + ')', false);

            return new OldValue(this.name, prefix + this.name, string, regexp);
        } else {
            return _Value.prototype.old.call(this, prefix);
        }
    };

    /**
     * Do not add non-webkit prefixes for list-style and object
     */


    Gradient.prototype.add = function add(decl, prefix) {
        var p = decl.prop;
        if (p.indexOf('mask') !== -1) {
            if (prefix === '-webkit-' || prefix === '-webkit- old') {
                return _Value.prototype.add.call(this, decl, prefix);
            }
        } else if (p === 'list-style' || p === 'list-style-image' || p === 'content') {
            if (prefix === '-webkit-' || prefix === '-webkit- old') {
                return _Value.prototype.add.call(this, decl, prefix);
            }
        } else {
            return _Value.prototype.add.call(this, decl, prefix);
        }
        return undefined;
    };

    return Gradient;
}(Value);

Object.defineProperty(Gradient, 'names', {
    enumerable: true,
    writable: true,
    value: ['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient']
});


module.exports = Gradient;
}, function(modId) { var map = {"../old-value":1625038544352,"../value":1625038544351,"../utils":1625038544344}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544399, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OldValue = require('../old-value');
var Value = require('../value');

function _regexp(name) {
    return new RegExp('(^|[\\s,(])(' + name + '($|[\\s),]))', 'gi');
}

var Intrinsic = function (_Value) {
    _inherits(Intrinsic, _Value);

    function Intrinsic() {
        _classCallCheck(this, Intrinsic);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    Intrinsic.prototype.regexp = function regexp() {
        if (!this.regexpCache) this.regexpCache = _regexp(this.name);
        return this.regexpCache;
    };

    Intrinsic.prototype.isStretch = function isStretch() {
        return this.name === 'stretch' || this.name === 'fill' || this.name === 'fill-available';
    };

    Intrinsic.prototype.replace = function replace(string, prefix) {
        if (prefix === '-moz-' && this.isStretch()) {
            return string.replace(this.regexp(), '$1-moz-available$3');
        } else if (prefix === '-webkit-' && this.isStretch()) {
            return string.replace(this.regexp(), '$1-webkit-fill-available$3');
        } else {
            return _Value.prototype.replace.call(this, string, prefix);
        }
    };

    Intrinsic.prototype.old = function old(prefix) {
        var prefixed = prefix + this.name;
        if (this.isStretch()) {
            if (prefix === '-moz-') {
                prefixed = '-moz-available';
            } else if (prefix === '-webkit-') {
                prefixed = '-webkit-fill-available';
            }
        }
        return new OldValue(this.name, prefixed, prefixed, _regexp(prefixed));
    };

    Intrinsic.prototype.add = function add(decl, prefix) {
        if (decl.prop.indexOf('grid') !== -1 && prefix !== '-webkit-') {
            return undefined;
        }
        return _Value.prototype.add.call(this, decl, prefix);
    };

    return Intrinsic;
}(Value);

Object.defineProperty(Intrinsic, 'names', {
    enumerable: true,
    writable: true,
    value: ['max-content', 'min-content', 'fit-content', 'fill', 'fill-available', 'stretch']
});


module.exports = Intrinsic;
}, function(modId) { var map = {"../old-value":1625038544352,"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544400, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var OldValue = require('../old-value');
var Value = require('../value');

var Pixelated = function (_Value) {
    _inherits(Pixelated, _Value);

    function Pixelated() {
        _classCallCheck(this, Pixelated);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    /**
     * Use non-standard name for WebKit and Firefox
     */
    Pixelated.prototype.replace = function replace(string, prefix) {
        if (prefix === '-webkit-') {
            return string.replace(this.regexp(), '$1-webkit-optimize-contrast');
        } else if (prefix === '-moz-') {
            return string.replace(this.regexp(), '$1-moz-crisp-edges');
        } else {
            return _Value.prototype.replace.call(this, string, prefix);
        }
    };

    /**
     * Different name for WebKit and Firefox
     */


    Pixelated.prototype.old = function old(prefix) {
        if (prefix === '-webkit-') {
            return new OldValue(this.name, '-webkit-optimize-contrast');
        } else if (prefix === '-moz-') {
            return new OldValue(this.name, '-moz-crisp-edges');
        } else {
            return _Value.prototype.old.call(this, prefix);
        }
    };

    return Pixelated;
}(Value);

Object.defineProperty(Pixelated, 'names', {
    enumerable: true,
    writable: true,
    value: ['pixelated']
});


module.exports = Pixelated;
}, function(modId) { var map = {"../old-value":1625038544352,"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544401, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Value = require('../value');

var ImageSet = function (_Value) {
    _inherits(ImageSet, _Value);

    function ImageSet() {
        _classCallCheck(this, ImageSet);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    /**
     * Use non-standard name for WebKit and Firefox
     */
    ImageSet.prototype.replace = function replace(string, prefix) {
        var fixed = _Value.prototype.replace.call(this, string, prefix);
        if (prefix === '-webkit-') {
            fixed = fixed.replace(/("[^"]+"|'[^']+')(\s+\d+\w)/gi, 'url($1)$2');
        }
        return fixed;
    };

    return ImageSet;
}(Value);

Object.defineProperty(ImageSet, 'names', {
    enumerable: true,
    writable: true,
    value: ['image-set']
});


module.exports = ImageSet;
}, function(modId) { var map = {"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544402, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Value = require('../value');
var list = require('postcss').list;

var CrossFade = function (_Value) {
    _inherits(CrossFade, _Value);

    function CrossFade() {
        _classCallCheck(this, CrossFade);

        return _possibleConstructorReturn(this, _Value.apply(this, arguments));
    }

    CrossFade.prototype.replace = function replace(string, prefix) {
        var _this2 = this;

        return list.space(string).map(function (value) {
            if (value.slice(0, +_this2.name.length + 1) !== _this2.name + '(') {
                return value;
            }

            var close = value.lastIndexOf(')');
            var after = value.slice(close + 1);
            var args = value.slice(_this2.name.length + 1, close);

            if (prefix === '-webkit-') {
                var match = args.match(/\d*.?\d+%?/);
                if (match) {
                    args = args.slice(match[0].length).trim();
                    args += ', ' + match[0];
                } else {
                    args += ', 0.5';
                }
            }
            return prefix + _this2.name + '(' + args + ')' + after;
        }).join(' ');
    };

    return CrossFade;
}(Value);

Object.defineProperty(CrossFade, 'names', {
    enumerable: true,
    writable: true,
    value: ['cross-fade']
});


module.exports = CrossFade;
}, function(modId) { var map = {"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544403, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var flexSpec = require('./flex-spec');
var OldValue = require('../old-value');
var Value = require('../value');

var DisplayFlex = function (_Value) {
    _inherits(DisplayFlex, _Value);

    function DisplayFlex(name, prefixes) {
        _classCallCheck(this, DisplayFlex);

        var _this = _possibleConstructorReturn(this, _Value.call(this, name, prefixes));

        if (name === 'display-flex') {
            _this.name = 'flex';
        }
        return _this;
    }

    /**
     * Faster check for flex value
     */


    DisplayFlex.prototype.check = function check(decl) {
        return decl.prop === 'display' && decl.value === this.name;
    };

    /**
     * Return value by spec
     */


    DisplayFlex.prototype.prefixed = function prefixed(prefix) {
        var spec = void 0,
            value = void 0;

        var _flexSpec = flexSpec(prefix);

        spec = _flexSpec[0];
        prefix = _flexSpec[1];


        if (spec === 2009) {
            if (this.name === 'flex') {
                value = 'box';
            } else {
                value = 'inline-box';
            }
        } else if (spec === 2012) {
            if (this.name === 'flex') {
                value = 'flexbox';
            } else {
                value = 'inline-flexbox';
            }
        } else if (spec === 'final') {
            value = this.name;
        }

        return prefix + value;
    };

    /**
     * Add prefix to value depend on flebox spec version
     */


    DisplayFlex.prototype.replace = function replace(string, prefix) {
        return this.prefixed(prefix);
    };

    /**
     * Change value for old specs
     */


    DisplayFlex.prototype.old = function old(prefix) {
        var prefixed = this.prefixed(prefix);
        if (!prefixed) return undefined;
        return new OldValue(this.name, prefixed);
    };

    return DisplayFlex;
}(Value);

Object.defineProperty(DisplayFlex, 'names', {
    enumerable: true,
    writable: true,
    value: ['display-flex', 'inline-flex']
});


module.exports = DisplayFlex;
}, function(modId) { var map = {"./flex-spec":1625038544361,"../old-value":1625038544352,"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544404, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Value = require('../value');

var DisplayGrid = function (_Value) {
    _inherits(DisplayGrid, _Value);

    function DisplayGrid(name, prefixes) {
        _classCallCheck(this, DisplayGrid);

        var _this = _possibleConstructorReturn(this, _Value.call(this, name, prefixes));

        if (name === 'display-grid') {
            _this.name = 'grid';
        }
        return _this;
    }

    /**
     * Faster check for flex value
     */


    DisplayGrid.prototype.check = function check(decl) {
        return decl.prop === 'display' && decl.value === this.name;
    };

    return DisplayGrid;
}(Value);

Object.defineProperty(DisplayGrid, 'names', {
    enumerable: true,
    writable: true,
    value: ['display-grid', 'inline-grid']
});


module.exports = DisplayGrid;
}, function(modId) { var map = {"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544405, function(require, module, exports) {


function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var Value = require('../value');

var FilterValue = function (_Value) {
    _inherits(FilterValue, _Value);

    function FilterValue(name, prefixes) {
        _classCallCheck(this, FilterValue);

        var _this = _possibleConstructorReturn(this, _Value.call(this, name, prefixes));

        if (name === 'filter-function') {
            _this.name = 'filter';
        }
        return _this;
    }

    return FilterValue;
}(Value);

Object.defineProperty(FilterValue, 'names', {
    enumerable: true,
    writable: true,
    value: ['filter', 'filter-function']
});


module.exports = FilterValue;
}, function(modId) { var map = {"../value":1625038544351}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544406, function(require, module, exports) {


var browserslist = require('browserslist');

function capitalize(str) {
    return str.slice(0, 1).toUpperCase() + str.slice(1);
}

var names = {
    ie: 'IE',
    ie_mob: 'IE Mobile',
    ios_saf: 'iOS',
    op_mini: 'Opera Mini',
    op_mob: 'Opera Mobile',
    and_chr: 'Chrome for Android',
    and_ff: 'Firefox for Android',
    and_uc: 'UC for Android'
};

var prefix = function prefix(name, prefixes) {
    var out = '  ' + name + ': ';
    out += prefixes.map(function (i) {
        return i.replace(/^-(.*)-$/g, '$1');
    }).join(', ');
    out += '\n';
    return out;
};

module.exports = function (prefixes) {
    if (prefixes.browsers.selected.length === 0) {
        return 'No browsers selected';
    }

    var versions = {};
    for (var _iterator = prefixes.browsers.selected, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref = _i.value;
        }

        var browser = _ref;

        var _browser$split = browser.split(' '),
            name = _browser$split[0],
            version = _browser$split[1];

        name = names[name] || capitalize(name);
        if (versions[name]) {
            versions[name].push(version);
        } else {
            versions[name] = [version];
        }
    }

    var out = 'Browsers:\n';
    for (var _browser in versions) {
        var list = versions[_browser];
        list = list.sort(function (a, b) {
            return parseFloat(b) - parseFloat(a);
        });
        out += '  ' + _browser + ': ' + list.join(', ') + '\n';
    }

    var coverage = browserslist.coverage(prefixes.browsers.selected);
    var round = Math.round(coverage * 100) / 100.0;
    out += '\nThese browsers account for ' + round + '% of all users globally\n';

    var atrules = '';
    for (var name in prefixes.add) {
        var data = prefixes.add[name];
        if (name[0] === '@' && data.prefixes) {
            atrules += prefix(name, data.prefixes);
        }
    }
    if (atrules !== '') {
        out += '\nAt-Rules:\n' + atrules;
    }

    var selectors = '';
    for (var _iterator2 = prefixes.add.selectors, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref2 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref2 = _i2.value;
        }

        var selector = _ref2;

        if (selector.prefixes) {
            selectors += prefix(selector.name, selector.prefixes);
        }
    }
    if (selectors !== '') {
        out += '\nSelectors:\n' + selectors;
    }

    var values = '';
    var props = '';
    for (var _name in prefixes.add) {
        var _data = prefixes.add[_name];
        if (_name[0] !== '@' && _data.prefixes) {
            props += prefix(_name, _data.prefixes);
        }

        if (!_data.values) {
            continue;
        }
        for (var _iterator3 = _data.values, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var value = _ref3;

            var string = prefix(value.name, value.prefixes);
            if (values.indexOf(string) === -1) {
                values += string;
            }
        }
    }

    if (props !== '') {
        out += '\nProperties:\n' + props;
    }
    if (values !== '') {
        out += '\nValues:\n' + values;
    }

    if (atrules === '' && selectors === '' && props === '' && values === '') {
        out += '\nAwesome! Your browsers don\'t require any vendor prefixes.' + '\nNow you can remove Autoprefixer from build steps.';
    }

    return out;
};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544407, function(require, module, exports) {


var unpack = require('caniuse-lite').feature;

var browsersSort = function browsersSort(a, b) {
    a = a.split(' ');
    b = b.split(' ');
    if (a[0] > b[0]) {
        return 1;
    } else if (a[0] < b[0]) {
        return -1;
    } else {
        return Math.sign(parseFloat(a[1]) - parseFloat(b[1]));
    }
};

// Convert Can I Use data
function f(data, opts, callback) {
    data = unpack(data);

    if (!callback) {
        var _ref = [opts, {}];
        callback = _ref[0];
        opts = _ref[1];
    }

    var match = opts.match || /\sx($|\s)/;
    var need = [];

    for (var browser in data.stats) {
        var versions = data.stats[browser];
        for (var version in versions) {
            var support = versions[version];
            if (support.match(match)) {
                need.push(browser + ' ' + version);
            }
        }
    }

    callback(need.sort(browsersSort));
}

// Add data for all properties
var result = {};

var prefix = function prefix(names, data) {
    for (var _iterator = names, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
        var _ref2;

        if (_isArray) {
            if (_i >= _iterator.length) break;
            _ref2 = _iterator[_i++];
        } else {
            _i = _iterator.next();
            if (_i.done) break;
            _ref2 = _i.value;
        }

        var name = _ref2;

        result[name] = Object.assign({}, data);
    }
};

var add = function add(names, data) {
    for (var _iterator2 = names, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
        var _ref3;

        if (_isArray2) {
            if (_i2 >= _iterator2.length) break;
            _ref3 = _iterator2[_i2++];
        } else {
            _i2 = _iterator2.next();
            if (_i2.done) break;
            _ref3 = _i2.value;
        }

        var name = _ref3;

        result[name].browsers = result[name].browsers.concat(data.browsers).sort(browsersSort);
    }
};

module.exports = result;

// Border Radius
f(require('caniuse-lite/data/features/border-radius.js'), function (browsers) {
    return prefix(['border-radius', 'border-top-left-radius', 'border-top-right-radius', 'border-bottom-right-radius', 'border-bottom-left-radius'], {
        mistakes: ['-khtml-', '-ms-', '-o-'],
        feature: 'border-radius',
        browsers: browsers
    });
});

// Box Shadow
f(require('caniuse-lite/data/features/css-boxshadow.js'), function (browsers) {
    return prefix(['box-shadow'], {
        mistakes: ['-khtml-'],
        feature: 'css-boxshadow',
        browsers: browsers
    });
});

// Animation
f(require('caniuse-lite/data/features/css-animation.js'), function (browsers) {
    return prefix(['animation', 'animation-name', 'animation-duration', 'animation-delay', 'animation-direction', 'animation-fill-mode', 'animation-iteration-count', 'animation-play-state', 'animation-timing-function', '@keyframes'], {
        mistakes: ['-khtml-', '-ms-'],
        feature: 'css-animation',
        browsers: browsers
    });
});

// Transition
f(require('caniuse-lite/data/features/css-transitions.js'), function (browsers) {
    return prefix(['transition', 'transition-property', 'transition-duration', 'transition-delay', 'transition-timing-function'], {
        mistakes: ['-khtml-', '-ms-'],
        browsers: browsers,
        feature: 'css-transitions'
    });
});

// Transform 2D
f(require('caniuse-lite/data/features/transforms2d.js'), function (browsers) {
    return prefix(['transform', 'transform-origin'], {
        feature: 'transforms2d',
        browsers: browsers
    });
});

// Transform 3D
var transforms3d = require('caniuse-lite/data/features/transforms3d.js');

f(transforms3d, function (browsers) {
    prefix(['perspective', 'perspective-origin'], {
        feature: 'transforms3d',
        browsers: browsers
    });
    return prefix(['transform-style'], {
        mistakes: ['-ms-', '-o-'],
        browsers: browsers,
        feature: 'transforms3d'
    });
});

f(transforms3d, { match: /y\sx|y\s#2/ }, function (browsers) {
    return prefix(['backface-visibility'], {
        mistakes: ['-ms-', '-o-'],
        feature: 'transforms3d',
        browsers: browsers
    });
});

// Gradients
var gradients = require('caniuse-lite/data/features/css-gradients.js');

f(gradients, { match: /y\sx/ }, function (browsers) {
    return prefix(['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        mistakes: ['-ms-'],
        feature: 'css-gradients',
        browsers: browsers
    });
});

f(gradients, { match: /a\sx/ }, function (browsers) {
    browsers = browsers.map(function (i) {
        if (/op/.test(i)) {
            return i;
        } else {
            return i + ' old';
        }
    });
    return add(['linear-gradient', 'repeating-linear-gradient', 'radial-gradient', 'repeating-radial-gradient'], {
        feature: 'css-gradients',
        browsers: browsers
    });
});

// Box sizing
f(require('caniuse-lite/data/features/css3-boxsizing.js'), function (browsers) {
    return prefix(['box-sizing'], {
        feature: 'css3-boxsizing',
        browsers: browsers
    });
});

// Filter Effects
f(require('caniuse-lite/data/features/css-filters.js'), function (browsers) {
    return prefix(['filter'], {
        feature: 'css-filters',
        browsers: browsers
    });
});

// filter() function
f(require('caniuse-lite/data/features/css-filter-function.js'), function (browsers) {
    return prefix(['filter-function'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        feature: 'css-filter-function',
        browsers: browsers
    });
});

// Backdrop-filter
f(require('caniuse-lite/data/features/css-backdrop-filter.js'), function (browsers) {
    return prefix(['backdrop-filter'], {
        feature: 'css-backdrop-filter',
        browsers: browsers
    });
});

// element() function
f(require('caniuse-lite/data/features/css-element-function.js'), function (browsers) {
    return prefix(['element'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        feature: 'css-element-function',
        browsers: browsers
    });
});

// Multicolumns
f(require('caniuse-lite/data/features/multicolumn.js'), function (browsers) {
    prefix(['columns', 'column-width', 'column-gap', 'column-rule', 'column-rule-color', 'column-rule-width'], {
        feature: 'multicolumn',
        browsers: browsers
    });

    prefix(['column-count', 'column-rule-style', 'column-span', 'column-fill', 'break-before', 'break-after', 'break-inside'], {
        feature: 'multicolumn',
        browsers: browsers
    });
});

// User select
f(require('caniuse-lite/data/features/user-select-none.js'), function (browsers) {
    return prefix(['user-select'], {
        mistakes: ['-khtml-'],
        feature: 'user-select-none',
        browsers: browsers
    });
});

// Flexible Box Layout
var flexbox = require('caniuse-lite/data/features/flexbox.js');
f(flexbox, { match: /a\sx/ }, function (browsers) {
    browsers = browsers.map(function (i) {
        if (/ie|firefox/.test(i)) {
            return i;
        } else {
            return i + ' 2009';
        }
    });
    prefix(['display-flex', 'inline-flex'], {
        props: ['display'],
        feature: 'flexbox',
        browsers: browsers
    });
    prefix(['flex', 'flex-grow', 'flex-shrink', 'flex-basis'], {
        feature: 'flexbox',
        browsers: browsers
    });
    prefix(['flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content'], {
        feature: 'flexbox',
        browsers: browsers
    });
});

f(flexbox, { match: /y\sx/ }, function (browsers) {
    add(['display-flex', 'inline-flex'], {
        feature: 'flexbox',
        browsers: browsers
    });
    add(['flex', 'flex-grow', 'flex-shrink', 'flex-basis'], {
        feature: 'flexbox',
        browsers: browsers
    });
    add(['flex-direction', 'flex-wrap', 'flex-flow', 'justify-content', 'order', 'align-items', 'align-self', 'align-content'], {
        feature: 'flexbox',
        browsers: browsers
    });
});

// calc() unit
f(require('caniuse-lite/data/features/calc.js'), function (browsers) {
    return prefix(['calc'], {
        props: ['*'],
        feature: 'calc',
        browsers: browsers
    });
});

// Background options
f(require('caniuse-lite/data/features/background-img-opts.js'), function (browsers) {
    return prefix(['background-clip', 'background-origin', 'background-size'], {
        feature: 'background-img-opts',
        browsers: browsers
    });
});

// Font feature settings
f(require('caniuse-lite/data/features/font-feature.js'), function (browsers) {
    return prefix(['font-feature-settings', 'font-variant-ligatures', 'font-language-override'], {
        feature: 'font-feature',
        browsers: browsers
    });
});

// CSS font-kerning property
f(require('caniuse-lite/data/features/font-kerning.js'), function (browsers) {
    return prefix(['font-kerning'], {
        feature: 'font-kerning',
        browsers: browsers
    });
});

// Border image
f(require('caniuse-lite/data/features/border-image.js'), function (browsers) {
    return prefix(['border-image'], {
        feature: 'border-image',
        browsers: browsers
    });
});

// Selection selector
f(require('caniuse-lite/data/features/css-selection.js'), function (browsers) {
    return prefix(['::selection'], {
        selector: true,
        feature: 'css-selection',
        browsers: browsers
    });
});

// Placeholder selector
f(require('caniuse-lite/data/features/css-placeholder.js'), function (browsers) {
    browsers = browsers.map(function (i) {
        var _i$split = i.split(' '),
            name = _i$split[0],
            version = _i$split[1];

        if (name === 'firefox' && parseFloat(version) <= 18) {
            return i + ' old';
        } else if (name === 'ie') {
            return i + ' old';
        } else {
            return i;
        }
    });

    prefix(['::placeholder'], {
        selector: true,
        feature: 'css-placeholder',
        browsers: browsers
    });
});

// Hyphenation
f(require('caniuse-lite/data/features/css-hyphens.js'), function (browsers) {
    return prefix(['hyphens'], {
        feature: 'css-hyphens',
        browsers: browsers
    });
});

// Fullscreen selector
var fullscreen = require('caniuse-lite/data/features/fullscreen.js');

f(fullscreen, function (browsers) {
    return prefix([':fullscreen'], {
        selector: true,
        feature: 'fullscreen',
        browsers: browsers
    });
});

f(fullscreen, { match: /x(\s#2|$)/ }, function (browsers) {
    return prefix(['::backdrop'], {
        selector: true,
        feature: 'fullscreen',
        browsers: browsers
    });
});

// Tab size
f(require('caniuse-lite/data/features/css3-tabsize.js'), function (browsers) {
    return prefix(['tab-size'], {
        feature: 'css3-tabsize',
        browsers: browsers
    });
});

// Intrinsic & extrinsic sizing
f(require('caniuse-lite/data/features/intrinsic-width.js'), function (browsers) {
    return prefix(['max-content', 'min-content', 'fit-content', 'fill', 'fill-available', 'stretch'], {
        props: ['width', 'min-width', 'max-width', 'height', 'min-height', 'max-height', 'inline-size', 'min-inline-size', 'max-inline-size', 'block-size', 'min-block-size', 'max-block-size', 'grid', 'grid-template', 'grid-template-rows', 'grid-template-columns', 'grid-auto-columns', 'grid-auto-rows'],
        feature: 'intrinsic-width',
        browsers: browsers
    });
});

// Zoom cursors
f(require('caniuse-lite/data/features/css3-cursors-newer.js'), function (browsers) {
    return prefix(['zoom-in', 'zoom-out'], {
        props: ['cursor'],
        feature: 'css3-cursors-newer',
        browsers: browsers
    });
});

// Grab cursors
f(require('caniuse-lite/data/features/css3-cursors-grab.js'), function (browsers) {
    return prefix(['grab', 'grabbing'], {
        props: ['cursor'],
        feature: 'css3-cursors-grab',
        browsers: browsers
    });
});

// Sticky position
f(require('caniuse-lite/data/features/css-sticky.js'), function (browsers) {
    return prefix(['sticky'], {
        props: ['position'],
        feature: 'css-sticky',
        browsers: browsers
    });
});

// Pointer Events
f(require('caniuse-lite/data/features/pointer.js'), function (browsers) {
    return prefix(['touch-action'], {
        feature: 'pointer',
        browsers: browsers
    });
});

// Text decoration
var decoration = require('caniuse-lite/data/features/text-decoration.js');

f(decoration, function (browsers) {
    return prefix(['text-decoration-style', 'text-decoration-color', 'text-decoration-line', 'text-decoration'], {
        feature: 'text-decoration',
        browsers: browsers
    });
});

f(decoration, { match: /x.*#[23]/ }, function (browsers) {
    return prefix(['text-decoration-skip'], {
        feature: 'text-decoration',
        browsers: browsers
    });
});

// Text Size Adjust
f(require('caniuse-lite/data/features/text-size-adjust.js'), function (browsers) {
    return prefix(['text-size-adjust'], {
        feature: 'text-size-adjust',
        browsers: browsers
    });
});

// CSS Masks
f(require('caniuse-lite/data/features/css-masks.js'), function (browsers) {
    prefix(['mask-clip', 'mask-composite', 'mask-image', 'mask-origin', 'mask-repeat', 'mask-border-repeat', 'mask-border-source'], {
        feature: 'css-masks',
        browsers: browsers
    });
    prefix(['mask', 'mask-position', 'mask-size', 'mask-border', 'mask-border-outset', 'mask-border-width', 'mask-border-slice'], {
        feature: 'css-masks',
        browsers: browsers
    });
});

// CSS clip-path property
f(require('caniuse-lite/data/features/css-clip-path.js'), function (browsers) {
    return prefix(['clip-path'], {
        feature: 'css-clip-path',
        browsers: browsers
    });
});

// Fragmented Borders and Backgrounds
f(require('caniuse-lite/data/features/css-boxdecorationbreak.js'), function (browsers) {
    return prefix(['box-decoration-break'], {
        feature: 'css-boxdecorationbreak',
        browsers: browsers
    });
});

// CSS3 object-fit/object-position
f(require('caniuse-lite/data/features/object-fit.js'), function (browsers) {
    return prefix(['object-fit', 'object-position'], {
        feature: 'object-fit',
        browsers: browsers
    });
});

// CSS Shapes
f(require('caniuse-lite/data/features/css-shapes.js'), function (browsers) {
    return prefix(['shape-margin', 'shape-outside', 'shape-image-threshold'], {
        feature: 'css-shapes',
        browsers: browsers
    });
});

// CSS3 text-overflow
f(require('caniuse-lite/data/features/text-overflow.js'), function (browsers) {
    return prefix(['text-overflow'], {
        feature: 'text-overflow',
        browsers: browsers
    });
});

// Viewport at-rule
f(require('caniuse-lite/data/features/css-deviceadaptation.js'), function (browsers) {
    return prefix(['@viewport'], {
        feature: 'css-deviceadaptation',
        browsers: browsers
    });
});

// Resolution Media Queries
var resolut = require('caniuse-lite/data/features/css-media-resolution.js');
f(resolut, { match: /( x($| )|a #3)/ }, function (browsers) {
    return prefix(['@resolution'], {
        feature: 'css-media-resolution',
        browsers: browsers
    });
});

// CSS text-align-last
f(require('caniuse-lite/data/features/css-text-align-last.js'), function (browsers) {
    return prefix(['text-align-last'], {
        feature: 'css-text-align-last',
        browsers: browsers
    });
});

// Crisp Edges Image Rendering Algorithm
var crispedges = require('caniuse-lite/data/features/css-crisp-edges.js');

f(crispedges, { match: /y x|a x #1/ }, function (browsers) {
    return prefix(['pixelated'], {
        props: ['image-rendering'],
        feature: 'css-crisp-edges',
        browsers: browsers
    });
});

f(crispedges, { match: /a x #2/ }, function (browsers) {
    return prefix(['image-rendering'], {
        feature: 'css-crisp-edges',
        browsers: browsers
    });
});

// Logical Properties
var logicalProps = require('caniuse-lite/data/features/css-logical-props.js');

f(logicalProps, function (browsers) {
    return prefix(['border-inline-start', 'border-inline-end', 'margin-inline-start', 'margin-inline-end', 'padding-inline-start', 'padding-inline-end'], {
        feature: 'css-logical-props',
        browsers: browsers
    });
});

f(logicalProps, { match: /x\s#2/ }, function (browsers) {
    return prefix(['border-block-start', 'border-block-end', 'margin-block-start', 'margin-block-end', 'padding-block-start', 'padding-block-end'], {
        feature: 'css-logical-props',
        browsers: browsers
    });
});

// CSS appearance
var appearance = require('caniuse-lite/data/features/css-appearance.js');
f(appearance, { match: /#2|x/ }, function (browsers) {
    return prefix(['appearance'], {
        feature: 'css-appearance',
        browsers: browsers
    });
});

// CSS Scroll snap points
f(require('caniuse-lite/data/features/css-snappoints.js'), function (browsers) {
    return prefix(['scroll-snap-type', 'scroll-snap-coordinate', 'scroll-snap-destination', 'scroll-snap-points-x', 'scroll-snap-points-y'], {
        feature: 'css-snappoints',
        browsers: browsers
    });
});

// CSS Regions
f(require('caniuse-lite/data/features/css-regions.js'), function (browsers) {
    return prefix(['flow-into', 'flow-from', 'region-fragment'], {
        feature: 'css-regions',
        browsers: browsers
    });
});

// CSS image-set
f(require('caniuse-lite/data/features/css-image-set.js'), function (browsers) {
    return prefix(['image-set'], {
        props: ['background', 'background-image', 'border-image', 'cursor', 'mask', 'mask-image', 'list-style', 'list-style-image', 'content'],
        feature: 'css-image-set',
        browsers: browsers
    });
});

// Writing Mode
var writingMode = require('caniuse-lite/data/features/css-writing-mode.js');
f(writingMode, { match: /a|x/ }, function (browsers) {
    return prefix(['writing-mode'], {
        feature: 'css-writing-mode',
        browsers: browsers
    });
});

// Cross-Fade Function
f(require('caniuse-lite/data/features/css-cross-fade.js'), function (browsers) {
    return prefix(['cross-fade'], {
        props: ['background', 'background-image', 'border-image', 'mask', 'list-style', 'list-style-image', 'content', 'mask-image'],
        feature: 'css-cross-fade',
        browsers: browsers
    });
});

// Read Only selector
f(require('caniuse-lite/data/features/css-read-only-write.js'), function (browsers) {
    return prefix([':read-only', ':read-write'], {
        selector: true,
        feature: 'css-read-only-write',
        browsers: browsers
    });
});

// Text Emphasize
f(require('caniuse-lite/data/features/text-emphasis.js'), function (browsers) {
    return prefix(['text-emphasis', 'text-emphasis-position', 'text-emphasis-style', 'text-emphasis-color'], {
        feature: 'text-emphasis',
        browsers: browsers
    });
});

// CSS Grid Layout
var grid = require('caniuse-lite/data/features/css-grid.js');

f(grid, function (browsers) {
    prefix(['display-grid', 'inline-grid'], {
        props: ['display'],
        feature: 'css-grid',
        browsers: browsers
    });
    prefix(['grid-template-columns', 'grid-template-rows', 'grid-row-start', 'grid-column-start', 'grid-row-end', 'grid-column-end', 'grid-row', 'grid-column', 'grid-area', 'grid-template', 'grid-template-areas'], {
        feature: 'css-grid',
        browsers: browsers
    });
});

f(grid, { match: /a x/ }, function (browsers) {
    return prefix(['grid-column-align', 'grid-row-align'], {
        feature: 'css-grid',
        browsers: browsers
    });
});

// CSS text-spacing
f(require('caniuse-lite/data/features/css-text-spacing.js'), function (browsers) {
    return prefix(['text-spacing'], {
        feature: 'css-text-spacing',
        browsers: browsers
    });
});

// :any-link selector
f(require('caniuse-lite/data/features/css-any-link.js'), function (browsers) {
    return prefix([':any-link'], {
        selector: true,
        feature: 'css-any-link',
        browsers: browsers
    });
});

// unicode-bidi
var bidi = require('caniuse-lite/data/features/css-unicode-bidi.js');

f(bidi, function (browsers) {
    return prefix(['isolate'], {
        props: ['unicode-bidi'],
        feature: 'css-unicode-bidi',
        browsers: browsers
    });
});

f(bidi, { match: /y x|a x #2/ }, function (browsers) {
    return prefix(['plaintext'], {
        props: ['unicode-bidi'],
        feature: 'css-unicode-bidi',
        browsers: browsers
    });
});

f(bidi, { match: /y x/ }, function (browsers) {
    return prefix(['isolate-override'], {
        props: ['unicode-bidi'],
        feature: 'css-unicode-bidi',
        browsers: browsers
    });
});
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038544342);
})()
//# sourceMappingURL=index.js.map