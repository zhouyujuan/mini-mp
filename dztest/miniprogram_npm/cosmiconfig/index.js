module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038545742, function(require, module, exports) {
//      


const os = require('os');
const createExplorer = require('./createExplorer');
const loaders = require('./loaders');

module.exports = cosmiconfig;

function cosmiconfig(
  moduleName        ,
  options   
                         
                     
                                 
                                      
                     
                    
                                                       
   
) {
  options = options || {};
  const defaults = {
    packageProp: moduleName,
    searchPlaces: [
      'package.json',
      `.${moduleName}rc`,
      `.${moduleName}rc.json`,
      `.${moduleName}rc.yaml`,
      `.${moduleName}rc.yml`,
      `.${moduleName}rc.js`,
      `${moduleName}.config.js`,
    ],
    ignoreEmptySearchPlaces: true,
    stopDir: os.homedir(),
    cache: true,
    transform: identity,
  };
  const normalizedOptions                  = Object.assign(
    {},
    defaults,
    options,
    {
      loaders: normalizeLoaders(options.loaders),
    }
  );

  return createExplorer(normalizedOptions);
}

cosmiconfig.loadJs = loaders.loadJs;
cosmiconfig.loadJson = loaders.loadJson;
cosmiconfig.loadYaml = loaders.loadYaml;

function normalizeLoaders(rawLoaders         )          {
  const defaults = {
    '.js': { sync: loaders.loadJs, async: loaders.loadJs },
    '.json': { sync: loaders.loadJson, async: loaders.loadJson },
    '.yaml': { sync: loaders.loadYaml, async: loaders.loadYaml },
    '.yml': { sync: loaders.loadYaml, async: loaders.loadYaml },
    noExt: { sync: loaders.loadYaml, async: loaders.loadYaml },
  };

  if (!rawLoaders) {
    return defaults;
  }

  return Object.keys(rawLoaders).reduce((result, ext) => {
    const entry = rawLoaders && rawLoaders[ext];
    if (typeof entry === 'function') {
      result[ext] = { sync: entry, async: entry };
    } else {
      result[ext] = entry;
    }
    return result;
  }, defaults);
}

function identity(x) {
  return x;
}

}, function(modId) {var map = {"./createExplorer":1625038545743,"./loaders":1625038545744}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038545743, function(require, module, exports) {
//      


const path = require('path');
const loaders = require('./loaders');
const readFile = require('./readFile');
const cacheWrapper = require('./cacheWrapper');
const getDirectory = require('./getDirectory');
const getPropertyByPath = require('./getPropertyByPath');

const MODE_SYNC = 'sync';

// An object value represents a config object.
// null represents that the loader did not find anything relevant.
// undefined represents that the loader found something relevant
// but it was empty.
                                              

class Explorer {
                                                      
                                                 
                                                        
                                                   
                          

  constructor(options                 ) {
    this.loadCache = options.cache ? new Map() : null;
    this.loadSyncCache = options.cache ? new Map() : null;
    this.searchCache = options.cache ? new Map() : null;
    this.searchSyncCache = options.cache ? new Map() : null;
    this.config = options;
    this.validateConfig();
  }

  clearLoadCache() {
    if (this.loadCache) {
      this.loadCache.clear();
    }
    if (this.loadSyncCache) {
      this.loadSyncCache.clear();
    }
  }

  clearSearchCache() {
    if (this.searchCache) {
      this.searchCache.clear();
    }
    if (this.searchSyncCache) {
      this.searchSyncCache.clear();
    }
  }

  clearCaches() {
    this.clearLoadCache();
    this.clearSearchCache();
  }

  validateConfig() {
    const config = this.config;

    config.searchPlaces.forEach(place => {
      const loaderKey = path.extname(place) || 'noExt';
      const loader = config.loaders[loaderKey];
      if (!loader) {
        throw new Error(
          `No loader specified for ${getExtensionDescription(
            place
          )}, so searchPlaces item "${place}" is invalid`
        );
      }
    });
  }

  search(searchFrom         )                             {
    searchFrom = searchFrom || process.cwd();
    return getDirectory(searchFrom).then(dir => {
      return this.searchFromDirectory(dir);
    });
  }

  searchFromDirectory(dir        )                             {
    const absoluteDir = path.resolve(process.cwd(), dir);
    const run = () => {
      return this.searchDirectory(absoluteDir).then(result => {
        const nextDir = this.nextDirectoryToSearch(absoluteDir, result);
        if (nextDir) {
          return this.searchFromDirectory(nextDir);
        }
        return this.config.transform(result);
      });
    };

    if (this.searchCache) {
      return cacheWrapper(this.searchCache, absoluteDir, run);
    }
    return run();
  }

  searchSync(searchFrom         )                    {
    searchFrom = searchFrom || process.cwd();
    const dir = getDirectory.sync(searchFrom);
    return this.searchFromDirectorySync(dir);
  }

  searchFromDirectorySync(dir        )                    {
    const absoluteDir = path.resolve(process.cwd(), dir);
    const run = () => {
      const result = this.searchDirectorySync(absoluteDir);
      const nextDir = this.nextDirectoryToSearch(absoluteDir, result);
      if (nextDir) {
        return this.searchFromDirectorySync(nextDir);
      }
      return this.config.transform(result);
    };

    if (this.searchSyncCache) {
      return cacheWrapper(this.searchSyncCache, absoluteDir, run);
    }
    return run();
  }

  searchDirectory(dir        )                             {
    return this.config.searchPlaces.reduce((prevResultPromise, place) => {
      return prevResultPromise.then(prevResult => {
        if (this.shouldSearchStopWithResult(prevResult)) {
          return prevResult;
        }
        return this.loadSearchPlace(dir, place);
      });
    }, Promise.resolve(null));
  }

  searchDirectorySync(dir        )                    {
    let result = null;
    for (const place of this.config.searchPlaces) {
      result = this.loadSearchPlaceSync(dir, place);
      if (this.shouldSearchStopWithResult(result)) break;
    }
    return result;
  }

  shouldSearchStopWithResult(result                   )          {
    if (result === null) return false;
    if (result.isEmpty && this.config.ignoreEmptySearchPlaces) return false;
    return true;
  }

  loadSearchPlace(dir        , place        )                             {
    const filepath = path.join(dir, place);
    return readFile(filepath).then(content => {
      return this.createCosmiconfigResult(filepath, content);
    });
  }

  loadSearchPlaceSync(dir        , place        )                    {
    const filepath = path.join(dir, place);
    const content = readFile.sync(filepath);
    return this.createCosmiconfigResultSync(filepath, content);
  }

  nextDirectoryToSearch(
    currentDir        ,
    currentResult                   
  )          {
    if (this.shouldSearchStopWithResult(currentResult)) {
      return null;
    }
    const nextDir = nextDirUp(currentDir);
    if (nextDir === currentDir || currentDir === this.config.stopDir) {
      return null;
    }
    return nextDir;
  }

  loadPackageProp(filepath        , content        ) {
    const parsedContent = loaders.loadJson(filepath, content);
    const packagePropValue = getPropertyByPath(
      parsedContent,
      this.config.packageProp
    );
    return packagePropValue || null;
  }

  getLoaderEntryForFile(filepath        )              {
    if (path.basename(filepath) === 'package.json') {
      const loader = this.loadPackageProp.bind(this);
      return { sync: loader, async: loader };
    }

    const loaderKey = path.extname(filepath) || 'noExt';
    return this.config.loaders[loaderKey] || {};
  }

  getSyncLoaderForFile(filepath        )             {
    const entry = this.getLoaderEntryForFile(filepath);
    if (!entry.sync) {
      throw new Error(
        `No sync loader specified for ${getExtensionDescription(filepath)}`
      );
    }
    return entry.sync;
  }

  getAsyncLoaderForFile(filepath        )              {
    const entry = this.getLoaderEntryForFile(filepath);
    const loader = entry.async || entry.sync;
    if (!loader) {
      throw new Error(
        `No async loader specified for ${getExtensionDescription(filepath)}`
      );
    }
    return loader;
  }

  loadFileContent(
    mode                  ,
    filepath        ,
    content               
  )                                                 {
    if (content === null) {
      return null;
    }
    if (content.trim() === '') {
      return undefined;
    }
    const loader =
      mode === MODE_SYNC
        ? this.getSyncLoaderForFile(filepath)
        : this.getAsyncLoaderForFile(filepath);
    return loader(filepath, content);
  }

  loadedContentToCosmiconfigResult(
    filepath        ,
    loadedContent                   
  )                    {
    if (loadedContent === null) {
      return null;
    }
    if (loadedContent === undefined) {
      return { filepath, config: undefined, isEmpty: true };
    }
    return { config: loadedContent, filepath };
  }

  createCosmiconfigResult(
    filepath        ,
    content               
  )                             {
    return Promise.resolve()
      .then(() => {
        return this.loadFileContent('async', filepath, content);
      })
      .then(loaderResult => {
        return this.loadedContentToCosmiconfigResult(filepath, loaderResult);
      });
  }

  createCosmiconfigResultSync(
    filepath        ,
    content               
  )                    {
    const loaderResult = this.loadFileContent('sync', filepath, content);
    return this.loadedContentToCosmiconfigResult(filepath, loaderResult);
  }

  validateFilePath(filepath         ) {
    if (!filepath) {
      throw new Error('load and loadSync must pass a non-empty string');
    }
  }

  load(filepath        )                             {
    return Promise.resolve().then(() => {
      this.validateFilePath(filepath);
      const absoluteFilePath = path.resolve(process.cwd(), filepath);
      return cacheWrapper(this.loadCache, absoluteFilePath, () => {
        return readFile(absoluteFilePath, { throwNotFound: true })
          .then(content => {
            return this.createCosmiconfigResult(absoluteFilePath, content);
          })
          .then(this.config.transform);
      });
    });
  }

  loadSync(filepath        )                    {
    this.validateFilePath(filepath);
    const absoluteFilePath = path.resolve(process.cwd(), filepath);
    return cacheWrapper(this.loadSyncCache, absoluteFilePath, () => {
      const content = readFile.sync(absoluteFilePath, { throwNotFound: true });
      const result = this.createCosmiconfigResultSync(
        absoluteFilePath,
        content
      );
      return this.config.transform(result);
    });
  }
}

module.exports = function createExplorer(options                 ) {
  const explorer = new Explorer(options);

  return {
    search: explorer.search.bind(explorer),
    searchSync: explorer.searchSync.bind(explorer),
    load: explorer.load.bind(explorer),
    loadSync: explorer.loadSync.bind(explorer),
    clearLoadCache: explorer.clearLoadCache.bind(explorer),
    clearSearchCache: explorer.clearSearchCache.bind(explorer),
    clearCaches: explorer.clearCaches.bind(explorer),
  };
};

function nextDirUp(dir        )         {
  return path.dirname(dir);
}

function getExtensionDescription(filepath        )         {
  const ext = path.extname(filepath);
  return ext ? `extension "${ext}"` : 'files without extensions';
}

}, function(modId) { var map = {"./loaders":1625038545744,"./readFile":1625038545745,"./cacheWrapper":1625038545746,"./getDirectory":1625038545747,"./getPropertyByPath":1625038545748}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038545744, function(require, module, exports) {
//      


const parseJson = require('parse-json');
const yaml = require('js-yaml');
const importFresh = require('import-fresh');

function loadJs(filepath        )         {
  const result = importFresh(filepath);
  return result;
}

function loadJson(filepath        , content        )         {
  try {
    return parseJson(content);
  } catch (err) {
    err.message = `JSON Error in ${filepath}:\n${err.message}`;
    throw err;
  }
}

function loadYaml(filepath        , content        )         {
  return yaml.safeLoad(content, { filename: filepath });
}

module.exports = {
  loadJs,
  loadJson,
  loadYaml,
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038545745, function(require, module, exports) {
//      


const fs = require('fs');

                
                          
  

function readFile(filepath        , options          )                         {
  options = options || {};
  const throwNotFound = options.throwNotFound || false;

  return new Promise((resolve, reject) => {
    fs.readFile(filepath, 'utf8', (err, content) => {
      if (err && err.code === 'ENOENT' && !throwNotFound) {
        return resolve(null);
      }
      if (err) return reject(err);
      resolve(content);
    });
  });
}

readFile.sync = function readFileSync(
  filepath        ,
  options          
)                {
  options = options || {};
  const throwNotFound = options.throwNotFound || false;

  try {
    return fs.readFileSync(filepath, 'utf8');
  } catch (err) {
    if (err.code === 'ENOENT' && !throwNotFound) {
      return null;
    }
    throw err;
  }
};

module.exports = readFile;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038545746, function(require, module, exports) {
//      


function cacheWrapper   (cache                 , key        , fn         )    {
  if (!cache) {
    return fn();
  }

  const cached = cache.get(key);
  if (cached !== undefined) {
    return cached;
  }

  const result = fn();
  cache.set(key, result);
  return result;
}

module.exports = cacheWrapper;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038545747, function(require, module, exports) {
//      


const path = require('path');
const isDirectory = require('is-directory');

function getDirectory(filepath        )                  {
  return new Promise((resolve, reject) => {
    return isDirectory(filepath, (err, filepathIsDirectory) => {
      if (err) {
        return reject(err);
      }
      return resolve(filepathIsDirectory ? filepath : path.dirname(filepath));
    });
  });
}

getDirectory.sync = function getDirectorySync(filepath        )         {
  return isDirectory.sync(filepath) ? filepath : path.dirname(filepath);
};

module.exports = getDirectory;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038545748, function(require, module, exports) {
//      


// Resolves property names or property paths defined with period-delimited
// strings or arrays of strings. Property names that are found on the source
// object are used directly (even if they include a period).
// Nested property names that include periods, within a path, are only
// understood in array paths.
function getPropertyByPath(source        , path                        )      {
  if (typeof path === 'string' && source.hasOwnProperty(path)) {
    return source[path];
  }

  const parsedPath = typeof path === 'string' ? path.split('.') : path;
  return parsedPath.reduce((previous, key) => {
    if (previous === undefined) {
      return previous;
    }
    return previous[key];
  }, source);
}

module.exports = getPropertyByPath;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038545742);
})()
//# sourceMappingURL=index.js.map