module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526756, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBrowsersQueryValid = isBrowsersQueryValid;
exports.default = getTargets;
Object.defineProperty(exports, "unreleasedLabels", {
  enumerable: true,
  get: function () {
    return _targets.unreleasedLabels;
  }
});
Object.defineProperty(exports, "TargetNames", {
  enumerable: true,
  get: function () {
    return _options.TargetNames;
  }
});
Object.defineProperty(exports, "prettifyTargets", {
  enumerable: true,
  get: function () {
    return _pretty.prettifyTargets;
  }
});
Object.defineProperty(exports, "getInclusionReasons", {
  enumerable: true,
  get: function () {
    return _debug.getInclusionReasons;
  }
});
Object.defineProperty(exports, "filterItems", {
  enumerable: true,
  get: function () {
    return _filterItems.default;
  }
});
Object.defineProperty(exports, "isRequired", {
  enumerable: true,
  get: function () {
    return _filterItems.isRequired;
  }
});

var _browserslist = require("browserslist");

var _helperValidatorOption = require("@babel/helper-validator-option");

var _nativeModules = require("@babel/compat-data/native-modules");

var _utils = require("./utils");

var _targets = require("./targets");

var _options = require("./options");

var _pretty = require("./pretty");

var _debug = require("./debug");

var _filterItems = require("./filter-items");

const ESM_SUPPORT = _nativeModules["es6.module"];
const v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");

function validateTargetNames(targets) {
  const validTargets = Object.keys(_options.TargetNames);

  for (const target of Object.keys(targets)) {
    if (!(target in _options.TargetNames)) {
      throw new Error(v.formatMessage(`'${target}' is not a valid target
- Did you mean '${(0, _helperValidatorOption.findSuggestion)(target, validTargets)}'?`));
    }
  }

  return targets;
}

function isBrowsersQueryValid(browsers) {
  return typeof browsers === "string" || Array.isArray(browsers) && browsers.every(b => typeof b === "string");
}

function validateBrowsers(browsers) {
  v.invariant(browsers === undefined || isBrowsersQueryValid(browsers), `'${String(browsers)}' is not a valid browserslist query`);
  return browsers;
}

function getLowestVersions(browsers) {
  return browsers.reduce((all, browser) => {
    const [browserName, browserVersion] = browser.split(" ");
    const normalizedBrowserName = _targets.browserNameMap[browserName];

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
        all[normalizedBrowserName] = (0, _utils.semverMin)(version, parsedBrowserVersion);
      }
    } catch (e) {}

    return all;
  }, {});
}

function outputDecimalWarning(decimalTargets) {
  if (!decimalTargets.length) {
    return;
  }

  console.warn("Warning, the following targets are using a decimal version:\n");
  decimalTargets.forEach(({
    target,
    value
  }) => console.warn(`  ${target}: ${value}`));
  console.warn(`
We recommend using a string for minor/patch versions to avoid numbers like 6.10
getting parsed as 6.1, which can lead to unexpected behavior.
`);
}

function semverifyTarget(target, value) {
  try {
    return (0, _utils.semverify)(value);
  } catch (error) {
    throw new Error(v.formatMessage(`'${value}' is not a valid value for 'targets.${target}'.`));
  }
}

const targetParserMap = {
  __default(target, value) {
    const version = (0, _utils.isUnreleasedVersion)(value, target) ? value.toLowerCase() : semverifyTarget(target, value);
    return [target, version];
  },

  node(target, value) {
    const parsed = value === true || value === "current" ? process.versions.node : semverifyTarget(target, value);
    return [target, parsed];
  }

};

function generateTargets(inputTargets) {
  const input = Object.assign({}, inputTargets);
  delete input.esmodules;
  delete input.browsers;
  return input;
}

function resolveTargets(queries) {
  const resolved = _browserslist(queries, {
    mobileToDesktop: true
  });

  return getLowestVersions(resolved);
}

function getTargets(inputTargets = {}, options = {}) {
  var _browsers;

  let {
    browsers,
    esmodules
  } = inputTargets;
  const {
    configPath = "."
  } = options;
  validateBrowsers(browsers);
  const input = generateTargets(inputTargets);
  let targets = validateTargetNames(input);
  const shouldParseBrowsers = !!browsers;
  const hasTargets = shouldParseBrowsers || Object.keys(targets).length > 0;
  const shouldSearchForConfig = !options.ignoreBrowserslistConfig && !hasTargets;

  if (!browsers && shouldSearchForConfig) {
    browsers = _browserslist.loadConfig({
      config: options.configFile,
      path: configPath,
      env: options.browserslistEnv
    });

    if (browsers == null) {
      {
        browsers = [];
      }
    }
  }

  if (esmodules && (esmodules !== "intersect" || !((_browsers = browsers) != null && _browsers.length))) {
    browsers = Object.keys(ESM_SUPPORT).map(browser => `${browser} >= ${ESM_SUPPORT[browser]}`).join(", ");
    esmodules = false;
  }

  if (browsers) {
    const queryBrowsers = resolveTargets(browsers);

    if (esmodules === "intersect") {
      for (const browser of Object.keys(queryBrowsers)) {
        const version = queryBrowsers[browser];

        if (ESM_SUPPORT[browser]) {
          queryBrowsers[browser] = (0, _utils.getHighestUnreleased)(version, (0, _utils.semverify)(ESM_SUPPORT[browser]), browser);
        } else {
          delete queryBrowsers[browser];
        }
      }
    }

    targets = Object.assign(queryBrowsers, targets);
  }

  const result = {};
  const decimalWarnings = [];

  for (const target of Object.keys(targets).sort()) {
    var _targetParserMap$targ;

    const value = targets[target];

    if (typeof value === "number" && value % 1 !== 0) {
      decimalWarnings.push({
        target,
        value
      });
    }

    const parser = (_targetParserMap$targ = targetParserMap[target]) != null ? _targetParserMap$targ : targetParserMap.__default;
    const [parsedTarget, parsedValue] = parser(target, value);

    if (parsedValue) {
      result[parsedTarget] = parsedValue;
    }
  }

  outputDecimalWarning(decimalWarnings);
  return result;
}
}, function(modId) {var map = {"./utils":1625038526757,"./targets":1625038526758,"./options":1625038526759,"./pretty":1625038526760,"./debug":1625038526761,"./filter-items":1625038526762}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526757, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.semverMin = semverMin;
exports.semverify = semverify;
exports.isUnreleasedVersion = isUnreleasedVersion;
exports.getLowestUnreleased = getLowestUnreleased;
exports.getHighestUnreleased = getHighestUnreleased;
exports.getLowestImplementedVersion = getLowestImplementedVersion;

var _semver = require("semver");

var _helperValidatorOption = require("@babel/helper-validator-option");

var _targets = require("./targets");

const versionRegExp = /^(\d+|\d+.\d+)$/;
const v = new _helperValidatorOption.OptionValidator("@babel/helper-compilation-targets");

function semverMin(first, second) {
  return first && _semver.lt(first, second) ? first : second;
}

function semverify(version) {
  if (typeof version === "string" && _semver.valid(version)) {
    return version;
  }

  v.invariant(typeof version === "number" || typeof version === "string" && versionRegExp.test(version), `'${version}' is not a valid version`);
  const split = version.toString().split(".");

  while (split.length < 3) {
    split.push("0");
  }

  return split.join(".");
}

function isUnreleasedVersion(version, env) {
  const unreleasedLabel = _targets.unreleasedLabels[env];
  return !!unreleasedLabel && unreleasedLabel === version.toString().toLowerCase();
}

function getLowestUnreleased(a, b, env) {
  const unreleasedLabel = _targets.unreleasedLabels[env];
  const hasUnreleased = [a, b].some(item => item === unreleasedLabel);

  if (hasUnreleased) {
    return a === hasUnreleased ? b : a || b;
  }

  return semverMin(a, b);
}

function getHighestUnreleased(a, b, env) {
  return getLowestUnreleased(a, b, env) === a ? b : a;
}

function getLowestImplementedVersion(plugin, environment) {
  const result = plugin[environment];

  if (!result && environment === "android") {
    return plugin.chrome;
  }

  return result;
}
}, function(modId) { var map = {"./targets":1625038526758}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526758, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.browserNameMap = exports.unreleasedLabels = void 0;
const unreleasedLabels = {
  safari: "tp"
};
exports.unreleasedLabels = unreleasedLabels;
const browserNameMap = {
  and_chr: "chrome",
  and_ff: "firefox",
  android: "android",
  chrome: "chrome",
  edge: "edge",
  firefox: "firefox",
  ie: "ie",
  ie_mob: "ie",
  ios_saf: "ios",
  node: "node",
  op_mob: "opera",
  opera: "opera",
  safari: "safari",
  samsung: "samsung"
};
exports.browserNameMap = browserNameMap;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526759, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TargetNames = void 0;
const TargetNames = {
  node: "node",
  chrome: "chrome",
  opera: "opera",
  edge: "edge",
  firefox: "firefox",
  safari: "safari",
  ie: "ie",
  ios: "ios",
  android: "android",
  electron: "electron",
  samsung: "samsung"
};
exports.TargetNames = TargetNames;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526760, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prettifyVersion = prettifyVersion;
exports.prettifyTargets = prettifyTargets;

var _semver = require("semver");

var _targets = require("./targets");

function prettifyVersion(version) {
  if (typeof version !== "string") {
    return version;
  }

  const parts = [_semver.major(version)];

  const minor = _semver.minor(version);

  const patch = _semver.patch(version);

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
    const unreleasedLabel = _targets.unreleasedLabels[target];

    if (typeof value === "string" && unreleasedLabel !== value) {
      value = prettifyVersion(value);
    }

    results[target] = value;
    return results;
  }, {});
}
}, function(modId) { var map = {"./targets":1625038526758}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526761, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getInclusionReasons = getInclusionReasons;

var _semver = require("semver");

var _pretty = require("./pretty");

var _utils = require("./utils");

function getInclusionReasons(item, targetVersions, list) {
  const minVersions = list[item] || {};
  return Object.keys(targetVersions).reduce((result, env) => {
    const minVersion = (0, _utils.getLowestImplementedVersion)(minVersions, env);
    const targetVersion = targetVersions[env];

    if (!minVersion) {
      result[env] = (0, _pretty.prettifyVersion)(targetVersion);
    } else {
      const minIsUnreleased = (0, _utils.isUnreleasedVersion)(minVersion, env);
      const targetIsUnreleased = (0, _utils.isUnreleasedVersion)(targetVersion, env);

      if (!targetIsUnreleased && (minIsUnreleased || _semver.lt(targetVersion.toString(), (0, _utils.semverify)(minVersion)))) {
        result[env] = (0, _pretty.prettifyVersion)(targetVersion);
      }
    }

    return result;
  }, {});
}
}, function(modId) { var map = {"./pretty":1625038526760,"./utils":1625038526757}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526762, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.targetsSupported = targetsSupported;
exports.isRequired = isRequired;
exports.default = filterItems;

var _semver = require("semver");

var _plugins = require("@babel/compat-data/plugins");

var _utils = require("./utils");

function targetsSupported(target, support) {
  const targetEnvironments = Object.keys(target);

  if (targetEnvironments.length === 0) {
    return false;
  }

  const unsupportedEnvironments = targetEnvironments.filter(environment => {
    const lowestImplementedVersion = (0, _utils.getLowestImplementedVersion)(support, environment);

    if (!lowestImplementedVersion) {
      return true;
    }

    const lowestTargetedVersion = target[environment];

    if ((0, _utils.isUnreleasedVersion)(lowestTargetedVersion, environment)) {
      return false;
    }

    if ((0, _utils.isUnreleasedVersion)(lowestImplementedVersion, environment)) {
      return true;
    }

    if (!_semver.valid(lowestTargetedVersion.toString())) {
      throw new Error(`Invalid version passed for target "${environment}": "${lowestTargetedVersion}". ` + "Versions must be in semver format (major.minor.patch)");
    }

    return _semver.gt((0, _utils.semverify)(lowestImplementedVersion), lowestTargetedVersion.toString());
  });
  return unsupportedEnvironments.length === 0;
}

function isRequired(name, targets, {
  compatData = _plugins,
  includes,
  excludes
} = {}) {
  if (excludes != null && excludes.has(name)) return false;
  if (includes != null && includes.has(name)) return true;
  return !targetsSupported(targets, compatData[name]);
}

function filterItems(list, includes, excludes, targets, defaultIncludes, defaultExcludes, pluginSyntaxMap) {
  const result = new Set();
  const options = {
    compatData: list,
    includes,
    excludes
  };

  for (const item in list) {
    if (isRequired(item, targets, options)) {
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
}, function(modId) { var map = {"./utils":1625038526757}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526756);
})()
//# sourceMappingURL=index.js.map