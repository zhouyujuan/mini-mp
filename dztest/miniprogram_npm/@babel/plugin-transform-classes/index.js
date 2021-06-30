module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526858, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _helperPluginUtils = require("@babel/helper-plugin-utils");

var _helperAnnotateAsPure = require("@babel/helper-annotate-as-pure");

var _helperFunctionName = require("@babel/helper-function-name");

var _helperSplitExportDeclaration = require("@babel/helper-split-export-declaration");

var _core = require("@babel/core");

var _globals = require("globals");

var _transformClass = require("./transformClass");

const getBuiltinClasses = category => Object.keys(_globals[category]).filter(name => /^[A-Z]/.test(name));

const builtinClasses = new Set([...getBuiltinClasses("builtin"), ...getBuiltinClasses("browser")]);

var _default = (0, _helperPluginUtils.declare)((api, options) => {
  var _api$assumption, _api$assumption2, _api$assumption3, _api$assumption4;

  api.assertVersion(7);
  const {
    loose
  } = options;
  const setClassMethods = (_api$assumption = api.assumption("setClassMethods")) != null ? _api$assumption : options.loose;
  const constantSuper = (_api$assumption2 = api.assumption("constantSuper")) != null ? _api$assumption2 : options.loose;
  const superIsCallableConstructor = (_api$assumption3 = api.assumption("superIsCallableConstructor")) != null ? _api$assumption3 : options.loose;
  const noClassCalls = (_api$assumption4 = api.assumption("noClassCalls")) != null ? _api$assumption4 : options.loose;
  const VISITED = Symbol();
  return {
    name: "transform-classes",
    visitor: {
      ExportDefaultDeclaration(path) {
        if (!path.get("declaration").isClassDeclaration()) return;
        (0, _helperSplitExportDeclaration.default)(path);
      },

      ClassDeclaration(path) {
        const {
          node
        } = path;
        const ref = node.id || path.scope.generateUidIdentifier("class");
        path.replaceWith(_core.types.variableDeclaration("let", [_core.types.variableDeclarator(ref, _core.types.toExpression(node))]));
      },

      ClassExpression(path, state) {
        const {
          node
        } = path;
        if (node[VISITED]) return;
        const inferred = (0, _helperFunctionName.default)(path);

        if (inferred && inferred !== node) {
          path.replaceWith(inferred);
          return;
        }

        node[VISITED] = true;
        path.replaceWith((0, _transformClass.default)(path, state.file, builtinClasses, loose, {
          setClassMethods,
          constantSuper,
          superIsCallableConstructor,
          noClassCalls
        }));

        if (path.isCallExpression()) {
          (0, _helperAnnotateAsPure.default)(path);
          const callee = path.get("callee");

          if (callee.isArrowFunctionExpression()) {
            callee.arrowFunctionToExpression();
          }
        }
      }

    }
  };
});

exports.default = _default;
}, function(modId) {var map = {"./transformClass":1625038526859}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526859, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = transformClass;

var _helperFunctionName = require("@babel/helper-function-name");

var _helperReplaceSupers = require("@babel/helper-replace-supers");

var _helperOptimiseCallExpression = require("@babel/helper-optimise-call-expression");

var _core = require("@babel/core");

var _helperAnnotateAsPure = require("@babel/helper-annotate-as-pure");

var _inlineCreateSuperHelpers = require("./inline-createSuper-helpers");

function buildConstructor(classRef, constructorBody, node) {
  const func = _core.types.functionDeclaration(_core.types.cloneNode(classRef), [], constructorBody);

  _core.types.inherits(func, node);

  return func;
}

function transformClass(path, file, builtinClasses, isLoose, assumptions) {
  const classState = {
    parent: undefined,
    scope: undefined,
    node: undefined,
    path: undefined,
    file: undefined,
    classId: undefined,
    classRef: undefined,
    superFnId: undefined,
    superName: undefined,
    superReturns: [],
    isDerived: false,
    extendsNative: false,
    construct: undefined,
    constructorBody: undefined,
    userConstructor: undefined,
    userConstructorPath: undefined,
    hasConstructor: false,
    staticPropBody: [],
    body: [],
    superThises: [],
    pushedConstructor: false,
    pushedInherits: false,
    protoAlias: null,
    isLoose: false,
    methods: {
      instance: {
        hasComputed: false,
        list: [],
        map: new Map()
      },
      static: {
        hasComputed: false,
        list: [],
        map: new Map()
      }
    }
  };

  const setState = newState => {
    Object.assign(classState, newState);
  };

  const findThisesVisitor = _core.traverse.visitors.merge([_helperReplaceSupers.environmentVisitor, {
    ThisExpression(path) {
      classState.superThises.push(path);
    }

  }]);

  function maybeCreateConstructor() {
    let hasConstructor = false;
    const paths = classState.path.get("body.body");

    for (const path of paths) {
      hasConstructor = path.equals("kind", "constructor");
      if (hasConstructor) break;
    }

    if (hasConstructor) return;
    let params, body;

    if (classState.isDerived) {
      const constructor = _core.template.expression.ast`
        (function () {
          super(...arguments);
        })
      `;
      params = constructor.params;
      body = constructor.body;
    } else {
      params = [];
      body = _core.types.blockStatement([]);
    }

    classState.path.get("body").unshiftContainer("body", _core.types.classMethod("constructor", _core.types.identifier("constructor"), params, body));
  }

  function buildBody() {
    maybeCreateConstructor();
    pushBody();
    verifyConstructor();

    if (classState.userConstructor) {
      const {
        constructorBody,
        userConstructor,
        construct
      } = classState;
      constructorBody.body = constructorBody.body.concat(userConstructor.body.body);

      _core.types.inherits(construct, userConstructor);

      _core.types.inherits(constructorBody, userConstructor.body);
    }

    pushDescriptors();
  }

  function pushBody() {
    const classBodyPaths = classState.path.get("body.body");

    for (const path of classBodyPaths) {
      const node = path.node;

      if (path.isClassProperty()) {
        throw path.buildCodeFrameError("Missing class properties transform.");
      }

      if (node.decorators) {
        throw path.buildCodeFrameError("Method has decorators, put the decorator plugin before the classes one.");
      }

      if (_core.types.isClassMethod(node)) {
        const isConstructor = node.kind === "constructor";
        const replaceSupers = new _helperReplaceSupers.default({
          methodPath: path,
          objectRef: classState.classRef,
          superRef: classState.superName,
          constantSuper: assumptions.constantSuper,
          file: classState.file,
          refToPreserve: classState.classRef
        });
        replaceSupers.replace();
        const superReturns = [];
        path.traverse(_core.traverse.visitors.merge([_helperReplaceSupers.environmentVisitor, {
          ReturnStatement(path) {
            if (!path.getFunctionParent().isArrowFunctionExpression()) {
              superReturns.push(path);
            }
          }

        }]));

        if (isConstructor) {
          pushConstructor(superReturns, node, path);
        } else {
          pushMethod(node, path);
        }
      }
    }
  }

  function pushDescriptors() {
    pushInheritsToBody();
    const {
      body
    } = classState;
    const props = {
      instance: null,
      static: null
    };

    for (const placement of ["static", "instance"]) {
      if (classState.methods[placement].list.length) {
        props[placement] = classState.methods[placement].list.map(desc => {
          const obj = _core.types.objectExpression([_core.types.objectProperty(_core.types.identifier("key"), desc.key)]);

          for (const kind of ["get", "set", "value"]) {
            if (desc[kind] != null) {
              obj.properties.push(_core.types.objectProperty(_core.types.identifier(kind), desc[kind]));
            }
          }

          return obj;
        });
      }
    }

    if (props.instance || props.static) {
      let args = [_core.types.cloneNode(classState.classRef), props.instance ? _core.types.arrayExpression(props.instance) : _core.types.nullLiteral(), props.static ? _core.types.arrayExpression(props.static) : _core.types.nullLiteral()];
      let lastNonNullIndex = 0;

      for (let i = 0; i < args.length; i++) {
        if (!_core.types.isNullLiteral(args[i])) lastNonNullIndex = i;
      }

      args = args.slice(0, lastNonNullIndex + 1);
      body.push(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper("createClass"), args)));
    }
  }

  function wrapSuperCall(bareSuper, superRef, thisRef, body) {
    const bareSuperNode = bareSuper.node;
    let call;

    if (assumptions.superIsCallableConstructor) {
      bareSuperNode.arguments.unshift(_core.types.thisExpression());

      if (bareSuperNode.arguments.length === 2 && _core.types.isSpreadElement(bareSuperNode.arguments[1]) && _core.types.isIdentifier(bareSuperNode.arguments[1].argument, {
        name: "arguments"
      })) {
        bareSuperNode.arguments[1] = bareSuperNode.arguments[1].argument;
        bareSuperNode.callee = _core.types.memberExpression(_core.types.cloneNode(superRef), _core.types.identifier("apply"));
      } else {
        bareSuperNode.callee = _core.types.memberExpression(_core.types.cloneNode(superRef), _core.types.identifier("call"));
      }

      call = _core.types.logicalExpression("||", bareSuperNode, _core.types.thisExpression());
    } else {
      call = (0, _helperOptimiseCallExpression.default)(_core.types.cloneNode(classState.superFnId), _core.types.thisExpression(), bareSuperNode.arguments, false);
    }

    if (bareSuper.parentPath.isExpressionStatement() && bareSuper.parentPath.container === body.node.body && body.node.body.length - 1 === bareSuper.parentPath.key) {
      if (classState.superThises.length) {
        call = _core.types.assignmentExpression("=", thisRef(), call);
      }

      bareSuper.parentPath.replaceWith(_core.types.returnStatement(call));
    } else {
      bareSuper.replaceWith(_core.types.assignmentExpression("=", thisRef(), call));
    }
  }

  function verifyConstructor() {
    if (!classState.isDerived) return;
    const path = classState.userConstructorPath;
    const body = path.get("body");
    path.traverse(findThisesVisitor);

    let thisRef = function () {
      const ref = path.scope.generateDeclaredUidIdentifier("this");

      thisRef = () => _core.types.cloneNode(ref);

      return ref;
    };

    for (const thisPath of classState.superThises) {
      const {
        node,
        parentPath
      } = thisPath;

      if (parentPath.isMemberExpression({
        object: node
      })) {
        thisPath.replaceWith(thisRef());
        continue;
      }

      thisPath.replaceWith(_core.types.callExpression(classState.file.addHelper("assertThisInitialized"), [thisRef()]));
    }

    const bareSupers = new Set();
    path.traverse(_core.traverse.visitors.merge([_helperReplaceSupers.environmentVisitor, {
      Super(path) {
        const {
          node,
          parentPath
        } = path;

        if (parentPath.isCallExpression({
          callee: node
        })) {
          bareSupers.add(parentPath);
        }
      }

    }]));
    let guaranteedSuperBeforeFinish = !!bareSupers.size;

    for (const bareSuper of bareSupers) {
      wrapSuperCall(bareSuper, classState.superName, thisRef, body);

      if (guaranteedSuperBeforeFinish) {
        bareSuper.find(function (parentPath) {
          if (parentPath === path) {
            return true;
          }

          if (parentPath.isLoop() || parentPath.isConditional() || parentPath.isArrowFunctionExpression()) {
            guaranteedSuperBeforeFinish = false;
            return true;
          }
        });
      }
    }

    let wrapReturn;

    if (classState.isLoose) {
      wrapReturn = returnArg => {
        const thisExpr = _core.types.callExpression(classState.file.addHelper("assertThisInitialized"), [thisRef()]);

        return returnArg ? _core.types.logicalExpression("||", returnArg, thisExpr) : thisExpr;
      };
    } else {
      wrapReturn = returnArg => _core.types.callExpression(classState.file.addHelper("possibleConstructorReturn"), [thisRef()].concat(returnArg || []));
    }

    const bodyPaths = body.get("body");

    if (!bodyPaths.length || !bodyPaths.pop().isReturnStatement()) {
      body.pushContainer("body", _core.types.returnStatement(guaranteedSuperBeforeFinish ? thisRef() : wrapReturn()));
    }

    for (const returnPath of classState.superReturns) {
      returnPath.get("argument").replaceWith(wrapReturn(returnPath.node.argument));
    }
  }

  function pushMethod(node, path) {
    const scope = path ? path.scope : classState.scope;

    if (node.kind === "method") {
      if (processMethod(node, scope)) return;
    }

    const placement = node.static ? "static" : "instance";
    const methods = classState.methods[placement];
    const descKey = node.kind === "method" ? "value" : node.kind;
    const key = _core.types.isNumericLiteral(node.key) || _core.types.isBigIntLiteral(node.key) ? _core.types.stringLiteral(String(node.key.value)) : _core.types.toComputedKey(node);

    let fn = _core.types.toExpression(node);

    if (_core.types.isStringLiteral(key)) {
      if (node.kind === "method") {
        fn = (0, _helperFunctionName.default)({
          id: key,
          node: node,
          scope
        });
      }
    } else {
      methods.hasComputed = true;
    }

    let descriptor;

    if (!methods.hasComputed && methods.map.has(key.value)) {
      descriptor = methods.map.get(key.value);
      descriptor[descKey] = fn;

      if (descKey === "value") {
        descriptor.get = null;
        descriptor.set = null;
      } else {
        descriptor.value = null;
      }
    } else {
      descriptor = {
        key: key,
        [descKey]: fn
      };
      methods.list.push(descriptor);

      if (!methods.hasComputed) {
        methods.map.set(key.value, descriptor);
      }
    }
  }

  function processMethod(node, scope) {
    if (assumptions.setClassMethods && !node.decorators) {
      let {
        classRef
      } = classState;

      if (!node.static) {
        insertProtoAliasOnce();
        classRef = classState.protoAlias;
      }

      const methodName = _core.types.memberExpression(_core.types.cloneNode(classRef), node.key, node.computed || _core.types.isLiteral(node.key));

      let func = _core.types.functionExpression(null, node.params, node.body, node.generator, node.async);

      _core.types.inherits(func, node);

      const key = _core.types.toComputedKey(node, node.key);

      if (_core.types.isStringLiteral(key)) {
        func = (0, _helperFunctionName.default)({
          node: func,
          id: key,
          scope
        });
      }

      const expr = _core.types.expressionStatement(_core.types.assignmentExpression("=", methodName, func));

      _core.types.inheritsComments(expr, node);

      classState.body.push(expr);
      return true;
    }

    return false;
  }

  function insertProtoAliasOnce() {
    if (classState.protoAlias === null) {
      setState({
        protoAlias: classState.scope.generateUidIdentifier("proto")
      });

      const classProto = _core.types.memberExpression(classState.classRef, _core.types.identifier("prototype"));

      const protoDeclaration = _core.types.variableDeclaration("var", [_core.types.variableDeclarator(classState.protoAlias, classProto)]);

      classState.body.push(protoDeclaration);
    }
  }

  function pushConstructor(superReturns, method, path) {
    setState({
      userConstructorPath: path,
      userConstructor: method,
      hasConstructor: true,
      superReturns
    });
    const {
      construct
    } = classState;

    _core.types.inheritsComments(construct, method);

    construct.params = method.params;

    _core.types.inherits(construct.body, method.body);

    construct.body.directives = method.body.directives;
    pushConstructorToBody();
  }

  function pushConstructorToBody() {
    if (classState.pushedConstructor) return;
    classState.pushedConstructor = true;

    if (classState.hasInstanceDescriptors || classState.hasStaticDescriptors) {
      pushDescriptors();
    }

    classState.body.push(classState.construct);
    pushInheritsToBody();
  }

  function pushInheritsToBody() {
    if (!classState.isDerived || classState.pushedInherits) return;
    const superFnId = path.scope.generateUidIdentifier("super");
    setState({
      pushedInherits: true,
      superFnId
    });

    if (!assumptions.superIsCallableConstructor) {
      classState.body.unshift(_core.types.variableDeclaration("var", [_core.types.variableDeclarator(superFnId, _core.types.callExpression((0, _inlineCreateSuperHelpers.default)(classState.file), [_core.types.cloneNode(classState.classRef)]))]));
    }

    classState.body.unshift(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper(classState.isLoose ? "inheritsLoose" : "inherits"), [_core.types.cloneNode(classState.classRef), _core.types.cloneNode(classState.superName)])));
  }

  function setupClosureParamsArgs() {
    const {
      superName
    } = classState;
    const closureParams = [];
    const closureArgs = [];

    if (classState.isDerived) {
      let arg = _core.types.cloneNode(superName);

      if (classState.extendsNative) {
        arg = _core.types.callExpression(classState.file.addHelper("wrapNativeSuper"), [arg]);
        (0, _helperAnnotateAsPure.default)(arg);
      }

      const param = classState.scope.generateUidIdentifierBasedOnNode(superName);
      closureParams.push(param);
      closureArgs.push(arg);
      setState({
        superName: _core.types.cloneNode(param)
      });
    }

    return {
      closureParams,
      closureArgs
    };
  }

  function classTransformer(path, file, builtinClasses, isLoose) {
    setState({
      parent: path.parent,
      scope: path.scope,
      node: path.node,
      path,
      file,
      isLoose
    });
    setState({
      classId: classState.node.id,
      classRef: classState.node.id ? _core.types.identifier(classState.node.id.name) : classState.scope.generateUidIdentifier("class"),
      superName: classState.node.superClass,
      isDerived: !!classState.node.superClass,
      constructorBody: _core.types.blockStatement([])
    });
    setState({
      extendsNative: classState.isDerived && builtinClasses.has(classState.superName.name) && !classState.scope.hasBinding(classState.superName.name, true)
    });
    const {
      classRef,
      node,
      constructorBody
    } = classState;
    setState({
      construct: buildConstructor(classRef, constructorBody, node)
    });
    let {
      body
    } = classState;
    const {
      closureParams,
      closureArgs
    } = setupClosureParamsArgs();
    buildBody();

    if (!assumptions.noClassCalls) {
      constructorBody.body.unshift(_core.types.expressionStatement(_core.types.callExpression(classState.file.addHelper("classCallCheck"), [_core.types.thisExpression(), _core.types.cloneNode(classState.classRef)])));
    }

    body = body.concat(classState.staticPropBody.map(fn => fn(_core.types.cloneNode(classState.classRef))));
    const isStrict = path.isInStrictMode();
    let constructorOnly = classState.classId && body.length === 1;

    if (constructorOnly && !isStrict) {
      for (const param of classState.construct.params) {
        if (!_core.types.isIdentifier(param)) {
          constructorOnly = false;
          break;
        }
      }
    }

    const directives = constructorOnly ? body[0].body.directives : [];

    if (!isStrict) {
      directives.push(_core.types.directive(_core.types.directiveLiteral("use strict")));
    }

    if (constructorOnly) {
      return _core.types.toExpression(body[0]);
    }

    body.push(_core.types.returnStatement(_core.types.cloneNode(classState.classRef)));

    const container = _core.types.arrowFunctionExpression(closureParams, _core.types.blockStatement(body, directives));

    return _core.types.callExpression(container, closureArgs);
  }

  return classTransformer(path, file, builtinClasses, isLoose);
}
}, function(modId) { var map = {"./inline-createSuper-helpers":1625038526860}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526860, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = addCreateSuperHelper;

var _core = require("@babel/core");

const helperIDs = new WeakMap();

function addCreateSuperHelper(file) {
  if (helperIDs.has(file)) {
    return (_core.types.cloneNode || _core.types.clone)(helperIDs.get(file));
  }

  try {
    return file.addHelper("createSuper");
  } catch (_unused) {}

  const id = file.scope.generateUidIdentifier("createSuper");
  helperIDs.set(file, id);
  const fn = helper({
    CREATE_SUPER: id,
    GET_PROTOTYPE_OF: file.addHelper("getPrototypeOf"),
    POSSIBLE_CONSTRUCTOR_RETURN: file.addHelper("possibleConstructorReturn")
  });
  file.path.unshiftContainer("body", [fn]);
  file.scope.registerDeclaration(file.path.get("body.0"));
  return _core.types.cloneNode(id);
}

const helper = _core.template.statement`
  function CREATE_SUPER(Derived) {
    function isNativeReflectConstruct() {
      if (typeof Reflect === "undefined" || !Reflect.construct) return false;

      // core-js@3
      if (Reflect.construct.sham) return false;

      // Proxy can't be polyfilled. Every browser implemented
      // proxies before or at the same time as Reflect.construct,
      // so if they support Proxy they also support Reflect.construct.
      if (typeof Proxy === "function") return true;

      // Since Reflect.construct can't be properly polyfilled, some
      // implementations (e.g. core-js@2) don't set the correct internal slots.
      // Those polyfills don't allow us to subclass built-ins, so we need to
      // use our fallback implementation.
      try {
        // If the internal slots aren't set, this throws an error similar to
        //   TypeError: this is not a Date object.
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {}));
        return true;
      } catch (e) {
        return false;
      }
    }

    return function () {
      var Super = GET_PROTOTYPE_OF(Derived), result;
      if (isNativeReflectConstruct()) {
        // NOTE: This doesn't work if this.__proto__.constructor has been modified.
        var NewTarget = GET_PROTOTYPE_OF(this).constructor;
        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }
      return POSSIBLE_CONSTRUCTOR_RETURN(this, result);
    }
  }
`;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526858);
})()
//# sourceMappingURL=index.js.map