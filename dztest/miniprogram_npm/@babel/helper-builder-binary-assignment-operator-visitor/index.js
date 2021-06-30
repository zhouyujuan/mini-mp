module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526754, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _helperExplodeAssignableExpression = require("@babel/helper-explode-assignable-expression");

var t = require("@babel/types");

function _default(opts) {
  const {
    build,
    operator
  } = opts;
  return {
    AssignmentExpression(path) {
      const {
        node,
        scope
      } = path;
      if (node.operator !== operator + "=") return;
      const nodes = [];
      const exploded = (0, _helperExplodeAssignableExpression.default)(node.left, nodes, this, scope);
      nodes.push(t.assignmentExpression("=", exploded.ref, build(exploded.uid, node.right)));
      path.replaceWith(t.sequenceExpression(nodes));
    },

    BinaryExpression(path) {
      const {
        node
      } = path;

      if (node.operator === operator) {
        path.replaceWith(build(node.left, node.right));
      }
    }

  };
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526754);
})()
//# sourceMappingURL=index.js.map