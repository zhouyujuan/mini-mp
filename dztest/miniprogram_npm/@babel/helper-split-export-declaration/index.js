module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526796, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitExportDeclaration;

var t = require("@babel/types");

function splitExportDeclaration(exportDeclaration) {
  if (!exportDeclaration.isExportDeclaration()) {
    throw new Error("Only export declarations can be split.");
  }

  const isDefault = exportDeclaration.isExportDefaultDeclaration();
  const declaration = exportDeclaration.get("declaration");
  const isClassDeclaration = declaration.isClassDeclaration();

  if (isDefault) {
    const standaloneDeclaration = declaration.isFunctionDeclaration() || isClassDeclaration;
    const scope = declaration.isScope() ? declaration.scope.parent : declaration.scope;
    let id = declaration.node.id;
    let needBindingRegistration = false;

    if (!id) {
      needBindingRegistration = true;
      id = scope.generateUidIdentifier("default");

      if (standaloneDeclaration || declaration.isFunctionExpression() || declaration.isClassExpression()) {
        declaration.node.id = t.cloneNode(id);
      }
    }

    const updatedDeclaration = standaloneDeclaration ? declaration : t.variableDeclaration("var", [t.variableDeclarator(t.cloneNode(id), declaration.node)]);
    const updatedExportDeclaration = t.exportNamedDeclaration(null, [t.exportSpecifier(t.cloneNode(id), t.identifier("default"))]);
    exportDeclaration.insertAfter(updatedExportDeclaration);
    exportDeclaration.replaceWith(updatedDeclaration);

    if (needBindingRegistration) {
      scope.registerDeclaration(exportDeclaration);
    }

    return exportDeclaration;
  }

  if (exportDeclaration.get("specifiers").length > 0) {
    throw new Error("It doesn't make sense to split exported specifiers.");
  }

  const bindingIdentifiers = declaration.getOuterBindingIdentifiers();
  const specifiers = Object.keys(bindingIdentifiers).map(name => {
    return t.exportSpecifier(t.identifier(name), t.identifier(name));
  });
  const aliasDeclar = t.exportNamedDeclaration(null, specifiers);
  exportDeclaration.insertAfter(aliasDeclar);
  exportDeclaration.replaceWith(declaration.node);
  return exportDeclaration;
}
}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526796);
})()
//# sourceMappingURL=index.js.map