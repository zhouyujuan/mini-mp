module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526817, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _pluginSyntaxFunctionBind() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-function-bind"));

  _pluginSyntaxFunctionBind = function () {
    return data;
  };

  return data;
}

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)(api => {
  api.assertVersion(7);

  function getTempId(scope) {
    let id = scope.path.getData("functionBind");
    if (id) return id;
    id = scope.generateDeclaredUidIdentifier("context");
    return scope.path.setData("functionBind", id);
  }

  function getStaticContext(bind, scope) {
    const object = bind.object || bind.callee.object;
    return scope.isStatic(object) && object;
  }

  function inferBindContext(bind, scope) {
    const staticContext = getStaticContext(bind, scope);
    if (staticContext) return _core().types.cloneNode(staticContext);
    const tempId = getTempId(scope);

    if (bind.object) {
      bind.callee = _core().types.sequenceExpression([_core().types.assignmentExpression("=", tempId, bind.object), bind.callee]);
    } else {
      bind.callee.object = _core().types.assignmentExpression("=", tempId, bind.callee.object);
    }

    return tempId;
  }

  return {
    name: "proposal-function-bind",
    inherits: _pluginSyntaxFunctionBind().default,
    visitor: {
      CallExpression({
        node,
        scope
      }) {
        const bind = node.callee;
        if (!_core().types.isBindExpression(bind)) return;
        const context = inferBindContext(bind, scope);
        node.callee = _core().types.memberExpression(bind.callee, _core().types.identifier("call"));
        node.arguments.unshift(context);
      },

      BindExpression(path) {
        const {
          node,
          scope
        } = path;
        const context = inferBindContext(node, scope);
        path.replaceWith(_core().types.callExpression(_core().types.memberExpression(node.callee, _core().types.identifier("bind")), [context]));
      }

    }
  };
});

exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526817);
})()
//# sourceMappingURL=index.js.map