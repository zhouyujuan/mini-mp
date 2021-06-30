module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526772, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var t = require("@babel/types");

function getObjRef(node, nodes, scope) {
  let ref;

  if (t.isIdentifier(node)) {
    if (scope.hasBinding(node.name)) {
      return node;
    } else {
      ref = node;
    }
  } else if (t.isMemberExpression(node)) {
    ref = node.object;

    if (t.isSuper(ref) || t.isIdentifier(ref) && scope.hasBinding(ref.name)) {
      return ref;
    }
  } else {
    throw new Error(`We can't explode this node type ${node["type"]}`);
  }

  const temp = scope.generateUidIdentifierBasedOnNode(ref);
  scope.push({
    id: temp
  });
  nodes.push(t.assignmentExpression("=", t.cloneNode(temp), t.cloneNode(ref)));
  return temp;
}

function getPropRef(node, nodes, scope) {
  const prop = node.property;

  if (t.isPrivateName(prop)) {
    throw new Error("We can't generate property ref for private name, please install `@babel/plugin-proposal-class-properties`");
  }

  const key = t.toComputedKey(node, prop);
  if (t.isLiteral(key) && t.isPureish(key)) return key;
  const temp = scope.generateUidIdentifierBasedOnNode(prop);
  scope.push({
    id: temp
  });
  nodes.push(t.assignmentExpression("=", t.cloneNode(temp), t.cloneNode(prop)));
  return temp;
}

function _default(node, nodes, file, scope, allowedSingleIdent) {
  let obj;

  if (t.isIdentifier(node) && allowedSingleIdent) {
    obj = node;
  } else {
    obj = getObjRef(node, nodes, scope);
  }

  let ref, uid;

  if (t.isIdentifier(node)) {
    ref = t.cloneNode(node);
    uid = obj;
  } else {
    const prop = getPropRef(node, nodes, scope);
    const computed = node.computed || t.isLiteral(prop);
    uid = t.memberExpression(t.cloneNode(obj), t.cloneNode(prop), computed);
    ref = t.memberExpression(t.cloneNode(obj), t.cloneNode(prop), computed);
  }

  return {
    uid: uid,
    ref: ref
  };
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526772);
})()
//# sourceMappingURL=index.js.map