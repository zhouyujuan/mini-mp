module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526825, function(require, module, exports) {


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

function _pluginSyntaxOptionalChaining() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-optional-chaining"));

  _pluginSyntaxOptionalChaining = function () {
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

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const {
    loose = false
  } = options;
  return {
    name: "proposal-optional-chaining",
    inherits: _pluginSyntaxOptionalChaining().default,
    visitor: {
      "OptionalCallExpression|OptionalMemberExpression"(path) {
        const {
          parentPath,
          scope
        } = path;
        const optionals = [];
        let optionalPath = path;

        while (optionalPath.isOptionalMemberExpression() || optionalPath.isOptionalCallExpression()) {
          const {
            node
          } = optionalPath;

          if (node.optional) {
            optionals.push(node);
          }

          if (optionalPath.isOptionalMemberExpression()) {
            optionalPath.node.type = "MemberExpression";
            optionalPath = optionalPath.get("object");
          } else if (optionalPath.isOptionalCallExpression()) {
            optionalPath.node.type = "CallExpression";
            optionalPath = optionalPath.get("callee");
          }
        }

        let replacementPath = path;

        if (parentPath.isUnaryExpression({
          operator: "delete"
        })) {
          replacementPath = parentPath;
        }

        for (let i = optionals.length - 1; i >= 0; i--) {
          const node = optionals[i];

          const isCall = _core().types.isCallExpression(node);

          const replaceKey = isCall ? "callee" : "object";
          const chain = node[replaceKey];
          let ref;
          let check;

          if (loose && isCall) {
            check = ref = chain;
          } else {
            ref = scope.maybeGenerateMemoised(chain);

            if (ref) {
              check = _core().types.assignmentExpression("=", _core().types.cloneNode(ref), chain);
              node[replaceKey] = ref;
            } else {
              check = ref = chain;
            }
          }

          if (isCall && _core().types.isMemberExpression(chain)) {
            if (loose) {
              node.callee = chain;
            } else {
              const {
                object
              } = chain;
              let context = scope.maybeGenerateMemoised(object);

              if (context) {
                chain.object = _core().types.assignmentExpression("=", context, object);
              } else {
                context = object;
              }

              node.arguments.unshift(_core().types.cloneNode(context));
              node.callee = _core().types.memberExpression(node.callee, _core().types.identifier("call"));
            }
          }

          replacementPath.replaceWith(_core().types.conditionalExpression(loose ? _core().types.binaryExpression("==", _core().types.cloneNode(check), _core().types.nullLiteral()) : _core().types.logicalExpression("||", _core().types.binaryExpression("===", _core().types.cloneNode(check), _core().types.nullLiteral()), _core().types.binaryExpression("===", _core().types.cloneNode(ref), scope.buildUndefinedNode())), scope.buildUndefinedNode(), replacementPath.node));
          replacementPath = replacementPath.get("alternate");
        }
      }

    }
  };
});

exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526825);
})()
//# sourceMappingURL=index.js.map