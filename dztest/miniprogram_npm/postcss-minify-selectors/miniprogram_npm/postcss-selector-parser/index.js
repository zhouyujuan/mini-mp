module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548151, function(require, module, exports) {


exports.__esModule = true;

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _selectors = require('./selectors');

var selectors = _interopRequireWildcard(_selectors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parser = function parser(processor) {
  return new _processor2.default(processor);
};

Object.assign(parser, selectors);

delete parser.__esModule;

exports.default = parser;
module.exports = exports['default'];
}, function(modId) {var map = {"./processor":1625038548152,"./selectors":1625038548173}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548152, function(require, module, exports) {


exports.__esModule = true;

var _parser = require("./parser");

var _parser2 = _interopRequireDefault(_parser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Processor = function () {
    function Processor(func, options) {
        _classCallCheck(this, Processor);

        this.func = func || function noop() {};
        this.funcRes = null;
        this.options = options;
    }

    Processor.prototype._shouldUpdateSelector = function _shouldUpdateSelector(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var merged = Object.assign({}, this.options, options);
        if (merged.updateSelector === false) {
            return false;
        } else {
            return typeof rule !== "string";
        }
    };

    Processor.prototype._isLossy = function _isLossy() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var merged = Object.assign({}, this.options, options);
        if (merged.lossless === false) {
            return true;
        } else {
            return false;
        }
    };

    Processor.prototype._root = function _root(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var parser = new _parser2.default(rule, this._parseOptions(options));
        return parser.root;
    };

    Processor.prototype._parseOptions = function _parseOptions(options) {
        return {
            lossy: this._isLossy(options)
        };
    };

    Processor.prototype._run = function _run(rule) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        return new Promise(function (resolve, reject) {
            try {
                var root = _this._root(rule, options);
                Promise.resolve(_this.func(root)).then(function (transform) {
                    var string = undefined;
                    if (_this._shouldUpdateSelector(rule, options)) {
                        string = root.toString();
                        rule.selector = string;
                    }
                    return { transform: transform, root: root, string: string };
                }).then(resolve, reject);
            } catch (e) {
                reject(e);
                return;
            }
        });
    };

    Processor.prototype._runSync = function _runSync(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        var root = this._root(rule, options);
        var transform = this.func(root);
        if (transform && typeof transform.then === "function") {
            throw new Error("Selector processor returned a promise to a synchronous call.");
        }
        var string = undefined;
        if (options.updateSelector && typeof rule !== "string") {
            string = root.toString();
            rule.selector = string;
        }
        return { transform: transform, root: root, string: string };
    };

    /**
     * Process rule into a selector AST.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {Promise<parser.Root>} The AST of the selector after processing it.
     */


    Processor.prototype.ast = function ast(rule, options) {
        return this._run(rule, options).then(function (result) {
            return result.root;
        });
    };

    /**
     * Process rule into a selector AST synchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {parser.Root} The AST of the selector after processing it.
     */


    Processor.prototype.astSync = function astSync(rule, options) {
        return this._runSync(rule, options).root;
    };

    /**
     * Process a selector into a transformed value asynchronously
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {Promise<any>} The value returned by the processor.
     */


    Processor.prototype.transform = function transform(rule, options) {
        return this._run(rule, options).then(function (result) {
            return result.transform;
        });
    };

    /**
     * Process a selector into a transformed value synchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {any} The value returned by the processor.
     */


    Processor.prototype.transformSync = function transformSync(rule, options) {
        return this._runSync(rule, options).transform;
    };

    /**
     * Process a selector into a new selector string asynchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {string} the selector after processing.
     */


    Processor.prototype.process = function process(rule, options) {
        return this._run(rule, options).then(function (result) {
            return result.string || result.root.toString();
        });
    };

    /**
     * Process a selector into a new selector string synchronously.
     * 
     * @param rule {postcss.Rule | string} The css selector to be processed
     * @param options The options for processing
     * @returns {string} the selector after processing.
     */


    Processor.prototype.processSync = function processSync(rule, options) {
        var result = this._runSync(rule, options);
        return result.string || result.root.toString();
    };

    return Processor;
}();

exports.default = Processor;
module.exports = exports["default"];
}, function(modId) { var map = {"./parser":1625038548153}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548153, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dotProp = require('dot-prop');

var _dotProp2 = _interopRequireDefault(_dotProp);

var _indexesOf = require('indexes-of');

var _indexesOf2 = _interopRequireDefault(_indexesOf);

var _uniq = require('uniq');

var _uniq2 = _interopRequireDefault(_uniq);

var _root = require('./selectors/root');

var _root2 = _interopRequireDefault(_root);

var _selector = require('./selectors/selector');

var _selector2 = _interopRequireDefault(_selector);

var _className = require('./selectors/className');

var _className2 = _interopRequireDefault(_className);

var _comment = require('./selectors/comment');

var _comment2 = _interopRequireDefault(_comment);

var _id = require('./selectors/id');

var _id2 = _interopRequireDefault(_id);

var _tag = require('./selectors/tag');

var _tag2 = _interopRequireDefault(_tag);

var _string = require('./selectors/string');

var _string2 = _interopRequireDefault(_string);

var _pseudo = require('./selectors/pseudo');

var _pseudo2 = _interopRequireDefault(_pseudo);

var _attribute = require('./selectors/attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _universal = require('./selectors/universal');

var _universal2 = _interopRequireDefault(_universal);

var _combinator = require('./selectors/combinator');

var _combinator2 = _interopRequireDefault(_combinator);

var _nesting = require('./selectors/nesting');

var _nesting2 = _interopRequireDefault(_nesting);

var _sortAscending = require('./sortAscending');

var _sortAscending2 = _interopRequireDefault(_sortAscending);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _tokenTypes = require('./tokenTypes');

var tokens = _interopRequireWildcard(_tokenTypes);

var _types = require('./selectors/types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getSource(startLine, startColumn, endLine, endColumn) {
    return {
        start: {
            line: startLine,
            column: startColumn
        },
        end: {
            line: endLine,
            column: endColumn
        }
    };
}

var Parser = function () {
    function Parser(rule) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Parser);

        this.rule = rule;
        this.options = Object.assign({ lossy: false, safe: false }, options);
        this.position = 0;
        this.root = new _root2.default();
        this.root.errorGenerator = this._errorGenerator();

        var selector = new _selector2.default();
        this.root.append(selector);
        this.current = selector;

        this.css = typeof this.rule === 'string' ? this.rule : this.rule.selector;

        if (this.options.lossy) {
            this.css = this.css.trim();
        }
        this.tokens = (0, _tokenize2.default)({
            css: this.css,
            error: this._errorGenerator(),
            safe: this.options.safe
        });

        this.loop();
    }

    Parser.prototype._errorGenerator = function _errorGenerator() {
        var _this = this;

        return function (message, errorOptions) {
            if (typeof _this.rule === 'string') {
                return new Error(message);
            }
            return _this.rule.error(message, errorOptions);
        };
    };

    Parser.prototype.attribute = function attribute() {
        var attr = [];
        var startingToken = this.currToken;
        this.position++;
        while (this.position < this.tokens.length && this.currToken[0] !== tokens.closeSquare) {
            attr.push(this.currToken);
            this.position++;
        }
        if (this.currToken[0] !== tokens.closeSquare) {
            return this.expected('closing square bracket', this.currToken[5]);
        }

        var len = attr.length;
        var node = {
            source: getSource(startingToken[1], startingToken[2], this.currToken[3], this.currToken[4]),
            sourceIndex: startingToken[5]
        };

        if (len === 1 && !~[tokens.word].indexOf(attr[0][0])) {
            return this.expected('attribute', attr[0][5]);
        }

        var pos = 0;
        var spaceBefore = '';
        var commentBefore = '';
        var lastAdded = null;
        var spaceAfterMeaningfulToken = false;

        while (pos < len) {
            var token = attr[pos];
            var content = this.content(token);
            var next = attr[pos + 1];

            switch (token[0]) {
                case tokens.space:
                    if (len === 1 || pos === 0 && this.content(next) === '|') {
                        return this.expected('attribute', token[5], content);
                    }
                    spaceAfterMeaningfulToken = true;
                    if (this.options.lossy) {
                        break;
                    }
                    if (lastAdded) {
                        var spaceProp = 'spaces.' + lastAdded + '.after';
                        _dotProp2.default.set(node, spaceProp, _dotProp2.default.get(node, spaceProp, '') + content);
                        var commentProp = 'raws.spaces.' + lastAdded + '.after';
                        var existingComment = _dotProp2.default.get(node, commentProp);
                        if (existingComment) {
                            _dotProp2.default.set(node, commentProp, existingComment + content);
                        }
                    } else {
                        spaceBefore = spaceBefore + content;
                        commentBefore = commentBefore + content;
                    }
                    break;
                case tokens.asterisk:
                    if (next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    } else if ((!node.namespace || lastAdded === "namespace" && !spaceAfterMeaningfulToken) && next) {
                        if (spaceBefore) {
                            _dotProp2.default.set(node, 'spaces.attribute.before', spaceBefore);
                            spaceBefore = '';
                        }
                        if (commentBefore) {
                            _dotProp2.default.set(node, 'raws.spaces.attribute.before', spaceBefore);
                            commentBefore = '';
                        }
                        node.namespace = (node.namespace || "") + content;
                        var rawValue = _dotProp2.default.get(node, "raws.namespace");
                        if (rawValue) {
                            node.raws.namespace += content;
                        }
                        lastAdded = 'namespace';
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.dollar:
                case tokens.caret:
                    if (next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.combinator:
                    if (content === '~' && next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    }
                    if (content !== '|') {
                        spaceAfterMeaningfulToken = false;
                        break;
                    }
                    if (next[0] === tokens.equals) {
                        node.operator = content;
                        lastAdded = 'operator';
                    } else if (!node.namespace && !node.attribute) {
                        node.namespace = true;
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.word:
                    if (next && this.content(next) === '|' && attr[pos + 2] && attr[pos + 2][0] !== tokens.equals && // this look-ahead probably fails with comment nodes involved.
                    !node.operator && !node.namespace) {
                        node.namespace = content;
                        lastAdded = 'namespace';
                    } else if (!node.attribute || lastAdded === "attribute" && !spaceAfterMeaningfulToken) {
                        if (spaceBefore) {
                            _dotProp2.default.set(node, 'spaces.attribute.before', spaceBefore);
                            spaceBefore = '';
                        }
                        if (commentBefore) {
                            _dotProp2.default.set(node, 'raws.spaces.attribute.before', commentBefore);
                            commentBefore = '';
                        }
                        node.attribute = (node.attribute || "") + content;
                        var _rawValue = _dotProp2.default.get(node, "raws.attribute");
                        if (_rawValue) {
                            node.raws.attribute += content;
                        }
                        lastAdded = 'attribute';
                    } else if (!node.value || lastAdded === "value" && !spaceAfterMeaningfulToken) {
                        node.value = (node.value || "") + content;
                        var _rawValue2 = _dotProp2.default.get(node, "raws.value");
                        if (_rawValue2) {
                            node.raws.value += content;
                        }
                        lastAdded = 'value';
                        _dotProp2.default.set(node, 'raws.unquoted', _dotProp2.default.get(node, 'raws.unquoted', '') + content);
                    } else if (content === 'i') {
                        if (node.value && (node.quoted || spaceAfterMeaningfulToken)) {
                            node.insensitive = true;
                            lastAdded = 'insensitive';
                            if (spaceBefore) {
                                _dotProp2.default.set(node, 'spaces.insensitive.before', spaceBefore);
                                spaceBefore = '';
                            }
                            if (commentBefore) {
                                _dotProp2.default.set(node, 'raws.spaces.insensitive.before', commentBefore);
                                commentBefore = '';
                            }
                        } else if (node.value) {
                            lastAdded = 'value';
                            node.value += 'i';
                            if (node.raws.value) {
                                node.raws.value += 'i';
                            }
                        }
                    }
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.str:
                    if (!node.attribute || !node.operator) {
                        return this.error('Expected an attribute followed by an operator preceding the string.', {
                            index: token[5]
                        });
                    }
                    node.value = content;
                    node.quoted = true;
                    lastAdded = 'value';
                    _dotProp2.default.set(node, 'raws.unquoted', content.slice(1, -1));
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.equals:
                    if (!node.attribute) {
                        return this.expected('attribute', token[5], content);
                    }
                    if (node.value) {
                        return this.error('Unexpected "=" found; an operator was already defined.', { index: token[5] });
                    }
                    node.operator = node.operator ? node.operator + content : content;
                    lastAdded = 'operator';
                    spaceAfterMeaningfulToken = false;
                    break;
                case tokens.comment:
                    if (lastAdded) {
                        if (spaceAfterMeaningfulToken || next && next[0] === tokens.space) {
                            var lastComment = _dotProp2.default.get(node, 'raws.spaces.' + lastAdded + '.after', _dotProp2.default.get(node, 'spaces.' + lastAdded + '.after', ''));
                            _dotProp2.default.set(node, 'raws.spaces.' + lastAdded + '.after', lastComment + content);
                        } else {
                            var lastValue = _dotProp2.default.get(node, 'raws.' + lastAdded, _dotProp2.default.get(node, lastAdded, ''));
                            _dotProp2.default.set(node, 'raws.' + lastAdded, lastValue + content);
                        }
                    } else {
                        commentBefore = commentBefore + content;
                    }
                    break;
                default:
                    return this.error('Unexpected "' + content + '" found.', { index: token[5] });
            }
            pos++;
        }

        this.newNode(new _attribute2.default(node));
        this.position++;
    };

    Parser.prototype.combinator = function combinator() {
        var current = this.currToken;
        if (this.content() === '|') {
            return this.namespace();
        }
        var node = new _combinator2.default({
            value: '',
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        });
        while (this.position < this.tokens.length && this.currToken && (this.currToken[0] === tokens.space || this.currToken[0] === tokens.combinator)) {
            var content = this.content();
            if (this.nextToken && this.nextToken[0] === tokens.combinator) {
                node.spaces.before = this.parseSpace(content);
                node.source = getSource(this.nextToken[1], this.nextToken[2], this.nextToken[3], this.nextToken[4]);
                node.sourceIndex = this.nextToken[5];
            } else if (this.prevToken && this.prevToken[0] === tokens.combinator) {
                node.spaces.after = this.parseSpace(content);
            } else if (this.currToken[0] === tokens.combinator) {
                node.value = content;
            } else if (this.currToken[0] === tokens.space) {
                node.value = this.parseSpace(content, ' ');
            }
            this.position++;
        }
        return this.newNode(node);
    };

    Parser.prototype.comma = function comma() {
        if (this.position === this.tokens.length - 1) {
            this.root.trailingComma = true;
            this.position++;
            return;
        }
        var selector = new _selector2.default();
        this.current.parent.append(selector);
        this.current = selector;
        this.position++;
    };

    Parser.prototype.comment = function comment() {
        var current = this.currToken;
        this.newNode(new _comment2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }));
        this.position++;
    };

    Parser.prototype.error = function error(message, opts) {
        throw this.root.error(message, opts);
    };

    Parser.prototype.missingBackslash = function missingBackslash() {
        return this.error('Expected a backslash preceding the semicolon.', {
            index: this.currToken[5]
        });
    };

    Parser.prototype.missingParenthesis = function missingParenthesis() {
        return this.expected('opening parenthesis', this.currToken[5]);
    };

    Parser.prototype.missingSquareBracket = function missingSquareBracket() {
        return this.expected('opening square bracket', this.currToken[5]);
    };

    Parser.prototype.namespace = function namespace() {
        var before = this.prevToken && this.content(this.prevToken) || true;
        if (this.nextToken[0] === tokens.word) {
            this.position++;
            return this.word(before);
        } else if (this.nextToken[0] === tokens.asterisk) {
            this.position++;
            return this.universal(before);
        }
    };

    Parser.prototype.nesting = function nesting() {
        var current = this.currToken;
        this.newNode(new _nesting2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }));
        this.position++;
    };

    Parser.prototype.parentheses = function parentheses() {
        var last = this.current.last;
        var balanced = 1;
        this.position++;
        if (last && last.type === types.PSEUDO) {
            var selector = new _selector2.default();
            var cache = this.current;
            last.append(selector);
            this.current = selector;
            while (this.position < this.tokens.length && balanced) {
                if (this.currToken[0] === tokens.openParenthesis) {
                    balanced++;
                }
                if (this.currToken[0] === tokens.closeParenthesis) {
                    balanced--;
                }
                if (balanced) {
                    this.parse();
                } else {
                    selector.parent.source.end.line = this.currToken[3];
                    selector.parent.source.end.column = this.currToken[4];
                    this.position++;
                }
            }
            this.current = cache;
        } else {
            last.value += '(';
            while (this.position < this.tokens.length && balanced) {
                if (this.currToken[0] === tokens.openParenthesis) {
                    balanced++;
                }
                if (this.currToken[0] === tokens.closeParenthesis) {
                    balanced--;
                }
                last.value += this.parseParenthesisToken(this.currToken);
                this.position++;
            }
        }
        if (balanced) {
            return this.expected('closing parenthesis', this.currToken[5]);
        }
    };

    Parser.prototype.pseudo = function pseudo() {
        var _this2 = this;

        var pseudoStr = '';
        var startingToken = this.currToken;
        while (this.currToken && this.currToken[0] === tokens.colon) {
            pseudoStr += this.content();
            this.position++;
        }
        if (!this.currToken) {
            return this.expected(['pseudo-class', 'pseudo-element'], this.position - 1);
        }
        if (this.currToken[0] === tokens.word) {
            this.splitWord(false, function (first, length) {
                pseudoStr += first;
                _this2.newNode(new _pseudo2.default({
                    value: pseudoStr,
                    source: getSource(startingToken[1], startingToken[2], _this2.currToken[3], _this2.currToken[4]),
                    sourceIndex: startingToken[5]
                }));
                if (length > 1 && _this2.nextToken && _this2.nextToken[0] === tokens.openParenthesis) {
                    _this2.error('Misplaced parenthesis.', {
                        index: _this2.nextToken[5]
                    });
                }
            });
        } else {
            return this.expected(['pseudo-class', 'pseudo-element'], this.currToken[5]);
        }
    };

    Parser.prototype.space = function space() {
        var content = this.content();
        // Handle space before and after the selector
        if (this.position === 0 || this.prevToken[0] === tokens.comma || this.prevToken[0] === tokens.openParenthesis) {
            this.spaces = this.parseSpace(content);
            this.position++;
        } else if (this.position === this.tokens.length - 1 || this.nextToken[0] === tokens.comma || this.nextToken[0] === tokens.closeParenthesis) {
            this.current.last.spaces.after = this.parseSpace(content);
            this.position++;
        } else {
            this.combinator();
        }
    };

    Parser.prototype.string = function string() {
        var current = this.currToken;
        this.newNode(new _string2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }));
        this.position++;
    };

    Parser.prototype.universal = function universal(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === '|') {
            this.position++;
            return this.namespace();
        }
        var current = this.currToken;
        this.newNode(new _universal2.default({
            value: this.content(),
            source: getSource(current[1], current[2], current[3], current[4]),
            sourceIndex: current[5]
        }), namespace);
        this.position++;
    };

    Parser.prototype.splitWord = function splitWord(namespace, firstCallback) {
        var _this3 = this;

        var nextToken = this.nextToken;
        var word = this.content();
        while (nextToken && ~[tokens.dollar, tokens.caret, tokens.equals, tokens.word].indexOf(nextToken[0])) {
            this.position++;
            var current = this.content();
            word += current;
            if (current.lastIndexOf('\\') === current.length - 1) {
                var next = this.nextToken;
                if (next && next[0] === tokens.space) {
                    word += this.parseSpace(this.content(next), ' ');
                    this.position++;
                }
            }
            nextToken = this.nextToken;
        }
        var hasClass = (0, _indexesOf2.default)(word, '.');
        var hasId = (0, _indexesOf2.default)(word, '#');
        // Eliminate Sass interpolations from the list of id indexes
        var interpolations = (0, _indexesOf2.default)(word, '#{');
        if (interpolations.length) {
            hasId = hasId.filter(function (hashIndex) {
                return !~interpolations.indexOf(hashIndex);
            });
        }
        var indices = (0, _sortAscending2.default)((0, _uniq2.default)([0].concat(hasClass, hasId)));
        indices.forEach(function (ind, i) {
            var index = indices[i + 1] || word.length;
            var value = word.slice(ind, index);
            if (i === 0 && firstCallback) {
                return firstCallback.call(_this3, value, indices.length);
            }
            var node = void 0;
            var current = _this3.currToken;
            var sourceIndex = current[5] + indices[i];
            var source = getSource(current[1], current[2] + ind, current[3], current[2] + (index - 1));
            if (~hasClass.indexOf(ind)) {
                node = new _className2.default({
                    value: value.slice(1),
                    source: source,
                    sourceIndex: sourceIndex
                });
            } else if (~hasId.indexOf(ind)) {
                node = new _id2.default({
                    value: value.slice(1),
                    source: source,
                    sourceIndex: sourceIndex
                });
            } else {
                node = new _tag2.default({
                    value: value,
                    source: source,
                    sourceIndex: sourceIndex
                });
            }
            _this3.newNode(node, namespace);
            // Ensure that the namespace is used only once
            namespace = null;
        });
        this.position++;
    };

    Parser.prototype.word = function word(namespace) {
        var nextToken = this.nextToken;
        if (nextToken && this.content(nextToken) === '|') {
            this.position++;
            return this.namespace();
        }
        return this.splitWord(namespace);
    };

    Parser.prototype.loop = function loop() {
        while (this.position < this.tokens.length) {
            this.parse(true);
        }
        return this.root;
    };

    Parser.prototype.parse = function parse(throwOnParenthesis) {
        switch (this.currToken[0]) {
            case tokens.space:
                this.space();
                break;
            case tokens.comment:
                this.comment();
                break;
            case tokens.openParenthesis:
                this.parentheses();
                break;
            case tokens.closeParenthesis:
                if (throwOnParenthesis) {
                    this.missingParenthesis();
                }
                break;
            case tokens.openSquare:
                this.attribute();
                break;
            case tokens.dollar:
            case tokens.caret:
            case tokens.equals:
            case tokens.word:
                this.word();
                break;
            case tokens.colon:
                this.pseudo();
                break;
            case tokens.comma:
                this.comma();
                break;
            case tokens.asterisk:
                this.universal();
                break;
            case tokens.ampersand:
                this.nesting();
                break;
            case tokens.combinator:
                this.combinator();
                break;
            case tokens.str:
                this.string();
                break;
            // These cases throw; no break needed.
            case tokens.closeSquare:
                this.missingSquareBracket();
            case tokens.semicolon:
                this.missingBackslash();
        }
    };

    /**
     * Helpers
     */

    Parser.prototype.expected = function expected(description, index, found) {
        if (Array.isArray(description)) {
            var last = description.pop();
            description = description.join(', ') + ' or ' + last;
        }
        var an = /^[aeiou]/.test(description[0]) ? 'an' : 'a';
        if (!found) {
            return this.error('Expected ' + an + ' ' + description + '.', { index: index });
        }
        return this.error('Expected ' + an + ' ' + description + ', found "' + found + '" instead.', { index: index });
    };

    Parser.prototype.parseNamespace = function parseNamespace(namespace) {
        if (this.options.lossy && typeof namespace === 'string') {
            var trimmed = namespace.trim();
            if (!trimmed.length) {
                return true;
            }

            return trimmed;
        }

        return namespace;
    };

    Parser.prototype.parseSpace = function parseSpace(space) {
        var replacement = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

        return this.options.lossy ? replacement : space;
    };

    Parser.prototype.parseValue = function parseValue(value) {
        if (!this.options.lossy || !value || typeof value !== 'string') {
            return value;
        }
        return value.trim();
    };

    Parser.prototype.parseParenthesisToken = function parseParenthesisToken(token) {
        var content = this.content(token);
        if (!this.options.lossy) {
            return content;
        }

        if (token[0] === tokens.space) {
            return this.parseSpace(content, ' ');
        }

        return this.parseValue(content);
    };

    Parser.prototype.newNode = function newNode(node, namespace) {
        if (namespace) {
            node.namespace = this.parseNamespace(namespace);
        }
        if (this.spaces) {
            node.spaces.before = this.spaces;
            this.spaces = '';
        }
        return this.current.append(node);
    };

    Parser.prototype.content = function content() {
        var token = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currToken;

        return this.css.slice(token[5], token[6]);
    };

    _createClass(Parser, [{
        key: 'currToken',
        get: function get() {
            return this.tokens[this.position];
        }
    }, {
        key: 'nextToken',
        get: function get() {
            return this.tokens[this.position + 1];
        }
    }, {
        key: 'prevToken',
        get: function get() {
            return this.tokens[this.position - 1];
        }
    }]);

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];
}, function(modId) { var map = {"./selectors/root":1625038548154,"./selectors/selector":1625038548158,"./selectors/className":1625038548159,"./selectors/comment":1625038548161,"./selectors/id":1625038548162,"./selectors/tag":1625038548163,"./selectors/string":1625038548164,"./selectors/pseudo":1625038548165,"./selectors/attribute":1625038548166,"./selectors/universal":1625038548167,"./selectors/combinator":1625038548168,"./selectors/nesting":1625038548169,"./sortAscending":1625038548170,"./tokenize":1625038548171,"./tokenTypes":1625038548172,"./selectors/types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548154, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Root = function (_Container) {
    _inherits(Root, _Container);

    function Root(opts) {
        _classCallCheck(this, Root);

        var _this = _possibleConstructorReturn(this, _Container.call(this, opts));

        _this.type = _types.ROOT;
        return _this;
    }

    Root.prototype.toString = function toString() {
        var str = this.reduce(function (memo, selector) {
            var sel = String(selector);
            return sel ? memo + sel + ',' : '';
        }, '').slice(0, -1);
        return this.trailingComma ? str + ',' : str;
    };

    Root.prototype.error = function error(message, options) {
        if (this._error) {
            return this._error(message, options);
        } else {
            return new Error(message);
        }
    };

    _createClass(Root, [{
        key: 'errorGenerator',
        set: function set(handler) {
            this._error = handler;
        }
    }]);

    return Root;
}(_container2.default);

exports.default = Root;
module.exports = exports['default'];
}, function(modId) { var map = {"./container":1625038548155,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548155, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _types = require('./types');

var types = _interopRequireWildcard(_types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Container = function (_Node) {
    _inherits(Container, _Node);

    function Container(opts) {
        _classCallCheck(this, Container);

        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));

        if (!_this.nodes) {
            _this.nodes = [];
        }
        return _this;
    }

    Container.prototype.append = function append(selector) {
        selector.parent = this;
        this.nodes.push(selector);
        return this;
    };

    Container.prototype.prepend = function prepend(selector) {
        selector.parent = this;
        this.nodes.unshift(selector);
        return this;
    };

    Container.prototype.at = function at(index) {
        return this.nodes[index];
    };

    Container.prototype.index = function index(child) {
        if (typeof child === 'number') {
            return child;
        }
        return this.nodes.indexOf(child);
    };

    Container.prototype.removeChild = function removeChild(child) {
        child = this.index(child);
        this.at(child).parent = undefined;
        this.nodes.splice(child, 1);

        var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (index >= child) {
                this.indexes[id] = index - 1;
            }
        }

        return this;
    };

    Container.prototype.removeAll = function removeAll() {
        for (var _iterator = this.nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
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

            node.parent = undefined;
        }
        this.nodes = [];
        return this;
    };

    Container.prototype.empty = function empty() {
        return this.removeAll();
    };

    Container.prototype.insertAfter = function insertAfter(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex + 1, 0, newNode);

        newNode.parent = this;

        var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (oldIndex <= index) {
                this.indexes[id] = index + 1;
            }
        }

        return this;
    };

    Container.prototype.insertBefore = function insertBefore(oldNode, newNode) {
        newNode.parent = this;
        var oldIndex = this.index(oldNode);
        this.nodes.splice(oldIndex, 0, newNode);

        newNode.parent = this;

        var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (index <= oldIndex) {
                this.indexes[id] = index + 1;
            }
        }

        return this;
    };

    Container.prototype.each = function each(callback) {
        if (!this.lastEach) {
            this.lastEach = 0;
        }
        if (!this.indexes) {
            this.indexes = {};
        }

        this.lastEach++;
        var id = this.lastEach;
        this.indexes[id] = 0;

        if (!this.length) {
            return undefined;
        }

        var index = void 0,
            result = void 0;
        while (this.indexes[id] < this.length) {
            index = this.indexes[id];
            result = callback(this.at(index), index);
            if (result === false) {
                break;
            }

            this.indexes[id] += 1;
        }

        delete this.indexes[id];

        if (result === false) {
            return false;
        }
    };

    Container.prototype.walk = function walk(callback) {
        return this.each(function (node, i) {
            var result = callback(node, i);

            if (result !== false && node.length) {
                result = node.walk(callback);
            }

            if (result === false) {
                return false;
            }
        });
    };

    Container.prototype.walkAttributes = function walkAttributes(callback) {
        var _this2 = this;

        return this.walk(function (selector) {
            if (selector.type === types.ATTRIBUTE) {
                return callback.call(_this2, selector);
            }
        });
    };

    Container.prototype.walkClasses = function walkClasses(callback) {
        var _this3 = this;

        return this.walk(function (selector) {
            if (selector.type === types.CLASS) {
                return callback.call(_this3, selector);
            }
        });
    };

    Container.prototype.walkCombinators = function walkCombinators(callback) {
        var _this4 = this;

        return this.walk(function (selector) {
            if (selector.type === types.COMBINATOR) {
                return callback.call(_this4, selector);
            }
        });
    };

    Container.prototype.walkComments = function walkComments(callback) {
        var _this5 = this;

        return this.walk(function (selector) {
            if (selector.type === types.COMMENT) {
                return callback.call(_this5, selector);
            }
        });
    };

    Container.prototype.walkIds = function walkIds(callback) {
        var _this6 = this;

        return this.walk(function (selector) {
            if (selector.type === types.ID) {
                return callback.call(_this6, selector);
            }
        });
    };

    Container.prototype.walkNesting = function walkNesting(callback) {
        var _this7 = this;

        return this.walk(function (selector) {
            if (selector.type === types.NESTING) {
                return callback.call(_this7, selector);
            }
        });
    };

    Container.prototype.walkPseudos = function walkPseudos(callback) {
        var _this8 = this;

        return this.walk(function (selector) {
            if (selector.type === types.PSEUDO) {
                return callback.call(_this8, selector);
            }
        });
    };

    Container.prototype.walkTags = function walkTags(callback) {
        var _this9 = this;

        return this.walk(function (selector) {
            if (selector.type === types.TAG) {
                return callback.call(_this9, selector);
            }
        });
    };

    Container.prototype.walkUniversals = function walkUniversals(callback) {
        var _this10 = this;

        return this.walk(function (selector) {
            if (selector.type === types.UNIVERSAL) {
                return callback.call(_this10, selector);
            }
        });
    };

    Container.prototype.split = function split(callback) {
        var _this11 = this;

        var current = [];
        return this.reduce(function (memo, node, index) {
            var split = callback.call(_this11, node);
            current.push(node);
            if (split) {
                memo.push(current);
                current = [];
            } else if (index === _this11.length - 1) {
                memo.push(current);
            }
            return memo;
        }, []);
    };

    Container.prototype.map = function map(callback) {
        return this.nodes.map(callback);
    };

    Container.prototype.reduce = function reduce(callback, memo) {
        return this.nodes.reduce(callback, memo);
    };

    Container.prototype.every = function every(callback) {
        return this.nodes.every(callback);
    };

    Container.prototype.some = function some(callback) {
        return this.nodes.some(callback);
    };

    Container.prototype.filter = function filter(callback) {
        return this.nodes.filter(callback);
    };

    Container.prototype.sort = function sort(callback) {
        return this.nodes.sort(callback);
    };

    Container.prototype.toString = function toString() {
        return this.map(String).join('');
    };

    _createClass(Container, [{
        key: 'first',
        get: function get() {
            return this.at(0);
        }
    }, {
        key: 'last',
        get: function get() {
            return this.at(this.length - 1);
        }
    }, {
        key: 'length',
        get: function get() {
            return this.nodes.length;
        }
    }]);

    return Container;
}(_node2.default);

exports.default = Container;
module.exports = exports['default'];
}, function(modId) { var map = {"./node":1625038548156,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548156, function(require, module, exports) {


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cloneNode = function cloneNode(obj, parent) {
    if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object') {
        return obj;
    }

    var cloned = new obj.constructor();

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {
            continue;
        }
        var value = obj[i];
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        if (i === 'parent' && type === 'object') {
            if (parent) {
                cloned[i] = parent;
            }
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (j) {
                return cloneNode(j, cloned);
            });
        } else {
            cloned[i] = cloneNode(value, cloned);
        }
    }

    return cloned;
};

var _class = function () {
    function _class() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, _class);

        Object.assign(this, opts);
        this.spaces = this.spaces || {};
        this.spaces.before = this.spaces.before || '';
        this.spaces.after = this.spaces.after || '';
    }

    _class.prototype.remove = function remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = undefined;
        return this;
    };

    _class.prototype.replaceWith = function replaceWith() {
        if (this.parent) {
            for (var index in arguments) {
                this.parent.insertBefore(this, arguments[index]);
            }
            this.remove();
        }
        return this;
    };

    _class.prototype.next = function next() {
        return this.parent.at(this.parent.index(this) + 1);
    };

    _class.prototype.prev = function prev() {
        return this.parent.at(this.parent.index(this) - 1);
    };

    _class.prototype.clone = function clone() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = cloneNode(this);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    _class.prototype.toString = function toString() {
        return [this.spaces.before, String(this.value), this.spaces.after].join('');
    };

    return _class;
}();

exports.default = _class;
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548157, function(require, module, exports) {


exports.__esModule = true;
var TAG = exports.TAG = 'tag';
var STRING = exports.STRING = 'string';
var SELECTOR = exports.SELECTOR = 'selector';
var ROOT = exports.ROOT = 'root';
var PSEUDO = exports.PSEUDO = 'pseudo';
var NESTING = exports.NESTING = 'nesting';
var ID = exports.ID = 'id';
var COMMENT = exports.COMMENT = 'comment';
var COMBINATOR = exports.COMBINATOR = 'combinator';
var CLASS = exports.CLASS = 'class';
var ATTRIBUTE = exports.ATTRIBUTE = 'attribute';
var UNIVERSAL = exports.UNIVERSAL = 'universal';
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548158, function(require, module, exports) {


exports.__esModule = true;

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Selector = function (_Container) {
    _inherits(Selector, _Container);

    function Selector(opts) {
        _classCallCheck(this, Selector);

        var _this = _possibleConstructorReturn(this, _Container.call(this, opts));

        _this.type = _types.SELECTOR;
        return _this;
    }

    return Selector;
}(_container2.default);

exports.default = Selector;
module.exports = exports['default'];
}, function(modId) { var map = {"./container":1625038548155,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548159, function(require, module, exports) {


exports.__esModule = true;

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ClassName = function (_Namespace) {
    _inherits(ClassName, _Namespace);

    function ClassName(opts) {
        _classCallCheck(this, ClassName);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));

        _this.type = _types.CLASS;
        return _this;
    }

    ClassName.prototype.toString = function toString() {
        return [this.spaces.before, this.ns, String('.' + this.value), this.spaces.after].join('');
    };

    return ClassName;
}(_namespace2.default);

exports.default = ClassName;
module.exports = exports['default'];
}, function(modId) { var map = {"./namespace":1625038548160,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548160, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Namespace = function (_Node) {
    _inherits(Namespace, _Node);

    function Namespace() {
        _classCallCheck(this, Namespace);

        return _possibleConstructorReturn(this, _Node.apply(this, arguments));
    }

    Namespace.prototype.qualifiedName = function qualifiedName(value) {
        if (this.namespace) {
            return this.namespaceString + '|' + value;
        } else {
            return value;
        }
    };

    Namespace.prototype.toString = function toString() {
        return [this.spaces.before, this.qualifiedName(this.value), this.spaces.after].join('');
    };

    _createClass(Namespace, [{
        key: 'namespace',
        get: function get() {
            return this._namespace;
        },
        set: function set(namespace) {
            this._namespace = namespace;
            if (this.raws) {
                delete this.raws.namespace;
            }
        }
    }, {
        key: 'ns',
        get: function get() {
            return this._namespace;
        },
        set: function set(namespace) {
            this._namespace = namespace;
            if (this.raws) {
                delete this.raws.namespace;
            }
        }
    }, {
        key: 'namespaceString',
        get: function get() {
            if (this.namespace) {
                var ns = this.raws && this.raws.namespace || this.namespace;
                if (ns === true) {
                    return '';
                } else {
                    return ns;
                }
            } else {
                return '';
            }
        }
    }]);

    return Namespace;
}(_node2.default);

exports.default = Namespace;
;
module.exports = exports['default'];
}, function(modId) { var map = {"./node":1625038548156}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548161, function(require, module, exports) {


exports.__esModule = true;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Comment = function (_Node) {
    _inherits(Comment, _Node);

    function Comment(opts) {
        _classCallCheck(this, Comment);

        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));

        _this.type = _types.COMMENT;
        return _this;
    }

    return Comment;
}(_node2.default);

exports.default = Comment;
module.exports = exports['default'];
}, function(modId) { var map = {"./node":1625038548156,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548162, function(require, module, exports) {


exports.__esModule = true;

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ID = function (_Namespace) {
    _inherits(ID, _Namespace);

    function ID(opts) {
        _classCallCheck(this, ID);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));

        _this.type = _types.ID;
        return _this;
    }

    ID.prototype.toString = function toString() {
        return [this.spaces.before, this.ns, String('#' + this.value), this.spaces.after].join('');
    };

    return ID;
}(_namespace2.default);

exports.default = ID;
module.exports = exports['default'];
}, function(modId) { var map = {"./namespace":1625038548160,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548163, function(require, module, exports) {


exports.__esModule = true;

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tag = function (_Namespace) {
    _inherits(Tag, _Namespace);

    function Tag(opts) {
        _classCallCheck(this, Tag);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));

        _this.type = _types.TAG;
        return _this;
    }

    return Tag;
}(_namespace2.default);

exports.default = Tag;
module.exports = exports['default'];
}, function(modId) { var map = {"./namespace":1625038548160,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548164, function(require, module, exports) {


exports.__esModule = true;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var String = function (_Node) {
    _inherits(String, _Node);

    function String(opts) {
        _classCallCheck(this, String);

        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));

        _this.type = _types.STRING;
        return _this;
    }

    return String;
}(_node2.default);

exports.default = String;
module.exports = exports['default'];
}, function(modId) { var map = {"./node":1625038548156,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548165, function(require, module, exports) {


exports.__esModule = true;

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pseudo = function (_Container) {
    _inherits(Pseudo, _Container);

    function Pseudo(opts) {
        _classCallCheck(this, Pseudo);

        var _this = _possibleConstructorReturn(this, _Container.call(this, opts));

        _this.type = _types.PSEUDO;
        return _this;
    }

    Pseudo.prototype.toString = function toString() {
        var params = this.length ? '(' + this.map(String).join(',') + ')' : '';
        return [this.spaces.before, String(this.value), params, this.spaces.after].join('');
    };

    return Pseudo;
}(_container2.default);

exports.default = Pseudo;
module.exports = exports['default'];
}, function(modId) { var map = {"./container":1625038548155,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548166, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Attribute = function (_Namespace) {
    _inherits(Attribute, _Namespace);

    function Attribute() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Attribute);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));

        _this.type = _types.ATTRIBUTE;
        _this.raws = _this.raws || {};
        _this._constructed = true;
        return _this;
    }

    Attribute.prototype._spacesFor = function _spacesFor(name) {
        var attrSpaces = { before: '', after: '' };
        var spaces = this.spaces[name] || {};
        var rawSpaces = this.raws.spaces && this.raws.spaces[name] || {};
        return Object.assign(attrSpaces, spaces, rawSpaces);
    };

    Attribute.prototype._valueFor = function _valueFor(name) {
        return this.raws[name] || this[name];
    };

    Attribute.prototype._stringFor = function _stringFor(name) {
        var spaceName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;
        var concat = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultAttrConcat;

        var attrSpaces = this._spacesFor(spaceName);
        return concat(this._valueFor(name), attrSpaces);
    };

    /**
     * returns the offset of the attribute part specified relative to the
     * start of the node of the output string.
     *
     * * "ns" - alias for "namespace"
     * * "namespace" - the namespace if it exists.
     * * "attribute" - the attribute name
     * * "attributeNS" - the start of the attribute or its namespace
     * * "operator" - the match operator of the attribute
     * * "value" - The value (string or identifier)
     * * "insensitive" - the case insensitivity flag;
     * @param part One of the possible values inside an attribute.
     * @returns -1 if the name is invalid or the value doesn't exist in this attribute.
     */


    Attribute.prototype.offsetOf = function offsetOf(name) {
        var count = 1;
        var attributeSpaces = this._spacesFor("attribute");
        count += attributeSpaces.before.length;
        if (name === "namespace" || name === "ns") {
            return this.namespace ? count : -1;
        }
        if (name === "attributeNS") {
            return count;
        }

        count += this.namespaceString.length;
        if (this.namespace) {
            count += 1;
        }
        if (name === "attribute") {
            return count;
        }

        count += this._valueFor("attribute").length;
        count += attributeSpaces.after.length;
        var operatorSpaces = this._spacesFor("operator");
        count += operatorSpaces.before.length;
        var operator = this._valueFor("operator");
        if (name === "operator") {
            return operator ? count : -1;
        }

        count += operator.length;
        count += operatorSpaces.after.length;
        var valueSpaces = this._spacesFor("value");
        count += valueSpaces.before.length;
        var value = this._valueFor("value");
        if (name === "value") {
            return value ? count : -1;
        }

        count += value.length;
        count += valueSpaces.after.length;
        var insensitiveSpaces = this._spacesFor("insensitive");
        count += insensitiveSpaces.before.length;
        if (name === "insensitive") {
            return this.insensitive ? count : -1;
        }
        return -1;
    };

    Attribute.prototype.toString = function toString() {
        var _this2 = this;

        var selector = [this.spaces.before, '['];

        selector.push(this._stringFor('qualifiedAttribute', 'attribute'));

        if (this.operator && this.value) {
            selector.push(this._stringFor('operator'));
            selector.push(this._stringFor('value'));
            selector.push(this._stringFor('insensitiveFlag', 'insensitive', function (attrValue, attrSpaces) {
                if (attrValue.length > 0 && !_this2.quoted && attrSpaces.before.length === 0 && !(_this2.spaces.value && _this2.spaces.value.after)) {
                    attrSpaces.before = " ";
                }
                return defaultAttrConcat(attrValue, attrSpaces);
            }));
        }

        selector.push(']');
        selector.push(this.spaces.after);
        return selector.join('');
    };

    _createClass(Attribute, [{
        key: 'qualifiedAttribute',
        get: function get() {
            return this.qualifiedName(this.raws.attribute || this.attribute);
        }
    }, {
        key: 'insensitiveFlag',
        get: function get() {
            return this.insensitive ? 'i' : '';
        }
    }, {
        key: 'value',
        get: function get() {
            return this._value;
        },
        set: function set(v) {
            this._value = v;
            if (this._constructed) {
                delete this.raws.value;
            }
        }
    }, {
        key: 'namespace',
        get: function get() {
            return this._namespace;
        },
        set: function set(v) {
            this._namespace = v;
            if (this._constructed) {
                delete this.raws.namespace;
            }
        }
    }, {
        key: 'attribute',
        get: function get() {
            return this._attribute;
        },
        set: function set(v) {
            this._attribute = v;
            if (this._constructed) {
                delete this.raws.attibute;
            }
        }
    }]);

    return Attribute;
}(_namespace2.default);

exports.default = Attribute;


function defaultAttrConcat(attrValue, attrSpaces) {
    return '' + attrSpaces.before + attrValue + attrSpaces.after;
}
module.exports = exports['default'];
}, function(modId) { var map = {"./namespace":1625038548160,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548167, function(require, module, exports) {


exports.__esModule = true;

var _namespace = require('./namespace');

var _namespace2 = _interopRequireDefault(_namespace);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Universal = function (_Namespace) {
    _inherits(Universal, _Namespace);

    function Universal(opts) {
        _classCallCheck(this, Universal);

        var _this = _possibleConstructorReturn(this, _Namespace.call(this, opts));

        _this.type = _types.UNIVERSAL;
        _this.value = '*';
        return _this;
    }

    return Universal;
}(_namespace2.default);

exports.default = Universal;
module.exports = exports['default'];
}, function(modId) { var map = {"./namespace":1625038548160,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548168, function(require, module, exports) {


exports.__esModule = true;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Combinator = function (_Node) {
    _inherits(Combinator, _Node);

    function Combinator(opts) {
        _classCallCheck(this, Combinator);

        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));

        _this.type = _types.COMBINATOR;
        return _this;
    }

    return Combinator;
}(_node2.default);

exports.default = Combinator;
module.exports = exports['default'];
}, function(modId) { var map = {"./node":1625038548156,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548169, function(require, module, exports) {


exports.__esModule = true;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _types = require('./types');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Nesting = function (_Node) {
    _inherits(Nesting, _Node);

    function Nesting(opts) {
        _classCallCheck(this, Nesting);

        var _this = _possibleConstructorReturn(this, _Node.call(this, opts));

        _this.type = _types.NESTING;
        _this.value = '&';
        return _this;
    }

    return Nesting;
}(_node2.default);

exports.default = Nesting;
module.exports = exports['default'];
}, function(modId) { var map = {"./node":1625038548156,"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548170, function(require, module, exports) {


exports.__esModule = true;
exports.default = sortAscending;
function sortAscending(list) {
    return list.sort(function (a, b) {
        return a - b;
    });
};
module.exports = exports["default"];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548171, function(require, module, exports) {


exports.__esModule = true;
exports.default = tokenize;

var _tokenTypes = require('./tokenTypes');

var t = _interopRequireWildcard(_tokenTypes);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var wordEnd = /[ \n\t\r\(\)\*:;!&'"\+\|~>,=$^\[\]\\]|\/(?=\*)/g;

function tokenize(input) {
    var tokens = [];
    var css = input.css.valueOf();
    var _css = css,
        length = _css.length;

    var offset = -1;
    var line = 1;
    var start = 0;
    var end = 0;

    var code = void 0,
        content = void 0,
        endColumn = void 0,
        endLine = void 0,
        escaped = void 0,
        escapePos = void 0,
        last = void 0,
        lines = void 0,
        next = void 0,
        nextLine = void 0,
        nextOffset = void 0,
        quote = void 0,
        tokenType = void 0;

    function unclosed(what, fix) {
        if (input.safe) {
            // fyi: this is never set to true.
            css += fix;
            next = css.length - 1;
        } else {
            throw input.error('Unclosed ' + what, line, start - offset, start);
        }
    }

    while (start < length) {
        code = css.charCodeAt(start);

        if (code === t.newline) {
            offset = start;
            line += 1;
        }

        switch (code) {
            case t.newline:
            case t.space:
            case t.tab:
            case t.cr:
            case t.feed:
                next = start;
                do {
                    next += 1;
                    code = css.charCodeAt(next);
                    if (code === t.newline) {
                        offset = next;
                        line += 1;
                    }
                } while (code === t.space || code === t.newline || code === t.tab || code === t.cr || code === t.feed);

                tokenType = t.space;
                endLine = line;
                endColumn = start - offset;
                end = next;
                break;

            case t.plus:
            case t.greaterThan:
            case t.tilde:
            case t.pipe:
                next = start;
                do {
                    next += 1;
                    code = css.charCodeAt(next);
                } while (code === t.plus || code === t.greaterThan || code === t.tilde || code === t.pipe);

                tokenType = t.combinator;
                endLine = line;
                endColumn = start - offset;
                end = next;
                break;

            // Consume these characters as single tokens.
            case t.asterisk:
            case t.ampersand:
            case t.comma:
            case t.equals:
            case t.dollar:
            case t.caret:
            case t.openSquare:
            case t.closeSquare:
            case t.colon:
            case t.semicolon:
            case t.openParenthesis:
            case t.closeParenthesis:
                next = start;
                tokenType = code;
                endLine = line;
                endColumn = start - offset;
                end = next + 1;
                break;

            case t.singleQuote:
            case t.doubleQuote:
                quote = code === t.singleQuote ? "'" : '"';
                next = start;
                do {
                    escaped = false;
                    next = css.indexOf(quote, next + 1);
                    if (next === -1) {
                        unclosed('quote', quote);
                    }
                    escapePos = next;
                    while (css.charCodeAt(escapePos - 1) === t.backslash) {
                        escapePos -= 1;
                        escaped = !escaped;
                    }
                } while (escaped);

                tokenType = t.str;
                endLine = line;
                endColumn = start - offset;
                end = next + 1;
                break;

            case t.backslash:
                next = start;
                escaped = true;
                while (css.charCodeAt(next + 1) === t.backslash) {
                    next += 1;
                    escaped = !escaped;
                }
                code = css.charCodeAt(next + 1);
                if (escaped && code !== t.slash && code !== t.space && code !== t.newline && code !== t.tab && code !== t.cr && code !== t.feed) {
                    next += 1;
                }

                tokenType = t.word;
                endLine = line;
                endColumn = next - offset;
                end = next + 1;
                break;

            default:
                if (code === t.slash && css.charCodeAt(start + 1) === t.asterisk) {
                    next = css.indexOf('*/', start + 2) + 1;
                    if (next === 0) {
                        unclosed('comment', '*/');
                    }

                    content = css.slice(start, next + 1);
                    lines = content.split('\n');
                    last = lines.length - 1;

                    if (last > 0) {
                        nextLine = line + last;
                        nextOffset = next - lines[last].length;
                    } else {
                        nextLine = line;
                        nextOffset = offset;
                    }

                    tokenType = t.comment;
                    line = nextLine;
                    endLine = nextLine;
                    endColumn = next - nextOffset;
                } else {
                    wordEnd.lastIndex = start + 1;
                    wordEnd.test(css);
                    if (wordEnd.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = wordEnd.lastIndex - 2;
                    }

                    tokenType = t.word;
                    endLine = line;
                    endColumn = next - offset;
                }

                end = next + 1;
                break;
        }

        // Ensure that the token structure remains consistent
        tokens.push([tokenType, // [0] Token type
        line, // [1] Starting line
        start - offset, // [2] Starting column
        endLine, // [3] Ending line
        endColumn, // [4] Ending column
        start, // [5] Start position / Source index
        end] // [6] End position
        );

        // Reset offset for the next token
        if (nextOffset) {
            offset = nextOffset;
            nextOffset = null;
        }

        start = end;
    }

    return tokens;
}
module.exports = exports['default'];
}, function(modId) { var map = {"./tokenTypes":1625038548172}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548172, function(require, module, exports) {


exports.__esModule = true;
var ampersand = exports.ampersand = 38;
var asterisk = exports.asterisk = 42;
var at = exports.at = 64;
var comma = exports.comma = 44;
var colon = exports.colon = 58;
var semicolon = exports.semicolon = 59;
var openParenthesis = exports.openParenthesis = 40;
var closeParenthesis = exports.closeParenthesis = 41;
var openSquare = exports.openSquare = 91;
var closeSquare = exports.closeSquare = 93;
var dollar = exports.dollar = 36;
var tilde = exports.tilde = 126;
var caret = exports.caret = 94;
var plus = exports.plus = 43;
var equals = exports.equals = 61;
var pipe = exports.pipe = 124;
var greaterThan = exports.greaterThan = 62;
var space = exports.space = 32;
var singleQuote = exports.singleQuote = 39;
var doubleQuote = exports.doubleQuote = 34;
var slash = exports.slash = 47;

var backslash = exports.backslash = 92;
var cr = exports.cr = 13;
var feed = exports.feed = 12;
var newline = exports.newline = 10;
var tab = exports.tab = 9;

// Expose aliases primarily for readability.
var str = exports.str = singleQuote;

// No good single character representation!
var comment = exports.comment = -1;
var word = exports.word = -2;
var combinator = exports.combinator = -3;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548173, function(require, module, exports) {


exports.__esModule = true;

var _types = require("./types");

Object.keys(_types).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _types[key];
    }
  });
});

var _constructors = require("./constructors");

Object.keys(_constructors).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _constructors[key];
    }
  });
});

var _guards = require("./guards");

Object.keys(_guards).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _guards[key];
    }
  });
});
}, function(modId) { var map = {"./types":1625038548157,"./constructors":1625038548174,"./guards":1625038548175}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548174, function(require, module, exports) {


exports.__esModule = true;
exports.universal = exports.tag = exports.string = exports.selector = exports.root = exports.pseudo = exports.nesting = exports.id = exports.comment = exports.combinator = exports.className = exports.attribute = undefined;

var _attribute = require('./attribute');

var _attribute2 = _interopRequireDefault(_attribute);

var _className = require('./className');

var _className2 = _interopRequireDefault(_className);

var _combinator = require('./combinator');

var _combinator2 = _interopRequireDefault(_combinator);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _id = require('./id');

var _id2 = _interopRequireDefault(_id);

var _nesting = require('./nesting');

var _nesting2 = _interopRequireDefault(_nesting);

var _pseudo = require('./pseudo');

var _pseudo2 = _interopRequireDefault(_pseudo);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _selector = require('./selector');

var _selector2 = _interopRequireDefault(_selector);

var _string = require('./string');

var _string2 = _interopRequireDefault(_string);

var _tag = require('./tag');

var _tag2 = _interopRequireDefault(_tag);

var _universal = require('./universal');

var _universal2 = _interopRequireDefault(_universal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var attribute = exports.attribute = function attribute(opts) {
  return new _attribute2.default(opts);
};
var className = exports.className = function className(opts) {
  return new _className2.default(opts);
};
var combinator = exports.combinator = function combinator(opts) {
  return new _combinator2.default(opts);
};
var comment = exports.comment = function comment(opts) {
  return new _comment2.default(opts);
};
var id = exports.id = function id(opts) {
  return new _id2.default(opts);
};
var nesting = exports.nesting = function nesting(opts) {
  return new _nesting2.default(opts);
};
var pseudo = exports.pseudo = function pseudo(opts) {
  return new _pseudo2.default(opts);
};
var root = exports.root = function root(opts) {
  return new _root2.default(opts);
};
var selector = exports.selector = function selector(opts) {
  return new _selector2.default(opts);
};
var string = exports.string = function string(opts) {
  return new _string2.default(opts);
};
var tag = exports.tag = function tag(opts) {
  return new _tag2.default(opts);
};
var universal = exports.universal = function universal(opts) {
  return new _universal2.default(opts);
};
}, function(modId) { var map = {"./attribute":1625038548166,"./className":1625038548159,"./combinator":1625038548168,"./comment":1625038548161,"./id":1625038548162,"./nesting":1625038548169,"./pseudo":1625038548165,"./root":1625038548154,"./selector":1625038548158,"./string":1625038548164,"./tag":1625038548163,"./universal":1625038548167}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548175, function(require, module, exports) {


exports.__esModule = true;
exports.isUniversal = exports.isTag = exports.isString = exports.isSelector = exports.isRoot = exports.isPseudo = exports.isNesting = exports.isIdentifier = exports.isComment = exports.isCombinator = exports.isClassName = exports.isAttribute = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _IS_TYPE;

exports.isNode = isNode;
exports.isPseudoElement = isPseudoElement;
exports.isPseudoClass = isPseudoClass;
exports.isContainer = isContainer;
exports.isNamespace = isNamespace;

var _types = require("./types");

var IS_TYPE = (_IS_TYPE = {}, _IS_TYPE[_types.ATTRIBUTE] = true, _IS_TYPE[_types.CLASS] = true, _IS_TYPE[_types.COMBINATOR] = true, _IS_TYPE[_types.COMMENT] = true, _IS_TYPE[_types.ID] = true, _IS_TYPE[_types.NESTING] = true, _IS_TYPE[_types.PSEUDO] = true, _IS_TYPE[_types.ROOT] = true, _IS_TYPE[_types.SELECTOR] = true, _IS_TYPE[_types.STRING] = true, _IS_TYPE[_types.TAG] = true, _IS_TYPE[_types.UNIVERSAL] = true, _IS_TYPE);

function isNode(node) {
    return (typeof node === "undefined" ? "undefined" : _typeof(node)) === "object" && IS_TYPE[node.type];
}

function isNodeType(type, node) {
    return isNode(node) && node.type === type;
}

var isAttribute = exports.isAttribute = isNodeType.bind(null, _types.ATTRIBUTE);
var isClassName = exports.isClassName = isNodeType.bind(null, _types.CLASS);
var isCombinator = exports.isCombinator = isNodeType.bind(null, _types.COMBINATOR);
var isComment = exports.isComment = isNodeType.bind(null, _types.COMMENT);
var isIdentifier = exports.isIdentifier = isNodeType.bind(null, _types.ID);
var isNesting = exports.isNesting = isNodeType.bind(null, _types.NESTING);
var isPseudo = exports.isPseudo = isNodeType.bind(null, _types.PSEUDO);
var isRoot = exports.isRoot = isNodeType.bind(null, _types.ROOT);
var isSelector = exports.isSelector = isNodeType.bind(null, _types.SELECTOR);
var isString = exports.isString = isNodeType.bind(null, _types.STRING);
var isTag = exports.isTag = isNodeType.bind(null, _types.TAG);
var isUniversal = exports.isUniversal = isNodeType.bind(null, _types.UNIVERSAL);

function isPseudoElement(node) {
    return isPseudo(node) && node.value && (node.value.startsWith("::") || node.value === ":before" || node.value === ":after");
}
function isPseudoClass(node) {
    return isPseudo(node) && !isPseudoElement(node);
}

function isContainer(node) {
    return !!(isNode(node) && node.walk);
}

function isNamespace(node) {
    return isClassName(node) || isAttribute(node) || isTag(node);
}
}, function(modId) { var map = {"./types":1625038548157}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548151);
})()
//# sourceMappingURL=index.js.map