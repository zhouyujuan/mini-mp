module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526785, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rewriteModuleStatementsAndPrepareHeader = rewriteModuleStatementsAndPrepareHeader;
exports.ensureStatementsHoisted = ensureStatementsHoisted;
exports.wrapInterop = wrapInterop;
exports.buildNamespaceInitStatements = buildNamespaceInitStatements;
Object.defineProperty(exports, "isModule", {
  enumerable: true,
  get: function () {
    return _helperModuleImports.isModule;
  }
});
Object.defineProperty(exports, "rewriteThis", {
  enumerable: true,
  get: function () {
    return _rewriteThis.default;
  }
});
Object.defineProperty(exports, "hasExports", {
  enumerable: true,
  get: function () {
    return _normalizeAndLoadMetadata.hasExports;
  }
});
Object.defineProperty(exports, "isSideEffectImport", {
  enumerable: true,
  get: function () {
    return _normalizeAndLoadMetadata.isSideEffectImport;
  }
});
Object.defineProperty(exports, "getModuleName", {
  enumerable: true,
  get: function () {
    return _getModuleName.default;
  }
});

var _assert = require("assert");

var t = require("@babel/types");

var _template = require("@babel/template");

var _helperModuleImports = require("@babel/helper-module-imports");

var _rewriteThis = require("./rewrite-this");

var _rewriteLiveReferences = require("./rewrite-live-references");

var _normalizeAndLoadMetadata = require("./normalize-and-load-metadata");

var _getModuleName = require("./get-module-name");

function rewriteModuleStatementsAndPrepareHeader(path, {
  loose,
  exportName,
  strict,
  allowTopLevelThis,
  strictMode,
  noInterop,
  importInterop = noInterop ? "none" : "babel",
  lazy,
  esNamespaceOnly,
  constantReexports = loose,
  enumerableModuleMeta = loose
}) {
  (0, _normalizeAndLoadMetadata.validateImportInteropOption)(importInterop);

  _assert((0, _helperModuleImports.isModule)(path), "Cannot process module statements in a script");

  path.node.sourceType = "script";
  const meta = (0, _normalizeAndLoadMetadata.default)(path, exportName, {
    importInterop,
    initializeReexports: constantReexports,
    lazy,
    esNamespaceOnly
  });

  if (!allowTopLevelThis) {
    (0, _rewriteThis.default)(path);
  }

  (0, _rewriteLiveReferences.default)(path, meta);

  if (strictMode !== false) {
    const hasStrict = path.node.directives.some(directive => {
      return directive.value.value === "use strict";
    });

    if (!hasStrict) {
      path.unshiftContainer("directives", t.directive(t.directiveLiteral("use strict")));
    }
  }

  const headers = [];

  if ((0, _normalizeAndLoadMetadata.hasExports)(meta) && !strict) {
    headers.push(buildESModuleHeader(meta, enumerableModuleMeta));
  }

  const nameList = buildExportNameListDeclaration(path, meta);

  if (nameList) {
    meta.exportNameListName = nameList.name;
    headers.push(nameList.statement);
  }

  headers.push(...buildExportInitializationStatements(path, meta, constantReexports));
  return {
    meta,
    headers
  };
}

function ensureStatementsHoisted(statements) {
  statements.forEach(header => {
    header._blockHoist = 3;
  });
}

function wrapInterop(programPath, expr, type) {
  if (type === "none") {
    return null;
  }

  if (type === "node-namespace") {
    return t.callExpression(programPath.hub.addHelper("interopRequireWildcard"), [expr, t.booleanLiteral(true)]);
  } else if (type === "node-default") {
    return null;
  }

  let helper;

  if (type === "default") {
    helper = "interopRequireDefault";
  } else if (type === "namespace") {
    helper = "interopRequireWildcard";
  } else {
    throw new Error(`Unknown interop: ${type}`);
  }

  return t.callExpression(programPath.hub.addHelper(helper), [expr]);
}

function buildNamespaceInitStatements(metadata, sourceMetadata, constantReexports = false) {
  const statements = [];
  let srcNamespace = t.identifier(sourceMetadata.name);
  if (sourceMetadata.lazy) srcNamespace = t.callExpression(srcNamespace, []);

  for (const localName of sourceMetadata.importsNamespace) {
    if (localName === sourceMetadata.name) continue;
    statements.push(_template.default.statement`var NAME = SOURCE;`({
      NAME: localName,
      SOURCE: t.cloneNode(srcNamespace)
    }));
  }

  if (constantReexports) {
    statements.push(...buildReexportsFromMeta(metadata, sourceMetadata, true));
  }

  for (const exportName of sourceMetadata.reexportNamespace) {
    statements.push((sourceMetadata.lazy ? _template.default.statement`
            Object.defineProperty(EXPORTS, "NAME", {
              enumerable: true,
              get: function() {
                return NAMESPACE;
              }
            });
          ` : _template.default.statement`EXPORTS.NAME = NAMESPACE;`)({
      EXPORTS: metadata.exportName,
      NAME: exportName,
      NAMESPACE: t.cloneNode(srcNamespace)
    }));
  }

  if (sourceMetadata.reexportAll) {
    const statement = buildNamespaceReexport(metadata, t.cloneNode(srcNamespace), constantReexports);
    statement.loc = sourceMetadata.reexportAll.loc;
    statements.push(statement);
  }

  return statements;
}

const ReexportTemplate = {
  constant: _template.default.statement`EXPORTS.EXPORT_NAME = NAMESPACE_IMPORT;`,
  constantComputed: _template.default.statement`EXPORTS["EXPORT_NAME"] = NAMESPACE_IMPORT;`,
  spec: (0, _template.default)`
    Object.defineProperty(EXPORTS, "EXPORT_NAME", {
      enumerable: true,
      get: function() {
        return NAMESPACE_IMPORT;
      },
    });
    `
};

const buildReexportsFromMeta = (meta, metadata, constantReexports) => {
  const namespace = metadata.lazy ? t.callExpression(t.identifier(metadata.name), []) : t.identifier(metadata.name);
  const {
    stringSpecifiers
  } = meta;
  return Array.from(metadata.reexports, ([exportName, importName]) => {
    let NAMESPACE_IMPORT = t.cloneNode(namespace);

    if (importName === "default" && metadata.interop === "node-default") {} else if (stringSpecifiers.has(importName)) {
      NAMESPACE_IMPORT = t.memberExpression(NAMESPACE_IMPORT, t.stringLiteral(importName), true);
    } else {
      NAMESPACE_IMPORT = t.memberExpression(NAMESPACE_IMPORT, t.identifier(importName));
    }

    const astNodes = {
      EXPORTS: meta.exportName,
      EXPORT_NAME: exportName,
      NAMESPACE_IMPORT
    };

    if (constantReexports || t.isIdentifier(NAMESPACE_IMPORT)) {
      if (stringSpecifiers.has(exportName)) {
        return ReexportTemplate.constantComputed(astNodes);
      } else {
        return ReexportTemplate.constant(astNodes);
      }
    } else {
      return ReexportTemplate.spec(astNodes);
    }
  });
};

function buildESModuleHeader(metadata, enumerableModuleMeta = false) {
  return (enumerableModuleMeta ? _template.default.statement`
        EXPORTS.__esModule = true;
      ` : _template.default.statement`
        Object.defineProperty(EXPORTS, "__esModule", {
          value: true,
        });
      `)({
    EXPORTS: metadata.exportName
  });
}

function buildNamespaceReexport(metadata, namespace, constantReexports) {
  return (constantReexports ? _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          EXPORTS[key] = NAMESPACE[key];
        });
      ` : _template.default.statement`
        Object.keys(NAMESPACE).forEach(function(key) {
          if (key === "default" || key === "__esModule") return;
          VERIFY_NAME_LIST;
          if (key in EXPORTS && EXPORTS[key] === NAMESPACE[key]) return;

          Object.defineProperty(EXPORTS, key, {
            enumerable: true,
            get: function() {
              return NAMESPACE[key];
            },
          });
        });
    `)({
    NAMESPACE: namespace,
    EXPORTS: metadata.exportName,
    VERIFY_NAME_LIST: metadata.exportNameListName ? (0, _template.default)`
            if (Object.prototype.hasOwnProperty.call(EXPORTS_LIST, key)) return;
          `({
      EXPORTS_LIST: metadata.exportNameListName
    }) : null
  });
}

function buildExportNameListDeclaration(programPath, metadata) {
  const exportedVars = Object.create(null);

  for (const data of metadata.local.values()) {
    for (const name of data.names) {
      exportedVars[name] = true;
    }
  }

  let hasReexport = false;

  for (const data of metadata.source.values()) {
    for (const exportName of data.reexports.keys()) {
      exportedVars[exportName] = true;
    }

    for (const exportName of data.reexportNamespace) {
      exportedVars[exportName] = true;
    }

    hasReexport = hasReexport || !!data.reexportAll;
  }

  if (!hasReexport || Object.keys(exportedVars).length === 0) return null;
  const name = programPath.scope.generateUidIdentifier("exportNames");
  delete exportedVars.default;
  return {
    name: name.name,
    statement: t.variableDeclaration("var", [t.variableDeclarator(name, t.valueToNode(exportedVars))])
  };
}

function buildExportInitializationStatements(programPath, metadata, constantReexports = false) {
  const initStatements = [];
  const exportNames = [];

  for (const [localName, data] of metadata.local) {
    if (data.kind === "import") {} else if (data.kind === "hoisted") {
      initStatements.push(buildInitStatement(metadata, data.names, t.identifier(localName)));
    } else {
      exportNames.push(...data.names);
    }
  }

  for (const data of metadata.source.values()) {
    if (!constantReexports) {
      initStatements.push(...buildReexportsFromMeta(metadata, data, false));
    }

    for (const exportName of data.reexportNamespace) {
      exportNames.push(exportName);
    }
  }

  initStatements.push(...chunk(exportNames, 100).map(members => {
    return buildInitStatement(metadata, members, programPath.scope.buildUndefinedNode());
  }));
  return initStatements;
}

const InitTemplate = {
  computed: _template.default.expression`EXPORTS["NAME"] = VALUE`,
  default: _template.default.expression`EXPORTS.NAME = VALUE`
};

function buildInitStatement(metadata, exportNames, initExpr) {
  const {
    stringSpecifiers,
    exportName: EXPORTS
  } = metadata;
  return t.expressionStatement(exportNames.reduce((acc, exportName) => {
    const params = {
      EXPORTS,
      NAME: exportName,
      VALUE: acc
    };

    if (stringSpecifiers.has(exportName)) {
      return InitTemplate.computed(params);
    } else {
      return InitTemplate.default(params);
    }
  }, initExpr));
}

function chunk(array, size) {
  const chunks = [];

  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }

  return chunks;
}
}, function(modId) {var map = {"./rewrite-this":1625038526786,"./rewrite-live-references":1625038526787,"./normalize-and-load-metadata":1625038526788,"./get-module-name":1625038526789}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526786, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rewriteThis;

var _helperReplaceSupers = require("@babel/helper-replace-supers");

var _traverse = require("@babel/traverse");

var t = require("@babel/types");

function rewriteThis(programPath) {
  (0, _traverse.default)(programPath.node, Object.assign({}, rewriteThisVisitor, {
    noScope: true
  }));
}

const rewriteThisVisitor = _traverse.default.visitors.merge([_helperReplaceSupers.environmentVisitor, {
  ThisExpression(path) {
    path.replaceWith(t.unaryExpression("void", t.numericLiteral(0), true));
  }

}]);
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526787, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = rewriteLiveReferences;

var _assert = require("assert");

var t = require("@babel/types");

var _template = require("@babel/template");

var _helperSimpleAccess = require("@babel/helper-simple-access");

function rewriteLiveReferences(programPath, metadata) {
  const imported = new Map();
  const exported = new Map();

  const requeueInParent = path => {
    programPath.requeue(path);
  };

  for (const [source, data] of metadata.source) {
    for (const [localName, importName] of data.imports) {
      imported.set(localName, [source, importName, null]);
    }

    for (const localName of data.importsNamespace) {
      imported.set(localName, [source, null, localName]);
    }
  }

  for (const [local, data] of metadata.local) {
    let exportMeta = exported.get(local);

    if (!exportMeta) {
      exportMeta = [];
      exported.set(local, exportMeta);
    }

    exportMeta.push(...data.names);
  }

  const rewriteBindingInitVisitorState = {
    metadata,
    requeueInParent,
    scope: programPath.scope,
    exported
  };
  programPath.traverse(rewriteBindingInitVisitor, rewriteBindingInitVisitorState);
  (0, _helperSimpleAccess.default)(programPath, new Set([...Array.from(imported.keys()), ...Array.from(exported.keys())]));
  const rewriteReferencesVisitorState = {
    seen: new WeakSet(),
    metadata,
    requeueInParent,
    scope: programPath.scope,
    imported,
    exported,
    buildImportReference: ([source, importName, localName], identNode) => {
      const meta = metadata.source.get(source);

      if (localName) {
        if (meta.lazy) identNode = t.callExpression(identNode, []);
        return identNode;
      }

      let namespace = t.identifier(meta.name);
      if (meta.lazy) namespace = t.callExpression(namespace, []);

      if (importName === "default" && meta.interop === "node-default") {
        return namespace;
      }

      const computed = metadata.stringSpecifiers.has(importName);
      return t.memberExpression(namespace, computed ? t.stringLiteral(importName) : t.identifier(importName), computed);
    }
  };
  programPath.traverse(rewriteReferencesVisitor, rewriteReferencesVisitorState);
}

const rewriteBindingInitVisitor = {
  Scope(path) {
    path.skip();
  },

  ClassDeclaration(path) {
    const {
      requeueInParent,
      exported,
      metadata
    } = this;
    const {
      id
    } = path.node;
    if (!id) throw new Error("Expected class to have a name");
    const localName = id.name;
    const exportNames = exported.get(localName) || [];

    if (exportNames.length > 0) {
      const statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
      statement._blockHoist = path.node._blockHoist;
      requeueInParent(path.insertAfter(statement)[0]);
    }
  },

  VariableDeclaration(path) {
    const {
      requeueInParent,
      exported,
      metadata
    } = this;
    Object.keys(path.getOuterBindingIdentifiers()).forEach(localName => {
      const exportNames = exported.get(localName) || [];

      if (exportNames.length > 0) {
        const statement = t.expressionStatement(buildBindingExportAssignmentExpression(metadata, exportNames, t.identifier(localName)));
        statement._blockHoist = path.node._blockHoist;
        requeueInParent(path.insertAfter(statement)[0]);
      }
    });
  }

};

const buildBindingExportAssignmentExpression = (metadata, exportNames, localExpr) => {
  return (exportNames || []).reduce((expr, exportName) => {
    const {
      stringSpecifiers
    } = metadata;
    const computed = stringSpecifiers.has(exportName);
    return t.assignmentExpression("=", t.memberExpression(t.identifier(metadata.exportName), computed ? t.stringLiteral(exportName) : t.identifier(exportName), computed), expr);
  }, localExpr);
};

const buildImportThrow = localName => {
  return _template.default.expression.ast`
    (function() {
      throw new Error('"' + '${localName}' + '" is read-only.');
    })()
  `;
};

const rewriteReferencesVisitor = {
  ReferencedIdentifier(path) {
    const {
      seen,
      buildImportReference,
      scope,
      imported,
      requeueInParent
    } = this;
    if (seen.has(path.node)) return;
    seen.add(path.node);
    const localName = path.node.name;
    const importData = imported.get(localName);

    if (importData) {
      const localBinding = path.scope.getBinding(localName);
      const rootBinding = scope.getBinding(localName);
      if (rootBinding !== localBinding) return;
      const ref = buildImportReference(importData, path.node);
      ref.loc = path.node.loc;

      if ((path.parentPath.isCallExpression({
        callee: path.node
      }) || path.parentPath.isOptionalCallExpression({
        callee: path.node
      }) || path.parentPath.isTaggedTemplateExpression({
        tag: path.node
      })) && t.isMemberExpression(ref)) {
        path.replaceWith(t.sequenceExpression([t.numericLiteral(0), ref]));
      } else if (path.isJSXIdentifier() && t.isMemberExpression(ref)) {
        const {
          object,
          property
        } = ref;
        path.replaceWith(t.jsxMemberExpression(t.jsxIdentifier(object.name), t.jsxIdentifier(property.name)));
      } else {
        path.replaceWith(ref);
      }

      requeueInParent(path);
      path.skip();
    }
  },

  AssignmentExpression: {
    exit(path) {
      const {
        scope,
        seen,
        imported,
        exported,
        requeueInParent,
        buildImportReference
      } = this;
      if (seen.has(path.node)) return;
      seen.add(path.node);
      const left = path.get("left");
      if (left.isMemberExpression()) return;

      if (left.isIdentifier()) {
        const localName = left.node.name;

        if (scope.getBinding(localName) !== path.scope.getBinding(localName)) {
          return;
        }

        const exportedNames = exported.get(localName);
        const importData = imported.get(localName);

        if ((exportedNames == null ? void 0 : exportedNames.length) > 0 || importData) {
          _assert(path.node.operator === "=", "Path was not simplified");

          const assignment = path.node;

          if (importData) {
            assignment.left = buildImportReference(importData, assignment.left);
            assignment.right = t.sequenceExpression([assignment.right, buildImportThrow(localName)]);
          }

          path.replaceWith(buildBindingExportAssignmentExpression(this.metadata, exportedNames, assignment));
          requeueInParent(path);
        }
      } else {
        const ids = left.getOuterBindingIdentifiers();
        const programScopeIds = Object.keys(ids).filter(localName => scope.getBinding(localName) === path.scope.getBinding(localName));
        const id = programScopeIds.find(localName => imported.has(localName));

        if (id) {
          path.node.right = t.sequenceExpression([path.node.right, buildImportThrow(id)]);
        }

        const items = [];
        programScopeIds.forEach(localName => {
          const exportedNames = exported.get(localName) || [];

          if (exportedNames.length > 0) {
            items.push(buildBindingExportAssignmentExpression(this.metadata, exportedNames, t.identifier(localName)));
          }
        });

        if (items.length > 0) {
          let node = t.sequenceExpression(items);

          if (path.parentPath.isExpressionStatement()) {
            node = t.expressionStatement(node);
            node._blockHoist = path.parentPath.node._blockHoist;
          }

          const statement = path.insertAfter(node)[0];
          requeueInParent(statement);
        }
      }
    }

  },

  "ForOfStatement|ForInStatement"(path) {
    const {
      scope,
      node
    } = path;
    const {
      left
    } = node;
    const {
      exported,
      scope: programScope
    } = this;

    if (!t.isVariableDeclaration(left)) {
      let didTransform = false;
      const bodyPath = path.get("body");
      const loopBodyScope = bodyPath.scope;

      for (const name of Object.keys(t.getOuterBindingIdentifiers(left))) {
        if (exported.get(name) && programScope.getBinding(name) === scope.getBinding(name)) {
          didTransform = true;

          if (loopBodyScope.hasOwnBinding(name)) {
            loopBodyScope.rename(name);
          }
        }
      }

      if (!didTransform) {
        return;
      }

      const newLoopId = scope.generateUidIdentifierBasedOnNode(left);
      bodyPath.unshiftContainer("body", t.expressionStatement(t.assignmentExpression("=", left, newLoopId)));
      path.get("left").replaceWith(t.variableDeclaration("let", [t.variableDeclarator(t.cloneNode(newLoopId))]));
      scope.registerDeclaration(path.get("left"));
    }
  }

};
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526788, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasExports = hasExports;
exports.isSideEffectImport = isSideEffectImport;
exports.validateImportInteropOption = validateImportInteropOption;
exports.default = normalizeModuleAndLoadMetadata;

var _path = require("path");

var _helperValidatorIdentifier = require("@babel/helper-validator-identifier");

var _helperSplitExportDeclaration = require("@babel/helper-split-export-declaration");

function hasExports(metadata) {
  return metadata.hasExports;
}

function isSideEffectImport(source) {
  return source.imports.size === 0 && source.importsNamespace.size === 0 && source.reexports.size === 0 && source.reexportNamespace.size === 0 && !source.reexportAll;
}

function validateImportInteropOption(importInterop) {
  if (typeof importInterop !== "function" && importInterop !== "none" && importInterop !== "babel" && importInterop !== "node") {
    throw new Error(`.importInterop must be one of "none", "babel", "node", or a function returning one of those values (received ${importInterop}).`);
  }

  return importInterop;
}

function resolveImportInterop(importInterop, source) {
  if (typeof importInterop === "function") {
    return validateImportInteropOption(importInterop(source));
  }

  return importInterop;
}

function normalizeModuleAndLoadMetadata(programPath, exportName, {
  importInterop,
  initializeReexports = false,
  lazy = false,
  esNamespaceOnly = false
}) {
  if (!exportName) {
    exportName = programPath.scope.generateUidIdentifier("exports").name;
  }

  const stringSpecifiers = new Set();
  nameAnonymousExports(programPath);
  const {
    local,
    source,
    hasExports
  } = getModuleMetadata(programPath, {
    initializeReexports,
    lazy
  }, stringSpecifiers);
  removeModuleDeclarations(programPath);

  for (const [, metadata] of source) {
    if (metadata.importsNamespace.size > 0) {
      metadata.name = metadata.importsNamespace.values().next().value;
    }

    const resolvedInterop = resolveImportInterop(importInterop, metadata.source);

    if (resolvedInterop === "none") {
      metadata.interop = "none";
    } else if (resolvedInterop === "node" && metadata.interop === "namespace") {
      metadata.interop = "node-namespace";
    } else if (resolvedInterop === "node" && metadata.interop === "default") {
      metadata.interop = "node-default";
    } else if (esNamespaceOnly && metadata.interop === "namespace") {
      metadata.interop = "default";
    }
  }

  return {
    exportName,
    exportNameListName: null,
    hasExports,
    local,
    source,
    stringSpecifiers
  };
}

function getExportSpecifierName(path, stringSpecifiers) {
  if (path.isIdentifier()) {
    return path.node.name;
  } else if (path.isStringLiteral()) {
    const stringValue = path.node.value;

    if (!(0, _helperValidatorIdentifier.isIdentifierName)(stringValue)) {
      stringSpecifiers.add(stringValue);
    }

    return stringValue;
  } else {
    throw new Error(`Expected export specifier to be either Identifier or StringLiteral, got ${path.node.type}`);
  }
}

function assertExportSpecifier(path) {
  if (path.isExportSpecifier()) {
    return;
  } else if (path.isExportNamespaceSpecifier()) {
    throw path.buildCodeFrameError("Export namespace should be first transformed by `@babel/plugin-proposal-export-namespace-from`.");
  } else {
    throw path.buildCodeFrameError("Unexpected export specifier type");
  }
}

function getModuleMetadata(programPath, {
  lazy,
  initializeReexports
}, stringSpecifiers) {
  const localData = getLocalExportMetadata(programPath, initializeReexports, stringSpecifiers);
  const sourceData = new Map();

  const getData = sourceNode => {
    const source = sourceNode.value;
    let data = sourceData.get(source);

    if (!data) {
      data = {
        name: programPath.scope.generateUidIdentifier((0, _path.basename)(source, (0, _path.extname)(source))).name,
        interop: "none",
        loc: null,
        imports: new Map(),
        importsNamespace: new Set(),
        reexports: new Map(),
        reexportNamespace: new Set(),
        reexportAll: null,
        lazy: false,
        source
      };
      sourceData.set(source, data);
    }

    return data;
  };

  let hasExports = false;
  programPath.get("body").forEach(child => {
    if (child.isImportDeclaration()) {
      const data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;
      child.get("specifiers").forEach(spec => {
        if (spec.isImportDefaultSpecifier()) {
          const localName = spec.get("local").node.name;
          data.imports.set(localName, "default");
          const reexport = localData.get(localName);

          if (reexport) {
            localData.delete(localName);
            reexport.names.forEach(name => {
              data.reexports.set(name, "default");
            });
          }
        } else if (spec.isImportNamespaceSpecifier()) {
          const localName = spec.get("local").node.name;
          data.importsNamespace.add(localName);
          const reexport = localData.get(localName);

          if (reexport) {
            localData.delete(localName);
            reexport.names.forEach(name => {
              data.reexportNamespace.add(name);
            });
          }
        } else if (spec.isImportSpecifier()) {
          const importName = getExportSpecifierName(spec.get("imported"), stringSpecifiers);
          const localName = spec.get("local").node.name;
          data.imports.set(localName, importName);
          const reexport = localData.get(localName);

          if (reexport) {
            localData.delete(localName);
            reexport.names.forEach(name => {
              data.reexports.set(name, importName);
            });
          }
        }
      });
    } else if (child.isExportAllDeclaration()) {
      hasExports = true;
      const data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;
      data.reexportAll = {
        loc: child.node.loc
      };
    } else if (child.isExportNamedDeclaration() && child.node.source) {
      hasExports = true;
      const data = getData(child.node.source);
      if (!data.loc) data.loc = child.node.loc;
      child.get("specifiers").forEach(spec => {
        assertExportSpecifier(spec);
        const importName = getExportSpecifierName(spec.get("local"), stringSpecifiers);
        const exportName = getExportSpecifierName(spec.get("exported"), stringSpecifiers);
        data.reexports.set(exportName, importName);

        if (exportName === "__esModule") {
          throw spec.get("exported").buildCodeFrameError('Illegal export "__esModule".');
        }
      });
    } else if (child.isExportNamedDeclaration() || child.isExportDefaultDeclaration()) {
      hasExports = true;
    }
  });

  for (const metadata of sourceData.values()) {
    let needsDefault = false;
    let needsNamed = false;

    if (metadata.importsNamespace.size > 0) {
      needsDefault = true;
      needsNamed = true;
    }

    if (metadata.reexportAll) {
      needsNamed = true;
    }

    for (const importName of metadata.imports.values()) {
      if (importName === "default") needsDefault = true;else needsNamed = true;
    }

    for (const importName of metadata.reexports.values()) {
      if (importName === "default") needsDefault = true;else needsNamed = true;
    }

    if (needsDefault && needsNamed) {
      metadata.interop = "namespace";
    } else if (needsDefault) {
      metadata.interop = "default";
    }
  }

  for (const [source, metadata] of sourceData) {
    if (lazy !== false && !(isSideEffectImport(metadata) || metadata.reexportAll)) {
      if (lazy === true) {
        metadata.lazy = !/\./.test(source);
      } else if (Array.isArray(lazy)) {
        metadata.lazy = lazy.indexOf(source) !== -1;
      } else if (typeof lazy === "function") {
        metadata.lazy = lazy(source);
      } else {
        throw new Error(`.lazy must be a boolean, string array, or function`);
      }
    }
  }

  return {
    hasExports,
    local: localData,
    source: sourceData
  };
}

function getLocalExportMetadata(programPath, initializeReexports, stringSpecifiers) {
  const bindingKindLookup = new Map();
  programPath.get("body").forEach(child => {
    let kind;

    if (child.isImportDeclaration()) {
      kind = "import";
    } else {
      if (child.isExportDefaultDeclaration()) child = child.get("declaration");

      if (child.isExportNamedDeclaration()) {
        if (child.node.declaration) {
          child = child.get("declaration");
        } else if (initializeReexports && child.node.source && child.get("source").isStringLiteral()) {
          child.get("specifiers").forEach(spec => {
            assertExportSpecifier(spec);
            bindingKindLookup.set(spec.get("local").node.name, "block");
          });
          return;
        }
      }

      if (child.isFunctionDeclaration()) {
        kind = "hoisted";
      } else if (child.isClassDeclaration()) {
        kind = "block";
      } else if (child.isVariableDeclaration({
        kind: "var"
      })) {
        kind = "var";
      } else if (child.isVariableDeclaration()) {
        kind = "block";
      } else {
        return;
      }
    }

    Object.keys(child.getOuterBindingIdentifiers()).forEach(name => {
      bindingKindLookup.set(name, kind);
    });
  });
  const localMetadata = new Map();

  const getLocalMetadata = idPath => {
    const localName = idPath.node.name;
    let metadata = localMetadata.get(localName);

    if (!metadata) {
      const kind = bindingKindLookup.get(localName);

      if (kind === undefined) {
        throw idPath.buildCodeFrameError(`Exporting local "${localName}", which is not declared.`);
      }

      metadata = {
        names: [],
        kind
      };
      localMetadata.set(localName, metadata);
    }

    return metadata;
  };

  programPath.get("body").forEach(child => {
    if (child.isExportNamedDeclaration() && (initializeReexports || !child.node.source)) {
      if (child.node.declaration) {
        const declaration = child.get("declaration");
        const ids = declaration.getOuterBindingIdentifierPaths();
        Object.keys(ids).forEach(name => {
          if (name === "__esModule") {
            throw declaration.buildCodeFrameError('Illegal export "__esModule".');
          }

          getLocalMetadata(ids[name]).names.push(name);
        });
      } else {
        child.get("specifiers").forEach(spec => {
          const local = spec.get("local");
          const exported = spec.get("exported");
          const localMetadata = getLocalMetadata(local);
          const exportName = getExportSpecifierName(exported, stringSpecifiers);

          if (exportName === "__esModule") {
            throw exported.buildCodeFrameError('Illegal export "__esModule".');
          }

          localMetadata.names.push(exportName);
        });
      }
    } else if (child.isExportDefaultDeclaration()) {
      const declaration = child.get("declaration");

      if (declaration.isFunctionDeclaration() || declaration.isClassDeclaration()) {
        getLocalMetadata(declaration.get("id")).names.push("default");
      } else {
        throw declaration.buildCodeFrameError("Unexpected default expression export.");
      }
    }
  });
  return localMetadata;
}

function nameAnonymousExports(programPath) {
  programPath.get("body").forEach(child => {
    if (!child.isExportDefaultDeclaration()) return;
    (0, _helperSplitExportDeclaration.default)(child);
  });
}

function removeModuleDeclarations(programPath) {
  programPath.get("body").forEach(child => {
    if (child.isImportDeclaration()) {
      child.remove();
    } else if (child.isExportNamedDeclaration()) {
      if (child.node.declaration) {
        child.node.declaration._blockHoist = child.node._blockHoist;
        child.replaceWith(child.node.declaration);
      } else {
        child.remove();
      }
    } else if (child.isExportDefaultDeclaration()) {
      const declaration = child.get("declaration");

      if (declaration.isFunctionDeclaration() || declaration.isClassDeclaration()) {
        declaration._blockHoist = child.node._blockHoist;
        child.replaceWith(declaration);
      } else {
        throw declaration.buildCodeFrameError("Unexpected default expression export.");
      }
    } else if (child.isExportAllDeclaration()) {
      child.remove();
    }
  });
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526789, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getModuleName;
{
  const originalGetModuleName = getModuleName;

  exports.default = getModuleName = function getModuleName(rootOpts, pluginOpts) {
    var _pluginOpts$moduleId, _pluginOpts$moduleIds, _pluginOpts$getModule, _pluginOpts$moduleRoo;

    return originalGetModuleName(rootOpts, {
      moduleId: (_pluginOpts$moduleId = pluginOpts.moduleId) != null ? _pluginOpts$moduleId : rootOpts.moduleId,
      moduleIds: (_pluginOpts$moduleIds = pluginOpts.moduleIds) != null ? _pluginOpts$moduleIds : rootOpts.moduleIds,
      getModuleId: (_pluginOpts$getModule = pluginOpts.getModuleId) != null ? _pluginOpts$getModule : rootOpts.getModuleId,
      moduleRoot: (_pluginOpts$moduleRoo = pluginOpts.moduleRoot) != null ? _pluginOpts$moduleRoo : rootOpts.moduleRoot
    });
  };
}

function getModuleName(rootOpts, pluginOpts) {
  const {
    filename,
    filenameRelative = filename,
    sourceRoot = pluginOpts.moduleRoot
  } = rootOpts;
  const {
    moduleId,
    moduleIds = !!moduleId,
    getModuleId,
    moduleRoot = sourceRoot
  } = pluginOpts;
  if (!moduleIds) return null;

  if (moduleId != null && !getModuleId) {
    return moduleId;
  }

  let moduleName = moduleRoot != null ? moduleRoot + "/" : "";

  if (filenameRelative) {
    const sourceRootReplacer = sourceRoot != null ? new RegExp("^" + sourceRoot + "/?") : "";
    moduleName += filenameRelative.replace(sourceRootReplacer, "").replace(/\.(\w*?)$/, "");
  }

  moduleName = moduleName.replace(/\\/g, "/");

  if (getModuleId) {
    return getModuleId(moduleName) || moduleName;
  } else {
    return moduleName;
  }
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526785);
})()
//# sourceMappingURL=index.js.map