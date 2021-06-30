module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526892, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _core = require("@babel/core");

var _default = (0, _helperPluginUtils.declare)(api => {
  api.assertVersion(7);
  return {
    name: "transform-typeof-symbol",
    visitor: {
      Scope({
        scope
      }) {
        if (!scope.getBinding("Symbol")) {
          return;
        }

        scope.rename("Symbol");
      },

      UnaryExpression(path) {
        const {
          node,
          parent
        } = path;
        if (node.operator !== "typeof") return;

        if (path.parentPath.isBinaryExpression() && _core.types.EQUALITY_BINARY_OPERATORS.indexOf(parent.operator) >= 0) {
          const opposite = path.getOpposite();

          if (opposite.isLiteral() && opposite.node.value !== "symbol" && opposite.node.value !== "object") {
            return;
          }
        }

        let isUnderHelper = path.findParent(path => {
          if (path.isFunction()) {
            var _path$get;

            return ((_path$get = path.get("body.directives.0")) == null ? void 0 : _path$get.node.value.value) === "@babel/helpers - typeof";
          }
        });
        if (isUnderHelper) return;
        const helper = this.addHelper("typeof");
        isUnderHelper = path.findParent(path => {
          return path.isVariableDeclarator() && path.node.id === helper || path.isFunctionDeclaration() && path.node.id && path.node.id.name === helper.name;
        });

        if (isUnderHelper) {
          return;
        }

        const call = _core.types.callExpression(helper, [node.argument]);

        const arg = path.get("argument");

        if (arg.isIdentifier() && !path.scope.hasBinding(arg.node.name, true)) {
          const unary = _core.types.unaryExpression("typeof", _core.types.cloneNode(node.argument));

          path.replaceWith(_core.types.conditionalExpression(_core.types.binaryExpression("===", unary, _core.types.stringLiteral("undefined")), _core.types.stringLiteral("undefined"), call));
        } else {
          path.replaceWith(call);
        }
      }

    }
  };
});

exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526892);
})()
//# sourceMappingURL=index.js.map