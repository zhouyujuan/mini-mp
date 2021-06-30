module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526812, function(require, module, exports) {


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

function _pluginSyntaxDecorators() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-decorators"));

  _pluginSyntaxDecorators = function () {
    return data;
  };

  return data;
}

function _helperCreateClassFeaturesPlugin() {
  const data = require("@babel/helper-create-class-features-plugin");

  _helperCreateClassFeaturesPlugin = function () {
    return data;
  };

  return data;
}

var _transformerLegacy = _interopRequireDefault(require("./transformer-legacy"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  const {
    legacy = false
  } = options;

  if (typeof legacy !== "boolean") {
    throw new Error("'legacy' must be a boolean.");
  }

  const {
    decoratorsBeforeExport
  } = options;

  if (decoratorsBeforeExport === undefined) {
    if (!legacy) {
      throw new Error("The decorators plugin requires a 'decoratorsBeforeExport' option," + " whose value must be a boolean. If you want to use the legacy" + " decorators semantics, you can set the 'legacy: true' option.");
    }
  } else {
    if (legacy) {
      throw new Error("'decoratorsBeforeExport' can't be used with legacy decorators.");
    }

    if (typeof decoratorsBeforeExport !== "boolean") {
      throw new Error("'decoratorsBeforeExport' must be a boolean.");
    }
  }

  if (legacy) {
    return {
      name: "proposal-decorators",
      inherits: _pluginSyntaxDecorators().default,

      manipulateOptions({
        generatorOpts
      }) {
        generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
      },

      visitor: _transformerLegacy.default
    };
  }

  return (0, _helperCreateClassFeaturesPlugin().createClassFeaturePlugin)({
    name: "proposal-decorators",
    feature: _helperCreateClassFeaturesPlugin().FEATURES.decorators,

    manipulateOptions({
      generatorOpts,
      parserOpts
    }) {
      parserOpts.plugins.push(["decorators", {
        decoratorsBeforeExport
      }]);
      generatorOpts.decoratorsBeforeExport = decoratorsBeforeExport;
    }

  });
});

exports.default = _default;
}, function(modId) {var map = {"./transformer-legacy":1625038526813}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526813, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _core() {
  const data = require("@babel/core");

  _core = function () {
    return data;
  };

  return data;
}

const buildClassDecorator = (0, _core().template)(`
  DECORATOR(CLASS_REF = INNER) || CLASS_REF;
`);
const buildClassPrototype = (0, _core().template)(`
  CLASS_REF.prototype;
`);
const buildGetDescriptor = (0, _core().template)(`
    Object.getOwnPropertyDescriptor(TARGET, PROPERTY);
`);
const buildGetObjectInitializer = (0, _core().template)(`
    (TEMP = Object.getOwnPropertyDescriptor(TARGET, PROPERTY), (TEMP = TEMP ? TEMP.value : undefined), {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function(){
            return TEMP;
        }
    })
`);
const WARNING_CALLS = new WeakSet();

function applyEnsureOrdering(path) {
  const decorators = (path.isClass() ? [path].concat(path.get("body.body")) : path.get("properties")).reduce((acc, prop) => acc.concat(prop.node.decorators || []), []);
  const identDecorators = decorators.filter(decorator => !_core().types.isIdentifier(decorator.expression));
  if (identDecorators.length === 0) return;
  return _core().types.sequenceExpression(identDecorators.map(decorator => {
    const expression = decorator.expression;
    const id = decorator.expression = path.scope.generateDeclaredUidIdentifier("dec");
    return _core().types.assignmentExpression("=", id, expression);
  }).concat([path.node]));
}

function applyClassDecorators(classPath) {
  if (!hasClassDecorators(classPath.node)) return;
  const decorators = classPath.node.decorators || [];
  classPath.node.decorators = null;
  const name = classPath.scope.generateDeclaredUidIdentifier("class");
  return decorators.map(dec => dec.expression).reverse().reduce(function (acc, decorator) {
    return buildClassDecorator({
      CLASS_REF: _core().types.cloneNode(name),
      DECORATOR: _core().types.cloneNode(decorator),
      INNER: acc
    }).expression;
  }, classPath.node);
}

function hasClassDecorators(classNode) {
  return !!(classNode.decorators && classNode.decorators.length);
}

function applyMethodDecorators(path, state) {
  if (!hasMethodDecorators(path.node.body.body)) return;
  return applyTargetDecorators(path, state, path.node.body.body);
}

function hasMethodDecorators(body) {
  return body.some(node => node.decorators && node.decorators.length);
}

function applyObjectDecorators(path, state) {
  if (!hasMethodDecorators(path.node.properties)) return;
  return applyTargetDecorators(path, state, path.node.properties);
}

function applyTargetDecorators(path, state, decoratedProps) {
  const name = path.scope.generateDeclaredUidIdentifier(path.isClass() ? "class" : "obj");
  const exprs = decoratedProps.reduce(function (acc, node) {
    const decorators = node.decorators || [];
    node.decorators = null;
    if (decorators.length === 0) return acc;

    if (node.computed) {
      throw path.buildCodeFrameError("Computed method/property decorators are not yet supported.");
    }

    const property = _core().types.isLiteral(node.key) ? node.key : _core().types.stringLiteral(node.key.name);
    const target = path.isClass() && !node.static ? buildClassPrototype({
      CLASS_REF: name
    }).expression : name;

    if (_core().types.isClassProperty(node, {
      static: false
    })) {
      const descriptor = path.scope.generateDeclaredUidIdentifier("descriptor");
      const initializer = node.value ? _core().types.functionExpression(null, [], _core().types.blockStatement([_core().types.returnStatement(node.value)])) : _core().types.nullLiteral();
      node.value = _core().types.callExpression(state.addHelper("initializerWarningHelper"), [descriptor, _core().types.thisExpression()]);
      WARNING_CALLS.add(node.value);
      acc = acc.concat([_core().types.assignmentExpression("=", descriptor, _core().types.callExpression(state.addHelper("applyDecoratedDescriptor"), [_core().types.cloneNode(target), _core().types.cloneNode(property), _core().types.arrayExpression(decorators.map(dec => _core().types.cloneNode(dec.expression))), _core().types.objectExpression([_core().types.objectProperty(_core().types.identifier("configurable"), _core().types.booleanLiteral(true)), _core().types.objectProperty(_core().types.identifier("enumerable"), _core().types.booleanLiteral(true)), _core().types.objectProperty(_core().types.identifier("writable"), _core().types.booleanLiteral(true)), _core().types.objectProperty(_core().types.identifier("initializer"), initializer)])]))]);
    } else {
      acc = acc.concat(_core().types.callExpression(state.addHelper("applyDecoratedDescriptor"), [_core().types.cloneNode(target), _core().types.cloneNode(property), _core().types.arrayExpression(decorators.map(dec => _core().types.cloneNode(dec.expression))), _core().types.isObjectProperty(node) || _core().types.isClassProperty(node, {
        static: true
      }) ? buildGetObjectInitializer({
        TEMP: path.scope.generateDeclaredUidIdentifier("init"),
        TARGET: _core().types.cloneNode(target),
        PROPERTY: _core().types.cloneNode(property)
      }).expression : buildGetDescriptor({
        TARGET: _core().types.cloneNode(target),
        PROPERTY: _core().types.cloneNode(property)
      }).expression, _core().types.cloneNode(target)]));
    }

    return acc;
  }, []);
  return _core().types.sequenceExpression([_core().types.assignmentExpression("=", _core().types.cloneNode(name), path.node), _core().types.sequenceExpression(exprs), _core().types.cloneNode(name)]);
}

function decoratedClassToExpression({
  node,
  scope
}) {
  if (!hasClassDecorators(node) && !hasMethodDecorators(node.body.body)) {
    return;
  }

  const ref = node.id ? _core().types.cloneNode(node.id) : scope.generateUidIdentifier("class");
  return _core().types.variableDeclaration("let", [_core().types.variableDeclarator(ref, _core().types.toExpression(node))]);
}

var _default = {
  ExportDefaultDeclaration(path) {
    const decl = path.get("declaration");
    if (!decl.isClassDeclaration()) return;
    const replacement = decoratedClassToExpression(decl);

    if (replacement) {
      path.replaceWithMultiple([replacement, _core().types.exportNamedDeclaration(null, [_core().types.exportSpecifier(_core().types.cloneNode(replacement.declarations[0].id), _core().types.identifier("default"))])]);
    }
  },

  ClassDeclaration(path) {
    const replacement = decoratedClassToExpression(path);

    if (replacement) {
      path.replaceWith(replacement);
    }
  },

  ClassExpression(path, state) {
    const decoratedClass = applyEnsureOrdering(path) || applyClassDecorators(path, state) || applyMethodDecorators(path, state);
    if (decoratedClass) path.replaceWith(decoratedClass);
  },

  ObjectExpression(path, state) {
    const decoratedObject = applyEnsureOrdering(path) || applyObjectDecorators(path, state);
    if (decoratedObject) path.replaceWith(decoratedObject);
  },

  AssignmentExpression(path, state) {
    if (!WARNING_CALLS.has(path.node.right)) return;
    path.replaceWith(_core().types.callExpression(state.addHelper("initializerDefineProperty"), [_core().types.cloneNode(path.get("left.object").node), _core().types.stringLiteral(path.get("left.property").node.name), _core().types.cloneNode(path.get("right.arguments")[0].node), _core().types.cloneNode(path.get("right.arguments")[1].node)]));
  }

};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526812);
})()
//# sourceMappingURL=index.js.map