module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526894, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "isPluginRequired", {
  enumerable: true,
  get: function () {
    return _filterItems.isPluginRequired;
  }
});
exports.default = exports.transformIncludesAndExcludes = void 0;

var _debug = require("./debug");

var _getOptionSpecificExcludes = _interopRequireDefault(require("./get-option-specific-excludes"));

var _filterItems = _interopRequireWildcard(require("./filter-items"));

var _moduleTransformations = _interopRequireDefault(require("./module-transformations"));

var _normalizeOptions = _interopRequireDefault(require("./normalize-options"));

var _plugins = _interopRequireDefault(require("../data/plugins.json"));

var _shippedProposals = require("../data/shipped-proposals");

var _usagePlugin = _interopRequireDefault(require("./polyfills/corejs2/usage-plugin"));

var _usagePlugin2 = _interopRequireDefault(require("./polyfills/corejs3/usage-plugin"));

var _usagePlugin3 = _interopRequireDefault(require("./polyfills/regenerator/usage-plugin"));

var _entryPlugin = _interopRequireDefault(require("./polyfills/corejs2/entry-plugin"));

var _entryPlugin2 = _interopRequireDefault(require("./polyfills/corejs3/entry-plugin"));

var _entryPlugin3 = _interopRequireDefault(require("./polyfills/regenerator/entry-plugin"));

var _targetsParser = _interopRequireDefault(require("./targets-parser"));

var _availablePlugins = _interopRequireDefault(require("./available-plugins"));

var _utils = require("./utils");

function _helperPluginUtils() {
  const data = require("@babel/helper-plugin-utils");

  _helperPluginUtils = function () {
    return data;
  };

  return data;
}

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const pluginListWithoutProposals = (0, _utils.filterStageFromList)(_plugins.default, _shippedProposals.proposalPlugins);

const getPlugin = pluginName => {
  const plugin = _availablePlugins.default[pluginName];

  if (!plugin) {
    throw new Error(`Could not find plugin "${pluginName}". Ensure there is an entry in ./available-plugins.js for it.`);
  }

  return plugin;
};

const transformIncludesAndExcludes = opts => {
  return opts.reduce((result, opt) => {
    const target = opt.match(/^(es|es6|es7|esnext|web)\./) ? "builtIns" : "plugins";
    result[target].add(opt);
    return result;
  }, {
    all: opts,
    plugins: new Set(),
    builtIns: new Set()
  });
};

exports.transformIncludesAndExcludes = transformIncludesAndExcludes;

function supportsStaticESM(caller) {
  return !!(caller && caller.supportsStaticESM);
}

var _default = (0, _helperPluginUtils().declare)((api, opts) => {
  api.assertVersion(7);
  const {
    configPath,
    debug,
    exclude: optionsExclude,
    forceAllTransforms,
    ignoreBrowserslistConfig,
    include: optionsInclude,
    loose,
    modules,
    shippedProposals,
    spec,
    targets: optionsTargets,
    useBuiltIns,
    corejs: {
      version: corejs,
      proposals
    }
  } = (0, _normalizeOptions.default)(opts);
  let hasUglifyTarget = false;

  if (optionsTargets && optionsTargets.uglify) {
    hasUglifyTarget = true;
    delete optionsTargets.uglify;
    console.log("");
    console.log("The uglify target has been deprecated. Set the top level");
    console.log("option `forceAllTransforms: true` instead.");
    console.log("");
  }

  if (optionsTargets && optionsTargets.esmodules && optionsTargets.browsers) {
    console.log("");
    console.log("@babel/preset-env: esmodules and browsers targets have been specified together.");
    console.log(`\`browsers\` target, \`${optionsTargets.browsers}\` will be ignored.`);
    console.log("");
  }

  const targets = (0, _targetsParser.default)(optionsTargets, {
    ignoreBrowserslistConfig,
    configPath
  });
  const include = transformIncludesAndExcludes(optionsInclude);
  const exclude = transformIncludesAndExcludes(optionsExclude);
  const transformTargets = forceAllTransforms || hasUglifyTarget ? {} : targets;
  const transformations = (0, _filterItems.default)(shippedProposals ? _plugins.default : pluginListWithoutProposals, include.plugins, exclude.plugins, transformTargets, null, (0, _getOptionSpecificExcludes.default)({
    loose
  }), _shippedProposals.pluginSyntaxMap);
  const plugins = [];
  const pluginUseBuiltIns = useBuiltIns !== false;

  if (modules !== false && _moduleTransformations.default[modules] && (modules !== "auto" || !api.caller || !api.caller(supportsStaticESM))) {
    plugins.push([getPlugin(_moduleTransformations.default[modules]), {
      loose
    }]);
  }

  transformations.forEach(pluginName => plugins.push([getPlugin(pluginName), {
    spec,
    loose,
    useBuiltIns: pluginUseBuiltIns
  }]));

  if (debug) {
    console.log("@babel/preset-env: `DEBUG` option");
    console.log("\nUsing targets:");
    console.log(JSON.stringify((0, _utils.prettifyTargets)(targets), null, 2));
    console.log(`\nUsing modules transform: ${modules.toString()}`);
    console.log("\nUsing plugins:");
    transformations.forEach(transform => {
      (0, _debug.logPluginOrPolyfill)(transform, targets, _plugins.default);
    });

    if (!useBuiltIns) {
      console.log("\nUsing polyfills: No polyfills were added, since the `useBuiltIns` option was not set.");
    } else {
      console.log(`\nUsing polyfills with \`${useBuiltIns}\` option:`);
    }
  }

  if (useBuiltIns === "usage" || useBuiltIns === "entry") {
    const regenerator = transformations.has("transform-regenerator");
    const pluginOptions = {
      corejs,
      polyfillTargets: targets,
      include: include.builtIns,
      exclude: exclude.builtIns,
      proposals,
      shippedProposals,
      regenerator,
      debug
    };

    if (corejs) {
      if (useBuiltIns === "usage") {
        if (corejs.major === 2) {
          plugins.push([_usagePlugin.default, pluginOptions]);
        } else {
          plugins.push([_usagePlugin2.default, pluginOptions]);
        }

        if (regenerator) {
          plugins.push([_usagePlugin3.default, pluginOptions]);
        }
      } else {
        if (corejs.major === 2) {
          plugins.push([_entryPlugin.default, pluginOptions]);
        } else {
          plugins.push([_entryPlugin2.default, pluginOptions]);

          if (!regenerator) {
            plugins.push([_entryPlugin3.default, pluginOptions]);
          }
        }
      }
    }
  }

  return {
    plugins
  };
});

exports.default = _default;
}, function(modId) {var map = {"./debug":1625038526895,"./get-option-specific-excludes":1625038526901,"./filter-items":1625038526902,"./module-transformations":1625038526903,"./normalize-options":1625038526904,"../data/plugins.json":1625038526906,"../data/shipped-proposals":1625038526908,"./polyfills/corejs2/usage-plugin":1625038526909,"./polyfills/corejs3/usage-plugin":1625038526911,"./polyfills/regenerator/usage-plugin":1625038526914,"./polyfills/corejs2/entry-plugin":1625038526915,"./polyfills/corejs3/entry-plugin":1625038526916,"./polyfills/regenerator/entry-plugin":1625038526917,"./targets-parser":1625038526898,"./available-plugins":1625038526918,"./utils":1625038526896}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526895, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.logUsagePolyfills = exports.logEntryPolyfills = exports.logPluginOrPolyfill = void 0;

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const wordEnds = size => {
  return size > 1 ? "s" : "";
};

const logPluginOrPolyfill = (item, targetVersions, list) => {
  const minVersions = list[item] || {};
  const filteredList = Object.keys(targetVersions).reduce((result, env) => {
    const minVersion = minVersions[env];
    const targetVersion = targetVersions[env];

    if (!minVersion) {
      result[env] = (0, _utils.prettifyVersion)(targetVersion);
    } else {
      const minIsUnreleased = (0, _utils.isUnreleasedVersion)(minVersion, env);
      const targetIsUnreleased = (0, _utils.isUnreleasedVersion)(targetVersion, env);

      if (!targetIsUnreleased && (minIsUnreleased || _semver().default.lt(targetVersion.toString(), (0, _utils.semverify)(minVersion)))) {
        result[env] = (0, _utils.prettifyVersion)(targetVersion);
      }
    }

    return result;
  }, {});
  const formattedTargets = JSON.stringify(filteredList).replace(/,/g, ", ").replace(/^\{"/, '{ "').replace(/"\}$/, '" }');
  console.log(`  ${item} ${formattedTargets}`);
};

exports.logPluginOrPolyfill = logPluginOrPolyfill;

const logEntryPolyfills = (polyfillName, importPolyfillIncluded, polyfills, filename, polyfillTargets, allBuiltInsList) => {
  if (!importPolyfillIncluded) {
    console.log(`\n[${filename}] Import of ${polyfillName} was not found.`);
    return;
  }

  if (!polyfills.size) {
    console.log(`\n[${filename}] Based on your targets, polyfills were not added.`);
    return;
  }

  console.log(`\n[${filename}] Replaced ${polyfillName} entries with the following polyfill${wordEnds(polyfills.size)}:`);

  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};

exports.logEntryPolyfills = logEntryPolyfills;

const logUsagePolyfills = (polyfills, filename, polyfillTargets, allBuiltInsList) => {
  if (!polyfills.size) {
    console.log(`\n[${filename}] Based on your code and targets, core-js polyfills were not added.`);
    return;
  }

  console.log(`\n[${filename}] Added following core-js polyfill${wordEnds(polyfills.size)}:`);

  for (const polyfill of polyfills) {
    logPluginOrPolyfill(polyfill, polyfillTargets, allBuiltInsList);
  }
};

exports.logUsagePolyfills = logUsagePolyfills;
}, function(modId) { var map = {"./utils":1625038526896}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526896, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getType = getType;
exports.semverify = semverify;
exports.intersection = intersection;
exports.findSuggestion = findSuggestion;
exports.prettifyVersion = prettifyVersion;
exports.prettifyTargets = prettifyTargets;
exports.isUnreleasedVersion = isUnreleasedVersion;
exports.getLowestUnreleased = getLowestUnreleased;
exports.filterStageFromList = filterStageFromList;
exports.getImportSource = getImportSource;
exports.getRequireSource = getRequireSource;
exports.isPolyfillSource = isPolyfillSource;
exports.getModulePath = getModulePath;
exports.createImport = createImport;
exports.has = void 0;

function t() {
  const data = _interopRequireWildcard(require("@babel/types"));

  t = function () {
    return data;
  };

  return data;
}

function _invariant() {
  const data = _interopRequireDefault(require("invariant"));

  _invariant = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

function _jsLevenshtein() {
  const data = _interopRequireDefault(require("js-levenshtein"));

  _jsLevenshtein = function () {
    return data;
  };

  return data;
}

function _helperModuleImports() {
  const data = require("@babel/helper-module-imports");

  _helperModuleImports = function () {
    return data;
  };

  return data;
}

var _unreleasedLabels = _interopRequireDefault(require("../data/unreleased-labels"));

var _targetsParser = require("./targets-parser");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

const has = Object.hasOwnProperty.call.bind(Object.hasOwnProperty);
exports.has = has;

function getType(target) {
  return Object.prototype.toString.call(target).slice(8, -1).toLowerCase();
}

const versionRegExp = /^(\d+|\d+.\d+)$/;

function semverify(version) {
  if (typeof version === "string" && _semver().default.valid(version)) {
    return version;
  }

  (0, _invariant().default)(typeof version === "number" || typeof version === "string" && versionRegExp.test(version), `'${version}' is not a valid version`);
  const split = version.toString().split(".");

  while (split.length < 3) {
    split.push("0");
  }

  return split.join(".");
}

function intersection(first, second, third) {
  const result = new Set();

  for (const el of first) {
    if (second.has(el) && third.has(el)) result.add(el);
  }

  return result;
}

function findSuggestion(options, option) {
  let levenshteinValue = Infinity;
  return options.reduce((suggestion, validOption) => {
    const value = (0, _jsLevenshtein().default)(validOption, option);

    if (value < levenshteinValue) {
      levenshteinValue = value;
      return validOption;
    }

    return suggestion;
  }, undefined);
}

function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  const parts = [_semver().default.major(version)];

  const minor = _semver().default.minor(version);

  const patch = _semver().default.patch(version);

  if (minor || patch) {
    parts.push(minor);
  }

  if (patch) {
    parts.push(patch);
  }

  return parts.join(".");
}

function prettifyTargets(targets) {
  return Object.keys(targets).reduce((results, target) => {
    let value = targets[target];
    const unreleasedLabel = _unreleasedLabels.default[target];

    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
}

function isUnreleasedVersion(version, env) {
  const unreleasedLabel = _unreleasedLabels.default[env];
  return !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
}

function getLowestUnreleased(a, b, env) {
  const unreleasedLabel = _unreleasedLabels.default[env];
  const hasUnreleased = [a, b].some(item => item === unreleasedLabel);

  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }

  return (0, _targetsParser.semverMin)(a, b);
}

function filterStageFromList(list, stageList) {
  return Object.keys(list).reduce((result, item) => {
    if (!stageList[item]) {
      result[item] = list[item];
    }

    return result;
  }, {});
}

function getImportSource({
  node
}) {
  if (node.specifiers.length === 0) return node.source.value;
}

function getRequireSource({
  node
}) {
  if (!t().isExpressionStatement(node)) return;
  const {
    expression
  } = node;
  const isRequire = t().isCallExpression(expression) && t().isIdentifier(expression.callee) && expression.callee.name === "require" && expression.arguments.length === 1 && t().isStringLiteral(expression.arguments[0]);
  if (isRequire) return expression.arguments[0].value;
}

function isPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "core-js";
}

const modulePathMap = {
  "regenerator-runtime": "regenerator-runtime/runtime"
};

function getModulePath(mod) {
  return modulePathMap[mod] || `core-js/modules/${mod}`;
}

function createImport(path, mod) {
  return (0, _helperModuleImports().addSideEffect)(path, getModulePath(mod));
}
}, function(modId) { var map = {"../data/unreleased-labels":1625038526897,"./targets-parser":1625038526898}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526897, function(require, module, exports) {
module.exports = {
  safari: "tp",
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526898, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.semverMin = exports.isBrowsersQueryValid = void 0;

function _browserslist() {
  const data = _interopRequireDefault(require("browserslist"));

  _browserslist = function () {
    return data;
  };

  return data;
}

function _invariant() {
  const data = _interopRequireDefault(require("invariant"));

  _invariant = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

var _builtInModules = _interopRequireDefault(require("../data/built-in-modules.json"));

var _options = require("./options");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const browserslistDefaults = _browserslist().default.defaults;

const validBrowserslistTargets = [...Object.keys(_browserslist().default.data), ...Object.keys(_browserslist().default.aliases)];

const objectToBrowserslist = object => {
  return Object.keys(object).reduce((list, targetName) => {
    if (validBrowserslistTargets.indexOf(targetName) >= 0) {
      const targetVersion = object[targetName];
      return list.concat(`${targetName} ${targetVersion}`);
    }

    return list;
  }, []);
};

const validateTargetNames = targets => {
  const validTargets = Object.keys(_options.TargetNames);

  for (const target in targets) {
    if (!_options.TargetNames[target]) {
      throw new Error(`Invalid Option: '${target}' is not a valid target
        Maybe you meant to use '${(0, _utils.findSuggestion)(validTargets, target)}'?`);
    }
  }
};

const browserNameMap = {
  and_chr: "chrome",
  android: "android",
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ios_saf: "ios",
  node: "node",
  opera: "opera",
  safari: "safari",
  samsung: "samsung"
};

const isBrowsersQueryValid = browsers => typeof browsers === "string" || Array.isArray(browsers);

exports.isBrowsersQueryValid = isBrowsersQueryValid;

const validateBrowsers = browsers => {
  (0, _invariant().default)(typeof browsers === "undefined" || isBrowsersQueryValid(browsers), `Invalid Option: '${browsers}' is not a valid browserslist query`);
  return browsers;
};

const semverMin = (first, second) => {
  return first && _semver().default.lt(first, second) ? first : second;
};

exports.semverMin = semverMin;

const mergeBrowsers = (fromQuery, fromTarget) => {
  return Object.keys(fromTarget).reduce((queryObj, targKey) => {
    if (targKey !== _options.TargetNames.browsers) {
      queryObj[targKey] = fromTarget[targKey];
    }

    return queryObj;
  }, fromQuery);
};

const getLowestVersions = browsers => {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = browserNameMap[browserName];

    if (!normalizedBrowserName) {
      return all;
    }

    try {
      const splitVersion = browserVersion.split("-")[0].toLowerCase();
      const isSplitUnreleased = (0, _utils.isUnreleasedVersion)(splitVersion, browserName);

      if (!all[normalizedBrowserName]) {
        all[normalizedBrowserName] = isSplitUnreleased ? splitVersion : (0, _utils.semverify)(splitVersion);
        return all;
      }

      const version = all[normalizedBrowserName];
      const isUnreleased = (0, _utils.isUnreleasedVersion)(version, browserName);

      if (isUnreleased && isSplitUnreleased) {
        all[normalizedBrowserName] = (0, _utils.getLowestUnreleased)(version, splitVersion, browserName);
      } else if (isUnreleased) {
        all[normalizedBrowserName] = (0, _utils.semverify)(splitVersion);
      } else if (!isUnreleased && !isSplitUnreleased) {
        const parsedBrowserVersion = (0, _utils.semverify)(splitVersion);
        all[normalizedBrowserName] = semverMin(version, parsedBrowserVersion);
      }
    } catch (e) {}

    return all;
  }, {});
};

const outputDecimalWarning = decimalTargets => {
  if (!decimalTargets || !decimalTargets.length) {
    return;
  }

  console.log("Warning, the following targets are using a decimal version:");
  console.log("");
  decimalTargets.forEach(({
    target,
    value
  }) => console.log(`  ${target}: ${value}`));
  console.log("");
  console.log("We recommend using a string for minor/patch versions to avoid numbers like 6.10");
  console.log("getting parsed as 6.1, which can lead to unexpected behavior.");
  console.log("");
};

const semverifyTarget = (target, value) => {
  try {
    return (0, _utils.semverify)(value);
  } catch (error) {
    throw new Error(`Invalid Option: '${value}' is not a valid value for 'targets.${target}'.`);
  }
};

const targetParserMap = {
  __default: (target, value) => {
    const version = (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : semverifyTarget(target, value);
    return [target, version];
  },
  node: (target, value) => {
    const parsed = value === true || value === "current" ? process.versions.node : semverifyTarget(target, value);
    return [target, parsed];
  }
};

const getTargets = (targets = {}, options = {}) => {
  const targetOpts = {};
  validateTargetNames(targets);

  if (targets.esmodules) {
    const supportsESModules = _builtInModules.default["es6.module"];
    targets.browsers = Object.keys(supportsESModules).map(browser => `${browser} ${supportsESModules[browser]}`).join(", ");
  }

  const browsersquery = validateBrowsers(targets.browsers);
  const shouldParseBrowsers = !!targets.browsers;
  const shouldSearchForConfig = !options.ignoreBrowserslistConfig && !Object.keys(targets).length;

  if (shouldParseBrowsers || shouldSearchForConfig) {
    _browserslist().default.defaults = objectToBrowserslist(targets);
    const browsers = (0, _browserslist().default)(browsersquery, {
      path: options.configPath
    });
    const queryBrowsers = getLowestVersions(browsers);
    targets = mergeBrowsers(queryBrowsers, targets);
    _browserslist().default.defaults = browserslistDefaults;
  }

  const parsed = Object.keys(targets).filter(value => value !== _options.TargetNames.esmodules).sort().reduce((results, target) => {
    if (target !== _options.TargetNames.browsers) {
      const value = targets[target];

      if (typeof value === "number" && value % 1 !== 0) {
        results.decimalWarnings.push({
          target,
          value
        });
      }

      const parser = targetParserMap[target] || targetParserMap.__default;
      const [parsedTarget, parsedValue] = parser(target, value);

      if (parsedValue) {
        results.targets[parsedTarget] = parsedValue;
      }
    }

    return results;
  }, {
    targets: targetOpts,
    decimalWarnings: []
  });
  outputDecimalWarning(parsed.decimalWarnings);
  return parsed.targets;
};

var _default = getTargets;
exports.default = _default;
}, function(modId) { var map = {"./utils":1625038526896,"../data/built-in-modules.json":1625038526899,"./options":1625038526900}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526899, function(require, module, exports) {
module.exports = {
  "es6.module": {
    "edge": "16",
    "firefox": "60",
    "chrome": "61",
    "safari": "10.1",
    "opera": "48",
    "ios_saf": "10.3",
    "and_ff": "64"
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526900, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TargetNames = exports.UseBuiltInsOption = exports.ModulesOption = exports.TopLevelOptions = void 0;
const TopLevelOptions = {
  configPath: "configPath",
  corejs: "corejs",
  debug: "debug",
  exclude: "exclude",
  forceAllTransforms: "forceAllTransforms",
  ignoreBrowserslistConfig: "ignoreBrowserslistConfig",
  include: "include",
  loose: "loose",
  modules: "modules",
  shippedProposals: "shippedProposals",
  spec: "spec",
  targets: "targets",
  useBuiltIns: "useBuiltIns"
};
exports.TopLevelOptions = TopLevelOptions;
const ModulesOption = {
  false: false,
  auto: "auto",
  amd: "amd",
  commonjs: "commonjs",
  cjs: "cjs",
  systemjs: "systemjs",
  umd: "umd"
};
exports.ModulesOption = ModulesOption;
const UseBuiltInsOption = {
  false: false,
  entry: "entry",
  usage: "usage"
};
exports.UseBuiltInsOption = UseBuiltInsOption;
const TargetNames = {
  esmodules: "esmodules",
  node: "node",
  browsers: "browsers",
  chrome: "chrome",
  opera: "opera",
  edge: "edge",
  firefox: "firefox",
  safari: "safari",
  ie: "ie",
  ios: "ios",
  android: "android",
  electron: "electron",
  samsung: "samsung",
  uglify: "uglify"
};
exports.TargetNames = TargetNames;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526901, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
const defaultExcludesForLooseMode = ["transform-typeof-symbol"];

function _default({
  loose
}) {
  return loose ? defaultExcludesForLooseMode : null;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526902, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isPluginRequired = isPluginRequired;
exports.default = _default;

function _semver() {
  const data = _interopRequireDefault(require("semver"));

  _semver = function () {
    return data;
  };

  return data;
}

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isPluginRequired(supportedEnvironments, plugin) {
  const targetEnvironments = Object.keys(supportedEnvironments);

  if (targetEnvironments.length === 0) {
    return true;
  }

  const isRequiredForEnvironments = targetEnvironments.filter(environment => {
    if (!plugin[environment]) {
      return true;
    }

    const lowestImplementedVersion = plugin[environment];
    const lowestTargetedVersion = supportedEnvironments[environment];

    if ((0, _utils.isUnreleasedVersion)(lowestTargetedVersion, environment)) {
      return false;
    }

    if ((0, _utils.isUnreleasedVersion)(lowestImplementedVersion, environment)) {
      return true;
    }

    if (!_semver().default.valid(lowestTargetedVersion.toString())) {
      throw new Error(`Invalid version passed for target "${environment}": "${lowestTargetedVersion}". ` + "Versions must be in semver format (major.minor.patch)");
    }

    return _semver().default.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion.toString());
  });
  return isRequiredForEnvironments.length > 0;
}

function _default(list, includes, excludes, targets, defaultIncludes, defaultExcludes, pluginSyntaxMap) {
  const result = new Set();

  for (const item in list) {
    if (!excludes.has(item) && (isPluginRequired(targets, list[item]) || includes.has(item))) {
      result.add(item);
    } else if (pluginSyntaxMap) {
      const shippedProposalsSyntax = pluginSyntaxMap.get(item);

      if (shippedProposalsSyntax) {
        result.add(shippedProposalsSyntax);
      }
    }
  }

  if (defaultIncludes) {
    defaultIncludes.forEach(item => !excludes.has(item) && result.add(item));
  }

  if (defaultExcludes) {
    defaultExcludes.forEach(item => !includes.has(item) && result.delete(item));
  }

  return result;
}
}, function(modId) { var map = {"./utils":1625038526896}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526903, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  auto: "transform-modules-commonjs",
  amd: "transform-modules-amd",
  commonjs: "transform-modules-commonjs",
  cjs: "transform-modules-commonjs",
  systemjs: "transform-modules-systemjs",
  umd: "transform-modules-umd"
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526904, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeCoreJSOption = normalizeCoreJSOption;
exports.default = normalizeOptions;
exports.validateUseBuiltInsOption = exports.validateModulesOption = exports.validateIgnoreBrowserslistConfig = exports.validateBoolOption = exports.validateConfigPathOption = exports.checkDuplicateIncludeExcludes = exports.normalizePluginName = void 0;

function _data() {
  const data = _interopRequireDefault(require("core-js-compat/data"));

  _data = function () {
    return data;
  };

  return data;
}

function _invariant() {
  const data = _interopRequireDefault(require("invariant"));

  _invariant = function () {
    return data;
  };

  return data;
}

function _semver() {
  const data = require("semver");

  _semver = function () {
    return data;
  };

  return data;
}

var _corejs2BuiltIns = _interopRequireDefault(require("../data/corejs2-built-ins.json"));

var _plugins = _interopRequireDefault(require("../data/plugins.json"));

var _moduleTransformations = _interopRequireDefault(require("./module-transformations"));

var _options = require("./options");

var _getPlatformSpecificDefault = require("./polyfills/corejs2/get-platform-specific-default");

var _targetsParser = require("./targets-parser");

var _utils = require("./utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateTopLevelOptions = options => {
  const validOptions = Object.keys(_options.TopLevelOptions);

  for (const option in options) {
    if (!_options.TopLevelOptions[option]) {
      throw new Error(`Invalid Option: ${option} is not a valid top-level option.
        Maybe you meant to use '${(0, _utils.findSuggestion)(validOptions, option)}'?`);
    }
  }
};

const allPluginsList = [...Object.keys(_plugins.default), ...Object.keys(_moduleTransformations.default).map(m => _moduleTransformations.default[m])];
const validIncludesAndExcludesWithoutCoreJS = new Set(allPluginsList);
const validIncludesAndExcludesWithCoreJS2 = new Set([...allPluginsList, ...Object.keys(_corejs2BuiltIns.default), ..._getPlatformSpecificDefault.defaultWebIncludes]);
const validIncludesAndExcludesWithCoreJS3 = new Set([...allPluginsList, ...Object.keys(_data().default)]);

const pluginToRegExp = plugin => {
  if (plugin instanceof RegExp) return plugin;

  try {
    return new RegExp(`^${normalizePluginName(plugin)}$`);
  } catch (e) {
    return null;
  }
};

const selectPlugins = (regexp, corejs) => Array.from(corejs ? corejs == 2 ? validIncludesAndExcludesWithCoreJS2 : validIncludesAndExcludesWithCoreJS3 : validIncludesAndExcludesWithoutCoreJS).filter(item => regexp instanceof RegExp && regexp.test(item));

const flatten = array => [].concat(...array);

const expandIncludesAndExcludes = (plugins = [], type, corejs) => {
  if (plugins.length === 0) return [];
  const selectedPlugins = plugins.map(plugin => selectPlugins(pluginToRegExp(plugin), corejs));
  const invalidRegExpList = plugins.filter((p, i) => selectedPlugins[i].length === 0);
  (0, _invariant().default)(invalidRegExpList.length === 0, `Invalid Option: The plugins/built-ins '${invalidRegExpList.join(", ")}' passed to the '${type}' option are not
    valid. Please check data/[plugin-features|built-in-features].js in babel-preset-env`);
  return flatten(selectedPlugins);
};

const normalizePluginName = plugin => plugin.replace(/^(@babel\/|babel-)(plugin-)?/, "");

exports.normalizePluginName = normalizePluginName;

const checkDuplicateIncludeExcludes = (include = [], exclude = []) => {
  const duplicates = include.filter(opt => exclude.indexOf(opt) >= 0);
  (0, _invariant().default)(duplicates.length === 0, `Invalid Option: The plugins/built-ins '${duplicates.join(", ")}' were found in both the "include" and
    "exclude" options.`);
};

exports.checkDuplicateIncludeExcludes = checkDuplicateIncludeExcludes;

const normalizeTargets = targets => {
  if ((0, _targetsParser.isBrowsersQueryValid)(targets)) {
    return {
      browsers: targets
    };
  }

  return Object.assign({}, targets);
};

const validateConfigPathOption = (configPath = process.cwd()) => {
  (0, _invariant().default)(typeof configPath === "string", `Invalid Option: The configPath option '${configPath}' is invalid, only strings are allowed.`);
  return configPath;
};

exports.validateConfigPathOption = validateConfigPathOption;

const validateBoolOption = (name, value, defaultValue) => {
  if (typeof value === "undefined") {
    value = defaultValue;
  }

  if (typeof value !== "boolean") {
    throw new Error(`Preset env: '${name}' option must be a boolean.`);
  }

  return value;
};

exports.validateBoolOption = validateBoolOption;

const validateIgnoreBrowserslistConfig = ignoreBrowserslistConfig => validateBoolOption(_options.TopLevelOptions.ignoreBrowserslistConfig, ignoreBrowserslistConfig, false);

exports.validateIgnoreBrowserslistConfig = validateIgnoreBrowserslistConfig;

const validateModulesOption = (modulesOpt = _options.ModulesOption.auto) => {
  (0, _invariant().default)(_options.ModulesOption[modulesOpt.toString()] || _options.ModulesOption[modulesOpt.toString()] === _options.ModulesOption.false, `Invalid Option: The 'modules' option must be one of \n` + ` - 'false' to indicate no module processing\n` + ` - a specific module type: 'commonjs', 'amd', 'umd', 'systemjs'` + ` - 'auto' (default) which will automatically select 'false' if the current\n` + `   process is known to support ES module syntax, or "commonjs" otherwise\n`);
  return modulesOpt;
};

exports.validateModulesOption = validateModulesOption;

const validateUseBuiltInsOption = (builtInsOpt = false) => {
  (0, _invariant().default)(_options.UseBuiltInsOption[builtInsOpt.toString()] || _options.UseBuiltInsOption[builtInsOpt.toString()] === _options.UseBuiltInsOption.false, `Invalid Option: The 'useBuiltIns' option must be either
    'false' (default) to indicate no polyfill,
    '"entry"' to indicate replacing the entry polyfill, or
    '"usage"' to import only used polyfills per file`);
  return builtInsOpt;
};

exports.validateUseBuiltInsOption = validateUseBuiltInsOption;

function normalizeCoreJSOption(corejs, useBuiltIns) {
  let proposals = false;
  let rawVersion;

  if (useBuiltIns && corejs === undefined) {
    rawVersion = 2;
    console.log("\nWARNING: We noticed you're using the `useBuiltIns` option without declaring a " + "core-js version. Currently, we assume version 2.x when no version " + "is passed. Since this default version will likely change in future " + "versions of Babel, we recommend explicitly setting the core-js version " + "you are using via the `corejs` option.\n" + "\nYou should also be sure that the version you pass to the `corejs` " + "option matches the version specified in your `package.json`'s " + "`dependencies` section. If it doesn't, you need to run one of the " + "following commands:\n\n" + "  npm install --save core-js@2    npm install --save core-js@3\n" + "  yarn add core-js@2              yarn add core-js@3\n");
  } else if (typeof corejs === "object" && corejs !== null) {
    rawVersion = corejs.version;
    proposals = Boolean(corejs.proposals);
  } else {
    rawVersion = corejs;
  }

  const version = rawVersion ? (0, _semver().coerce)(String(rawVersion)) : false;

  if (!useBuiltIns && version) {
    console.log("\nThe `corejs` option only has an effect when the `useBuiltIns` option is not `false`\n");
  }

  if (useBuiltIns && (!version || version.major < 2 || version.major > 3)) {
    throw new RangeError("Invalid Option: The version passed to `corejs` is invalid. Currently, " + "only core-js@2 and core-js@3 are supported.");
  }

  return {
    version,
    proposals
  };
}

function normalizeOptions(opts) {
  validateTopLevelOptions(opts);
  const useBuiltIns = validateUseBuiltInsOption(opts.useBuiltIns);
  const corejs = normalizeCoreJSOption(opts.corejs, useBuiltIns);
  const include = expandIncludesAndExcludes(opts.include, _options.TopLevelOptions.include, !!corejs.version && corejs.version.major);
  const exclude = expandIncludesAndExcludes(opts.exclude, _options.TopLevelOptions.exclude, !!corejs.version && corejs.version.major);
  checkDuplicateIncludeExcludes(include, exclude);
  const shippedProposals = validateBoolOption(_options.TopLevelOptions.shippedProposals, opts.shippedProposals, false) || corejs.proposals;
  return {
    configPath: validateConfigPathOption(opts.configPath),
    corejs,
    debug: validateBoolOption(_options.TopLevelOptions.debug, opts.debug, false),
    include,
    exclude,
    forceAllTransforms: validateBoolOption(_options.TopLevelOptions.forceAllTransforms, opts.forceAllTransforms, false),
    ignoreBrowserslistConfig: validateIgnoreBrowserslistConfig(opts.ignoreBrowserslistConfig),
    loose: validateBoolOption(_options.TopLevelOptions.loose, opts.loose, false),
    modules: validateModulesOption(opts.modules),
    shippedProposals,
    spec: validateBoolOption(_options.TopLevelOptions.spec, opts.spec, false),
    targets: normalizeTargets(opts.targets),
    useBuiltIns: useBuiltIns
  };
}
}, function(modId) { var map = {"../data/corejs2-built-ins.json":1625038526905,"../data/plugins.json":1625038526906,"./module-transformations":1625038526903,"./options":1625038526900,"./polyfills/corejs2/get-platform-specific-default":1625038526907,"./targets-parser":1625038526898,"./utils":1625038526896}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526905, function(require, module, exports) {
module.exports = {
  "es6.array.copy-within": {
    "chrome": "45",
    "edge": "12",
    "firefox": "32",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "5",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.every": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.fill": {
    "chrome": "45",
    "edge": "12",
    "firefox": "31",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "samsung": "5",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.filter": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.find": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "samsung": "5",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.find-index": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "samsung": "5",
    "opera": "32",
    "electron": "0.35"
  },
  "es7.array.flat-map": {
    "chrome": "69",
    "firefox": "62",
    "safari": "12",
    "node": "11",
    "ios": "12",
    "opera": "56",
    "electron": "4"
  },
  "es6.array.for-each": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.from": {
    "chrome": "51",
    "edge": "15",
    "firefox": "36",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es7.array.includes": {
    "chrome": "47",
    "edge": "14",
    "firefox": "43",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "34",
    "electron": "0.36"
  },
  "es6.array.index-of": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.is-array": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "4",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.iterator": {
    "chrome": "38",
    "edge": "12",
    "firefox": "28",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.array.last-index-of": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.map": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.of": {
    "chrome": "45",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "5",
    "opera": "32",
    "electron": "0.35"
  },
  "es6.array.reduce": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "3",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.reduce-right": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "3",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.some": {
    "chrome": "5",
    "opera": "10.10",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.array.sort": {
    "chrome": "63",
    "opera": "50",
    "edge": "12",
    "firefox": "5",
    "safari": "12",
    "node": "10",
    "ie": "9",
    "ios": "12",
    "samsung": "8.2",
    "electron": "3.1"
  },
  "es6.array.species": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.date.now": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "2",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.date.to-iso-string": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "3.5",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.date.to-json": {
    "chrome": "5",
    "opera": "12.10",
    "edge": "12",
    "firefox": "4",
    "safari": "10",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "10",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.date.to-primitive": {
    "chrome": "47",
    "edge": "15",
    "firefox": "44",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "34",
    "electron": "0.36"
  },
  "es6.date.to-string": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "10",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.function.bind": {
    "chrome": "7",
    "opera": "12",
    "edge": "12",
    "firefox": "4",
    "safari": "5.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "5"
  },
  "es6.function.has-instance": {
    "chrome": "51",
    "edge": "15",
    "firefox": "50",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.function.name": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "14",
    "firefox": "2",
    "safari": "4",
    "node": "0.10",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.map": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.math.acosh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.asinh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.atanh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.cbrt": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.clz32": {
    "chrome": "38",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.cosh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.expm1": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.fround": {
    "chrome": "38",
    "edge": "12",
    "firefox": "26",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.hypot": {
    "chrome": "38",
    "edge": "12",
    "firefox": "27",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.imul": {
    "chrome": "30",
    "edge": "12",
    "firefox": "23",
    "safari": "7",
    "node": "0.12",
    "android": "4.4",
    "ios": "7",
    "samsung": "2.1",
    "opera": "17",
    "electron": "0.2"
  },
  "es6.math.log1p": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.log10": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.log2": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.sign": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.sinh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.tanh": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.math.trunc": {
    "chrome": "38",
    "edge": "12",
    "firefox": "25",
    "safari": "7.1",
    "node": "0.12",
    "ios": "8",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.number.constructor": {
    "chrome": "41",
    "edge": "12",
    "firefox": "36",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.number.epsilon": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.is-finite": {
    "chrome": "19",
    "edge": "12",
    "firefox": "16",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "samsung": "2.1",
    "electron": "0.2"
  },
  "es6.number.is-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "16",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.is-nan": {
    "chrome": "19",
    "edge": "12",
    "firefox": "15",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "samsung": "2.1",
    "electron": "0.2"
  },
  "es6.number.is-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "32",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.max-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.min-safe-integer": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.parse-float": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.number.parse-int": {
    "chrome": "34",
    "edge": "12",
    "firefox": "25",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es6.object.assign": {
    "chrome": "49",
    "edge": "13",
    "firefox": "36",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.object.create": {
    "chrome": "5",
    "opera": "12",
    "edge": "12",
    "firefox": "4",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es7.object.define-getter": {
    "chrome": "62",
    "edge": "16",
    "firefox": "48",
    "safari": "9",
    "node": "8.10",
    "ios": "9",
    "samsung": "8.2",
    "opera": "49",
    "electron": "3.1"
  },
  "es7.object.define-setter": {
    "chrome": "62",
    "edge": "16",
    "firefox": "48",
    "safari": "9",
    "node": "8.10",
    "ios": "9",
    "samsung": "8.2",
    "opera": "49",
    "electron": "3.1"
  },
  "es6.object.define-property": {
    "chrome": "5",
    "opera": "12",
    "edge": "12",
    "firefox": "4",
    "safari": "5.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.object.define-properties": {
    "chrome": "5",
    "opera": "12",
    "edge": "12",
    "firefox": "4",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es7.object.entries": {
    "chrome": "54",
    "edge": "14",
    "firefox": "47",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "samsung": "6.2",
    "opera": "41",
    "electron": "1.5"
  },
  "es6.object.freeze": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.get-own-property-descriptor": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es7.object.get-own-property-descriptors": {
    "chrome": "54",
    "edge": "15",
    "firefox": "50",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "samsung": "6.2",
    "opera": "41",
    "electron": "1.5"
  },
  "es6.object.get-own-property-names": {
    "chrome": "40",
    "edge": "12",
    "firefox": "33",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "27",
    "electron": "0.21"
  },
  "es6.object.get-prototype-of": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es7.object.lookup-getter": {
    "chrome": "62",
    "firefox": "36",
    "safari": "9",
    "node": "8.10",
    "ios": "9",
    "samsung": "8.2",
    "opera": "49",
    "electron": "3.1"
  },
  "es7.object.lookup-setter": {
    "chrome": "62",
    "firefox": "36",
    "safari": "9",
    "node": "8.10",
    "ios": "9",
    "samsung": "8.2",
    "opera": "49",
    "electron": "3.1"
  },
  "es6.object.prevent-extensions": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.to-string": {
    "chrome": "57",
    "edge": "15",
    "firefox": "51",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "samsung": "7.2",
    "opera": "44",
    "electron": "1.7"
  },
  "es6.object.is": {
    "chrome": "19",
    "edge": "12",
    "firefox": "22",
    "safari": "9",
    "node": "0.12",
    "android": "4.1",
    "ios": "9",
    "samsung": "2.1",
    "electron": "0.2"
  },
  "es6.object.is-frozen": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.is-sealed": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.is-extensible": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.keys": {
    "chrome": "40",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "27",
    "electron": "0.21"
  },
  "es6.object.seal": {
    "chrome": "44",
    "edge": "12",
    "firefox": "35",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "es6.object.set-prototype-of": {
    "chrome": "34",
    "edge": "12",
    "firefox": "31",
    "safari": "9",
    "node": "0.12",
    "ie": "11",
    "ios": "9",
    "samsung": "2.1",
    "opera": "21",
    "electron": "0.2"
  },
  "es7.object.values": {
    "chrome": "54",
    "edge": "14",
    "firefox": "47",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "samsung": "6.2",
    "opera": "41",
    "electron": "1.5"
  },
  "es6.promise": {
    "chrome": "51",
    "edge": "14",
    "firefox": "45",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es7.promise.finally": {
    "chrome": "63",
    "edge": "18",
    "firefox": "58",
    "safari": "11.1",
    "node": "10",
    "ios": "11.3",
    "samsung": "8.2",
    "opera": "50",
    "electron": "3.1"
  },
  "es6.reflect.apply": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.construct": {
    "chrome": "49",
    "edge": "13",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.define-property": {
    "chrome": "49",
    "edge": "13",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.delete-property": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get-own-property-descriptor": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.get-prototype-of": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.has": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.is-extensible": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.own-keys": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.prevent-extensions": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.set": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.reflect.set-prototype-of": {
    "chrome": "49",
    "edge": "12",
    "firefox": "42",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.regexp.constructor": {
    "chrome": "50",
    "firefox": "40",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.flags": {
    "chrome": "49",
    "firefox": "37",
    "safari": "9",
    "node": "6",
    "ios": "9",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "es6.regexp.match": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.replace": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.split": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.search": {
    "chrome": "50",
    "firefox": "49",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.regexp.to-string": {
    "chrome": "50",
    "firefox": "39",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "es6.set": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.symbol": {
    "chrome": "51",
    "firefox": "51",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es7.symbol.async-iterator": {
    "chrome": "63",
    "firefox": "57",
    "safari": "12",
    "node": "10",
    "ios": "12",
    "samsung": "8.2",
    "opera": "50",
    "electron": "3.1"
  },
  "es6.string.anchor": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.big": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.blink": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.bold": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.code-point-at": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.ends-with": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.fixed": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.fontcolor": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.fontsize": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.from-code-point": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.includes": {
    "chrome": "41",
    "edge": "12",
    "firefox": "40",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.italics": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.iterator": {
    "chrome": "38",
    "edge": "12",
    "firefox": "36",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "es6.string.link": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es7.string.pad-start": {
    "chrome": "57",
    "edge": "15",
    "firefox": "48",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "samsung": "7.2",
    "opera": "44",
    "electron": "1.7"
  },
  "es7.string.pad-end": {
    "chrome": "57",
    "edge": "15",
    "firefox": "48",
    "safari": "10",
    "node": "8",
    "ios": "10",
    "samsung": "7.2",
    "opera": "44",
    "electron": "1.7"
  },
  "es6.string.raw": {
    "chrome": "41",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.repeat": {
    "chrome": "41",
    "edge": "12",
    "firefox": "24",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.small": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.starts-with": {
    "chrome": "41",
    "edge": "12",
    "firefox": "29",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "es6.string.strike": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.sub": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.sup": {
    "chrome": "5",
    "edge": "12",
    "firefox": "17",
    "safari": "6",
    "node": "0.10",
    "android": "4",
    "ios": "7",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.string.trim": {
    "chrome": "5",
    "opera": "10.50",
    "edge": "12",
    "firefox": "3.5",
    "safari": "4",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es7.string.trim-left": {
    "chrome": "66",
    "firefox": "61",
    "safari": "12",
    "node": "10",
    "ios": "12",
    "opera": "53",
    "electron": "3.1"
  },
  "es7.string.trim-right": {
    "chrome": "66",
    "firefox": "61",
    "safari": "12",
    "node": "10",
    "ios": "12",
    "opera": "53",
    "electron": "3.1"
  },
  "es6.typed.array-buffer": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.data-view": {
    "chrome": "5",
    "opera": "12",
    "edge": "12",
    "firefox": "15",
    "safari": "5.1",
    "node": "0.10",
    "ie": "10",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "1.1"
  },
  "es6.typed.int8-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint8-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint8-clamped-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.int16-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint16-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.int32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.uint32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.float32-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.typed.float64-array": {
    "chrome": "51",
    "edge": "13",
    "firefox": "48",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.weak-map": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "9",
    "node": "6.5",
    "ios": "9",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "es6.weak-set": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "9",
    "node": "6.5",
    "ios": "9",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526906, function(require, module, exports) {
module.exports = {
  "transform-template-literals": {
    "chrome": "41",
    "edge": "13",
    "firefox": "34",
    "node": "4",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "transform-literals": {
    "chrome": "44",
    "edge": "12",
    "firefox": "53",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "transform-function-name": {
    "chrome": "51",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-arrow-functions": {
    "chrome": "47",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "34",
    "electron": "0.36"
  },
  "transform-block-scoped-functions": {
    "chrome": "41",
    "edge": "12",
    "firefox": "46",
    "safari": "10",
    "node": "4",
    "ie": "11",
    "ios": "10",
    "samsung": "3.4",
    "opera": "28",
    "electron": "0.24"
  },
  "transform-classes": {
    "chrome": "46",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "samsung": "5",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-object-super": {
    "chrome": "46",
    "edge": "13",
    "firefox": "45",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "samsung": "5",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-shorthand-properties": {
    "chrome": "43",
    "edge": "12",
    "firefox": "33",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "4",
    "opera": "30",
    "electron": "0.29"
  },
  "transform-duplicate-keys": {
    "chrome": "42",
    "edge": "12",
    "firefox": "34",
    "safari": "9",
    "node": "4",
    "ios": "9",
    "samsung": "3.4",
    "opera": "29",
    "electron": "0.27"
  },
  "transform-computed-properties": {
    "chrome": "44",
    "edge": "12",
    "firefox": "34",
    "safari": "7.1",
    "node": "4",
    "ios": "8",
    "samsung": "4",
    "opera": "31",
    "electron": "0.31"
  },
  "transform-for-of": {
    "chrome": "51",
    "edge": "15",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-sticky-regex": {
    "chrome": "49",
    "edge": "13",
    "firefox": "3",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "transform-dotall-regex": {
    "chrome": "62",
    "safari": "11.1",
    "node": "8.10",
    "ios": "11.3",
    "samsung": "8.2",
    "opera": "49",
    "electron": "3.1"
  },
  "transform-unicode-regex": {
    "chrome": "50",
    "edge": "13",
    "firefox": "46",
    "safari": "12",
    "node": "6",
    "ios": "12",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "transform-spread": {
    "chrome": "46",
    "edge": "13",
    "firefox": "36",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "samsung": "5",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-parameters": {
    "chrome": "49",
    "edge": "18",
    "firefox": "53",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "transform-destructuring": {
    "chrome": "51",
    "edge": "18",
    "firefox": "53",
    "safari": "10",
    "node": "6.5",
    "ios": "10",
    "samsung": "5",
    "opera": "38",
    "electron": "1.2"
  },
  "transform-block-scoping": {
    "chrome": "49",
    "edge": "14",
    "firefox": "51",
    "safari": "10.1",
    "node": "6",
    "ios": "10.3",
    "samsung": "5",
    "opera": "36",
    "electron": "1"
  },
  "transform-typeof-symbol": {
    "chrome": "38",
    "edge": "12",
    "firefox": "36",
    "safari": "9",
    "node": "0.12",
    "ios": "9",
    "samsung": "3",
    "opera": "25",
    "electron": "0.2"
  },
  "transform-new-target": {
    "chrome": "46",
    "edge": "14",
    "firefox": "41",
    "safari": "10",
    "node": "5",
    "ios": "10",
    "samsung": "5",
    "opera": "33",
    "electron": "0.36"
  },
  "transform-regenerator": {
    "chrome": "50",
    "edge": "13",
    "firefox": "53",
    "safari": "10",
    "node": "6",
    "ios": "10",
    "samsung": "5",
    "opera": "37",
    "electron": "1.1"
  },
  "transform-exponentiation-operator": {
    "chrome": "52",
    "edge": "14",
    "firefox": "52",
    "safari": "10.1",
    "node": "7",
    "ios": "10.3",
    "samsung": "6.2",
    "opera": "39",
    "electron": "1.3"
  },
  "transform-async-to-generator": {
    "chrome": "55",
    "edge": "15",
    "firefox": "52",
    "safari": "11",
    "node": "7.6",
    "ios": "11",
    "samsung": "6.2",
    "opera": "42",
    "electron": "1.6"
  },
  "proposal-async-generator-functions": {
    "chrome": "63",
    "firefox": "57",
    "safari": "12",
    "node": "10",
    "ios": "12",
    "samsung": "8.2",
    "opera": "50",
    "electron": "3.1"
  },
  "proposal-object-rest-spread": {
    "chrome": "60",
    "firefox": "55",
    "safari": "11.1",
    "node": "8.3",
    "ios": "11.3",
    "samsung": "8.2",
    "opera": "47",
    "electron": "2.1"
  },
  "proposal-unicode-property-regex": {
    "chrome": "64",
    "safari": "11.1",
    "node": "10",
    "ios": "11.3",
    "opera": "51",
    "electron": "3.1"
  },
  "proposal-json-strings": {
    "chrome": "66",
    "firefox": "62",
    "safari": "12",
    "node": "10",
    "ios": "12",
    "opera": "53",
    "electron": "3.1"
  },
  "proposal-optional-catch-binding": {
    "chrome": "66",
    "firefox": "58",
    "safari": "11.1",
    "node": "10",
    "ios": "11.3",
    "opera": "53",
    "electron": "3.1"
  },
  "transform-named-capturing-groups-regex": {
    "chrome": "64",
    "safari": "11.1",
    "node": "10",
    "ios": "11.3",
    "opera": "51",
    "electron": "3.1"
  },
  "transform-member-expression-literals": {
    "chrome": "7",
    "opera": "12",
    "edge": "12",
    "firefox": "2",
    "safari": "5.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "5"
  },
  "transform-property-literals": {
    "chrome": "7",
    "opera": "12",
    "edge": "12",
    "firefox": "2",
    "safari": "5.1",
    "node": "0.10",
    "ie": "9",
    "android": "4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "5"
  },
  "transform-reserved-words": {
    "chrome": "13",
    "opera": "10.50",
    "edge": "12",
    "firefox": "2",
    "safari": "3.1",
    "node": "0.10",
    "ie": "9",
    "android": "4.4",
    "ios": "6",
    "phantom": "2",
    "samsung": "2.1",
    "electron": "0.2"
  }
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526907, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;
exports.defaultWebIncludes = void 0;
const defaultWebIncludes = ["web.timers", "web.immediate", "web.dom.iterable"];
exports.defaultWebIncludes = defaultWebIncludes;

function _default(targets) {
  const targetNames = Object.keys(targets);
  const isAnyTarget = !targetNames.length;
  const isWebTarget = targetNames.some(name => name !== "node");
  return isAnyTarget || isWebTarget ? defaultWebIncludes : null;
}
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526908, function(require, module, exports) {
// These mappings represent the syntax proposals that have been
// shipped by browsers, and are enabled by the `shippedProposals` option.

const proposalPlugins = {};

const pluginSyntaxMap = new Map([
  ["proposal-async-generator-functions", "syntax-async-generators"],
  ["proposal-object-rest-spread", "syntax-object-rest-spread"],
  ["proposal-optional-catch-binding", "syntax-optional-catch-binding"],
  ["proposal-unicode-property-regex", null],
  ["proposal-json-strings", "syntax-json-strings"],
]);

module.exports = { proposalPlugins, pluginSyntaxMap };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526909, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _corejs2BuiltIns = _interopRequireDefault(require("../../../data/corejs2-built-ins.json"));

var _getPlatformSpecificDefault = _interopRequireDefault(require("./get-platform-specific-default"));

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _builtInDefinitions = require("./built-in-definitions");

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_DIRECT_POLYFILL_IMPORT = `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the \`import '@babel/polyfill'\` call or use \`useBuiltIns: 'entry'\` instead.`;

function _default({
  types: t
}, {
  include,
  exclude,
  polyfillTargets,
  debug
}) {
  const polyfills = (0, _filterItems.default)(_corejs2BuiltIns.default, include, exclude, polyfillTargets, (0, _getPlatformSpecificDefault.default)(polyfillTargets));
  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if ((0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path))) {
        console.warn(NO_DIRECT_POLYFILL_IMPORT);
        path.remove();
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if ((0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath))) {
          console.warn(NO_DIRECT_POLYFILL_IMPORT);
          bodyPath.remove();
        }
      });
    },

    ReferencedIdentifier({
      node: {
        name
      },
      parent,
      scope
    }) {
      if (t.isMemberExpression(parent)) return;
      if (!(0, _utils.has)(_builtInDefinitions.BuiltIns, name)) return;
      if (scope.getBindingIdentifier(name)) return;
      const BuiltInDependencies = _builtInDefinitions.BuiltIns[name];
      this.addUnsupported(BuiltInDependencies);
    },

    CallExpression(path) {
      if (path.node.arguments.length) return;
      const callee = path.node.callee;
      if (!t.isMemberExpression(callee)) return;
      if (!callee.computed) return;

      if (!path.get("callee.property").matchesPattern("Symbol.iterator")) {
        return;
      }

      this.addImport("web.dom.iterable");
    },

    BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      if (!path.get("left").matchesPattern("Symbol.iterator")) return;
      this.addImport("web.dom.iterable");
    },

    YieldExpression(path) {
      if (path.node.delegate) {
        this.addImport("web.dom.iterable");
      }
    },

    MemberExpression: {
      enter(path) {
        const {
          node
        } = path;
        const {
          object,
          property
        } = node;
        let evaluatedPropType = object.name;
        let propertyName = property.name;
        let instanceType = "";

        if (node.computed) {
          if (t.isStringLiteral(property)) {
            propertyName = property.value;
          } else {
            const result = path.get("property").evaluate();

            if (result.confident && result.value) {
              propertyName = result.value;
            }
          }
        }

        if (path.scope.getBindingIdentifier(object.name)) {
          const result = path.get("object").evaluate();

          if (result.value) {
            instanceType = (0, _utils.getType)(result.value);
          } else if (result.deopt && result.deopt.isIdentifier()) {
            evaluatedPropType = result.deopt.node.name;
          }
        }

        if ((0, _utils.has)(_builtInDefinitions.StaticProperties, evaluatedPropType)) {
          const BuiltInProperties = _builtInDefinitions.StaticProperties[evaluatedPropType];

          if ((0, _utils.has)(BuiltInProperties, propertyName)) {
            const StaticPropertyDependencies = BuiltInProperties[propertyName];
            this.addUnsupported(StaticPropertyDependencies);
          }
        }

        if ((0, _utils.has)(_builtInDefinitions.InstanceProperties, propertyName)) {
          let InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[propertyName];

          if (instanceType) {
            InstancePropertyDependencies = InstancePropertyDependencies.filter(module => module.includes(instanceType));
          }

          this.addUnsupported(InstancePropertyDependencies);
        }
      },

      exit(path) {
        const {
          name
        } = path.node.object;
        if (!(0, _utils.has)(_builtInDefinitions.BuiltIns, name)) return;
        if (path.scope.getBindingIdentifier(name)) return;
        const BuiltInDependencies = _builtInDefinitions.BuiltIns[name];
        this.addUnsupported(BuiltInDependencies);
      }

    },

    VariableDeclarator(path) {
      const {
        node
      } = path;
      const {
        id,
        init
      } = node;
      if (!t.isObjectPattern(id)) return;
      if (init && path.scope.getBindingIdentifier(init.name)) return;

      for (const _ref of id.properties) {
        const {
          key
        } = _ref;

        if (!node.computed && t.isIdentifier(key) && (0, _utils.has)(_builtInDefinitions.InstanceProperties, key.name)) {
          const InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[key.name];
          this.addUnsupported(InstancePropertyDependencies);
        }
      }
    }

  };
  return {
    name: "corejs2-usage",

    pre({
      path
    }) {
      this.polyfillsSet = new Set();

      this.addImport = function (builtIn) {
        if (!this.polyfillsSet.has(builtIn)) {
          this.polyfillsSet.add(builtIn);
          (0, _utils.createImport)(path, builtIn);
        }
      };

      this.addUnsupported = function (builtIn) {
        const modules = Array.isArray(builtIn) ? builtIn : [builtIn];

        for (const module of modules) {
          if (polyfills.has(module)) {
            this.addImport(module);
          }
        }
      };
    },

    post() {
      if (debug) {
        (0, _debug.logUsagePolyfills)(this.polyfillsSet, this.file.opts.filename, polyfillTargets, _corejs2BuiltIns.default);
      }
    },

    visitor: addAndRemovePolyfillImports
  };
}
}, function(modId) { var map = {"../../../data/corejs2-built-ins.json":1625038526905,"./get-platform-specific-default":1625038526907,"../../filter-items":1625038526902,"./built-in-definitions":1625038526910,"../../utils":1625038526896,"../../debug":1625038526895}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526910, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = void 0;
const ArrayNatureIterators = ["es6.object.to-string", "es6.array.iterator", "web.dom.iterable"];
const CommonIterators = ["es6.string.iterator", ...ArrayNatureIterators];
const PromiseDependencies = ["es6.object.to-string", "es6.promise"];
const BuiltIns = {
  DataView: "es6.typed.data-view",
  Float32Array: "es6.typed.float32-array",
  Float64Array: "es6.typed.float64-array",
  Int8Array: "es6.typed.int8-array",
  Int16Array: "es6.typed.int16-array",
  Int32Array: "es6.typed.int32-array",
  Map: ["es6.map", ...CommonIterators],
  Number: "es6.number.constructor",
  Promise: PromiseDependencies,
  RegExp: ["es6.regexp.constructor"],
  Set: ["es6.set", ...CommonIterators],
  Symbol: ["es6.symbol", "es7.symbol.async-iterator"],
  Uint8Array: "es6.typed.uint8-array",
  Uint8ClampedArray: "es6.typed.uint8-clamped-array",
  Uint16Array: "es6.typed.uint16-array",
  Uint32Array: "es6.typed.uint32-array",
  WeakMap: ["es6.weak-map", ...CommonIterators],
  WeakSet: ["es6.weak-set", ...CommonIterators]
};
exports.BuiltIns = BuiltIns;
const InstanceProperties = {
  __defineGetter__: ["es7.object.define-getter"],
  __defineSetter__: ["es7.object.define-setter"],
  __lookupGetter__: ["es7.object.lookup-getter"],
  __lookupSetter__: ["es7.object.lookup-setter"],
  anchor: ["es6.string.anchor"],
  big: ["es6.string.big"],
  bind: ["es6.function.bind"],
  blink: ["es6.string.blink"],
  bold: ["es6.string.bold"],
  codePointAt: ["es6.string.code-point-at"],
  copyWithin: ["es6.array.copy-within"],
  endsWith: ["es6.string.ends-with"],
  entries: ArrayNatureIterators,
  every: ["es6.array.is-array"],
  fill: ["es6.array.fill"],
  filter: ["es6.array.filter"],
  finally: ["es7.promise.finally", ...PromiseDependencies],
  find: ["es6.array.find"],
  findIndex: ["es6.array.find-index"],
  fixed: ["es6.string.fixed"],
  flags: ["es6.regexp.flags"],
  flatMap: ["es7.array.flat-map"],
  fontcolor: ["es6.string.fontcolor"],
  fontsize: ["es6.string.fontsize"],
  forEach: ["es6.array.for-each"],
  includes: ["es6.string.includes", "es7.array.includes"],
  indexOf: ["es6.array.index-of"],
  italics: ["es6.string.italics"],
  keys: ArrayNatureIterators,
  lastIndexOf: ["es6.array.last-index-of"],
  link: ["es6.string.link"],
  map: ["es6.array.map"],
  match: ["es6.regexp.match"],
  name: ["es6.function.name"],
  padStart: ["es7.string.pad-start"],
  padEnd: ["es7.string.pad-end"],
  reduce: ["es6.array.reduce"],
  reduceRight: ["es6.array.reduce-right"],
  repeat: ["es6.string.repeat"],
  replace: ["es6.regexp.replace"],
  search: ["es6.regexp.search"],
  slice: ["es6.array.slice"],
  small: ["es6.string.small"],
  some: ["es6.array.some"],
  sort: ["es6.array.sort"],
  split: ["es6.regexp.split"],
  startsWith: ["es6.string.starts-with"],
  strike: ["es6.string.strike"],
  sub: ["es6.string.sub"],
  sup: ["es6.string.sup"],
  toISOString: ["es6.date.to-iso-string"],
  toJSON: ["es6.date.to-json"],
  toString: ["es6.object.to-string", "es6.date.to-string", "es6.regexp.to-string"],
  trim: ["es6.string.trim"],
  trimEnd: ["es7.string.trim-right"],
  trimLeft: ["es7.string.trim-left"],
  trimRight: ["es7.string.trim-right"],
  trimStart: ["es7.string.trim-left"],
  values: ArrayNatureIterators
};
exports.InstanceProperties = InstanceProperties;
const StaticProperties = {
  Array: {
    from: ["es6.array.from", "es6.string.iterator"],
    isArray: "es6.array.is-array",
    of: "es6.array.of"
  },
  Date: {
    now: "es6.date.now"
  },
  Object: {
    assign: "es6.object.assign",
    create: "es6.object.create",
    defineProperty: "es6.object.define-property",
    defineProperties: "es6.object.define-properties",
    entries: "es7.object.entries",
    freeze: "es6.object.freeze",
    getOwnPropertyDescriptors: "es7.object.get-own-property-descriptors",
    getOwnPropertySymbols: "es6.symbol",
    is: "es6.object.is",
    isExtensible: "es6.object.is-extensible",
    isFrozen: "es6.object.is-frozen",
    isSealed: "es6.object.is-sealed",
    keys: "es6.object.keys",
    preventExtensions: "es6.object.prevent-extensions",
    seal: "es6.object.seal",
    setPrototypeOf: "es6.object.set-prototype-of",
    values: "es7.object.values"
  },
  Math: {
    acosh: "es6.math.acosh",
    asinh: "es6.math.asinh",
    atanh: "es6.math.atanh",
    cbrt: "es6.math.cbrt",
    clz32: "es6.math.clz32",
    cosh: "es6.math.cosh",
    expm1: "es6.math.expm1",
    fround: "es6.math.fround",
    hypot: "es6.math.hypot",
    imul: "es6.math.imul",
    log1p: "es6.math.log1p",
    log10: "es6.math.log10",
    log2: "es6.math.log2",
    sign: "es6.math.sign",
    sinh: "es6.math.sinh",
    tanh: "es6.math.tanh",
    trunc: "es6.math.trunc"
  },
  String: {
    fromCodePoint: "es6.string.from-code-point",
    raw: "es6.string.raw"
  },
  Number: {
    EPSILON: "es6.number.epsilon",
    MIN_SAFE_INTEGER: "es6.number.min-safe-integer",
    MAX_SAFE_INTEGER: "es6.number.max-safe-integer",
    isFinite: "es6.number.is-finite",
    isInteger: "es6.number.is-integer",
    isSafeInteger: "es6.number.is-safe-integer",
    isNaN: "es6.number.is-nan",
    parseFloat: "es6.number.parse-float",
    parseInt: "es6.number.parse-int"
  },
  Promise: {
    all: CommonIterators,
    race: CommonIterators
  },
  Reflect: {
    apply: "es6.reflect.apply",
    construct: "es6.reflect.construct",
    defineProperty: "es6.reflect.define-property",
    deleteProperty: "es6.reflect.delete-property",
    get: "es6.reflect.get",
    getOwnPropertyDescriptor: "es6.reflect.get-own-property-descriptor",
    getPrototypeOf: "es6.reflect.get-prototype-of",
    has: "es6.reflect.has",
    isExtensible: "es6.reflect.is-extensible",
    ownKeys: "es6.reflect.own-keys",
    preventExtensions: "es6.reflect.prevent-extensions",
    set: "es6.reflect.set",
    setPrototypeOf: "es6.reflect.set-prototype-of"
  }
};
exports.StaticProperties = StaticProperties;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526911, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _data() {
  const data = _interopRequireDefault(require("core-js-compat/data"));

  _data = function () {
    return data;
  };

  return data;
}

var _shippedProposals = _interopRequireDefault(require("./shipped-proposals"));

function _getModulesListForTargetVersion() {
  const data = _interopRequireDefault(require("core-js-compat/get-modules-list-for-target-version"));

  _getModulesListForTargetVersion = function () {
    return data;
  };

  return data;
}

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _builtInDefinitions = require("./built-in-definitions");

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NO_DIRECT_POLYFILL_IMPORT = `
  When setting \`useBuiltIns: 'usage'\`, polyfills are automatically imported when needed.
  Please remove the direct import of \`core-js\` or use \`useBuiltIns: 'entry'\` instead.`;
const corejs3PolyfillsWithoutProposals = Object.keys(_data().default).filter(name => !name.startsWith("esnext.")).reduce((memo, key) => {
  memo[key] = _data().default[key];
  return memo;
}, {});

const corejs3PolyfillsWithShippedProposals = _shippedProposals.default.reduce((memo, key) => {
  memo[key] = _data().default[key];
  return memo;
}, Object.assign({}, corejs3PolyfillsWithoutProposals));

function _default(_, {
  corejs,
  include,
  exclude,
  polyfillTargets,
  proposals,
  shippedProposals,
  debug
}) {
  const polyfills = (0, _filterItems.default)(proposals ? _data().default : shippedProposals ? corejs3PolyfillsWithShippedProposals : corejs3PolyfillsWithoutProposals, include, exclude, polyfillTargets, null);
  const available = new Set((0, _getModulesListForTargetVersion().default)(corejs.version));

  function resolveKey(path, computed) {
    const {
      node,
      parent,
      scope
    } = path;
    if (path.isStringLiteral()) return node.value;
    const {
      name
    } = node;
    const isIdentifier = path.isIdentifier();
    if (isIdentifier && !(computed || parent.computed)) return name;

    if (!isIdentifier || scope.getBindingIdentifier(name)) {
      const {
        value
      } = path.evaluate();
      if (typeof value === "string") return value;
    }
  }

  function resolveSource(path) {
    const {
      node,
      scope
    } = path;
    let builtIn, instanceType;

    if (node) {
      builtIn = node.name;

      if (!path.isIdentifier() || scope.getBindingIdentifier(builtIn)) {
        const {
          deopt,
          value
        } = path.evaluate();

        if (value !== undefined) {
          instanceType = (0, _utils.getType)(value);
        } else if (deopt && deopt.isIdentifier()) {
          builtIn = deopt.node.name;
        }
      }
    }

    return {
      builtIn,
      instanceType
    };
  }

  const addAndRemovePolyfillImports = {
    ImportDeclaration(path) {
      if ((0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path))) {
        console.warn(NO_DIRECT_POLYFILL_IMPORT);
        path.remove();
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if ((0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath))) {
          console.warn(NO_DIRECT_POLYFILL_IMPORT);
          bodyPath.remove();
        }
      });
    },

    Import() {
      this.addUnsupported(_builtInDefinitions.PromiseDependencies);
    },

    Function({
      node
    }) {
      if (node.async) {
        this.addUnsupported(_builtInDefinitions.PromiseDependencies);
      }
    },

    "ForOfStatement|ArrayPattern"() {
      this.addUnsupported(_builtInDefinitions.CommonIterators);
    },

    SpreadElement({
      parentPath
    }) {
      if (!parentPath.isObjectExpression()) {
        this.addUnsupported(_builtInDefinitions.CommonIterators);
      }
    },

    YieldExpression({
      node
    }) {
      if (node.delegate) {
        this.addUnsupported(_builtInDefinitions.CommonIterators);
      }
    },

    ReferencedIdentifier({
      node: {
        name
      },
      scope
    }) {
      if (scope.getBindingIdentifier(name)) return;
      this.addBuiltInDependencies(name);
    },

    MemberExpression(path) {
      const source = resolveSource(path.get("object"));
      const key = resolveKey(path.get("property"));
      this.addPropertyDependencies(source, key);
    },

    ObjectPattern(path) {
      const {
        parentPath,
        parent,
        key
      } = path;
      let source;

      if (parentPath.isVariableDeclarator()) {
        source = resolveSource(parentPath.get("init"));
      } else if (parentPath.isAssignmentExpression()) {
        source = resolveSource(parentPath.get("right"));
      } else if (parentPath.isFunctionExpression()) {
        const grand = parentPath.parentPath;

        if (grand.isCallExpression() || grand.isNewExpression()) {
          if (grand.node.callee === parent) {
            source = resolveSource(grand.get("arguments")[key]);
          }
        }
      }

      for (const property of path.get("properties")) {
        if (property.isObjectProperty()) {
          const key = resolveKey(property.get("key"));
          this.addPropertyDependencies(source, key);
        }
      }
    },

    BinaryExpression(path) {
      if (path.node.operator !== "in") return;
      const source = resolveSource(path.get("right"));
      const key = resolveKey(path.get("left"), true);
      this.addPropertyDependencies(source, key);
    }

  };
  return {
    name: "corejs3-usage",

    pre() {
      this.polyfillsSet = new Set();

      this.addUnsupported = function (builtIn) {
        const modules = Array.isArray(builtIn) ? builtIn : [builtIn];

        for (const module of modules) {
          this.polyfillsSet.add(module);
        }
      };

      this.addBuiltInDependencies = function (builtIn) {
        if ((0, _utils.has)(_builtInDefinitions.BuiltIns, builtIn)) {
          const BuiltInDependencies = _builtInDefinitions.BuiltIns[builtIn];
          this.addUnsupported(BuiltInDependencies);
        }
      };

      this.addPropertyDependencies = function (source = {}, key) {
        const {
          builtIn,
          instanceType
        } = source;

        if (_builtInDefinitions.PossibleGlobalObjects.has(builtIn)) {
          this.addBuiltInDependencies(key);
        } else if ((0, _utils.has)(_builtInDefinitions.StaticProperties, builtIn)) {
          const BuiltInProperties = _builtInDefinitions.StaticProperties[builtIn];

          if ((0, _utils.has)(BuiltInProperties, key)) {
            const StaticPropertyDependencies = BuiltInProperties[key];
            return this.addUnsupported(StaticPropertyDependencies);
          }
        }

        if (!(0, _utils.has)(_builtInDefinitions.InstanceProperties, key)) return;
        let InstancePropertyDependencies = _builtInDefinitions.InstanceProperties[key];

        if (instanceType) {
          InstancePropertyDependencies = InstancePropertyDependencies.filter(m => m.includes(instanceType) || _builtInDefinitions.CommonInstanceDependencies.has(m));
        }

        this.addUnsupported(InstancePropertyDependencies);
      };
    },

    post({
      path
    }) {
      const filtered = (0, _utils.intersection)(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        (0, _utils.createImport)(path, module);
      }

      if (debug) {
        (0, _debug.logUsagePolyfills)(filtered, this.file.opts.filename, polyfillTargets, _data().default);
      }
    },

    visitor: addAndRemovePolyfillImports
  };
}
}, function(modId) { var map = {"./shipped-proposals":1625038526912,"../../filter-items":1625038526902,"./built-in-definitions":1625038526913,"../../utils":1625038526896,"../../debug":1625038526895}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526912, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = ["esnext.global-this", "esnext.string.match-all"];
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526913, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PossibleGlobalObjects = exports.CommonInstanceDependencies = exports.StaticProperties = exports.InstanceProperties = exports.BuiltIns = exports.PromiseDependencies = exports.CommonIterators = void 0;
const ArrayNatureIterators = ["es.array.iterator", "web.dom-collections.iterator"];
const CommonIterators = ["es.string.iterator", ...ArrayNatureIterators];
exports.CommonIterators = CommonIterators;
const ArrayNatureIteratorsWithTag = ["es.object.to-string", ...ArrayNatureIterators];
const CommonIteratorsWithTag = ["es.object.to-string", ...CommonIterators];
const TypedArrayDependencies = ["es.typed-array.copy-within", "es.typed-array.every", "es.typed-array.fill", "es.typed-array.filter", "es.typed-array.find", "es.typed-array.find-index", "es.typed-array.for-each", "es.typed-array.includes", "es.typed-array.index-of", "es.typed-array.iterator", "es.typed-array.join", "es.typed-array.last-index-of", "es.typed-array.map", "es.typed-array.reduce", "es.typed-array.reduce-right", "es.typed-array.reverse", "es.typed-array.set", "es.typed-array.slice", "es.typed-array.some", "es.typed-array.sort", "es.typed-array.subarray", "es.typed-array.to-locale-string", "es.typed-array.to-string", "es.object.to-string", "es.array.iterator", "es.array-buffer.slice"];
const TypedArrayStaticMethods = {
  from: "es.typed-array.from",
  of: "es.typed-array.of"
};
const PromiseDependencies = ["es.promise", "es.object.to-string"];
exports.PromiseDependencies = PromiseDependencies;
const PromiseDependenciesWithIterators = [...PromiseDependencies, ...CommonIterators];
const SymbolDependencies = ["es.symbol", "es.symbol.description", "es.object.to-string"];
const MapDependencies = ["es.map", "esnext.map.delete-all", "esnext.map.every", "esnext.map.filter", "esnext.map.find", "esnext.map.find-key", "esnext.map.includes", "esnext.map.key-of", "esnext.map.map-keys", "esnext.map.map-values", "esnext.map.merge", "esnext.map.reduce", "esnext.map.some", "esnext.map.update", ...CommonIteratorsWithTag];
const SetDependencies = ["es.set", "esnext.set.add-all", "esnext.set.delete-all", "esnext.set.difference", "esnext.set.every", "esnext.set.filter", "esnext.set.find", "esnext.set.intersection", "esnext.set.is-disjoint-from", "esnext.set.is-subset-of", "esnext.set.is-superset-of", "esnext.set.join", "esnext.set.map", "esnext.set.reduce", "esnext.set.some", "esnext.set.symmetric-difference", "esnext.set.union", ...CommonIteratorsWithTag];
const WeakMapDependencies = ["es.weak-map", "esnext.weak-map.delete-all", ...CommonIteratorsWithTag];
const WeakSetDependencies = ["es.weak-set", "esnext.weak-set.add-all", "esnext.weak-set.delete-all", ...CommonIteratorsWithTag];
const URLSearchParamsDependencies = ["web.url", ...CommonIteratorsWithTag];
const BuiltIns = {
  AggregateError: ["esnext.aggregate-error", ...CommonIterators],
  ArrayBuffer: ["es.array-buffer.constructor", "es.array-buffer.slice", "es.object.to-string"],
  DataView: ["es.data-view", "es.array-buffer.slice", "es.object.to-string"],
  Date: ["es.date.to-string"],
  Float32Array: ["es.typed-array.float32-array", ...TypedArrayDependencies],
  Float64Array: ["es.typed-array.float64-array", ...TypedArrayDependencies],
  Int8Array: ["es.typed-array.int8-array", ...TypedArrayDependencies],
  Int16Array: ["es.typed-array.int16-array", ...TypedArrayDependencies],
  Int32Array: ["es.typed-array.int32-array", ...TypedArrayDependencies],
  Uint8Array: ["es.typed-array.uint8-array", ...TypedArrayDependencies],
  Uint8ClampedArray: ["es.typed-array.uint8-clamped-array", ...TypedArrayDependencies],
  Uint16Array: ["es.typed-array.uint16-array", ...TypedArrayDependencies],
  Uint32Array: ["es.typed-array.uint32-array", ...TypedArrayDependencies],
  Map: MapDependencies,
  Number: ["es.number.constructor"],
  Observable: ["esnext.observable", "esnext.symbol.observable", "es.object.to-string", ...CommonIteratorsWithTag],
  Promise: PromiseDependencies,
  RegExp: ["es.regexp.constructor", "es.regexp.exec", "es.regexp.to-string"],
  Set: SetDependencies,
  Symbol: SymbolDependencies,
  URL: ["web.url", ...URLSearchParamsDependencies],
  URLSearchParams: URLSearchParamsDependencies,
  WeakMap: WeakMapDependencies,
  WeakSet: WeakSetDependencies,
  clearImmediate: ["web.immediate"],
  compositeKey: ["esnext.composite-key"],
  compositeSymbol: ["esnext.composite-symbol", ...SymbolDependencies],
  fetch: PromiseDependencies,
  globalThis: ["esnext.global-this"],
  parseFloat: ["es.parse-float"],
  parseInt: ["es.parse-int"],
  queueMicrotask: ["web.queue-microtask"],
  setTimeout: ["web.timers"],
  setInterval: ["web.timers"],
  setImmediate: ["web.immediate"]
};
exports.BuiltIns = BuiltIns;
const InstanceProperties = {
  at: ["esnext.string.at"],
  anchor: ["es.string.anchor"],
  big: ["es.string.big"],
  bind: ["es.function.bind"],
  blink: ["es.string.blink"],
  bold: ["es.string.bold"],
  codePointAt: ["es.string.code-point-at"],
  codePoints: ["esnext.string.code-points"],
  concat: ["es.array.concat"],
  copyWithin: ["es.array.copy-within"],
  description: ["es.symbol", "es.symbol.description"],
  endsWith: ["es.string.ends-with"],
  entries: ArrayNatureIteratorsWithTag,
  every: ["es.array.every"],
  exec: ["es.regexp.exec"],
  fill: ["es.array.fill"],
  filter: ["es.array.filter"],
  finally: ["es.promise.finally", ...PromiseDependencies],
  find: ["es.array.find"],
  findIndex: ["es.array.find-index"],
  fixed: ["es.string.fixed"],
  flags: ["es.regexp.flags"],
  flat: ["es.array.flat", "es.array.unscopables.flat"],
  flatMap: ["es.array.flat-map", "es.array.unscopables.flat-map"],
  fontcolor: ["es.string.fontcolor"],
  fontsize: ["es.string.fontsize"],
  forEach: ["es.array.for-each", "web.dom-collections.for-each"],
  includes: ["es.array.includes", "es.string.includes"],
  indexOf: ["es.array.index-of"],
  italic: ["es.string.italics"],
  join: ["es.array.join"],
  keys: ArrayNatureIteratorsWithTag,
  lastIndex: ["esnext.array.last-index"],
  lastIndexOf: ["es.array.last-index-of"],
  lastItem: ["esnext.array.last-item"],
  link: ["es.string.link"],
  match: ["es.string.match", "es.regexp.exec"],
  matchAll: ["esnext.string.match-all"],
  map: ["es.array.map"],
  name: ["es.function.name"],
  padEnd: ["es.string.pad-end"],
  padStart: ["es.string.pad-start"],
  reduce: ["es.array.reduce"],
  reduceRight: ["es.array.reduce-right"],
  repeat: ["es.string.repeat"],
  replace: ["es.string.replace", "es.regexp.exec"],
  replaceAll: ["esnext.string.replace-all"],
  reverse: ["es.string.reverse"],
  search: ["es.string.search", "es.regexp.exec"],
  slice: ["es.array.slice"],
  small: ["es.string.small"],
  some: ["es.array.some"],
  sort: ["es.array.sort"],
  splice: ["es.array.splice"],
  split: ["es.string.split", "es.regexp.exec"],
  startsWith: ["es.string.starts-with"],
  strike: ["es.string.strike"],
  sub: ["es.string.sub"],
  sup: ["es.string.sup"],
  toFixed: ["es.number.to-fixed"],
  toISOString: ["es.date.to-iso-string"],
  toJSON: ["es.date.to-json", "web.url.to-json"],
  toPrecision: ["es.number.to-precision"],
  toString: ["es.object.to-string", "es.regexp.to-string", "es.date.to-string"],
  trim: ["es.string.trim"],
  trimEnd: ["es.string.trim-end"],
  trimLeft: ["es.string.trim-start"],
  trimRight: ["es.string.trim-end"],
  trimStart: ["es.string.trim-start"],
  values: ArrayNatureIteratorsWithTag,
  __defineGetter__: ["es.object.define-getter"],
  __defineSetter__: ["es.object.define-setter"],
  __lookupGetter__: ["es.object.lookup-getter"],
  __lookupSetter__: ["es.object.lookup-setter"]
};
exports.InstanceProperties = InstanceProperties;
const StaticProperties = {
  Array: {
    from: ["es.array.from", "es.string.iterator"],
    isArray: ["es.array.is-array"],
    of: ["es.array.of"]
  },
  Date: {
    now: "es.date.now"
  },
  Object: {
    assign: "es.object.assign",
    create: "es.object.create",
    defineProperty: "es.object.define-property",
    defineProperties: "es.object.define-properties",
    entries: "es.object.entries",
    freeze: "es.object.freeze",
    fromEntries: ["es.object.from-entries", "es.array.iterator"],
    getOwnPropertyDescriptor: "es.object.get-own-property-descriptor",
    getOwnPropertyDescriptors: "es.object.get-own-property-descriptors",
    getOwnPropertyNames: "es.object.get-own-property-names",
    getOwnPropertySymbols: "es.symbol",
    getPrototypeOf: "es.object.get-prototype-of",
    is: "es.object.is",
    isExtensible: "es.object.is-extensible",
    isFrozen: "es.object.is-frozen",
    isSealed: "es.object.is-sealed",
    keys: "es.object.keys",
    preventExtensions: "es.object.prevent-extensions",
    seal: "es.object.seal",
    setPrototypeOf: "es.object.set-prototype-of",
    values: "es.object.values"
  },
  Math: {
    DEG_PER_RAD: "esnext.math.deg-per-rad",
    RAD_PER_DEG: "esnext.math.rad-per-deg",
    acosh: "es.math.acosh",
    asinh: "es.math.asinh",
    atanh: "es.math.atanh",
    cbrt: "es.math.cbrt",
    clamp: "esnext.math.clamp",
    clz32: "es.math.clz32",
    cosh: "es.math.cosh",
    degrees: "esnext.math.degrees",
    expm1: "es.math.expm1",
    fround: "es.math.fround",
    fscale: "esnext.math.fscale",
    hypot: "es.math.hypot",
    iaddh: "esnext.math.iaddh",
    imul: "es.math.imul",
    imulh: "esnext.math.imulh",
    isubh: "esnext.math.isubh",
    log1p: "es.math.log1p",
    log10: "es.math.log10",
    log2: "es.math.log2",
    radians: "esnext.math.radians",
    scale: "esnext.math.scale",
    seededPRNG: "esnext.math.seeded-prng",
    sign: "es.math.sign",
    signbit: "esnext.math.signbit",
    sinh: "es.math.sinh",
    tanh: "es.math.tanh",
    trunc: "es.math.trunc",
    umulh: "esnext.math.umulh"
  },
  String: {
    fromCodePoint: "es.string.from-code-point",
    raw: "es.string.raw"
  },
  Number: {
    EPSILON: "es.number.epsilon",
    MIN_SAFE_INTEGER: "es.number.min-safe-integer",
    MAX_SAFE_INTEGER: "es.number.max-safe-integer",
    fromString: "esnext.number.from-string",
    isFinite: "es.number.is-finite",
    isInteger: "es.number.is-integer",
    isSafeInteger: "es.number.is-safe-integer",
    isNaN: "es.number.is-nan",
    parseFloat: "es.number.parse-float",
    parseInt: "es.number.parse-int"
  },
  Map: {
    from: ["esnext.map.from", ...MapDependencies],
    groupBy: ["esnext.map.group-by", ...MapDependencies],
    keyBy: ["esnext.map.key-by", ...MapDependencies],
    of: ["esnext.map.of", ...MapDependencies]
  },
  Set: {
    from: ["esnext.set.from", ...SetDependencies],
    of: ["esnext.set.of", ...SetDependencies]
  },
  WeakMap: {
    from: ["esnext.weak-map.from", ...WeakMapDependencies],
    of: ["esnext.weak-map.of", ...WeakMapDependencies]
  },
  WeakSet: {
    from: ["esnext.weak-set.from", ...WeakSetDependencies],
    of: ["esnext.weak-set.of", ...WeakSetDependencies]
  },
  Promise: {
    all: PromiseDependenciesWithIterators,
    allSettled: ["esnext.promise.all-settled", ...PromiseDependenciesWithIterators],
    any: ["esnext.promise.any", ...PromiseDependenciesWithIterators],
    race: PromiseDependenciesWithIterators,
    try: ["esnext.promise.try", ...PromiseDependenciesWithIterators]
  },
  Reflect: {
    apply: "es.reflect.apply",
    construct: "es.reflect.construct",
    defineMetadata: "esnext.reflect.define-metadata",
    defineProperty: "es.reflect.define-property",
    deleteMetadata: "esnext.reflect.delete-metadata",
    deleteProperty: "es.reflect.delete-property",
    get: "es.reflect.get",
    getMetadata: "esnext.reflect.get-metadata",
    getMetadataKeys: "esnext.reflect.get-metadata-keys",
    getOwnMetadata: "esnext.reflect.get-own-metadata",
    getOwnMetadataKeys: "esnext.reflect.get-own-metadata-keys",
    getOwnPropertyDescriptor: "es.reflect.get-own-property-descriptor",
    getPrototypeOf: "es.reflect.get-prototype-of",
    has: "es.reflect.has",
    hasMetadata: "esnext.reflect.has-metadata",
    hasOwnMetadata: "esnext.reflect.has-own-metadata",
    isExtensible: "es.reflect.is-extensible",
    metadata: "esnext.reflect.metadata",
    ownKeys: "es.reflect.own-keys",
    preventExtensions: "es.reflect.prevent-extensions",
    set: "es.reflect.set",
    setPrototypeOf: "es.reflect.set-prototype-of"
  },
  Symbol: {
    asyncIterator: ["es.symbol.async-iterator"],
    dispose: ["esnext.symbol.dispose"],
    hasInstance: ["es.symbol.has-instance", "es.function.has-instance"],
    isConcatSpreadable: ["es.symbol.is-concat-spreadable", "es.array.concat"],
    iterator: ["es.symbol.iterator", ...CommonIteratorsWithTag],
    match: ["es.symbol.match", "es.string.match"],
    observable: ["esnext.symbol.observable"],
    patternMatch: ["esnext.symbol.pattern-match"],
    replace: ["es.symbol.replace", "es.string.replace"],
    search: ["es.symbol.search", "es.string.search"],
    species: ["es.symbol.species", "es.array.species"],
    split: ["es.symbol.split", "es.string.split"],
    toPrimitive: ["es.symbol.to-primitive", "es.date.to-primitive"],
    toStringTag: ["es.symbol.to-string-tag", "es.object.to-string", "es.math.to-string-tag", "es.json.to-string-tag"],
    unscopables: ["es.symbol.unscopables"]
  },
  ArrayBuffer: {
    isView: ["es.array-buffer.is-view"]
  },
  Int8Array: TypedArrayStaticMethods,
  Uint8Array: TypedArrayStaticMethods,
  Uint8ClampedArray: TypedArrayStaticMethods,
  Int16Array: TypedArrayStaticMethods,
  Uint16Array: TypedArrayStaticMethods,
  Int32Array: TypedArrayStaticMethods,
  Uint32Array: TypedArrayStaticMethods,
  Float32Array: TypedArrayStaticMethods,
  Float64Array: TypedArrayStaticMethods
};
exports.StaticProperties = StaticProperties;
const CommonInstanceDependencies = new Set(["es.object.to-string", "es.object.define-getter", "es.object.define-setter", "es.object.lookup-getter", "es.object.lookup-setter", "es.regexp.exec"]);
exports.CommonInstanceDependencies = CommonInstanceDependencies;
const PossibleGlobalObjects = new Set(["global", "globalThis", "self", "window"]);
exports.PossibleGlobalObjects = PossibleGlobalObjects;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526914, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("../../utils");

function _default() {
  return {
    name: "regenerator-usage",

    pre() {
      this.usesRegenerator = false;
    },

    visitor: {
      Function(path) {
        const {
          node
        } = path;

        if (!this.usesRegenerator && (node.generator || node.async)) {
          this.usesRegenerator = true;
          (0, _utils.createImport)(path, "regenerator-runtime");
        }
      }

    },

    post() {
      if (this.opts.debug && this.usesRegenerator) {
        console.log(`\n[${this.file.opts.filename}] Based on your code and targets, added regenerator-runtime.`);
      }
    }

  };
}
}, function(modId) { var map = {"../../utils":1625038526896}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526915, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _corejs2BuiltIns = _interopRequireDefault(require("../../../data/corejs2-built-ins.json"));

var _getPlatformSpecificDefault = _interopRequireDefault(require("./get-platform-specific-default"));

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _default(_, {
  include,
  exclude,
  polyfillTargets,
  regenerator,
  debug
}) {
  const polyfills = (0, _filterItems.default)(_corejs2BuiltIns.default, include, exclude, polyfillTargets, (0, _getPlatformSpecificDefault.default)(polyfillTargets));
  const isPolyfillImport = {
    ImportDeclaration(path) {
      if ((0, _utils.isPolyfillSource)((0, _utils.getImportSource)(path))) {
        this.replaceBySeparateModulesImport(path);
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if ((0, _utils.isPolyfillSource)((0, _utils.getRequireSource)(bodyPath))) {
          this.replaceBySeparateModulesImport(bodyPath);
        }
      });
    }

  };
  return {
    name: "corejs2-entry",
    visitor: isPolyfillImport,

    pre() {
      this.importPolyfillIncluded = false;

      this.replaceBySeparateModulesImport = function (path) {
        this.importPolyfillIncluded = true;

        if (regenerator) {
          (0, _utils.createImport)(path, "regenerator-runtime");
        }

        const modules = Array.from(polyfills).reverse();

        for (const module of modules) {
          (0, _utils.createImport)(path, module);
        }

        path.remove();
      };
    },

    post() {
      if (debug) {
        (0, _debug.logEntryPolyfills)("@babel/polyfill", this.importPolyfillIncluded, polyfills, this.file.opts.filename, polyfillTargets, _corejs2BuiltIns.default);
      }
    }

  };
}
}, function(modId) { var map = {"../../../data/corejs2-built-ins.json":1625038526905,"./get-platform-specific-default":1625038526907,"../../filter-items":1625038526902,"../../utils":1625038526896,"../../debug":1625038526895}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526916, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

function _data() {
  const data = _interopRequireDefault(require("core-js-compat/data"));

  _data = function () {
    return data;
  };

  return data;
}

function _entries() {
  const data = _interopRequireDefault(require("core-js-compat/entries"));

  _entries = function () {
    return data;
  };

  return data;
}

function _getModulesListForTargetVersion() {
  const data = _interopRequireDefault(require("core-js-compat/get-modules-list-for-target-version"));

  _getModulesListForTargetVersion = function () {
    return data;
  };

  return data;
}

var _filterItems = _interopRequireDefault(require("../../filter-items"));

var _utils = require("../../utils");

var _debug = require("../../debug");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isBabelPolyfillSource(source) {
  return source === "@babel/polyfill" || source === "babel-polyfill";
}

function isCoreJSSource(source) {
  if (typeof source === "string") {
    source = source.replace(/\\/g, "/").replace(/(\/(index)?)?(\.js)?$/i, "").toLowerCase();
  }

  return (0, _utils.has)(_entries().default, source) && _entries().default[source];
}

const BABEL_POLYFILL_DEPRECATION = `
  \`@babel/polyfill\` is deprecated. Please, use required parts of \`core-js\`
  and \`regenerator-runtime/runtime\` separately`;

function _default(_, {
  corejs,
  include,
  exclude,
  polyfillTargets,
  debug
}) {
  const polyfills = (0, _filterItems.default)(_data().default, include, exclude, polyfillTargets, null);
  const available = new Set((0, _getModulesListForTargetVersion().default)(corejs.version));
  const isPolyfillImport = {
    ImportDeclaration(path) {
      const source = (0, _utils.getImportSource)(path);
      if (!source) return;

      if (isBabelPolyfillSource(source)) {
        console.warn(BABEL_POLYFILL_DEPRECATION);
      } else {
        const modules = isCoreJSSource(source);

        if (modules) {
          this.replaceBySeparateModulesImport(path, modules);
        }
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        const source = (0, _utils.getRequireSource)(bodyPath);
        if (!source) return;

        if (isBabelPolyfillSource(source)) {
          console.warn(BABEL_POLYFILL_DEPRECATION);
        } else {
          const modules = isCoreJSSource(source);

          if (modules) {
            this.replaceBySeparateModulesImport(bodyPath, modules);
          }
        }
      });
    }

  };
  return {
    name: "corejs3-entry",
    visitor: isPolyfillImport,

    pre() {
      this.polyfillsSet = new Set();

      this.replaceBySeparateModulesImport = function (path, modules) {
        for (const module of modules) {
          this.polyfillsSet.add(module);
        }

        path.remove();
      };
    },

    post({
      path
    }) {
      const filtered = (0, _utils.intersection)(polyfills, this.polyfillsSet, available);
      const reversed = Array.from(filtered).reverse();

      for (const module of reversed) {
        (0, _utils.createImport)(path, module);
      }

      if (debug) {
        (0, _debug.logEntryPolyfills)("core-js", this.polyfillsSet.size > 0, filtered, this.file.opts.filename, polyfillTargets, _data().default);
      }
    }

  };
}
}, function(modId) { var map = {"../../filter-items":1625038526902,"../../utils":1625038526896,"../../debug":1625038526895}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526917, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = _default;

var _utils = require("../../utils");

function isRegeneratorSource(source) {
  return source === "regenerator-runtime/runtime";
}

function _default() {
  const visitor = {
    ImportDeclaration(path) {
      if (isRegeneratorSource((0, _utils.getImportSource)(path))) {
        this.regeneratorImportExcluded = true;
        path.remove();
      }
    },

    Program(path) {
      path.get("body").forEach(bodyPath => {
        if (isRegeneratorSource((0, _utils.getRequireSource)(bodyPath))) {
          this.regeneratorImportExcluded = true;
          bodyPath.remove();
        }
      });
    }

  };
  return {
    name: "regenerator-entry",
    visitor,

    pre() {
      this.regeneratorImportExcluded = false;
    },

    post() {
      if (this.opts.debug && this.regeneratorImportExcluded) {
        console.log(`\n[${this.file.opts.filename}] Based on your targets, regenerator-runtime import excluded.`);
      }
    }

  };
}
}, function(modId) { var map = {"../../utils":1625038526896}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526918, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  "syntax-async-generators": require("@babel/plugin-syntax-async-generators"),
  "syntax-json-strings": require("@babel/plugin-syntax-json-strings"),
  "syntax-object-rest-spread": require("@babel/plugin-syntax-object-rest-spread"),
  "syntax-optional-catch-binding": require("@babel/plugin-syntax-optional-catch-binding"),
  "transform-async-to-generator": require("@babel/plugin-transform-async-to-generator"),
  "proposal-async-generator-functions": require("@babel/plugin-proposal-async-generator-functions"),
  "proposal-json-strings": require("@babel/plugin-proposal-json-strings"),
  "transform-arrow-functions": require("@babel/plugin-transform-arrow-functions"),
  "transform-block-scoped-functions": require("@babel/plugin-transform-block-scoped-functions"),
  "transform-block-scoping": require("@babel/plugin-transform-block-scoping"),
  "transform-classes": require("@babel/plugin-transform-classes"),
  "transform-computed-properties": require("@babel/plugin-transform-computed-properties"),
  "transform-destructuring": require("@babel/plugin-transform-destructuring"),
  "transform-dotall-regex": require("@babel/plugin-transform-dotall-regex"),
  "transform-duplicate-keys": require("@babel/plugin-transform-duplicate-keys"),
  "transform-for-of": require("@babel/plugin-transform-for-of"),
  "transform-function-name": require("@babel/plugin-transform-function-name"),
  "transform-literals": require("@babel/plugin-transform-literals"),
  "transform-member-expression-literals": require("@babel/plugin-transform-member-expression-literals"),
  "transform-modules-amd": require("@babel/plugin-transform-modules-amd"),
  "transform-modules-commonjs": require("@babel/plugin-transform-modules-commonjs"),
  "transform-modules-systemjs": require("@babel/plugin-transform-modules-systemjs"),
  "transform-modules-umd": require("@babel/plugin-transform-modules-umd"),
  "transform-named-capturing-groups-regex": require("@babel/plugin-transform-named-capturing-groups-regex"),
  "transform-object-super": require("@babel/plugin-transform-object-super"),
  "transform-parameters": require("@babel/plugin-transform-parameters"),
  "transform-property-literals": require("@babel/plugin-transform-property-literals"),
  "transform-reserved-words": require("@babel/plugin-transform-reserved-words"),
  "transform-shorthand-properties": require("@babel/plugin-transform-shorthand-properties"),
  "transform-spread": require("@babel/plugin-transform-spread"),
  "transform-sticky-regex": require("@babel/plugin-transform-sticky-regex"),
  "transform-template-literals": require("@babel/plugin-transform-template-literals"),
  "transform-typeof-symbol": require("@babel/plugin-transform-typeof-symbol"),
  "transform-unicode-regex": require("@babel/plugin-transform-unicode-regex"),
  "transform-exponentiation-operator": require("@babel/plugin-transform-exponentiation-operator"),
  "transform-new-target": require("@babel/plugin-transform-new-target"),
  "proposal-object-rest-spread": require("@babel/plugin-proposal-object-rest-spread"),
  "proposal-optional-catch-binding": require("@babel/plugin-proposal-optional-catch-binding"),
  "transform-regenerator": require("@babel/plugin-transform-regenerator"),
  "proposal-unicode-property-regex": require("@babel/plugin-proposal-unicode-property-regex")
};
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526894);
})()
//# sourceMappingURL=index.js.map