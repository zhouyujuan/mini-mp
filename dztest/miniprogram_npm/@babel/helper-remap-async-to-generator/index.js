module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526792, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _helperWrapFunction = require("@babel/helper-wrap-function");

var _helperAnnotateAsPure = require("@babel/helper-annotate-as-pure");

var t = require("@babel/types");

const awaitVisitor = {
  Function(path) {
    path.skip();
  },

  AwaitExpression(path, {
    wrapAwait
  }) {
    const argument = path.get("argument");

    if (path.parentPath.isYieldExpression()) {
      path.replaceWith(argument.node);
      return;
    }

    path.replaceWith(t.yieldExpression(wrapAwait ? t.callExpression(t.cloneNode(wrapAwait), [argument.node]) : argument.node));
  }

};

function _default(path, helpers, noNewArrows) {
  path.traverse(awaitVisitor, {
    wrapAwait: helpers.wrapAwait
  });
  const isIIFE = checkIsIIFE(path);
  path.node.async = false;
  path.node.generator = true;
  (0, _helperWrapFunction.default)(path, t.cloneNode(helpers.wrapAsync), noNewArrows);
  const isProperty = path.isObjectMethod() || path.isClassMethod() || path.parentPath.isObjectProperty() || path.parentPath.isClassProperty();

  if (!isProperty && !isIIFE && path.isExpression()) {
    (0, _helperAnnotateAsPure.default)(path);
  }

  function checkIsIIFE(path) {
    if (path.parentPath.isCallExpression({
      callee: path.node
    })) {
      return true;
    }

    const {
      parentPath
    } = path;

    if (parentPath.isMemberExpression() && t.isIdentifier(parentPath.node.property, {
      name: "bind"
    })) {
      const {
        parentPath: bindCall
      } = parentPath;
      return bindCall.isCallExpression() && bindCall.node.arguments.length === 1 && t.isThisExpression(bindCall.node.arguments[0]) && bindCall.parentPath.isCallExpression({
        callee: bindCall.node
      });
    }

    return false;
  }
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526792);
})()
//# sourceMappingURL=index.js.map