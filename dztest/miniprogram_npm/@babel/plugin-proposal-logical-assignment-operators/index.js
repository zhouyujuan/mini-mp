module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526820, function(require, module, exports) {


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

function _pluginSyntaxLogicalAssignmentOperators() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-logical-assignment-operators"));

  _pluginSyntaxLogicalAssignmentOperators = function () {
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
  return {
    name: "proposal-logical-assignment-operators",
    inherits: _pluginSyntaxLogicalAssignmentOperators().default,
    visitor: {
      AssignmentExpression(path) {
        const {
          node,
          scope
        } = path;
        const {
          operator,
          left,
          right
        } = node;

        if (operator !== "||=" && operator !== "&&=" && operator !== "??=") {
          return;
        }

        const lhs = _core().types.cloneNode(left);

        if (_core().types.isMemberExpression(left)) {
          const {
            object,
            property,
            computed
          } = left;
          const memo = scope.maybeGenerateMemoised(object);

          if (memo) {
            left.object = memo;
            lhs.object = _core().types.assignmentExpression("=", _core().types.cloneNode(memo), object);
          }

          if (computed) {
            const memo = scope.maybeGenerateMemoised(property);

            if (memo) {
              left.property = memo;
              lhs.property = _core().types.assignmentExpression("=", _core().types.cloneNode(memo), property);
            }
          }
        }

        path.replaceWith(_core().types.logicalExpression(operator.slice(0, -1), lhs, _core().types.assignmentExpression("=", left, right)));
      }

    }
  };
});

exports.default = _default;
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526820);
})()
//# sourceMappingURL=index.js.map