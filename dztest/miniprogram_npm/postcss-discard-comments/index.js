module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548083, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require("postcss");

var _commentRemover = require("./lib/commentRemover");

var _commentRemover2 = _interopRequireDefault(_commentRemover);

var _commentParser = require("./lib/commentParser");

var _commentParser2 = _interopRequireDefault(_commentParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const { space } = _postcss.list;

exports.default = (0, _postcss.plugin)("postcss-discard-comments", (opts = {}) => {
    const remover = new _commentRemover2.default(opts);
    const matcherCache = {};
    const replacerCache = {};

    function matchesComments(source) {
        if (matcherCache[source]) {
            return matcherCache[source];
        }

        const result = (0, _commentParser2.default)(source).filter(([type]) => type);

        matcherCache[source] = result;

        return result;
    }

    function replaceComments(source, separator = " ") {
        const key = source + "@|@" + separator;

        if (replacerCache[key]) {
            return replacerCache[key];
        }

        const parsed = (0, _commentParser2.default)(source).reduce((value, [type, start, end]) => {
            const contents = source.slice(start, end);

            if (!type) {
                return value + contents;
            }

            if (remover.canRemove(contents)) {
                return value + separator;
            }

            return `${value}/*${contents}*/`;
        }, "");

        const result = space(parsed).join(" ");

        replacerCache[key] = result;

        return result;
    }

    return css => {
        css.walk(node => {
            if (node.type === "comment" && remover.canRemove(node.text)) {
                node.remove();

                return;
            }

            if (node.raws.between) {
                node.raws.between = replaceComments(node.raws.between);
            }

            if (node.type === "decl") {
                if (node.raws.value && node.raws.value.raw) {
                    if (node.raws.value.value === node.value) {
                        node.value = replaceComments(node.raws.value.raw);
                    } else {
                        node.value = replaceComments(node.value);
                    }

                    node.raws.value = null;
                }

                if (node.raws.important) {
                    node.raws.important = replaceComments(node.raws.important);

                    const b = matchesComments(node.raws.important);

                    node.raws.important = b.length ? node.raws.important : "!important";
                }

                return;
            }

            if (node.type === "rule" && node.raws.selector && node.raws.selector.raw) {
                node.raws.selector.raw = replaceComments(node.raws.selector.raw, "");

                return;
            }

            if (node.type === "atrule") {
                if (node.raws.afterName) {
                    const commentsReplaced = replaceComments(node.raws.afterName);

                    if (!commentsReplaced.length) {
                        node.raws.afterName = commentsReplaced + " ";
                    } else {
                        node.raws.afterName = " " + commentsReplaced + " ";
                    }
                }

                if (node.raws.params && node.raws.params.raw) {
                    node.raws.params.raw = replaceComments(node.raws.params.raw);
                }
            }
        });
    };
});
module.exports = exports["default"];
}, function(modId) {var map = {"./lib/commentRemover":1625038548084,"./lib/commentParser":1625038548085}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548084, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
function CommentRemover(options) {
    this.options = options;
}

CommentRemover.prototype.canRemove = function (comment) {
    const remove = this.options.remove;

    if (remove) {
        return remove(comment);
    } else {
        const isImportant = comment.indexOf('!') === 0;

        if (!isImportant) {
            return true;
        }

        if (this.options.removeAll || this._hasFirst) {
            return true;
        } else if (this.options.removeAllButFirst && !this._hasFirst) {
            this._hasFirst = true;
            return false;
        }
    }
};

exports.default = CommentRemover;
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548085, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = commentParser;
function commentParser(input) {
    const tokens = [];
    const length = input.length;
    let pos = 0;
    let next;

    while (pos < length) {
        next = input.indexOf('/*', pos);

        if (~next) {
            tokens.push([0, pos, next]);
            pos = next;

            next = input.indexOf('*/', pos + 2);
            tokens.push([1, pos + 2, next]);
            pos = next + 2;
        } else {
            tokens.push([0, pos, length]);
            pos = length;
        }
    }

    return tokens;
};
module.exports = exports['default'];
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548083);
})()
//# sourceMappingURL=index.js.map