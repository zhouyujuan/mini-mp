module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038544317, function(require, module, exports) {


exports.__esModule = true;

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _processor = require('./processor');

var _processor2 = _interopRequireDefault(_processor);

var _stringify = require('./stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('./at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _vendor = require('./vendor');

var _vendor2 = _interopRequireDefault(_vendor);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Create a new {@link Processor} instance that will apply `plugins`
 * as CSS processors.
 *
 * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
 *        plugins. See {@link Processor#use} for plugin format.
 *
 * @return {Processor} Processor to process multiple CSS
 *
 * @example
 * import postcss from 'postcss';
 *
 * postcss(plugins).process(css, { from, to }).then(result => {
 *   console.log(result.css);
 * });
 *
 * @namespace postcss
 */
function postcss() {
  for (var _len = arguments.length, plugins = Array(_len), _key = 0; _key < _len; _key++) {
    plugins[_key] = arguments[_key];
  }

  if (plugins.length === 1 && Array.isArray(plugins[0])) {
    plugins = plugins[0];
  }
  return new _processor2.default(plugins);
}

/**
 * Creates a PostCSS plugin with a standard API.
 *
 * The newly-wrapped function will provide both the name and PostCSS
 * version of the plugin.
 *
 * ```js
 *  const processor = postcss([replace]);
 *  processor.plugins[0].postcssPlugin  //=> 'postcss-replace'
 *  processor.plugins[0].postcssVersion //=> '5.1.0'
 * ```
 *
 * The plugin function receives 2 arguments: {@link Root}
 * and {@link Result} instance. The function should mutate the provided
 * `Root` node. Alternatively, you can create a new `Root` node
 * and override the `result.root` property.
 *
 * ```js
 * const cleaner = postcss.plugin('postcss-cleaner', () => {
 *   return (root, result) => {
 *     result.root = postcss.root();
 *   };
 * });
 * ```
 *
 * As a convenience, plugins also expose a `process` method so that you can use
 * them as standalone tools.
 *
 * ```js
 * cleaner.process(css, processOpts, pluginOpts);
 * // This is equivalent to:
 * postcss([ cleaner(pluginOpts) ]).process(css, processOpts);
 * ```
 *
 * Asynchronous plugins should return a `Promise` instance.
 *
 * ```js
 * postcss.plugin('postcss-import', () => {
 *   return (root, result) => {
 *     return new Promise( (resolve, reject) => {
 *       fs.readFile('base.css', (base) => {
 *         root.prepend(base);
 *         resolve();
 *       });
 *     });
 *   };
 * });
 * ```
 *
 * Add warnings using the {@link Node#warn} method.
 * Send data to other plugins using the {@link Result#messages} array.
 *
 * ```js
 * postcss.plugin('postcss-caniuse-test', () => {
 *   return (root, result) => {
 *     root.walkDecls(decl => {
 *       if ( !caniuse.support(decl.prop) ) {
 *         decl.warn(result, 'Some browsers do not support ' + decl.prop);
 *       }
 *     });
 *   };
 * });
 * ```
 *
 * @param {string} name          - PostCSS plugin name. Same as in `name`
 *                                 property in `package.json`. It will be saved
 *                                 in `plugin.postcssPlugin` property.
 * @param {function} initializer - will receive plugin options
 *                                 and should return {@link pluginFunction}
 *
 * @return {Plugin} PostCSS plugin
 */
postcss.plugin = function plugin(name, initializer) {
  var creator = function creator() {
    var transformer = initializer.apply(undefined, arguments);
    transformer.postcssPlugin = name;
    transformer.postcssVersion = new _processor2.default().version;
    return transformer;
  };

  var cache = void 0;
  Object.defineProperty(creator, 'postcss', {
    get: function get() {
      if (!cache) cache = creator();
      return cache;
    }
  });

  creator.process = function (css, processOpts, pluginOpts) {
    return postcss([creator(pluginOpts)]).process(css, processOpts);
  };

  return creator;
};

/**
 * Default function to convert a node tree into a CSS string.
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 *
 * @function
 */
postcss.stringify = _stringify2.default;

/**
 * Parses source css and returns a new {@link Root} node,
 * which contains the source CSS nodes.
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 *
 * @example
 * // Simple CSS concatenation with source map support
 * const root1 = postcss.parse(css1, { from: file1 });
 * const root2 = postcss.parse(css2, { from: file2 });
 * root1.append(root2).toResult().css;
 *
 * @function
 */
postcss.parse = _parse2.default;

/**
 * @member {vendor} - Contains the {@link vendor} module.
 *
 * @example
 * postcss.vendor.unprefixed('-moz-tab') //=> ['tab']
 */
postcss.vendor = _vendor2.default;

/**
 * @member {list} - Contains the {@link list} module.
 *
 * @example
 * postcss.list.space('5px calc(10% + 5px)') //=> ['5px', 'calc(10% + 5px)']
 */
postcss.list = _list2.default;

/**
 * Creates a new {@link Comment} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Comment} new Comment node
 *
 * @example
 * postcss.comment({ text: 'test' })
 */
postcss.comment = function (defaults) {
  return new _comment2.default(defaults);
};

/**
 * Creates a new {@link AtRule} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {AtRule} new AtRule node
 *
 * @example
 * postcss.atRule({ name: 'charset' }).toString() //=> "@charset"
 */
postcss.atRule = function (defaults) {
  return new _atRule2.default(defaults);
};

/**
 * Creates a new {@link Declaration} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Declaration} new Declaration node
 *
 * @example
 * postcss.decl({ prop: 'color', value: 'red' }).toString() //=> "color: red"
 */
postcss.decl = function (defaults) {
  return new _declaration2.default(defaults);
};

/**
 * Creates a new {@link Rule} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Rule} new Rule node
 *
 * @example
 * postcss.rule({ selector: 'a' }).toString() //=> "a {\n}"
 */
postcss.rule = function (defaults) {
  return new _rule2.default(defaults);
};

/**
 * Creates a new {@link Root} node.
 *
 * @param {object} [defaults] - properties for the new node.
 *
 * @return {Root} new Root node
 *
 * @example
 * postcss.root({ after: '\n' }).toString() //=> "\n"
 */
postcss.root = function (defaults) {
  return new _root2.default(defaults);
};

exports.default = postcss;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBvc3Rjc3MuZXM2Il0sIm5hbWVzIjpbInBvc3Rjc3MiLCJwbHVnaW5zIiwibGVuZ3RoIiwiQXJyYXkiLCJpc0FycmF5IiwiUHJvY2Vzc29yIiwicGx1Z2luIiwibmFtZSIsImluaXRpYWxpemVyIiwiY3JlYXRvciIsInRyYW5zZm9ybWVyIiwicG9zdGNzc1BsdWdpbiIsInBvc3Rjc3NWZXJzaW9uIiwidmVyc2lvbiIsImNhY2hlIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJnZXQiLCJwcm9jZXNzIiwiY3NzIiwicHJvY2Vzc09wdHMiLCJwbHVnaW5PcHRzIiwic3RyaW5naWZ5IiwicGFyc2UiLCJ2ZW5kb3IiLCJsaXN0IiwiY29tbWVudCIsIkNvbW1lbnQiLCJkZWZhdWx0cyIsImF0UnVsZSIsIkF0UnVsZSIsImRlY2wiLCJEZWNsYXJhdGlvbiIsInJ1bGUiLCJSdWxlIiwicm9vdCIsIlJvb3QiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFTQSxPQUFULEdBQTZCO0FBQUEsb0NBQVRDLE9BQVM7QUFBVEEsV0FBUztBQUFBOztBQUN6QixNQUFLQSxRQUFRQyxNQUFSLEtBQW1CLENBQW5CLElBQXdCQyxNQUFNQyxPQUFOLENBQWNILFFBQVEsQ0FBUixDQUFkLENBQTdCLEVBQXlEO0FBQ3JEQSxjQUFVQSxRQUFRLENBQVIsQ0FBVjtBQUNIO0FBQ0QsU0FBTyxJQUFJSSxtQkFBSixDQUFjSixPQUFkLENBQVA7QUFDSDs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBd0VBRCxRQUFRTSxNQUFSLEdBQWlCLFNBQVNBLE1BQVQsQ0FBZ0JDLElBQWhCLEVBQXNCQyxXQUF0QixFQUFtQztBQUNoRCxNQUFJQyxVQUFVLFNBQVZBLE9BQVUsR0FBbUI7QUFDN0IsUUFBSUMsY0FBY0YsdUNBQWxCO0FBQ0FFLGdCQUFZQyxhQUFaLEdBQTZCSixJQUE3QjtBQUNBRyxnQkFBWUUsY0FBWixHQUE4QixJQUFJUCxtQkFBSixFQUFELENBQWtCUSxPQUEvQztBQUNBLFdBQU9ILFdBQVA7QUFDSCxHQUxEOztBQU9BLE1BQUlJLGNBQUo7QUFDQUMsU0FBT0MsY0FBUCxDQUFzQlAsT0FBdEIsRUFBK0IsU0FBL0IsRUFBMEM7QUFDdENRLE9BRHNDLGlCQUNoQztBQUNGLFVBQUssQ0FBQ0gsS0FBTixFQUFjQSxRQUFRTCxTQUFSO0FBQ2QsYUFBT0ssS0FBUDtBQUNIO0FBSnFDLEdBQTFDOztBQU9BTCxVQUFRUyxPQUFSLEdBQWtCLFVBQVVDLEdBQVYsRUFBZUMsV0FBZixFQUE0QkMsVUFBNUIsRUFBd0M7QUFDdEQsV0FBT3JCLFFBQVEsQ0FBRVMsUUFBUVksVUFBUixDQUFGLENBQVIsRUFBaUNILE9BQWpDLENBQXlDQyxHQUF6QyxFQUE4Q0MsV0FBOUMsQ0FBUDtBQUNILEdBRkQ7O0FBSUEsU0FBT1gsT0FBUDtBQUNILENBckJEOztBQXVCQTs7Ozs7Ozs7Ozs7QUFXQVQsUUFBUXNCLFNBQVIsR0FBb0JBLG1CQUFwQjs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBdEIsUUFBUXVCLEtBQVIsR0FBZ0JBLGVBQWhCOztBQUVBOzs7Ozs7QUFNQXZCLFFBQVF3QixNQUFSLEdBQWlCQSxnQkFBakI7O0FBRUE7Ozs7OztBQU1BeEIsUUFBUXlCLElBQVIsR0FBZUEsY0FBZjs7QUFFQTs7Ozs7Ozs7OztBQVVBekIsUUFBUTBCLE9BQVIsR0FBa0I7QUFBQSxTQUFZLElBQUlDLGlCQUFKLENBQVlDLFFBQVosQ0FBWjtBQUFBLENBQWxCOztBQUVBOzs7Ozs7Ozs7O0FBVUE1QixRQUFRNkIsTUFBUixHQUFpQjtBQUFBLFNBQVksSUFBSUMsZ0JBQUosQ0FBV0YsUUFBWCxDQUFaO0FBQUEsQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7QUFVQTVCLFFBQVErQixJQUFSLEdBQWU7QUFBQSxTQUFZLElBQUlDLHFCQUFKLENBQWdCSixRQUFoQixDQUFaO0FBQUEsQ0FBZjs7QUFFQTs7Ozs7Ozs7OztBQVVBNUIsUUFBUWlDLElBQVIsR0FBZTtBQUFBLFNBQVksSUFBSUMsY0FBSixDQUFTTixRQUFULENBQVo7QUFBQSxDQUFmOztBQUVBOzs7Ozs7Ozs7O0FBVUE1QixRQUFRbUMsSUFBUixHQUFlO0FBQUEsU0FBWSxJQUFJQyxjQUFKLENBQVNSLFFBQVQsQ0FBWjtBQUFBLENBQWY7O2tCQUVlNUIsTyIsImZpbGUiOiJwb3N0Y3NzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IERlY2xhcmF0aW9uIGZyb20gJy4vZGVjbGFyYXRpb24nO1xuaW1wb3J0IFByb2Nlc3NvciAgIGZyb20gJy4vcHJvY2Vzc29yJztcbmltcG9ydCBzdHJpbmdpZnkgICBmcm9tICcuL3N0cmluZ2lmeSc7XG5pbXBvcnQgQ29tbWVudCAgICAgZnJvbSAnLi9jb21tZW50JztcbmltcG9ydCBBdFJ1bGUgICAgICBmcm9tICcuL2F0LXJ1bGUnO1xuaW1wb3J0IHZlbmRvciAgICAgIGZyb20gJy4vdmVuZG9yJztcbmltcG9ydCBwYXJzZSAgICAgICBmcm9tICcuL3BhcnNlJztcbmltcG9ydCBsaXN0ICAgICAgICBmcm9tICcuL2xpc3QnO1xuaW1wb3J0IFJ1bGUgICAgICAgIGZyb20gJy4vcnVsZSc7XG5pbXBvcnQgUm9vdCAgICAgICAgZnJvbSAnLi9yb290JztcblxuLyoqXG4gKiBDcmVhdGUgYSBuZXcge0BsaW5rIFByb2Nlc3Nvcn0gaW5zdGFuY2UgdGhhdCB3aWxsIGFwcGx5IGBwbHVnaW5zYFxuICogYXMgQ1NTIHByb2Nlc3NvcnMuXG4gKlxuICogQHBhcmFtIHtBcnJheS48UGx1Z2lufHBsdWdpbkZ1bmN0aW9uPnxQcm9jZXNzb3J9IHBsdWdpbnMgLSBQb3N0Q1NTXG4gKiAgICAgICAgcGx1Z2lucy4gU2VlIHtAbGluayBQcm9jZXNzb3IjdXNlfSBmb3IgcGx1Z2luIGZvcm1hdC5cbiAqXG4gKiBAcmV0dXJuIHtQcm9jZXNzb3J9IFByb2Nlc3NvciB0byBwcm9jZXNzIG11bHRpcGxlIENTU1xuICpcbiAqIEBleGFtcGxlXG4gKiBpbXBvcnQgcG9zdGNzcyBmcm9tICdwb3N0Y3NzJztcbiAqXG4gKiBwb3N0Y3NzKHBsdWdpbnMpLnByb2Nlc3MoY3NzLCB7IGZyb20sIHRvIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAqICAgY29uc29sZS5sb2cocmVzdWx0LmNzcyk7XG4gKiB9KTtcbiAqXG4gKiBAbmFtZXNwYWNlIHBvc3Rjc3NcbiAqL1xuZnVuY3Rpb24gcG9zdGNzcyguLi5wbHVnaW5zKSB7XG4gICAgaWYgKCBwbHVnaW5zLmxlbmd0aCA9PT0gMSAmJiBBcnJheS5pc0FycmF5KHBsdWdpbnNbMF0pICkge1xuICAgICAgICBwbHVnaW5zID0gcGx1Z2luc1swXTtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9jZXNzb3IocGx1Z2lucyk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIFBvc3RDU1MgcGx1Z2luIHdpdGggYSBzdGFuZGFyZCBBUEkuXG4gKlxuICogVGhlIG5ld2x5LXdyYXBwZWQgZnVuY3Rpb24gd2lsbCBwcm92aWRlIGJvdGggdGhlIG5hbWUgYW5kIFBvc3RDU1NcbiAqIHZlcnNpb24gb2YgdGhlIHBsdWdpbi5cbiAqXG4gKiBgYGBqc1xuICogIGNvbnN0IHByb2Nlc3NvciA9IHBvc3Rjc3MoW3JlcGxhY2VdKTtcbiAqICBwcm9jZXNzb3IucGx1Z2luc1swXS5wb3N0Y3NzUGx1Z2luICAvLz0+ICdwb3N0Y3NzLXJlcGxhY2UnXG4gKiAgcHJvY2Vzc29yLnBsdWdpbnNbMF0ucG9zdGNzc1ZlcnNpb24gLy89PiAnNS4xLjAnXG4gKiBgYGBcbiAqXG4gKiBUaGUgcGx1Z2luIGZ1bmN0aW9uIHJlY2VpdmVzIDIgYXJndW1lbnRzOiB7QGxpbmsgUm9vdH1cbiAqIGFuZCB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZS4gVGhlIGZ1bmN0aW9uIHNob3VsZCBtdXRhdGUgdGhlIHByb3ZpZGVkXG4gKiBgUm9vdGAgbm9kZS4gQWx0ZXJuYXRpdmVseSwgeW91IGNhbiBjcmVhdGUgYSBuZXcgYFJvb3RgIG5vZGVcbiAqIGFuZCBvdmVycmlkZSB0aGUgYHJlc3VsdC5yb290YCBwcm9wZXJ0eS5cbiAqXG4gKiBgYGBqc1xuICogY29uc3QgY2xlYW5lciA9IHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWNsZWFuZXInLCAoKSA9PiB7XG4gKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gKiAgICAgcmVzdWx0LnJvb3QgPSBwb3N0Y3NzLnJvb3QoKTtcbiAqICAgfTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQXMgYSBjb252ZW5pZW5jZSwgcGx1Z2lucyBhbHNvIGV4cG9zZSBhIGBwcm9jZXNzYCBtZXRob2Qgc28gdGhhdCB5b3UgY2FuIHVzZVxuICogdGhlbSBhcyBzdGFuZGFsb25lIHRvb2xzLlxuICpcbiAqIGBgYGpzXG4gKiBjbGVhbmVyLnByb2Nlc3MoY3NzLCBwcm9jZXNzT3B0cywgcGx1Z2luT3B0cyk7XG4gKiAvLyBUaGlzIGlzIGVxdWl2YWxlbnQgdG86XG4gKiBwb3N0Y3NzKFsgY2xlYW5lcihwbHVnaW5PcHRzKSBdKS5wcm9jZXNzKGNzcywgcHJvY2Vzc09wdHMpO1xuICogYGBgXG4gKlxuICogQXN5bmNocm9ub3VzIHBsdWdpbnMgc2hvdWxkIHJldHVybiBhIGBQcm9taXNlYCBpbnN0YW5jZS5cbiAqXG4gKiBgYGBqc1xuICogcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtaW1wb3J0JywgKCkgPT4ge1xuICogICByZXR1cm4gKHJvb3QsIHJlc3VsdCkgPT4ge1xuICogICAgIHJldHVybiBuZXcgUHJvbWlzZSggKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICogICAgICAgZnMucmVhZEZpbGUoJ2Jhc2UuY3NzJywgKGJhc2UpID0+IHtcbiAqICAgICAgICAgcm9vdC5wcmVwZW5kKGJhc2UpO1xuICogICAgICAgICByZXNvbHZlKCk7XG4gKiAgICAgICB9KTtcbiAqICAgICB9KTtcbiAqICAgfTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQWRkIHdhcm5pbmdzIHVzaW5nIHRoZSB7QGxpbmsgTm9kZSN3YXJufSBtZXRob2QuXG4gKiBTZW5kIGRhdGEgdG8gb3RoZXIgcGx1Z2lucyB1c2luZyB0aGUge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30gYXJyYXkuXG4gKlxuICogYGBganNcbiAqIHBvc3Rjc3MucGx1Z2luKCdwb3N0Y3NzLWNhbml1c2UtdGVzdCcsICgpID0+IHtcbiAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAqICAgICByb290LndhbGtEZWNscyhkZWNsID0+IHtcbiAqICAgICAgIGlmICggIWNhbml1c2Uuc3VwcG9ydChkZWNsLnByb3ApICkge1xuICogICAgICAgICBkZWNsLndhcm4ocmVzdWx0LCAnU29tZSBicm93c2VycyBkbyBub3Qgc3VwcG9ydCAnICsgZGVjbC5wcm9wKTtcbiAqICAgICAgIH1cbiAqICAgICB9KTtcbiAqICAgfTtcbiAqIH0pO1xuICogYGBgXG4gKlxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWUgICAgICAgICAgLSBQb3N0Q1NTIHBsdWdpbiBuYW1lLiBTYW1lIGFzIGluIGBuYW1lYFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9wZXJ0eSBpbiBgcGFja2FnZS5qc29uYC4gSXQgd2lsbCBiZSBzYXZlZFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbiBgcGx1Z2luLnBvc3Rjc3NQbHVnaW5gIHByb3BlcnR5LlxuICogQHBhcmFtIHtmdW5jdGlvbn0gaW5pdGlhbGl6ZXIgLSB3aWxsIHJlY2VpdmUgcGx1Z2luIG9wdGlvbnNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYW5kIHNob3VsZCByZXR1cm4ge0BsaW5rIHBsdWdpbkZ1bmN0aW9ufVxuICpcbiAqIEByZXR1cm4ge1BsdWdpbn0gUG9zdENTUyBwbHVnaW5cbiAqL1xucG9zdGNzcy5wbHVnaW4gPSBmdW5jdGlvbiBwbHVnaW4obmFtZSwgaW5pdGlhbGl6ZXIpIHtcbiAgICBsZXQgY3JlYXRvciA9IGZ1bmN0aW9uICguLi5hcmdzKSB7XG4gICAgICAgIGxldCB0cmFuc2Zvcm1lciA9IGluaXRpYWxpemVyKC4uLmFyZ3MpO1xuICAgICAgICB0cmFuc2Zvcm1lci5wb3N0Y3NzUGx1Z2luICA9IG5hbWU7XG4gICAgICAgIHRyYW5zZm9ybWVyLnBvc3Rjc3NWZXJzaW9uID0gKG5ldyBQcm9jZXNzb3IoKSkudmVyc2lvbjtcbiAgICAgICAgcmV0dXJuIHRyYW5zZm9ybWVyO1xuICAgIH07XG5cbiAgICBsZXQgY2FjaGU7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KGNyZWF0b3IsICdwb3N0Y3NzJywge1xuICAgICAgICBnZXQoKSB7XG4gICAgICAgICAgICBpZiAoICFjYWNoZSApIGNhY2hlID0gY3JlYXRvcigpO1xuICAgICAgICAgICAgcmV0dXJuIGNhY2hlO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBjcmVhdG9yLnByb2Nlc3MgPSBmdW5jdGlvbiAoY3NzLCBwcm9jZXNzT3B0cywgcGx1Z2luT3B0cykge1xuICAgICAgICByZXR1cm4gcG9zdGNzcyhbIGNyZWF0b3IocGx1Z2luT3B0cykgXSkucHJvY2Vzcyhjc3MsIHByb2Nlc3NPcHRzKTtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGNyZWF0b3I7XG59O1xuXG4vKipcbiAqIERlZmF1bHQgZnVuY3Rpb24gdG8gY29udmVydCBhIG5vZGUgdHJlZSBpbnRvIGEgQ1NTIHN0cmluZy5cbiAqXG4gKiBAcGFyYW0ge05vZGV9IG5vZGUgICAgICAgLSBzdGFydCBub2RlIGZvciBzdHJpbmdpZmluZy4gVXN1YWxseSB7QGxpbmsgUm9vdH0uXG4gKiBAcGFyYW0ge2J1aWxkZXJ9IGJ1aWxkZXIgLSBmdW5jdGlvbiB0byBjb25jYXRlbmF0ZSBDU1MgZnJvbSBub2Rl4oCZcyBwYXJ0c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgb3IgZ2VuZXJhdGUgc3RyaW5nIGFuZCBzb3VyY2UgbWFwXG4gKlxuICogQHJldHVybiB7dm9pZH1cbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xucG9zdGNzcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG5cbi8qKlxuICogUGFyc2VzIHNvdXJjZSBjc3MgYW5kIHJldHVybnMgYSBuZXcge0BsaW5rIFJvb3R9IG5vZGUsXG4gKiB3aGljaCBjb250YWlucyB0aGUgc291cmNlIENTUyBub2Rlcy5cbiAqXG4gKiBAcGFyYW0ge3N0cmluZ3x0b1N0cmluZ30gY3NzICAgLSBzdHJpbmcgd2l0aCBpbnB1dCBDU1Mgb3IgYW55IG9iamVjdFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0b1N0cmluZygpIG1ldGhvZCwgbGlrZSBhIEJ1ZmZlclxuICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gW29wdHNdIC0gb3B0aW9ucyB3aXRoIG9ubHkgYGZyb21gIGFuZCBgbWFwYCBrZXlzXG4gKlxuICogQHJldHVybiB7Um9vdH0gUG9zdENTUyBBU1RcbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gU2ltcGxlIENTUyBjb25jYXRlbmF0aW9uIHdpdGggc291cmNlIG1hcCBzdXBwb3J0XG4gKiBjb25zdCByb290MSA9IHBvc3Rjc3MucGFyc2UoY3NzMSwgeyBmcm9tOiBmaWxlMSB9KTtcbiAqIGNvbnN0IHJvb3QyID0gcG9zdGNzcy5wYXJzZShjc3MyLCB7IGZyb206IGZpbGUyIH0pO1xuICogcm9vdDEuYXBwZW5kKHJvb3QyKS50b1Jlc3VsdCgpLmNzcztcbiAqXG4gKiBAZnVuY3Rpb25cbiAqL1xucG9zdGNzcy5wYXJzZSA9IHBhcnNlO1xuXG4vKipcbiAqIEBtZW1iZXIge3ZlbmRvcn0gLSBDb250YWlucyB0aGUge0BsaW5rIHZlbmRvcn0gbW9kdWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLnZlbmRvci51bnByZWZpeGVkKCctbW96LXRhYicpIC8vPT4gWyd0YWInXVxuICovXG5wb3N0Y3NzLnZlbmRvciA9IHZlbmRvcjtcblxuLyoqXG4gKiBAbWVtYmVyIHtsaXN0fSAtIENvbnRhaW5zIHRoZSB7QGxpbmsgbGlzdH0gbW9kdWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLmxpc3Quc3BhY2UoJzVweCBjYWxjKDEwJSArIDVweCknKSAvLz0+IFsnNXB4JywgJ2NhbGMoMTAlICsgNXB4KSddXG4gKi9cbnBvc3Rjc3MubGlzdCA9IGxpc3Q7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgQ29tbWVudH0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtDb21tZW50fSBuZXcgQ29tbWVudCBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuY29tbWVudCh7IHRleHQ6ICd0ZXN0JyB9KVxuICovXG5wb3N0Y3NzLmNvbW1lbnQgPSBkZWZhdWx0cyA9PiBuZXcgQ29tbWVudChkZWZhdWx0cyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgQXRSdWxlfSBub2RlLlxuICpcbiAqIEBwYXJhbSB7b2JqZWN0fSBbZGVmYXVsdHNdIC0gcHJvcGVydGllcyBmb3IgdGhlIG5ldyBub2RlLlxuICpcbiAqIEByZXR1cm4ge0F0UnVsZX0gbmV3IEF0UnVsZSBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MuYXRSdWxlKHsgbmFtZTogJ2NoYXJzZXQnIH0pLnRvU3RyaW5nKCkgLy89PiBcIkBjaGFyc2V0XCJcbiAqL1xucG9zdGNzcy5hdFJ1bGUgPSBkZWZhdWx0cyA9PiBuZXcgQXRSdWxlKGRlZmF1bHRzKTtcblxuLyoqXG4gKiBDcmVhdGVzIGEgbmV3IHtAbGluayBEZWNsYXJhdGlvbn0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtEZWNsYXJhdGlvbn0gbmV3IERlY2xhcmF0aW9uIG5vZGVcbiAqXG4gKiBAZXhhbXBsZVxuICogcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdyZWQnIH0pLnRvU3RyaW5nKCkgLy89PiBcImNvbG9yOiByZWRcIlxuICovXG5wb3N0Y3NzLmRlY2wgPSBkZWZhdWx0cyA9PiBuZXcgRGVjbGFyYXRpb24oZGVmYXVsdHMpO1xuXG4vKipcbiAqIENyZWF0ZXMgYSBuZXcge0BsaW5rIFJ1bGV9IG5vZGUuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gLSBwcm9wZXJ0aWVzIGZvciB0aGUgbmV3IG5vZGUuXG4gKlxuICogQHJldHVybiB7UnVsZX0gbmV3IFJ1bGUgbm9kZVxuICpcbiAqIEBleGFtcGxlXG4gKiBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnIH0pLnRvU3RyaW5nKCkgLy89PiBcImEge1xcbn1cIlxuICovXG5wb3N0Y3NzLnJ1bGUgPSBkZWZhdWx0cyA9PiBuZXcgUnVsZShkZWZhdWx0cyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyB7QGxpbmsgUm9vdH0gbm9kZS5cbiAqXG4gKiBAcGFyYW0ge29iamVjdH0gW2RlZmF1bHRzXSAtIHByb3BlcnRpZXMgZm9yIHRoZSBuZXcgbm9kZS5cbiAqXG4gKiBAcmV0dXJuIHtSb290fSBuZXcgUm9vdCBub2RlXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3Mucm9vdCh7IGFmdGVyOiAnXFxuJyB9KS50b1N0cmluZygpIC8vPT4gXCJcXG5cIlxuICovXG5wb3N0Y3NzLnJvb3QgPSBkZWZhdWx0cyA9PiBuZXcgUm9vdChkZWZhdWx0cyk7XG5cbmV4cG9ydCBkZWZhdWx0IHBvc3Rjc3M7XG4iXX0=

}, function(modId) {var map = {"./declaration":1625038544318,"./processor":1625038544328,"./stringify":1625038544326,"./comment":1625038544335,"./at-rule":1625038544336,"./vendor":1625038544341,"./parse":1625038544333,"./list":1625038544339,"./rule":1625038544338,"./root":1625038544340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544318, function(require, module, exports) {


exports.__esModule = true;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a CSS declaration.
 *
 * @extends Node
 *
 * @example
 * const root = postcss.parse('a { color: black }');
 * const decl = root.first.first;
 * decl.type       //=> 'decl'
 * decl.toString() //=> ' color: black'
 */
var Declaration = function (_Node) {
  _inherits(Declaration, _Node);

  function Declaration(defaults) {
    _classCallCheck(this, Declaration);

    var _this = _possibleConstructorReturn(this, _Node.call(this, defaults));

    _this.type = 'decl';
    return _this;
  }

  /**
   * @memberof Declaration#
   * @member {string} prop - the declaration’s property name
   *
   * @example
   * const root = postcss.parse('a { color: black }');
   * const decl = root.first.first;
   * decl.prop //=> 'color'
   */

  /**
   * @memberof Declaration#
   * @member {string} value - the declaration’s value
   *
   * @example
   * const root = postcss.parse('a { color: black }');
   * const decl = root.first.first;
   * decl.value //=> 'black'
   */

  /**
   * @memberof Declaration#
   * @member {boolean} important - `true` if the declaration
   *                               has an !important annotation.
   *
   * @example
   * const root = postcss.parse('a { color: black !important; color: red }');
   * root.first.first.important //=> true
   * root.first.last.important  //=> undefined
   */

  /**
   * @memberof Declaration#
   * @member {object} raws - Information to generate byte-to-byte equal
   *                         node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `between`: the symbols between the property and value
   *   for declarations.
   * * `important`: the content of the important statement,
   *   if it is not just `!important`.
   *
   * PostCSS cleans declaration from comments and extra spaces,
   * but it stores origin content in raws properties.
   * As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('a {\n  color:black\n}')
   * root.first.first.raws //=> { before: '\n  ', between: ':' }
   */

  return Declaration;
}(_node2.default);

exports.default = Declaration;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlY2xhcmF0aW9uLmVzNiJdLCJuYW1lcyI6WyJEZWNsYXJhdGlvbiIsImRlZmF1bHRzIiwidHlwZSIsIk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7O0lBV01BLFc7OztBQUVGLHVCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsaURBQ2xCLGlCQUFNQSxRQUFOLENBRGtCOztBQUVsQixVQUFLQyxJQUFMLEdBQVksTUFBWjtBQUZrQjtBQUdyQjs7QUFFRDs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBdENzQkMsYzs7a0JBaUVYSCxXIiwiZmlsZSI6ImRlY2xhcmF0aW9uLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5vZGUgZnJvbSAnLi9ub2RlJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQ1NTIGRlY2xhcmF0aW9uLlxuICpcbiAqIEBleHRlbmRzIE5vZGVcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2EgeyBjb2xvcjogYmxhY2sgfScpO1xuICogY29uc3QgZGVjbCA9IHJvb3QuZmlyc3QuZmlyc3Q7XG4gKiBkZWNsLnR5cGUgICAgICAgLy89PiAnZGVjbCdcbiAqIGRlY2wudG9TdHJpbmcoKSAvLz0+ICcgY29sb3I6IGJsYWNrJ1xuICovXG5jbGFzcyBEZWNsYXJhdGlvbiBleHRlbmRzIE5vZGUge1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICAgICAgc3VwZXIoZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLnR5cGUgPSAnZGVjbCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gcHJvcCAtIHRoZSBkZWNsYXJhdGlvbuKAmXMgcHJvcGVydHkgbmFtZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayB9Jyk7XG4gICAgICogY29uc3QgZGVjbCA9IHJvb3QuZmlyc3QuZmlyc3Q7XG4gICAgICogZGVjbC5wcm9wIC8vPT4gJ2NvbG9yJ1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdmFsdWUgLSB0aGUgZGVjbGFyYXRpb27igJlzIHZhbHVlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrIH0nKTtcbiAgICAgKiBjb25zdCBkZWNsID0gcm9vdC5maXJzdC5maXJzdDtcbiAgICAgKiBkZWNsLnZhbHVlIC8vPT4gJ2JsYWNrJ1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IGltcG9ydGFudCAtIGB0cnVlYCBpZiB0aGUgZGVjbGFyYXRpb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYXMgYW4gIWltcG9ydGFudCBhbm5vdGF0aW9uLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayAhaW1wb3J0YW50OyBjb2xvcjogcmVkIH0nKTtcbiAgICAgKiByb290LmZpcnN0LmZpcnN0LmltcG9ydGFudCAvLz0+IHRydWVcbiAgICAgKiByb290LmZpcnN0Lmxhc3QuaW1wb3J0YW50ICAvLz0+IHVuZGVmaW5lZFxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIERlY2xhcmF0aW9uI1xuICAgICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyAtIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgc3RyaW5nIGFzIGl0IHdhcyBpbiB0aGUgb3JpZ2luIGlucHV0LlxuICAgICAqXG4gICAgICogRXZlcnkgcGFyc2VyIHNhdmVzIGl0cyBvd24gcHJvcGVydGllcyxcbiAgICAgKiBidXQgdGhlIGRlZmF1bHQgQ1NTIHBhcnNlciB1c2VzOlxuICAgICAqXG4gICAgICogKiBgYmVmb3JlYDogdGhlIHNwYWNlIHN5bWJvbHMgYmVmb3JlIHRoZSBub2RlLiBJdCBhbHNvIHN0b3JlcyBgKmBcbiAgICAgKiAgIGFuZCBgX2Agc3ltYm9scyBiZWZvcmUgdGhlIGRlY2xhcmF0aW9uIChJRSBoYWNrKS5cbiAgICAgKiAqIGBiZXR3ZWVuYDogdGhlIHN5bWJvbHMgYmV0d2VlbiB0aGUgcHJvcGVydHkgYW5kIHZhbHVlXG4gICAgICogICBmb3IgZGVjbGFyYXRpb25zLlxuICAgICAqICogYGltcG9ydGFudGA6IHRoZSBjb250ZW50IG9mIHRoZSBpbXBvcnRhbnQgc3RhdGVtZW50LFxuICAgICAqICAgaWYgaXQgaXMgbm90IGp1c3QgYCFpbXBvcnRhbnRgLlxuICAgICAqXG4gICAgICogUG9zdENTUyBjbGVhbnMgZGVjbGFyYXRpb24gZnJvbSBjb21tZW50cyBhbmQgZXh0cmEgc3BhY2VzLFxuICAgICAqIGJ1dCBpdCBzdG9yZXMgb3JpZ2luIGNvbnRlbnQgaW4gcmF3cyBwcm9wZXJ0aWVzLlxuICAgICAqIEFzIHN1Y2gsIGlmIHlvdSBkb27igJl0IGNoYW5nZSBhIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZSxcbiAgICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2Ege1xcbiAgY29sb3I6YmxhY2tcXG59JylcbiAgICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJ1xcbiAgJywgYmV0d2VlbjogJzonIH1cbiAgICAgKi9cblxufVxuXG5leHBvcnQgZGVmYXVsdCBEZWNsYXJhdGlvbjtcbiJdfQ==

}, function(modId) { var map = {"./node":1625038544319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544319, function(require, module, exports) {


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _cssSyntaxError = require('./css-syntax-error');

var _cssSyntaxError2 = _interopRequireDefault(_cssSyntaxError);

var _stringifier = require('./stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

var _stringify = require('./stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _warnOnce = require('./warn-once');

var _warnOnce2 = _interopRequireDefault(_warnOnce);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var cloneNode = function cloneNode(obj, parent) {
    var cloned = new obj.constructor();

    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) continue;
        var value = obj[i];
        var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        if (i === 'parent' && type === 'object') {
            if (parent) cloned[i] = parent;
        } else if (i === 'source') {
            cloned[i] = value;
        } else if (value instanceof Array) {
            cloned[i] = value.map(function (j) {
                return cloneNode(j, cloned);
            });
        } else {
            if (type === 'object' && value !== null) value = cloneNode(value);
            cloned[i] = value;
        }
    }

    return cloned;
};

/**
 * All node classes inherit the following common methods.
 *
 * @abstract
 */

var Node = function () {

    /**
     * @param {object} [defaults] - value for node properties
     */
    function Node() {
        var defaults = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Node);

        this.raws = {};
        if ((typeof defaults === 'undefined' ? 'undefined' : _typeof(defaults)) !== 'object' && typeof defaults !== 'undefined') {
            throw new Error('PostCSS nodes constructor accepts object, not ' + JSON.stringify(defaults));
        }
        for (var name in defaults) {
            this[name] = defaults[name];
        }
    }

    /**
     * Returns a CssSyntaxError instance containing the original position
     * of the node in the source, showing line and column numbers and also
     * a small excerpt to facilitate debugging.
     *
     * If present, an input source map will be used to get the original position
     * of the source, even from a previous compilation step
     * (e.g., from Sass compilation).
     *
     * This method produces very useful error messages.
     *
     * @param {string} message     - error description
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this error.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the error
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the error
     *
     * @return {CssSyntaxError} error object to throw it
     *
     * @example
     * if ( !variables[name] ) {
     *   throw decl.error('Unknown variable ' + name, { word: name });
     *   // CssSyntaxError: postcss-vars:a.sass:4:3: Unknown variable $black
     *   //   color: $black
     *   // a
     *   //          ^
     *   //   background: white
     * }
     */


    Node.prototype.error = function error(message) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (this.source) {
            var pos = this.positionBy(opts);
            return this.source.input.error(message, pos.line, pos.column, opts);
        } else {
            return new _cssSyntaxError2.default(message);
        }
    };

    /**
     * This method is provided as a convenience wrapper for {@link Result#warn}.
     *
     * @param {Result} result      - the {@link Result} instance
     *                               that will receive the warning
     * @param {string} text        - warning message
     * @param {object} [opts]      - options
     * @param {string} opts.plugin - plugin name that created this warning.
     *                               PostCSS will set it automatically.
     * @param {string} opts.word   - a word inside a node’s string that should
     *                               be highlighted as the source of the warning
     * @param {number} opts.index  - an index inside a node’s string that should
     *                               be highlighted as the source of the warning
     *
     * @return {Warning} created warning object
     *
     * @example
     * const plugin = postcss.plugin('postcss-deprecated', () => {
     *   return (root, result) => {
     *     root.walkDecls('bad', decl => {
     *       decl.warn(result, 'Deprecated property bad');
     *     });
     *   };
     * });
     */


    Node.prototype.warn = function warn(result, text, opts) {
        var data = { node: this };
        for (var i in opts) {
            data[i] = opts[i];
        }return result.warn(text, data);
    };

    /**
     * Removes the node from its parent and cleans the parent properties
     * from the node and its children.
     *
     * @example
     * if ( decl.prop.match(/^-webkit-/) ) {
     *   decl.remove();
     * }
     *
     * @return {Node} node to make calls chain
     */


    Node.prototype.remove = function remove() {
        if (this.parent) {
            this.parent.removeChild(this);
        }
        this.parent = undefined;
        return this;
    };

    /**
     * Returns a CSS string representing the node.
     *
     * @param {stringifier|syntax} [stringifier] - a syntax to use
     *                                             in string generation
     *
     * @return {string} CSS string of this node
     *
     * @example
     * postcss.rule({ selector: 'a' }).toString() //=> "a {}"
     */


    Node.prototype.toString = function toString() {
        var stringifier = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : _stringify2.default;

        if (stringifier.stringify) stringifier = stringifier.stringify;
        var result = '';
        stringifier(this, function (i) {
            result += i;
        });
        return result;
    };

    /**
     * Returns a clone of the node.
     *
     * The resulting cloned node and its (cloned) children will have
     * a clean parent and code style properties.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @example
     * const cloned = decl.clone({ prop: '-moz-' + decl.prop });
     * cloned.raws.before  //=> undefined
     * cloned.parent       //=> undefined
     * cloned.toString()   //=> -moz-transform: scale(0)
     *
     * @return {Node} clone of the node
     */


    Node.prototype.clone = function clone() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = cloneNode(this);
        for (var name in overrides) {
            cloned[name] = overrides[name];
        }
        return cloned;
    };

    /**
     * Shortcut to clone the node and insert the resulting cloned node
     * before the current node.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @example
     * decl.cloneBefore({ prop: '-moz-' + decl.prop });
     *
     * @return {Node} - new node
     */


    Node.prototype.cloneBefore = function cloneBefore() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = this.clone(overrides);
        this.parent.insertBefore(this, cloned);
        return cloned;
    };

    /**
     * Shortcut to clone the node and insert the resulting cloned node
     * after the current node.
     *
     * @param {object} [overrides] - new properties to override in the clone.
     *
     * @return {Node} - new node
     */


    Node.prototype.cloneAfter = function cloneAfter() {
        var overrides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var cloned = this.clone(overrides);
        this.parent.insertAfter(this, cloned);
        return cloned;
    };

    /**
     * Inserts node(s) before the current node and removes the current node.
     *
     * @param {...Node} nodes - node(s) to replace current one
     *
     * @example
     * if ( atrule.name == 'mixin' ) {
     *   atrule.replaceWith(mixinRules[atrule.params]);
     * }
     *
     * @return {Node} current node to methods chain
     */


    Node.prototype.replaceWith = function replaceWith() {
        if (this.parent) {
            for (var _len = arguments.length, nodes = Array(_len), _key = 0; _key < _len; _key++) {
                nodes[_key] = arguments[_key];
            }

            for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                var _ref;

                if (_isArray) {
                    if (_i >= _iterator.length) break;
                    _ref = _iterator[_i++];
                } else {
                    _i = _iterator.next();
                    if (_i.done) break;
                    _ref = _i.value;
                }

                var node = _ref;

                this.parent.insertBefore(this, node);
            }

            this.remove();
        }

        return this;
    };

    Node.prototype.moveTo = function moveTo(newParent) {
        (0, _warnOnce2.default)('Node#moveTo was deprecated. Use Container#append.');
        this.cleanRaws(this.root() === newParent.root());
        this.remove();
        newParent.append(this);
        return this;
    };

    Node.prototype.moveBefore = function moveBefore(otherNode) {
        (0, _warnOnce2.default)('Node#moveBefore was deprecated. Use Node#before.');
        this.cleanRaws(this.root() === otherNode.root());
        this.remove();
        otherNode.parent.insertBefore(otherNode, this);
        return this;
    };

    Node.prototype.moveAfter = function moveAfter(otherNode) {
        (0, _warnOnce2.default)('Node#moveAfter was deprecated. Use Node#after.');
        this.cleanRaws(this.root() === otherNode.root());
        this.remove();
        otherNode.parent.insertAfter(otherNode, this);
        return this;
    };

    /**
     * Returns the next child of the node’s parent.
     * Returns `undefined` if the current node is the last child.
     *
     * @return {Node|undefined} next node
     *
     * @example
     * if ( comment.text === 'delete next' ) {
     *   const next = comment.next();
     *   if ( next ) {
     *     next.remove();
     *   }
     * }
     */


    Node.prototype.next = function next() {
        if (!this.parent) return undefined;
        var index = this.parent.index(this);
        return this.parent.nodes[index + 1];
    };

    /**
     * Returns the previous child of the node’s parent.
     * Returns `undefined` if the current node is the first child.
     *
     * @return {Node|undefined} previous node
     *
     * @example
     * const annotation = decl.prev();
     * if ( annotation.type == 'comment' ) {
     *  readAnnotation(annotation.text);
     * }
     */


    Node.prototype.prev = function prev() {
        if (!this.parent) return undefined;
        var index = this.parent.index(this);
        return this.parent.nodes[index - 1];
    };

    /**
     * Insert new node before current node to current node’s parent.
     *
     * Just alias for `node.parent.insertBefore(node, add)`.
     *
     * @param {Node|object|string|Node[]} add - new node
     *
     * @return {Node} this node for methods chain.
     *
     * @example
     * decl.before('content: ""');
     */


    Node.prototype.before = function before(add) {
        this.parent.insertBefore(this, add);
        return this;
    };

    /**
     * Insert new node after current node to current node’s parent.
     *
     * Just alias for `node.parent.insertAfter(node, add)`.
     *
     * @param {Node|object|string|Node[]} add - new node
     *
     * @return {Node} this node for methods chain.
     *
     * @example
     * decl.after('color: black');
     */


    Node.prototype.after = function after(add) {
        this.parent.insertAfter(this, add);
        return this;
    };

    Node.prototype.toJSON = function toJSON() {
        var fixed = {};

        for (var name in this) {
            if (!this.hasOwnProperty(name)) continue;
            if (name === 'parent') continue;
            var value = this[name];

            if (value instanceof Array) {
                fixed[name] = value.map(function (i) {
                    if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && i.toJSON) {
                        return i.toJSON();
                    } else {
                        return i;
                    }
                });
            } else if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.toJSON) {
                fixed[name] = value.toJSON();
            } else {
                fixed[name] = value;
            }
        }

        return fixed;
    };

    /**
     * Returns a {@link Node#raws} value. If the node is missing
     * the code style property (because the node was manually built or cloned),
     * PostCSS will try to autodetect the code style property by looking
     * at other nodes in the tree.
     *
     * @param {string} prop          - name of code style property
     * @param {string} [defaultType] - name of default value, it can be missed
     *                                 if the value is the same as prop
     *
     * @example
     * const root = postcss.parse('a { background: white }');
     * root.nodes[0].append({ prop: 'color', value: 'black' });
     * root.nodes[0].nodes[1].raws.before   //=> undefined
     * root.nodes[0].nodes[1].raw('before') //=> ' '
     *
     * @return {string} code style value
     */


    Node.prototype.raw = function raw(prop, defaultType) {
        var str = new _stringifier2.default();
        return str.raw(this, prop, defaultType);
    };

    /**
     * Finds the Root instance of the node’s tree.
     *
     * @example
     * root.nodes[0].nodes[0].root() === root
     *
     * @return {Root} root parent
     */


    Node.prototype.root = function root() {
        var result = this;
        while (result.parent) {
            result = result.parent;
        }return result;
    };

    Node.prototype.cleanRaws = function cleanRaws(keepBetween) {
        delete this.raws.before;
        delete this.raws.after;
        if (!keepBetween) delete this.raws.between;
    };

    Node.prototype.positionInside = function positionInside(index) {
        var string = this.toString();
        var column = this.source.start.column;
        var line = this.source.start.line;

        for (var i = 0; i < index; i++) {
            if (string[i] === '\n') {
                column = 1;
                line += 1;
            } else {
                column += 1;
            }
        }

        return { line: line, column: column };
    };

    Node.prototype.positionBy = function positionBy(opts) {
        var pos = this.source.start;
        if (opts.index) {
            pos = this.positionInside(opts.index);
        } else if (opts.word) {
            var index = this.toString().indexOf(opts.word);
            if (index !== -1) pos = this.positionInside(index);
        }
        return pos;
    };

    /**
     * @memberof Node#
     * @member {string} type - String representing the node’s type.
     *                         Possible values are `root`, `atrule`, `rule`,
     *                         `decl`, or `comment`.
     *
     * @example
     * postcss.decl({ prop: 'color', value: 'black' }).type //=> 'decl'
     */

    /**
     * @memberof Node#
     * @member {Container} parent - the node’s parent node.
     *
     * @example
     * root.nodes[0].parent == root;
     */

    /**
     * @memberof Node#
     * @member {source} source - the input source of the node
     *
     * The property is used in source map generation.
     *
     * If you create a node manually (e.g., with `postcss.decl()`),
     * that node will not have a `source` property and will be absent
     * from the source map. For this reason, the plugin developer should
     * consider cloning nodes to create new ones (in which case the new node’s
     * source will reference the original, cloned node) or setting
     * the `source` property manually.
     *
     * ```js
     * // Bad
     * const prefixed = postcss.decl({
     *   prop: '-moz-' + decl.prop,
     *   value: decl.value
     * });
     *
     * // Good
     * const prefixed = decl.clone({ prop: '-moz-' + decl.prop });
     * ```
     *
     * ```js
     * if ( atrule.name == 'add-link' ) {
     *   const rule = postcss.rule({ selector: 'a', source: atrule.source });
     *   atrule.parent.insertBefore(atrule, rule);
     * }
     * ```
     *
     * @example
     * decl.source.input.from //=> '/home/ai/a.sass'
     * decl.source.start      //=> { line: 10, column: 2 }
     * decl.source.end        //=> { line: 10, column: 12 }
     */

    /**
     * @memberof Node#
     * @member {object} raws - Information to generate byte-to-byte equal
     *                         node string as it was in the origin input.
     *
     * Every parser saves its own properties,
     * but the default CSS parser uses:
     *
     * * `before`: the space symbols before the node. It also stores `*`
     *   and `_` symbols before the declaration (IE hack).
     * * `after`: the space symbols after the last child of the node
     *   to the end of the node.
     * * `between`: the symbols between the property and value
     *   for declarations, selector and `{` for rules, or last parameter
     *   and `{` for at-rules.
     * * `semicolon`: contains true if the last child has
     *   an (optional) semicolon.
     * * `afterName`: the space between the at-rule name and its parameters.
     * * `left`: the space symbols between `/*` and the comment’s text.
     * * `right`: the space symbols between the comment’s text
     *   and <code>*&#47;</code>.
     * * `important`: the content of the important statement,
     *   if it is not just `!important`.
     *
     * PostCSS cleans selectors, declaration values and at-rule parameters
     * from comments and extra spaces, but it stores origin content in raws
     * properties. As such, if you don’t change a declaration’s value,
     * PostCSS will use the raw value with comments.
     *
     * @example
     * const root = postcss.parse('a {\n  color:black\n}')
     * root.first.first.raws //=> { before: '\n  ', between: ':' }
     */

    return Node;
}();

exports.default = Node;

/**
 * @typedef {object} position
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

/**
 * @typedef {object} source
 * @property {Input} input    - {@link Input} with input file
 * @property {position} start - The starting position of the node’s source
 * @property {position} end   - The ending position of the node’s source
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGUuZXM2Il0sIm5hbWVzIjpbImNsb25lTm9kZSIsIm9iaiIsInBhcmVudCIsImNsb25lZCIsImNvbnN0cnVjdG9yIiwiaSIsImhhc093blByb3BlcnR5IiwidmFsdWUiLCJ0eXBlIiwiQXJyYXkiLCJtYXAiLCJqIiwiTm9kZSIsImRlZmF1bHRzIiwicmF3cyIsIkVycm9yIiwiSlNPTiIsInN0cmluZ2lmeSIsIm5hbWUiLCJlcnJvciIsIm1lc3NhZ2UiLCJvcHRzIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImlucHV0IiwibGluZSIsImNvbHVtbiIsIkNzc1N5bnRheEVycm9yIiwid2FybiIsInJlc3VsdCIsInRleHQiLCJkYXRhIiwibm9kZSIsInJlbW92ZSIsInJlbW92ZUNoaWxkIiwidW5kZWZpbmVkIiwidG9TdHJpbmciLCJzdHJpbmdpZmllciIsImNsb25lIiwib3ZlcnJpZGVzIiwiY2xvbmVCZWZvcmUiLCJpbnNlcnRCZWZvcmUiLCJjbG9uZUFmdGVyIiwiaW5zZXJ0QWZ0ZXIiLCJyZXBsYWNlV2l0aCIsIm5vZGVzIiwibW92ZVRvIiwibmV3UGFyZW50IiwiY2xlYW5SYXdzIiwicm9vdCIsImFwcGVuZCIsIm1vdmVCZWZvcmUiLCJvdGhlck5vZGUiLCJtb3ZlQWZ0ZXIiLCJuZXh0IiwiaW5kZXgiLCJwcmV2IiwiYmVmb3JlIiwiYWRkIiwiYWZ0ZXIiLCJ0b0pTT04iLCJmaXhlZCIsInJhdyIsInByb3AiLCJkZWZhdWx0VHlwZSIsInN0ciIsIlN0cmluZ2lmaWVyIiwia2VlcEJldHdlZW4iLCJiZXR3ZWVuIiwicG9zaXRpb25JbnNpZGUiLCJzdHJpbmciLCJzdGFydCIsIndvcmQiLCJpbmRleE9mIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxJQUFJQSxZQUFZLFNBQVpBLFNBQVksQ0FBVUMsR0FBVixFQUFlQyxNQUFmLEVBQXVCO0FBQ25DLFFBQUlDLFNBQVMsSUFBSUYs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LElBQW5CLEVBQTBCO0FBQ3RCc0IseUJBQVMsQ0FBVDtBQUNBRCx3QkFBUyxDQUFUO0FBQ0gsYUFIRCxNQUdPO0FBQ0hDLDBCQUFVLENBQVY7QUFDSDtBQUNKOztBQUVELGVBQU8sRUFBRUQsVUFBRixFQUFRQyxjQUFSLEVBQVA7QUFDSCxLOzttQkFFREgsVSx1QkFBV0gsSSxFQUFNO0FBQ2IsWUFBSUUsTUFBTSxLQUFLRCxNQUFMLENBQVlrRCxLQUF0QjtBQUNBLFlBQUtuRCxLQUFLbUMsS0FBVixFQUFrQjtBQUNkakMsa0JBQU0sS0FBSytDLGNBQUwsQ0FBb0JqRCxLQUFLbUMsS0FBekIsQ0FBTjtBQUNILFNBRkQsTUFFTyxJQUFLbkMsS0FBS29ELElBQVYsRUFBaUI7QUFDcEIsZ0JBQUlqQixRQUFRLEtBQUtuQixRQUFMLEdBQWdCcUMsT0FBaEIsQ0FBd0JyRCxLQUFLb0QsSUFBN0IsQ0FBWjtBQUNBLGdCQUFLakIsVUFBVSxDQUFDLENBQWhCLEVBQW9CakMsTUFBTSxLQUFLK0MsY0FBTCxDQUFvQmQsS0FBcEIsQ0FBTjtBQUN2QjtBQUNELGVBQU9qQyxHQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs7OztBQVVBOzs7Ozs7OztBQVFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQW9DV1gsSTs7QUFFZjs7Ozs7O0FBTUEiLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDc3NTeW50YXhFcnJvciBmcm9tICcuL2Nzcy1zeW50YXgtZXJyb3InO1xuaW1wb3J0IFN0cmluZ2lmaWVyICAgIGZyb20gJy4vc3RyaW5naWZpZXInO1xuaW1wb3J0IHN0cmluZ2lmeSAgICAgIGZyb20gJy4vc3RyaW5naWZ5JztcbmltcG9ydCB3YXJuT25jZSAgICAgICBmcm9tICcuL3dhcm4tb25jZSc7XG5cbmxldCBjbG9uZU5vZGUgPSBmdW5jdGlvbiAob2JqLCBwYXJlbnQpIHtcbiAgICBsZXQgY2xvbmVkID0gbmV3IG9iai5jb25zdHJ1Y3RvcigpO1xuXG4gICAgZm9yICggbGV0IGkgaW4gb2JqICkge1xuICAgICAgICBpZiAoICFvYmouaGFzT3duUHJvcGVydHkoaSkgKSBjb250aW51ZTtcbiAgICAgICAgbGV0IHZhbHVlID0gb2JqW2ldO1xuICAgICAgICBsZXQgdHlwZSAgPSB0eXBlb2YgdmFsdWU7XG5cbiAgICAgICAgaWYgKCBpID09PSAncGFyZW50JyAmJiB0eXBlID09PSAnb2JqZWN0JyApIHtcbiAgICAgICAgICAgIGlmIChwYXJlbnQpIGNsb25lZFtpXSA9IHBhcmVudDtcbiAgICAgICAgfSBlbHNlIGlmICggaSA9PT0gJ3NvdXJjZScgKSB7XG4gICAgICAgICAgICBjbG9uZWRbaV0gPSB2YWx1ZTtcbiAgICAgICAgfSBlbHNlIGlmICggdmFsdWUgaW5zdGFuY2VvZiBBcnJheSApIHtcbiAgICAgICAgICAgIGNsb25lZFtpXSA9IHZhbHVlLm1hcCggaiA9PiBjbG9uZU5vZGUoaiwgY2xvbmVkKSApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAhPT0gbnVsbCApIHZhbHVlID0gY2xvbmVOb2RlKHZhbHVlKTtcbiAgICAgICAgICAgIGNsb25lZFtpXSA9IHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNsb25lZDtcbn07XG5cbi8qKlxuICogQWxsIG5vZGUgY2xhc3NlcyBpbmhlcml0IHRoZSBmb2xsb3dpbmcgY29tbW9uIG1ldGhvZHMuXG4gKlxuICogQGFic3RyYWN0XG4gKi9cbmNsYXNzIE5vZGUge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtvYmplY3R9IFtkZWZhdWx0c10gLSB2YWx1ZSBmb3Igbm9kZSBwcm9wZXJ0aWVzXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdHMgPSB7IH0pIHtcbiAgICAgICAgdGhpcy5yYXdzID0geyB9O1xuICAgICAgICBpZiAoIHR5cGVvZiBkZWZhdWx0cyAhPT0gJ29iamVjdCcgJiYgdHlwZW9mIGRlZmF1bHRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICAnUG9zdENTUyBub2RlcyBjb25zdHJ1Y3RvciBhY2NlcHRzIG9iamVjdCwgbm90ICcgK1xuICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KGRlZmF1bHRzKSk7XG4gICAgICAgIH1cbiAgICAgICAgZm9yICggbGV0IG5hbWUgaW4gZGVmYXVsdHMgKSB7XG4gICAgICAgICAgICB0aGlzW25hbWVdID0gZGVmYXVsdHNbbmFtZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgQ3NzU3ludGF4RXJyb3IgaW5zdGFuY2UgY29udGFpbmluZyB0aGUgb3JpZ2luYWwgcG9zaXRpb25cbiAgICAgKiBvZiB0aGUgbm9kZSBpbiB0aGUgc291cmNlLCBzaG93aW5nIGxpbmUgYW5kIGNvbHVtbiBudW1iZXJzIGFuZCBhbHNvXG4gICAgICogYSBzbWFsbCBleGNlcnB0IHRvIGZhY2lsaXRhdGUgZGVidWdnaW5nLlxuICAgICAqXG4gICAgICogSWYgcHJlc2VudCwgYW4gaW5wdXQgc291cmNlIG1hcCB3aWxsIGJlIHVzZWQgdG8gZ2V0IHRoZSBvcmlnaW5hbCBwb3NpdGlvblxuICAgICAqIG9mIHRoZSBzb3VyY2UsIGV2ZW4gZnJvbSBhIHByZXZpb3VzIGNvbXBpbGF0aW9uIHN0ZXBcbiAgICAgKiAoZS5nLiwgZnJvbSBTYXNzIGNvbXBpbGF0aW9uKS5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIHByb2R1Y2VzIHZlcnkgdXNlZnVsIGVycm9yIG1lc3NhZ2VzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG1lc3NhZ2UgICAgIC0gZXJyb3IgZGVzY3JpcHRpb25cbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdHNdICAgICAgLSBvcHRpb25zXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMucGx1Z2luIC0gcGx1Z2luIG5hbWUgdGhhdCBjcmVhdGVkIHRoaXMgZXJyb3IuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zdENTUyB3aWxsIHNldCBpdCBhdXRvbWF0aWNhbGx5LlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICAtIGEgd29yZCBpbnNpZGUgYSBub2Rl4oCZcyBzdHJpbmcgdGhhdCBzaG91bGRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiZSBoaWdobGlnaHRlZCBhcyB0aGUgc291cmNlIG9mIHRoZSBlcnJvclxuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICAtIGFuIGluZGV4IGluc2lkZSBhIG5vZGXigJlzIHN0cmluZyB0aGF0IHNob3VsZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIGVycm9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtDc3NTeW50YXhFcnJvcn0gZXJyb3Igb2JqZWN0IHRvIHRocm93IGl0XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGlmICggIXZhcmlhYmxlc1tuYW1lXSApIHtcbiAgICAgKiAgIHRocm93IGRlY2wuZXJyb3IoJ1Vua25vd24gdmFyaWFibGUgJyArIG5hbWUsIHsgd29yZDogbmFtZSB9KTtcbiAgICAgKiAgIC8vIENzc1N5bnRheEVycm9yOiBwb3N0Y3NzLXZhcnM6YS5zYXNzOjQ6MzogVW5rbm93biB2YXJpYWJsZSAkYmxhY2tcbiAgICAgKiAgIC8vICAgY29sb3I6ICRibGFja1xuICAgICAqICAgLy8gYVxuICAgICAqICAgLy8gICAgICAgICAgXlxuICAgICAqICAgLy8gICBiYWNrZ3JvdW5kOiB3aGl0ZVxuICAgICAqIH1cbiAgICAgKi9cbiAgICBlcnJvcihtZXNzYWdlLCBvcHRzID0geyB9KSB7XG4gICAgICAgIGlmICggdGhpcy5zb3VyY2UgKSB7XG4gICAgICAgICAgICBsZXQgcG9zID0gdGhpcy5wb3NpdGlvbkJ5KG9wdHMpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc291cmNlLmlucHV0LmVycm9yKG1lc3NhZ2UsIHBvcy5saW5lLCBwb3MuY29sdW1uLCBvcHRzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgQ3NzU3ludGF4RXJyb3IobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIG1ldGhvZCBpcyBwcm92aWRlZCBhcyBhIGNvbnZlbmllbmNlIHdyYXBwZXIgZm9yIHtAbGluayBSZXN1bHQjd2Fybn0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge1Jlc3VsdH0gcmVzdWx0ICAgICAgLSB0aGUge0BsaW5rIFJlc3VsdH0gaW5zdGFuY2VcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IHdpbGwgcmVjZWl2ZSB0aGUgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0ZXh0ICAgICAgICAtIHdhcm5pbmcgbWVzc2FnZVxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0c10gICAgICAtIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wbHVnaW4gLSBwbHVnaW4gbmFtZSB0aGF0IGNyZWF0ZWQgdGhpcyB3YXJuaW5nLlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBvc3RDU1Mgd2lsbCBzZXQgaXQgYXV0b21hdGljYWxseS5cbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy53b3JkICAgLSBhIHdvcmQgaW5zaWRlIGEgbm9kZeKAmXMgc3RyaW5nIHRoYXQgc2hvdWxkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgaGlnaGxpZ2h0ZWQgYXMgdGhlIHNvdXJjZSBvZiB0aGUgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICAtIGFuIGluZGV4IGluc2lkZSBhIG5vZGXigJlzIHN0cmluZyB0aGF0IHNob3VsZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlIGhpZ2hsaWdodGVkIGFzIHRoZSBzb3VyY2Ugb2YgdGhlIHdhcm5pbmdcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1dhcm5pbmd9IGNyZWF0ZWQgd2FybmluZyBvYmplY3RcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgcGx1Z2luID0gcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtZGVwcmVjYXRlZCcsICgpID0+IHtcbiAgICAgKiAgIHJldHVybiAocm9vdCwgcmVzdWx0KSA9PiB7XG4gICAgICogICAgIHJvb3Qud2Fsa0RlY2xzKCdiYWQnLCBkZWNsID0+IHtcbiAgICAgKiAgICAgICBkZWNsLndhcm4ocmVzdWx0LCAnRGVwcmVjYXRlZCBwcm9wZXJ0eSBiYWQnKTtcbiAgICAgKiAgICAgfSk7XG4gICAgICogICB9O1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHdhcm4ocmVzdWx0LCB0ZXh0LCBvcHRzKSB7XG4gICAgICAgIGxldCBkYXRhID0geyBub2RlOiB0aGlzIH07XG4gICAgICAgIGZvciAoIGxldCBpIGluIG9wdHMgKSBkYXRhW2ldID0gb3B0c1tpXTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdC53YXJuKHRleHQsIGRhdGEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgdGhlIG5vZGUgZnJvbSBpdHMgcGFyZW50IGFuZCBjbGVhbnMgdGhlIHBhcmVudCBwcm9wZXJ0aWVzXG4gICAgICogZnJvbSB0aGUgbm9kZSBhbmQgaXRzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAoIGRlY2wucHJvcC5tYXRjaCgvXi13ZWJraXQtLykgKSB7XG4gICAgICogICBkZWNsLnJlbW92ZSgpO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IG5vZGUgdG8gbWFrZSBjYWxscyBjaGFpblxuICAgICAqL1xuICAgIHJlbW92ZSgpIHtcbiAgICAgICAgaWYgKCB0aGlzLnBhcmVudCApIHtcbiAgICAgICAgICAgIHRoaXMucGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucGFyZW50ID0gdW5kZWZpbmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgQ1NTIHN0cmluZyByZXByZXNlbnRpbmcgdGhlIG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ2lmaWVyfHN5bnRheH0gW3N0cmluZ2lmaWVyXSAtIGEgc3ludGF4IHRvIHVzZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW4gc3RyaW5nIGdlbmVyYXRpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gQ1NTIHN0cmluZyBvZiB0aGlzIG5vZGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy5ydWxlKHsgc2VsZWN0b3I6ICdhJyB9KS50b1N0cmluZygpIC8vPT4gXCJhIHt9XCJcbiAgICAgKi9cbiAgICB0b1N0cmluZyhzdHJpbmdpZmllciA9IHN0cmluZ2lmeSkge1xuICAgICAgICBpZiAoIHN0cmluZ2lmaWVyLnN0cmluZ2lmeSApIHN0cmluZ2lmaWVyID0gc3RyaW5naWZpZXIuc3RyaW5naWZ5O1xuICAgICAgICBsZXQgcmVzdWx0ICA9ICcnO1xuICAgICAgICBzdHJpbmdpZmllcih0aGlzLCBpID0+IHtcbiAgICAgICAgICAgIHJlc3VsdCArPSBpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY2xvbmUgb2YgdGhlIG5vZGUuXG4gICAgICpcbiAgICAgKiBUaGUgcmVzdWx0aW5nIGNsb25lZCBub2RlIGFuZCBpdHMgKGNsb25lZCkgY2hpbGRyZW4gd2lsbCBoYXZlXG4gICAgICogYSBjbGVhbiBwYXJlbnQgYW5kIGNvZGUgc3R5bGUgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3ZlcnJpZGVzXSAtIG5ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgY2xvbmVkID0gZGVjbC5jbG9uZSh7IHByb3A6ICctbW96LScgKyBkZWNsLnByb3AgfSk7XG4gICAgICogY2xvbmVkLnJhd3MuYmVmb3JlICAvLz0+IHVuZGVmaW5lZFxuICAgICAqIGNsb25lZC5wYXJlbnQgICAgICAgLy89PiB1bmRlZmluZWRcbiAgICAgKiBjbG9uZWQudG9TdHJpbmcoKSAgIC8vPT4gLW1vei10cmFuc2Zvcm06IHNjYWxlKDApXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOb2RlfSBjbG9uZSBvZiB0aGUgbm9kZVxuICAgICAqL1xuICAgIGNsb25lKG92ZXJyaWRlcyA9IHsgfSkge1xuICAgICAgICBsZXQgY2xvbmVkID0gY2xvbmVOb2RlKHRoaXMpO1xuICAgICAgICBmb3IgKCBsZXQgbmFtZSBpbiBvdmVycmlkZXMgKSB7XG4gICAgICAgICAgICBjbG9uZWRbbmFtZV0gPSBvdmVycmlkZXNbbmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBTaG9ydGN1dCB0byBjbG9uZSB0aGUgbm9kZSBhbmQgaW5zZXJ0IHRoZSByZXN1bHRpbmcgY2xvbmVkIG5vZGVcbiAgICAgKiBiZWZvcmUgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7b2JqZWN0fSBbb3ZlcnJpZGVzXSAtIG5ldyBwcm9wZXJ0aWVzIHRvIG92ZXJyaWRlIGluIHRoZSBjbG9uZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZGVjbC5jbG9uZUJlZm9yZSh7IHByb3A6ICctbW96LScgKyBkZWNsLnByb3AgfSk7XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOb2RlfSAtIG5ldyBub2RlXG4gICAgICovXG4gICAgY2xvbmVCZWZvcmUob3ZlcnJpZGVzID0geyB9KSB7XG4gICAgICAgIGxldCBjbG9uZWQgPSB0aGlzLmNsb25lKG92ZXJyaWRlcyk7XG4gICAgICAgIHRoaXMucGFyZW50Lmluc2VydEJlZm9yZSh0aGlzLCBjbG9uZWQpO1xuICAgICAgICByZXR1cm4gY2xvbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNob3J0Y3V0IHRvIGNsb25lIHRoZSBub2RlIGFuZCBpbnNlcnQgdGhlIHJlc3VsdGluZyBjbG9uZWQgbm9kZVxuICAgICAqIGFmdGVyIHRoZSBjdXJyZW50IG5vZGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW292ZXJyaWRlc10gLSBuZXcgcHJvcGVydGllcyB0byBvdmVycmlkZSBpbiB0aGUgY2xvbmUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOb2RlfSAtIG5ldyBub2RlXG4gICAgICovXG4gICAgY2xvbmVBZnRlcihvdmVycmlkZXMgPSB7IH0pIHtcbiAgICAgICAgbGV0IGNsb25lZCA9IHRoaXMuY2xvbmUob3ZlcnJpZGVzKTtcbiAgICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QWZ0ZXIodGhpcywgY2xvbmVkKTtcbiAgICAgICAgcmV0dXJuIGNsb25lZDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIG5vZGUocykgYmVmb3JlIHRoZSBjdXJyZW50IG5vZGUgYW5kIHJlbW92ZXMgdGhlIGN1cnJlbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uTm9kZX0gbm9kZXMgLSBub2RlKHMpIHRvIHJlcGxhY2UgY3VycmVudCBvbmVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogaWYgKCBhdHJ1bGUubmFtZSA9PSAnbWl4aW4nICkge1xuICAgICAqICAgYXRydWxlLnJlcGxhY2VXaXRoKG1peGluUnVsZXNbYXRydWxlLnBhcmFtc10pO1xuICAgICAqIH1cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IGN1cnJlbnQgbm9kZSB0byBtZXRob2RzIGNoYWluXG4gICAgICovXG4gICAgcmVwbGFjZVdpdGgoLi4ubm9kZXMpIHtcbiAgICAgICAgaWYgKHRoaXMucGFyZW50KSB7XG4gICAgICAgICAgICBmb3IgKGxldCBub2RlIG9mIG5vZGVzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIG5vZGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgbW92ZVRvKG5ld1BhcmVudCkge1xuICAgICAgICB3YXJuT25jZSgnTm9kZSNtb3ZlVG8gd2FzIGRlcHJlY2F0ZWQuIFVzZSBDb250YWluZXIjYXBwZW5kLicpO1xuICAgICAgICB0aGlzLmNsZWFuUmF3cyh0aGlzLnJvb3QoKSA9PT0gbmV3UGFyZW50LnJvb3QoKSk7XG4gICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgIG5ld1BhcmVudC5hcHBlbmQodGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIG1vdmVCZWZvcmUob3RoZXJOb2RlKSB7XG4gICAgICAgIHdhcm5PbmNlKCdOb2RlI21vdmVCZWZvcmUgd2FzIGRlcHJlY2F0ZWQuIFVzZSBOb2RlI2JlZm9yZS4nKTtcbiAgICAgICAgdGhpcy5jbGVhblJhd3ModGhpcy5yb290KCkgPT09IG90aGVyTm9kZS5yb290KCkpO1xuICAgICAgICB0aGlzLnJlbW92ZSgpO1xuICAgICAgICBvdGhlck5vZGUucGFyZW50Lmluc2VydEJlZm9yZShvdGhlck5vZGUsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBtb3ZlQWZ0ZXIob3RoZXJOb2RlKSB7XG4gICAgICAgIHdhcm5PbmNlKCdOb2RlI21vdmVBZnRlciB3YXMgZGVwcmVjYXRlZC4gVXNlIE5vZGUjYWZ0ZXIuJyk7XG4gICAgICAgIHRoaXMuY2xlYW5SYXdzKHRoaXMucm9vdCgpID09PSBvdGhlck5vZGUucm9vdCgpKTtcbiAgICAgICAgdGhpcy5yZW1vdmUoKTtcbiAgICAgICAgb3RoZXJOb2RlLnBhcmVudC5pbnNlcnRBZnRlcihvdGhlck5vZGUsIHRoaXMpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBuZXh0IGNoaWxkIG9mIHRoZSBub2Rl4oCZcyBwYXJlbnQuXG4gICAgICogUmV0dXJucyBgdW5kZWZpbmVkYCBpZiB0aGUgY3VycmVudCBub2RlIGlzIHRoZSBsYXN0IGNoaWxkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZXx1bmRlZmluZWR9IG5leHQgbm9kZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBpZiAoIGNvbW1lbnQudGV4dCA9PT0gJ2RlbGV0ZSBuZXh0JyApIHtcbiAgICAgKiAgIGNvbnN0IG5leHQgPSBjb21tZW50Lm5leHQoKTtcbiAgICAgKiAgIGlmICggbmV4dCApIHtcbiAgICAgKiAgICAgbmV4dC5yZW1vdmUoKTtcbiAgICAgKiAgIH1cbiAgICAgKiB9XG4gICAgICovXG4gICAgbmV4dCgpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5wYXJlbnQgKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBhcmVudC5pbmRleCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4ICsgMV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgcHJldmlvdXMgY2hpbGQgb2YgdGhlIG5vZGXigJlzIHBhcmVudC5cbiAgICAgKiBSZXR1cm5zIGB1bmRlZmluZWRgIGlmIHRoZSBjdXJyZW50IG5vZGUgaXMgdGhlIGZpcnN0IGNoaWxkLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZXx1bmRlZmluZWR9IHByZXZpb3VzIG5vZGVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3QgYW5ub3RhdGlvbiA9IGRlY2wucHJldigpO1xuICAgICAqIGlmICggYW5ub3RhdGlvbi50eXBlID09ICdjb21tZW50JyApIHtcbiAgICAgKiAgcmVhZEFubm90YXRpb24oYW5ub3RhdGlvbi50ZXh0KTtcbiAgICAgKiB9XG4gICAgICovXG4gICAgcHJldigpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5wYXJlbnQgKSByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICBsZXQgaW5kZXggPSB0aGlzLnBhcmVudC5pbmRleCh0aGlzKTtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFyZW50Lm5vZGVzW2luZGV4IC0gMV07XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IG5ldyBub2RlIGJlZm9yZSBjdXJyZW50IG5vZGUgdG8gY3VycmVudCBub2Rl4oCZcyBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBKdXN0IGFsaWFzIGZvciBgbm9kZS5wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGUsIGFkZClgLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfG9iamVjdHxzdHJpbmd8Tm9kZVtdfSBhZGQgLSBuZXcgbm9kZVxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gdGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBkZWNsLmJlZm9yZSgnY29udGVudDogXCJcIicpO1xuICAgICAqL1xuICAgIGJlZm9yZShhZGQpIHtcbiAgICAgICAgdGhpcy5wYXJlbnQuaW5zZXJ0QmVmb3JlKHRoaXMsIGFkZCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydCBuZXcgbm9kZSBhZnRlciBjdXJyZW50IG5vZGUgdG8gY3VycmVudCBub2Rl4oCZcyBwYXJlbnQuXG4gICAgICpcbiAgICAgKiBKdXN0IGFsaWFzIGZvciBgbm9kZS5wYXJlbnQuaW5zZXJ0QWZ0ZXIobm9kZSwgYWRkKWAuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCAtIG5ldyBub2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOb2RlfSB0aGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW4uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGRlY2wuYWZ0ZXIoJ2NvbG9yOiBibGFjaycpO1xuICAgICAqL1xuICAgIGFmdGVyKGFkZCkge1xuICAgICAgICB0aGlzLnBhcmVudC5pbnNlcnRBZnRlcih0aGlzLCBhZGQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICB0b0pTT04oKSB7XG4gICAgICAgIGxldCBmaXhlZCA9IHsgfTtcblxuICAgICAgICBmb3IgKCBsZXQgbmFtZSBpbiB0aGlzICkge1xuICAgICAgICAgICAgaWYgKCAhdGhpcy5oYXNPd25Qcm9wZXJ0eShuYW1lKSApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKCBuYW1lID09PSAncGFyZW50JyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgbGV0IHZhbHVlID0gdGhpc1tuYW1lXTtcblxuICAgICAgICAgICAgaWYgKCB2YWx1ZSBpbnN0YW5jZW9mIEFycmF5ICkge1xuICAgICAgICAgICAgICAgIGZpeGVkW25hbWVdID0gdmFsdWUubWFwKCBpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgaSA9PT0gJ29iamVjdCcgJiYgaS50b0pTT04gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gaS50b0pTT04oKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlLnRvSlNPTiApIHtcbiAgICAgICAgICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlLnRvSlNPTigpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBmaXhlZFtuYW1lXSA9IHZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZpeGVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB7QGxpbmsgTm9kZSNyYXdzfSB2YWx1ZS4gSWYgdGhlIG5vZGUgaXMgbWlzc2luZ1xuICAgICAqIHRoZSBjb2RlIHN0eWxlIHByb3BlcnR5IChiZWNhdXNlIHRoZSBub2RlIHdhcyBtYW51YWxseSBidWlsdCBvciBjbG9uZWQpLFxuICAgICAqIFBvc3RDU1Mgd2lsbCB0cnkgdG8gYXV0b2RldGVjdCB0aGUgY29kZSBzdHlsZSBwcm9wZXJ0eSBieSBsb29raW5nXG4gICAgICogYXQgb3RoZXIgbm9kZXMgaW4gdGhlIHRyZWUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcCAgICAgICAgICAtIG5hbWUgb2YgY29kZSBzdHlsZSBwcm9wZXJ0eVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbZGVmYXVsdFR5cGVdIC0gbmFtZSBvZiBkZWZhdWx0IHZhbHVlLCBpdCBjYW4gYmUgbWlzc2VkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB0aGUgdmFsdWUgaXMgdGhlIHNhbWUgYXMgcHJvcFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGJhY2tncm91bmQ6IHdoaXRlIH0nKTtcbiAgICAgKiByb290Lm5vZGVzWzBdLmFwcGVuZCh7IHByb3A6ICdjb2xvcicsIHZhbHVlOiAnYmxhY2snIH0pO1xuICAgICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3cy5iZWZvcmUgICAvLz0+IHVuZGVmaW5lZFxuICAgICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMV0ucmF3KCdiZWZvcmUnKSAvLz0+ICcgJ1xuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBjb2RlIHN0eWxlIHZhbHVlXG4gICAgICovXG4gICAgcmF3KHByb3AsIGRlZmF1bHRUeXBlKSB7XG4gICAgICAgIGxldCBzdHIgPSBuZXcgU3RyaW5naWZpZXIoKTtcbiAgICAgICAgcmV0dXJuIHN0ci5yYXcodGhpcywgcHJvcCwgZGVmYXVsdFR5cGUpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEZpbmRzIHRoZSBSb290IGluc3RhbmNlIG9mIHRoZSBub2Rl4oCZcyB0cmVlLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByb290Lm5vZGVzWzBdLm5vZGVzWzBdLnJvb3QoKSA9PT0gcm9vdFxuICAgICAqXG4gICAgICogQHJldHVybiB7Um9vdH0gcm9vdCBwYXJlbnRcbiAgICAgKi9cbiAgICByb290KCkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gdGhpcztcbiAgICAgICAgd2hpbGUgKCByZXN1bHQucGFyZW50ICkgcmVzdWx0ID0gcmVzdWx0LnBhcmVudDtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBjbGVhblJhd3Moa2VlcEJldHdlZW4pIHtcbiAgICAgICAgZGVsZXRlIHRoaXMucmF3cy5iZWZvcmU7XG4gICAgICAgIGRlbGV0ZSB0aGlzLnJhd3MuYWZ0ZXI7XG4gICAgICAgIGlmICggIWtlZXBCZXR3ZWVuICkgZGVsZXRlIHRoaXMucmF3cy5iZXR3ZWVuO1xuICAgIH1cblxuICAgIHBvc2l0aW9uSW5zaWRlKGluZGV4KSB7XG4gICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnRvU3RyaW5nKCk7XG4gICAgICAgIGxldCBjb2x1bW4gPSB0aGlzLnNvdXJjZS5zdGFydC5jb2x1bW47XG4gICAgICAgIGxldCBsaW5lICAgPSB0aGlzLnNvdXJjZS5zdGFydC5saW5lO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGluZGV4OyBpKysgKSB7XG4gICAgICAgICAgICBpZiAoIHN0cmluZ1tpXSA9PT0gJ1xcbicgKSB7XG4gICAgICAgICAgICAgICAgY29sdW1uID0gMTtcbiAgICAgICAgICAgICAgICBsaW5lICArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb2x1bW4gKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7IGxpbmUsIGNvbHVtbiB9O1xuICAgIH1cblxuICAgIHBvc2l0aW9uQnkob3B0cykge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5zb3VyY2Uuc3RhcnQ7XG4gICAgICAgIGlmICggb3B0cy5pbmRleCApIHtcbiAgICAgICAgICAgIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUob3B0cy5pbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIG9wdHMud29yZCApIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMudG9TdHJpbmcoKS5pbmRleE9mKG9wdHMud29yZCk7XG4gICAgICAgICAgICBpZiAoIGluZGV4ICE9PSAtMSApIHBvcyA9IHRoaXMucG9zaXRpb25JbnNpZGUoaW5kZXgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBwb3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAgICogQG1lbWJlciB7c3RyaW5nfSB0eXBlIC0gU3RyaW5nIHJlcHJlc2VudGluZyB0aGUgbm9kZeKAmXMgdHlwZS5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBQb3NzaWJsZSB2YWx1ZXMgYXJlIGByb290YCwgYGF0cnVsZWAsIGBydWxlYCxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBgZGVjbGAsIG9yIGBjb21tZW50YC5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSkudHlwZSAvLz0+ICdkZWNsJ1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAgICogQG1lbWJlciB7Q29udGFpbmVyfSBwYXJlbnQgLSB0aGUgbm9kZeKAmXMgcGFyZW50IG5vZGUuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJvb3Qubm9kZXNbMF0ucGFyZW50ID09IHJvb3Q7XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgTm9kZSNcbiAgICAgKiBAbWVtYmVyIHtzb3VyY2V9IHNvdXJjZSAtIHRoZSBpbnB1dCBzb3VyY2Ugb2YgdGhlIG5vZGVcbiAgICAgKlxuICAgICAqIFRoZSBwcm9wZXJ0eSBpcyB1c2VkIGluIHNvdXJjZSBtYXAgZ2VuZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIElmIHlvdSBjcmVhdGUgYSBub2RlIG1hbnVhbGx5IChlLmcuLCB3aXRoIGBwb3N0Y3NzLmRlY2woKWApLFxuICAgICAqIHRoYXQgbm9kZSB3aWxsIG5vdCBoYXZlIGEgYHNvdXJjZWAgcHJvcGVydHkgYW5kIHdpbGwgYmUgYWJzZW50XG4gICAgICogZnJvbSB0aGUgc291cmNlIG1hcC4gRm9yIHRoaXMgcmVhc29uLCB0aGUgcGx1Z2luIGRldmVsb3BlciBzaG91bGRcbiAgICAgKiBjb25zaWRlciBjbG9uaW5nIG5vZGVzIHRvIGNyZWF0ZSBuZXcgb25lcyAoaW4gd2hpY2ggY2FzZSB0aGUgbmV3IG5vZGXigJlzXG4gICAgICogc291cmNlIHdpbGwgcmVmZXJlbmNlIHRoZSBvcmlnaW5hbCwgY2xvbmVkIG5vZGUpIG9yIHNldHRpbmdcbiAgICAgKiB0aGUgYHNvdXJjZWAgcHJvcGVydHkgbWFudWFsbHkuXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIC8vIEJhZFxuICAgICAqIGNvbnN0IHByZWZpeGVkID0gcG9zdGNzcy5kZWNsKHtcbiAgICAgKiAgIHByb3A6ICctbW96LScgKyBkZWNsLnByb3AsXG4gICAgICogICB2YWx1ZTogZGVjbC52YWx1ZVxuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogLy8gR29vZFxuICAgICAqIGNvbnN0IHByZWZpeGVkID0gZGVjbC5jbG9uZSh7IHByb3A6ICctbW96LScgKyBkZWNsLnByb3AgfSk7XG4gICAgICogYGBgXG4gICAgICpcbiAgICAgKiBgYGBqc1xuICAgICAqIGlmICggYXRydWxlLm5hbWUgPT0gJ2FkZC1saW5rJyApIHtcbiAgICAgKiAgIGNvbnN0IHJ1bGUgPSBwb3N0Y3NzLnJ1bGUoeyBzZWxlY3RvcjogJ2EnLCBzb3VyY2U6IGF0cnVsZS5zb3VyY2UgfSk7XG4gICAgICogICBhdHJ1bGUucGFyZW50Lmluc2VydEJlZm9yZShhdHJ1bGUsIHJ1bGUpO1xuICAgICAqIH1cbiAgICAgKiBgYGBcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZGVjbC5zb3VyY2UuaW5wdXQuZnJvbSAvLz0+ICcvaG9tZS9haS9hLnNhc3MnXG4gICAgICogZGVjbC5zb3VyY2Uuc3RhcnQgICAgICAvLz0+IHsgbGluZTogMTAsIGNvbHVtbjogMiB9XG4gICAgICogZGVjbC5zb3VyY2UuZW5kICAgICAgICAvLz0+IHsgbGluZTogMTAsIGNvbHVtbjogMTIgfVxuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIE5vZGUjXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIC0gSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAgICpcbiAgICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAgICpcbiAgICAgKiAqIGBiZWZvcmVgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZWZvcmUgdGhlIG5vZGUuIEl0IGFsc28gc3RvcmVzIGAqYFxuICAgICAqICAgYW5kIGBfYCBzeW1ib2xzIGJlZm9yZSB0aGUgZGVjbGFyYXRpb24gKElFIGhhY2spLlxuICAgICAqICogYGFmdGVyYDogdGhlIHNwYWNlIHN5bWJvbHMgYWZ0ZXIgdGhlIGxhc3QgY2hpbGQgb2YgdGhlIG5vZGVcbiAgICAgKiAgIHRvIHRoZSBlbmQgb2YgdGhlIG5vZGUuXG4gICAgICogKiBgYmV0d2VlbmA6IHRoZSBzeW1ib2xzIGJldHdlZW4gdGhlIHByb3BlcnR5IGFuZCB2YWx1ZVxuICAgICAqICAgZm9yIGRlY2xhcmF0aW9ucywgc2VsZWN0b3IgYW5kIGB7YCBmb3IgcnVsZXMsIG9yIGxhc3QgcGFyYW1ldGVyXG4gICAgICogICBhbmQgYHtgIGZvciBhdC1ydWxlcy5cbiAgICAgKiAqIGBzZW1pY29sb25gOiBjb250YWlucyB0cnVlIGlmIHRoZSBsYXN0IGNoaWxkIGhhc1xuICAgICAqICAgYW4gKG9wdGlvbmFsKSBzZW1pY29sb24uXG4gICAgICogKiBgYWZ0ZXJOYW1lYDogdGhlIHNwYWNlIGJldHdlZW4gdGhlIGF0LXJ1bGUgbmFtZSBhbmQgaXRzIHBhcmFtZXRlcnMuXG4gICAgICogKiBgbGVmdGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gYC8qYCBhbmQgdGhlIGNvbW1lbnTigJlzIHRleHQuXG4gICAgICogKiBgcmlnaHRgOiB0aGUgc3BhY2Ugc3ltYm9scyBiZXR3ZWVuIHRoZSBjb21tZW504oCZcyB0ZXh0XG4gICAgICogICBhbmQgPGNvZGU+KiYjNDc7PC9jb2RlPi5cbiAgICAgKiAqIGBpbXBvcnRhbnRgOiB0aGUgY29udGVudCBvZiB0aGUgaW1wb3J0YW50IHN0YXRlbWVudCxcbiAgICAgKiAgIGlmIGl0IGlzIG5vdCBqdXN0IGAhaW1wb3J0YW50YC5cbiAgICAgKlxuICAgICAqIFBvc3RDU1MgY2xlYW5zIHNlbGVjdG9ycywgZGVjbGFyYXRpb24gdmFsdWVzIGFuZCBhdC1ydWxlIHBhcmFtZXRlcnNcbiAgICAgKiBmcm9tIGNvbW1lbnRzIGFuZCBleHRyYSBzcGFjZXMsIGJ1dCBpdCBzdG9yZXMgb3JpZ2luIGNvbnRlbnQgaW4gcmF3c1xuICAgICAqIHByb3BlcnRpZXMuIEFzIHN1Y2gsIGlmIHlvdSBkb27igJl0IGNoYW5nZSBhIGRlY2xhcmF0aW9u4oCZcyB2YWx1ZSxcbiAgICAgKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSByYXcgdmFsdWUgd2l0aCBjb21tZW50cy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2Ege1xcbiAgY29sb3I6YmxhY2tcXG59JylcbiAgICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJ1xcbiAgJywgYmV0d2VlbjogJzonIH1cbiAgICAgKi9cblxufVxuXG5leHBvcnQgZGVmYXVsdCBOb2RlO1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHBvc2l0aW9uXG4gKiBAcHJvcGVydHkge251bWJlcn0gbGluZSAgIC0gc291cmNlIGxpbmUgaW4gZmlsZVxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbHVtbiAtIHNvdXJjZSBjb2x1bW4gaW4gZmlsZVxuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gc291cmNlXG4gKiBAcHJvcGVydHkge0lucHV0fSBpbnB1dCAgICAtIHtAbGluayBJbnB1dH0gd2l0aCBpbnB1dCBmaWxlXG4gKiBAcHJvcGVydHkge3Bvc2l0aW9ufSBzdGFydCAtIFRoZSBzdGFydGluZyBwb3NpdGlvbiBvZiB0aGUgbm9kZeKAmXMgc291cmNlXG4gKiBAcHJvcGVydHkge3Bvc2l0aW9ufSBlbmQgICAtIFRoZSBlbmRpbmcgcG9zaXRpb24gb2YgdGhlIG5vZGXigJlzIHNvdXJjZVxuICovXG4iXX0=

}, function(modId) { var map = {"./css-syntax-error":1625038544320,"./stringifier":1625038544325,"./stringify":1625038544326,"./warn-once":1625038544327}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544320, function(require, module, exports) {


exports.__esModule = true;

var _supportsColor = require('supports-color');

var _supportsColor2 = _interopRequireDefault(_supportsColor);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _terminalHighlight = require('./terminal-highlight');

var _terminalHighlight2 = _interopRequireDefault(_terminalHighlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The CSS parser throws this error for broken CSS.
 *
 * Custom parsers can throw this error for broken custom syntax using
 * the {@link Node#error} method.
 *
 * PostCSS will use the input source map to detect the original error location.
 * If you wrote a Sass file, compiled it to CSS and then parsed it with PostCSS,
 * PostCSS will show the original position in the Sass file.
 *
 * If you need the position in the PostCSS input
 * (e.g., to debug the previous compiler), use `error.input.file`.
 *
 * @example
 * // Catching and checking syntax error
 * try {
 *   postcss.parse('a{')
 * } catch (error) {
 *   if ( error.name === 'CssSyntaxError' ) {
 *     error //=> CssSyntaxError
 *   }
 * }
 *
 * @example
 * // Raising error from plugin
 * throw node.error('Unknown variable', { plugin: 'postcss-vars' });
 */
var CssSyntaxError = function () {

    /**
     * @param {string} message  - error message
     * @param {number} [line]   - source line of the error
     * @param {number} [column] - source column of the error
     * @param {string} [source] - source code of the broken file
     * @param {string} [file]   - absolute path to the broken file
     * @param {string} [plugin] - PostCSS plugin name, if error came from plugin
     */
    function CssSyntaxError(message, line, column, source, file, plugin) {
        _classCallCheck(this, CssSyntaxError);

        /**
         * @member {string} - Always equal to `'CssSyntaxError'`. You should
         *                    always check error type
         *                    by `error.name === 'CssSyntaxError'` instead of
         *                    `error instanceof CssSyntaxError`, because
         *                    npm could have several PostCSS versions.
         *
         * @example
         * if ( error.name === 'CssSyntaxError' ) {
         *   error //=> CssSyntaxError
         * }
         */
        this.name = 'CssSyntaxError';
        /**
         * @member {string} - Error message.
         *
         * @example
         * error.message //=> 'Unclosed block'
         */
        this.reason = message;

        if (file) {
            /**
             * @member {string} - Absolute path to the broken file.
             *
             * @example
             * error.file       //=> 'a.sass'
             * error.input.file //=> 'a.css'
             */
            this.file = file;
        }
        if (source) {
            /**
             * @member {string} - Source code of the broken file.
             *
             * @example
             * error.source       //=> 'a { b {} }'
             * error.input.column //=> 'a b { }'
             */
            this.source = source;
        }
        if (plugin) {
            /**
             * @member {string} - Plugin name, if error came from plugin.
             *
             * @example
             * error.plugin //=> 'postcss-vars'
             */
            this.plugin = plugin;
        }
        if (typeof line !== 'undefined' && typeof column !== 'undefined') {
            /**
             * @member {number} - Source line of the error.
             *
             * @example
             * error.line       //=> 2
             * error.input.line //=> 4
             */
            this.line = line;
            /**
             * @member {number} - Source column of the error.
             *
             * @example
             * error.column       //=> 1
             * error.input.column //=> 4
             */
            this.column = column;
        }

        this.setMessage();

        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, CssSyntaxError);
        }
    }

    CssSyntaxError.prototype.setMessage = function setMessage() {
        /**
         * @member {string} - Full error text in the GNU error format
         *                    with plugin, file, line and column.
         *
         * @example
         * error.message //=> 'a.css:1:1: Unclosed block'
         */
        this.message = this.plugin ? this.plugin + ': ' : '';
        this.message += this.file ? this.file : '<css input>';
        if (typeof this.line !== 'undefined') {
            this.message += ':' + this.line + ':' + this.column;
        }
        this.message += ': ' + this.reason;
    };

    /**
     * Returns a few lines of CSS source that caused the error.
     *
     * If the CSS has an input source map without `sourceContent`,
     * this method will return an empty string.
     *
     * @param {boolean} [color] whether arrow will be colored red by terminal
     *                          color codes. By default, PostCSS will detect
     *                          color support by `process.stdout.isTTY`
     *                          and `process.env.NODE_DISABLE_COLORS`.
     *
     * @example
     * error.showSourceCode() //=> "  4 | }
     *                        //      5 | a {
     *                        //    > 6 |   bad
     *                        //        |   ^
     *                        //      7 | }
     *                        //      8 | b {"
     *
     * @return {string} few lines of CSS source that caused the error
     */


    CssSyntaxError.prototype.showSourceCode = function showSourceCode(color) {
        var _this = this;

        if (!this.source) return '';

        var css = this.source;
        if (typeof color === 'undefined') color = _supportsColor2.default.stdout;
        if (color) css = (0, _terminalHighlight2.default)(css);

        var lines = css.split(/\r?\n/);
        var start = Math.max(this.line - 3, 0);
        var end = Math.min(this.line + 2, lines.length);

        var maxWidth = String(end).length;

        function mark(text) {
            if (color && _chalk2.default.red) {
                return _chalk2.default.red.bold(text);
            } else {
                return text;
            }
        }
        function aside(text) {
            if (color && _chalk2.default.gray) {
                return _chalk2.default.gray(text);
            } else {
                return text;
            }
        }

        return lines.slice(start, end).map(function (line, index) {
            var number = start + 1 + index;
            var gutter = ' ' + (' ' + number).slice(-maxWidth) + ' | ';
            if (number === _this.line) {
                var spacing = aside(gutter.replace(/\d/g, ' ')) + line.slice(0, _this.column - 1).replace(/[^\t]/g, ' ');
                return mark('>') + aside(gutter) + line + '\n ' + spacing + mark('^');
            } else {
                return ' ' + aside(gutter) + line;
            }
        }).join('\n');
    };

    /**
     * Returns error position, message and source code of the broken part.
     *
     * @example
     * error.toString() //=> "CssSyntaxError: app.css:1:1: Unclosed block
     *                  //    > 1 | a {
     *                  //        | ^"
     *
     * @return {string} error position, message and source code
     */


    CssSyntaxError.prototype.toString = function toString() {
        var code = this.showSourceCode();
        if (code) {
            code = '\n\n' + code + '\n';
        }
        return this.name + ': ' + this.message + code;
    };

    /**
     * @memberof CssSyntaxError#
     * @member {Input} input - Input object with PostCSS internal information
     *                         about input file. If input has source map
     *                         from previous tool, PostCSS will use origin
     *                         (for example, Sass) source. You can use this
     *                         object to get PostCSS input source.
     *
     * @example
     * error.input.file //=> 'a.css'
     * error.file       //=> 'a.sass'
     */

    return CssSyntaxError;
}();

exports.default = CssSyntaxError;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNzcy1zeW50YXgtZXJyb3IuZXM2Il0sIm5hbWVzIjpbIkNzc1N5bnRheEVycm9yIiwibWVzc2FnZSIsImxpbmUiLCJjb2x1bW4iLCJzb3VyY2UiLCJmaWxlIiwicGx1Z2luIiwibmFtZSIsInJlYXNvbiIsInNldE1lc3NhZ2UiLCJFcnJvciIsImNhcHR1cmVTdGFja1RyYWNlIiwic2hvd1NvdXJjZUNvZGUiLCJjb2xvciIsImNzcyIsInN1cHBvcnRzQ29sb3IiLCJzdGRvdXQiLCJsaW5lcyIsInNwbGl0Iiwic3RhcnQiLCJNYXRoIiwibWF4IiwiZW5kIiwibWluIiwibGVuZ3RoIiwibWF4V2lkdGgiLCJTdHJpbmciLCJtYXJrIiwidGV4dCIsImNoYWxrIiwicmVkIiwiYm9sZCIsImFzaWRlIiwiZ3JheSIsInNsaWNlIiwibWFwIiwiaW5kZXgiLCJudW1iZXIiLCJndXR0ZXIiLCJzcGFjaW5nIiwicmVwbGFjZSIsImpvaW4iLCJ0b1N0cmluZyIsImNvZGUiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTJCTUEsYzs7QUFFRjs7Ozs7Ozs7QUFRQSw0QkFBWUMsT0FBWixFQUFxQkMsSUFBckIsRUFBMkJDLE1BQTNCLEVBQW1DQyxNQUFuQyxFQUEyQ0MsSUFBM0MsRUFBaURDLE1BQWpELEVBQXlEO0FBQUE7O0FBQ3JEOzs7Ozs7Ozs7Ozs7QUFZQSxhQUFLQyxJQUFMLEdBQVksZ0JBQVo7QUFDQTs7Ozs7O0FBTUEsYUFBS0MsTUFBTCxHQUFjUCxPQUFkOztBQUVBLFlBQUtJLElBQUwsRUFBWTtBQUNSOzs7Ozs7O0FBT0EsaUJBQUtBLElBQUwsR0FBWUEsSUFBWjtBQUNIO0FBQ0QsWUFBS0QsTUFBTCxFQUFjO0FBQ1Y7Ozs7Ozs7QUFPQSxpQkFBS0EsTUFBTCxHQUFjQSxNQUFkO0FBQ0g7QUFDRCxZQUFLRSxNQUFMLEVBQWM7QUFDVjs7Ozs7O0FBTUEsaUJBQUtBLE1B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QUF2QyxFQUFpRCxHQUFqRCxDQUZKO0FBR0EsdUJBQU9iLEtBQUssR0FBTCxJQUFZSyxNQUFNTSxNQUFOLENBQVosR0FBNEJwQyxJQUE1QixHQUFtQyxLQUFuQyxHQUNBcUMsT0FEQSxHQUNVWixLQUFLLEdBQUwsQ0FEakI7QUFFSCxhQU5ELE1BTU87QUFDSCx1QkFBTyxNQUFNSyxNQUFNTSxNQUFOLENBQU4sR0FBc0JwQyxJQUE3QjtBQUNIO0FBQ0osU0FaTSxFQVlKdUMsSUFaSSxDQVlDLElBWkQsQ0FBUDtBQWFILEs7O0FBRUQ7Ozs7Ozs7Ozs7Ozs2QkFVQUMsUSx1QkFBVztBQUNQLFlBQUlDLE9BQU8sS0FBSy9CLGNBQUwsRUFBWDtBQUNBLFlBQUsrQixJQUFMLEVBQVk7QUFDUkEsbUJBQU8sU0FBU0EsSUFBVCxHQUFnQixJQUF2QjtBQUNIO0FBQ0QsZUFBTyxLQUFLcEMsSUFBTCxHQUFZLElBQVosR0FBbUIsS0FBS04sT0FBeEIsR0FBa0MwQyxJQUF6QztBQUNILEs7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBZVczQyxjIiwiZmlsZSI6ImNzcy1zeW50YXgtZXJyb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgc3VwcG9ydHNDb2xvciBmcm9tICdzdXBwb3J0cy1jb2xvcic7XG5pbXBvcnQgY2hhbGsgICAgICAgICBmcm9tICdjaGFsayc7XG5cbmltcG9ydCB0ZXJtaW5hbEhpZ2hsaWdodCBmcm9tICcuL3Rlcm1pbmFsLWhpZ2hsaWdodCc7XG5cbi8qKlxuICogVGhlIENTUyBwYXJzZXIgdGhyb3dzIHRoaXMgZXJyb3IgZm9yIGJyb2tlbiBDU1MuXG4gKlxuICogQ3VzdG9tIHBhcnNlcnMgY2FuIHRocm93IHRoaXMgZXJyb3IgZm9yIGJyb2tlbiBjdXN0b20gc3ludGF4IHVzaW5nXG4gKiB0aGUge0BsaW5rIE5vZGUjZXJyb3J9IG1ldGhvZC5cbiAqXG4gKiBQb3N0Q1NTIHdpbGwgdXNlIHRoZSBpbnB1dCBzb3VyY2UgbWFwIHRvIGRldGVjdCB0aGUgb3JpZ2luYWwgZXJyb3IgbG9jYXRpb24uXG4gKiBJZiB5b3Ugd3JvdGUgYSBTYXNzIGZpbGUsIGNvbXBpbGVkIGl0IHRvIENTUyBhbmQgdGhlbiBwYXJzZWQgaXQgd2l0aCBQb3N0Q1NTLFxuICogUG9zdENTUyB3aWxsIHNob3cgdGhlIG9yaWdpbmFsIHBvc2l0aW9uIGluIHRoZSBTYXNzIGZpbGUuXG4gKlxuICogSWYgeW91IG5lZWQgdGhlIHBvc2l0aW9uIGluIHRoZSBQb3N0Q1NTIGlucHV0XG4gKiAoZS5nLiwgdG8gZGVidWcgdGhlIHByZXZpb3VzIGNvbXBpbGVyKSwgdXNlIGBlcnJvci5pbnB1dC5maWxlYC5cbiAqXG4gKiBAZXhhbXBsZVxuICogLy8gQ2F0Y2hpbmcgYW5kIGNoZWNraW5nIHN5bnRheCBlcnJvclxuICogdHJ5IHtcbiAqICAgcG9zdGNzcy5wYXJzZSgnYXsnKVxuICogfSBjYXRjaCAoZXJyb3IpIHtcbiAqICAgaWYgKCBlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICkge1xuICogICAgIGVycm9yIC8vPT4gQ3NzU3ludGF4RXJyb3JcbiAqICAgfVxuICogfVxuICpcbiAqIEBleGFtcGxlXG4gKiAvLyBSYWlzaW5nIGVycm9yIGZyb20gcGx1Z2luXG4gKiB0aHJvdyBub2RlLmVycm9yKCdVbmtub3duIHZhcmlhYmxlJywgeyBwbHVnaW46ICdwb3N0Y3NzLXZhcnMnIH0pO1xuICovXG5jbGFzcyBDc3NTeW50YXhFcnJvciB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gbWVzc2FnZSAgLSBlcnJvciBtZXNzYWdlXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtsaW5lXSAgIC0gc291cmNlIGxpbmUgb2YgdGhlIGVycm9yXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IFtjb2x1bW5dIC0gc291cmNlIGNvbHVtbiBvZiB0aGUgZXJyb3JcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW3NvdXJjZV0gLSBzb3VyY2UgY29kZSBvZiB0aGUgYnJva2VuIGZpbGVcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gW2ZpbGVdICAgLSBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBicm9rZW4gZmlsZVxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBbcGx1Z2luXSAtIFBvc3RDU1MgcGx1Z2luIG5hbWUsIGlmIGVycm9yIGNhbWUgZnJvbSBwbHVnaW5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIHNvdXJjZSwgZmlsZSwgcGx1Z2luKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gQWx3YXlzIGVxdWFsIHRvIGAnQ3NzU3ludGF4RXJyb3InYC4gWW91IHNob3VsZFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgYWx3YXlzIGNoZWNrIGVycm9yIHR5cGVcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgIGJ5IGBlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InYCBpbnN0ZWFkIG9mXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICBgZXJyb3IgaW5zdGFuY2VvZiBDc3NTeW50YXhFcnJvcmAsIGJlY2F1c2VcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgIG5wbSBjb3VsZCBoYXZlIHNldmVyYWwgUG9zdENTUyB2ZXJzaW9ucy5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogaWYgKCBlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICkge1xuICAgICAgICAgKiAgIGVycm9yIC8vPT4gQ3NzU3ludGF4RXJyb3JcbiAgICAgICAgICogfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5uYW1lID0gJ0Nzc1N5bnRheEVycm9yJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBFcnJvciBtZXNzYWdlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBlcnJvci5tZXNzYWdlIC8vPT4gJ1VuY2xvc2VkIGJsb2NrJ1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yZWFzb24gPSBtZXNzYWdlO1xuXG4gICAgICAgIGlmICggZmlsZSApIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSAtIEFic29sdXRlIHBhdGggdG8gdGhlIGJyb2tlbiBmaWxlLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAgICAgKiBlcnJvci5maWxlICAgICAgIC8vPT4gJ2Euc2FzcydcbiAgICAgICAgICAgICAqIGVycm9yLmlucHV0LmZpbGUgLy89PiAnYS5jc3MnXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuZmlsZSA9IGZpbGU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCBzb3VyY2UgKSB7XG4gICAgICAgICAgICAvKipcbiAgICAgICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBTb3VyY2UgY29kZSBvZiB0aGUgYnJva2VuIGZpbGUuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICAgICAqIGVycm9yLnNvdXJjZSAgICAgICAvLz0+ICdhIHsgYiB7fSB9J1xuICAgICAgICAgICAgICogZXJyb3IuaW5wdXQuY29sdW1uIC8vPT4gJ2EgYiB7IH0nXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuc291cmNlID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICggcGx1Z2luICkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gUGx1Z2luIG5hbWUsIGlmIGVycm9yIGNhbWUgZnJvbSBwbHVnaW4uXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICAgICAqIGVycm9yLnBsdWdpbiAvLz0+ICdwb3N0Y3NzLXZhcnMnXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMucGx1Z2luID0gcGx1Z2luO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdHlwZW9mIGxpbmUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBjb2x1bW4gIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gU291cmNlIGxpbmUgb2YgdGhlIGVycm9yLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAgICAgKiBlcnJvci5saW5lICAgICAgIC8vPT4gMlxuICAgICAgICAgICAgICogZXJyb3IuaW5wdXQubGluZSAvLz0+IDRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5saW5lICAgPSBsaW5lO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gU291cmNlIGNvbHVtbiBvZiB0aGUgZXJyb3IuXG4gICAgICAgICAgICAgKlxuICAgICAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICAgICAqIGVycm9yLmNvbHVtbiAgICAgICAvLz0+IDFcbiAgICAgICAgICAgICAqIGVycm9yLmlucHV0LmNvbHVtbiAvLz0+IDRcbiAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgdGhpcy5jb2x1bW4gPSBjb2x1bW47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnNldE1lc3NhZ2UoKTtcblxuICAgICAgICBpZiAoIEVycm9yLmNhcHR1cmVTdGFja1RyYWNlICkge1xuICAgICAgICAgICAgRXJyb3IuY2FwdHVyZVN0YWNrVHJhY2UodGhpcywgQ3NzU3ludGF4RXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0TWVzc2FnZSgpIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBGdWxsIGVycm9yIHRleHQgaW4gdGhlIEdOVSBlcnJvciBmb3JtYXRcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgIHdpdGggcGx1Z2luLCBmaWxlLCBsaW5lIGFuZCBjb2x1bW4uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGVycm9yLm1lc3NhZ2UgLy89PiAnYS5jc3M6MToxOiBVbmNsb3NlZCBibG9jaydcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWVzc2FnZSAgPSB0aGlzLnBsdWdpbiA/IHRoaXMucGx1Z2luICsgJzogJyA6ICcnO1xuICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gdGhpcy5maWxlID8gdGhpcy5maWxlIDogJzxjc3MgaW5wdXQ+JztcbiAgICAgICAgaWYgKCB0eXBlb2YgdGhpcy5saW5lICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHRoaXMubWVzc2FnZSArPSAnOicgKyB0aGlzLmxpbmUgKyAnOicgKyB0aGlzLmNvbHVtbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLm1lc3NhZ2UgKz0gJzogJyArIHRoaXMucmVhc29uO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmZXcgbGluZXMgb2YgQ1NTIHNvdXJjZSB0aGF0IGNhdXNlZCB0aGUgZXJyb3IuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgQ1NTIGhhcyBhbiBpbnB1dCBzb3VyY2UgbWFwIHdpdGhvdXQgYHNvdXJjZUNvbnRlbnRgLFxuICAgICAqIHRoaXMgbWV0aG9kIHdpbGwgcmV0dXJuIGFuIGVtcHR5IHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Ym9vbGVhbn0gW2NvbG9yXSB3aGV0aGVyIGFycm93IHdpbGwgYmUgY29sb3JlZCByZWQgYnkgdGVybWluYWxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3IgY29kZXMuIEJ5IGRlZmF1bHQsIFBvc3RDU1Mgd2lsbCBkZXRlY3RcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgY29sb3Igc3VwcG9ydCBieSBgcHJvY2Vzcy5zdGRvdXQuaXNUVFlgXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBgcHJvY2Vzcy5lbnYuTk9ERV9ESVNBQkxFX0NPTE9SU2AuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGVycm9yLnNob3dTb3VyY2VDb2RlKCkgLy89PiBcIiAgNCB8IH1cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgNSB8IGEge1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgPiA2IHwgICBiYWRcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgIC8vICAgICAgICB8ICAgXlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICA3IHwgfVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgICA4IHwgYiB7XCJcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gZmV3IGxpbmVzIG9mIENTUyBzb3VyY2UgdGhhdCBjYXVzZWQgdGhlIGVycm9yXG4gICAgICovXG4gICAgc2hvd1NvdXJjZUNvZGUoY29sb3IpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5zb3VyY2UgKSByZXR1cm4gJyc7XG5cbiAgICAgICAgbGV0IGNzcyA9IHRoaXMuc291cmNlO1xuICAgICAgICBpZiAoIHR5cGVvZiBjb2xvciA9PT0gJ3VuZGVmaW5lZCcgKSBjb2xvciA9IHN1cHBvcnRzQ29sb3Iuc3Rkb3V0O1xuICAgICAgICBpZiAoIGNvbG9yICkgY3NzID0gdGVybWluYWxIaWdobGlnaHQoY3NzKTtcblxuICAgICAgICBsZXQgbGluZXMgPSBjc3Muc3BsaXQoL1xccj9cXG4vKTtcbiAgICAgICAgbGV0IHN0YXJ0ID0gTWF0aC5tYXgodGhpcy5saW5lIC0gMywgMCk7XG4gICAgICAgIGxldCBlbmQgICA9IE1hdGgubWluKHRoaXMubGluZSArIDIsIGxpbmVzLmxlbmd0aCk7XG5cbiAgICAgICAgbGV0IG1heFdpZHRoID0gU3RyaW5nKGVuZCkubGVuZ3RoO1xuXG4gICAgICAgIGZ1bmN0aW9uIG1hcmsodGV4dCkge1xuICAgICAgICAgICAgaWYgKCBjb2xvciAmJiBjaGFsay5yZWQgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYWxrLnJlZC5ib2xkKHRleHQpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBmdW5jdGlvbiBhc2lkZSh0ZXh0KSB7XG4gICAgICAgICAgICBpZiAoIGNvbG9yICYmIGNoYWxrLmdyYXkgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGNoYWxrLmdyYXkodGV4dCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGxpbmVzLnNsaWNlKHN0YXJ0LCBlbmQpLm1hcCggKGxpbmUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQgbnVtYmVyID0gc3RhcnQgKyAxICsgaW5kZXg7XG4gICAgICAgICAgICBsZXQgZ3V0dGVyID0gJyAnICsgKCcgJyArIG51bWJlcikuc2xpY2UoLW1heFdpZHRoKSArICcgfCAnO1xuICAgICAgICAgICAgaWYgKCBudW1iZXIgPT09IHRoaXMubGluZSApIHtcbiAgICAgICAgICAgICAgICBsZXQgc3BhY2luZyA9XG4gICAgICAgICAgICAgICAgICAgIGFzaWRlKGd1dHRlci5yZXBsYWNlKC9cXGQvZywgJyAnKSkgK1xuICAgICAgICAgICAgICAgICAgICBsaW5lLnNsaWNlKDAsIHRoaXMuY29sdW1uIC0gMSkucmVwbGFjZSgvW15cXHRdL2csICcgJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1hcmsoJz4nKSArIGFzaWRlKGd1dHRlcikgKyBsaW5lICsgJ1xcbiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgc3BhY2luZyArIG1hcmsoJ14nKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJyArIGFzaWRlKGd1dHRlcikgKyBsaW5lO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KS5qb2luKCdcXG4nKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGVycm9yIHBvc2l0aW9uLCBtZXNzYWdlIGFuZCBzb3VyY2UgY29kZSBvZiB0aGUgYnJva2VuIHBhcnQuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGVycm9yLnRvU3RyaW5nKCkgLy89PiBcIkNzc1N5bnRheEVycm9yOiBhcHAuY3NzOjE6MTogVW5jbG9zZWQgYmxvY2tcbiAgICAgKiAgICAgICAgICAgICAgICAgIC8vICAgID4gMSB8IGEge1xuICAgICAqICAgICAgICAgICAgICAgICAgLy8gICAgICAgIHwgXlwiXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IGVycm9yIHBvc2l0aW9uLCBtZXNzYWdlIGFuZCBzb3VyY2UgY29kZVxuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBsZXQgY29kZSA9IHRoaXMuc2hvd1NvdXJjZUNvZGUoKTtcbiAgICAgICAgaWYgKCBjb2RlICkge1xuICAgICAgICAgICAgY29kZSA9ICdcXG5cXG4nICsgY29kZSArICdcXG4nO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLm5hbWUgKyAnOiAnICsgdGhpcy5tZXNzYWdlICsgY29kZTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgQ3NzU3ludGF4RXJyb3IjXG4gICAgICogQG1lbWJlciB7SW5wdXR9IGlucHV0IC0gSW5wdXQgb2JqZWN0IHdpdGggUG9zdENTUyBpbnRlcm5hbCBpbmZvcm1hdGlvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIGFib3V0IGlucHV0IGZpbGUuIElmIGlucHV0IGhhcyBzb3VyY2UgbWFwXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgZnJvbSBwcmV2aW91cyB0b29sLCBQb3N0Q1NTIHdpbGwgdXNlIG9yaWdpblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIChmb3IgZXhhbXBsZSwgU2Fzcykgc291cmNlLiBZb3UgY2FuIHVzZSB0aGlzXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0IHRvIGdldCBQb3N0Q1NTIGlucHV0IHNvdXJjZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogZXJyb3IuaW5wdXQuZmlsZSAvLz0+ICdhLmNzcydcbiAgICAgKiBlcnJvci5maWxlICAgICAgIC8vPT4gJ2Euc2FzcydcbiAgICAgKi9cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDc3NTeW50YXhFcnJvcjtcbiJdfQ==

}, function(modId) { var map = {"./terminal-highlight":1625038544321}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544321, function(require, module, exports) {


exports.__esModule = true;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HIGHLIGHT_THEME = {
    'brackets': _chalk2.default.cyan,
    'at-word': _chalk2.default.cyan,
    'call': _chalk2.default.cyan,
    'comment': _chalk2.default.gray,
    'string': _chalk2.default.green,
    'class': _chalk2.default.yellow,
    'hash': _chalk2.default.magenta,
    '(': _chalk2.default.cyan,
    ')': _chalk2.default.cyan,
    '{': _chalk2.default.yellow,
    '}': _chalk2.default.yellow,
    '[': _chalk2.default.yellow,
    ']': _chalk2.default.yellow,
    ':': _chalk2.default.yellow,
    ';': _chalk2.default.yellow
};

function getTokenType(_ref, processor) {
    var type = _ref[0],
        value = _ref[1];

    if (type === 'word') {
        if (value[0] === '.') {
            return 'class';
        }
        if (value[0] === '#') {
            return 'hash';
        }
    }

    if (!processor.endOfFile()) {
        var next = processor.nextToken();
        processor.back(next);
        if (next[0] === 'brackets' || next[0] === '(') return 'call';
    }

    return type;
}

function terminalHighlight(css) {
    var processor = (0, _tokenize2.default)(new _input2.default(css), { ignoreErrors: true });
    var result = '';

    var _loop = function _loop() {
        var token = processor.nextToken();
        var color = HIGHLIGHT_THEME[getTokenType(token, processor)];
        if (color) {
            result += token[1].split(/\r?\n/).map(function (i) {
                return color(i);
            }).join('\n');
        } else {
            result += token[1];
        }
    };

    while (!processor.endOfFile()) {
        _loop();
    }
    return result;
}

exports.default = terminalHighlight;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlcm1pbmFsLWhpZ2hsaWdodC5lczYiXSwibmFtZXMiOlsiSElHSExJR0hUX1RIRU1FIiwiY2hhbGsiLCJjeWFuIiwiZ3JheSIsImdyZWVuIiwieWVsbG93IiwibWFnZW50YSIsImdldFRva2VuVHlwZSIsInByb2Nlc3NvciIsInR5cGUiLCJ2YWx1ZSIsImVuZE9mRmlsZSIsIm5leHQiLCJuZXh0VG9rZW4iLCJiYWNrIiwidGVybWluYWxIaWdobGlnaHQiLCJjc3MiLCJJbnB1dCIsImlnbm9yZUVycm9ycyIsInJlc3VsdCIsInRva2VuIiwiY29sb3IiLCJzcGxpdCIsIm1hcCIsImkiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFFQTs7OztBQUNBOzs7Ozs7QUFFQSxJQUFNQSxrQkFBa0I7QUFDcEIsZ0JBQVlDLGdCQUFNQyxJQURFO0FBRXBCLGVBQVlELGdCQUFNQyxJQUZFO0FBR3BCLFlBQVlELGdCQUFNQyxJQUhFO0FBSXBCLGVBQVlELGdCQUFNRSxJQUpFO0FBS3BCLGNBQVlGLGdCQUFNRyxLQUxFO0FBTXBCLGFBQVlILGdCQUFNSSxNQU5FO0FBT3BCLFlBQVlKLGdCQUFNSyxPQVBFO0FBUXBCLFNBQVlMLGdCQUFNQyxJQVJFO0FBU3BCLFNBQVlELGdCQUFNQyxJQVRFO0FBVXBCLFNBQVlELGdCQUFNSSxNQVZFO0FBV3BCLFNBQVlKLGdCQUFNSSxNQVhFO0FBWXBCLFNBQVlKLGdCQUFNSSxNQVpFO0FBYXBCLFNBQVlKLGdCQUFNSSxNQWJFO0FBY3BCLFNBQVlKLGdCQUFNSSxNQWRFO0FBZXBCLFNBQVlKLGdCQUFNSTtBQWZFLENBQXhCOztBQWtCQSxTQUFTRSxZQUFULE9BQXFDQyxTQUFyQyxFQUFnRDtBQUFBLFFBQXpCQyxJQUF5QjtBQUFBLFFBQW5CQyxLQUFtQjs7QUFDNUMsUUFBS0QsU0FBUyxNQUFkLEVBQXVCO0FBQ25CLFlBQUtDLE1BQU0sQ0FBTixNQUFhLEdBQWxCLEVBQXdCO0FBQ3BCLG1CQUFPLE9BQVA7QUFDSDtBQUNELFlBQUtBLE1BQU0sQ0FBTixNQUFhLEdBQWxCLEVBQXdCO0FBQ3BCLG1CQUFPLE1BQVA7QUFDSDtBQUNKOztBQUVELFFBQUssQ0FBQ0YsVUFBVUcsU0FBVixFQUFOLEVBQThCO0FBQzFCLFlBQUlDLE9BQU9KLFVBQVVLLFNBQVYsRUFBWDtBQUNBTCxrQkFBVU0sSUFBVixDQUFlRixJQUFmO0FBQ0EsWUFBS0EsS0FBSyxDQUFMLE1BQVksVUFBWixJQUEwQkEsS0FBSyxDQUFMLE1BQVksR0FBM0MsRUFBaUQsT0FBTyxNQUFQO0FBQ3BEOztBQUVELFdBQU9ILElBQVA7QUFDSDs7QUFFRCxTQUFTTSxpQkFBVCxDQUEyQkMsR0FBM0IsRUFBZ0M7QUFDNUIsUUFBSVIsWUFBWSx3QkFBVSxJQUFJUyxlQUFKLENBQVVELEdBQVYsQ0FBVixFQUEwQixFQUFFRSxjQUFjLElBQWhCLEVBQTFCLENBQWhCO0FBQ0EsUUFBSUMsU0FBUyxFQUFiOztBQUY0QjtBQUl4QixZQUFJQyxRQUFRWixVQUFVSyxTQUFWLEVBQVo7QUFDQSxZQUFJUSxRQUFRckIsZ0JBQWdCTyxhQUFhYSxLQUFiLEVBQW9CWixTQUFwQixDQUFoQixDQUFaO0FBQ0EsWUFBS2EsS0FBTCxFQUFhO0FBQ1RGLHNCQUFVQyxNQUFNLENBQU4sRUFBU0UsS0FBVCxDQUFlLE9BQWYsRUFDTEMsR0FESyxDQUNBO0FBQUEsdUJBQUtGLE1BQU1HLENBQU4sQ0FBTDtBQUFBLGFBREEsRUFFTEMsSUFGSyxDQUVBLElBRkEsQ0FBVjtBQUdILFNBSkQsTUFJTztBQUNITixzQkFBVUMsTUFBTSxDQUFOLENBQVY7QUFDSDtBQVp1Qjs7QUFHNUIsV0FBUSxDQUFDWixVQUFVRyxTQUFWLEVBQVQsRUFBaUM7QUFBQTtBQVVoQztBQUNELFdBQU9RLE1BQVA7QUFDSDs7a0JBRWNKLGlCIiwiZmlsZSI6InRlcm1pbmFsLWhpZ2hsaWdodC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjaGFsayBmcm9tICdjaGFsayc7XG5cbmltcG9ydCB0b2tlbml6ZXIgZnJvbSAnLi90b2tlbml6ZSc7XG5pbXBvcnQgSW5wdXQgICAgZnJvbSAnLi9pbnB1dCc7XG5cbmNvbnN0IEhJR0hMSUdIVF9USEVNRSA9IHtcbiAgICAnYnJhY2tldHMnOiBjaGFsay5jeWFuLFxuICAgICdhdC13b3JkJzogIGNoYWxrLmN5YW4sXG4gICAgJ2NhbGwnOiAgICAgY2hhbGsuY3lhbixcbiAgICAnY29tbWVudCc6ICBjaGFsay5ncmF5LFxuICAgICdzdHJpbmcnOiAgIGNoYWxrLmdyZWVuLFxuICAgICdjbGFzcyc6ICAgIGNoYWxrLnllbGxvdyxcbiAgICAnaGFzaCc6ICAgICBjaGFsay5tYWdlbnRhLFxuICAgICcoJzogICAgICAgIGNoYWxrLmN5YW4sXG4gICAgJyknOiAgICAgICAgY2hhbGsuY3lhbixcbiAgICAneyc6ICAgICAgICBjaGFsay55ZWxsb3csXG4gICAgJ30nOiAgICAgICAgY2hhbGsueWVsbG93LFxuICAgICdbJzogICAgICAgIGNoYWxrLnllbGxvdyxcbiAgICAnXSc6ICAgICAgICBjaGFsay55ZWxsb3csXG4gICAgJzonOiAgICAgICAgY2hhbGsueWVsbG93LFxuICAgICc7JzogICAgICAgIGNoYWxrLnllbGxvd1xufTtcblxuZnVuY3Rpb24gZ2V0VG9rZW5UeXBlKFt0eXBlLCB2YWx1ZV0sIHByb2Nlc3Nvcikge1xuICAgIGlmICggdHlwZSA9PT0gJ3dvcmQnICkge1xuICAgICAgICBpZiAoIHZhbHVlWzBdID09PSAnLicgKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NsYXNzJztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHZhbHVlWzBdID09PSAnIycgKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2hhc2gnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCAhcHJvY2Vzc29yLmVuZE9mRmlsZSgpICkge1xuICAgICAgICBsZXQgbmV4dCA9IHByb2Nlc3Nvci5uZXh0VG9rZW4oKTtcbiAgICAgICAgcHJvY2Vzc29yLmJhY2sobmV4dCk7XG4gICAgICAgIGlmICggbmV4dFswXSA9PT0gJ2JyYWNrZXRzJyB8fCBuZXh0WzBdID09PSAnKCcgKSByZXR1cm4gJ2NhbGwnO1xuICAgIH1cblxuICAgIHJldHVybiB0eXBlO1xufVxuXG5mdW5jdGlvbiB0ZXJtaW5hbEhpZ2hsaWdodChjc3MpIHtcbiAgICBsZXQgcHJvY2Vzc29yID0gdG9rZW5pemVyKG5ldyBJbnB1dChjc3MpLCB7IGlnbm9yZUVycm9yczogdHJ1ZSB9KTtcbiAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgd2hpbGUgKCAhcHJvY2Vzc29yLmVuZE9mRmlsZSgpICkge1xuICAgICAgICBsZXQgdG9rZW4gPSBwcm9jZXNzb3IubmV4dFRva2VuKCk7XG4gICAgICAgIGxldCBjb2xvciA9IEhJR0hMSUdIVF9USEVNRVtnZXRUb2tlblR5cGUodG9rZW4sIHByb2Nlc3NvcildO1xuICAgICAgICBpZiAoIGNvbG9yICkge1xuICAgICAgICAgICAgcmVzdWx0ICs9IHRva2VuWzFdLnNwbGl0KC9cXHI/XFxuLylcbiAgICAgICAgICAgICAgICAubWFwKCBpID0+IGNvbG9yKGkpIClcbiAgICAgICAgICAgICAgICAuam9pbignXFxuJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgKz0gdG9rZW5bMV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgdGVybWluYWxIaWdobGlnaHQ7XG4iXX0=

}, function(modId) { var map = {"./tokenize":1625038544322,"./input":1625038544323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544322, function(require, module, exports) {


exports.__esModule = true;
exports.default = tokenizer;
var SINGLE_QUOTE = 39;
var DOUBLE_QUOTE = 34;
var BACKSLASH = 92;
var SLASH = 47;
var NEWLINE = 10;
var SPACE = 32;
var FEED = 12;
var TAB = 9;
var CR = 13;
var OPEN_SQUARE = 91;
var CLOSE_SQUARE = 93;
var OPEN_PARENTHESES = 40;
var CLOSE_PARENTHESES = 41;
var OPEN_CURLY = 123;
var CLOSE_CURLY = 125;
var SEMICOLON = 59;
var ASTERISK = 42;
var COLON = 58;
var AT = 64;

var RE_AT_END = /[ \n\t\r\f\{\}\(\)'"\\;/\[\]#]/g;
var RE_WORD_END = /[ \n\t\r\f\(\)\{\}:;@!'"\\\]\[#]|\/(?=\*)/g;
var RE_BAD_BRACKET = /.[\\\/\("'\n]/;
var RE_HEX_ESCAPE = /[a-f0-9]/i;

function tokenizer(input) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var css = input.css.valueOf();
    var ignore = options.ignoreErrors;

    var code = void 0,
        next = void 0,
        quote = void 0,
        lines = void 0,
        last = void 0,
        content = void 0,
        escape = void 0,
        nextLine = void 0,
        nextOffset = void 0,
        escaped = void 0,
        escapePos = void 0,
        prev = void 0,
        n = void 0,
        currentToken = void 0;

    var length = css.length;
    var offset = -1;
    var line = 1;
    var pos = 0;
    var buffer = [];
    var returned = [];

    function unclosed(what) {
        throw input.error('Unclosed ' + what, line, pos - offset);
    }

    function endOfFile() {
        return returned.length === 0 && pos >= length;
    }

    function nextToken() {
        if (returned.length) return returned.pop();
        if (pos >= length) return;

        code = css.charCodeAt(pos);
        if (code === NEWLINE || code === FEED || code === CR && css.charCodeAt(pos + 1) !== NEWLINE) {
            offset = pos;
            line += 1;
        }

        switch (code) {
            case NEWLINE:
            case SPACE:
            case TAB:
            case CR:
            case FEED:
                next = pos;
                do {
                    next += 1;
                    code = css.charCodeAt(next);
                    if (code === NEWLINE) {
                        offset = next;
                        line += 1;
                    }
                } while (code === SPACE || code === NEWLINE || code === TAB || code === CR || code === FEED);

                currentToken = ['space', css.slice(pos, next)];
                pos = next - 1;
                break;

            case OPEN_SQUARE:
                currentToken = ['[', '[', line, pos - offset];
                break;

            case CLOSE_SQUARE:
                currentToken = [']', ']', line, pos - offset];
                break;

            case OPEN_CURLY:
                currentToken = ['{', '{', line, pos - offset];
                break;

            case CLOSE_CURLY:
                currentToken = ['}', '}', line, pos - offset];
                break;

            case COLON:
                currentToken = [':', ':', line, pos - offset];
                break;

            case SEMICOLON:
                currentToken = [';', ';', line, pos - offset];
                break;

            case OPEN_PARENTHESES:
                prev = buffer.length ? buffer.pop()[1] : '';
                n = css.charCodeAt(pos + 1);
                if (prev === 'url' && n !== SINGLE_QUOTE && n !== DOUBLE_QUOTE && n !== SPACE && n !== NEWLINE && n !== TAB && n !== FEED && n !== CR) {
                    next = pos;
                    do {
                        escaped = false;
                        next = css.indexOf(')', next + 1);
                        if (next === -1) {
                            if (ignore) {
                                next = pos;
                                break;
                            } else {
                                unclosed('bracket');
                            }
                        }
                        escapePos = next;
                        while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                            escapePos -= 1;
                            escaped = !escaped;
                        }
                    } while (escaped);

                    currentToken = ['brackets', css.slice(pos, next + 1), line, pos - offset, line, next - offset];

                    pos = next;
                } else {
                    next = css.indexOf(')', pos + 1);
                    content = css.slice(pos, next + 1);

                    if (next === -1 || RE_BAD_BRACKET.test(content)) {
                        currentToken = ['(', '(', line, pos - offset];
                    } else {
                        currentToken = ['brackets', content, line, pos - offset, line, next - offset];
                        pos = next;
                    }
                }

                break;

            case CLOSE_PARENTHESES:
                currentToken = [')', ')', line, pos - offset];
                break;

            case SINGLE_QUOTE:
            case DOUBLE_QUOTE:
                quote = code === SINGLE_QUOTE ? '\'' : '"';
                next = pos;
                do {
                    escaped = false;
                    next = css.indexOf(quote, next + 1);
                    if (next === -1) {
                        if (ignore) {
                            next = pos + 1;
                            break;
                        } else {
                            unclosed('string');
                        }
                    }
                    escapePos = next;
                    while (css.charCodeAt(escapePos - 1) === BACKSLASH) {
                        escapePos -= 1;
                        escaped = !escaped;
                    }
                } while (escaped);

                content = css.slice(pos, next + 1);
                lines = content.split('\n');
                last = lines.length - 1;

                if (last > 0) {
                    nextLine = line + last;
                    nextOffset = next - lines[last].length;
                } else {
                    nextLine = line;
                    nextOffset = offset;
                }

                currentToken = ['string', css.slice(pos, next + 1), line, pos - offset, nextLine, next - nextOffset];

                offset = nextOffset;
                line = nextLine;
                pos = next;
                break;

            case AT:
                RE_AT_END.lastIndex = pos + 1;
                RE_AT_END.test(css);
                if (RE_AT_END.lastIndex === 0) {
                    next = css.length - 1;
                } else {
                    next = RE_AT_END.lastIndex - 2;
                }

                currentToken = ['at-word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];

                pos = next;
                break;

            case BACKSLASH:
                next = pos;
                escape = true;
                while (css.charCodeAt(next + 1) === BACKSLASH) {
                    next += 1;
                    escape = !escape;
                }
                code = css.charCodeAt(next + 1);
                if (escape && code !== SLASH && code !== SPACE && code !== NEWLINE && code !== TAB && code !== CR && code !== FEED) {
                    next += 1;
                    if (RE_HEX_ESCAPE.test(css.charAt(next))) {
                        while (RE_HEX_ESCAPE.test(css.charAt(next + 1))) {
                            next += 1;
                        }
                        if (css.charCodeAt(next + 1) === SPACE) {
                            next += 1;
                        }
                    }
                }

                currentToken = ['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];

                pos = next;
                break;

            default:
                if (code === SLASH && css.charCodeAt(pos + 1) === ASTERISK) {
                    next = css.indexOf('*/', pos + 2) + 1;
                    if (next === 0) {
                        if (ignore) {
                            next = css.length;
                        } else {
                            unclosed('comment');
                        }
                    }

                    content = css.slice(pos, next + 1);
                    lines = content.split('\n');
                    last = lines.length - 1;

                    if (last > 0) {
                        nextLine = line + last;
                        nextOffset = next - lines[last].length;
                    } else {
                        nextLine = line;
                        nextOffset = offset;
                    }

                    currentToken = ['comment', content, line, pos - offset, nextLine, next - nextOffset];

                    offset = nextOffset;
                    line = nextLine;
                    pos = next;
                } else {
                    RE_WORD_END.lastIndex = pos + 1;
                    RE_WORD_END.test(css);
                    if (RE_WORD_END.lastIndex === 0) {
                        next = css.length - 1;
                    } else {
                        next = RE_WORD_END.lastIndex - 2;
                    }

                    currentToken = ['word', css.slice(pos, next + 1), line, pos - offset, line, next - offset];

                    buffer.push(currentToken);

                    pos = next;
                }

                break;
        }

        pos++;
        return currentToken;
    }

    function back(token) {
        returned.push(token);
    }

    return {
        back: back,
        nextToken: nextToken,
        endOfFile: endOfFile
    };
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRva2VuaXplLmVzNiJdLCJuYW1lcyI6WyJ0b2tlbml6ZXIiLCJTSU5HTEVfUVVPVEUiLCJET1VCTEVfUVVPVEUiLCJCQUNLU0xBU0giLCJTTEFTSCIsIk5FV0xJTkUiLCJTUEFDRSIsIkZFRUQiLCJUQUIiLCJDUiIsIk9QRU5fU1FVQVJFIiwiQ0xPU0VfU1FVQVJFIiwiT1BFTl9QQVJFTlRIRVNFUyIsIkNMT1NFX1BBUkVOVEhFU0VTIiwiT1BFTl9DVVJMWSIsIkNMT1NFX0NVUkxZIiwiU0VNSUNPTE9OIiwiQVNURVJJU0siLCJDT0xPTiIsIkFUIiwiUkVfQVRfRU5EIiwiUkVfV09SRF9FTkQiLCJSRV9CQURfQlJBQ0tFVCIsIlJFX0hFWF9FU0NBUEUiLCJpbnB1dCIsIm9wdGlvbnMiLCJjc3MiLCJ2YWx1ZU9mIiwiaWdub3JlIiwiaWdub3JlRXJyb3JzIiwiY29kZSIsIm5leHQiLCJxdW90ZSIsImxpbmVzIiwibGFzdCIsImNvbnRlbnQiLCJlc2NhcGUiLCJuZXh0TGluZSIsIm5leHRPZmZzZXQiLCJlc2NhcGVkIiwiZXNjYXBlUG9zIiwicHJldiIsIm4iLCJjdXJyZW50VG9rZW4iLCJsZW5ndGgiLCJvZmZzZXQiLCJsaW5lIiwicG9zIiwiYnVmZmVyIiwicmV0dXJuZWQiLCJ1bmNsb3NlZCIsIndoYXQiLCJlcnJvciIsImVuZE9mRmlsZSIsIm5leHRUb2tlbiIsInBvcCIsImNoYXJDb2RlQXQiLCJzbGljZSIsImluZGV4T2YiLCJ0ZXN0Iiwic3BsaXQiLCJsYXN0SW5kZXgiLCJjaGFyQXQiLCJwdXNoIiwiYmFjayIsInRva2VuIl0sIm1hcHBpbmdzIjoiOzs7a0JBeUJ3QkEsUztBQXpCeEIsSUFBTUMsaUJBQU47QUFDQSxJQUFNQyxpQkFBTjtBQUNBLElBQU1DLGNBQU47QUFDQSxJQUFNQyxVQUFOO0FBQ0EsSUFBTUMsWUFBTjtBQUNBLElBQU1DLFVBQU47QUFDQSxJQUFNQyxTQUFOO0FBQ0EsSUFBTUMsT0FBTjtBQUNBLElBQU1DLE9BQU47QUFDQSxJ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ICAgID0gJ1xcJycuY2hhckNvZGVBdCgwKTtcbmNvbnN0IERPVUJMRV9RVU9URSAgICAgID0gICdcIicuY2hhckNvZGVBdCgwKTtcbmNvbnN0IEJBQ0tTTEFTSCAgICAgICAgID0gJ1xcXFwnLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBTTEFTSCAgICAgICAgICAgICA9ICAnLycuY2hhckNvZGVBdCgwKTtcbmNvbnN0IE5FV0xJTkUgICAgICAgICAgID0gJ1xcbicuY2hhckNvZGVBdCgwKTtcbmNvbnN0IFNQQUNFICAgICAgICAgICAgID0gICcgJy5jaGFyQ29kZUF0KDApO1xuY29uc3QgRkVFRCAgICAgICAgICAgICAgPSAnXFxmJy5jaGFyQ29kZUF0KDApO1xuY29uc3QgVEFCICAgICAgICAgICAgICAgPSAnXFx0Jy5jaGFyQ29kZUF0KDApO1xuY29uc3QgQ1IgICAgICAgICAgICAgICAgPSAnXFxyJy5jaGFyQ29kZUF0KDApO1xuY29uc3QgT1BFTl9TUVVBUkUgICAgICAgPSAgJ1snLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBDTE9TRV9TUVVBUkUgICAgICA9ICAnXScuY2hhckNvZGVBdCgwKTtcbmNvbnN0IE9QRU5fUEFSRU5USEVTRVMgID0gICcoJy5jaGFyQ29kZUF0KDApO1xuY29uc3QgQ0xPU0VfUEFSRU5USEVTRVMgPSAgJyknLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBPUEVOX0NVUkxZICAgICAgICA9ICAneycuY2hhckNvZGVBdCgwKTtcbmNvbnN0IENMT1NFX0NVUkxZICAgICAgID0gICd9Jy5jaGFyQ29kZUF0KDApO1xuY29uc3QgU0VNSUNPTE9OICAgICAgICAgPSAgJzsnLmNoYXJDb2RlQXQoMCk7XG5jb25zdCBBU1RFUklTSyAgICAgICAgICA9ICAnKicuY2hhckNvZGVBdCgwKTtcbmNvbnN0IENPTE9OICAgICAgICAgICAgID0gICc6Jy5jaGFyQ29kZUF0KDApO1xuY29uc3QgQVQgICAgICAgICAgICAgICAgPSAgJ0AnLmNoYXJDb2RlQXQoMCk7XG5cbmNvbnN0IFJFX0FUX0VORCAgICAgID0gL1sgXFxuXFx0XFxyXFxmXFx7XFx9XFwoXFwpJ1wiXFxcXDsvXFxbXFxdI10vZztcbmNvbnN0IFJFX1dPUkRfRU5EICAgID0gL1sgXFxuXFx0XFxyXFxmXFwoXFwpXFx7XFx9OjtAISdcIlxcXFxcXF1cXFsjXXxcXC8oPz1cXCopL2c7XG5jb25zdCBSRV9CQURfQlJBQ0tFVCA9IC8uW1xcXFxcXC9cXChcIidcXG5dLztcbmNvbnN0IFJFX0hFWF9FU0NBUEUgID0gL1thLWYwLTldL2k7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHRva2VuaXplcihpbnB1dCwgb3B0aW9ucyA9IHt9KSB7XG4gICAgbGV0IGNzcyA9IGlucHV0LmNzcy52YWx1ZU9mKCk7XG4gICAgbGV0IGlnbm9yZSA9IG9wdGlvbnMuaWdub3JlRXJyb3JzO1xuXG4gICAgbGV0IGNvZGUsIG5leHQsIHF1b3RlLCBsaW5lcywgbGFzdCwgY29udGVudCwgZXNjYXBlLFxuICAgICAgICBuZXh0TGluZSwgbmV4dE9mZnNldCwgZXNjYXBlZCwgZXNjYXBlUG9zLCBwcmV2LCBuLCBjdXJyZW50VG9rZW47XG5cbiAgICBsZXQgbGVuZ3RoID0gY3NzLmxlbmd0aDtcbiAgICBsZXQgb2Zmc2V0ID0gLTE7XG4gICAgbGV0IGxpbmUgPSAxO1xuICAgIGxldCBwb3MgPSAwO1xuICAgIGxldCBidWZmZXIgPSBbXTtcbiAgICBsZXQgcmV0dXJuZWQgPSBbXTtcblxuICAgIGZ1bmN0aW9uIHVuY2xvc2VkKHdoYXQpIHtcbiAgICAgICAgdGhyb3cgaW5wdXQuZXJyb3IoJ1VuY2xvc2VkICcgKyB3aGF0LCBsaW5lLCBwb3MgLSBvZmZzZXQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVuZE9mRmlsZSgpIHtcbiAgICAgICAgcmV0dXJuIHJldHVybmVkLmxlbmd0aCA9PT0gMCAmJiBwb3MgPj0gbGVuZ3RoO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIG5leHRUb2tlbigpIHtcbiAgICAgICAgaWYgKCByZXR1cm5lZC5sZW5ndGggKSByZXR1cm4gcmV0dXJuZWQucG9wKCk7XG4gICAgICAgIGlmICggcG9zID49IGxlbmd0aCApIHJldHVybjtcblxuICAgICAgICBjb2RlID0gY3NzLmNoYXJDb2RlQXQocG9zKTtcbiAgICAgICAgaWYgKCBjb2RlID09PSBORVdMSU5FIHx8IGNvZGUgPT09IEZFRUQgfHxcbiAgICAgICAgICAgICBjb2RlID09PSBDUiAmJiBjc3MuY2hhckNvZGVBdChwb3MgKyAxKSAhPT0gTkVXTElORSApIHtcbiAgICAgICAgICAgIG9mZnNldCA9IHBvcztcbiAgICAgICAgICAgIGxpbmUgKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN3aXRjaCAoIGNvZGUgKSB7XG4gICAgICAgIGNhc2UgTkVXTElORTpcbiAgICAgICAgY2FzZSBTUEFDRTpcbiAgICAgICAgY2FzZSBUQUI6XG4gICAgICAgIGNhc2UgQ1I6XG4gICAgICAgIGNhc2UgRkVFRDpcbiAgICAgICAgICAgIG5leHQgPSBwb3M7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICAgICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoIGNvZGUgPT09IE5FV0xJTkUgKSB7XG4gICAgICAgICAgICAgICAgICAgIG9mZnNldCA9IG5leHQ7XG4gICAgICAgICAgICAgICAgICAgIGxpbmUgKz0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlICggY29kZSA9PT0gU1BBQ0UgICB8fFxuICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPT09IE5FV0xJTkUgfHxcbiAgICAgICAgICAgICAgICAgICAgICBjb2RlID09PSBUQUIgICAgIHx8XG4gICAgICAgICAgICAgICAgICAgICAgY29kZSA9PT0gQ1IgICAgICB8fFxuICAgICAgICAgICAgICAgICAgICAgIGNvZGUgPT09IEZFRUQgKTtcblxuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWydzcGFjZScsIGNzcy5zbGljZShwb3MsIG5leHQpXTtcbiAgICAgICAgICAgIHBvcyA9IG5leHQgLSAxO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBPUEVOX1NRVUFSRTpcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnWycsICdbJywgbGluZSwgcG9zIC0gb2Zmc2V0XTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQ0xPU0VfU1FVQVJFOlxuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWyddJywgJ10nLCBsaW5lLCBwb3MgLSBvZmZzZXRdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBPUEVOX0NVUkxZOlxuICAgICAgICAgICAgY3VycmVudFRva2VuID0gWyd7JywgJ3snLCBsaW5lLCBwb3MgLSBvZmZzZXRdO1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDTE9TRV9DVVJMWTpcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnfScsICd9JywgbGluZSwgcG9zIC0gb2Zmc2V0XTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQ09MT046XG4gICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJzonLCAnOicsIGxpbmUsIHBvcyAtIG9mZnNldF07XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIFNFTUlDT0xPTjpcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnOycsICc7JywgbGluZSwgcG9zIC0gb2Zmc2V0XTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgT1BFTl9QQVJFTlRIRVNFUzpcbiAgICAgICAgICAgIHByZXYgPSBidWZmZXIubGVuZ3RoID8gYnVmZmVyLnBvcCgpWzFdIDogJyc7XG4gICAgICAgICAgICBuICAgID0gY3NzLmNoYXJDb2RlQXQocG9zICsgMSk7XG4gICAgICAgICAgICBpZiAoIHByZXYgPT09ICd1cmwnICYmXG4gICAgICAgICAgICAgICAgIG4gIT09IFNJTkdMRV9RVU9URSAmJiBuICE9PSBET1VCTEVfUVVPVEUgJiZcbiAgICAgICAgICAgICAgICAgbiAhPT0gU1BBQ0UgJiYgbiAhPT0gTkVXTElORSAmJiBuICE9PSBUQUIgJiZcbiAgICAgICAgICAgICAgICAgbiAhPT0gRkVFRCAmJiBuICE9PSBDUiApIHtcbiAgICAgICAgICAgICAgICBuZXh0ID0gcG9zO1xuICAgICAgICAgICAgICAgIGRvIHtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBuZXh0ICAgID0gY3NzLmluZGV4T2YoJyknLCBuZXh0ICsgMSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICggbmV4dCA9PT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIGlnbm9yZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXh0ID0gcG9zO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1bmNsb3NlZCgnYnJhY2tldCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZVBvcyA9IG5leHQ7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlICggY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVzY2FwZVBvcyAtPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZXNjYXBlZCA9ICFlc2NhcGVkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSB3aGlsZSAoIGVzY2FwZWQgKTtcblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYnJhY2tldHMnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksXG4gICAgICAgICAgICAgICAgICAgIGxpbmUsIHBvcyAgLSBvZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICAgICAgcG9zID0gbmV4dDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0ICAgID0gY3NzLmluZGV4T2YoJyknLCBwb3MgKyAxKTtcbiAgICAgICAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBuZXh0ID09PSAtMSB8fCBSRV9CQURfQlJBQ0tFVC50ZXN0KGNvbnRlbnQpICkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJygnLCAnKCcsIGxpbmUsIHBvcyAtIG9mZnNldF07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFRva2VuID0gWydicmFja2V0cycsIGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICBsaW5lLCBwb3MgIC0gb2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgICAgICBwb3MgPSBuZXh0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSBDTE9TRV9QQVJFTlRIRVNFUzpcbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnKScsICcpJywgbGluZSwgcG9zIC0gb2Zmc2V0XTtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgU0lOR0xFX1FVT1RFOlxuICAgICAgICBjYXNlIERPVUJMRV9RVU9URTpcbiAgICAgICAgICAgIHF1b3RlID0gY29kZSA9PT0gU0lOR0xFX1FVT1RFID8gJ1xcJycgOiAnXCInO1xuICAgICAgICAgICAgbmV4dCAgPSBwb3M7XG4gICAgICAgICAgICBkbyB7XG4gICAgICAgICAgICAgICAgZXNjYXBlZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIG5leHQgICAgPSBjc3MuaW5kZXhPZihxdW90ZSwgbmV4dCArIDEpO1xuICAgICAgICAgICAgICAgIGlmICggbmV4dCA9PT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggaWdub3JlICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCA9IHBvcyArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVuY2xvc2VkKCdzdHJpbmcnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlc2NhcGVQb3MgPSBuZXh0O1xuICAgICAgICAgICAgICAgIHdoaWxlICggY3NzLmNoYXJDb2RlQXQoZXNjYXBlUG9zIC0gMSkgPT09IEJBQ0tTTEFTSCApIHtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlUG9zIC09IDE7XG4gICAgICAgICAgICAgICAgICAgIGVzY2FwZWQgPSAhZXNjYXBlZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IHdoaWxlICggZXNjYXBlZCApO1xuXG4gICAgICAgICAgICBjb250ZW50ID0gY3NzLnNsaWNlKHBvcywgbmV4dCArIDEpO1xuICAgICAgICAgICAgbGluZXMgICA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgbGFzdCAgICA9IGxpbmVzLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICAgIGlmICggbGFzdCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV4dExpbmUgICA9IGxpbmUgKyBsYXN0O1xuICAgICAgICAgICAgICAgIG5leHRPZmZzZXQgPSBuZXh0IC0gbGluZXNbbGFzdF0ubGVuZ3RoO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0TGluZSAgID0gbGluZTtcbiAgICAgICAgICAgICAgICBuZXh0T2Zmc2V0ID0gb2Zmc2V0O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3N0cmluZycsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICAgICAgICBsaW5lLCBwb3MgIC0gb2Zmc2V0LFxuICAgICAgICAgICAgICAgIG5leHRMaW5lLCBuZXh0IC0gbmV4dE9mZnNldFxuICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgb2Zmc2V0ID0gbmV4dE9mZnNldDtcbiAgICAgICAgICAgIGxpbmUgICA9IG5leHRMaW5lO1xuICAgICAgICAgICAgcG9zICAgID0gbmV4dDtcbiAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgQVQ6XG4gICAgICAgICAgICBSRV9BVF9FTkQubGFzdEluZGV4ID0gcG9zICsgMTtcbiAgICAgICAgICAgIFJFX0FUX0VORC50ZXN0KGNzcyk7XG4gICAgICAgICAgICBpZiAoIFJFX0FUX0VORC5sYXN0SW5kZXggPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBuZXh0ID0gUkVfQVRfRU5ELmxhc3RJbmRleCAtIDI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnYXQtd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICAgICAgICBsaW5lLCBwb3MgIC0gb2Zmc2V0LFxuICAgICAgICAgICAgICAgIGxpbmUsIG5leHQgLSBvZmZzZXRcbiAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgIHBvcyA9IG5leHQ7XG4gICAgICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlIEJBQ0tTTEFTSDpcbiAgICAgICAgICAgIG5leHQgICA9IHBvcztcbiAgICAgICAgICAgIGVzY2FwZSA9IHRydWU7XG4gICAgICAgICAgICB3aGlsZSAoIGNzcy5jaGFyQ29kZUF0KG5leHQgKyAxKSA9PT0gQkFDS1NMQVNIICkge1xuICAgICAgICAgICAgICAgIG5leHQgICs9IDE7XG4gICAgICAgICAgICAgICAgZXNjYXBlID0gIWVzY2FwZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvZGUgPSBjc3MuY2hhckNvZGVBdChuZXh0ICsgMSk7XG4gICAgICAgICAgICBpZiAoIGVzY2FwZSAmJiAoY29kZSAhPT0gU0xBU0ggICAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgIT09IFNQQUNFICAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlICE9PSBORVdMSU5FICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29kZSAhPT0gVEFCICAgICAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvZGUgIT09IENSICAgICAgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2RlICE9PSBGRUVEICkgKSB7XG4gICAgICAgICAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICggUkVfSEVYX0VTQ0FQRS50ZXN0KGNzcy5jaGFyQXQobmV4dCkpICkge1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoIFJFX0hFWF9FU0NBUEUudGVzdChjc3MuY2hhckF0KG5leHQgKyAxKSkgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0ICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKCBjc3MuY2hhckNvZGVBdChuZXh0ICsgMSkgPT09IFNQQUNFICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbmV4dCArPSAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ3dvcmQnLCBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSksXG4gICAgICAgICAgICAgICAgbGluZSwgcG9zICAtIG9mZnNldCxcbiAgICAgICAgICAgICAgICBsaW5lLCBuZXh0IC0gb2Zmc2V0XG4gICAgICAgICAgICBdO1xuXG4gICAgICAgICAgICBwb3MgPSBuZXh0O1xuICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGlmICggY29kZSA9PT0gU0xBU0ggJiYgY3NzLmNoYXJDb2RlQXQocG9zICsgMSkgPT09IEFTVEVSSVNLICkge1xuICAgICAgICAgICAgICAgIG5leHQgPSBjc3MuaW5kZXhPZignKi8nLCBwb3MgKyAyKSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKCBuZXh0ID09PSAwICkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIGlnbm9yZSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5leHQgPSBjc3MubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5jbG9zZWQoJ2NvbW1lbnQnKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNvbnRlbnQgPSBjc3Muc2xpY2UocG9zLCBuZXh0ICsgMSk7XG4gICAgICAgICAgICAgICAgbGluZXMgICA9IGNvbnRlbnQuc3BsaXQoJ1xcbicpO1xuICAgICAgICAgICAgICAgIGxhc3QgICAgPSBsaW5lcy5sZW5ndGggLSAxO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBsYXN0ID4gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dExpbmUgICA9IGxpbmUgKyBsYXN0O1xuICAgICAgICAgICAgICAgICAgICBuZXh0T2Zmc2V0ID0gbmV4dCAtIGxpbmVzW2xhc3RdLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBuZXh0TGluZSAgID0gbGluZTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dE9mZnNldCA9IG9mZnNldDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjdXJyZW50VG9rZW4gPSBbJ2NvbW1lbnQnLCBjb250ZW50LFxuICAgICAgICAgICAgICAgICAgICBsaW5lLCAgICAgcG9zICAtIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgbmV4dExpbmUsIG5leHQgLSBuZXh0T2Zmc2V0XG4gICAgICAgICAgICAgICAgXTtcblxuICAgICAgICAgICAgICAgIG9mZnNldCA9IG5leHRPZmZzZXQ7XG4gICAgICAgICAgICAgICAgbGluZSAgID0gbmV4dExpbmU7XG4gICAgICAgICAgICAgICAgcG9zICAgID0gbmV4dDtcblxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBSRV9XT1JEX0VORC5sYXN0SW5kZXggPSBwb3MgKyAxO1xuICAgICAgICAgICAgICAgIFJFX1dPUkRfRU5ELnRlc3QoY3NzKTtcbiAgICAgICAgICAgICAgICBpZiAoIFJFX1dPUkRfRU5ELmxhc3RJbmRleCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgbmV4dCA9IGNzcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG5leHQgPSBSRV9XT1JEX0VORC5sYXN0SW5kZXggLSAyO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGN1cnJlbnRUb2tlbiA9IFsnd29yZCcsIGNzcy5zbGljZShwb3MsIG5leHQgKyAxKSxcbiAgICAgICAgICAgICAgICAgICAgbGluZSwgcG9zICAtIG9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgbGluZSwgbmV4dCAtIG9mZnNldFxuICAgICAgICAgICAgICAgIF07XG5cbiAgICAgICAgICAgICAgICBidWZmZXIucHVzaChjdXJyZW50VG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgcG9zID0gbmV4dDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBwb3MrKztcbiAgICAgICAgcmV0dXJuIGN1cnJlbnRUb2tlbjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiYWNrKHRva2VuKSB7XG4gICAgICAgIHJldHVybmVkLnB1c2godG9rZW4pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGJhY2ssXG4gICAgICAgIG5leHRUb2tlbixcbiAgICAgICAgZW5kT2ZGaWxlXG4gICAgfTtcbn1cbiJdfQ==

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544323, function(require, module, exports) {


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _cssSyntaxError = require('./css-syntax-error');

var _cssSyntaxError2 = _interopRequireDefault(_cssSyntaxError);

var _previousMap = require('./previous-map');

var _previousMap2 = _interopRequireDefault(_previousMap);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sequence = 0;

/**
 * Represents the source CSS.
 *
 * @example
 * const root  = postcss.parse(css, { from: file });
 * const input = root.source.input;
 */

var Input = function () {

    /**
     * @param {string} css    - input CSS source
     * @param {object} [opts] - {@link Processor#process} options
     */
    function Input(css) {
        var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _classCallCheck(this, Input);

        if (css === null || (typeof css === 'undefined' ? 'undefined' : _typeof(css)) === 'object' && !css.toString) {
            throw new Error('PostCSS received ' + css + ' instead of CSS string');
        }

        /**
         * @member {string} - input CSS source
         *
         * @example
         * const input = postcss.parse('a{}', { from: file }).input;
         * input.css //=> "a{}";
         */
        this.css = css.toString();

        if (this.css[0] === '\uFEFF' || this.css[0] === '\uFFFE') {
            this.css = this.css.slice(1);
        }

        if (opts.from) {
            if (/^\w+:\/\//.test(opts.from)) {
                /**
                 * @member {string} - The absolute path to the CSS source file
                 *                    defined with the `from` option.
                 *
                 * @example
                 * const root = postcss.parse(css, { from: 'a.css' });
                 * root.source.input.file //=> '/home/ai/a.css'
                 */
                this.file = opts.from;
            } else {
                this.file = _path2.default.resolve(opts.from);
            }
        }

        var map = new _previousMap2.default(this.css, opts);
        if (map.text) {
            /**
             * @member {PreviousMap} - The input source map passed from
             *                         a compilation step before PostCSS
             *                         (for example, from Sass compiler).
             *
             * @example
             * root.source.input.map.consumer().sources //=> ['a.sass']
             */
            this.map = map;
            var file = map.consumer().file;
            if (!this.file && file) this.file = this.mapResolve(file);
        }

        if (!this.file) {
            sequence += 1;
            /**
             * @member {string} - The unique ID of the CSS source. It will be
             *                    created if `from` option is not provided
             *                    (because PostCSS does not know the file path).
             *
             * @example
             * const root = postcss.parse(css);
             * root.source.input.file //=> undefined
             * root.source.input.id   //=> "<input css 1>"
             */
            this.id = '<input css ' + sequence + '>';
        }
        if (this.map) this.map.file = this.from;
    }

    Input.prototype.error = function error(message, line, column) {
        var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

        var result = void 0;
        var origin = this.origin(line, column);
        if (origin) {
            result = new _cssSyntaxError2.default(message, origin.line, origin.column, origin.source, origin.file, opts.plugin);
        } else {
            result = new _cssSyntaxError2.default(message, line, column, this.css, this.file, opts.plugin);
        }

        result.input = { line: line, column: column, source: this.css };
        if (this.file) result.input.file = this.file;

        return result;
    };

    /**
     * Reads the input source map and returns a symbol position
     * in the input source (e.g., in a Sass file that was compiled
     * to CSS before being passed to PostCSS).
     *
     * @param {number} line   - line in input CSS
     * @param {number} column - column in input CSS
     *
     * @return {filePosition} position in input source
     *
     * @example
     * root.source.input.origin(1, 1) //=> { file: 'a.css', line: 3, column: 1 }
     */


    Input.prototype.origin = function origin(line, column) {
        if (!this.map) return false;
        var consumer = this.map.consumer();

        var from = consumer.originalPositionFor({ line: line, column: column });
        if (!from.source) return false;

        var result = {
            file: this.mapResolve(from.source),
            line: from.line,
            column: from.column
        };

        var source = consumer.sourceContentFor(from.source);
        if (source) result.source = source;

        return result;
    };

    Input.prototype.mapResolve = function mapResolve(file) {
        if (/^\w+:\/\//.test(file)) {
            return file;
        } else {
            return _path2.default.resolve(this.map.consumer().sourceRoot || '.', file);
        }
    };

    /**
     * The CSS source identifier. Contains {@link Input#file} if the user
     * set the `from` option, or {@link Input#id} if they did not.
     * @type {string}
     *
     * @example
     * const root = postcss.parse(css, { from: 'a.css' });
     * root.source.input.from //=> "/home/ai/a.css"
     *
     * const root = postcss.parse(css);
     * root.source.input.from //=> "<input css 1>"
     */


    _createClass(Input, [{
        key: 'from',
        get: function get() {
            return this.file || this.id;
        }
    }]);

    return Input;
}();

exports.default = Input;

/**
 * @typedef  {object} filePosition
 * @property {string} file   - path to file
 * @property {number} line   - source line in file
 * @property {number} column - source column in file
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImlucHV0LmVzNiJdLCJuYW1lcyI6WyJzZXF1ZW5jZSIsIklucHV0IiwiY3NzIiwib3B0cyIsInRvU3RyaW5nIiwiRXJyb3IiLCJzbGljZSIsImZyb20iLCJ0ZXN0IiwiZmlsZSIsInBhdGgiLCJyZXNvbHZlIiwibWFwIiwiUHJldmlvdXNNYXAiLCJ0ZXh0IiwiY29uc3VtZXIiLCJtYXBSZXNvbHZlIiwiaWQiLCJlcnJvciIsIm1lc3NhZ2UiLCJsaW5lIiwiY29sdW1uIiwicmVzdWx0Iiwib3JpZ2luIiwiQ3NzU3ludGF4RXJyb3IiLCJzb3VyY2UiLCJwbHVnaW4iLCJpbnB1dCIsIm9yaWdpbmFsUG9zaXRpb25Gb3IiLCJzb3VyY2VDb250ZW50Rm9yIiwic291cmNlUm9vdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTs7OztBQUNBOzs7O0FBRUE7Ozs7Ozs7O0FBRUEsSUFBSUEsV0FBVyxDQUFmOztBQUVBOzs7Ozs7OztJQU9NQyxLOztBQUVGOzs7O0FBSUEsbUJBQVlDLEdBQVosRUFBNkI7QUFBQSxZQUFaQyxJQUFZLHVFQUFMLEVBQUs7O0FBQUE7O0FBQ3pCLFlBQUtELFFBQVEsSUFBUixJQUFnQixRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBZixJQUEyQixDQUFDQSxJQUFJRSxRQUFyRCxFQUFnRTtBQUM1RCxrQkFBTSxJQUFJQyxLQUFKLHVCQUErQkgsR0FBL0IsNEJBQU47QUFDSDs7QUFFRDs7Ozs7OztBQU9BLGFBQUtBLEdBQUwsR0FBV0EsSUFBSUUsUUFBSixFQUFYOztBQUVBLFlBQUssS0FBS0YsR0FBTCxDQUFTLENBQVQsTUFBZ0IsUUFBaEIsSUFBNEIsS0FBS0EsR0FBTCxDQUFTLENBQVQsTUFBZ0IsUUFBakQsRUFBNEQ7QUFDeEQsaUJBQUtBLEdBQUwsR0FBVyxLQUFLQSxHQUFMLENBQVNJLEtBQVQsQ0FBZSxDQUFmLENBQVg7QUFDSDs7QUFFRCxZQUFLSCxLQUFLSSxJQUFWLEVBQWlCO0FBQ2IsZ0JBQUssWUFBWUMsSUFBWixD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QixtQkFBT0EsSUFBUDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPQyxlQUFLQyxPQUFMLENBQWEsS0FBS0MsR0FBTCxDQUFTRyxRQUFULEdBQW9CZSxVQUFwQixJQUFrQyxHQUEvQyxFQUFvRHJCLElBQXBELENBQVA7QUFDSDtBQUNKLEs7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7NEJBWVc7QUFDUCxtQkFBTyxLQUFLQSxJQUFMLElBQWEsS0FBS1EsRUFBekI7QUFDSDs7Ozs7O2tCQUlVaEIsSzs7QUFFZiIsImZpbGUiOiJpbnB1dC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBDc3NTeW50YXhFcnJvciBmcm9tICcuL2Nzcy1zeW50YXgtZXJyb3InO1xuaW1wb3J0IFByZXZpb3VzTWFwICAgIGZyb20gJy4vcHJldmlvdXMtbWFwJztcblxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5cbmxldCBzZXF1ZW5jZSA9IDA7XG5cbi8qKlxuICogUmVwcmVzZW50cyB0aGUgc291cmNlIENTUy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCAgPSBwb3N0Y3NzLnBhcnNlKGNzcywgeyBmcm9tOiBmaWxlIH0pO1xuICogY29uc3QgaW5wdXQgPSByb290LnNvdXJjZS5pbnB1dDtcbiAqL1xuY2xhc3MgSW5wdXQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGNzcyAgICAtIGlucHV0IENTUyBzb3VyY2VcbiAgICAgKiBAcGFyYW0ge29iamVjdH0gW29wdHNdIC0ge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3NzLCBvcHRzID0geyB9KSB7XG4gICAgICAgIGlmICggY3NzID09PSBudWxsIHx8IHR5cGVvZiBjc3MgPT09ICdvYmplY3QnICYmICFjc3MudG9TdHJpbmcgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFBvc3RDU1MgcmVjZWl2ZWQgJHsgY3NzIH0gaW5zdGVhZCBvZiBDU1Mgc3RyaW5nYCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSAtIGlucHV0IENTUyBzb3VyY2VcbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY29uc3QgaW5wdXQgPSBwb3N0Y3NzLnBhcnNlKCdhe30nLCB7IGZyb206IGZpbGUgfSkuaW5wdXQ7XG4gICAgICAgICAqIGlucHV0LmNzcyAvLz0+IFwiYXt9XCI7XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmNzcyA9IGNzcy50b1N0cmluZygpO1xuXG4gICAgICAgIGlmICggdGhpcy5jc3NbMF0gPT09ICdcXHVGRUZGJyB8fCB0aGlzLmNzc1swXSA9PT0gJ1xcdUZGRkUnICkge1xuICAgICAgICAgICAgdGhpcy5jc3MgPSB0aGlzLmNzcy5zbGljZSgxKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggb3B0cy5mcm9tICkge1xuICAgICAgICAgICAgaWYgKCAvXlxcdys6XFwvXFwvLy50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFRoZSBhYnNvbHV0ZSBwYXRoIHRvIHRoZSBDU1Mgc291cmNlIGZpbGVcbiAgICAgICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgZGVmaW5lZCB3aXRoIHRoZSBgZnJvbWAgb3B0aW9uLlxuICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICAgICAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MsIHsgZnJvbTogJ2EuY3NzJyB9KTtcbiAgICAgICAgICAgICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5maWxlIC8vPT4gJy9ob21lL2FpL2EuY3NzJ1xuICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIHRoaXMuZmlsZSA9IG9wdHMuZnJvbTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlID0gcGF0aC5yZXNvbHZlKG9wdHMuZnJvbSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgbWFwID0gbmV3IFByZXZpb3VzTWFwKHRoaXMuY3NzLCBvcHRzKTtcbiAgICAgICAgaWYgKCBtYXAudGV4dCApIHtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7UHJldmlvdXNNYXB9IC0gVGhlIGlucHV0IHNvdXJjZSBtYXAgcGFzc2VkIGZyb21cbiAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIGEgY29tcGlsYXRpb24gc3RlcCBiZWZvcmUgUG9zdENTU1xuICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgKGZvciBleGFtcGxlLCBmcm9tIFNhc3MgY29tcGlsZXIpLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAgICAgKiByb290LnNvdXJjZS5pbnB1dC5tYXAuY29uc3VtZXIoKS5zb3VyY2VzIC8vPT4gWydhLnNhc3MnXVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLm1hcCA9IG1hcDtcbiAgICAgICAgICAgIGxldCBmaWxlID0gbWFwLmNvbnN1bWVyKCkuZmlsZTtcbiAgICAgICAgICAgIGlmICggIXRoaXMuZmlsZSAmJiBmaWxlICkgdGhpcy5maWxlID0gdGhpcy5tYXBSZXNvbHZlKGZpbGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCAhdGhpcy5maWxlICkge1xuICAgICAgICAgICAgc2VxdWVuY2UgKz0gMTtcbiAgICAgICAgICAgIC8qKlxuICAgICAgICAgICAgICogQG1lbWJlciB7c3RyaW5nfSAtIFRoZSB1bmlxdWUgSUQgb2YgdGhlIENTUyBzb3VyY2UuIEl0IHdpbGwgYmVcbiAgICAgICAgICAgICAqICAgICAgICAgICAgICAgICAgICBjcmVhdGVkIGlmIGBmcm9tYCBvcHRpb24gaXMgbm90IHByb3ZpZGVkXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgKGJlY2F1c2UgUG9zdENTUyBkb2VzIG5vdCBrbm93IHRoZSBmaWxlIHBhdGgpLlxuICAgICAgICAgICAgICpcbiAgICAgICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MpO1xuICAgICAgICAgICAgICogcm9vdC5zb3VyY2UuaW5wdXQuZmlsZSAvLz0+IHVuZGVmaW5lZFxuICAgICAgICAgICAgICogcm9vdC5zb3VyY2UuaW5wdXQuaWQgICAvLz0+IFwiPGlucHV0IGNzcyAxPlwiXG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuaWQgICA9ICc8aW5wdXQgY3NzICcgKyBzZXF1ZW5jZSArICc+JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoIHRoaXMubWFwICkgdGhpcy5tYXAuZmlsZSA9IHRoaXMuZnJvbTtcbiAgICB9XG5cbiAgICBlcnJvcihtZXNzYWdlLCBsaW5lLCBjb2x1bW4sIG9wdHMgPSB7IH0pIHtcbiAgICAgICAgbGV0IHJlc3VsdDtcbiAgICAgICAgbGV0IG9yaWdpbiA9IHRoaXMub3JpZ2luKGxpbmUsIGNvbHVtbik7XG4gICAgICAgIGlmICggb3JpZ2luICkge1xuICAgICAgICAgICAgcmVzdWx0ID0gbmV3IENzc1N5bnRheEVycm9yKG1lc3NhZ2UsIG9yaWdpbi5saW5lLCBvcmlnaW4uY29sdW1uLFxuICAgICAgICAgICAgICAgIG9yaWdpbi5zb3VyY2UsIG9yaWdpbi5maWxlLCBvcHRzLnBsdWdpbik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXN1bHQgPSBuZXcgQ3NzU3ludGF4RXJyb3IobWVzc2FnZSwgbGluZSwgY29sdW1uLFxuICAgICAgICAgICAgICAgIHRoaXMuY3NzLCB0aGlzLmZpbGUsIG9wdHMucGx1Z2luKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc3VsdC5pbnB1dCA9IHsgbGluZSwgY29sdW1uLCBzb3VyY2U6IHRoaXMuY3NzIH07XG4gICAgICAgIGlmICggdGhpcy5maWxlICkgcmVzdWx0LmlucHV0LmZpbGUgPSB0aGlzLmZpbGU7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZWFkcyB0aGUgaW5wdXQgc291cmNlIG1hcCBhbmQgcmV0dXJucyBhIHN5bWJvbCBwb3NpdGlvblxuICAgICAqIGluIHRoZSBpbnB1dCBzb3VyY2UgKGUuZy4sIGluIGEgU2FzcyBmaWxlIHRoYXQgd2FzIGNvbXBpbGVkXG4gICAgICogdG8gQ1NTIGJlZm9yZSBiZWluZyBwYXNzZWQgdG8gUG9zdENTUykuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbGluZSAgIC0gbGluZSBpbiBpbnB1dCBDU1NcbiAgICAgKiBAcGFyYW0ge251bWJlcn0gY29sdW1uIC0gY29sdW1uIGluIGlucHV0IENTU1xuICAgICAqXG4gICAgICogQHJldHVybiB7ZmlsZVBvc2l0aW9ufSBwb3NpdGlvbiBpbiBpbnB1dCBzb3VyY2VcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcm9vdC5zb3VyY2UuaW5wdXQub3JpZ2luKDEsIDEpIC8vPT4geyBmaWxlOiAnYS5jc3MnLCBsaW5lOiAzLCBjb2x1bW46IDEgfVxuICAgICAqL1xuICAgIG9yaWdpbihsaW5lLCBjb2x1bW4pIHtcbiAgICAgICAgaWYgKCAhdGhpcy5tYXAgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGxldCBjb25zdW1lciA9IHRoaXMubWFwLmNvbnN1bWVyKCk7XG5cbiAgICAgICAgbGV0IGZyb20gPSBjb25zdW1lci5vcmlnaW5hbFBvc2l0aW9uRm9yKHsgbGluZSwgY29sdW1uIH0pO1xuICAgICAgICBpZiAoICFmcm9tLnNvdXJjZSApIHJldHVybiBmYWxzZTtcblxuICAgICAgICBsZXQgcmVzdWx0ID0ge1xuICAgICAgICAgICAgZmlsZTogICB0aGlzLm1hcFJlc29sdmUoZnJvbS5zb3VyY2UpLFxuICAgICAgICAgICAgbGluZTogICBmcm9tLmxpbmUsXG4gICAgICAgICAgICBjb2x1bW46IGZyb20uY29sdW1uXG4gICAgICAgIH07XG5cbiAgICAgICAgbGV0IHNvdXJjZSA9IGNvbnN1bWVyLnNvdXJjZUNvbnRlbnRGb3IoZnJvbS5zb3VyY2UpO1xuICAgICAgICBpZiAoIHNvdXJjZSApIHJlc3VsdC5zb3VyY2UgPSBzb3VyY2U7XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBtYXBSZXNvbHZlKGZpbGUpIHtcbiAgICAgICAgaWYgKCAvXlxcdys6XFwvXFwvLy50ZXN0KGZpbGUpICkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gcGF0aC5yZXNvbHZlKHRoaXMubWFwLmNvbnN1bWVyKCkuc291cmNlUm9vdCB8fCAnLicsIGZpbGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVGhlIENTUyBzb3VyY2UgaWRlbnRpZmllci4gQ29udGFpbnMge0BsaW5rIElucHV0I2ZpbGV9IGlmIHRoZSB1c2VyXG4gICAgICogc2V0IHRoZSBgZnJvbWAgb3B0aW9uLCBvciB7QGxpbmsgSW5wdXQjaWR9IGlmIHRoZXkgZGlkIG5vdC5cbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MsIHsgZnJvbTogJ2EuY3NzJyB9KTtcbiAgICAgKiByb290LnNvdXJjZS5pbnB1dC5mcm9tIC8vPT4gXCIvaG9tZS9haS9hLmNzc1wiXG4gICAgICpcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MpO1xuICAgICAqIHJvb3Quc291cmNlLmlucHV0LmZyb20gLy89PiBcIjxpbnB1dCBjc3MgMT5cIlxuICAgICAqL1xuICAgIGdldCBmcm9tKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlIHx8IHRoaXMuaWQ7XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IElucHV0O1xuXG4vKipcbiAqIEB0eXBlZGVmICB7b2JqZWN0fSBmaWxlUG9zaXRpb25cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBmaWxlICAgLSBwYXRoIHRvIGZpbGVcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBsaW5lICAgLSBzb3VyY2UgbGluZSBpbiBmaWxlXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29sdW1uIC0gc291cmNlIGNvbHVtbiBpbiBmaWxlXG4gKi9cbiJdfQ==

}, function(modId) { var map = {"./css-syntax-error":1625038544320,"./previous-map":1625038544324}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544324, function(require, module, exports) {


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _sourceMap = require('source-map');

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function fromBase64(str) {
    if (Buffer) {
        if (Buffer.from && Buffer.from !== Uint8Array.from) {
            return Buffer.from(str, 'base64').toString();
        } else {
            return new Buffer(str, 'base64').toString();
        }
    } else {
        return window.atob(str);
    }
}

/**
 * Source map information from input CSS.
 * For example, source map after Sass compiler.
 *
 * This class will automatically find source map in input CSS or in file system
 * near input file (according `from` option).
 *
 * @example
 * const root = postcss.parse(css, { from: 'a.sass.css' });
 * root.input.map //=> PreviousMap
 */

var PreviousMap = function () {

    /**
     * @param {string}         css    - input CSS source
     * @param {processOptions} [opts] - {@link Processor#process} options
     */
    function PreviousMap(css, opts) {
        _classCallCheck(this, PreviousMap);

        this.loadAnnotation(css);
        /**
         * @member {boolean} - Was source map inlined by data-uri to input CSS.
         */
        this.inline = this.startWith(this.annotation, 'data:');

        var prev = opts.map ? opts.map.prev : undefined;
        var text = this.loadMap(opts.from, prev);
        if (text) this.text = text;
    }

    /**
     * Create a instance of `SourceMapGenerator` class
     * from the `source-map` library to work with source map information.
     *
     * It is lazy method, so it will create object only on first call
     * and then it will use cache.
     *
     * @return {SourceMapGenerator} object with source map information
     */


    PreviousMap.prototype.consumer = function consumer() {
        if (!this.consumerCache) {
            this.consumerCache = new _sourceMap2.default.SourceMapConsumer(this.text);
        }
        return this.consumerCache;
    };

    /**
     * Does source map contains `sourcesContent` with input source text.
     *
     * @return {boolean} Is `sourcesContent` present
     */


    PreviousMap.prototype.withContent = function withContent() {
        return !!(this.consumer().sourcesContent && this.consumer().sourcesContent.length > 0);
    };

    PreviousMap.prototype.startWith = function startWith(string, start) {
        if (!string) return false;
        return string.substr(0, start.length) === start;
    };

    PreviousMap.prototype.loadAnnotation = function loadAnnotation(css) {
        var match = css.match(/\/\*\s*# sourceMappingURL=(.*)\s*\*\//);
        if (match) this.annotation = match[1].trim();
    };

    PreviousMap.prototype.decodeInline = function decodeInline(text) {
        // data:application/json;charset=utf-8;base64,
        // data:application/json;charset=utf8;base64,
        // data:application/json;base64,
        var baseUri = /^data:application\/json;(?:charset=utf-?8;)?base64,/;
        var uri = 'data:application/json,';

        if (this.startWith(text, uri)) {
            return decodeURIComponent(text.substr(uri.length));
        } else if (baseUri.test(text)) {
            return fromBase64(text.substr(RegExp.lastMatch.length));
        } else {
            var encoding = text.match(/data:application\/json;([^,]+),/)[1];
            throw new Error('Unsupported source map encoding ' + encoding);
        }
    };

    PreviousMap.prototype.loadMap = function loadMap(file, prev) {
        if (prev === false) return false;

        if (prev) {
            if (typeof prev === 'string') {
                return prev;
            } else if (typeof prev === 'function') {
                var prevPath = prev(file);
                if (prevPath && _fs2.default.existsSync && _fs2.default.existsSync(prevPath)) {
                    return _fs2.default.readFileSync(prevPath, 'utf-8').toString().trim();
                } else {
                    throw new Error('Unable to load previous source map: ' + prevPath.toString());
                }
            } else if (prev instanceof _sourceMap2.default.SourceMapConsumer) {
                return _sourceMap2.default.SourceMapGenerator.fromSourceMap(prev).toString();
            } else if (prev instanceof _sourceMap2.default.SourceMapGenerator) {
                return prev.toString();
            } else if (this.isMap(prev)) {
                return JSON.stringify(prev);
            } else {
                throw new Error('Unsupported previous source map format: ' + prev.toString());
            }
        } else if (this.inline) {
            return this.decodeInline(this.annotation);
        } else if (this.annotation) {
            var map = this.annotation;
            if (file) map = _path2.default.join(_path2.default.dirname(file), map);

            this.root = _path2.default.dirname(map);
            if (_fs2.default.existsSync && _fs2.default.existsSync(map)) {
                return _fs2.default.readFileSync(map, 'utf-8').toString().trim();
            } else {
                return false;
            }
        }
    };

    PreviousMap.prototype.isMap = function isMap(map) {
        if ((typeof map === 'undefined' ? 'undefined' : _typeof(map)) !== 'object') return false;
        return typeof map.mappings === 'string' || typeof map._mappings === 'string';
    };

    return PreviousMap;
}();

exports.default = PreviousMap;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByZXZpb3VzLW1hcC5lczYiXSwibmFtZXMiOlsiZnJvbUJhc2U2NCIsInN0ciIsIkJ1ZmZlciIsImZyb20iLCJVaW50OEFycmF5IiwidG9TdHJpbmciLCJ3aW5kb3ciLCJhdG9iIiwiUHJldmlvdXNNYXAiLCJjc3MiLCJvcHRzIiwibG9hZEFubm90YXRpb24iLCJpbmxpbmUiLCJzdGFydFdpdGgiLCJhbm5vdGF0aW9uIiwicHJldiIsIm1hcCIsInVuZGVmaW5lZCIsInRleHQiLCJsb2FkTWFwIiwiY29uc3VtZXIiLCJjb25zdW1lckNhY2hlIiwibW96aWxsYSIsIlNvdXJjZU1hcENvbnN1bWVyIiwid2l0aENvbnRlbnQiLCJzb3VyY2VzQ29udGVudCIsImxlbmd0aCIsInN0cmluZyIsInN0YXJ0Iiwic3Vic3RyIiwibWF0Y2giLCJ0cmltIiwiZGVjb2RlSW5saW5lIiwiYmFzZVVyaSIsInVyaSIsImRlY29kZVVSSUNvbXBvbmVudCIsInRlc3QiLCJSZWdFeHAiLCJsYXN0TWF0Y2giLCJlbmNvZGluZyIsIkVycm9yIiwiZmlsZSIsInByZXZQYXRoIiwiZnMiLCJleGlzdHNTeW5jIiwicmVhZEZpbGVTeW5jIiwiU291cmNlTWFwR2VuZXJhdG9yIiwiZnJvbVNvdXJjZU1hcCIsImlzTWFwIiwiSlNPTiIsInN0cmluZ2lmeSIsInBhdGgiLCJqb2luIiwiZGlybmFtZSIsInJvb3QiLCJtYXBwaW5ncyIsIl9tYXBwaW5ncyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztBQUVBLFNBQVNBLFVBQVQsQ0FBb0JDLEdBQXBCLEVBQXlCO0FBQ3JCLFFBQUtDLE1BQUwsRUFBYztBQUNWLFlBQUtBLE9BQU9DLElBQVAsSUFBZUQsT0FBT0MsSUFBUCxLQUFnQkMsV0FBV0QsSUFBL0MsRUFBc0Q7QUFDbEQsbUJBQU9ELE9BQU9DLElBQVAsQ0FBWUYsR0FBWixFQUFpQixRQUFqQixFQUEyQkksUUFBM0IsRUFBUDtBQUNILFNBRkQsTUFF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LGFBQUdDLFVBQUgsSUFBaUJELGFBQUdDLFVBQUgsQ0FBYzVCLEdBQWQsQ0FBdEIsRUFBMkM7QUFDdkMsdUJBQU8yQixhQUFHRSxZQUFILENBQWdCN0IsR0FBaEIsRUFBcUIsT0FBckIsRUFBOEJYLFFBQTlCLEdBQXlDMEIsSUFBekMsRUFBUDtBQUNILGFBRkQsTUFFTztBQUNILHVCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0osSzs7MEJBRURpQixLLGtCQUFNaEMsRyxFQUFLO0FBQ1AsWUFBSyxRQUFPQSxHQUFQLHlDQUFPQSxHQUFQLE9BQWUsUUFBcEIsRUFBK0IsT0FBTyxLQUFQO0FBQy9CLGVBQU8sT0FBT0EsSUFBSXVDLFFBQVgsS0FBd0IsUUFBeEIsSUFDQSxPQUFPdkMsSUFBSXdDLFNBQVgsS0FBeUIsUUFEaEM7QUFFSCxLOzs7OztrQkFHVWhELFciLCJmaWxlIjoicHJldmlvdXMtbWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IG1vemlsbGEgIGZyb20gJ3NvdXJjZS1tYXAnO1xuaW1wb3J0IHBhdGggICAgIGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzICAgICAgIGZyb20gJ2ZzJztcblxuZnVuY3Rpb24gZnJvbUJhc2U2NChzdHIpIHtcbiAgICBpZiAoIEJ1ZmZlciApIHtcbiAgICAgICAgaWYgKCBCdWZmZXIuZnJvbSAmJiBCdWZmZXIuZnJvbSAhPT0gVWludDhBcnJheS5mcm9tICkge1xuICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0ciwgJ2Jhc2U2NCcpLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdHIsICdiYXNlNjQnKS50b1N0cmluZygpO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHdpbmRvdy5hdG9iKHN0cik7XG4gICAgfVxufVxuXG4vKipcbiAqIFNvdXJjZSBtYXAgaW5mb3JtYXRpb24gZnJvbSBpbnB1dCBDU1MuXG4gKiBGb3IgZXhhbXBsZSwgc291cmNlIG1hcCBhZnRlciBTYXNzIGNvbXBpbGVyLlxuICpcbiAqIFRoaXMgY2xhc3Mgd2lsbCBhdXRvbWF0aWNhbGx5IGZpbmQgc291cmNlIG1hcCBpbiBpbnB1dCBDU1Mgb3IgaW4gZmlsZSBzeXN0ZW1cbiAqIG5lYXIgaW5wdXQgZmlsZSAoYWNjb3JkaW5nIGBmcm9tYCBvcHRpb24pLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZShjc3MsIHsgZnJvbTogJ2Euc2Fzcy5jc3MnIH0pO1xuICogcm9vdC5pbnB1dC5tYXAgLy89PiBQcmV2aW91c01hcFxuICovXG5jbGFzcyBQcmV2aW91c01hcCB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gICAgICAgICBjc3MgICAgLSBpbnB1dCBDU1Mgc291cmNlXG4gICAgICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gW29wdHNdIC0ge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfSBvcHRpb25zXG4gICAgICovXG4gICAgY29uc3RydWN0b3IoY3NzLCBvcHRzKSB7XG4gICAgICAgIHRoaXMubG9hZEFubm90YXRpb24oY3NzKTtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge2Jvb2xlYW59IC0gV2FzIHNvdXJjZSBtYXAgaW5saW5lZCBieSBkYXRhLXVyaSB0byBpbnB1dCBDU1MuXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLmlubGluZSA9IHRoaXMuc3RhcnRXaXRoKHRoaXMuYW5ub3RhdGlvbiwgJ2RhdGE6Jyk7XG5cbiAgICAgICAgbGV0IHByZXYgPSBvcHRzLm1hcCA/IG9wdHMubWFwLnByZXYgOiB1bmRlZmluZWQ7XG4gICAgICAgIGxldCB0ZXh0ID0gdGhpcy5sb2FkTWFwKG9wdHMuZnJvbSwgcHJldik7XG4gICAgICAgIGlmICggdGV4dCApIHRoaXMudGV4dCA9IHRleHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlIGEgaW5zdGFuY2Ugb2YgYFNvdXJjZU1hcEdlbmVyYXRvcmAgY2xhc3NcbiAgICAgKiBmcm9tIHRoZSBgc291cmNlLW1hcGAgbGlicmFyeSB0byB3b3JrIHdpdGggc291cmNlIG1hcCBpbmZvcm1hdGlvbi5cbiAgICAgKlxuICAgICAqIEl0IGlzIGxhenkgbWV0aG9kLCBzbyBpdCB3aWxsIGNyZWF0ZSBvYmplY3Qgb25seSBvbiBmaXJzdCBjYWxsXG4gICAgICogYW5kIHRoZW4gaXQgd2lsbCB1c2UgY2FjaGUuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtTb3VyY2VNYXBHZW5lcmF0b3J9IG9iamVjdCB3aXRoIHNvdXJjZSBtYXAgaW5mb3JtYXRpb25cbiAgICAgKi9cbiAgICBjb25zdW1lcigpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5jb25zdW1lckNhY2hlICkge1xuICAgICAgICAgICAgdGhpcy5jb25zdW1lckNhY2hlID0gbmV3IG1vemlsbGEuU291cmNlTWFwQ29uc3VtZXIodGhpcy50ZXh0KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb25zdW1lckNhY2hlO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERvZXMgc291cmNlIG1hcCBjb250YWlucyBgc291cmNlc0NvbnRlbnRgIHdpdGggaW5wdXQgc291cmNlIHRleHQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBJcyBgc291cmNlc0NvbnRlbnRgIHByZXNlbnRcbiAgICAgKi9cbiAgICB3aXRoQ29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuICEhKHRoaXMuY29uc3VtZXIoKS5zb3VyY2VzQ29udGVudCAmJlxuICAgICAgICAgICAgICAgICAgdGhpcy5jb25zdW1lcigpLnNvdXJjZXNDb250ZW50Lmxlbmd0aCA+IDApO1xuICAgIH1cblxuICAgIHN0YXJ0V2l0aChzdHJpbmcsIHN0YXJ0KSB7XG4gICAgICAgIGlmICggIXN0cmluZyApIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHN0cmluZy5zdWJzdHIoMCwgc3RhcnQubGVuZ3RoKSA9PT0gc3RhcnQ7XG4gICAgfVxuXG4gICAgbG9hZEFubm90YXRpb24oY3NzKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IGNzcy5tYXRjaCgvXFwvXFwqXFxzKiMgc291cmNlTWFwcGluZ1VSTD0oLiopXFxzKlxcKlxcLy8pO1xuICAgICAgICBpZiAoIG1hdGNoICkgdGhpcy5hbm5vdGF0aW9uID0gbWF0Y2hbMV0udHJpbSgpO1xuICAgIH1cblxuICAgIGRlY29kZUlubGluZSh0ZXh0KSB7XG4gICAgICAgIC8vIGRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcbiAgICAgICAgLy8gZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmODtiYXNlNjQsXG4gICAgICAgIC8vIGRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXG4gICAgICAgIGxldCBiYXNlVXJpID0gL15kYXRhOmFwcGxpY2F0aW9uXFwvanNvbjsoPzpjaGFyc2V0PXV0Zi0/ODspP2Jhc2U2NCwvO1xuICAgICAgICBsZXQgdXJpICAgICA9ICdkYXRhOmFwcGxpY2F0aW9uL2pzb24sJztcblxuICAgICAgICBpZiAoIHRoaXMuc3RhcnRXaXRoKHRleHQsIHVyaSkgKSB7XG4gICAgICAgICAgICByZXR1cm4gZGVjb2RlVVJJQ29tcG9uZW50KCB0ZXh0LnN1YnN0cih1cmkubGVuZ3RoKSApO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIGJhc2VVcmkudGVzdCh0ZXh0KSApIHtcbiAgICAgICAgICAgIHJldHVybiBmcm9tQmFzZTY0KHRleHQuc3Vic3RyKFJlZ0V4cC5sYXN0TWF0Y2gubGVuZ3RoKSk7XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBlbmNvZGluZyA9IHRleHQubWF0Y2goL2RhdGE6YXBwbGljYXRpb25cXC9qc29uOyhbXixdKyksLylbMV07XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHNvdXJjZSBtYXAgZW5jb2RpbmcgJyArIGVuY29kaW5nKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGxvYWRNYXAoZmlsZSwgcHJldikge1xuICAgICAgICBpZiAoIHByZXYgPT09IGZhbHNlICkgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIGlmICggcHJldiApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHByZXYgPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2O1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZW9mIHByZXYgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZQYXRoID0gcHJldihmaWxlKTtcbiAgICAgICAgICAgICAgICBpZiAoIHByZXZQYXRoICYmIGZzLmV4aXN0c1N5bmMgJiYgZnMuZXhpc3RzU3luYyhwcmV2UGF0aCkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMocHJldlBhdGgsICd1dGYtOCcpLnRvU3RyaW5nKCkudHJpbSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5hYmxlIHRvIGxvYWQgcHJldmlvdXMgc291cmNlIG1hcDogJyArXG4gICAgICAgICAgICAgICAgICAgIHByZXZQYXRoLnRvU3RyaW5nKCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHByZXYgaW5zdGFuY2VvZiBtb3ppbGxhLlNvdXJjZU1hcENvbnN1bWVyICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBtb3ppbGxhLlNvdXJjZU1hcEdlbmVyYXRvclxuICAgICAgICAgICAgICAgICAgICAuZnJvbVNvdXJjZU1hcChwcmV2KS50b1N0cmluZygpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggcHJldiBpbnN0YW5jZW9mIG1vemlsbGEuU291cmNlTWFwR2VuZXJhdG9yICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcmV2LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmlzTWFwKHByZXYpICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShwcmV2KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnN1cHBvcnRlZCBwcmV2aW91cyBzb3VyY2UgbWFwIGZvcm1hdDogJyArXG4gICAgICAgICAgICAgICAgICAgIHByZXYudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5pbmxpbmUgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kZWNvZGVJbmxpbmUodGhpcy5hbm5vdGF0aW9uKTtcblxuICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmFubm90YXRpb24gKSB7XG4gICAgICAgICAgICBsZXQgbWFwID0gdGhpcy5hbm5vdGF0aW9uO1xuICAgICAgICAgICAgaWYgKCBmaWxlICkgbWFwID0gcGF0aC5qb2luKHBhdGguZGlybmFtZShmaWxlKSwgbWFwKTtcblxuICAgICAgICAgICAgdGhpcy5yb290ID0gcGF0aC5kaXJuYW1lKG1hcCk7XG4gICAgICAgICAgICBpZiAoIGZzLmV4aXN0c1N5bmMgJiYgZnMuZXhpc3RzU3luYyhtYXApICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmcy5yZWFkRmlsZVN5bmMobWFwLCAndXRmLTgnKS50b1N0cmluZygpLnRyaW0oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNNYXAobWFwKSB7XG4gICAgICAgIGlmICggdHlwZW9mIG1hcCAhPT0gJ29iamVjdCcgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0eXBlb2YgbWFwLm1hcHBpbmdzID09PSAnc3RyaW5nJyB8fFxuICAgICAgICAgICAgICAgdHlwZW9mIG1hcC5fbWFwcGluZ3MgPT09ICdzdHJpbmcnO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUHJldmlvdXNNYXA7XG4iXX0=

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544325, function(require, module, exports) {


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var defaultRaw = {
    colon: ': ',
    indent: '    ',
    beforeDecl: '\n',
    beforeRule: '\n',
    beforeOpen: ' ',
    beforeClose: '\n',
    beforeComment: '\n',
    after: '\n',
    emptyBody: '',
    commentLeft: ' ',
    commentRight: ' '
};

function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);
}

var Stringifier = function () {
    function Stringifier(builder) {
        _classCallCheck(this, Stringifier);

        this.builder = builder;
    }

    Stringifier.prototype.stringify = function stringify(node, semicolon) {
        this[node.type](node, semicolon);
    };

    Stringifier.prototype.root = function root(node) {
        this.body(node);
        if (node.raws.after) this.builder(node.raws.after);
    };

    Stringifier.prototype.comment = function comment(node) {
        var left = this.raw(node, 'left', 'commentLeft');
        var right = this.raw(node, 'right', 'commentRight');
        this.builder('/*' + left + node.text + right + '*/', node);
    };

    Stringifier.prototype.decl = function decl(node, semicolon) {
        var between = this.raw(node, 'between', 'colon');
        var string = node.prop + between + this.rawValue(node, 'value');

        if (node.important) {
            string += node.raws.important || ' !important';
        }

        if (semicolon) string += ';';
        this.builder(string, node);
    };

    Stringifier.prototype.rule = function rule(node) {
        this.block(node, this.rawValue(node, 'selector'));
        if (node.raws.ownSemicolon) {
            this.builder(node.raws.ownSemicolon, node, 'end');
        }
    };

    Stringifier.prototype.atrule = function atrule(node, semicolon) {
        var name = '@' + node.name;
        var params = node.params ? this.rawValue(node, 'params') : '';

        if (typeof node.raws.afterName !== 'undefined') {
            name += node.raws.afterName;
        } else if (params) {
            name += ' ';
        }

        if (node.nodes) {
            this.block(node, name + params);
        } else {
            var end = (node.raws.between || '') + (semicolon ? ';' : '');
            this.builder(name + params + end, node);
        }
    };

    Stringifier.prototype.body = function body(node) {
        var last = node.nodes.length - 1;
        while (last > 0) {
            if (node.nodes[last].type !== 'comment') break;
            last -= 1;
        }

        var semicolon = this.raw(node, 'semicolon');
        for (var i = 0; i < node.nodes.length; i++) {
            var child = node.nodes[i];
            var before = this.raw(child, 'before');
            if (before) this.builder(before);
            this.stringify(child, last !== i || semicolon);
        }
    };

    Stringifier.prototype.block = function block(node, start) {
        var between = this.raw(node, 'between', 'beforeOpen');
        this.builder(start + between + '{', node, 'start');

        var after = void 0;
        if (node.nodes && node.nodes.length) {
            this.body(node);
            after = this.raw(node, 'after');
        } else {
            after = this.raw(node, 'after', 'emptyBody');
        }

        if (after) this.builder(after);
        this.builder('}', node, 'end');
    };

    Stringifier.prototype.raw = function raw(node, own, detect) {
        var value = void 0;
        if (!detect) detect = own;

        // Already had
        if (own) {
            value = node.raws[own];
            if (typeof value !== 'undefined') return value;
        }

        var parent = node.parent;

        // Hack for first rule in CSS
        if (detect === 'before') {
            if (!parent || parent.type === 'root' && parent.first === node) {
                return '';
            }
        }

        // Floating child without parent
        if (!parent) return defaultRaw[detect];

        // Detect style by other nodes
        var root = node.root();
        if (!root.rawCache) root.rawCache = {};
        if (typeof root.rawCache[detect] !== 'undefined') {
            return root.rawCache[detect];
        }

        if (detect === 'before' || detect === 'after') {
            return this.beforeAfter(node, detect);
        } else {
            var method = 'raw' + capitalize(detect);
            if (this[method]) {
                value = this[method](root, node);
            } else {
                root.walk(function (i) {
                    value = i.raws[own];
                    if (typeof value !== 'undefined') return false;
                });
            }
        }

        if (typeof value === 'undefined') value = defaultRaw[detect];

        root.rawCache[detect] = value;
        return value;
    };

    Stringifier.prototype.rawSemicolon = function rawSemicolon(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length && i.last.type === 'decl') {
                value = i.raws.semicolon;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawEmptyBody = function rawEmptyBody(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length === 0) {
                value = i.raws.after;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawIndent = function rawIndent(root) {
        if (root.raws.indent) return root.raws.indent;
        var value = void 0;
        root.walk(function (i) {
            var p = i.parent;
            if (p && p !== root && p.parent && p.parent === root) {
                if (typeof i.raws.before !== 'undefined') {
                    var parts = i.raws.before.split('\n');
                    value = parts[parts.length - 1];
                    value = value.replace(/[^\s]/g, '');
                    return false;
                }
            }
        });
        return value;
    };

    Stringifier.prototype.rawBeforeComment = function rawBeforeComment(root, node) {
        var value = void 0;
        root.walkComments(function (i) {
            if (typeof i.raws.before !== 'undefined') {
                value = i.raws.before;
                if (value.indexOf('\n') !== -1) {
                    value = value.replace(/[^\n]+$/, '');
                }
                return false;
            }
        });
        if (typeof value === 'undefined') {
            value = this.raw(node, null, 'beforeDecl');
        } else if (value) {
            value = value.replace(/[^\s]/g, '');
        }
        return value;
    };

    Stringifier.prototype.rawBeforeDecl = function rawBeforeDecl(root, node) {
        var value = void 0;
        root.walkDecls(function (i) {
            if (typeof i.raws.before !== 'undefined') {
                value = i.raws.before;
                if (value.indexOf('\n') !== -1) {
                    value = value.replace(/[^\n]+$/, '');
                }
                return false;
            }
        });
        if (typeof value === 'undefined') {
            value = this.raw(node, null, 'beforeRule');
        } else if (value) {
            value = value.replace(/[^\s]/g, '');
        }
        return value;
    };

    Stringifier.prototype.rawBeforeRule = function rawBeforeRule(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && (i.parent !== root || root.first !== i)) {
                if (typeof i.raws.before !== 'undefined') {
                    value = i.raws.before;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            }
        });
        if (value) value = value.replace(/[^\s]/g, '');
        return value;
    };

    Stringifier.prototype.rawBeforeClose = function rawBeforeClose(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.nodes && i.nodes.length > 0) {
                if (typeof i.raws.after !== 'undefined') {
                    value = i.raws.after;
                    if (value.indexOf('\n') !== -1) {
                        value = value.replace(/[^\n]+$/, '');
                    }
                    return false;
                }
            }
        });
        if (value) value = value.replace(/[^\s]/g, '');
        return value;
    };

    Stringifier.prototype.rawBeforeOpen = function rawBeforeOpen(root) {
        var value = void 0;
        root.walk(function (i) {
            if (i.type !== 'decl') {
                value = i.raws.between;
                if (typeof value !== 'undefined') return false;
            }
        });
        return value;
    };

    Stringifier.prototype.rawColon = function rawColon(root) {
        var value = void 0;
        root.walkDecls(function (i) {
            if (typeof i.raws.between !== 'undefined') {
                value = i.raws.between.replace(/[^\s:]/g, '');
                return false;
            }
        });
        return value;
    };

    Stringifier.prototype.beforeAfter = function beforeAfter(node, detect) {
        var value = void 0;
        if (node.type === 'decl') {
            value = this.raw(node, null, 'beforeDecl');
        } else if (node.type === 'comment') {
            value = this.raw(node, null, 'beforeComment');
        } else if (detect === 'before') {
            value = this.raw(node, null, 'beforeRule');
        } else {
            value = this.raw(node, null, 'beforeClose');
        }

        var buf = node.parent;
        var depth = 0;
        while (buf && buf.type !== 'root') {
            depth += 1;
            buf = buf.parent;
        }

        if (value.indexOf('\n') !== -1) {
            var indent = this.raw(node, null, 'indent');
            if (indent.length) {
                for (var step = 0; step < depth; step++) {
                    value += indent;
                }
            }
        }

        return value;
    };

    Stringifier.prototype.rawValue = function rawValue(node, prop) {
        var value = node[prop];
        var raw = node.raws[prop];
        if (raw && raw.value === value) {
            return raw.raw;
        } else {
            return value;
        }
    };

    return Stringifier;
}();

exports.default = Stringifier;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmaWVyLmVzNiJdLCJuYW1lcyI6WyJkZWZhdWx0UmF3IiwiY29sb24iLCJpbmRlbnQiLCJiZWZvcmVEZWNsIiwiYmVmb3JlUnVsZSIsImJlZm9yZU9wZW4iLCJiZWZvcmVDbG9zZSIsImJlZm9yZUNvbW1lbnQiLCJhZnRlciIsImVtcHR5Qm9keSIsImNvbW1lbnRMZWZ0IiwiY29tbWVudFJpZ2h0IiwiY2FwaXRhbGl6ZSIsInN0ciIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJTdHJpbmdpZmllciIsImJ1aWxkZXIiLCJzdHJpbmdpZnkiLCJub2RlIiwic2VtaWNvbG9uIiwidHlwZSIsInJvb3QiLCJib2R5IiwicmF3cyIsImNvbW1lbnQiLCJsZWZ0IiwicmF3IiwicmlnaHQiLCJ0ZXh0IiwiZGVjbCIsImJldHdlZW4iLCJzdHJpbmciLCJwcm9wIiwicmF3VmFsdWUiLCJpbXBvcnRhbnQiLCJydWxlIiwiYmxvY2siLCJvd25TZW1pY29sb24iLCJhdHJ1bGUiLCJuYW1lIiwicGFyYW1zIiwiYWZ0ZXJOYW1lIiwibm9kZXMiLCJlbmQiLCJsYXN0IiwibGVuZ3RoIiwiaSIsImNoaWxkIiwiYmVmb3JlIiwic3RhcnQiLCJvd24iLCJkZXRlY3QiLCJ2YWx1ZSIsInBhcmVudCIsImZpcnN0IiwicmF3Q2FjaGUiLCJiZWZvcmVBZnRlciIsIm1ldGhvZCIsIndhbGsiLCJyYXdTZW1pY29sb24iLCJyYXdFbXB0eUJvZHkiLCJyYXdJbmRlbnQiLCJwIiwicGFydHMiLCJzcGxpdCIsInJlcGxhY2UiLCJyYXdCZWZvcmVDb21tZW50Iiwid2Fsa0NvbW1lbnRzIiwiaW5kZXhPZiIsInJhd0JlZm9yZURlY2wiLCJ3YWxrRGVjbHMiLCJyYXdCZWZvcmVSdWxlIiwicmF3QmVmb3JlQ2xvc2UiLCJyYXdCZWZvcmVPcGVuIiwicmF3Q29sb24iLCJidWYiLCJkZXB0aCIsInN0ZXAiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU1BLGFBQWE7QUFDZkMsV0FBZSxJQURBO0FBRWZDLFlBQWUsTUFGQTtBQUdmQyxnQkFBZSxJQUhBO0FBSWZDLGdCQUFlLElBSkE7QUFLZkMsZ0JBQWUsR0FMQTtBQU1mQyxpQkFBZSxJQU5BO0FBT2ZDLG1CQUFlLElBUEE7QUFRZkMsV0FBZSxJQVJBO0FBU2ZDLGVBQWUsRUFUQTtBQVVmQyxpQkFBZSxHQVZBO0FBV2ZDLGtCQUFlO0FBWEEsQ0FBbkI7O0FBY0EsU0FBU0MsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUI7QUFDckIsV0FBT0EsSUFBSSxDQUFKLEVBQU9DLFdBQVAsS0FBdUJELElBQUlFLEtBQUosQ0FBVSxDQUFWLENBQTlCO0FBQ0g7O0lBRUtDLFc7QUFFRix5QkFBWUMsT0FBWixFQUFxQjtBQUFBOztBQUNqQixhQUFLQSxPQUFMLEdBQWVBLE9BQWY7QUFDSDs7MEJBRURDLFMsc0JBQVVDLEksRUFBTUMsUyxFQUFXO0FBQ3ZCLGFBQUtELEtBQUtFLElBQVYsRUFBZ0JGLElBQWhCLEVBQXNCQyxTQUF0QjtBQUNILEs7OzBCQUVERSxJLGlCQUFLSCxJLEVBQU07QUFDUCxhQUFLSSxJQUFMLENBQVVKLElBQVY7QUFDQSxZQUFLQSxLQUFLSyxJQUFMLENBQVVoQixLQUFmLEVBQXVCLEtBQUtTLE9BQUwsQ0FBYUUsS0FBS0ssSUFBTCxDQUFVaEIsS0FBdkI7QUFDMUIsSzs7MEJBRURpQixPLG9CQUFRTixJLEVBQU07QUFDVixZQUFJTyxPQUFRLEtBQUtDLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLE1BQWYsRUFBd0IsYUFBeEIsQ0FBWjtBQUNBLFlBQUlTLFFBQVEsS0FBS0QsR0FBTCxDQUFTUixJQUFULEVBQWUsT0FBZixFQUF3QixjQUF4QixDQUFaO0FBQ0EsYUFBS0YsT0FBTCxDQUFhLE9BQU9TLElBQVAsR0FBY1AsS0FBS1UsSUFBbkIsR0FBMEJELEtBQTFCLEdBQWtDLElBQS9DLEVBQXFEVCxJQUFyRDtBQUNILEs7OzBCQUVEVyxJLGlCQUFLWCxJLEVBQU1DLFMsRUFBVztBQUNsQixZQUFJVyxVQUFVLEtBQUtKLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLFNBQWYsRUFBMEIsT0FBMUIsQ0FBZDtBQUNBLFlBQUlhLFNBQVViLEtBQUtjLElBQUwsR0FBWUYsT0FBWixHQUFzQixLQUFLRyxRQUFMLENBQWNmLElBQWQsRUFBb0IsT0FBcEIsQ0FBcEM7O0FBRUEsWUFBS0EsS0FBS2dCLFNBQVYsRUFBc0I7QUFDbEJILHNCQUFVYixLQUFLSyxJQUFMLENBQVVXLFNBQVYsSUFBdUIsYUFBakM7QUFDSDs7QUFFRCxZQUFLZixTQUFMLEVBQWlCWSxVQUFVLEdBQVY7QUFDakIsYUFBS2YsT0FBTCxDQUFhZSxNQUFiLEVBQXFCYixJQUFyQjtBQUNILEs7OzBCQUVEaUIsSSxpQkFBS2pCLEksRUFBTTtBQUNQLGFBQUtrQixLQUFMLENBQVdsQixJQUFYLEVBQWlCLEtBQUtlLFFBQUwsQ0FBY2YsSUFBZCxFQUFvQixVQUFwQixDQUFqQjtBQUNBLFlBQUtBLEtBQUtLLElBQUwsQ0FBVWMsWUFBZixFQUE4QjtBQUMxQixpQkFBS3JCLE9BQUwsQ0FBYUUsS0FBS0ssSUFBTCxDQUFVYyxZQUF2QixFQUFxQ25CLElBQXJDLEVBQTJDLEtBQTNDO0FBQ0g7QUFDSixLOzswQkFFRG9CLE0sbUJBQU9wQixJLEVBQU1DLFMsRUFBVztBQUNwQixZQUFJb0IsT0FBUyxNQUFNckIsS0FBS3FCLElBQXhCO0FBQ0EsWUFBSUMsU0FBU3RCLEtBQUtzQixNQUFMLEdBQWMsS0FBS1AsUUFBTCxDQUFjZixJQUFkLEVBQW9CLFFBQXBCLENBQWQsR0FBOEMsRUFBM0Q7O0FBRUEsWUFBSyxPQUFPQSxLQUFLSyxJQUFMLENBQVVrQixTQUFqQixLQUErQixXQUFwQyxFQUFrRDtBQUM5Q0Ysb0JBQVFyQixLQUFLSyxJQUFMLENBQVVrQixTQUFsQjtBQUNILFNBRkQsTUFFTyxJQUFLRCxNQUFMLEVBQWM7QUFDakJELG9CQUFRLEdBQVI7QUFDSDs7QUFFRCxZQUFLckIsS0FBS3dCLEtBQVYsRUFBa0I7QUFDZCxpQkFBS04sS0FBTCxDQUFXbEIsSUFBWCxFQUFpQnFCLE9BQU9DLE1BQXhCO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZ0JBQUlHLE1BQU0sQ0FBQ3pCLEtBQUtLLElBQUwsQ0FBVU8sT0FBVixJQUFxQixFQUF0QixLQUE2QlgsWUFBWSxHQUFaLEdBQWtCLEVBQS9DLENBQVY7QUFDQSxpQkFBS0gsT0FBTCxDQUFhdUIsT0FBT0MsTUFBUCxHQUFnQkcsR0FBN0IsRUFBa0N6QixJQUFsQztBQUNIO0FBQ0osSzs7MEJBRURJLEksaUJBQUtKLEksRUFBTTtBQUNQLFlBQUkwQixPQUFPMUIsS0FBS3dCLEtBQUwsQ0FBV0csTUFBWCxHQUFvQixDQUEvQjtBQUNBLGVBQVFELE9BQU8sQ0FBZixFQUFtQjtBQUNmLGdCQUFLMUIsS0FBS3dCLEtBQUwsQ0FBV0UsSUFBWCxFQUFpQnhCLElBQWpCLEtBQTBCLFNBQS9CLEVBQTJDO0FBQzNDd0Isb0JBQVEsQ0FBUjtBQUNIOztBQUVELFlBQUl6QixZQUFZLEtBQUtPLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLFdBQWYsQ0FBaEI7QUFDQSxhQUFNLElBQUk0QixJQUFJLENBQWQsRUFBaUJBLElBQUk1QixLQUFLd0IsS0FBTCxDQUFXRyxNQUFoQyxFQUF3Q0MsR0FBeEMsRUFBOEM7QUFDMUMsZ0JBQUlDLFFBQVM3QixLQUFLd0IsS0FBTCxDQUFXSSxDQUFYLENBQWI7QUFDQSxnQkFBSUUsU0FBUyxLQUFLdEIsR0FBTCxDQUFTcUIsS0FBVCxFQUFnQixRQUFoQixDQUFiO0FBQ0EsZ0JBQUtDLE1BQUwsRUFBYyxLQUFLaEMsT0FBTCxDQUFhZ0MsTUFBYjtBQUNkLGlCQUFLL0IsU0FBTCxDQUFlOEIsS0FBZixFQUFzQkgsU0FBU0UsQ0FBVCxJQUFjM0IsU0FBcEM7QUFDSDtBQUNKLEs7OzBCQUVEaUIsSyxrQkFBTWxCLEksRUFBTStCLEssRUFBTztBQUNmLFlBQUluQixVQUFVLEtBQUtKLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLFNBQWYsRUFBMEIsWUFBMUIsQ0FBZDtBQUNBLGFBQUtGLE9BQUwsQ0FBYWlDLFFBQVFuQixPQUFSLEdBQWtCLEdBQS9CLEVBQW9DWixJQUFwQyxFQUEwQyxPQUExQzs7QUFFQSxZQUFJWCxjQUFKO0FBQ0EsWUFBS1csS0FBS3dCLEtBQUwsSUFBY3hCLEtBQUt3QixLQUFMLENBQVdHLE1BQTlCLEVBQXVDO0FBQ25DLGlCQUFLdkIsSUFBTCxDQUFVSixJQUFWO0FBQ0FYLG9CQUFRLEtBQUttQixHQUFMLENBQVNSLElBQVQsRUFBZSxPQUFmLENBQVI7QUFDSCxTQUhELE1BR087QUFDSFgsb0JBQVEsS0FBS21CLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLE9BQWYsRUFBd0IsV0FBeEIsQ0FBUjtBQUNIOztBQUVELFlBQUtYLEtBQUwsRUFBYSxLQUFLUyxPQUFMLENBQWFULEtBQWI7QUFDYixhQUFLUyxPQUFMLENBQWEsR0FBYixFQUFrQkUsSUFBbEIsRUFBd0IsS0FBeEI7QUFDSCxLOzswQkFFRFEsRyxnQkFBSVIsSSxFQUFNZ0MsRyxFQUFLQyxNLEVBQVE7QUFDbkIsWUFBSUMsY0FBSjtBQUNBLFlBQUssQ0FBQ0QsTUFBTixFQUFlQSxTQUFTRCxHQUFUOztBQUVmO0FBQ0EsWUFBS0EsR0FBTCxFQUFXO0FBQ1BFLG9CQUFRbEMsS0FBS0ssSUFBTCxDQUFVMkIsR0FBVixDQUFSO0FBQ0EsZ0JBQUssT0FBT0UsS0FBUCxLQUFpQixXQUF0QixFQUFvQyxPQUFPQSxLQUFQO0FBQ3ZDOztBQUVELFlBQUlDLFNBQVNuQyxLQUFLbUMsTUFBbEI7O0FBRUE7QUFDQSxZQUFLRixXQUFXLFFBQWhCLEVBQTJCO0FBQ3ZCLGdCQUFLLENBQUNFLE1BQUQsSUFBV0EsT0FBT2pDLElBQVAsS0FBZ0IsTUFBaEIsSUFBMEJpQyxPQUFPQyxLQUFQLEtBQWlCcEMsSUFBM0QsRUFBa0U7QUFDOUQsdUJBQU8sRUFBUDtBQUNIO0FBQ0o7O0FBRUQ7QUFDQSxZQUFLLENBQUNtQyxNQUFOLEVBQWUsT0FBT3RELFdBQVdvRCxNQUFYLENBQVA7O0FBRWY7QUFDQSxZQUFJOUIsT0FBT0gsS0FBS0csSUFBTCxFQUFYO0FBQ0EsWUFBSyxDQUFDQSxLQUFLa0MsUUFBWCxFQUFzQmxDLEtBQUtrQyxRQUFMLEdBQWdCLEVBQWhCO0FBQ3RCLFlBQUssT0FBT2xDLEtBQUtrQyxRQUFMLENBQWNKLE1BQWQsQ0FBUCxLQUFpQyxXQUF0QyxFQUFvRDtBQUNoRCxtQkFBTzlCLEtBQUtrQyxRQUFMLENBQWNKLE1BQWQsQ0FBUDtBQUNIOztBQUVELFlBQUtBLFdBQVcsUUFBWCxJQUF1QkEsV0FBVyxPQUF2QyxFQUFpRDtBQUM3QyxtQkFBTyxLQUFLSyxXQUFMLENBQWlCdEMsSUFBakIsRUFBdUJpQyxNQUF2QixDQUFQO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsZ0JBQUlNLFNBQVMsUUFBUTlDLFdBQVd3QyxNQUFYLENBQXJCO0FBQ0EsZ0JBQUssS0FBS00sTUFBTCxDQUFMLEVBQW9CO0FBQ2hCTCx3QkFBUSxLQUFLSyxNQUFMLEVBQWFwQyxJQUFiLEVBQW1CSCxJQUFuQixDQUFSO0FBQ0gsYUFGRCxNQUVPO0FBQ0hHLHFCQUFLcUMsSUFBTCxDQUFXLGFBQUs7QUFDWk4sNEJBQVFOLEVBQUV2QixJQUFGLENBQU8yQixHQUFQLENBQVI7QUFDQSx3QkFBSyxPQUFPRSxLQUFQLEtBQWlCLFdBQXRCLEVBQW9DLE9BQU8sS0FBUDtBQUN2QyxpQkFIRDtBQUlIO0FBQ0o7O0FBRUQsWUFBSyxPQUFPQSxLQUFQLEtBQWlCLFdBQXRCLEVBQW9DQSxRQUFRckQsV0FBV29ELE1BQVgsQ0FBUjs7QUFFcEM5QixhQUFLa0MsUUFBTCxDQUFjSixNQUFkLElBQXdCQyxLQUF4QjtBQUNBLGVBQU9BLEtBQVA7QUFDSCxLOzswQkFFRE8sWSx5QkFBYXRDLEksRUFBTTtBQUNmLFlBQUkrQixjQUFKO0FBQ0EvQixhQUFLcUMsSUFBTCxDQUFXLGFBQUs7QUFDWixnQkFBS1osRUFBRUosS0FBRixJQUFXSSxFQUFFSixLQUFGLENBQVFHLE1BQW5CLElBQTZCQyxFQUFFRixJQUFGLENBQU94QixJQUFQLEtBQWdCLE1BQWxELEVBQTJEO0FBQ3ZEZ0Msd0JBQVFOLEVBQUV2QixJQUFGLENBQU9KLFNBQWY7QUFDQSxvQkFBSyxPQUFPaUMsS0FBUCxLQUFpQixXQUF0QixFQUFvQyxPQUFPLEtBQVA7QUFDdkM7QUFDSixTQUxEO0FBTUEsZUFBT0EsS0FBUDtBQUNILEs7OzBCQUVEUSxZLHlCQUFhdkMsSSxFQUFNO0FBQ2YsWUFBSStCLGNBQUo7QUFDQS9CLGFBQUtxQyxJQUFMLENBQVcsYUFBSztBQUNaLGdCQUFLWixFQUFFSixLQUFGLElBQVdJLEVBQUVKLEtBQUYsQ0FBUUcsTUFBUixLQUFtQixDQUFuQyxFQUF1QztBQUNuQ08sd0JBQVFOLEVBQUV2QixJQUFGLENBQU9oQixLQUFmO0FBQ0Esb0JBQUssT0FBTzZDLEtBQVAsS0FBaUIsV0FBdEIsRUFBb0MsT0FBTyxLQUFQO0FBQ3ZDO0FBQ0osU0FMRDtBQU1BLGVBQU9BLEtBQVA7QUFDSCxLOzswQkFFRFMsUyxzQkFBVXhDLEksRUFBTTtBQUNaLFlBQUtBLEtBQUtFLElBQUwsQ0FBVXRCLE1BQWYsRUFBd0IsT0FBT29CLEtBQUtFLElBQUwsQ0FBVXRCLE1BQWpCO0FBQ3hCLFlBQUltRCxjQUFKO0FBQ0EvQixhQUFLcUMsSUFBTCxDQUFXLGFBQUs7QUFDWixnQkFBSUksSUFBSWhCLEVBQUVPLE1BQVY7QUFDQSxnQkFBS1MsS0FBS0EsTUFBTXpDLElBQVgsSUFBbUJ5QyxFQUFFVCxNQUFyQixJQUErQlMsRUFBRVQsTUFBRixLQUFhaEMsSUFBakQsRUFBd0Q7QUFDcEQsb0JBQUssT0FBT3lCLEVBQUV2QixJQUFGLENBQU95QixNQUFkLEtBQXlCLFdBQTlCLEVBQTRDO0FBQ3hDLHdCQUFJZSxRQUFRakIsRUFBRXZCLElBQUYsQ0FBT3lCLE1BQVAsQ0FBY2dCLEtBQWQsQ0FBb0IsSUFBcEIsQ0FBWjtBQUNBWiw0QkFBUVcsTUFBTUEsTUFBTWxCLE1BQU4sR0FBZSxDQUFyQixDQUFSO0FBQ0FPLDRCQUFRQSxNQUFNYSxPQUFOLENBQWMsUUFBZCxFQUF3QixFQUF4QixDQUFSO0FBQ0EsMkJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDSixTQVZEO0FBV0EsZUFBT2IsS0FBUDtBQUNILEs7OzBCQUVEYyxnQiw2QkFBaUI3QyxJLEVBQU1ILEksRUFBTTtBQUN6QixZQUFJa0MsY0FBSjtBQUNBL0IsYUFBSzhDLFlBQUwsQ0FBbUIsYUFBSztBQUNwQixnQkFBSyxPQUFPckIsRUFBRXZCLElBQUYsQ0FBT3lCLE1BQWQsS0FBeUIsV0FBOUIsRUFBNEM7QUFDeENJLHdCQUFRTixFQUFFdkIsSUFBRixDQUFPeUIsTUFBZjtBQUNBLG9CQUFLSSxNQUFNZ0IsT0FBTixDQUFjLElBQWQsTUFBd0IsQ0FBQyxDQUE5QixFQUFrQztBQUM5QmhCLDRCQUFRQSxNQUFNYSxPQUFOLENBQWMsU0FBZCxFQUF5QixFQUF6QixDQUFSO0FBQ0g7QUFDRCx1QkFBTyxLQUFQO0FBQ0g7QUFDSixTQVJEO0FBU0EsWUFBSyxPQUFPYixLQUFQLEtBQWlCLFdBQXRCLEVBQW9DO0FBQ2hDQSxvQkFBUSxLQUFLMUIsR0FBTCxDQUFTUixJQUFULEVBQWUsSUFBZixFQUFxQixZQUFyQixDQUFSO0FBQ0gsU0FGRCxNQUVPLElBQUtrQyxLQUFMLEVBQWE7QUFDaEJBLG9CQUFRQSxNQUFNYSxPQUFOLENBQWMsUUFBZCxFQUF3QixFQUF4QixDQUFSO0FBQ0g7QUFDRCxlQUFPYixLQUFQO0FBQ0gsSzs7MEJBRURpQixhLDBCQUFjaEQsSSxFQUFNSCxJLEVBQU07QUFDdEIsWUFBSWtDLGNBQUo7QUFDQS9CLGFBQUtpRCxTQUFMLENBQWdCLGFBQUs7QUFDakIsZ0JBQUssT0FBT3hCLEVBQUV2QixJQUFGLENBQU95QixNQUFkLEtBQXlCLFdBQTlCLEVBQTRDO0FBQ3hDSSx3QkFBUU4sRUFBRXZCLElBQUYsQ0FBT3lCLE1BQWY7QUFDQSxvQkFBS0ksTUFBTWdCLE9BQU4sQ0FBYyxJQUFkLE1BQXdCLENBQUMsQ0FBOUIsRUFBa0M7QUFDOUJoQiw0QkFBUUEsTUFBTWEsT0FBTixDQUFjLFNBQWQsRUFBeUIsRUFBekIsQ0FBUjtBQUNIO0FBQ0QsdUJBQU8sS0FBUDtBQUNIO0FBQ0osU0FSRDtBQVNBLFlBQUssT0FBT2IsS0FBUCxLQUFpQixXQUF0QixFQUFvQztBQUNoQ0Esb0JBQVEsS0FBSzFCLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLElBQWYsRUFBcUIsWUFBckIsQ0FBUjtBQUNILFNBRkQsTUFFTyxJQUFLa0MsS0FBTCxFQUFhO0FBQ2hCQSxvQkFBUUEsTUFBTWEsT0FBTixDQUFjLFFBQWQsRUFBd0IsRUFBeEIsQ0FBUjtBQUNIO0FBQ0QsZUFBT2IsS0FBUDtBQUNILEs7OzBCQUVEbUIsYSwwQkFBY2xELEksRUFBTTtBQUNoQixZQUFJK0IsY0FBSjtBQUNBL0IsYUFBS3FDLElBQUwsQ0FBVyxhQUFLO0FBQ1osZ0JBQUtaLEVBQUVKLEtBQUYsS0FBWUksRUFBRU8sTUFBRixLQUFhaEMsSUFBYixJQUFxQkEsS0FBS2lDLEtBQUwsS0FBZVIsQ0FBaEQsQ0FBTCxFQUEwRDtBQUN0RCxvQkFBSyxPQUFPQSxFQUFFdkIsSUFBRixDQUFPeUIsTUFBZCxLQUF5QixXQUE5QixFQUE0QztBQUN4Q0ksNEJBQVFOLEVBQUV2QixJQUFGLENBQU95QixNQUFmO0FBQ0Esd0JBQUtJLE1BQU1nQixPQUFOLENBQWMsSUFBZCxNQUF3QixDQUFDLENBQTlCLEVBQWtDO0FBQzlCaEIsZ0NBQVFBLE1BQU1hLE9BQU4sQ0FBYyxTQUFkLEVBQXlCLEVBQXpCLENBQVI7QUFDSDtBQUNELDJCQUFPLEtBQVA7QUFDSDtBQUNKO0FBQ0osU0FWRDtBQVdBLFlBQUtiLEtBQUwsRUFBYUEsUUFBUUEsTUFBTWEsT0FBTixDQUFjLFFBQWQsRUFBd0IsRUFBeEIsQ0FBUjtBQUNiLGVBQU9iLEtBQVA7QUFDSCxLOzswQkFFRG9CLGMsMkJBQWVuRCxJLEVBQU07QUFDakIsWUFBSStCLGNBQUo7QUFDQS9CLGFBQUtxQyxJQUFMLENBQVcsYUFBSztBQUNaLGdCQUFLWixFQUFFSixLQUFGLElBQVdJLEVBQUVKLEtBQUYsQ0FBUUcsTUFBUixHQUFpQixDQUFqQyxFQUFxQztBQUNqQyxvQkFBSyxPQUFPQyxFQUFFdkIsSUFBRixDQUFPaEIsS0FBZCxLQUF3QixXQUE3QixFQUEyQztBQUN2QzZDLDRCQUFRTixFQUFFdkIsSUFBRixDQUFPaEIsS0FBZjtBQUNBLHdCQUFLNkMsTUFBTWdCLE9BQU4sQ0FBYyxJQUFkLE1BQXdCLENBQUMsQ0FBOUIsRUFBa0M7QUFDOUJoQixnQ0FBUUEsTUFBTWEsT0FBTixDQUFjLFNBQWQsRUFBeUIsRUFBekIsQ0FBUjtBQUNIO0FBQ0QsMkJBQU8sS0FBUDtBQUNIO0FBQ0o7QUFDSixTQVZEO0FBV0EsWUFBS2IsS0FBTCxFQUFhQSxRQUFRQSxNQUFNYSxPQUFOLENBQWMsUUFBZCxFQUF3QixFQUF4QixDQUFSO0FBQ2IsZUFBT2IsS0FBUDtBQUNILEs7OzBCQUVEcUIsYSwwQkFBY3BELEksRUFBTTtBQUNoQixZQUFJK0IsY0FBSjtBQUNBL0IsYUFBS3FDLElBQUwsQ0FBVyxhQUFLO0FBQ1osZ0JBQUtaLEVBQUUxQixJQUFGLEtBQVcsTUFBaEIsRUFBeUI7QUFDckJnQyx3QkFBUU4sRUFBRXZCLElBQUYsQ0FBT08sT0FBZjtBQUNBLG9CQUFLLE9BQU9zQixLQUFQLEtBQWlCLFdBQXRCLEVBQW9DLE9BQU8sS0FBUDtBQUN2QztBQUNKLFNBTEQ7QUFNQSxlQUFPQSxLQUFQO0FBQ0gsSzs7MEJBRURzQixRLHFCQUFTckQsSSxFQUFNO0FBQ1gsWUFBSStCLGNBQUo7QUFDQS9CLGFBQUtpRCxTQUFMLENBQWdCLGFBQUs7QUFDakIsZ0JBQUssT0FBT3hCLEVBQUV2QixJQUFGLENBQU9PLE9BQWQsS0FBMEIsV0FBL0IsRUFBNkM7QUFDekNzQix3QkFBUU4sRUFBRXZCLElBQUYsQ0FBT08sT0FBUCxDQUFlbUMsT0FBZixDQUF1QixTQUF2QixFQUFrQyxFQUFsQyxDQUFSO0FBQ0EsdUJBQU8sS0FBUDtBQUNIO0FBQ0osU0FMRDtBQU1BLGVBQU9iLEtBQVA7QUFDSCxLOzswQkFFREksVyx3QkFBWXRDLEksRUFBTWlDLE0sRUFBUTtBQUN0QixZQUFJQyxjQUFKO0FBQ0EsWUFBS2xDLEtBQUtFLElBQUwsS0FBYyxNQUFuQixFQUE0QjtBQUN4QmdDLG9CQUFRLEtBQUsxQixHQUFMLENBQVNSLElBQVQsRUFBZSxJQUFmLEVBQXFCLFlBQXJCLENBQVI7QUFDSCxTQUZELE1BRU8sSUFBS0EsS0FBS0UsSUFBTCxLQUFjLFNBQW5CLEVBQStCO0FBQ2xDZ0Msb0JBQVEsS0FBSzFCLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLElBQWYsRUFBcUIsZUFBckIsQ0FBUjtBQUNILFNBRk0sTUFFQSxJQUFLaUMsV0FBVyxRQUFoQixFQUEyQjtBQUM5QkMsb0JBQVEsS0FBSzFCLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLElBQWYsRUFBcUIsWUFBckIsQ0FBUjtBQUNILFNBRk0sTUFFQTtBQUNIa0Msb0JBQVEsS0FBSzFCLEdBQUwsQ0FBU1IsSUFBVCxFQUFlLElBQWYsRUFBcUIsYUFBckIsQ0FBUjtBQUNIOztBQUVELFlBQUl5RCxNQUFRekQsS0FBS21DLE1BQWpCO0FBQ0EsWUFBSXVCLFFBQVEsQ0FBWjtBQUNBLGVBQVFELE9BQU9BLElBQUl2RCxJQUFKLEtBQWEsTUFBNUIsRUFBcUM7QUFDakN3RCxxQkFBUyxDQUFUO0FBQ0FELGtCQUFNQSxJQUFJdEIsTUFBVjtBQUNIOztBQUVELFlBQUtELE1BQU1nQixPQUFOLENBQWMsSUFBZCxNQUF3QixDQUFDLENBQTlCLEVBQWtDO0FBQzlCLGdCQUFJbkUsU0FBUyxLQUFLeUIsR0FBTCxDQUFTUixJQUFULEVBQWUsSUFBZixFQUFxQixRQUFyQixDQUFiO0FBQ0EsZ0JBQUtqQixPQUFPNEMsTUFBWixFQUFxQjtBQUNqQixxQkFBTSxJQUFJZ0MsT0FBTyxDQUFqQixFQUFvQkEsT0FBT0QsS0FBM0IsRUFBa0NDLE1BQWxDO0FBQTJDekIsNkJBQVNuRCxNQUFUO0FBQTNDO0FBQ0g7QUFDSjs7QUFFRCxlQUFPbUQsS0FBUDtBQUNILEs7OzBCQUVEbkIsUSxxQkFBU2YsSSxFQUFNYyxJLEVBQU07QUFDakIsWUFBSW9CLFFBQVFsQyxLQUFLYyxJQUFMLENBQVo7QUFDQSxZQUFJTixNQUFRUixLQUFLSyxJQUFMLENBQVVTLElBQVYsQ0FBWjtBQUNBLFlBQUtOLE9BQU9BLElBQUkwQixLQUFKLEtBQWNBLEtBQTFCLEVBQWtDO0FBQzlCLG1CQUFPMUIsSUFBSUEsR0FBWDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPMEIsS0FBUDtBQUNIO0FBQ0osSzs7Ozs7a0JBSVVyQyxXIiwiZmlsZSI6InN0cmluZ2lmaWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgZGVmYXVsdFJhdyA9IHtcbiAgICBjb2xvbjogICAgICAgICAnOiAnLFxuICAgIGluZGVudDogICAgICAgICcgICAgJyxcbiAgICBiZWZvcmVEZWNsOiAgICAnXFxuJyxcbiAgICBiZWZvcmVSdWxlOiAgICAnXFxuJyxcbiAgICBiZWZvcmVPcGVuOiAgICAnICcsXG4gICAgYmVmb3JlQ2xvc2U6ICAgJ1xcbicsXG4gICAgYmVmb3JlQ29tbWVudDogJ1xcbicsXG4gICAgYWZ0ZXI6ICAgICAgICAgJ1xcbicsXG4gICAgZW1wdHlCb2R5OiAgICAgJycsXG4gICAgY29tbWVudExlZnQ6ICAgJyAnLFxuICAgIGNvbW1lbnRSaWdodDogICcgJ1xufTtcblxuZnVuY3Rpb24gY2FwaXRhbGl6ZShzdHIpIHtcbiAgICByZXR1cm4gc3RyWzBdLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG59XG5cbmNsYXNzIFN0cmluZ2lmaWVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGJ1aWxkZXIpIHtcbiAgICAgICAgdGhpcy5idWlsZGVyID0gYnVpbGRlcjtcbiAgICB9XG5cbiAgICBzdHJpbmdpZnkobm9kZSwgc2VtaWNvbG9uKSB7XG4gICAgICAgIHRoaXNbbm9kZS50eXBlXShub2RlLCBzZW1pY29sb24pO1xuICAgIH1cblxuICAgIHJvb3Qobm9kZSkge1xuICAgICAgICB0aGlzLmJvZHkobm9kZSk7XG4gICAgICAgIGlmICggbm9kZS5yYXdzLmFmdGVyICkgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5hZnRlcik7XG4gICAgfVxuXG4gICAgY29tbWVudChub2RlKSB7XG4gICAgICAgIGxldCBsZWZ0ICA9IHRoaXMucmF3KG5vZGUsICdsZWZ0JywgICdjb21tZW50TGVmdCcpO1xuICAgICAgICBsZXQgcmlnaHQgPSB0aGlzLnJhdyhub2RlLCAncmlnaHQnLCAnY29tbWVudFJpZ2h0Jyk7XG4gICAgICAgIHRoaXMuYnVpbGRlcignLyonICsgbGVmdCArIG5vZGUudGV4dCArIHJpZ2h0ICsgJyovJywgbm9kZSk7XG4gICAgfVxuXG4gICAgZGVjbChub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgbGV0IGJldHdlZW4gPSB0aGlzLnJhdyhub2RlLCAnYmV0d2VlbicsICdjb2xvbicpO1xuICAgICAgICBsZXQgc3RyaW5nICA9IG5vZGUucHJvcCArIGJldHdlZW4gKyB0aGlzLnJhd1ZhbHVlKG5vZGUsICd2YWx1ZScpO1xuXG4gICAgICAgIGlmICggbm9kZS5pbXBvcnRhbnQgKSB7XG4gICAgICAgICAgICBzdHJpbmcgKz0gbm9kZS5yYXdzLmltcG9ydGFudCB8fCAnICFpbXBvcnRhbnQnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBzZW1pY29sb24gKSBzdHJpbmcgKz0gJzsnO1xuICAgICAgICB0aGlzLmJ1aWxkZXIoc3RyaW5nLCBub2RlKTtcbiAgICB9XG5cbiAgICBydWxlKG5vZGUpIHtcbiAgICAgICAgdGhpcy5ibG9jayhub2RlLCB0aGlzLnJhd1ZhbHVlKG5vZGUsICdzZWxlY3RvcicpKTtcbiAgICAgICAgaWYgKCBub2RlLnJhd3Mub3duU2VtaWNvbG9uICkge1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyKG5vZGUucmF3cy5vd25TZW1pY29sb24sIG5vZGUsICdlbmQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGF0cnVsZShub2RlLCBzZW1pY29sb24pIHtcbiAgICAgICAgbGV0IG5hbWUgICA9ICdAJyArIG5vZGUubmFtZTtcbiAgICAgICAgbGV0IHBhcmFtcyA9IG5vZGUucGFyYW1zID8gdGhpcy5yYXdWYWx1ZShub2RlLCAncGFyYW1zJykgOiAnJztcblxuICAgICAgICBpZiAoIHR5cGVvZiBub2RlLnJhd3MuYWZ0ZXJOYW1lICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIG5hbWUgKz0gbm9kZS5yYXdzLmFmdGVyTmFtZTtcbiAgICAgICAgfSBlbHNlIGlmICggcGFyYW1zICkge1xuICAgICAgICAgICAgbmFtZSArPSAnICc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG5vZGUubm9kZXMgKSB7XG4gICAgICAgICAgICB0aGlzLmJsb2NrKG5vZGUsIG5hbWUgKyBwYXJhbXMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGVuZCA9IChub2RlLnJhd3MuYmV0d2VlbiB8fCAnJykgKyAoc2VtaWNvbG9uID8gJzsnIDogJycpO1xuICAgICAgICAgICAgdGhpcy5idWlsZGVyKG5hbWUgKyBwYXJhbXMgKyBlbmQsIG5vZGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYm9keShub2RlKSB7XG4gICAgICAgIGxldCBsYXN0ID0gbm9kZS5ub2Rlcy5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoIGxhc3QgPiAwICkge1xuICAgICAgICAgICAgaWYgKCBub2RlLm5vZGVzW2xhc3RdLnR5cGUgIT09ICdjb21tZW50JyApIGJyZWFrO1xuICAgICAgICAgICAgbGFzdCAtPSAxO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHNlbWljb2xvbiA9IHRoaXMucmF3KG5vZGUsICdzZW1pY29sb24nKTtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgbm9kZS5ub2Rlcy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIGxldCBjaGlsZCAgPSBub2RlLm5vZGVzW2ldO1xuICAgICAgICAgICAgbGV0IGJlZm9yZSA9IHRoaXMucmF3KGNoaWxkLCAnYmVmb3JlJyk7XG4gICAgICAgICAgICBpZiAoIGJlZm9yZSApIHRoaXMuYnVpbGRlcihiZWZvcmUpO1xuICAgICAgICAgICAgdGhpcy5zdHJpbmdpZnkoY2hpbGQsIGxhc3QgIT09IGkgfHwgc2VtaWNvbG9uKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJsb2NrKG5vZGUsIHN0YXJ0KSB7XG4gICAgICAgIGxldCBiZXR3ZWVuID0gdGhpcy5yYXcobm9kZSwgJ2JldHdlZW4nLCAnYmVmb3JlT3BlbicpO1xuICAgICAgICB0aGlzLmJ1aWxkZXIoc3RhcnQgKyBiZXR3ZWVuICsgJ3snLCBub2RlLCAnc3RhcnQnKTtcblxuICAgICAgICBsZXQgYWZ0ZXI7XG4gICAgICAgIGlmICggbm9kZS5ub2RlcyAmJiBub2RlLm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRoaXMuYm9keShub2RlKTtcbiAgICAgICAgICAgIGFmdGVyID0gdGhpcy5yYXcobm9kZSwgJ2FmdGVyJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhZnRlciA9IHRoaXMucmF3KG5vZGUsICdhZnRlcicsICdlbXB0eUJvZHknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICggYWZ0ZXIgKSB0aGlzLmJ1aWxkZXIoYWZ0ZXIpO1xuICAgICAgICB0aGlzLmJ1aWxkZXIoJ30nLCBub2RlLCAnZW5kJyk7XG4gICAgfVxuXG4gICAgcmF3KG5vZGUsIG93biwgZGV0ZWN0KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgaWYgKCAhZGV0ZWN0ICkgZGV0ZWN0ID0gb3duO1xuXG4gICAgICAgIC8vIEFscmVhZHkgaGFkXG4gICAgICAgIGlmICggb3duICkge1xuICAgICAgICAgICAgdmFsdWUgPSBub2RlLnJhd3Nbb3duXTtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyApIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJlbnQgPSBub2RlLnBhcmVudDtcblxuICAgICAgICAvLyBIYWNrIGZvciBmaXJzdCBydWxlIGluIENTU1xuICAgICAgICBpZiAoIGRldGVjdCA9PT0gJ2JlZm9yZScgKSB7XG4gICAgICAgICAgICBpZiAoICFwYXJlbnQgfHwgcGFyZW50LnR5cGUgPT09ICdyb290JyAmJiBwYXJlbnQuZmlyc3QgPT09IG5vZGUgKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRmxvYXRpbmcgY2hpbGQgd2l0aG91dCBwYXJlbnRcbiAgICAgICAgaWYgKCAhcGFyZW50ICkgcmV0dXJuIGRlZmF1bHRSYXdbZGV0ZWN0XTtcblxuICAgICAgICAvLyBEZXRlY3Qgc3R5bGUgYnkgb3RoZXIgbm9kZXNcbiAgICAgICAgbGV0IHJvb3QgPSBub2RlLnJvb3QoKTtcbiAgICAgICAgaWYgKCAhcm9vdC5yYXdDYWNoZSApIHJvb3QucmF3Q2FjaGUgPSB7IH07XG4gICAgICAgIGlmICggdHlwZW9mIHJvb3QucmF3Q2FjaGVbZGV0ZWN0XSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICByZXR1cm4gcm9vdC5yYXdDYWNoZVtkZXRlY3RdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBkZXRlY3QgPT09ICdiZWZvcmUnIHx8IGRldGVjdCA9PT0gJ2FmdGVyJyApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmJlZm9yZUFmdGVyKG5vZGUsIGRldGVjdCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgbWV0aG9kID0gJ3JhdycgKyBjYXBpdGFsaXplKGRldGVjdCk7XG4gICAgICAgICAgICBpZiAoIHRoaXNbbWV0aG9kXSApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHRoaXNbbWV0aG9kXShyb290LCBub2RlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSBpLnJhd3Nbb3duXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICkgdmFsdWUgPSBkZWZhdWx0UmF3W2RldGVjdF07XG5cbiAgICAgICAgcm9vdC5yYXdDYWNoZVtkZXRlY3RdID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdTZW1pY29sb24ocm9vdCkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIHJvb3Qud2FsayggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggJiYgaS5sYXN0LnR5cGUgPT09ICdkZWNsJyApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5zZW1pY29sb247XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnICkgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJhd0VtcHR5Qm9keShyb290KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgIGlmICggaS5ub2RlcyAmJiBpLm5vZGVzLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5hZnRlcjtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiB2YWx1ZSAhPT0gJ3VuZGVmaW5lZCcgKSByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmF3SW5kZW50KHJvb3QpIHtcbiAgICAgICAgaWYgKCByb290LnJhd3MuaW5kZW50ICkgcmV0dXJuIHJvb3QucmF3cy5pbmRlbnQ7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgIGxldCBwID0gaS5wYXJlbnQ7XG4gICAgICAgICAgICBpZiAoIHAgJiYgcCAhPT0gcm9vdCAmJiBwLnBhcmVudCAmJiBwLnBhcmVudCA9PT0gcm9vdCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHBhcnRzID0gaS5yYXdzLmJlZm9yZS5zcGxpdCgnXFxuJyk7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcGFydHNbcGFydHMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdCZWZvcmVDb21tZW50KHJvb3QsIG5vZGUpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICByb290LndhbGtDb21tZW50cyggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBpLnJhd3MuYmVmb3JlICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZWZvcmU7XG4gICAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICggdHlwZW9mIHZhbHVlID09PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgIHZhbHVlID0gdGhpcy5yYXcobm9kZSwgbnVsbCwgJ2JlZm9yZURlY2wnKTtcbiAgICAgICAgfSBlbHNlIGlmICggdmFsdWUgKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIHJhd0JlZm9yZURlY2wocm9vdCwgbm9kZSkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIHJvb3Qud2Fsa0RlY2xzKCBpID0+IHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGkucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZTtcbiAgICAgICAgICAgICAgICBpZiAoIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcbl0rJC8sICcnKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpO1xuICAgICAgICB9IGVsc2UgaWYgKCB2YWx1ZSApIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXHNdL2csICcnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmF3QmVmb3JlUnVsZShyb290KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrKCBpID0+IHtcbiAgICAgICAgICAgIGlmICggaS5ub2RlcyAmJiAoaS5wYXJlbnQgIT09IHJvb3QgfHwgcm9vdC5maXJzdCAhPT0gaSkgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlb2YgaS5yYXdzLmJlZm9yZSAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJlZm9yZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB2YWx1ZS5pbmRleE9mKCdcXG4nKSAhPT0gLTEgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxuXSskLywgJycpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIHZhbHVlICkgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9bXlxcc10vZywgJycpO1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmF3QmVmb3JlQ2xvc2Uocm9vdCkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIHJvb3Qud2FsayggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIGkubm9kZXMgJiYgaS5ub2Rlcy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIGkucmF3cy5hZnRlciAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmFmdGVyO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvW15cXG5dKyQvLCAnJyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmICggdmFsdWUgKSB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1teXFxzXS9nLCAnJyk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdCZWZvcmVPcGVuKHJvb3QpIHtcbiAgICAgICAgbGV0IHZhbHVlO1xuICAgICAgICByb290LndhbGsoIGkgPT4ge1xuICAgICAgICAgICAgaWYgKCBpLnR5cGUgIT09ICdkZWNsJyApIHtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IGkucmF3cy5iZXR3ZWVuO1xuICAgICAgICAgICAgICAgIGlmICggdHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJyApIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdDb2xvbihyb290KSB7XG4gICAgICAgIGxldCB2YWx1ZTtcbiAgICAgICAgcm9vdC53YWxrRGVjbHMoIGkgPT4ge1xuICAgICAgICAgICAgaWYgKCB0eXBlb2YgaS5yYXdzLmJldHdlZW4gIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaS5yYXdzLmJldHdlZW4ucmVwbGFjZSgvW15cXHM6XS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgIH1cblxuICAgIGJlZm9yZUFmdGVyKG5vZGUsIGRldGVjdCkge1xuICAgICAgICBsZXQgdmFsdWU7XG4gICAgICAgIGlmICggbm9kZS50eXBlID09PSAnZGVjbCcgKSB7XG4gICAgICAgICAgICB2YWx1ZSA9IHRoaXMucmF3KG5vZGUsIG51bGwsICdiZWZvcmVEZWNsJyk7XG4gICAgICAgIH0gZWxzZSBpZiAoIG5vZGUudHlwZSA9PT0gJ2NvbW1lbnQnICkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ29tbWVudCcpO1xuICAgICAgICB9IGVsc2UgaWYgKCBkZXRlY3QgPT09ICdiZWZvcmUnICkge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlUnVsZScpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnYmVmb3JlQ2xvc2UnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBidWYgICA9IG5vZGUucGFyZW50O1xuICAgICAgICBsZXQgZGVwdGggPSAwO1xuICAgICAgICB3aGlsZSAoIGJ1ZiAmJiBidWYudHlwZSAhPT0gJ3Jvb3QnICkge1xuICAgICAgICAgICAgZGVwdGggKz0gMTtcbiAgICAgICAgICAgIGJ1ZiA9IGJ1Zi5wYXJlbnQ7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHZhbHVlLmluZGV4T2YoJ1xcbicpICE9PSAtMSApIHtcbiAgICAgICAgICAgIGxldCBpbmRlbnQgPSB0aGlzLnJhdyhub2RlLCBudWxsLCAnaW5kZW50Jyk7XG4gICAgICAgICAgICBpZiAoIGluZGVudC5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgZm9yICggbGV0IHN0ZXAgPSAwOyBzdGVwIDwgZGVwdGg7IHN0ZXArKyApIHZhbHVlICs9IGluZGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICB9XG5cbiAgICByYXdWYWx1ZShub2RlLCBwcm9wKSB7XG4gICAgICAgIGxldCB2YWx1ZSA9IG5vZGVbcHJvcF07XG4gICAgICAgIGxldCByYXcgICA9IG5vZGUucmF3c1twcm9wXTtcbiAgICAgICAgaWYgKCByYXcgJiYgcmF3LnZhbHVlID09PSB2YWx1ZSApIHtcbiAgICAgICAgICAgIHJldHVybiByYXcucmF3O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFN0cmluZ2lmaWVyO1xuIl19

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544326, function(require, module, exports) {


exports.__esModule = true;
exports.default = stringify;

var _stringifier = require('./stringifier');

var _stringifier2 = _interopRequireDefault(_stringifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stringify(node, builder) {
    var str = new _stringifier2.default(builder);
    str.stringify(node);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmluZ2lmeS5lczYiXSwibmFtZXMiOlsic3RyaW5naWZ5Iiwibm9kZSIsImJ1aWxkZXIiLCJzdHIiLCJTdHJpbmdpZmllciJdLCJtYXBwaW5ncyI6Ijs7O2tCQUV3QkEsUzs7QUFGeEI7Ozs7OztBQUVlLFNBQVNBLFNBQVQsQ0FBbUJDLElBQW5CLEVBQXlCQyxPQUF6QixFQUFrQztBQUM3QyxRQUFJQyxNQUFNLElBQUlDLHFCQUFKLENBQWdCRixPQUFoQixDQUFWO0FBQ0FDLFFBQUlILFNBQUosQ0FBY0MsSUFBZDtBQUNIIiwiZmlsZSI6InN0cmluZ2lmeS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBTdHJpbmdpZmllciBmcm9tICcuL3N0cmluZ2lmaWVyJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RyaW5naWZ5KG5vZGUsIGJ1aWxkZXIpIHtcbiAgICBsZXQgc3RyID0gbmV3IFN0cmluZ2lmaWVyKGJ1aWxkZXIpO1xuICAgIHN0ci5zdHJpbmdpZnkobm9kZSk7XG59XG4iXX0=

}, function(modId) { var map = {"./stringifier":1625038544325}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544327, function(require, module, exports) {


exports.__esModule = true;
exports.default = warnOnce;
var printed = {};

function warnOnce(message) {
    if (printed[message]) return;
    printed[message] = true;

    if (typeof console !== 'undefined' && console.warn) console.warn(message);
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm4tb25jZS5lczYiXSwibmFtZXMiOlsid2Fybk9uY2UiLCJwcmludGVkIiwibWVzc2FnZSIsImNvbnNvbGUiLCJ3YXJuIl0sIm1hcHBpbmdzIjoiOzs7a0JBRXdCQSxRO0FBRnhCLElBQUlDLFVBQVUsRUFBZDs7QUFFZSxTQUFTRCxRQUFULENBQWtCRSxPQUFsQixFQUEyQjtBQUN0QyxRQUFLRCxRQUFRQyxPQUFSLENBQUwsRUFBd0I7QUFDeEJELFlBQVFDLE9BQVIsSUFBbUIsSUFBbkI7O0FBRUEsUUFBSyxPQUFPQyxPQUFQLEtBQW1CLFdBQW5CLElBQWtDQSxRQUFRQyxJQUEvQyxFQUFzREQsUUFBUUMsSUFBUixDQUFhRixPQUFiO0FBQ3pEIiwiZmlsZSI6Indhcm4tb25jZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImxldCBwcmludGVkID0geyB9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB3YXJuT25jZShtZXNzYWdlKSB7XG4gICAgaWYgKCBwcmludGVkW21lc3NhZ2VdICkgcmV0dXJuO1xuICAgIHByaW50ZWRbbWVzc2FnZV0gPSB0cnVlO1xuXG4gICAgaWYgKCB0eXBlb2YgY29uc29sZSAhPT0gJ3VuZGVmaW5lZCcgJiYgY29uc29sZS53YXJuICkgY29uc29sZS53YXJuKG1lc3NhZ2UpO1xufVxuIl19

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544328, function(require, module, exports) {


exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _lazyResult = require('./lazy-result');

var _lazyResult2 = _interopRequireDefault(_lazyResult);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Contains plugins to process CSS. Create one `Processor` instance,
 * initialize its plugins, and then use that instance on numerous CSS files.
 *
 * @example
 * const processor = postcss([autoprefixer, precss]);
 * processor.process(css1).then(result => console.log(result.css));
 * processor.process(css2).then(result => console.log(result.css));
 */
var Processor = function () {

  /**
   * @param {Array.<Plugin|pluginFunction>|Processor} plugins - PostCSS
   *        plugins. See {@link Processor#use} for plugin format.
   */
  function Processor() {
    var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, Processor);

    /**
     * @member {string} - Current PostCSS version.
     *
     * @example
     * if ( result.processor.version.split('.')[0] !== '6' ) {
     *   throw new Error('This plugin works only with PostCSS 6');
     * }
     */
    this.version = '6.0.23';
    /**
     * @member {pluginFunction[]} - Plugins added to this processor.
     *
     * @example
     * const processor = postcss([autoprefixer, precss]);
     * processor.plugins.length //=> 2
     */
    this.plugins = this.normalize(plugins);
  }

  /**
   * Adds a plugin to be used as a CSS processor.
   *
   * PostCSS plugin can be in 4 formats:
   * * A plugin created by {@link postcss.plugin} method.
   * * A function. PostCSS will pass the function a @{link Root}
   *   as the first argument and current {@link Result} instance
   *   as the second.
   * * An object with a `postcss` method. PostCSS will use that method
   *   as described in #2.
   * * Another {@link Processor} instance. PostCSS will copy plugins
   *   from that instance into this one.
   *
   * Plugins can also be added by passing them as arguments when creating
   * a `postcss` instance (see [`postcss(plugins)`]).
   *
   * Asynchronous plugins should return a `Promise` instance.
   *
   * @param {Plugin|pluginFunction|Processor} plugin - PostCSS plugin
   *                                                   or {@link Processor}
   *                                                   with plugins
   *
   * @example
   * const processor = postcss()
   *   .use(autoprefixer)
   *   .use(precss);
   *
   * @return {Processes} current processor to make methods chain
   */


  Processor.prototype.use = function use(plugin) {
    this.plugins = this.plugins.concat(this.normalize([plugin]));
    return this;
  };

  /**
   * Parses source CSS and returns a {@link LazyResult} Promise proxy.
   * Because some plugins can be asynchronous it doesn’t make
   * any transformations. Transformations will be applied
   * in the {@link LazyResult} methods.
   *
   * @param {string|toString|Result} css - String with input CSS or
   *                                       any object with a `toString()`
   *                                       method, like a Buffer.
   *                                       Optionally, send a {@link Result}
   *                                       instance and the processor will
   *                                       take the {@link Root} from it.
   * @param {processOptions} [opts]      - options
   *
   * @return {LazyResult} Promise proxy
   *
   * @example
   * processor.process(css, { from: 'a.css', to: 'a.out.css' })
   *   .then(result => {
   *      console.log(result.css);
   *   });
   */


  Processor.prototype.process = function process(css) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    return new _lazyResult2.default(this, css, opts);
  };

  Processor.prototype.normalize = function normalize(plugins) {
    var normalized = [];
    for (var _iterator = plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var i = _ref;

      if (i.postcss) i = i.postcss;

      if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && Array.isArray(i.plugins)) {
        normalized = normalized.concat(i.plugins);
      } else if (typeof i === 'function') {
        normalized.push(i);
      } else if ((typeof i === 'undefined' ? 'undefined' : _typeof(i)) === 'object' && (i.parse || i.stringify)) {
        throw new Error('PostCSS syntaxes cannot be used as plugins. ' + 'Instead, please use one of the ' + 'syntax/parser/stringifier options as ' + 'outlined in your PostCSS ' + 'runner documentation.');
      } else {
        throw new Error(i + ' is not a PostCSS plugin');
      }
    }
    return normalized;
  };

  return Processor;
}();

exports.default = Processor;

/**
 * @callback builder
 * @param {string} part          - part of generated CSS connected to this node
 * @param {Node}   node          - AST node
 * @param {"start"|"end"} [type] - node’s part type
 */

/**
 * @callback parser
 *
 * @param {string|toString} css   - string with input CSS or any object
 *                                  with toString() method, like a Buffer
 * @param {processOptions} [opts] - options with only `from` and `map` keys
 *
 * @return {Root} PostCSS AST
 */

/**
 * @callback stringifier
 *
 * @param {Node} node       - start node for stringifing. Usually {@link Root}.
 * @param {builder} builder - function to concatenate CSS from node’s parts
 *                            or generate string and source map
 *
 * @return {void}
 */

/**
 * @typedef {object} syntax
 * @property {parser} parse          - function to generate AST by string
 * @property {stringifier} stringify - function to generate string by AST
 */

/**
 * @typedef {object} toString
 * @property {function} toString
 */

/**
 * @callback pluginFunction
 * @param {Root} root     - parsed input CSS
 * @param {Result} result - result to set warnings or check other plugins
 */

/**
 * @typedef {object} Plugin
 * @property {function} postcss - PostCSS plugin function
 */

/**
 * @typedef {object} processOptions
 * @property {string} from             - the path of the CSS source file.
 *                                       You should always set `from`,
 *                                       because it is used in source map
 *                                       generation and syntax error messages.
 * @property {string} to               - the path where you’ll put the output
 *                                       CSS file. You should always set `to`
 *                                       to generate correct source maps.
 * @property {parser} parser           - function to generate AST by string
 * @property {stringifier} stringifier - class to generate string by AST
 * @property {syntax} syntax           - object with `parse` and `stringify`
 * @property {object} map              - source map options
 * @property {boolean} map.inline                    - does source map should
 *                                                     be embedded in the output
 *                                                     CSS as a base64-encoded
 *                                                     comment
 * @property {string|object|false|function} map.prev - source map content
 *                                                     from a previous
 *                                                     processing step
 *                                                     (for example, Sass).
 *                                                     PostCSS will try to find
 *                                                     previous map
 *                                                     automatically, so you
 *                                                     could disable it by
 *                                                     `false` value.
 * @property {boolean} map.sourcesContent            - does PostCSS should set
 *                                                     the origin content to map
 * @property {string|false} map.annotation           - does PostCSS should set
 *                                                     annotation comment to map
 * @property {string} map.from                       - override `from` in map’s
 *                                                     `sources`
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2Nlc3Nvci5lczYiXSwibmFtZXMiOlsiUHJvY2Vzc29yIiwicGx1Z2lucyIsInZlcnNpb24iLCJub3JtYWxpemUiLCJ1c2UiLCJwbHVnaW4iLCJjb25jYXQiLCJwcm9jZXNzIiwiY3NzIiwib3B0cyIsIkxhenlSZXN1bHQiLCJub3JtYWxpemVkIiwiaSIsInBvc3Rjc3MiLCJBcnJheSIsImlzQXJyYXkiLCJwdXNoIiwicGFyc2UiLCJzdHJpbmdpZnkiLCJFcnJvciJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7O0FBRUE7Ozs7Ozs7OztJQVNNQSxTOztBQUVGOzs7O0FBSUEsdUJBQTBCO0FBQUEsUUFBZEMsT0FBYyx1RUFBSixFQUFJOztBQUFBOztBQUN0Qjs7Ozs7Ozs7QUFRQSxTQUFLQyxPQUFMLEdBQWUsUUFBZjtBQUNBOzs7Ozs7O0FBT0EsU0FBS0QsT0FBTCxHQUFlLEtBQUtFLFNBQUwsQ0FBZUYsT0FBZixDQUFmO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7c0JBNkJBRyxHLGdCQUFJQyxNLEVBQVE7QUFDUixTQUFLSixPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhSyxNQUFiLENBQW9CLEtBQUtILFNBQUwsQ0FBZSxDQUFDRSxNQUFELENBQWYsQ0FBcEIsQ0FBZjtBQUNBLFdBQU8sSUFBUDtBQUNILEc7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztzQkFzQkFFLE8sb0JBQVFDLEcsRUFBaUI7QUFBQSxRQUFaQyxJQUFZLHVFQUFMLEVBQUs7O0FBQ3JCLFdBQU8sSUFBSUMsb0JBQUosQ0FBZSxJQUFmLEVBQXFCRixHQUFyQixFQUEwQkMsSUFBMUIsQ0FBUDtBQUNILEc7O3NCQUVETixTLHNCQUFVRixPLEVBQVM7QUFDZixRQUFJVSxhQUFhLEVBQWpCO0FBQ0EseUJBQWVWLE9BQWYsa0hBQXlCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSxVQUFmVyxDQUFlOztBQUNyQixVQUFLQSxFQUFFQyxPQUFQLEVBQWlCRCxJQUFJQSxFQUFFQyxPQUFOOztBQUVqQixVQUFLLFFBQU9ELENBQVAseUNBQU9BLENBQVAsT0FBYSxRQUFiLElBQXlCRSxNQUFNQyxPQUFOLENBQWNILEVBQUVYLE9BQWhCLENBQTlCLEVBQXlEO0FBQ3JEVSxxQkFBYUEsV0FBV0wsTUFBWCxDQUFrQk0sRUFBRVgsT0FBcEIsQ0FBYjtBQUNILE9BRkQsTUFFTyxJQUFLLE9BQU9XLENBQVAsS0FBYSxVQUFsQixFQUErQjtBQUNsQ0QsbUJBQVdLLElBQVgsQ0FBZ0JKLENBQWhCO0FBQ0gsT0FGTSxNQUVBLElBQUssUUFBT0EsQ0FBUCx5Q0FBT0EsQ0FBUCxPQUFhLFFBQWIsS0FBMEJBLEVBQUVLLEtBQUYsSUFBV0wsRUFBRU0sU0FBdkMsQ0FBTCxFQUF5RDtBQUM1RCxjQUFNLElBQUlDLEtBQUosQ0FBVSxpREFDQSxpQ0FEQSxHQUVBLHVDQUZBLEdBR0EsMkJBSEEsR0FJQSx1QkFKVixDQUFOO0FBS0gsT0FOTSxNQU1BO0FBQ0gsY0FBTSxJQUFJQSxLQUFKLENBQVVQLElBQUksMEJBQWQsQ0FBTjtBQUNIO0FBQ0o7QUFDRCxXQUFPRCxVQUFQO0FBQ0gsRzs7Ozs7a0JBSVVYLFM7O0FBRWY7Ozs7Ozs7QUFPQTs7Ozs7Ozs7OztBQVVBOzs7Ozs7Ozs7O0FBVUE7Ozs7OztBQU1BOzs7OztBQUtBOzs7Ozs7QUFNQTs7Ozs7QUFLQSIsImZpbGUiOiJwcm9jZXNzb3IuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGF6eVJlc3VsdCBmcm9tICcuL2xhenktcmVzdWx0JztcblxuLyoqXG4gKiBDb250YWlucyBwbHVnaW5zIHRvIHByb2Nlc3MgQ1NTLiBDcmVhdGUgb25lIGBQcm9jZXNzb3JgIGluc3RhbmNlLFxuICogaW5pdGlhbGl6ZSBpdHMgcGx1Z2lucywgYW5kIHRoZW4gdXNlIHRoYXQgaW5zdGFuY2Ugb24gbnVtZXJvdXMgQ1NTIGZpbGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKFthdXRvcHJlZml4ZXIsIHByZWNzc10pO1xuICogcHJvY2Vzc29yLnByb2Nlc3MoY3NzMSkudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LmNzcykpO1xuICogcHJvY2Vzc29yLnByb2Nlc3MoY3NzMikudGhlbihyZXN1bHQgPT4gY29uc29sZS5sb2cocmVzdWx0LmNzcykpO1xuICovXG5jbGFzcyBQcm9jZXNzb3Ige1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtBcnJheS48UGx1Z2lufHBsdWdpbkZ1bmN0aW9uPnxQcm9jZXNzb3J9IHBsdWdpbnMgLSBQb3N0Q1NTXG4gICAgICogICAgICAgIHBsdWdpbnMuIFNlZSB7QGxpbmsgUHJvY2Vzc29yI3VzZX0gZm9yIHBsdWdpbiBmb3JtYXQuXG4gICAgICovXG4gICAgY29uc3RydWN0b3IocGx1Z2lucyA9IFtdKSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gQ3VycmVudCBQb3N0Q1NTIHZlcnNpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGlmICggcmVzdWx0LnByb2Nlc3Nvci52ZXJzaW9uLnNwbGl0KCcuJylbMF0gIT09ICc2JyApIHtcbiAgICAgICAgICogICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgcGx1Z2luIHdvcmtzIG9ubHkgd2l0aCBQb3N0Q1NTIDYnKTtcbiAgICAgICAgICogfVxuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy52ZXJzaW9uID0gJzYuMC4yMyc7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtwbHVnaW5GdW5jdGlvbltdfSAtIFBsdWdpbnMgYWRkZWQgdG8gdGhpcyBwcm9jZXNzb3IuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGNvbnN0IHByb2Nlc3NvciA9IHBvc3Rjc3MoW2F1dG9wcmVmaXhlciwgcHJlY3NzXSk7XG4gICAgICAgICAqIHByb2Nlc3Nvci5wbHVnaW5zLmxlbmd0aCAvLz0+IDJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMucGx1Z2lucyA9IHRoaXMubm9ybWFsaXplKHBsdWdpbnMpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBwbHVnaW4gdG8gYmUgdXNlZCBhcyBhIENTUyBwcm9jZXNzb3IuXG4gICAgICpcbiAgICAgKiBQb3N0Q1NTIHBsdWdpbiBjYW4gYmUgaW4gNCBmb3JtYXRzOlxuICAgICAqICogQSBwbHVnaW4gY3JlYXRlZCBieSB7QGxpbmsgcG9zdGNzcy5wbHVnaW59IG1ldGhvZC5cbiAgICAgKiAqIEEgZnVuY3Rpb24uIFBvc3RDU1Mgd2lsbCBwYXNzIHRoZSBmdW5jdGlvbiBhIEB7bGluayBSb290fVxuICAgICAqICAgYXMgdGhlIGZpcnN0IGFyZ3VtZW50IGFuZCBjdXJyZW50IHtAbGluayBSZXN1bHR9IGluc3RhbmNlXG4gICAgICogICBhcyB0aGUgc2Vjb25kLlxuICAgICAqICogQW4gb2JqZWN0IHdpdGggYSBgcG9zdGNzc2AgbWV0aG9kLiBQb3N0Q1NTIHdpbGwgdXNlIHRoYXQgbWV0aG9kXG4gICAgICogICBhcyBkZXNjcmliZWQgaW4gIzIuXG4gICAgICogKiBBbm90aGVyIHtAbGluayBQcm9jZXNzb3J9IGluc3RhbmNlLiBQb3N0Q1NTIHdpbGwgY29weSBwbHVnaW5zXG4gICAgICogICBmcm9tIHRoYXQgaW5zdGFuY2UgaW50byB0aGlzIG9uZS5cbiAgICAgKlxuICAgICAqIFBsdWdpbnMgY2FuIGFsc28gYmUgYWRkZWQgYnkgcGFzc2luZyB0aGVtIGFzIGFyZ3VtZW50cyB3aGVuIGNyZWF0aW5nXG4gICAgICogYSBgcG9zdGNzc2AgaW5zdGFuY2UgKHNlZSBbYHBvc3Rjc3MocGx1Z2lucylgXSkuXG4gICAgICpcbiAgICAgKiBBc3luY2hyb25vdXMgcGx1Z2lucyBzaG91bGQgcmV0dXJuIGEgYFByb21pc2VgIGluc3RhbmNlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtQbHVnaW58cGx1Z2luRnVuY3Rpb258UHJvY2Vzc29yfSBwbHVnaW4gLSBQb3N0Q1NTIHBsdWdpblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb3Ige0BsaW5rIFByb2Nlc3Nvcn1cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpdGggcGx1Z2luc1xuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCBwcm9jZXNzb3IgPSBwb3N0Y3NzKClcbiAgICAgKiAgIC51c2UoYXV0b3ByZWZpeGVyKVxuICAgICAqICAgLnVzZShwcmVjc3MpO1xuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvY2Vzc2VzfSBjdXJyZW50IHByb2Nlc3NvciB0byBtYWtlIG1ldGhvZHMgY2hhaW5cbiAgICAgKi9cbiAgICB1c2UocGx1Z2luKSB7XG4gICAgICAgIHRoaXMucGx1Z2lucyA9IHRoaXMucGx1Z2lucy5jb25jYXQodGhpcy5ub3JtYWxpemUoW3BsdWdpbl0pKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFyc2VzIHNvdXJjZSBDU1MgYW5kIHJldHVybnMgYSB7QGxpbmsgTGF6eVJlc3VsdH0gUHJvbWlzZSBwcm94eS5cbiAgICAgKiBCZWNhdXNlIHNvbWUgcGx1Z2lucyBjYW4gYmUgYXN5bmNocm9ub3VzIGl0IGRvZXNu4oCZdCBtYWtlXG4gICAgICogYW55IHRyYW5zZm9ybWF0aW9ucy4gVHJhbnNmb3JtYXRpb25zIHdpbGwgYmUgYXBwbGllZFxuICAgICAqIGluIHRoZSB7QGxpbmsgTGF6eVJlc3VsdH0gbWV0aG9kcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfHRvU3RyaW5nfFJlc3VsdH0gY3NzIC0gU3RyaW5nIHdpdGggaW5wdXQgQ1NTIG9yXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbnkgb2JqZWN0IHdpdGggYSBgdG9TdHJpbmcoKWBcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1ldGhvZCwgbGlrZSBhIEJ1ZmZlci5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE9wdGlvbmFsbHksIHNlbmQgYSB7QGxpbmsgUmVzdWx0fVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaW5zdGFuY2UgYW5kIHRoZSBwcm9jZXNzb3Igd2lsbFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFrZSB0aGUge0BsaW5rIFJvb3R9IGZyb20gaXQuXG4gICAgICogQHBhcmFtIHtwcm9jZXNzT3B0aW9uc30gW29wdHNdICAgICAgLSBvcHRpb25zXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtMYXp5UmVzdWx0fSBQcm9taXNlIHByb3h5XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHByb2Nlc3Nvci5wcm9jZXNzKGNzcywgeyBmcm9tOiAnYS5jc3MnLCB0bzogJ2Eub3V0LmNzcycgfSlcbiAgICAgKiAgIC50aGVuKHJlc3VsdCA9PiB7XG4gICAgICogICAgICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKTtcbiAgICAgKiAgIH0pO1xuICAgICAqL1xuICAgIHByb2Nlc3MoY3NzLCBvcHRzID0geyB9KSB7XG4gICAgICAgIHJldHVybiBuZXcgTGF6eVJlc3VsdCh0aGlzLCBjc3MsIG9wdHMpO1xuICAgIH1cblxuICAgIG5vcm1hbGl6ZShwbHVnaW5zKSB7XG4gICAgICAgIGxldCBub3JtYWxpemVkID0gW107XG4gICAgICAgIGZvciAoIGxldCBpIG9mIHBsdWdpbnMgKSB7XG4gICAgICAgICAgICBpZiAoIGkucG9zdGNzcyApIGkgPSBpLnBvc3Rjc3M7XG5cbiAgICAgICAgICAgIGlmICggdHlwZW9mIGkgPT09ICdvYmplY3QnICYmIEFycmF5LmlzQXJyYXkoaS5wbHVnaW5zKSApIHtcbiAgICAgICAgICAgICAgICBub3JtYWxpemVkID0gbm9ybWFsaXplZC5jb25jYXQoaS5wbHVnaW5zKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBpID09PSAnZnVuY3Rpb24nICkge1xuICAgICAgICAgICAgICAgIG5vcm1hbGl6ZWQucHVzaChpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiBpID09PSAnb2JqZWN0JyAmJiAoaS5wYXJzZSB8fCBpLnN0cmluZ2lmeSkgKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3N0Q1NTIHN5bnRheGVzIGNhbm5vdCBiZSB1c2VkIGFzIHBsdWdpbnMuICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnSW5zdGVhZCwgcGxlYXNlIHVzZSBvbmUgb2YgdGhlICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnc3ludGF4L3BhcnNlci9zdHJpbmdpZmllciBvcHRpb25zIGFzICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnb3V0bGluZWQgaW4geW91ciBQb3N0Q1NTICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAncnVubmVyIGRvY3VtZW50YXRpb24uJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihpICsgJyBpcyBub3QgYSBQb3N0Q1NTIHBsdWdpbicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBub3JtYWxpemVkO1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBQcm9jZXNzb3I7XG5cbi8qKlxuICogQGNhbGxiYWNrIGJ1aWxkZXJcbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJ0ICAgICAgICAgIC0gcGFydCBvZiBnZW5lcmF0ZWQgQ1NTIGNvbm5lY3RlZCB0byB0aGlzIG5vZGVcbiAqIEBwYXJhbSB7Tm9kZX0gICBub2RlICAgICAgICAgIC0gQVNUIG5vZGVcbiAqIEBwYXJhbSB7XCJzdGFydFwifFwiZW5kXCJ9IFt0eXBlXSAtIG5vZGXigJlzIHBhcnQgdHlwZVxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHBhcnNlclxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfHRvU3RyaW5nfSBjc3MgICAtIHN0cmluZyB3aXRoIGlucHV0IENTUyBvciBhbnkgb2JqZWN0XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aXRoIHRvU3RyaW5nKCkgbWV0aG9kLCBsaWtlIGEgQnVmZmVyXG4gKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBbb3B0c10gLSBvcHRpb25zIHdpdGggb25seSBgZnJvbWAgYW5kIGBtYXBgIGtleXNcbiAqXG4gKiBAcmV0dXJuIHtSb290fSBQb3N0Q1NTIEFTVFxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHN0cmluZ2lmaWVyXG4gKlxuICogQHBhcmFtIHtOb2RlfSBub2RlICAgICAgIC0gc3RhcnQgbm9kZSBmb3Igc3RyaW5naWZpbmcuIFVzdWFsbHkge0BsaW5rIFJvb3R9LlxuICogQHBhcmFtIHtidWlsZGVyfSBidWlsZGVyIC0gZnVuY3Rpb24gdG8gY29uY2F0ZW5hdGUgQ1NTIGZyb20gbm9kZeKAmXMgcGFydHNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIGdlbmVyYXRlIHN0cmluZyBhbmQgc291cmNlIG1hcFxuICpcbiAqIEByZXR1cm4ge3ZvaWR9XG4gKi9cblxuLyoqXG4gKiBAdHlwZWRlZiB7b2JqZWN0fSBzeW50YXhcbiAqIEBwcm9wZXJ0eSB7cGFyc2VyfSBwYXJzZSAgICAgICAgICAtIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIEFTVCBieSBzdHJpbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5naWZpZXJ9IHN0cmluZ2lmeSAtIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIHN0cmluZyBieSBBU1RcbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHRvU3RyaW5nXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSB0b1N0cmluZ1xuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIHBsdWdpbkZ1bmN0aW9uXG4gKiBAcGFyYW0ge1Jvb3R9IHJvb3QgICAgIC0gcGFyc2VkIGlucHV0IENTU1xuICogQHBhcmFtIHtSZXN1bHR9IHJlc3VsdCAtIHJlc3VsdCB0byBzZXQgd2FybmluZ3Mgb3IgY2hlY2sgb3RoZXIgcGx1Z2luc1xuICovXG5cbi8qKlxuICogQHR5cGVkZWYge29iamVjdH0gUGx1Z2luXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBwb3N0Y3NzIC0gUG9zdENTUyBwbHVnaW4gZnVuY3Rpb25cbiAqL1xuXG4vKipcbiAqIEB0eXBlZGVmIHtvYmplY3R9IHByb2Nlc3NPcHRpb25zXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZnJvbSAgICAgICAgICAgICAtIHRoZSBwYXRoIG9mIHRoZSBDU1Mgc291cmNlIGZpbGUuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFlvdSBzaG91bGQgYWx3YXlzIHNldCBgZnJvbWAsXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJlY2F1c2UgaXQgaXMgdXNlZCBpbiBzb3VyY2UgbWFwXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRpb24gYW5kIHN5bnRheCBlcnJvciBtZXNzYWdlcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0byAgICAgICAgICAgICAgIC0gdGhlIHBhdGggd2hlcmUgeW914oCZbGwgcHV0IHRoZSBvdXRwdXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQ1NTIGZpbGUuIFlvdSBzaG91bGQgYWx3YXlzIHNldCBgdG9gXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRvIGdlbmVyYXRlIGNvcnJlY3Qgc291cmNlIG1hcHMuXG4gKiBAcHJvcGVydHkge3BhcnNlcn0gcGFyc2VyICAgICAgICAgICAtIGZ1bmN0aW9uIHRvIGdlbmVyYXRlIEFTVCBieSBzdHJpbmdcbiAqIEBwcm9wZXJ0eSB7c3RyaW5naWZpZXJ9IHN0cmluZ2lmaWVyIC0gY2xhc3MgdG8gZ2VuZXJhdGUgc3RyaW5nIGJ5IEFTVFxuICogQHByb3BlcnR5IHtzeW50YXh9IHN5bnRheCAgICAgICAgICAgLSBvYmplY3Qgd2l0aCBgcGFyc2VgIGFuZCBgc3RyaW5naWZ5YFxuICogQHByb3BlcnR5IHtvYmplY3R9IG1hcCAgICAgICAgICAgICAgLSBzb3VyY2UgbWFwIG9wdGlvbnNcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbWFwLmlubGluZSAgICAgICAgICAgICAgICAgICAgLSBkb2VzIHNvdXJjZSBtYXAgc2hvdWxkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYmUgZW1iZWRkZWQgaW4gdGhlIG91dHB1dFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENTUyBhcyBhIGJhc2U2NC1lbmNvZGVkXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29tbWVudFxuICogQHByb3BlcnR5IHtzdHJpbmd8b2JqZWN0fGZhbHNlfGZ1bmN0aW9ufSBtYXAucHJldiAtIHNvdXJjZSBtYXAgY29udGVudFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb20gYSBwcmV2aW91c1xuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2Nlc3Npbmcgc3RlcFxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIChmb3IgZXhhbXBsZSwgU2FzcykuXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUG9zdENTUyB3aWxsIHRyeSB0byBmaW5kXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmlvdXMgbWFwXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYXV0b21hdGljYWxseSwgc28geW91XG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY291bGQgZGlzYWJsZSBpdCBieVxuICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGBmYWxzZWAgdmFsdWUuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IG1hcC5zb3VyY2VzQ29udGVudCAgICAgICAgICAgIC0gZG9lcyBQb3N0Q1NTIHNob3VsZCBzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgb3JpZ2luIGNvbnRlbnQgdG8gbWFwXG4gKiBAcHJvcGVydHkge3N0cmluZ3xmYWxzZX0gbWFwLmFubm90YXRpb24gICAgICAgICAgIC0gZG9lcyBQb3N0Q1NTIHNob3VsZCBzZXRcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhbm5vdGF0aW9uIGNvbW1lbnQgdG8gbWFwXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWFwLmZyb20gICAgICAgICAgICAgICAgICAgICAgIC0gb3ZlcnJpZGUgYGZyb21gIGluIG1hcOKAmXNcbiAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBgc291cmNlc2BcbiAqL1xuIl19

}, function(modId) { var map = {"./lazy-result":1625038544329}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544329, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _mapGenerator = require('./map-generator');

var _mapGenerator2 = _interopRequireDefault(_mapGenerator);

var _stringify2 = require('./stringify');

var _stringify3 = _interopRequireDefault(_stringify2);

var _warnOnce = require('./warn-once');

var _warnOnce2 = _interopRequireDefault(_warnOnce);

var _result = require('./result');

var _result2 = _interopRequireDefault(_result);

var _parse = require('./parse');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function isPromise(obj) {
    return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object' && typeof obj.then === 'function';
}

/**
 * A Promise proxy for the result of PostCSS transformations.
 *
 * A `LazyResult` instance is returned by {@link Processor#process}.
 *
 * @example
 * const lazy = postcss([cssnext]).process(css);
 */

var LazyResult = function () {
    function LazyResult(processor, css, opts) {
        _classCallCheck(this, LazyResult);

        this.stringified = false;
        this.processed = false;

        var root = void 0;
        if ((typeof css === 'undefined' ? 'undefined' : _typeof(css)) === 'object' && css !== null && css.type === 'root') {
            root = css;
        } else if (css instanceof LazyResult || css instanceof _result2.default) {
            root = css.root;
            if (css.map) {
                if (typeof opts.map === 'undefined') opts.map = {};
                if (!opts.map.inline) opts.map.inline = false;
                opts.map.prev = css.map;
            }
        } else {
            var parser = _parse2.default;
            if (opts.syntax) parser = opts.syntax.parse;
            if (opts.parser) parser = opts.parser;
            if (parser.parse) parser = parser.parse;

            try {
                root = parser(css, opts);
            } catch (error) {
                this.error = error;
            }
        }

        this.result = new _result2.default(processor, root, opts);
    }

    /**
     * Returns a {@link Processor} instance, which will be used
     * for CSS transformations.
     * @type {Processor}
     */


    /**
     * Processes input CSS through synchronous plugins
     * and calls {@link Result#warnings()}.
     *
     * @return {Warning[]} warnings from plugins
     */
    LazyResult.prototype.warnings = function warnings() {
        return this.sync().warnings();
    };

    /**
     * Alias for the {@link LazyResult#css} property.
     *
     * @example
     * lazy + '' === lazy.css;
     *
     * @return {string} output CSS
     */


    LazyResult.prototype.toString = function toString() {
        return this.css;
    };

    /**
     * Processes input CSS through synchronous and asynchronous plugins
     * and calls `onFulfilled` with a Result instance. If a plugin throws
     * an error, the `onRejected` callback will be executed.
     *
     * It implements standard Promise API.
     *
     * @param {onFulfilled} onFulfilled - callback will be executed
     *                                    when all plugins will finish work
     * @param {onRejected}  onRejected  - callback will be executed on any error
     *
     * @return {Promise} Promise API to make queue
     *
     * @example
     * postcss([cssnext]).process(css, { from: cssPath }).then(result => {
     *   console.log(result.css);
     * });
     */


    LazyResult.prototype.then = function then(onFulfilled, onRejected) {
        if (!('from' in this.opts)) {
            (0, _warnOnce2.default)('Without `from` option PostCSS could generate wrong ' + 'source map and will not find Browserslist config. ' + 'Set it to CSS file path or to `undefined` to prevent ' + 'this warning.');
        }
        return this.async().then(onFulfilled, onRejected);
    };

    /**
     * Processes input CSS through synchronous and asynchronous plugins
     * and calls onRejected for each error thrown in any plugin.
     *
     * It implements standard Promise API.
     *
     * @param {onRejected} onRejected - callback will be executed on any error
     *
     * @return {Promise} Promise API to make queue
     *
     * @example
     * postcss([cssnext]).process(css).then(result => {
     *   console.log(result.css);
     * }).catch(error => {
     *   console.error(error);
     * });
     */


    LazyResult.prototype.catch = function _catch(onRejected) {
        return this.async().catch(onRejected);
    };

    LazyResult.prototype.handleError = function handleError(error, plugin) {
        try {
            this.error = error;
            if (error.name === 'CssSyntaxError' && !error.plugin) {
                error.plugin = plugin.postcssPlugin;
                error.setMessage();
            } else if (plugin.postcssVersion) {
                var pluginName = plugin.postcssPlugin;
                var pluginVer = plugin.postcssVersion;
                var runtimeVer = this.result.processor.version;
                var a = pluginVer.split('.');
                var b = runtimeVer.split('.');

                if (a[0] !== b[0] || parseInt(a[1]) > parseInt(b[1])) {
                    console.error('Unknown error from PostCSS plugin. ' + 'Your current PostCSS version ' + 'is ' + runtimeVer + ', but ' + pluginName + ' ' + 'uses ' + pluginVer + '. Perhaps this is ' + 'the source of the error below.');
                }
            }
        } catch (err) {
            if (console && console.error) console.error(err);
        }
    };

    LazyResult.prototype.asyncTick = function asyncTick(resolve, reject) {
        var _this = this;

        if (this.plugin >= this.processor.plugins.length) {
            this.processed = true;
            return resolve();
        }

        try {
            var plugin = this.processor.plugins[this.plugin];
            var promise = this.run(plugin);
            this.plugin += 1;

            if (isPromise(promise)) {
                promise.then(function () {
                    _this.asyncTick(resolve, reject);
                }).catch(function (error) {
                    _this.handleError(error, plugin);
                    _this.processed = true;
                    reject(error);
                });
            } else {
                this.asyncTick(resolve, reject);
            }
        } catch (error) {
            this.processed = true;
            reject(error);
        }
    };

    LazyResult.prototype.async = function async() {
        var _this2 = this;

        if (this.processed) {
            return new Promise(function (resolve, reject) {
                if (_this2.error) {
                    reject(_this2.error);
                } else {
                    resolve(_this2.stringify());
                }
            });
        }
        if (this.processing) {
            return this.processing;
        }

        this.processing = new Promise(function (resolve, reject) {
            if (_this2.error) return reject(_this2.error);
            _this2.plugin = 0;
            _this2.asyncTick(resolve, reject);
        }).then(function () {
            _this2.processed = true;
            return _this2.stringify();
        });

        return this.processing;
    };

    LazyResult.prototype.sync = function sync() {
        if (this.processed) return this.result;
        this.processed = true;

        if (this.processing) {
            throw new Error('Use process(css).then(cb) to work with async plugins');
        }

        if (this.error) throw this.error;

        for (var _iterator = this.result.processor.plugins, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var plugin = _ref;

            var promise = this.run(plugin);
            if (isPromise(promise)) {
                throw new Error('Use process(css).then(cb) to work with async plugins');
            }
        }

        return this.result;
    };

    LazyResult.prototype.run = function run(plugin) {
        this.result.lastPlugin = plugin;

        try {
            return plugin(this.result.root, this.result);
        } catch (error) {
            this.handleError(error, plugin);
            throw error;
        }
    };

    LazyResult.prototype.stringify = function stringify() {
        if (this.stringified) return this.result;
        this.stringified = true;

        this.sync();

        var opts = this.result.opts;
        var str = _stringify3.default;
        if (opts.syntax) str = opts.syntax.stringify;
        if (opts.stringifier) str = opts.stringifier;
        if (str.stringify) str = str.stringify;

        var map = new _mapGenerator2.default(str, this.result.root, this.result.opts);
        var data = map.generate();
        this.result.css = data[0];
        this.result.map = data[1];

        return this.result;
    };

    _createClass(LazyResult, [{
        key: 'processor',
        get: function get() {
            return this.result.processor;
        }

        /**
         * Options from the {@link Processor#process} call.
         * @type {processOptions}
         */

    }, {
        key: 'opts',
        get: function get() {
            return this.result.opts;
        }

        /**
         * Processes input CSS through synchronous plugins, converts `Root`
         * to a CSS string and returns {@link Result#css}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#css
         */

    }, {
        key: 'css',
        get: function get() {
            return this.stringify().css;
        }

        /**
         * An alias for the `css` property. Use it with syntaxes
         * that generate non-CSS output.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {string}
         * @see Result#content
         */

    }, {
        key: 'content',
        get: function get() {
            return this.stringify().content;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#map}.
         *
         * This property will only work with synchronous plugins.
         * If the processor contains any asynchronous plugins
         * it will throw an error. This is why this method is only
         * for debug purpose, you should always use {@link LazyResult#then}.
         *
         * @type {SourceMapGenerator}
         * @see Result#map
         */

    }, {
        key: 'map',
        get: function get() {
            return this.stringify().map;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#root}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Root}
         * @see Result#root
         */

    }, {
        key: 'root',
        get: function get() {
            return this.sync().root;
        }

        /**
         * Processes input CSS through synchronous plugins
         * and returns {@link Result#messages}.
         *
         * This property will only work with synchronous plugins. If the processor
         * contains any asynchronous plugins it will throw an error.
         *
         * This is why this method is only for debug purpose,
         * you should always use {@link LazyResult#then}.
         *
         * @type {Message[]}
         * @see Result#messages
         */

    }, {
        key: 'messages',
        get: function get() {
            return this.sync().messages;
        }
    }]);

    return LazyResult;
}();

exports.default = LazyResult;

/**
 * @callback onFulfilled
 * @param {Result} result
 */

/**
 * @callback onRejected
 * @param {Error} error
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxhenktcmVzdWx0LmVzNiJdLCJuYW1lcyI6WyJpc1Byb21pc2UiLCJvYmoiLCJ0aGVuIiwiTGF6eVJlc3VsdCIsInByb2Nlc3NvciIsImNzcyIsIm9wdHMiLCJzdHJpbmdpZmllZCIsInByb2Nlc3NlZCIsInJvb3QiLCJ0eXBlIiwiUmVzdWx0IiwibWFwIiwiaW5saW5lIiwicHJldiIsInBhcnNlciIsInBhcnNlIiwic3ludGF4IiwiZXJyb3IiLCJyZXN1bHQiLCJ3YXJuaW5ncyIsInN5bmMiLCJ0b1N0cmluZyIsIm9uRnVsZmlsbGVkIiwib25SZWplY3RlZCIsImFzeW5jIiwiY2F0Y2giLCJoYW5kbGVFcnJvciIsInBsdWdpbiIsIm5hbWUiLCJwb3N0Y3NzUGx1Z2luIiwic2V0TWVzc2FnZSIsInBvc3Rjc3NWZXJzaW9uIiwicGx1Z2luTmFtZSIsInBsdWdpblZlciIsInJ1bnRpbWVWZXIiLCJ2ZXJzaW9uIiwiYSIsInNwbGl0IiwiYiIsInBhcnNlSW50IiwiY29uc29sZSIsImVyciIsImFzeW5jVGljayIsInJlc29sdmUiLCJyZWplY3QiLCJwbHVnaW5zIiwibGVuZ3RoIiwicHJvbWlzZSIsInJ1biIsIlByb21pc2UiLCJzdHJpbmdpZnkiLCJwcm9jZXNzaW5nIiwiRXJyb3IiLCJsYXN0UGx1Z2luIiwic3RyIiwic3RyaW5naWZpZXIiLCJNYXBHZW5lcmF0b3IiLCJkYXRhIiwiZ2VuZXJhdGUiLCJjb250ZW50IiwibWVzc2FnZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7QUFFQSxTQUFTQSxTQUFULENBQW1CQyxHQUFuQixFQUF3QjtBQUNwQixXQUFPLFFBQU9BLEdBQVAseUNBQU9BLEdBQVAsT0FBZSxRQUFmLElBQTJCLE9BQU9BLElBQUlDLElBQVgsS0FBb0IsVUFBdEQ7QUFDSDs7QUFFRDs7Ozs7Ozs7O0lBUU1DLFU7QUFFRix3QkFBWUMsU0FBWixFQUF1QkMsR0FBdkIs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dCI6WyJpbXBvcnQgTWFwR2VuZXJhdG9yIGZyb20gJy4vbWFwLWdlbmVyYXRvcic7XG5pbXBvcnQgc3RyaW5naWZ5ICAgIGZyb20gJy4vc3RyaW5naWZ5JztcbmltcG9ydCB3YXJuT25jZSAgICAgZnJvbSAnLi93YXJuLW9uY2UnO1xuaW1wb3J0IFJlc3VsdCAgICAgICBmcm9tICcuL3Jlc3VsdCc7XG5pbXBvcnQgcGFyc2UgICAgICAgIGZyb20gJy4vcGFyc2UnO1xuXG5mdW5jdGlvbiBpc1Byb21pc2Uob2JqKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBvYmogPT09ICdvYmplY3QnICYmIHR5cGVvZiBvYmoudGhlbiA9PT0gJ2Z1bmN0aW9uJztcbn1cblxuLyoqXG4gKiBBIFByb21pc2UgcHJveHkgZm9yIHRoZSByZXN1bHQgb2YgUG9zdENTUyB0cmFuc2Zvcm1hdGlvbnMuXG4gKlxuICogQSBgTGF6eVJlc3VsdGAgaW5zdGFuY2UgaXMgcmV0dXJuZWQgYnkge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgbGF6eSA9IHBvc3Rjc3MoW2Nzc25leHRdKS5wcm9jZXNzKGNzcyk7XG4gKi9cbmNsYXNzIExhenlSZXN1bHQge1xuXG4gICAgY29uc3RydWN0b3IocHJvY2Vzc29yLCBjc3MsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5zdHJpbmdpZmllZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnByb2Nlc3NlZCAgID0gZmFsc2U7XG5cbiAgICAgICAgbGV0IHJvb3Q7XG4gICAgICAgIGlmICggdHlwZW9mIGNzcyA9PT0gJ29iamVjdCcgJiYgY3NzICE9PSBudWxsICYmIGNzcy50eXBlID09PSAncm9vdCcgKSB7XG4gICAgICAgICAgICByb290ID0gY3NzO1xuICAgICAgICB9IGVsc2UgaWYgKCBjc3MgaW5zdGFuY2VvZiBMYXp5UmVzdWx0IHx8IGNzcyBpbnN0YW5jZW9mIFJlc3VsdCApIHtcbiAgICAgICAgICAgIHJvb3QgPSBjc3Mucm9vdDtcbiAgICAgICAgICAgIGlmICggY3NzLm1hcCApIHtcbiAgICAgICAgICAgICAgICBpZiAoIHR5cGVvZiBvcHRzLm1hcCA9PT0gJ3VuZGVmaW5lZCcgKSBvcHRzLm1hcCA9IHsgfTtcbiAgICAgICAgICAgICAgICBpZiAoICFvcHRzLm1hcC5pbmxpbmUgKSBvcHRzLm1hcC5pbmxpbmUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBvcHRzLm1hcC5wcmV2ID0gY3NzLm1hcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBwYXJzZXIgPSBwYXJzZTtcbiAgICAgICAgICAgIGlmICggb3B0cy5zeW50YXggKSAgcGFyc2VyID0gb3B0cy5zeW50YXgucGFyc2U7XG4gICAgICAgICAgICBpZiAoIG9wdHMucGFyc2VyICkgIHBhcnNlciA9IG9wdHMucGFyc2VyO1xuICAgICAgICAgICAgaWYgKCBwYXJzZXIucGFyc2UgKSBwYXJzZXIgPSBwYXJzZXIucGFyc2U7XG5cbiAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgcm9vdCA9IHBhcnNlcihjc3MsIG9wdHMpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9yID0gZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlc3VsdCA9IG5ldyBSZXN1bHQocHJvY2Vzc29yLCByb290LCBvcHRzKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEge0BsaW5rIFByb2Nlc3Nvcn0gaW5zdGFuY2UsIHdoaWNoIHdpbGwgYmUgdXNlZFxuICAgICAqIGZvciBDU1MgdHJhbnNmb3JtYXRpb25zLlxuICAgICAqIEB0eXBlIHtQcm9jZXNzb3J9XG4gICAgICovXG4gICAgZ2V0IHByb2Nlc3NvcigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0LnByb2Nlc3NvcjtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBPcHRpb25zIGZyb20gdGhlIHtAbGluayBQcm9jZXNzb3IjcHJvY2Vzc30gY2FsbC5cbiAgICAgKiBAdHlwZSB7cHJvY2Vzc09wdGlvbnN9XG4gICAgICovXG4gICAgZ2V0IG9wdHMoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlc3VsdC5vcHRzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zLCBjb252ZXJ0cyBgUm9vdGBcbiAgICAgKiB0byBhIENTUyBzdHJpbmcgYW5kIHJldHVybnMge0BsaW5rIFJlc3VsdCNjc3N9LlxuICAgICAqXG4gICAgICogVGhpcyBwcm9wZXJ0eSB3aWxsIG9ubHkgd29yayB3aXRoIHN5bmNocm9ub3VzIHBsdWdpbnMuXG4gICAgICogSWYgdGhlIHByb2Nlc3NvciBjb250YWlucyBhbnkgYXN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICAgKiBpdCB3aWxsIHRocm93IGFuIGVycm9yLiBUaGlzIGlzIHdoeSB0aGlzIG1ldGhvZCBpcyBvbmx5XG4gICAgICogZm9yIGRlYnVnIHB1cnBvc2UsIHlvdSBzaG91bGQgYWx3YXlzIHVzZSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufS5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtzdHJpbmd9XG4gICAgICogQHNlZSBSZXN1bHQjY3NzXG4gICAgICovXG4gICAgZ2V0IGNzcygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY3NzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIGFsaWFzIGZvciB0aGUgYGNzc2AgcHJvcGVydHkuIFVzZSBpdCB3aXRoIHN5bnRheGVzXG4gICAgICogdGhhdCBnZW5lcmF0ZSBub24tQ1NTIG91dHB1dC5cbiAgICAgKlxuICAgICAqIFRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IHdvcmsgd2l0aCBzeW5jaHJvbm91cyBwbHVnaW5zLlxuICAgICAqIElmIHRoZSBwcm9jZXNzb3IgY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAgICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvci4gVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seVxuICAgICAqIGZvciBkZWJ1ZyBwdXJwb3NlLCB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7c3RyaW5nfVxuICAgICAqIEBzZWUgUmVzdWx0I2NvbnRlbnRcbiAgICAgKi9cbiAgICBnZXQgY29udGVudCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCkuY29udGVudDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgcGx1Z2luc1xuICAgICAqIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjbWFwfS5cbiAgICAgKlxuICAgICAqIFRoaXMgcHJvcGVydHkgd2lsbCBvbmx5IHdvcmsgd2l0aCBzeW5jaHJvbm91cyBwbHVnaW5zLlxuICAgICAqIElmIHRoZSBwcm9jZXNzb3IgY29udGFpbnMgYW55IGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAgICogaXQgd2lsbCB0aHJvdyBhbiBlcnJvci4gVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seVxuICAgICAqIGZvciBkZWJ1ZyBwdXJwb3NlLCB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7U291cmNlTWFwR2VuZXJhdG9yfVxuICAgICAqIEBzZWUgUmVzdWx0I21hcFxuICAgICAqL1xuICAgIGdldCBtYXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0cmluZ2lmeSgpLm1hcDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgcGx1Z2luc1xuICAgICAqIGFuZCByZXR1cm5zIHtAbGluayBSZXN1bHQjcm9vdH0uXG4gICAgICpcbiAgICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy4gSWYgdGhlIHByb2Nlc3NvclxuICAgICAqIGNvbnRhaW5zIGFueSBhc3luY2hyb25vdXMgcGx1Z2lucyBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgICAqXG4gICAgICogVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seSBmb3IgZGVidWcgcHVycG9zZSxcbiAgICAgKiB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Um9vdH1cbiAgICAgKiBAc2VlIFJlc3VsdCNyb290XG4gICAgICovXG4gICAgZ2V0IHJvb3QoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmMoKS5yb290O1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFByb2Nlc3NlcyBpbnB1dCBDU1MgdGhyb3VnaCBzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAgICogYW5kIHJldHVybnMge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAgICpcbiAgICAgKiBUaGlzIHByb3BlcnR5IHdpbGwgb25seSB3b3JrIHdpdGggc3luY2hyb25vdXMgcGx1Z2lucy4gSWYgdGhlIHByb2Nlc3NvclxuICAgICAqIGNvbnRhaW5zIGFueSBhc3luY2hyb25vdXMgcGx1Z2lucyBpdCB3aWxsIHRocm93IGFuIGVycm9yLlxuICAgICAqXG4gICAgICogVGhpcyBpcyB3aHkgdGhpcyBtZXRob2QgaXMgb25seSBmb3IgZGVidWcgcHVycG9zZSxcbiAgICAgKiB5b3Ugc2hvdWxkIGFsd2F5cyB1c2Uge0BsaW5rIExhenlSZXN1bHQjdGhlbn0uXG4gICAgICpcbiAgICAgKiBAdHlwZSB7TWVzc2FnZVtdfVxuICAgICAqIEBzZWUgUmVzdWx0I21lc3NhZ2VzXG4gICAgICovXG4gICAgZ2V0IG1lc3NhZ2VzKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5zeW5jKCkubWVzc2FnZXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIHBsdWdpbnNcbiAgICAgKiBhbmQgY2FsbHMge0BsaW5rIFJlc3VsdCN3YXJuaW5ncygpfS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1dhcm5pbmdbXX0gd2FybmluZ3MgZnJvbSBwbHVnaW5zXG4gICAgICovXG4gICAgd2FybmluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnN5bmMoKS53YXJuaW5ncygpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFsaWFzIGZvciB0aGUge0BsaW5rIExhenlSZXN1bHQjY3NzfSBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogbGF6eSArICcnID09PSBsYXp5LmNzcztcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gb3V0cHV0IENTU1xuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jc3M7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUHJvY2Vzc2VzIGlucHV0IENTUyB0aHJvdWdoIHN5bmNocm9ub3VzIGFuZCBhc3luY2hyb25vdXMgcGx1Z2luc1xuICAgICAqIGFuZCBjYWxscyBgb25GdWxmaWxsZWRgIHdpdGggYSBSZXN1bHQgaW5zdGFuY2UuIElmIGEgcGx1Z2luIHRocm93c1xuICAgICAqIGFuIGVycm9yLCB0aGUgYG9uUmVqZWN0ZWRgIGNhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQuXG4gICAgICpcbiAgICAgKiBJdCBpbXBsZW1lbnRzIHN0YW5kYXJkIFByb21pc2UgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvbkZ1bGZpbGxlZH0gb25GdWxmaWxsZWQgLSBjYWxsYmFjayB3aWxsIGJlIGV4ZWN1dGVkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB3aGVuIGFsbCBwbHVnaW5zIHdpbGwgZmluaXNoIHdvcmtcbiAgICAgKiBAcGFyYW0ge29uUmVqZWN0ZWR9ICBvblJlamVjdGVkICAtIGNhbGxiYWNrIHdpbGwgYmUgZXhlY3V0ZWQgb24gYW55IGVycm9yXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtQcm9taXNlfSBQcm9taXNlIEFQSSB0byBtYWtlIHF1ZXVlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MoW2Nzc25leHRdKS5wcm9jZXNzKGNzcywgeyBmcm9tOiBjc3NQYXRoIH0pLnRoZW4ocmVzdWx0ID0+IHtcbiAgICAgKiAgIGNvbnNvbGUubG9nKHJlc3VsdC5jc3MpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHRoZW4ob25GdWxmaWxsZWQsIG9uUmVqZWN0ZWQpIHtcbiAgICAgICAgaWYgKCEoJ2Zyb20nIGluIHRoaXMub3B0cykpIHtcbiAgICAgICAgICAgIHdhcm5PbmNlKFxuICAgICAgICAgICAgICAgICdXaXRob3V0IGBmcm9tYCBvcHRpb24gUG9zdENTUyBjb3VsZCBnZW5lcmF0ZSB3cm9uZyAnICtcbiAgICAgICAgICAgICAgICAnc291cmNlIG1hcCBhbmQgd2lsbCBub3QgZmluZCBCcm93c2Vyc2xpc3QgY29uZmlnLiAnICtcbiAgICAgICAgICAgICAgICAnU2V0IGl0IHRvIENTUyBmaWxlIHBhdGggb3IgdG8gYHVuZGVmaW5lZGAgdG8gcHJldmVudCAnICtcbiAgICAgICAgICAgICAgICAndGhpcyB3YXJuaW5nLidcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuYXN5bmMoKS50aGVuKG9uRnVsZmlsbGVkLCBvblJlamVjdGVkKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQcm9jZXNzZXMgaW5wdXQgQ1NTIHRocm91Z2ggc3luY2hyb25vdXMgYW5kIGFzeW5jaHJvbm91cyBwbHVnaW5zXG4gICAgICogYW5kIGNhbGxzIG9uUmVqZWN0ZWQgZm9yIGVhY2ggZXJyb3IgdGhyb3duIGluIGFueSBwbHVnaW4uXG4gICAgICpcbiAgICAgKiBJdCBpbXBsZW1lbnRzIHN0YW5kYXJkIFByb21pc2UgQVBJLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtvblJlamVjdGVkfSBvblJlamVjdGVkIC0gY2FsbGJhY2sgd2lsbCBiZSBleGVjdXRlZCBvbiBhbnkgZXJyb3JcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9IFByb21pc2UgQVBJIHRvIG1ha2UgcXVldWVcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcyhbY3NzbmV4dF0pLnByb2Nlc3MoY3NzKS50aGVuKHJlc3VsdCA9PiB7XG4gICAgICogICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKTtcbiAgICAgKiB9KS5jYXRjaChlcnJvciA9PiB7XG4gICAgICogICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICBjYXRjaChvblJlamVjdGVkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmFzeW5jKCkuY2F0Y2gob25SZWplY3RlZCk7XG4gICAgfVxuXG4gICAgaGFuZGxlRXJyb3IoZXJyb3IsIHBsdWdpbikge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgdGhpcy5lcnJvciA9IGVycm9yO1xuICAgICAgICAgICAgaWYgKCBlcnJvci5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICYmICFlcnJvci5wbHVnaW4gKSB7XG4gICAgICAgICAgICAgICAgZXJyb3IucGx1Z2luID0gcGx1Z2luLnBvc3Rjc3NQbHVnaW47XG4gICAgICAgICAgICAgICAgZXJyb3Iuc2V0TWVzc2FnZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggcGx1Z2luLnBvc3Rjc3NWZXJzaW9uICkge1xuICAgICAgICAgICAgICAgIGxldCBwbHVnaW5OYW1lID0gcGx1Z2luLnBvc3Rjc3NQbHVnaW47XG4gICAgICAgICAgICAgICAgbGV0IHBsdWdpblZlciAgPSBwbHVnaW4ucG9zdGNzc1ZlcnNpb247XG4gICAgICAgICAgICAgICAgbGV0IHJ1bnRpbWVWZXIgPSB0aGlzLnJlc3VsdC5wcm9jZXNzb3IudmVyc2lvbjtcbiAgICAgICAgICAgICAgICBsZXQgYSA9IHBsdWdpblZlci5zcGxpdCgnLicpO1xuICAgICAgICAgICAgICAgIGxldCBiID0gcnVudGltZVZlci5zcGxpdCgnLicpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCBhWzBdICE9PSBiWzBdIHx8IHBhcnNlSW50KGFbMV0pID4gcGFyc2VJbnQoYlsxXSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICAgICAnVW5rbm93biBlcnJvciBmcm9tIFBvc3RDU1MgcGx1Z2luLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdZb3VyIGN1cnJlbnQgUG9zdENTUyB2ZXJzaW9uICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgJ2lzICcgKyBydW50aW1lVmVyICsgJywgYnV0ICcgKyBwbHVnaW5OYW1lICsgJyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICd1c2VzICcgKyBwbHVnaW5WZXIgKyAnLiBQZXJoYXBzIHRoaXMgaXMgJyArXG4gICAgICAgICAgICAgICAgICAgICAgICAndGhlIHNvdXJjZSBvZiB0aGUgZXJyb3IgYmVsb3cuJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGlmICggY29uc29sZSAmJiBjb25zb2xlLmVycm9yICkgY29uc29sZS5lcnJvcihlcnIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmNUaWNrKHJlc29sdmUsIHJlamVjdCkge1xuICAgICAgICBpZiAoIHRoaXMucGx1Z2luID49IHRoaXMucHJvY2Vzc29yLnBsdWdpbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHJlc29sdmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBsZXQgcGx1Z2luICA9IHRoaXMucHJvY2Vzc29yLnBsdWdpbnNbdGhpcy5wbHVnaW5dO1xuICAgICAgICAgICAgbGV0IHByb21pc2UgPSB0aGlzLnJ1bihwbHVnaW4pO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4gKz0gMTtcblxuICAgICAgICAgICAgaWYgKCBpc1Byb21pc2UocHJvbWlzZSkgKSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXN5bmNUaWNrKHJlc29sdmUsIHJlamVjdCk7XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goIGVycm9yID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVFcnJvcihlcnJvciwgcGx1Z2luKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmFzeW5jVGljayhyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZCA9IHRydWU7XG4gICAgICAgICAgICByZWplY3QoZXJyb3IpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMoKSB7XG4gICAgICAgIGlmICggdGhpcy5wcm9jZXNzZWQgKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoIChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIHRoaXMuZXJyb3IgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdCh0aGlzLmVycm9yKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKHRoaXMuc3RyaW5naWZ5KCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5wcm9jZXNzaW5nICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc2luZztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucHJvY2Vzc2luZyA9IG5ldyBQcm9taXNlKCAocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgICAgICBpZiAoIHRoaXMuZXJyb3IgKSByZXR1cm4gcmVqZWN0KHRoaXMuZXJyb3IpO1xuICAgICAgICAgICAgdGhpcy5wbHVnaW4gPSAwO1xuICAgICAgICAgICAgdGhpcy5hc3luY1RpY2socmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgfSkudGhlbiggKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc3RyaW5naWZ5KCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3Npbmc7XG4gICAgfVxuXG4gICAgc3luYygpIHtcbiAgICAgICAgaWYgKCB0aGlzLnByb2Nlc3NlZCApIHJldHVybiB0aGlzLnJlc3VsdDtcbiAgICAgICAgdGhpcy5wcm9jZXNzZWQgPSB0cnVlO1xuXG4gICAgICAgIGlmICggdGhpcy5wcm9jZXNzaW5nICkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgICdVc2UgcHJvY2Vzcyhjc3MpLnRoZW4oY2IpIHRvIHdvcmsgd2l0aCBhc3luYyBwbHVnaW5zJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMuZXJyb3IgKSB0aHJvdyB0aGlzLmVycm9yO1xuXG4gICAgICAgIGZvciAoIGxldCBwbHVnaW4gb2YgdGhpcy5yZXN1bHQucHJvY2Vzc29yLnBsdWdpbnMgKSB7XG4gICAgICAgICAgICBsZXQgcHJvbWlzZSA9IHRoaXMucnVuKHBsdWdpbik7XG4gICAgICAgICAgICBpZiAoIGlzUHJvbWlzZShwcm9taXNlKSApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgICAgICdVc2UgcHJvY2Vzcyhjc3MpLnRoZW4oY2IpIHRvIHdvcmsgd2l0aCBhc3luYyBwbHVnaW5zJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5yZXN1bHQ7XG4gICAgfVxuXG4gICAgcnVuKHBsdWdpbikge1xuICAgICAgICB0aGlzLnJlc3VsdC5sYXN0UGx1Z2luID0gcGx1Z2luO1xuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICByZXR1cm4gcGx1Z2luKHRoaXMucmVzdWx0LnJvb3QsIHRoaXMucmVzdWx0KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHRoaXMuaGFuZGxlRXJyb3IoZXJyb3IsIHBsdWdpbik7XG4gICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHN0cmluZ2lmeSgpIHtcbiAgICAgICAgaWYgKCB0aGlzLnN0cmluZ2lmaWVkICkgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgICAgICB0aGlzLnN0cmluZ2lmaWVkID0gdHJ1ZTtcblxuICAgICAgICB0aGlzLnN5bmMoKTtcblxuICAgICAgICBsZXQgb3B0cyA9IHRoaXMucmVzdWx0Lm9wdHM7XG4gICAgICAgIGxldCBzdHIgID0gc3RyaW5naWZ5O1xuICAgICAgICBpZiAoIG9wdHMuc3ludGF4ICkgICAgICBzdHIgPSBvcHRzLnN5bnRheC5zdHJpbmdpZnk7XG4gICAgICAgIGlmICggb3B0cy5zdHJpbmdpZmllciApIHN0ciA9IG9wdHMuc3RyaW5naWZpZXI7XG4gICAgICAgIGlmICggc3RyLnN0cmluZ2lmeSApICAgIHN0ciA9IHN0ci5zdHJpbmdpZnk7XG5cbiAgICAgICAgbGV0IG1hcCAgPSBuZXcgTWFwR2VuZXJhdG9yKHN0ciwgdGhpcy5yZXN1bHQucm9vdCwgdGhpcy5yZXN1bHQub3B0cyk7XG4gICAgICAgIGxldCBkYXRhID0gbWFwLmdlbmVyYXRlKCk7XG4gICAgICAgIHRoaXMucmVzdWx0LmNzcyA9IGRhdGFbMF07XG4gICAgICAgIHRoaXMucmVzdWx0Lm1hcCA9IGRhdGFbMV07XG5cbiAgICAgICAgcmV0dXJuIHRoaXMucmVzdWx0O1xuICAgIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBMYXp5UmVzdWx0O1xuXG4vKipcbiAqIEBjYWxsYmFjayBvbkZ1bGZpbGxlZFxuICogQHBhcmFtIHtSZXN1bHR9IHJlc3VsdFxuICovXG5cbi8qKlxuICogQGNhbGxiYWNrIG9uUmVqZWN0ZWRcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yXG4gKi9cbiJdfQ==

}, function(modId) { var map = {"./map-generator":1625038544330,"./stringify":1625038544326,"./warn-once":1625038544327,"./result":1625038544331,"./parse":1625038544333}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544330, function(require, module, exports) {


exports.__esModule = true;

var _sourceMap = require('source-map');

var _sourceMap2 = _interopRequireDefault(_sourceMap);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MapGenerator = function () {
    function MapGenerator(stringify, root, opts) {
        _classCallCheck(this, MapGenerator);

        this.stringify = stringify;
        this.mapOpts = opts.map || {};
        this.root = root;
        this.opts = opts;
    }

    MapGenerator.prototype.isMap = function isMap() {
        if (typeof this.opts.map !== 'undefined') {
            return !!this.opts.map;
        } else {
            return this.previous().length > 0;
        }
    };

    MapGenerator.prototype.previous = function previous() {
        var _this = this;

        if (!this.previousMaps) {
            this.previousMaps = [];
            this.root.walk(function (node) {
                if (node.source && node.source.input.map) {
                    var map = node.source.input.map;
                    if (_this.previousMaps.indexOf(map) === -1) {
                        _this.previousMaps.push(map);
                    }
                }
            });
        }

        return this.previousMaps;
    };

    MapGenerator.prototype.isInline = function isInline() {
        if (typeof this.mapOpts.inline !== 'undefined') {
            return this.mapOpts.inline;
        }

        var annotation = this.mapOpts.annotation;
        if (typeof annotation !== 'undefined' && annotation !== true) {
            return false;
        }

        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.inline;
            });
        } else {
            return true;
        }
    };

    MapGenerator.prototype.isSourcesContent = function isSourcesContent() {
        if (typeof this.mapOpts.sourcesContent !== 'undefined') {
            return this.mapOpts.sourcesContent;
        }
        if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.withContent();
            });
        } else {
            return true;
        }
    };

    MapGenerator.prototype.clearAnnotation = function clearAnnotation() {
        if (this.mapOpts.annotation === false) return;

        var node = void 0;
        for (var i = this.root.nodes.length - 1; i >= 0; i--) {
            node = this.root.nodes[i];
            if (node.type !== 'comment') continue;
            if (node.text.indexOf('# sourceMappingURL=') === 0) {
                this.root.removeChild(i);
            }
        }
    };

    MapGenerator.prototype.setSourcesContent = function setSourcesContent() {
        var _this2 = this;

        var already = {};
        this.root.walk(function (node) {
            if (node.source) {
                var from = node.source.input.from;
                if (from && !already[from]) {
                    already[from] = true;
                    var relative = _this2.relative(from);
                    _this2.map.setSourceContent(relative, node.source.input.css);
                }
            }
        });
    };

    MapGenerator.prototype.applyPrevMaps = function applyPrevMaps() {
        for (var _iterator = this.previous(), _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var prev = _ref;

            var from = this.relative(prev.file);
            var root = prev.root || _path2.default.dirname(prev.file);
            var map = void 0;

            if (this.mapOpts.sourcesContent === false) {
                map = new _sourceMap2.default.SourceMapConsumer(prev.text);
                if (map.sourcesContent) {
                    map.sourcesContent = map.sourcesContent.map(function () {
                        return null;
                    });
                }
            } else {
                map = prev.consumer();
            }

            this.map.applySourceMap(map, from, this.relative(root));
        }
    };

    MapGenerator.prototype.isAnnotation = function isAnnotation() {
        if (this.isInline()) {
            return true;
        } else if (typeof this.mapOpts.annotation !== 'undefined') {
            return this.mapOpts.annotation;
        } else if (this.previous().length) {
            return this.previous().some(function (i) {
                return i.annotation;
            });
        } else {
            return true;
        }
    };

    MapGenerator.prototype.toBase64 = function toBase64(str) {
        if (Buffer) {
            if (Buffer.from && Buffer.from !== Uint8Array.from) {
                return Buffer.from(str).toString('base64');
            } else {
                return new Buffer(str).toString('base64');
            }
        } else {
            return window.btoa(unescape(encodeURIComponent(str)));
        }
    };

    MapGenerator.prototype.addAnnotation = function addAnnotation() {
        var content = void 0;

        if (this.isInline()) {

            content = 'data:application/json;base64,' + this.toBase64(this.map.toString());
        } else if (typeof this.mapOpts.annotation === 'string') {
            content = this.mapOpts.annotation;
        } else {
            content = this.outputFile() + '.map';
        }

        var eol = '\n';
        if (this.css.indexOf('\r\n') !== -1) eol = '\r\n';

        this.css += eol + '/*# sourceMappingURL=' + content + ' */';
    };

    MapGenerator.prototype.outputFile = function outputFile() {
        if (this.opts.to) {
            return this.relative(this.opts.to);
        } else if (this.opts.from) {
            return this.relative(this.opts.from);
        } else {
            return 'to.css';
        }
    };

    MapGenerator.prototype.generateMap = function generateMap() {
        this.generateString();
        if (this.isSourcesContent()) this.setSourcesContent();
        if (this.previous().length > 0) this.applyPrevMaps();
        if (this.isAnnotation()) this.addAnnotation();

        if (this.isInline()) {
            return [this.css];
        } else {
            return [this.css, this.map];
        }
    };

    MapGenerator.prototype.relative = function relative(file) {
        if (file.indexOf('<') === 0) return file;
        if (/^\w+:\/\//.test(file)) return file;

        var from = this.opts.to ? _path2.default.dirname(this.opts.to) : '.';

        if (typeof this.mapOpts.annotation === 'string') {
            from = _path2.default.dirname(_path2.default.resolve(from, this.mapOpts.annotation));
        }

        file = _path2.default.relative(from, file);
        if (_path2.default.sep === '\\') {
            return file.replace(/\\/g, '/');
        } else {
            return file;
        }
    };

    MapGenerator.prototype.sourcePath = function sourcePath(node) {
        if (this.mapOpts.from) {
            return this.mapOpts.from;
        } else {
            return this.relative(node.source.input.from);
        }
    };

    MapGenerator.prototype.generateString = function generateString() {
        var _this3 = this;

        this.css = '';
        this.map = new _sourceMap2.default.SourceMapGenerator({ file: this.outputFile() });

        var line = 1;
        var column = 1;

        var lines = void 0,
            last = void 0;
        this.stringify(this.root, function (str, node, type) {
            _this3.css += str;

            if (node && type !== 'end') {
                if (node.source && node.source.start) {
                    _this3.map.addMapping({
                        source: _this3.sourcePath(node),
                        generated: { line: line, column: column - 1 },
                        original: {
                            line: node.source.start.line,
                            column: node.source.start.column - 1
                        }
                    });
                } else {
                    _this3.map.addMapping({
                        source: '<no source>',
                        original: { line: 1, column: 0 },
                        generated: { line: line, column: column - 1 }
                    });
                }
            }

            lines = str.match(/\n/g);
            if (lines) {
                line += lines.length;
                last = str.lastIndexOf('\n');
                column = str.length - last;
            } else {
                column += str.length;
            }

            if (node && type !== 'start') {
                if (node.source && node.source.end) {
                    _this3.map.addMapping({
                        source: _this3.sourcePath(node),
                        generated: { line: line, column: column - 1 },
                        original: {
                            line: node.source.end.line,
                            column: node.source.end.column
                        }
                    });
                } else {
                    _this3.map.addMapping({
                        source: '<no source>',
                        original: { line: 1, column: 0 },
                        generated: { line: line, column: column - 1 }
                    });
                }
            }
        });
    };

    MapGenerator.prototype.generate = function generate() {
        this.clearAnnotation();

        if (this.isMap()) {
            return this.generateMap();
        } else {
            var result = '';
            this.stringify(this.root, function (i) {
                result += i;
            });
            return [result];
        }
    };

    return MapGenerator;
}();

exports.default = MapGenerator;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcC1nZW5lcmF0b3IuZXM2Il0sIm5hbWVzIjpbIk1hcEdlbmVyYXRvciIsInN0cmluZ2lmeSIsInJvb3QiLCJvcHRzIiwibWFwT3B0cyIsIm1hcCIsImlzTWFwIiwicHJldmlvdXMiLCJsZW5ndGgiLCJwcmV2aW91c01hcHMiLCJ3YWxrIiwibm9kZSIsInNvdXJjZSIsImlucHV0IiwiaW5kZXhPZiIsInB1c2giLCJpc0lubGluZSIsImlubGluZSIsImFubm90YXRpb24iLCJzb21lIiwiaSIsImlzU291cmNlc0NvbnRlbnQiLCJzb3VyY2VzQ29udGVudCIsIndpdGhDb250ZW50IiwiY2xlYXJBbm5vdGF0aW9uIiwibm9kZXMiLCJ0eXBlIiwidGV4dCIsInJlbW92ZUNoaWxkIiwic2V0U291cmNlc0NvbnRlbnQiLCJhbHJlYWR5IiwiZnJvbSIsInJlbGF0aXZlIiwic2V0U291cmNlQ29udGVudCIsImNzcyIsImFwcGx5UHJldk1hcHMiLCJwcmV2IiwiZmlsZSIsInBhdGgiLCJkaXJuYW1lIiwibW96aWxsYSIsIlNvdXJjZU1hcENvbnN1bWVyIiwiY29uc3VtZXIiLCJhcHBseVNvdXJjZU1hcCIsImlzQW5ub3RhdGlvbiIsInRvQmFzZTY0Iiwic3RyIiwiQnVmZmVyIiwiVWludDhBcnJheSIsInRvU3RyaW5nIiwid2luZG93IiwiYnRvYSIsInVuZXNjYXBlIiwiZW5jb2RlVVJJQ29tcG9uZW50IiwiYWRkQW5ub3RhdGlvbiIsImNvbnRlbnQiLCJvdXRwdXRGaWxlIiwiZW9sIiwidG8iLCJnZW5lcmF0ZU1hcCIsImdlbmVyYXRlU3RyaW5nIiwidGVzdCIsInJlc29sdmUiLCJzZXAiLCJyZXBsYWNlIiwic291cmNlUGF0aCIsIlNvdXJjZU1hcEdlbmVyYXRvciIsImxpbmUiLCJjb2x1bW4iLCJsaW5lcyIsImxhc3QiLCJzdGFydCIsImFkZE1hcHBpbmciLCJnZW5lcmF0ZWQiLCJvcmlnaW5hbCIsIm1hdGNoIiwibGFzdEluZGV4T2YiLCJlbmQiLCJnZW5lcmF0ZSIsInJlc3VsdCJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7O0lBRXFCQSxZO0FBRWpCLDBCQUFZQyxTQUFaLEVBQXVCQyxJQUF2QixFQUE2QkMsSUFBN0IsRUFBbUM7QUFBQTs7QUFDL0IsYUFBS0YsU0FBTCxHQUFpQkEsU0FBakI7QUFDQSxhQUFLRyxPQUFMLEdBQWlCRCxLQUFLRSxHQUFMLElBQVksRUFBN0I7QUFDQSxhQUFLSCxJQUFMLEdBQWlCQSxJQUFqQjtBQUNBLGFBQUtDLElBQUwsR0FBaUJBLElBQWpCO0FBQ0g7OzJCQUVERyxLLG9CQUFRO0FBQ0osWUFBSyxPQUFPLEtBQUtILElBQUwsQ0FBVUUsR0FBakIsS0FBeUIsV0FBOUIsRUFBNEM7QUFDeEMsbUJBQU8sQ0FBQyxDQUFDLEtBQUtGLElBQUwsQ0FBVUUsR0FBbkI7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBTyxLQUFLRSxRQUFMLEdBQWdCQyxNQUFoQixHQUF5QixDQUFoQztBQUNIO0FBQ0osSzs7MkJBRURELFEsdUJBQVc7QUFBQTs7QUFDUCxZQUFLLENBQUMsS0FBS0UsWUFBWCxFQUEwQjtBQUN0QixpQkFBS0EsWUFBTCxHQUFvQixFQUFwQjtBQUNBLGlCQUFLUCxJQUFMLENBQVVRLElBQVYsQ0FBZ0IsZ0JBQVE7QUFDcEIsb0JBQUtDLEtBQUtDLE1BQUwsSUFBZUQsS0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCUixHQUF0QyxFQUE0QztBQUN4Qyx3QkFBSUEsTUFBTU0sS0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCUixHQUE1QjtBQUNBLHdCQUFLLE1BQUtJLFlBQUwsQ0FBa0JLLE9BQWxCLENBQTBCVCxHQUExQixNQUFtQyxDQUFDLENBQXpDLEVBQTZDO0FBQ3pDLDhCQUFLSSxZQUFMLENBQWtCTSxJQUFsQixDQUF1QlYsR0FBdkI7QUFDSDtBQUNKO0FBQ0osYUFQRDtBQVFIOztBQUVELGVBQU8sS0FBS0ksWUFBWjtBQUNILEs7OzJCQUVETyxRLHVCQUFXO0FBQ1AsWUFBSyxPQUFPLEtBQUtaLE9BQUwsQ0FBYWEsTUFBcEIsS0FBK0IsV0FBcEMsRUFBa0Q7QUFDOUMsbUJBQU8sS0FBS2IsT0FBTCxDQUFhYSxNQUFwQjtBQUNIOztBQUVELFlBQUlDLGFBQWEsS0FBS2QsT0FBTCxDQUFhYyxVQUE5QjtBQUNBLFlBQUssT0FBT0EsVUFBUCxLQUFzQixXQUF0QixJQUFxQ0EsZUFBZSxJQUF6RCxFQUFnRTtBQUM1RCxtQkFBTyxLQUFQO0FBQ0g7O0FBRUQsWUFBSyxLQUFLWCxRQUFMLEdBQWdCQyxNQUFyQixFQUE4QjtBQUMxQixtQkFBTyxLQUFLRCxRQUFMLEdBQWdCWSxJQUFoQixDQUFzQjtBQUFBLHVCQUFLQyxFQUFFSCxNQUFQO0FBQUEsYUFBdEIsQ0FBUDtBQUNILFNBRkQsTUFFTztBQUNILG1CQUFPLElBQVA7QUFDSDtBQUNKLEs7OzJCQUVESSxnQiwrQkFBbUI7QUFDZixZQUFLLE9BQU8sS0FBS2pCLE9BQUwsQ0FBYWtCLGNBQXBCLEtBQXVDLFdBQTVDLEVBQTBEO0FBQ3RELG1CQUFPLEtBQUtsQixPQUFMLENBQWFrQixjQUFwQjtBQUNIO0FBQ0QsWUFBSyxLQUFLZixRQUFMLEdBQWdCQyxNQUFyQixFQUE4QjtBQUMxQixtQkFBTyxLQUFLRCxRQUFMLEdBQWdCWSxJQUFoQixDQUFzQjtBQUFBLHVCQUFLQyxFQUFFRyxXQUFGLEVBQUw7QUFBQSxhQUF0QixDQUFQO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsbUJBQU8sSUFBUDtBQUNIO0FBQ0osSzs7MkJBRURDLGUsOEJBQWtCO0FBQ2QsWUFBSyxLQUFLcEIsT0FBTCxDQUFhYyxVQUFiLEtBQTRCLEtBQWpDLEVBQXlDOztBQUV6QyxZQUFJUCxhQUFKO0FBQ0EsYUFBTSxJQUFJUyxJQUFJLEtBQUtsQixJQUFMLENBQVV1QixLQUFWLENBQWdCakIsTUFBaEIsR0FBeUIsQ0FBdkMsRUFBMENZLEtBQUssQ0FBL0MsRUFBa0RBLEdBQWxELEVBQXdEO0FBQ3BEVCxtQkFBTyxLQUFLVCxJQUFMLENBQVV1QixLQUFWLENBQWdCTCxDQUFoQixDQUFQO0FBQ0EsZ0JBQUtULEtBQUtlLElBQUwsS0FBYyxTQUFuQixFQUErQjtBQUMvQixnQkFBS2YsS0FBS2dCLElBQUwsQ0FBVWIsT0FBVixDQUFrQixxQkFBbEIsTUFBNkMsQ0FBbEQsRUFBc0Q7QUFDbEQscUJBQUtaLElBQUwsQ0FBVTBCLFdBQVYsQ0FBc0JSLENBQXRCO0FBQ0g7QUFDSjtBQUNKLEs7OzJCQUVEUyxpQixnQ0FBb0I7QUFBQTs7QUFDaEIsWUFBSUMsVUFBVSxFQUFkO0FBQ0EsYUFBSzVCLElBQUwsQ0FBVVEsSUFBVixDQUFnQixnQkFBUTtBQUNwQixnQkFBS0MsS0FBS0MsTUFBVixFQUFtQjtBQUNmLG9CQUFJbUIsT0FBT3BCLEtBQUtDLE1BQUwsQ0FBWUMsS0FBWixDQUFrQmtCLElBQTdCO0FBQ0Esb0JBQUtBLFFBQVEsQ0FBQ0QsUUFBUUMsSUFBUixDQUFkLEVBQThCO0FBQzFCRCw0QkFBUUMsSUFBUixJQUFnQixJQUFoQjtBQUNBLHdCQUFJQyxXQUFXLE9BQUtBLFFBQUwsQ0FBY0QsSUFBZCxDQUFmO0FBQ0EsMkJBQUsxQixHQUFMLENBQVM0QixnQkFBVCxDQUEwQkQsUUFBMUIsRUFBb0NyQixLQUFLQyxNQUFMLENBQVlDLEtBQVosQ0FBa0JxQixHQUF0RDtBQUNIO0FBQ0o7QUFDSixTQVREO0FBVUgsSzs7MkJBRURDLGEsNEJBQWdCO0FBQ1osNkJBQWtCLEtBQUs1QixRQUFMLEVBQWxCLGtIQUFvQztBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBQUEsZ0JBQTFCNkIsSUFBMEI7O0FBQ2hDLGdCQUFJTCxPQUFPLEtBQUtDLFFBQUwsQ0FBY0ksS0FBS0MsSUFBbkIsQ0FBWDtBQUNBLGdCQUFJbkMsT0FBT2tDLEtBQUtsQyxJQUFMLElBQWFvQyxlQUFLQyxPQUFMLENBQWFILEtBQUtDLElBQWxCLENBQXhCO0FBQ0EsZ0JBQUloQyxZQUFKOztBQUVBLGdCQUFLLEtBQUtELE9BQUwsQ0FBYWtCLGNBQWIsS0FBZ0MsS0FBckMsRUFBNkM7QUFDekNqQixzQkFBTSxJQUFJbUMsb0JBQVFDLGlCQUFaLENBQThCTCxLQUFLVCxJQUFuQyxDQUFOO0FBQ0Esb0JBQUt0QixJQUFJaUIsY0FBVCxFQUEwQjtBQUN0QmpCLHdCQUFJaUIsY0FBSixHQUFxQmpCLElBQUlpQixjQUFKLENBQW1CakIsR0FBbkIsQ0FBd0I7QUFBQSwrQkFBTSxJQUFOO0FBQUEscUJBQXhCLENBQXJCO0FBQ0g7QUFDSixhQUxELE1BS087QUFDSEEsc0JBQU0rQixLQUFLTSxRQUFMLEVBQU47QUFDSDs7QUFFRCxpQkFBS3JDLEdBQUwsQ0FBU3NDLGNBQVQsQ0FBd0J0QyxHQUF4QixFQUE2QjBCLElBQTdCLEVBQW1DLEtBQUtDLFFBQUwsQ0FBYzlCLElBQWQsQ0FBbkM7QUFDSDtBQUNKLEs7OzJCQUVEMEMsWSwyQkFBZTtBQUNYLFlBQUssS0FBSzVCLFFBQUwsRUFBTCxFQUF1QjtBQUNuQixtQkFBTyxJQUFQO0FBQ0gsU0FGRCxNQUVPLElBQUssT0FBTyxLQUFLWixPQUFMLENBQWFjLFVBQXBCLEtBQW1DLFdBQXhDLEVBQXNEO0FBQ3pELG1CQUFPLEtBQUtkLE9BQUwsQ0FBYWMsVUFBcEI7QUFDSCxTQUZNLE1BRUEsSUFBSyxLQUFLWCxRQUFMLEdBQWdCQyxNQUFyQixFQUE4QjtBQUNqQyxtQkFBTyxLQUFLRCxRQUFMLEdBQWdCWSxJQUFoQixDQUFzQjtBQUFBLHVCQUFLQyxFQUFFRixVQUFQO0FBQUEsYUFBdEIsQ0FBUDtBQUNILFNBRk0sTUFFQTtBQUNILG1CQUFPLElBQVA7QUFDSDtBQUNKLEs7OzJCQUVEMkIsUSxxQkFBU0MsRyxFQUFLO0FBQ1YsWUFBS0MsTUFBTCxFQUFjO0FBQ1YsZ0JBQUtBLE9BQU9oQixJQUFQLElBQWVnQixPQUFPaEIsSUFBUCxLQUFnQmlCLFdBQVdqQixJQUEvQyxFQUFzRDtBQUNsRCx1QkFBT2dCLE9BQU9oQixJQUFQLENBQVllLEdBQVosRUFBaUJHLFFBQWpCLENBQTBCLFFBQTFCLENBQVA7QUFDSCxhQUZELE1BRU87QUFDSCx1QkFBTyxJQUFJRixNQUFKLENBQVdELEdBQVgsRUFBZ0JHLFFBQWhCLENBQXlCLFFBQXpCLENBQVA7QUFDSDtBQUNKLFNBTkQsTUFNTztBQUNILG1CQUFPQyxPQUFPQyxJQUFQLENBQVlDLFNBQVNDLG1CQUFtQlAsR0FBbkIsQ0FBVCxDQUFaLENBQVA7QUFDSDtBQUNKLEs7OzJCQUVEUSxhLDRCQUFnQjtBQUNaLFlBQUlDLGdCQUFKOztBQUVBLFlBQUssS0FBS3ZDLFFBQUwsRUFBTCxFQUF1Qjs7QUFFbkJ1QyxzQkFBVSxrQ0FDTixLQUFLVixRQUFMLENBQWMsS0FBS3hDLEdBQUwsQ0FBUzRDLFFBQVQsRUFBZCxDQURKO0FBR0gsU0FMRCxNQUtPLElBQUssT0FBTyxLQUFLN0MsT0FBTCxDQUFhYyxVQUFwQixLQUFtQyxRQUF4QyxFQUFtRDtBQUN0RHFDLHNCQUFVLEtBQUtuRCxPQUFMLENBQWFjLFVBQXZCO0FBRUgsU0FITSxNQUdBO0FBQ0hxQyxzQkFBVSxLQUFLQyxVQUFMLEtBQW9CLE1BQTlCO0FBQ0g7O0FBRUQsWUFBSUMsTUFBUSxJQUFaO0FBQ0EsWUFBSyxLQUFLdkIsR0FBTCxDQUFTcEIsT0FBVCxDQUFpQixNQUFqQixNQUE2QixDQUFDLENBQW5DLEVBQXVDMkMsTUFBTSxNQUFOOztBQUV2QyxhQUFLdkIsR0FBTCxJQUFZdUIsTUFBTSx1QkFBTixHQUFnQ0YsT0FBaEMsR0FBMEMsS0FBdEQ7QUFDSCxLOzsyQkFFREMsVSx5QkFBYTtBQUNULFlBQUssS0FBS3JELElBQUwsQ0FBVXVELEVBQWYsRUFBb0I7QUFDaEIsbUJBQU8sS0FBSzFCLFFBQUwsQ0FBYyxLQUFLN0IsSUFBTCxDQUFVdUQsRUFBeEIsQ0FBUDtBQUNILFNBRkQsTUFFTyxJQUFLLEtBQUt2RCxJQUFMLENBQVU0QixJQUFmLEVBQXNCO0FBQ3pCLG1CQUFPLEtBQUtDLFFBQUwsQ0FBYyxLQUFLN0IsSUFBTCxDQUFVNEIsSUFBeEIsQ0FBUDtBQUNILFNBRk0sTUFFQTtBQUNILG1CQUFPLFFBQVA7QUFDSDtBQUNKLEs7OzJCQUVENEIsVywwQkFBYztBQUNWLGFBQUtDLGNBQUw7QUFDQSxZQUFLLEtBQUt2QyxnQkFBTCxFQUFMLEVBQWtDLEtBQUtRLGlCQUFMO0FBQ2xDLFlBQUssS0FBS3RCLFFBQUwsR0FBZ0JDLE1BQWhCLEdBQXlCLENBQTlCLEVBQWtDLEtBQUsyQixhQUFMO0FBQ2xDLFlBQUssS0FBS1MsWUFBTCxFQUFMLEVBQWtDLEtBQUtVLGFBQUw7O0FBRWxDLFlBQUssS0FBS3RDLFFBQUwsRUFBTCxFQUF1QjtBQUNuQixtQkFBTyxDQUFDLEtBQUtrQixHQUFOLENBQVA7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBTyxDQUFDLEtBQUtBLEdBQU4sRUFBVyxLQUFLN0IsR0FBaEIsQ0FBUDtBQUNIO0FBQ0osSzs7MkJBRUQyQixRLHFCQUFTSyxJLEVBQU07QUFDWCxZQUFLQSxLQUFLdkIsT0FBTCxDQUFhLEdBQWIsTUFBc0IsQ0FBM0IsRUFBK0IsT0FBT3VCLElBQVA7QUFDL0IsWUFBSyxZQUFZd0IsSUFBWixDQUFpQnhCLElBQWpCLENBQUwsRUFBOEIsT0FBT0EsSUFBUDs7QUFFOUIsWUFBSU4sT0FBTyxLQUFLNUIsSUFBTCxDQUFVdUQsRUFBVixHQUFlcEIsZUFBS0MsT0FBTCxDQUFhLEtBQUtwQyxJQUFMLENBQVV1RCxFQUF2QixDQUFmLEdBQTRDLEdBQXZEOztBQUVBLFlBQUssT0FBTyxLQUFLdEQsT0FBTCxDQUFhYyxVQUFwQixLQUFtQyxRQUF4QyxFQUFtRDtBQUMvQ2EsbUJBQU9PLGVBQUtDLE9BQUwsQ0FBY0QsZUFBS3dCLE9BQUwsQ0FBYS9CLElBQWIsRUFBbUIsS0FBSzNCLE9BQUwsQ0FBYWMsVUFBaEMsQ0FBZCxDQUFQO0FBQ0g7O0FBRURtQixlQUFPQyxlQUFLTixRQUFMLENBQWNELElBQWQsRUFBb0JNLElBQXBCLENBQVA7QUFDQSxZQUFLQyxlQUFLeUIsR0FBTCxLQUFhLElBQWxCLEVBQXlCO0FBQ3JCLG1CQUFPMUIsS0FBSzJCLE9BQUwsQ0FBYSxLQUFiLEVBQW9CLEdBQXBCLENBQVA7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBTzNCLElBQVA7QUFDSDtBQUNKLEs7OzJCQUVENEIsVSx1QkFBV3RELEksRUFBTTtBQUNiLFlBQUssS0FBS1AsT0FBTCxDQUFhMkIsSUFBbEIsRUFBeUI7QUFDckIsbUJBQU8sS0FBSzNCLE9BQUwsQ0FBYTJCLElBQXBCO0FBQ0gsU0FGRCxNQUVPO0FBQ0gsbUJBQU8sS0FBS0MsUUFBTCxDQUFjckIsS0FBS0MsTUFBTCxDQUFZQyxLQUFaLENBQWtCa0IsSUFBaEMsQ0FBUDtBQUNIO0FBQ0osSzs7MkJBRUQ2QixjLDZCQUFpQjtBQUFBOztBQUNiLGFBQUsxQixHQUFMLEdBQVcsRUFBWDtBQUNBLGFBQUs3QixHQUFMLEdBQVcsSUFBSW1DLG9CQUFRMEIsa0JBQVosQ0FBK0IsRUFBRTdCLE1BQU0sS0FBS21CLFVBQUwsRUFBUixFQUEvQixDQUFYOztBQUVBLFlBQUlXLE9BQVMsQ0FBYjtBQUNBLFlBQUlDLFNBQVMsQ0FBYjs7QUFFQSxZQUFJQyxjQUFKO0FBQUEsWUFBV0MsYUFBWDtBQUNBLGFBQUtyRSxTQUFMLENBQWUsS0FBS0MsSUFBcEIsRUFBMEIsVUFBQzRDLEdBQUQsRUFBTW5DLElBQU4sRUFBWWUsSUFBWixFQUFxQjtBQUMzQyxtQkFBS1EsR0FBTCxJQUFZWSxHQUFaOztBQUVBLGdCQUFLbkMsUUFBUWUsU0FBUyxLQUF0QixFQUE4QjtBQUMxQixvQkFBS2YsS0FBS0MsTUFBTCxJQUFlRCxLQUFLQyxNQUFMLENBQVkyRCxLQUFoQyxFQUF3QztBQUNwQywyQkFBS2xFLEdBQUwsQ0FBU21FLFVBQVQsQ0FBb0I7QUFDaEI1RCxnQ0FBVyxPQUFLcUQsVUFBTCxDQUFnQnRELElBQWhCLENBREs7QUFFaEI4RCxtQ0FBVyxFQUFFTixVQUFGLEVBQVFDLFFBQVFBLFNBQVMsQ0FBekIsRUFGSztBQUdoQk0sa0NBQVc7QUFDUFAsa0NBQVF4RCxLQUFLQyxNQUFMLENBQVkyRCxLQUFaLENBQWtCSixJQURuQjtBQUVQQyxvQ0FBUXpELEtBQUtDLE1BQUwsQ0FBWTJELEtBQVosQ0FBa0JILE1BQWxCLEdBQTJCO0FBRjVCO0FBSEsscUJBQXBCO0FBUUgsaUJBVEQsTUFTTztBQUNILDJCQUFLL0QsR0FBTCxDQUFTbUUsVUFBVCxDQUFvQjtBQUNoQjVELGdDQUFXLGFBREs7QUFFaEI4RCxrQ0FBVyxFQUFFUCxNQUFNLENBQVIsRUFBV0MsUUFBUSxDQUFuQixFQUZLO0FBR2hCSyxtQ0FBVyxFQUFFTixVQUFGLEVBQVFDLFFBQVFBLFNBQVMsQ0FBekI7QUFISyxxQkFBcEI7QUFLSDtBQUNKOztBQUVEQyxvQkFBUXZCLElBQUk2QixLQUFKLENBQVUsS0FBVixDQUFSO0FBQ0EsZ0JBQUtOLEtBQUwsRUFBYTtBQUNURix3QkFBU0UsTUFBTTdELE1BQWY7QUFDQThELHVCQUFTeEIsSUFBSThCLFdBQUosQ0FBZ0IsSUFBaEIsQ0FBVDtBQUNBUix5QkFBU3RCLElBQUl0QyxNQUFKLEdBQWE4RCxJQUF0QjtBQUNILGFBSkQsTUFJTztBQUNIRiwwQkFBVXRCLElBQUl0QyxNQUFkO0FBQ0g7O0FBRUQsZ0JBQUtHLFFBQVFlLFNBQVMsT0FBdEIsRUFBZ0M7QUFDNUIsb0JBQUtmLEtBQUtDLE1BQUwsSUFBZUQsS0FBS0MsTUFBTCxDQUFZaUUsR0FBaEMsRUFBc0M7QUFDbEMsMkJBQUt4RSxHQUFMLENBQVNtRSxVQUFULENBQW9CO0FBQ2hCNUQsZ0NBQVcsT0FBS3FELFVBQUwsQ0FBZ0J0RCxJQUFoQixDQURLO0FBRWhCOEQsbUNBQVcsRUFBRU4sVUFBRixFQUFRQyxRQUFRQSxTQUFTLENBQXpCLEVBRks7QUFHaEJNLGtDQUFXO0FBQ1BQLGtDQUFReEQsS0FBS0MsTUFBTCxDQUFZaUUsR0FBWixDQUFnQlYsSUFEakI7QUFFUEMsb0NBQVF6RCxLQUFLQyxNQUFMLENBQVlpRSxHQUFaLENBQWdCVDtBQUZqQjtBQUhLLHFCQUFwQjtBQVFILGlCQVRELE1BU087QUFDSCwyQkFBSy9ELEdBQUwsQ0FBU21FLFVBQVQsQ0FBb0I7QUFDaEI1RCxnQ0FBVyxhQURLO0FBRWhCOEQsa0NBQVcsRUFBRVAsTUFBTSxDQUFSLEVBQVdDLFFBQVEsQ0FBbkIsRUFGSztBQUdoQkssbUNBQVcsRUFBRU4sVUFBRixFQUFRQyxRQUFRQSxTQUFTLENBQXpCO0FBSEsscUJBQXBCO0FBS0g7QUFDSjtBQUNKLFNBakREO0FBa0RILEs7OzJCQUVEVSxRLHVCQUFXO0FBQ1AsYUFBS3RELGVBQUw7O0FBRUEsWUFBSyxLQUFLbEIsS0FBTCxFQUFMLEVBQW9CO0FBQ2hCLG1CQUFPLEtBQUtxRCxXQUFMLEVBQVA7QUFDSCxTQUZELE1BRU87QUFDSCxnQkFBSW9CLFNBQVMsRUFBYjtBQUNBLGlCQUFLOUUsU0FBTCxDQUFlLEtBQUtDLElBQXBCLEVBQTBCLGFBQUs7QUFDM0I2RSwwQkFBVTNELENBQVY7QUFDSCxhQUZEO0FBR0EsbUJBQU8sQ0FBQzJELE1BQUQsQ0FBUDtBQUNIO0FBQ0osSzs7Ozs7a0JBalJnQi9FLFkiLCJmaWxlIjoibWFwLWdlbmVyYXRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBtb3ppbGxhIGZyb20gJ3NvdXJjZS1tYXAnO1xuaW1wb3J0IHBhdGggICAgZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcEdlbmVyYXRvciB7XG5cbiAgICBjb25zdHJ1Y3RvcihzdHJpbmdpZnksIHJvb3QsIG9wdHMpIHtcbiAgICAgICAgdGhpcy5zdHJpbmdpZnkgPSBzdHJpbmdpZnk7XG4gICAgICAgIHRoaXMubWFwT3B0cyAgID0gb3B0cy5tYXAgfHwgeyB9O1xuICAgICAgICB0aGlzLnJvb3QgICAgICA9IHJvb3Q7XG4gICAgICAgIHRoaXMub3B0cyAgICAgID0gb3B0cztcbiAgICB9XG5cbiAgICBpc01hcCgpIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgdGhpcy5vcHRzLm1hcCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLm9wdHMubWFwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5sZW5ndGggPiAwO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldmlvdXMoKSB7XG4gICAgICAgIGlmICggIXRoaXMucHJldmlvdXNNYXBzICkge1xuICAgICAgICAgICAgdGhpcy5wcmV2aW91c01hcHMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMucm9vdC53YWxrKCBub2RlID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIG5vZGUuc291cmNlICYmIG5vZGUuc291cmNlLmlucHV0Lm1hcCApIHtcbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hcCA9IG5vZGUuc291cmNlLmlucHV0Lm1hcDtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCB0aGlzLnByZXZpb3VzTWFwcy5pbmRleE9mKG1hcCkgPT09IC0xICkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wcmV2aW91c01hcHMucHVzaChtYXApO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy5wcmV2aW91c01hcHM7XG4gICAgfVxuXG4gICAgaXNJbmxpbmUoKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHRoaXMubWFwT3B0cy5pbmxpbmUgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5pbmxpbmU7XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgYW5ub3RhdGlvbiA9IHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uO1xuICAgICAgICBpZiAoIHR5cGVvZiBhbm5vdGF0aW9uICE9PSAndW5kZWZpbmVkJyAmJiBhbm5vdGF0aW9uICE9PSB0cnVlICkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCB0aGlzLnByZXZpb3VzKCkubGVuZ3RoICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKCBpID0+IGkuaW5saW5lICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzU291cmNlc0NvbnRlbnQoKSB7XG4gICAgICAgIGlmICggdHlwZW9mIHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLnNvdXJjZXNDb250ZW50O1xuICAgICAgICB9XG4gICAgICAgIGlmICggdGhpcy5wcmV2aW91cygpLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByZXZpb3VzKCkuc29tZSggaSA9PiBpLndpdGhDb250ZW50KCkgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xlYXJBbm5vdGF0aW9uKCkge1xuICAgICAgICBpZiAoIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uID09PSBmYWxzZSApIHJldHVybjtcblxuICAgICAgICBsZXQgbm9kZTtcbiAgICAgICAgZm9yICggbGV0IGkgPSB0aGlzLnJvb3Qubm9kZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0gKSB7XG4gICAgICAgICAgICBub2RlID0gdGhpcy5yb290Lm5vZGVzW2ldO1xuICAgICAgICAgICAgaWYgKCBub2RlLnR5cGUgIT09ICdjb21tZW50JyApIGNvbnRpbnVlO1xuICAgICAgICAgICAgaWYgKCBub2RlLnRleHQuaW5kZXhPZignIyBzb3VyY2VNYXBwaW5nVVJMPScpID09PSAwICkge1xuICAgICAgICAgICAgICAgIHRoaXMucm9vdC5yZW1vdmVDaGlsZChpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFNvdXJjZXNDb250ZW50KCkge1xuICAgICAgICBsZXQgYWxyZWFkeSA9IHsgfTtcbiAgICAgICAgdGhpcy5yb290LndhbGsoIG5vZGUgPT4ge1xuICAgICAgICAgICAgaWYgKCBub2RlLnNvdXJjZSApIHtcbiAgICAgICAgICAgICAgICBsZXQgZnJvbSA9IG5vZGUuc291cmNlLmlucHV0LmZyb207XG4gICAgICAgICAgICAgICAgaWYgKCBmcm9tICYmICFhbHJlYWR5W2Zyb21dICkge1xuICAgICAgICAgICAgICAgICAgICBhbHJlYWR5W2Zyb21dID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHJlbGF0aXZlID0gdGhpcy5yZWxhdGl2ZShmcm9tKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuc2V0U291cmNlQ29udGVudChyZWxhdGl2ZSwgbm9kZS5zb3VyY2UuaW5wdXQuY3NzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGFwcGx5UHJldk1hcHMoKSB7XG4gICAgICAgIGZvciAoIGxldCBwcmV2IG9mIHRoaXMucHJldmlvdXMoKSApIHtcbiAgICAgICAgICAgIGxldCBmcm9tID0gdGhpcy5yZWxhdGl2ZShwcmV2LmZpbGUpO1xuICAgICAgICAgICAgbGV0IHJvb3QgPSBwcmV2LnJvb3QgfHwgcGF0aC5kaXJuYW1lKHByZXYuZmlsZSk7XG4gICAgICAgICAgICBsZXQgbWFwO1xuXG4gICAgICAgICAgICBpZiAoIHRoaXMubWFwT3B0cy5zb3VyY2VzQ29udGVudCA9PT0gZmFsc2UgKSB7XG4gICAgICAgICAgICAgICAgbWFwID0gbmV3IG1vemlsbGEuU291cmNlTWFwQ29uc3VtZXIocHJldi50ZXh0KTtcbiAgICAgICAgICAgICAgICBpZiAoIG1hcC5zb3VyY2VzQ29udGVudCApIHtcbiAgICAgICAgICAgICAgICAgICAgbWFwLnNvdXJjZXNDb250ZW50ID0gbWFwLnNvdXJjZXNDb250ZW50Lm1hcCggKCkgPT4gbnVsbCApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbWFwID0gcHJldi5jb25zdW1lcigpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm1hcC5hcHBseVNvdXJjZU1hcChtYXAsIGZyb20sIHRoaXMucmVsYXRpdmUocm9vdCkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNBbm5vdGF0aW9uKCkge1xuICAgICAgICBpZiAoIHRoaXMuaXNJbmxpbmUoKSApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uO1xuICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLnByZXZpb3VzKCkubGVuZ3RoICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucHJldmlvdXMoKS5zb21lKCBpID0+IGkuYW5ub3RhdGlvbiApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b0Jhc2U2NChzdHIpIHtcbiAgICAgICAgaWYgKCBCdWZmZXIgKSB7XG4gICAgICAgICAgICBpZiAoIEJ1ZmZlci5mcm9tICYmIEJ1ZmZlci5mcm9tICE9PSBVaW50OEFycmF5LmZyb20gKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIEJ1ZmZlci5mcm9tKHN0cikudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEJ1ZmZlcihzdHIpLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB3aW5kb3cuYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoc3RyKSkpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYWRkQW5ub3RhdGlvbigpIHtcbiAgICAgICAgbGV0IGNvbnRlbnQ7XG5cbiAgICAgICAgaWYgKCB0aGlzLmlzSW5saW5lKCkgKSB7XG5cbiAgICAgICAgICAgIGNvbnRlbnQgPSAnZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCwnICtcbiAgICAgICAgICAgICAgICB0aGlzLnRvQmFzZTY0KHRoaXMubWFwLnRvU3RyaW5nKCkpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoIHR5cGVvZiB0aGlzLm1hcE9wdHMuYW5ub3RhdGlvbiA9PT0gJ3N0cmluZycgKSB7XG4gICAgICAgICAgICBjb250ZW50ID0gdGhpcy5tYXBPcHRzLmFubm90YXRpb247XG5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnRlbnQgPSB0aGlzLm91dHB1dEZpbGUoKSArICcubWFwJztcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBlb2wgICA9ICdcXG4nO1xuICAgICAgICBpZiAoIHRoaXMuY3NzLmluZGV4T2YoJ1xcclxcbicpICE9PSAtMSApIGVvbCA9ICdcXHJcXG4nO1xuXG4gICAgICAgIHRoaXMuY3NzICs9IGVvbCArICcvKiMgc291cmNlTWFwcGluZ1VSTD0nICsgY29udGVudCArICcgKi8nO1xuICAgIH1cblxuICAgIG91dHB1dEZpbGUoKSB7XG4gICAgICAgIGlmICggdGhpcy5vcHRzLnRvICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVsYXRpdmUodGhpcy5vcHRzLnRvKTtcbiAgICAgICAgfSBlbHNlIGlmICggdGhpcy5vcHRzLmZyb20gKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZSh0aGlzLm9wdHMuZnJvbSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJ3RvLmNzcyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZW5lcmF0ZU1hcCgpIHtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVN0cmluZygpO1xuICAgICAgICBpZiAoIHRoaXMuaXNTb3VyY2VzQ29udGVudCgpICkgICAgdGhpcy5zZXRTb3VyY2VzQ29udGVudCgpO1xuICAgICAgICBpZiAoIHRoaXMucHJldmlvdXMoKS5sZW5ndGggPiAwICkgdGhpcy5hcHBseVByZXZNYXBzKCk7XG4gICAgICAgIGlmICggdGhpcy5pc0Fubm90YXRpb24oKSApICAgICAgICB0aGlzLmFkZEFubm90YXRpb24oKTtcblxuICAgICAgICBpZiAoIHRoaXMuaXNJbmxpbmUoKSApIHtcbiAgICAgICAgICAgIHJldHVybiBbdGhpcy5jc3NdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLmNzcywgdGhpcy5tYXBdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVsYXRpdmUoZmlsZSkge1xuICAgICAgICBpZiAoIGZpbGUuaW5kZXhPZignPCcpID09PSAwICkgcmV0dXJuIGZpbGU7XG4gICAgICAgIGlmICggL15cXHcrOlxcL1xcLy8udGVzdChmaWxlKSApIHJldHVybiBmaWxlO1xuXG4gICAgICAgIGxldCBmcm9tID0gdGhpcy5vcHRzLnRvID8gcGF0aC5kaXJuYW1lKHRoaXMub3B0cy50bykgOiAnLic7XG5cbiAgICAgICAgaWYgKCB0eXBlb2YgdGhpcy5tYXBPcHRzLmFubm90YXRpb24gPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgZnJvbSA9IHBhdGguZGlybmFtZSggcGF0aC5yZXNvbHZlKGZyb20sIHRoaXMubWFwT3B0cy5hbm5vdGF0aW9uKSApO1xuICAgICAgICB9XG5cbiAgICAgICAgZmlsZSA9IHBhdGgucmVsYXRpdmUoZnJvbSwgZmlsZSk7XG4gICAgICAgIGlmICggcGF0aC5zZXAgPT09ICdcXFxcJyApIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlLnJlcGxhY2UoL1xcXFwvZywgJy8nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBmaWxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc291cmNlUGF0aChub2RlKSB7XG4gICAgICAgIGlmICggdGhpcy5tYXBPcHRzLmZyb20gKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXBPcHRzLmZyb207XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWxhdGl2ZShub2RlLnNvdXJjZS5pbnB1dC5mcm9tKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdlbmVyYXRlU3RyaW5nKCkge1xuICAgICAgICB0aGlzLmNzcyA9ICcnO1xuICAgICAgICB0aGlzLm1hcCA9IG5ldyBtb3ppbGxhLlNvdXJjZU1hcEdlbmVyYXRvcih7IGZpbGU6IHRoaXMub3V0cHV0RmlsZSgpIH0pO1xuXG4gICAgICAgIGxldCBsaW5lICAgPSAxO1xuICAgICAgICBsZXQgY29sdW1uID0gMTtcblxuICAgICAgICBsZXQgbGluZXMsIGxhc3Q7XG4gICAgICAgIHRoaXMuc3RyaW5naWZ5KHRoaXMucm9vdCwgKHN0ciwgbm9kZSwgdHlwZSkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jc3MgKz0gc3RyO1xuXG4gICAgICAgICAgICBpZiAoIG5vZGUgJiYgdHlwZSAhPT0gJ2VuZCcgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBub2RlLnNvdXJjZSAmJiBub2RlLnNvdXJjZS5zdGFydCApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6ICAgIHRoaXMuc291cmNlUGF0aChub2RlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlZDogeyBsaW5lLCBjb2x1bW46IGNvbHVtbiAtIDEgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yaWdpbmFsOiAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxpbmU6ICAgbm9kZS5zb3VyY2Uuc3RhcnQubGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG5vZGUuc291cmNlLnN0YXJ0LmNvbHVtbiAtIDFcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6ICAgICc8bm8gc291cmNlPicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogIHsgbGluZTogMSwgY29sdW1uOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZSwgY29sdW1uOiBjb2x1bW4gLSAxIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBsaW5lcyA9IHN0ci5tYXRjaCgvXFxuL2cpO1xuICAgICAgICAgICAgaWYgKCBsaW5lcyApIHtcbiAgICAgICAgICAgICAgICBsaW5lICArPSBsaW5lcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgbGFzdCAgID0gc3RyLmxhc3RJbmRleE9mKCdcXG4nKTtcbiAgICAgICAgICAgICAgICBjb2x1bW4gPSBzdHIubGVuZ3RoIC0gbGFzdDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29sdW1uICs9IHN0ci5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggbm9kZSAmJiB0eXBlICE9PSAnc3RhcnQnICkge1xuICAgICAgICAgICAgICAgIGlmICggbm9kZS5zb3VyY2UgJiYgbm9kZS5zb3VyY2UuZW5kICkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcC5hZGRNYXBwaW5nKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvdXJjZTogICAgdGhpcy5zb3VyY2VQYXRoKG5vZGUpLFxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVkOiB7IGxpbmUsIGNvbHVtbjogY29sdW1uIC0gMSB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgb3JpZ2luYWw6ICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGluZTogICBub2RlLnNvdXJjZS5lbmQubGluZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2x1bW46IG5vZGUuc291cmNlLmVuZC5jb2x1bW5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tYXAuYWRkTWFwcGluZyh7XG4gICAgICAgICAgICAgICAgICAgICAgICBzb3VyY2U6ICAgICc8bm8gc291cmNlPicsXG4gICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbDogIHsgbGluZTogMSwgY29sdW1uOiAwIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZWQ6IHsgbGluZSwgY29sdW1uOiBjb2x1bW4gLSAxIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBnZW5lcmF0ZSgpIHtcbiAgICAgICAgdGhpcy5jbGVhckFubm90YXRpb24oKTtcblxuICAgICAgICBpZiAoIHRoaXMuaXNNYXAoKSApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlTWFwKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgICAgICB0aGlzLnN0cmluZ2lmeSh0aGlzLnJvb3QsIGkgPT4ge1xuICAgICAgICAgICAgICAgIHJlc3VsdCArPSBpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gW3Jlc3VsdF07XG4gICAgICAgIH1cbiAgICB9XG5cbn1cbiJdfQ==

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544331, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _warning = require('./warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Provides the result of the PostCSS transformations.
 *
 * A Result instance is returned by {@link LazyResult#then}
 * or {@link Root#toResult} methods.
 *
 * @example
 * postcss([cssnext]).process(css).then(function (result) {
 *    console.log(result.css);
 * });
 *
 * @example
 * var result2 = postcss.parse(css).toResult();
 */
var Result = function () {

  /**
   * @param {Processor} processor - processor used for this transformation.
   * @param {Root}      root      - Root node after all transformations.
   * @param {processOptions} opts - options from the {@link Processor#process}
   *                                or {@link Root#toResult}
   */
  function Result(processor, root, opts) {
    _classCallCheck(this, Result);

    /**
     * @member {Processor} - The Processor instance used
     *                       for this transformation.
     *
     * @example
     * for ( let plugin of result.processor.plugins) {
     *   if ( plugin.postcssPlugin === 'postcss-bad' ) {
     *     throw 'postcss-good is incompatible with postcss-bad';
     *   }
     * });
     */
    this.processor = processor;
    /**
     * @member {Message[]} - Contains messages from plugins
     *                       (e.g., warnings or custom messages).
     *                       Each message should have type
     *                       and plugin properties.
     *
     * @example
     * postcss.plugin('postcss-min-browser', () => {
     *   return (root, result) => {
     *     var browsers = detectMinBrowsersByCanIUse(root);
     *     result.messages.push({
     *       type:    'min-browser',
     *       plugin:  'postcss-min-browser',
     *       browsers: browsers
     *     });
     *   };
     * });
     */
    this.messages = [];
    /**
     * @member {Root} - Root node after all transformations.
     *
     * @example
     * root.toResult().root == root;
     */
    this.root = root;
    /**
     * @member {processOptions} - Options from the {@link Processor#process}
     *                            or {@link Root#toResult} call
     *                            that produced this Result instance.
     *
     * @example
     * root.toResult(opts).opts == opts;
     */
    this.opts = opts;
    /**
     * @member {string} - A CSS string representing of {@link Result#root}.
     *
     * @example
     * postcss.parse('a{}').toResult().css //=> "a{}"
     */
    this.css = undefined;
    /**
     * @member {SourceMapGenerator} - An instance of `SourceMapGenerator`
     *                                class from the `source-map` library,
     *                                representing changes
     *                                to the {@link Result#root} instance.
     *
     * @example
     * result.map.toJSON() //=> { version: 3, file: 'a.css', … }
     *
     * @example
     * if ( result.map ) {
     *   fs.writeFileSync(result.opts.to + '.map', result.map.toString());
     * }
     */
    this.map = undefined;
  }

  /**
   * Returns for @{link Result#css} content.
   *
   * @example
   * result + '' === result.css
   *
   * @return {string} string representing of {@link Result#root}
   */


  Result.prototype.toString = function toString() {
    return this.css;
  };

  /**
   * Creates an instance of {@link Warning} and adds it
   * to {@link Result#messages}.
   *
   * @param {string} text        - warning message
   * @param {Object} [opts]      - warning options
   * @param {Node}   opts.node   - CSS node that caused the warning
   * @param {string} opts.word   - word in CSS source that caused the warning
   * @param {number} opts.index  - index in CSS node string that caused
   *                               the warning
   * @param {string} opts.plugin - name of the plugin that created
   *                               this warning. {@link Result#warn} fills
   *                               this property automatically.
   *
   * @return {Warning} created warning
   */


  Result.prototype.warn = function warn(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    if (!opts.plugin) {
      if (this.lastPlugin && this.lastPlugin.postcssPlugin) {
        opts.plugin = this.lastPlugin.postcssPlugin;
      }
    }

    var warning = new _warning2.default(text, opts);
    this.messages.push(warning);

    return warning;
  };

  /**
   * Returns warnings from plugins. Filters {@link Warning} instances
   * from {@link Result#messages}.
   *
   * @example
   * result.warnings().forEach(warn => {
   *   console.warn(warn.toString());
   * });
   *
   * @return {Warning[]} warnings from plugins
   */


  Result.prototype.warnings = function warnings() {
    return this.messages.filter(function (i) {
      return i.type === 'warning';
    });
  };

  /**
   * An alias for the {@link Result#css} property.
   * Use it with syntaxes that generate non-CSS output.
   * @type {string}
   *
   * @example
   * result.css === result.content;
   */


  _createClass(Result, [{
    key: 'content',
    get: function get() {
      return this.css;
    }
  }]);

  return Result;
}();

exports.default = Result;

/**
 * @typedef  {object} Message
 * @property {string} type   - message type
 * @property {string} plugin - source PostCSS plugin name
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlc3VsdC5lczYiXSwibmFtZXMiOlsiUmVzdWx0IiwicHJvY2Vzc29yIiwicm9vdCIsIm9wdHMiLCJtZXNzYWdlcyIsImNzcyIsInVuZGVmaW5lZCIsIm1hcCIsInRvU3RyaW5nIiwid2FybiIsInRleHQiLCJwbHVnaW4iLCJsYXN0UGx1Z2luIiwicG9zdGNzc1BsdWdpbiIsIndhcm5pbmciLCJXYXJuaW5nIiwicHVzaCIsIndhcm5pbmdzIiwiZmlsdGVyIiwiaSIsInR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7OztJQWNNQSxNOztBQUVGOzs7Ozs7QUFNQSxrQkFBWUMsU0FBWixFQUF1QkMsSUFBdkIsRUFBNkJDLElBQTdCLEVBQW1DO0FBQUE7O0FBQy9COzs7Ozs7Ozs7OztBQVdBLFNBQUtGLFNBQUwsR0FBaUJBLFNBQWpCO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFLRyxRQUFMLEdBQWdCLEVBQWhCO0FBQ0E7Ozs7OztBQU1BLFNBQUtGLElBQUwsR0FBWUEsSUFBWjtBQUNBOzs7Ozs7OztBQVFBLFNBQUtDLElBQUwsR0FBWUEsSUFBWjtBQUNBOzs7Ozs7QUFNQSxTQUFLRSxHQUFMLEdBQVdDLFNBQVg7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUFjQSxTQUFLQyxHQUFMLEdBQVdELFNBQVg7QUFDSDs7QUFFRDs7Ozs7Ozs7OzttQkFRQUUsUSx1QkFBVztBQUNQLFdBQU8sS0FBS0gsR0FBWjtBQUNILEc7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFnQkFJLEksaUJBQUtDLEksRUFBa0I7QUFBQSxRQUFaUCxJQUFZLHVFQUFMLEVBQUs7O0FBQ25CLFFBQUssQ0FBQ0EsS0FBS1EsTUFBWCxFQUFvQjtBQUNoQixVQUFLLEtBQUtDLFVBQUwsSUFBbUIsS0FBS0EsVUFBTCxDQUFnQkMsYUFBeEMsRUFBd0Q7QUFDcERWLGFBQUtRLE1BQUwsR0FBYyxLQUFLQyxVQUFMLENBQWdCQyxhQUE5QjtBQUNIO0FBQ0o7O0FBRUQsUUFBSUMsVUFBVSxJQUFJQyxpQkFBSixDQUFZTCxJQUFaLEVBQWtCUCxJQUFsQixDQUFkO0FBQ0EsU0FBS0MsUUFBTCxDQUFjWSxJQUFkLENBQW1CRixPQUFuQjs7QUFFQSxXQUFPQSxPQUFQO0FBQ0gsRzs7QUFFRDs7Ozs7Ozs7Ozs7OzttQkFXQUcsUSx1QkFBVztBQUNQLFdBQU8sS0FBS2IsUUFBTCxDQUFjYyxNQUFkLENBQXNCO0FBQUEsYUFBS0MsRUFBRUMsSUFBRixLQUFXLFNBQWhCO0FBQUEsS0FBdEIsQ0FBUDtBQUNILEc7O0FBRUQ7Ozs7Ozs7Ozs7Ozt3QkFRYztBQUNWLGFBQU8sS0FBS2YsR0FBWjtBQUNIOzs7Ozs7a0JBSVVMLE07O0FBRWYiLCJmaWxlIjoicmVzdWx0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFdhcm5pbmcgZnJvbSAnLi93YXJuaW5nJztcblxuLyoqXG4gKiBQcm92aWRlcyB0aGUgcmVzdWx0IG9mIHRoZSBQb3N0Q1NTIHRyYW5zZm9ybWF0aW9ucy5cbiAqXG4gKiBBIFJlc3VsdCBpbnN0YW5jZSBpcyByZXR1cm5lZCBieSB7QGxpbmsgTGF6eVJlc3VsdCN0aGVufVxuICogb3Ige0BsaW5rIFJvb3QjdG9SZXN1bHR9IG1ldGhvZHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIHBvc3Rjc3MoW2Nzc25leHRdKS5wcm9jZXNzKGNzcykudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gKiAgICBjb25zb2xlLmxvZyhyZXN1bHQuY3NzKTtcbiAqIH0pO1xuICpcbiAqIEBleGFtcGxlXG4gKiB2YXIgcmVzdWx0MiA9IHBvc3Rjc3MucGFyc2UoY3NzKS50b1Jlc3VsdCgpO1xuICovXG5jbGFzcyBSZXN1bHQge1xuXG4gICAgLyoqXG4gICAgICogQHBhcmFtIHtQcm9jZXNzb3J9IHByb2Nlc3NvciAtIHByb2Nlc3NvciB1c2VkIGZvciB0aGlzIHRyYW5zZm9ybWF0aW9uLlxuICAgICAqIEBwYXJhbSB7Um9vdH0gICAgICByb290ICAgICAgLSBSb290IG5vZGUgYWZ0ZXIgYWxsIHRyYW5zZm9ybWF0aW9ucy5cbiAgICAgKiBAcGFyYW0ge3Byb2Nlc3NPcHRpb25zfSBvcHRzIC0gb3B0aW9ucyBmcm9tIHRoZSB7QGxpbmsgUHJvY2Vzc29yI3Byb2Nlc3N9XG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIHtAbGluayBSb290I3RvUmVzdWx0fVxuICAgICAqL1xuICAgIGNvbnN0cnVjdG9yKHByb2Nlc3Nvciwgcm9vdCwgb3B0cykge1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7UHJvY2Vzc29yfSAtIFRoZSBQcm9jZXNzb3IgaW5zdGFuY2UgdXNlZFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgZm9yIHRoaXMgdHJhbnNmb3JtYXRpb24uXG4gICAgICAgICAqXG4gICAgICAgICAqIEBleGFtcGxlXG4gICAgICAgICAqIGZvciAoIGxldCBwbHVnaW4gb2YgcmVzdWx0LnByb2Nlc3Nvci5wbHVnaW5zKSB7XG4gICAgICAgICAqICAgaWYgKCBwbHVnaW4ucG9zdGNzc1BsdWdpbiA9PT0gJ3Bvc3Rjc3MtYmFkJyApIHtcbiAgICAgICAgICogICAgIHRocm93ICdwb3N0Y3NzLWdvb2QgaXMgaW5jb21wYXRpYmxlIHdpdGggcG9zdGNzcy1iYWQnO1xuICAgICAgICAgKiAgIH1cbiAgICAgICAgICogfSk7XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnByb2Nlc3NvciA9IHByb2Nlc3NvcjtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge01lc3NhZ2VbXX0gLSBDb250YWlucyBtZXNzYWdlcyBmcm9tIHBsdWdpbnNcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgIChlLmcuLCB3YXJuaW5ncyBvciBjdXN0b20gbWVzc2FnZXMpLlxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgRWFjaCBtZXNzYWdlIHNob3VsZCBoYXZlIHR5cGVcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgIGFuZCBwbHVnaW4gcHJvcGVydGllcy5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogcG9zdGNzcy5wbHVnaW4oJ3Bvc3Rjc3MtbWluLWJyb3dzZXInLCAoKSA9PiB7XG4gICAgICAgICAqICAgcmV0dXJuIChyb290LCByZXN1bHQpID0+IHtcbiAgICAgICAgICogICAgIHZhciBicm93c2VycyA9IGRldGVjdE1pbkJyb3dzZXJzQnlDYW5JVXNlKHJvb3QpO1xuICAgICAgICAgKiAgICAgcmVzdWx0Lm1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAgKiAgICAgICB0eXBlOiAgICAnbWluLWJyb3dzZXInLFxuICAgICAgICAgKiAgICAgICBwbHVnaW46ICAncG9zdGNzcy1taW4tYnJvd3NlcicsXG4gICAgICAgICAqICAgICAgIGJyb3dzZXJzOiBicm93c2Vyc1xuICAgICAgICAgKiAgICAgfSk7XG4gICAgICAgICAqICAgfTtcbiAgICAgICAgICogfSk7XG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLm1lc3NhZ2VzID0gW107XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtSb290fSAtIFJvb3Qgbm9kZSBhZnRlciBhbGwgdHJhbnNmb3JtYXRpb25zLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiByb290LnRvUmVzdWx0KCkucm9vdCA9PSByb290O1xuICAgICAgICAgKi9cbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge3Byb2Nlc3NPcHRpb25zfSAtIE9wdGlvbnMgZnJvbSB0aGUge0BsaW5rIFByb2Nlc3NvciNwcm9jZXNzfVxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvciB7QGxpbmsgUm9vdCN0b1Jlc3VsdH0gY2FsbFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IHByb2R1Y2VkIHRoaXMgUmVzdWx0IGluc3RhbmNlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiByb290LnRvUmVzdWx0KG9wdHMpLm9wdHMgPT0gb3B0cztcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMub3B0cyA9IG9wdHM7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gQSBDU1Mgc3RyaW5nIHJlcHJlc2VudGluZyBvZiB7QGxpbmsgUmVzdWx0I3Jvb3R9LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiBwb3N0Y3NzLnBhcnNlKCdhe30nKS50b1Jlc3VsdCgpLmNzcyAvLz0+IFwiYXt9XCJcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMuY3NzID0gdW5kZWZpbmVkO1xuICAgICAgICAvKipcbiAgICAgICAgICogQG1lbWJlciB7U291cmNlTWFwR2VuZXJhdG9yfSAtIEFuIGluc3RhbmNlIG9mIGBTb3VyY2VNYXBHZW5lcmF0b3JgXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcyBmcm9tIHRoZSBgc291cmNlLW1hcGAgbGlicmFyeSxcbiAgICAgICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlcHJlc2VudGluZyBjaGFuZ2VzXG4gICAgICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byB0aGUge0BsaW5rIFJlc3VsdCNyb290fSBpbnN0YW5jZS5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogcmVzdWx0Lm1hcC50b0pTT04oKSAvLz0+IHsgdmVyc2lvbjogMywgZmlsZTogJ2EuY3NzJywg4oCmIH1cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogaWYgKCByZXN1bHQubWFwICkge1xuICAgICAgICAgKiAgIGZzLndyaXRlRmlsZVN5bmMocmVzdWx0Lm9wdHMudG8gKyAnLm1hcCcsIHJlc3VsdC5tYXAudG9TdHJpbmcoKSk7XG4gICAgICAgICAqIH1cbiAgICAgICAgICovXG4gICAgICAgIHRoaXMubWFwID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgZm9yIEB7bGluayBSZXN1bHQjY3NzfSBjb250ZW50LlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByZXN1bHQgKyAnJyA9PT0gcmVzdWx0LmNzc1xuICAgICAqXG4gICAgICogQHJldHVybiB7c3RyaW5nfSBzdHJpbmcgcmVwcmVzZW50aW5nIG9mIHtAbGluayBSZXN1bHQjcm9vdH1cbiAgICAgKi9cbiAgICB0b1N0cmluZygpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY3NzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYW4gaW5zdGFuY2Ugb2Yge0BsaW5rIFdhcm5pbmd9IGFuZCBhZGRzIGl0XG4gICAgICogdG8ge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICAgICAgLSB3YXJuaW5nIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdICAgICAgLSB3YXJuaW5nIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge05vZGV9ICAgb3B0cy5ub2RlICAgLSBDU1Mgbm9kZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICAtIHdvcmQgaW4gQ1NTIHNvdXJjZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICAtIGluZGV4IGluIENTUyBub2RlIHN0cmluZyB0aGF0IGNhdXNlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMucGx1Z2luIC0gbmFtZSBvZiB0aGUgcGx1Z2luIHRoYXQgY3JlYXRlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgd2FybmluZy4ge0BsaW5rIFJlc3VsdCN3YXJufSBmaWxsc1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgcHJvcGVydHkgYXV0b21hdGljYWxseS5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1dhcm5pbmd9IGNyZWF0ZWQgd2FybmluZ1xuICAgICAqL1xuICAgIHdhcm4odGV4dCwgb3B0cyA9IHsgfSkge1xuICAgICAgICBpZiAoICFvcHRzLnBsdWdpbiApIHtcbiAgICAgICAgICAgIGlmICggdGhpcy5sYXN0UGx1Z2luICYmIHRoaXMubGFzdFBsdWdpbi5wb3N0Y3NzUGx1Z2luICkge1xuICAgICAgICAgICAgICAgIG9wdHMucGx1Z2luID0gdGhpcy5sYXN0UGx1Z2luLnBvc3Rjc3NQbHVnaW47XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgd2FybmluZyA9IG5ldyBXYXJuaW5nKHRleHQsIG9wdHMpO1xuICAgICAgICB0aGlzLm1lc3NhZ2VzLnB1c2god2FybmluZyk7XG5cbiAgICAgICAgcmV0dXJuIHdhcm5pbmc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3YXJuaW5ncyBmcm9tIHBsdWdpbnMuIEZpbHRlcnMge0BsaW5rIFdhcm5pbmd9IGluc3RhbmNlc1xuICAgICAqIGZyb20ge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJlc3VsdC53YXJuaW5ncygpLmZvckVhY2god2FybiA9PiB7XG4gICAgICogICBjb25zb2xlLndhcm4od2Fybi50b1N0cmluZygpKTtcbiAgICAgKiB9KTtcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1dhcm5pbmdbXX0gd2FybmluZ3MgZnJvbSBwbHVnaW5zXG4gICAgICovXG4gICAgd2FybmluZ3MoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2VzLmZpbHRlciggaSA9PiBpLnR5cGUgPT09ICd3YXJuaW5nJyApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFuIGFsaWFzIGZvciB0aGUge0BsaW5rIFJlc3VsdCNjc3N9IHByb3BlcnR5LlxuICAgICAqIFVzZSBpdCB3aXRoIHN5bnRheGVzIHRoYXQgZ2VuZXJhdGUgbm9uLUNTUyBvdXRwdXQuXG4gICAgICogQHR5cGUge3N0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcmVzdWx0LmNzcyA9PT0gcmVzdWx0LmNvbnRlbnQ7XG4gICAgICovXG4gICAgZ2V0IGNvbnRlbnQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNzcztcbiAgICB9XG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUmVzdWx0O1xuXG4vKipcbiAqIEB0eXBlZGVmICB7b2JqZWN0fSBNZXNzYWdlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdHlwZSAgIC0gbWVzc2FnZSB0eXBlXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcGx1Z2luIC0gc291cmNlIFBvc3RDU1MgcGx1Z2luIG5hbWVcbiAqL1xuIl19

}, function(modId) { var map = {"./warning":1625038544332}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544332, function(require, module, exports) {


exports.__esModule = true;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a plugin’s warning. It can be created using {@link Node#warn}.
 *
 * @example
 * if ( decl.important ) {
 *     decl.warn(result, 'Avoid !important', { word: '!important' });
 * }
 */
var Warning = function () {

  /**
   * @param {string} text        - warning message
   * @param {Object} [opts]      - warning options
   * @param {Node}   opts.node   - CSS node that caused the warning
   * @param {string} opts.word   - word in CSS source that caused the warning
   * @param {number} opts.index  - index in CSS node string that caused
   *                               the warning
   * @param {string} opts.plugin - name of the plugin that created
   *                               this warning. {@link Result#warn} fills
   *                               this property automatically.
   */
  function Warning(text) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Warning);

    /**
     * @member {string} - Type to filter warnings from
     *                    {@link Result#messages}. Always equal
     *                    to `"warning"`.
     *
     * @example
     * const nonWarning = result.messages.filter(i => i.type !== 'warning')
     */
    this.type = 'warning';
    /**
     * @member {string} - The warning message.
     *
     * @example
     * warning.text //=> 'Try to avoid !important'
     */
    this.text = text;

    if (opts.node && opts.node.source) {
      var pos = opts.node.positionBy(opts);
      /**
       * @member {number} - Line in the input file
       *                    with this warning’s source
       *
       * @example
       * warning.line //=> 5
       */
      this.line = pos.line;
      /**
       * @member {number} - Column in the input file
       *                    with this warning’s source.
       *
       * @example
       * warning.column //=> 6
       */
      this.column = pos.column;
    }

    for (var opt in opts) {
      this[opt] = opts[opt];
    }
  }

  /**
   * Returns a warning position and message.
   *
   * @example
   * warning.toString() //=> 'postcss-lint:a.css:10:14: Avoid !important'
   *
   * @return {string} warning position and message
   */


  Warning.prototype.toString = function toString() {
    if (this.node) {
      return this.node.error(this.text, {
        plugin: this.plugin,
        index: this.index,
        word: this.word
      }).message;
    } else if (this.plugin) {
      return this.plugin + ': ' + this.text;
    } else {
      return this.text;
    }
  };

  /**
   * @memberof Warning#
   * @member {string} plugin - The name of the plugin that created
   *                           it will fill this property automatically.
   *                           this warning. When you call {@link Node#warn}
   *
   * @example
   * warning.plugin //=> 'postcss-important'
   */

  /**
   * @memberof Warning#
   * @member {Node} node - Contains the CSS node that caused the warning.
   *
   * @example
   * warning.node.toString() //=> 'color: white !important'
   */

  return Warning;
}();

exports.default = Warning;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndhcm5pbmcuZXM2Il0sIm5hbWVzIjpbIldhcm5pbmciLCJ0ZXh0Iiwib3B0cyIsInR5cGUiLCJub2RlIiwic291cmNlIiwicG9zIiwicG9zaXRpb25CeSIsImxpbmUiLCJjb2x1bW4iLCJvcHQiLCJ0b1N0cmluZyIsImVycm9yIiwicGx1Z2luIiwiaW5kZXgiLCJ3b3JkIiwibWVzc2FnZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUE7Ozs7Ozs7O0lBUU1BLE87O0FBRUY7Ozs7Ozs7Ozs7O0FBV0EsbUJBQVlDLElBQVosRUFBOEI7QUFBQSxRQUFaQyxJQUFZLHVFQUFMLEVBQUs7O0FBQUE7O0FBQzFCOzs7Ozs7OztBQVFBLFNBQUtDLElBQUwsR0FBWSxTQUFaO0FBQ0E7Ozs7OztBQU1BLFNBQUtGLElBQUwsR0FBWUEsSUFBWjs7QUFFQSxRQUFLQyxLQUFLRSxJQUFMLElBQWFGLEtBQUtFLElBQUwsQ0FBVUMsTUFBNUIsRUFBcUM7QUFDakMsVUFBSUMsTUFBVUosS0FBS0UsSUFBTCxDQUFVRyxVQUFWLENBQXFCTCxJQUFyQixDQUFkO0FBQ0E7Ozs7Ozs7QUFPQSxXQUFLTSxJQUFMLEdBQWNGLElBQUlFLElBQWxCO0FBQ0E7Ozs7Ozs7QUFPQSxXQUFLQyxNQUFMLEdBQWNILElBQUlHLE1BQWxCO0FBQ0g7O0FBRUQsU0FBTSxJQUFJQyxHQUFWLElBQWlCUixJQUFqQjtBQUF3QixXQUFLUSxHQUFMLElBQVlSLEtBQUtRLEdBQUwsQ0FBWjtBQUF4QjtBQUNIOztBQUVEOzs7Ozs7Ozs7O29CQVFBQyxRLHVCQUFXO0FBQ1AsUUFBSyxLQUFLUCxJQUFWLEVBQWlCO0FBQ2IsYUFBTyxLQUFLQSxJQUFMLENBQVVRLEtBQVYsQ0FBZ0IsS0FBS1gsSUFBckIsRUFBMkI7QUFDOUJZLGdCQUFRLEtBQUtBLE1BRGlCO0FBRTlCQyxlQUFRLEtBQUtBLEtBRmlCO0FBRzlCQyxjQUFRLEtBQUtBO0FBSGlCLE9BQTNCLEVBSUpDLE9BSkg7QUFLSCxLQU5ELE1BTU8sSUFBSyxLQUFLSCxNQUFWLEVBQW1CO0FBQ3RCLGFBQU8sS0FBS0EsTUFBTCxHQUFjLElBQWQsR0FBcUIsS0FBS1osSUFBakM7QUFDSCxLQUZNLE1BRUE7QUFDSCxhQUFPLEtBQUtBLElBQVo7QUFDSDtBQUNKLEc7O0FBRUQ7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7Ozs7a0JBVVdELE8iLCJmaWxlIjoid2FybmluZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogUmVwcmVzZW50cyBhIHBsdWdpbuKAmXMgd2FybmluZy4gSXQgY2FuIGJlIGNyZWF0ZWQgdXNpbmcge0BsaW5rIE5vZGUjd2Fybn0uXG4gKlxuICogQGV4YW1wbGVcbiAqIGlmICggZGVjbC5pbXBvcnRhbnQgKSB7XG4gKiAgICAgZGVjbC53YXJuKHJlc3VsdCwgJ0F2b2lkICFpbXBvcnRhbnQnLCB7IHdvcmQ6ICchaW1wb3J0YW50JyB9KTtcbiAqIH1cbiAqL1xuY2xhc3MgV2FybmluZyB7XG5cbiAgICAvKipcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gdGV4dCAgICAgICAgLSB3YXJuaW5nIG1lc3NhZ2VcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gW29wdHNdICAgICAgLSB3YXJuaW5nIG9wdGlvbnNcbiAgICAgKiBAcGFyYW0ge05vZGV9ICAgb3B0cy5ub2RlICAgLSBDU1Mgbm9kZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLndvcmQgICAtIHdvcmQgaW4gQ1NTIHNvdXJjZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZ1xuICAgICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRzLmluZGV4ICAtIGluZGV4IGluIENTUyBub2RlIHN0cmluZyB0aGF0IGNhdXNlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoZSB3YXJuaW5nXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMucGx1Z2luIC0gbmFtZSBvZiB0aGUgcGx1Z2luIHRoYXQgY3JlYXRlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgd2FybmluZy4ge0BsaW5rIFJlc3VsdCN3YXJufSBmaWxsc1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMgcHJvcGVydHkgYXV0b21hdGljYWxseS5cbiAgICAgKi9cbiAgICBjb25zdHJ1Y3Rvcih0ZXh0LCBvcHRzID0geyB9KSB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IC0gVHlwZSB0byBmaWx0ZXIgd2FybmluZ3MgZnJvbVxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAge0BsaW5rIFJlc3VsdCNtZXNzYWdlc30uIEFsd2F5cyBlcXVhbFxuICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgdG8gYFwid2FybmluZ1wiYC5cbiAgICAgICAgICpcbiAgICAgICAgICogQGV4YW1wbGVcbiAgICAgICAgICogY29uc3Qgbm9uV2FybmluZyA9IHJlc3VsdC5tZXNzYWdlcy5maWx0ZXIoaSA9PiBpLnR5cGUgIT09ICd3YXJuaW5nJylcbiAgICAgICAgICovXG4gICAgICAgIHRoaXMudHlwZSA9ICd3YXJuaW5nJztcbiAgICAgICAgLyoqXG4gICAgICAgICAqIEBtZW1iZXIge3N0cmluZ30gLSBUaGUgd2FybmluZyBtZXNzYWdlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgKiB3YXJuaW5nLnRleHQgLy89PiAnVHJ5IHRvIGF2b2lkICFpbXBvcnRhbnQnXG4gICAgICAgICAqL1xuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xuXG4gICAgICAgIGlmICggb3B0cy5ub2RlICYmIG9wdHMubm9kZS5zb3VyY2UgKSB7XG4gICAgICAgICAgICBsZXQgcG9zICAgICA9IG9wdHMubm9kZS5wb3NpdGlvbkJ5KG9wdHMpO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gTGluZSBpbiB0aGUgaW5wdXQgZmlsZVxuICAgICAgICAgICAgICogICAgICAgICAgICAgICAgICAgIHdpdGggdGhpcyB3YXJuaW5n4oCZcyBzb3VyY2VcbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgICAgICogd2FybmluZy5saW5lIC8vPT4gNVxuICAgICAgICAgICAgICovXG4gICAgICAgICAgICB0aGlzLmxpbmUgICA9IHBvcy5saW5lO1xuICAgICAgICAgICAgLyoqXG4gICAgICAgICAgICAgKiBAbWVtYmVyIHtudW1iZXJ9IC0gQ29sdW1uIGluIHRoZSBpbnB1dCBmaWxlXG4gICAgICAgICAgICAgKiAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGlzIHdhcm5pbmfigJlzIHNvdXJjZS5cbiAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgKiBAZXhhbXBsZVxuICAgICAgICAgICAgICogd2FybmluZy5jb2x1bW4gLy89PiA2XG4gICAgICAgICAgICAgKi9cbiAgICAgICAgICAgIHRoaXMuY29sdW1uID0gcG9zLmNvbHVtbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZvciAoIGxldCBvcHQgaW4gb3B0cyApIHRoaXNbb3B0XSA9IG9wdHNbb3B0XTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgd2FybmluZyBwb3NpdGlvbiBhbmQgbWVzc2FnZS5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogd2FybmluZy50b1N0cmluZygpIC8vPT4gJ3Bvc3Rjc3MtbGludDphLmNzczoxMDoxNDogQXZvaWQgIWltcG9ydGFudCdcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gd2FybmluZyBwb3NpdGlvbiBhbmQgbWVzc2FnZVxuICAgICAqL1xuICAgIHRvU3RyaW5nKCkge1xuICAgICAgICBpZiAoIHRoaXMubm9kZSApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLm5vZGUuZXJyb3IodGhpcy50ZXh0LCB7XG4gICAgICAgICAgICAgICAgcGx1Z2luOiB0aGlzLnBsdWdpbixcbiAgICAgICAgICAgICAgICBpbmRleDogIHRoaXMuaW5kZXgsXG4gICAgICAgICAgICAgICAgd29yZDogICB0aGlzLndvcmRcbiAgICAgICAgICAgIH0pLm1lc3NhZ2U7XG4gICAgICAgIH0gZWxzZSBpZiAoIHRoaXMucGx1Z2luICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGx1Z2luICsgJzogJyArIHRoaXMudGV4dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRleHQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgV2FybmluZyNcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHBsdWdpbiAtIFRoZSBuYW1lIG9mIHRoZSBwbHVnaW4gdGhhdCBjcmVhdGVkXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBpdCB3aWxsIGZpbGwgdGhpcyBwcm9wZXJ0eSBhdXRvbWF0aWNhbGx5LlxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcyB3YXJuaW5nLiBXaGVuIHlvdSBjYWxsIHtAbGluayBOb2RlI3dhcm59XG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHdhcm5pbmcucGx1Z2luIC8vPT4gJ3Bvc3Rjc3MtaW1wb3J0YW50J1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIFdhcm5pbmcjXG4gICAgICogQG1lbWJlciB7Tm9kZX0gbm9kZSAtIENvbnRhaW5zIHRoZSBDU1Mgbm9kZSB0aGF0IGNhdXNlZCB0aGUgd2FybmluZy5cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogd2FybmluZy5ub2RlLnRvU3RyaW5nKCkgLy89PiAnY29sb3I6IHdoaXRlICFpbXBvcnRhbnQnXG4gICAgICovXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgV2FybmluZztcbiJdfQ==

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544333, function(require, module, exports) {


exports.__esModule = true;
exports.default = parse;

var _parser = require('./parser');

var _parser2 = _interopRequireDefault(_parser);

var _input = require('./input');

var _input2 = _interopRequireDefault(_input);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parse(css, opts) {
    if (opts && opts.safe) {
        throw new Error('Option safe was removed. ' + 'Use parser: require("postcss-safe-parser")');
    }

    var input = new _input2.default(css, opts);
    var parser = new _parser2.default(input);
    try {
        parser.parse();
    } catch (e) {
        if (e.name === 'CssSyntaxError' && opts && opts.from) {
            if (/\.scss$/i.test(opts.from)) {
                e.message += '\nYou tried to parse SCSS with ' + 'the standard CSS parser; ' + 'try again with the postcss-scss parser';
            } else if (/\.sass/i.test(opts.from)) {
                e.message += '\nYou tried to parse Sass with ' + 'the standard CSS parser; ' + 'try again with the postcss-sass parser';
            } else if (/\.less$/i.test(opts.from)) {
                e.message += '\nYou tried to parse Less with ' + 'the standard CSS parser; ' + 'try again with the postcss-less parser';
            }
        }
        throw e;
    }

    return parser.root;
}
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlLmVzNiJdLCJuYW1lcyI6WyJwYXJzZSIsImNzcyIsIm9wdHMiLCJzYWZlIiwiRXJyb3IiLCJpbnB1dCIsIklucHV0IiwicGFyc2VyIiwiUGFyc2VyIiwiZSIsIm5hbWUiLCJmcm9tIiwidGVzdCIsIm1lc3NhZ2UiLCJyb290Il0sIm1hcHBpbmdzIjoiOzs7a0JBR3dCQSxLOztBQUh4Qjs7OztBQUNBOzs7Ozs7QUFFZSxTQUFTQSxLQUFULENBQWVDLEdBQWYsRUFBb0JDLElBQXBCLEVBQTBCO0FBQ3JDLFFBQUtBLFFBQVFBLEtBQUtDLElBQWxCLEVBQXlCO0FBQ3JCLGNBQU0sSUFBSUMsS0FBSixDQUFVLDhCQUNBLDRDQURWLENBQU47QUFFSDs7QUFFRCxRQUFJQyxRQUFRLElBQUlDLGVBQUosQ0FBVUwsR0FBVixFQUFlQyxJQUFmLENBQVo7QUFDQSxRQUFJSyxTQUFTLElBQUlDLGdCQUFKLENBQVdILEtBQVgsQ0FBYjtBQUNBLFFBQUk7QUFDQUUsZUFBT1AsS0FBUDtBQUNILEtBRkQsQ0FFRSxPQUFPUyxDQUFQLEVBQVU7QUFDUixZQUFLQSxFQUFFQyxJQUFGLEtBQVcsZ0JBQVgsSUFBK0JSLElBQS9CLElBQXVDQSxLQUFLUyxJQUFqRCxFQUF3RDtBQUNwRCxnQkFBSyxXQUFXQyxJQUFYLENBQWdCVixLQUFLUyxJQUFyQixDQUFMLEVBQWtDO0FBQzlCRixrQkFBRUksT0FBRixJQUFhLG9DQUNBLDJCQURBLEdBRUEsd0NBRmI7QUFHSCxhQUpELE1BSU8sSUFBSyxVQUFVRCxJQUFWLENBQWVWLEtBQUtTLElBQXBCLENBQUwsRUFBaUM7QUFDcENGLGtCQUFFSSxPQUFGLElBQWEsb0NBQ0EsMkJBREEsR0FFQSx3Q0FGYjtBQUdILGFBSk0sTUFJQSxJQUFLLFdBQVdELElBQVgsQ0FBZ0JWLEtBQUtTLElBQXJCLENBQUwsRUFBa0M7QUFDckNGLGtCQUFFSSxPQUFGLElBQWEsb0NBQ0EsMkJBREEsR0FFQSx3Q0FGYjtBQUdIO0FBQ0o7QUFDRCxjQUFNSixDQUFOO0FBQ0g7O0FBRUQsV0FBT0YsT0FBT08sSUFBZDtBQUNIIiwiZmlsZSI6InBhcnNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFBhcnNlciBmcm9tICcuL3BhcnNlcic7XG5pbXBvcnQgSW5wdXQgIGZyb20gJy4vaW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBwYXJzZShjc3MsIG9wdHMpIHtcbiAgICBpZiAoIG9wdHMgJiYgb3B0cy5zYWZlICkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ09wdGlvbiBzYWZlIHdhcyByZW1vdmVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICdVc2UgcGFyc2VyOiByZXF1aXJlKFwicG9zdGNzcy1zYWZlLXBhcnNlclwiKScpO1xuICAgIH1cblxuICAgIGxldCBpbnB1dCA9IG5ldyBJbnB1dChjc3MsIG9wdHMpO1xuICAgIGxldCBwYXJzZXIgPSBuZXcgUGFyc2VyKGlucHV0KTtcbiAgICB0cnkge1xuICAgICAgICBwYXJzZXIucGFyc2UoKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICggZS5uYW1lID09PSAnQ3NzU3ludGF4RXJyb3InICYmIG9wdHMgJiYgb3B0cy5mcm9tICkge1xuICAgICAgICAgICAgaWYgKCAvXFwuc2NzcyQvaS50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU0NTUyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2NzcyBwYXJzZXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggL1xcLnNhc3MvaS50ZXN0KG9wdHMuZnJvbSkgKSB7XG4gICAgICAgICAgICAgICAgZS5tZXNzYWdlICs9ICdcXG5Zb3UgdHJpZWQgdG8gcGFyc2UgU2FzcyB3aXRoICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndGhlIHN0YW5kYXJkIENTUyBwYXJzZXI7ICcgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAndHJ5IGFnYWluIHdpdGggdGhlIHBvc3Rjc3Mtc2FzcyBwYXJzZXInO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggL1xcLmxlc3MkL2kudGVzdChvcHRzLmZyb20pICkge1xuICAgICAgICAgICAgICAgIGUubWVzc2FnZSArPSAnXFxuWW91IHRyaWVkIHRvIHBhcnNlIExlc3Mgd2l0aCAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RoZSBzdGFuZGFyZCBDU1MgcGFyc2VyOyAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3RyeSBhZ2FpbiB3aXRoIHRoZSBwb3N0Y3NzLWxlc3MgcGFyc2VyJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgIH1cblxuICAgIHJldHVybiBwYXJzZXIucm9vdDtcbn1cbiJdfQ==

}, function(modId) { var map = {"./parser":1625038544334,"./input":1625038544323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544334, function(require, module, exports) {


exports.__esModule = true;

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _tokenize = require('./tokenize');

var _tokenize2 = _interopRequireDefault(_tokenize);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _atRule = require('./at-rule');

var _atRule2 = _interopRequireDefault(_atRule);

var _root = require('./root');

var _root2 = _interopRequireDefault(_root);

var _rule = require('./rule');

var _rule2 = _interopRequireDefault(_rule);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Parser = function () {
    function Parser(input) {
        _classCallCheck(this, Parser);

        this.input = input;

        this.root = new _root2.default();
        this.current = this.root;
        this.spaces = '';
        this.semicolon = false;

        this.createTokenizer();
        this.root.source = { input: input, start: { line: 1, column: 1 } };
    }

    Parser.prototype.createTokenizer = function createTokenizer() {
        this.tokenizer = (0, _tokenize2.default)(this.input);
    };

    Parser.prototype.parse = function parse() {
        var token = void 0;
        while (!this.tokenizer.endOfFile()) {
            token = this.tokenizer.nextToken();

            switch (token[0]) {

                case 'space':
                    this.spaces += token[1];
                    break;

                case ';':
                    this.freeSemicolon(token);
                    break;

                case '}':
                    this.end(token);
                    break;

                case 'comment':
                    this.comment(token);
                    break;

                case 'at-word':
                    this.atrule(token);
                    break;

                case '{':
                    this.emptyRule(token);
                    break;

                default:
                    this.other(token);
                    break;
            }
        }
        this.endFile();
    };

    Parser.prototype.comment = function comment(token) {
        var node = new _comment2.default();
        this.init(node, token[2], token[3]);
        node.source.end = { line: token[4], column: token[5] };

        var text = token[1].slice(2, -2);
        if (/^\s*$/.test(text)) {
            node.text = '';
            node.raws.left = text;
            node.raws.right = '';
        } else {
            var match = text.match(/^(\s*)([^]*[^\s])(\s*)$/);
            node.text = match[2];
            node.raws.left = match[1];
            node.raws.right = match[3];
        }
    };

    Parser.prototype.emptyRule = function emptyRule(token) {
        var node = new _rule2.default();
        this.init(node, token[2], token[3]);
        node.selector = '';
        node.raws.between = '';
        this.current = node;
    };

    Parser.prototype.other = function other(start) {
        var end = false;
        var type = null;
        var colon = false;
        var bracket = null;
        var brackets = [];

        var tokens = [];
        var token = start;
        while (token) {
            type = token[0];
            tokens.push(token);

            if (type === '(' || type === '[') {
                if (!bracket) bracket = token;
                brackets.push(type === '(' ? ')' : ']');
            } else if (brackets.length === 0) {
                if (type === ';') {
                    if (colon) {
                        this.decl(tokens);
                        return;
                    } else {
                        break;
                    }
                } else if (type === '{') {
                    this.rule(tokens);
                    return;
                } else if (type === '}') {
                    this.tokenizer.back(tokens.pop());
                    end = true;
                    break;
                } else if (type === ':') {
                    colon = true;
                }
            } else if (type === brackets[brackets.length - 1]) {
                brackets.pop();
                if (brackets.length === 0) bracket = null;
            }

            token = this.tokenizer.nextToken();
        }

        if (this.tokenizer.endOfFile()) end = true;
        if (brackets.length > 0) this.unclosedBracket(bracket);

        if (end && colon) {
            while (tokens.length) {
                token = tokens[tokens.length - 1][0];
                if (token !== 'space' && token !== 'comment') break;
                this.tokenizer.back(tokens.pop());
            }
            this.decl(tokens);
            return;
        } else {
            this.unknownWord(tokens);
        }
    };

    Parser.prototype.rule = function rule(tokens) {
        tokens.pop();

        var node = new _rule2.default();
        this.init(node, tokens[0][2], tokens[0][3]);

        node.raws.between = this.spacesAndCommentsFromEnd(tokens);
        this.raw(node, 'selector', tokens);
        this.current = node;
    };

    Parser.prototype.decl = function decl(tokens) {
        var node = new _declaration2.default();
        this.init(node);

        var last = tokens[tokens.length - 1];
        if (last[0] === ';') {
            this.semicolon = true;
            tokens.pop();
        }
        if (last[4]) {
            node.source.end = { line: last[4], column: last[5] };
        } else {
            node.source.end = { line: last[2], column: last[3] };
        }

        while (tokens[0][0] !== 'word') {
            if (tokens.length === 1) this.unknownWord(tokens);
            node.raws.before += tokens.shift()[1];
        }
        node.source.start = { line: tokens[0][2], column: tokens[0][3] };

        node.prop = '';
        while (tokens.length) {
            var type = tokens[0][0];
            if (type === ':' || type === 'space' || type === 'comment') {
                break;
            }
            node.prop += tokens.shift()[1];
        }

        node.raws.between = '';

        var token = void 0;
        while (tokens.length) {
            token = tokens.shift();

            if (token[0] === ':') {
                node.raws.between += token[1];
                break;
            } else {
                node.raws.between += token[1];
            }
        }

        if (node.prop[0] === '_' || node.prop[0] === '*') {
            node.raws.before += node.prop[0];
            node.prop = node.prop.slice(1);
        }
        node.raws.between += this.spacesAndCommentsFromStart(tokens);
        this.precheckMissedSemicolon(tokens);

        for (var i = tokens.length - 1; i > 0; i--) {
            token = tokens[i];
            if (token[1].toLowerCase() === '!important') {
                node.important = true;
                var string = this.stringFrom(tokens, i);
                string = this.spacesFromEnd(tokens) + string;
                if (string !== ' !important') node.raws.important = string;
                break;
            } else if (token[1].toLowerCase() === 'important') {
                var cache = tokens.slice(0);
                var str = '';
                for (var j = i; j > 0; j--) {
                    var _type = cache[j][0];
                    if (str.trim().indexOf('!') === 0 && _type !== 'space') {
                        break;
                    }
                    str = cache.pop()[1] + str;
                }
                if (str.trim().indexOf('!') === 0) {
                    node.important = true;
                    node.raws.important = str;
                    tokens = cache;
                }
            }

            if (token[0] !== 'space' && token[0] !== 'comment') {
                break;
            }
        }

        this.raw(node, 'value', tokens);

        if (node.value.indexOf(':') !== -1) this.checkMissedSemicolon(tokens);
    };

    Parser.prototype.atrule = function atrule(token) {
        var node = new _atRule2.default();
        node.name = token[1].slice(1);
        if (node.name === '') {
            this.unnamedAtrule(node, token);
        }
        this.init(node, token[2], token[3]);

        var prev = void 0;
        var shift = void 0;
        var last = false;
        var open = false;
        var params = [];

        while (!this.tokenizer.endOfFile()) {
            token = this.tokenizer.nextToken();

            if (token[0] === ';') {
                node.source.end = { line: token[2], column: token[3] };
                this.semicolon = true;
                break;
            } else if (token[0] === '{') {
                open = true;
                break;
            } else if (token[0] === '}') {
                if (params.length > 0) {
                    shift = params.length - 1;
                    prev = params[shift];
                    while (prev && prev[0] === 'space') {
                        prev = params[--shift];
                    }
                    if (prev) {
                        node.source.end = { line: prev[4], column: prev[5] };
                    }
                }
                this.end(token);
                break;
            } else {
                params.push(token);
            }

            if (this.tokenizer.endOfFile()) {
                last = true;
                break;
            }
        }

        node.raws.between = this.spacesAndCommentsFromEnd(params);
        if (params.length) {
            node.raws.afterName = this.spacesAndCommentsFromStart(params);
            this.raw(node, 'params', params);
            if (last) {
                token = params[params.length - 1];
                node.source.end = { line: token[4], column: token[5] };
                this.spaces = node.raws.between;
                node.raws.between = '';
            }
        } else {
            node.raws.afterName = '';
            node.params = '';
        }

        if (open) {
            node.nodes = [];
            this.current = node;
        }
    };

    Parser.prototype.end = function end(token) {
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.semicolon = false;

        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
        this.spaces = '';

        if (this.current.parent) {
            this.current.source.end = { line: token[2], column: token[3] };
            this.current = this.current.parent;
        } else {
            this.unexpectedClose(token);
        }
    };

    Parser.prototype.endFile = function endFile() {
        if (this.current.parent) this.unclosedBlock();
        if (this.current.nodes && this.current.nodes.length) {
            this.current.raws.semicolon = this.semicolon;
        }
        this.current.raws.after = (this.current.raws.after || '') + this.spaces;
    };

    Parser.prototype.freeSemicolon = function freeSemicolon(token) {
        this.spaces += token[1];
        if (this.current.nodes) {
            var prev = this.current.nodes[this.current.nodes.length - 1];
            if (prev && prev.type === 'rule' && !prev.raws.ownSemicolon) {
                prev.raws.ownSemicolon = this.spaces;
                this.spaces = '';
            }
        }
    };

    // Helpers

    Parser.prototype.init = function init(node, line, column) {
        this.current.push(node);

        node.source = { start: { line: line, column: column }, input: this.input };
        node.raws.before = this.spaces;
        this.spaces = '';
        if (node.type !== 'comment') this.semicolon = false;
    };

    Parser.prototype.raw = function raw(node, prop, tokens) {
        var token = void 0,
            type = void 0;
        var length = tokens.length;
        var value = '';
        var clean = true;
        var next = void 0,
            prev = void 0;
        var pattern = /^([.|#])?([\w])+/i;

        for (var i = 0; i < length; i += 1) {
            token = tokens[i];
            type = token[0];

            if (type === 'comment' && node.type === 'rule') {
                prev = tokens[i - 1];
                next = tokens[i + 1];

                if (prev[0] !== 'space' && next[0] !== 'space' && pattern.test(prev[1]) && pattern.test(next[1])) {
                    value += token[1];
                } else {
                    clean = false;
                }

                continue;
            }

            if (type === 'comment' || type === 'space' && i === length - 1) {
                clean = false;
            } else {
                value += token[1];
            }
        }
        if (!clean) {
            var raw = tokens.reduce(function (all, i) {
                return all + i[1];
            }, '');
            node.raws[prop] = { value: value, raw: raw };
        }
        node[prop] = value;
    };

    Parser.prototype.spacesAndCommentsFromEnd = function spacesAndCommentsFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space' && lastTokenType !== 'comment') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.spacesAndCommentsFromStart = function spacesAndCommentsFromStart(tokens) {
        var next = void 0;
        var spaces = '';
        while (tokens.length) {
            next = tokens[0][0];
            if (next !== 'space' && next !== 'comment') break;
            spaces += tokens.shift()[1];
        }
        return spaces;
    };

    Parser.prototype.spacesFromEnd = function spacesFromEnd(tokens) {
        var lastTokenType = void 0;
        var spaces = '';
        while (tokens.length) {
            lastTokenType = tokens[tokens.length - 1][0];
            if (lastTokenType !== 'space') break;
            spaces = tokens.pop()[1] + spaces;
        }
        return spaces;
    };

    Parser.prototype.stringFrom = function stringFrom(tokens, from) {
        var result = '';
        for (var i = from; i < tokens.length; i++) {
            result += tokens[i][1];
        }
        tokens.splice(from, tokens.length - from);
        return result;
    };

    Parser.prototype.colon = function colon(tokens) {
        var brackets = 0;
        var token = void 0,
            type = void 0,
            prev = void 0;
        for (var i = 0; i < tokens.length; i++) {
            token = tokens[i];
            type = token[0];

            if (type === '(') {
                brackets += 1;
            } else if (type === ')') {
                brackets -= 1;
            } else if (brackets === 0 && type === ':') {
                if (!prev) {
                    this.doubleColon(token);
                } else if (prev[0] === 'word' && prev[1] === 'progid') {
                    continue;
                } else {
                    return i;
                }
            }

            prev = token;
        }
        return false;
    };

    // Errors

    Parser.prototype.unclosedBracket = function unclosedBracket(bracket) {
        throw this.input.error('Unclosed bracket', bracket[2], bracket[3]);
    };

    Parser.prototype.unknownWord = function unknownWord(tokens) {
        throw this.input.error('Unknown word', tokens[0][2], tokens[0][3]);
    };

    Parser.prototype.unexpectedClose = function unexpectedClose(token) {
        throw this.input.error('Unexpected }', token[2], token[3]);
    };

    Parser.prototype.unclosedBlock = function unclosedBlock() {
        var pos = this.current.source.start;
        throw this.input.error('Unclosed block', pos.line, pos.column);
    };

    Parser.prototype.doubleColon = function doubleColon(token) {
        throw this.input.error('Double colon', token[2], token[3]);
    };

    Parser.prototype.unnamedAtrule = function unnamedAtrule(node, token) {
        throw this.input.error('At-rule without name', token[2], token[3]);
    };

    Parser.prototype.precheckMissedSemicolon = function precheckMissedSemicolon(tokens) {
        // Hook for Safe Parser
        tokens;
    };

    Parser.prototype.checkMissedSemicolon = function checkMissedSemicolon(tokens) {
        var colon = this.colon(tokens);
        if (colon === false) return;

        var founded = 0;
        var token = void 0;
        for (var j = colon - 1; j >= 0; j--) {
            token = tokens[j];
            if (token[0] !== 'space') {
                founded += 1;
                if (founded === 2) break;
            }
        }
        throw this.input.error('Missed semicolon', token[2], token[3]);
    };

    return Parser;
}();

exports.default = Parser;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInBhcnNlci5lczYiXSwibmFtZXMiOlsiUGFyc2VyIiwiaW5wdXQiLCJyb290IiwiUm9vdCIsImN1cnJlbnQiLCJzcGFjZXMiLCJzZW1pY29sb24iLCJjcmVhdGVUb2tlbml6ZXIiLCJzb3VyY2UiLCJzdGFydCIsImxpbmUiLCJjb2x1bW4iLCJ0b2tlbml6ZXIiLCJwYXJzZSIsInRva2VuIiwiZW5kT2ZGaWxlIiwibmV4dFRva2VuIiwiZnJlZVNlbWljb2xvbiIsImVuZCIsImNvbW1lbnQiLCJhdHJ1bGUiLCJlbXB0eVJ1bGUiLCJvdGhlciIsImVuZEZpbGUiLCJub2RlIiwiQ29tbWVudCIsImluaXQiLCJ0ZXh0Iiwic2xpY2UiLCJ0ZXN0IiwicmF3cyIsImxlZnQiLCJyaWdodCIsIm1hdGNoIiwiUnVsZSIsInNlbGVjdG9yIiwiYmV0d2VlbiIsInR5cGUiLCJjb2xvbiIsImJyYWNrZXQiLCJicmFja2V0cyIsInRva2VucyIsInB1c2giLCJsZW5ndGgiLCJkZWNsIiwicnVsZSIsImJhY2siLCJwb3AiLCJ1bmNsb3NlZEJyYWNrZXQiLCJ1bmtub3duV29yZCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbUVuZCIsInJhdyIsIkRlY2xhcmF0aW9uIiwibGFzdCIsImJlZm9yZSIsInNoaWZ0IiwicHJvcCIsInNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0IiwicHJlY2hlY2tNaXNzZWRTZW1pY29sb24iLCJpIiwidG9Mb3dlckNhc2UiLCJpbXBvcnRhbnQiLCJzdHJpbmciLCJzdHJpbmdGcm9tIiwic3BhY2VzRnJvbUVuZCIsImNhY2hlIiwic3RyIiwiaiIsInRyaW0iLCJpbmRleE9mIiwidmFsdWUiLCJjaGVja01pc3NlZFNlbWljb2xvbiIsIkF0UnVsZSIsIm5hbWUiLCJ1bm5hbWVkQXRydWxlIiwicHJldiIsIm9wZW4iLCJwYXJhbXMiLCJhZnRlck5hbWUiLCJub2RlcyIsImFmdGVyIiwicGFyZW50IiwidW5leHBlY3RlZENsb3NlIiwidW5jbG9zZWRCbG9jayIsIm93blNlbWljb2xvbiIsImNsZWFuIiwibmV4dCIsInBhdHRlcm4iLCJyZWR1Y2UiLCJhbGwiLCJsYXN0VG9rZW5UeXBlIiwiZnJvbSIsInJlc3VsdCIsInNwbGljZSIsImRvdWJsZUNvbG9uIiwiZXJyb3IiLCJwb3MiLCJmb3VuZGVkIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7OztJQUVxQkEsTTtBQUVqQixvQkFBWUMsS0FBWixFQUFtQjtBQUFBOztBQUNmLGFBQUtBLEtBQUwsR0FBYUEsS0FBYjs7QUFFQSxhQUFLQyxJQUFMLEdBQWlCLElBQUlDLGNBQUosRUFBakI7QUFDQSxhQUFLQyxPQUFMLEdBQWlCLEtBQUtGLElBQXRCO0FBQ0EsYUFBS0csTUFBTCxHQUFpQixFQUFqQjtBQUNBLGFBQUtDLFNBQUwsR0FBaUIsS0FBakI7O0FBRUEsYUFBS0MsZUFBTDtBQUNBLGFBQUtMLElBQUwsQ0FBVU0sTUFBVixHQUFtQixFQUFFUCxZQUFGLEVBQVNRLE9BQU8sRUFBRUMsTUFBTSxDQUFSLEVBQVdDLFFBQVEsQ0FBbkIsRUFBaEIsRUFBbkI7QUFDSDs7cUJBRURKLGUsOEJBQWtCO0FBQ2QsYUFBS0ssU0FBTCxHQUFpQix3QkFBVSxLQUFLWCxLQUFmLENBQWpCO0FBQ0gsSzs7cUJBRURZLEssb0JBQVE7QUFDSixZQUFJQyxjQUFKO0FBQ0EsZUFBUSxDQUFDLEtBQUtGLFNBQUwsQ0FBZUcsU0FBZixFQUFULEVBQXNDO0FBQ2xDRCxvQkFBUSxLQUFLRixTQUFMLENBQWVJLFNBQWYsRUFBUjs7QUFFQSxvQkFBU0YsTUFBTSxDQUFOLENBQVQ7O0FBRUEscUJBQUssT0FBTDtBQUNJLHlCQUFLVCxNQUFMLElBQWVTLE1BQU0sQ0FBTixDQUFmO0FBQ0E7O0FBRUoscUJBQUssR0FBTDtBQUNJLHlCQUFLRyxhQUFMLENBQW1CSCxLQUFuQjtBQUNBOztBQUVKLHFCQUFLLEdBQUw7QUFDSSx5QkFBS0ksR0FBTCxDQUFTSixLQUFUO0FBQ0E7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QUFqQixFQUFxQ2pGLE1BQU0sQ0FBTixDQUFyQyxFQUErQ0EsTUFBTSxDQUFOLENBQS9DLENBQU47QUFDSCxLOzs7OztrQkFyZ0JnQmQsTSIsImZpbGUiOiJwYXJzZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjbGFyYXRpb24gZnJvbSAnLi9kZWNsYXJhdGlvbic7XG5pbXBvcnQgdG9rZW5pemVyICAgZnJvbSAnLi90b2tlbml6ZSc7XG5pbXBvcnQgQ29tbWVudCAgICAgZnJvbSAnLi9jb21tZW50JztcbmltcG9ydCBBdFJ1bGUgICAgICBmcm9tICcuL2F0LXJ1bGUnO1xuaW1wb3J0IFJvb3QgICAgICAgIGZyb20gJy4vcm9vdCc7XG5pbXBvcnQgUnVsZSAgICAgICAgZnJvbSAnLi9ydWxlJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGFyc2VyIHtcblxuICAgIGNvbnN0cnVjdG9yKGlucHV0KSB7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dDtcblxuICAgICAgICB0aGlzLnJvb3QgICAgICA9IG5ldyBSb290KCk7XG4gICAgICAgIHRoaXMuY3VycmVudCAgID0gdGhpcy5yb290O1xuICAgICAgICB0aGlzLnNwYWNlcyAgICA9ICcnO1xuICAgICAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlVG9rZW5pemVyKCk7XG4gICAgICAgIHRoaXMucm9vdC5zb3VyY2UgPSB7IGlucHV0LCBzdGFydDogeyBsaW5lOiAxLCBjb2x1bW46IDEgfSB9O1xuICAgIH1cblxuICAgIGNyZWF0ZVRva2VuaXplcigpIHtcbiAgICAgICAgdGhpcy50b2tlbml6ZXIgPSB0b2tlbml6ZXIodGhpcy5pbnB1dCk7XG4gICAgfVxuXG4gICAgcGFyc2UoKSB7XG4gICAgICAgIGxldCB0b2tlbjtcbiAgICAgICAgd2hpbGUgKCAhdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkgKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRoaXMudG9rZW5pemVyLm5leHRUb2tlbigpO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKCB0b2tlblswXSApIHtcblxuICAgICAgICAgICAgY2FzZSAnc3BhY2UnOlxuICAgICAgICAgICAgICAgIHRoaXMuc3BhY2VzICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICc7JzpcbiAgICAgICAgICAgICAgICB0aGlzLmZyZWVTZW1pY29sb24odG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd9JzpcbiAgICAgICAgICAgICAgICB0aGlzLmVuZCh0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2NvbW1lbnQnOlxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudCh0b2tlbik7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ2F0LXdvcmQnOlxuICAgICAgICAgICAgICAgIHRoaXMuYXRydWxlKHRva2VuKTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAneyc6XG4gICAgICAgICAgICAgICAgdGhpcy5lbXB0eVJ1bGUodG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHRoaXMub3RoZXIodG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuZW5kRmlsZSgpO1xuICAgIH1cblxuICAgIGNvbW1lbnQodG9rZW4pIHtcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgQ29tbWVudCgpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlbls0XSwgY29sdW1uOiB0b2tlbls1XSB9O1xuXG4gICAgICAgIGxldCB0ZXh0ID0gdG9rZW5bMV0uc2xpY2UoMiwgLTIpO1xuICAgICAgICBpZiAoIC9eXFxzKiQvLnRlc3QodGV4dCkgKSB7XG4gICAgICAgICAgICBub2RlLnRleHQgICAgICAgPSAnJztcbiAgICAgICAgICAgIG5vZGUucmF3cy5sZWZ0ICA9IHRleHQ7XG4gICAgICAgICAgICBub2RlLnJhd3MucmlnaHQgPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxldCBtYXRjaCA9IHRleHQubWF0Y2goL14oXFxzKikoW15dKlteXFxzXSkoXFxzKikkLyk7XG4gICAgICAgICAgICBub2RlLnRleHQgICAgICAgPSBtYXRjaFsyXTtcbiAgICAgICAgICAgIG5vZGUucmF3cy5sZWZ0ICA9IG1hdGNoWzFdO1xuICAgICAgICAgICAgbm9kZS5yYXdzLnJpZ2h0ID0gbWF0Y2hbM107XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlbXB0eVJ1bGUodG9rZW4pIHtcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgUnVsZSgpO1xuICAgICAgICB0aGlzLmluaXQobm9kZSwgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICAgICAgbm9kZS5zZWxlY3RvciA9ICcnO1xuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnO1xuICAgICAgICB0aGlzLmN1cnJlbnQgPSBub2RlO1xuICAgIH1cblxuICAgIG90aGVyKHN0YXJ0KSB7XG4gICAgICAgIGxldCBlbmQgICAgICA9IGZhbHNlO1xuICAgICAgICBsZXQgdHlwZSAgICAgPSBudWxsO1xuICAgICAgICBsZXQgY29sb24gICAgPSBmYWxzZTtcbiAgICAgICAgbGV0IGJyYWNrZXQgID0gbnVsbDtcbiAgICAgICAgbGV0IGJyYWNrZXRzID0gW107XG5cbiAgICAgICAgbGV0IHRva2VucyA9IFtdO1xuICAgICAgICBsZXQgdG9rZW4gPSBzdGFydDtcbiAgICAgICAgd2hpbGUgKCB0b2tlbiApIHtcbiAgICAgICAgICAgIHR5cGUgPSB0b2tlblswXTtcbiAgICAgICAgICAgIHRva2Vucy5wdXNoKHRva2VuKTtcblxuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnKCcgfHwgdHlwZSA9PT0gJ1snICkge1xuICAgICAgICAgICAgICAgIGlmICggIWJyYWNrZXQgKSBicmFja2V0ID0gdG9rZW47XG4gICAgICAgICAgICAgICAgYnJhY2tldHMucHVzaCh0eXBlID09PSAnKCcgPyAnKScgOiAnXScpO1xuXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBicmFja2V0cy5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnOycgKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICggY29sb24gKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmRlY2wodG9rZW5zKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAneycgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucnVsZSh0b2tlbnMpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnfScgKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKTtcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnOicgKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbG9uID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09IGJyYWNrZXRzW2JyYWNrZXRzLmxlbmd0aCAtIDFdICkge1xuICAgICAgICAgICAgICAgIGJyYWNrZXRzLnBvcCgpO1xuICAgICAgICAgICAgICAgIGlmICggYnJhY2tldHMubGVuZ3RoID09PSAwICkgYnJhY2tldCA9IG51bGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIHRoaXMudG9rZW5pemVyLmVuZE9mRmlsZSgpICkgZW5kID0gdHJ1ZTtcbiAgICAgICAgaWYgKCBicmFja2V0cy5sZW5ndGggPiAwICkgdGhpcy51bmNsb3NlZEJyYWNrZXQoYnJhY2tldCk7XG5cbiAgICAgICAgaWYgKCBlbmQgJiYgY29sb24gKSB7XG4gICAgICAgICAgICB3aGlsZSAoIHRva2Vucy5sZW5ndGggKSB7XG4gICAgICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICAgICAgICAgIGlmICggdG9rZW4gIT09ICdzcGFjZScgJiYgdG9rZW4gIT09ICdjb21tZW50JyApIGJyZWFrO1xuICAgICAgICAgICAgICAgIHRoaXMudG9rZW5pemVyLmJhY2sodG9rZW5zLnBvcCgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuZGVjbCh0b2tlbnMpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy51bmtub3duV29yZCh0b2tlbnMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcnVsZSh0b2tlbnMpIHtcbiAgICAgICAgdG9rZW5zLnBvcCgpO1xuXG4gICAgICAgIGxldCBub2RlID0gbmV3IFJ1bGUoKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHRva2Vuc1swXVsyXSwgdG9rZW5zWzBdWzNdKTtcblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHRva2Vucyk7XG4gICAgICAgIHRoaXMucmF3KG5vZGUsICdzZWxlY3RvcicsIHRva2Vucyk7XG4gICAgICAgIHRoaXMuY3VycmVudCA9IG5vZGU7XG4gICAgfVxuXG4gICAgZGVjbCh0b2tlbnMpIHtcbiAgICAgICAgbGV0IG5vZGUgPSBuZXcgRGVjbGFyYXRpb24oKTtcbiAgICAgICAgdGhpcy5pbml0KG5vZGUpO1xuXG4gICAgICAgIGxldCBsYXN0ID0gdG9rZW5zW3Rva2Vucy5sZW5ndGggLSAxXTtcbiAgICAgICAgaWYgKCBsYXN0WzBdID09PSAnOycgKSB7XG4gICAgICAgICAgICB0aGlzLnNlbWljb2xvbiA9IHRydWU7XG4gICAgICAgICAgICB0b2tlbnMucG9wKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCBsYXN0WzRdICkge1xuICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kID0geyBsaW5lOiBsYXN0WzRdLCBjb2x1bW46IGxhc3RbNV0gfTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogbGFzdFsyXSwgY29sdW1uOiBsYXN0WzNdIH07XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoIHRva2Vuc1swXVswXSAhPT0gJ3dvcmQnICkge1xuICAgICAgICAgICAgaWYgKCB0b2tlbnMubGVuZ3RoID09PSAxICkgdGhpcy51bmtub3duV29yZCh0b2tlbnMpO1xuICAgICAgICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSB0b2tlbnMuc2hpZnQoKVsxXTtcbiAgICAgICAgfVxuICAgICAgICBub2RlLnNvdXJjZS5zdGFydCA9IHsgbGluZTogdG9rZW5zWzBdWzJdLCBjb2x1bW46IHRva2Vuc1swXVszXSB9O1xuXG4gICAgICAgIG5vZGUucHJvcCA9ICcnO1xuICAgICAgICB3aGlsZSAoIHRva2Vucy5sZW5ndGggKSB7XG4gICAgICAgICAgICBsZXQgdHlwZSA9IHRva2Vuc1swXVswXTtcbiAgICAgICAgICAgIGlmICggdHlwZSA9PT0gJzonIHx8IHR5cGUgPT09ICdzcGFjZScgfHwgdHlwZSA9PT0gJ2NvbW1lbnQnICkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbm9kZS5wcm9wICs9IHRva2Vucy5zaGlmdCgpWzFdO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gPSAnJztcblxuICAgICAgICBsZXQgdG9rZW47XG4gICAgICAgIHdoaWxlICggdG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zLnNoaWZ0KCk7XG5cbiAgICAgICAgICAgIGlmICggdG9rZW5bMF0gPT09ICc6JyApIHtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiArPSB0b2tlblsxXTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdG9rZW5bMV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIG5vZGUucHJvcFswXSA9PT0gJ18nIHx8IG5vZGUucHJvcFswXSA9PT0gJyonICkge1xuICAgICAgICAgICAgbm9kZS5yYXdzLmJlZm9yZSArPSBub2RlLnByb3BbMF07XG4gICAgICAgICAgICBub2RlLnByb3AgPSBub2RlLnByb3Auc2xpY2UoMSk7XG4gICAgICAgIH1cbiAgICAgICAgbm9kZS5yYXdzLmJldHdlZW4gKz0gdGhpcy5zcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCh0b2tlbnMpO1xuICAgICAgICB0aGlzLnByZWNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucyk7XG5cbiAgICAgICAgZm9yICggbGV0IGkgPSB0b2tlbnMubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSApIHtcbiAgICAgICAgICAgIHRva2VuID0gdG9rZW5zW2ldO1xuICAgICAgICAgICAgaWYgKCB0b2tlblsxXS50b0xvd2VyQ2FzZSgpID09PSAnIWltcG9ydGFudCcgKSB7XG4gICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzdHJpbmcgPSB0aGlzLnN0cmluZ0Zyb20odG9rZW5zLCBpKTtcbiAgICAgICAgICAgICAgICBzdHJpbmcgPSB0aGlzLnNwYWNlc0Zyb21FbmQodG9rZW5zKSArIHN0cmluZztcbiAgICAgICAgICAgICAgICBpZiAoIHN0cmluZyAhPT0gJyAhaW1wb3J0YW50JyApIG5vZGUucmF3cy5pbXBvcnRhbnQgPSBzdHJpbmc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodG9rZW5bMV0udG9Mb3dlckNhc2UoKSA9PT0gJ2ltcG9ydGFudCcpIHtcbiAgICAgICAgICAgICAgICBsZXQgY2FjaGUgPSB0b2tlbnMuc2xpY2UoMCk7XG4gICAgICAgICAgICAgICAgbGV0IHN0ciAgID0gJyc7XG4gICAgICAgICAgICAgICAgZm9yICggbGV0IGogPSBpOyBqID4gMDsgai0tICkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgdHlwZSA9IGNhY2hlW2pdWzBdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIHN0ci50cmltKCkuaW5kZXhPZignIScpID09PSAwICYmIHR5cGUgIT09ICdzcGFjZScgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzdHIgPSBjYWNoZS5wb3AoKVsxXSArIHN0cjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCBzdHIudHJpbSgpLmluZGV4T2YoJyEnKSA9PT0gMCApIHtcbiAgICAgICAgICAgICAgICAgICAgbm9kZS5pbXBvcnRhbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBub2RlLnJhd3MuaW1wb3J0YW50ID0gc3RyO1xuICAgICAgICAgICAgICAgICAgICB0b2tlbnMgPSBjYWNoZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdG9rZW5bMF0gIT09ICdzcGFjZScgJiYgdG9rZW5bMF0gIT09ICdjb21tZW50JyApIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucmF3KG5vZGUsICd2YWx1ZScsIHRva2Vucyk7XG5cbiAgICAgICAgaWYgKCBub2RlLnZhbHVlLmluZGV4T2YoJzonKSAhPT0gLTEgKSB0aGlzLmNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucyk7XG4gICAgfVxuXG4gICAgYXRydWxlKHRva2VuKSB7XG4gICAgICAgIGxldCBub2RlICA9IG5ldyBBdFJ1bGUoKTtcbiAgICAgICAgbm9kZS5uYW1lID0gdG9rZW5bMV0uc2xpY2UoMSk7XG4gICAgICAgIGlmICggbm9kZS5uYW1lID09PSAnJyApIHtcbiAgICAgICAgICAgIHRoaXMudW5uYW1lZEF0cnVsZShub2RlLCB0b2tlbik7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5pbml0KG5vZGUsIHRva2VuWzJdLCB0b2tlblszXSk7XG5cbiAgICAgICAgbGV0IHByZXY7XG4gICAgICAgIGxldCBzaGlmdDtcbiAgICAgICAgbGV0IGxhc3QgICA9IGZhbHNlO1xuICAgICAgICBsZXQgb3BlbiAgID0gZmFsc2U7XG4gICAgICAgIGxldCBwYXJhbXMgPSBbXTtcblxuICAgICAgICB3aGlsZSAoICF0aGlzLnRva2VuaXplci5lbmRPZkZpbGUoKSApIHtcbiAgICAgICAgICAgIHRva2VuID0gdGhpcy50b2tlbml6ZXIubmV4dFRva2VuKCk7XG5cbiAgICAgICAgICAgIGlmICggdG9rZW5bMF0gPT09ICc7JyApIHtcbiAgICAgICAgICAgICAgICBub2RlLnNvdXJjZS5lbmQgPSB7IGxpbmU6IHRva2VuWzJdLCBjb2x1bW46IHRva2VuWzNdIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zZW1pY29sb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdG9rZW5bMF0gPT09ICd7JyApIHtcbiAgICAgICAgICAgICAgICBvcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIHRva2VuWzBdID09PSAnfScpIHtcbiAgICAgICAgICAgICAgICBpZiAoIHBhcmFtcy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgICAgICBzaGlmdCA9IHBhcmFtcy5sZW5ndGggLSAxO1xuICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcGFyYW1zW3NoaWZ0XTtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKCBwcmV2ICYmIHByZXZbMF0gPT09ICdzcGFjZScgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2ID0gcGFyYW1zWy0tc2hpZnRdO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICggcHJldiApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUuc291cmNlLmVuZCA9IHsgbGluZTogcHJldls0XSwgY29sdW1uOiBwcmV2WzVdIH07XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbmQodG9rZW4pO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBwYXJhbXMucHVzaCh0b2tlbik7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggdGhpcy50b2tlbml6ZXIuZW5kT2ZGaWxlKCkgKSB7XG4gICAgICAgICAgICAgICAgbGFzdCA9IHRydWU7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9IHRoaXMuc3BhY2VzQW5kQ29tbWVudHNGcm9tRW5kKHBhcmFtcyk7XG4gICAgICAgIGlmICggcGFyYW1zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIG5vZGUucmF3cy5hZnRlck5hbWUgPSB0aGlzLnNwYWNlc0FuZENvbW1lbnRzRnJvbVN0YXJ0KHBhcmFtcyk7XG4gICAgICAgICAgICB0aGlzLnJhdyhub2RlLCAncGFyYW1zJywgcGFyYW1zKTtcbiAgICAgICAgICAgIGlmICggbGFzdCApIHtcbiAgICAgICAgICAgICAgICB0b2tlbiA9IHBhcmFtc1twYXJhbXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICAgICAgbm9kZS5zb3VyY2UuZW5kICAgPSB7IGxpbmU6IHRva2VuWzRdLCBjb2x1bW46IHRva2VuWzVdIH07XG4gICAgICAgICAgICAgICAgdGhpcy5zcGFjZXMgICAgICAgPSBub2RlLnJhd3MuYmV0d2VlbjtcbiAgICAgICAgICAgICAgICBub2RlLnJhd3MuYmV0d2VlbiA9ICcnO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbm9kZS5yYXdzLmFmdGVyTmFtZSA9ICcnO1xuICAgICAgICAgICAgbm9kZS5wYXJhbXMgICAgICAgICA9ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBvcGVuICkge1xuICAgICAgICAgICAgbm9kZS5ub2RlcyAgID0gW107XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQgPSBub2RlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZW5kKHRva2VuKSB7XG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50Lm5vZGVzICYmIHRoaXMuY3VycmVudC5ub2Rlcy5sZW5ndGggKSB7XG4gICAgICAgICAgICB0aGlzLmN1cnJlbnQucmF3cy5zZW1pY29sb24gPSB0aGlzLnNlbWljb2xvbjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnNlbWljb2xvbiA9IGZhbHNlO1xuXG4gICAgICAgIHRoaXMuY3VycmVudC5yYXdzLmFmdGVyID0gKHRoaXMuY3VycmVudC5yYXdzLmFmdGVyIHx8ICcnKSArIHRoaXMuc3BhY2VzO1xuICAgICAgICB0aGlzLnNwYWNlcyA9ICcnO1xuXG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50LnBhcmVudCApIHtcbiAgICAgICAgICAgIHRoaXMuY3VycmVudC5zb3VyY2UuZW5kID0geyBsaW5lOiB0b2tlblsyXSwgY29sdW1uOiB0b2tlblszXSB9O1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50ID0gdGhpcy5jdXJyZW50LnBhcmVudDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMudW5leHBlY3RlZENsb3NlKHRva2VuKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGVuZEZpbGUoKSB7XG4gICAgICAgIGlmICggdGhpcy5jdXJyZW50LnBhcmVudCApIHRoaXMudW5jbG9zZWRCbG9jaygpO1xuICAgICAgICBpZiAoIHRoaXMuY3VycmVudC5ub2RlcyAmJiB0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoICkge1xuICAgICAgICAgICAgdGhpcy5jdXJyZW50LnJhd3Muc2VtaWNvbG9uID0gdGhpcy5zZW1pY29sb247XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgPSAodGhpcy5jdXJyZW50LnJhd3MuYWZ0ZXIgfHwgJycpICsgdGhpcy5zcGFjZXM7XG4gICAgfVxuXG4gICAgZnJlZVNlbWljb2xvbih0b2tlbikge1xuICAgICAgICB0aGlzLnNwYWNlcyArPSB0b2tlblsxXTtcbiAgICAgICAgaWYgKCB0aGlzLmN1cnJlbnQubm9kZXMgKSB7XG4gICAgICAgICAgICBsZXQgcHJldiA9IHRoaXMuY3VycmVudC5ub2Rlc1t0aGlzLmN1cnJlbnQubm9kZXMubGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoIHByZXYgJiYgcHJldi50eXBlID09PSAncnVsZScgJiYgIXByZXYucmF3cy5vd25TZW1pY29sb24gKSB7XG4gICAgICAgICAgICAgICAgcHJldi5yYXdzLm93blNlbWljb2xvbiA9IHRoaXMuc3BhY2VzO1xuICAgICAgICAgICAgICAgIHRoaXMuc3BhY2VzID0gJyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIZWxwZXJzXG5cbiAgICBpbml0KG5vZGUsIGxpbmUsIGNvbHVtbikge1xuICAgICAgICB0aGlzLmN1cnJlbnQucHVzaChub2RlKTtcblxuICAgICAgICBub2RlLnNvdXJjZSA9IHsgc3RhcnQ6IHsgbGluZSwgY29sdW1uIH0sIGlucHV0OiB0aGlzLmlucHV0IH07XG4gICAgICAgIG5vZGUucmF3cy5iZWZvcmUgPSB0aGlzLnNwYWNlcztcbiAgICAgICAgdGhpcy5zcGFjZXMgPSAnJztcbiAgICAgICAgaWYgKCBub2RlLnR5cGUgIT09ICdjb21tZW50JyApIHRoaXMuc2VtaWNvbG9uID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmF3KG5vZGUsIHByb3AsIHRva2Vucykge1xuICAgICAgICBsZXQgdG9rZW4sIHR5cGU7XG4gICAgICAgIGxldCBsZW5ndGggPSB0b2tlbnMubGVuZ3RoO1xuICAgICAgICBsZXQgdmFsdWUgID0gJyc7XG4gICAgICAgIGxldCBjbGVhbiAgPSB0cnVlO1xuICAgICAgICBsZXQgbmV4dCwgcHJldjtcbiAgICAgICAgY29uc3QgcGF0dGVybiA9IC9eKFsufCNdKT8oW1xcd10pKy9pO1xuXG4gICAgICAgIGZvciAoIGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSAxICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICB0eXBlICA9IHRva2VuWzBdO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICdjb21tZW50JyAmJiBub2RlLnR5cGUgPT09ICdydWxlJyApIHtcbiAgICAgICAgICAgICAgICBwcmV2ID0gdG9rZW5zW2kgLSAxXTtcbiAgICAgICAgICAgICAgICBuZXh0ID0gdG9rZW5zW2kgKyAxXTtcblxuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgcHJldlswXSAhPT0gJ3NwYWNlJyAmJlxuICAgICAgICAgICAgICAgICAgICBuZXh0WzBdICE9PSAnc3BhY2UnICYmXG4gICAgICAgICAgICAgICAgICAgIHBhdHRlcm4udGVzdChwcmV2WzFdKSAmJlxuICAgICAgICAgICAgICAgICAgICBwYXR0ZXJuLnRlc3QobmV4dFsxXSlcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUgKz0gdG9rZW5bMV07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAnY29tbWVudCcgfHwgdHlwZSA9PT0gJ3NwYWNlJyAmJiBpID09PSBsZW5ndGggLSAxICkge1xuICAgICAgICAgICAgICAgIGNsZWFuID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHZhbHVlICs9IHRva2VuWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGlmICggIWNsZWFuICkge1xuICAgICAgICAgICAgbGV0IHJhdyA9IHRva2Vucy5yZWR1Y2UoIChhbGwsIGkpID0+IGFsbCArIGlbMV0sICcnKTtcbiAgICAgICAgICAgIG5vZGUucmF3c1twcm9wXSA9IHsgdmFsdWUsIHJhdyB9O1xuICAgICAgICB9XG4gICAgICAgIG5vZGVbcHJvcF0gPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBzcGFjZXNBbmRDb21tZW50c0Zyb21FbmQodG9rZW5zKSB7XG4gICAgICAgIGxldCBsYXN0VG9rZW5UeXBlO1xuICAgICAgICBsZXQgc3BhY2VzID0gJyc7XG4gICAgICAgIHdoaWxlICggdG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGxhc3RUb2tlblR5cGUgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICAgICAgaWYgKCBsYXN0VG9rZW5UeXBlICE9PSAnc3BhY2UnICYmXG4gICAgICAgICAgICAgICAgbGFzdFRva2VuVHlwZSAhPT0gJ2NvbW1lbnQnICkgYnJlYWs7XG4gICAgICAgICAgICBzcGFjZXMgPSB0b2tlbnMucG9wKClbMV0gKyBzcGFjZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYWNlcztcbiAgICB9XG5cbiAgICBzcGFjZXNBbmRDb21tZW50c0Zyb21TdGFydCh0b2tlbnMpIHtcbiAgICAgICAgbGV0IG5leHQ7XG4gICAgICAgIGxldCBzcGFjZXMgPSAnJztcbiAgICAgICAgd2hpbGUgKCB0b2tlbnMubGVuZ3RoICkge1xuICAgICAgICAgICAgbmV4dCA9IHRva2Vuc1swXVswXTtcbiAgICAgICAgICAgIGlmICggbmV4dCAhPT0gJ3NwYWNlJyAmJiBuZXh0ICE9PSAnY29tbWVudCcgKSBicmVhaztcbiAgICAgICAgICAgIHNwYWNlcyArPSB0b2tlbnMuc2hpZnQoKVsxXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3BhY2VzO1xuICAgIH1cblxuICAgIHNwYWNlc0Zyb21FbmQodG9rZW5zKSB7XG4gICAgICAgIGxldCBsYXN0VG9rZW5UeXBlO1xuICAgICAgICBsZXQgc3BhY2VzID0gJyc7XG4gICAgICAgIHdoaWxlICggdG9rZW5zLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGxhc3RUb2tlblR5cGUgPSB0b2tlbnNbdG9rZW5zLmxlbmd0aCAtIDFdWzBdO1xuICAgICAgICAgICAgaWYgKCBsYXN0VG9rZW5UeXBlICE9PSAnc3BhY2UnICkgYnJlYWs7XG4gICAgICAgICAgICBzcGFjZXMgPSB0b2tlbnMucG9wKClbMV0gKyBzcGFjZXM7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwYWNlcztcbiAgICB9XG5cbiAgICBzdHJpbmdGcm9tKHRva2VucywgZnJvbSkge1xuICAgICAgICBsZXQgcmVzdWx0ID0gJyc7XG4gICAgICAgIGZvciAoIGxldCBpID0gZnJvbTsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKyApIHtcbiAgICAgICAgICAgIHJlc3VsdCArPSB0b2tlbnNbaV1bMV07XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5zLnNwbGljZShmcm9tLCB0b2tlbnMubGVuZ3RoIC0gZnJvbSk7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgY29sb24odG9rZW5zKSB7XG4gICAgICAgIGxldCBicmFja2V0cyA9IDA7XG4gICAgICAgIGxldCB0b2tlbiwgdHlwZSwgcHJldjtcbiAgICAgICAgZm9yICggbGV0IGkgPSAwOyBpIDwgdG9rZW5zLmxlbmd0aDsgaSsrICkge1xuICAgICAgICAgICAgdG9rZW4gPSB0b2tlbnNbaV07XG4gICAgICAgICAgICB0eXBlICA9IHRva2VuWzBdO1xuXG4gICAgICAgICAgICBpZiAoIHR5cGUgPT09ICcoJyApIHtcbiAgICAgICAgICAgICAgICBicmFja2V0cyArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJyknICkge1xuICAgICAgICAgICAgICAgIGJyYWNrZXRzIC09IDE7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBicmFja2V0cyA9PT0gMCAmJiB0eXBlID09PSAnOicgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCAhcHJldiApIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kb3VibGVDb2xvbih0b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmICggcHJldlswXSA9PT0gJ3dvcmQnICYmIHByZXZbMV0gPT09ICdwcm9naWQnICkge1xuICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gaTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHByZXYgPSB0b2tlbjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gRXJyb3JzXG5cbiAgICB1bmNsb3NlZEJyYWNrZXQoYnJhY2tldCkge1xuICAgICAgICB0aHJvdyB0aGlzLmlucHV0LmVycm9yKCdVbmNsb3NlZCBicmFja2V0JywgYnJhY2tldFsyXSwgYnJhY2tldFszXSk7XG4gICAgfVxuXG4gICAgdW5rbm93bldvcmQodG9rZW5zKSB7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ1Vua25vd24gd29yZCcsIHRva2Vuc1swXVsyXSwgdG9rZW5zWzBdWzNdKTtcbiAgICB9XG5cbiAgICB1bmV4cGVjdGVkQ2xvc2UodG9rZW4pIHtcbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5leHBlY3RlZCB9JywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbiAgICB1bmNsb3NlZEJsb2NrKCkge1xuICAgICAgICBsZXQgcG9zID0gdGhpcy5jdXJyZW50LnNvdXJjZS5zdGFydDtcbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignVW5jbG9zZWQgYmxvY2snLCBwb3MubGluZSwgcG9zLmNvbHVtbik7XG4gICAgfVxuXG4gICAgZG91YmxlQ29sb24odG9rZW4pIHtcbiAgICAgICAgdGhyb3cgdGhpcy5pbnB1dC5lcnJvcignRG91YmxlIGNvbG9uJywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbiAgICB1bm5hbWVkQXRydWxlKG5vZGUsIHRva2VuKSB7XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ0F0LXJ1bGUgd2l0aG91dCBuYW1lJywgdG9rZW5bMl0sIHRva2VuWzNdKTtcbiAgICB9XG5cbiAgICBwcmVjaGVja01pc3NlZFNlbWljb2xvbih0b2tlbnMpIHtcbiAgICAgICAgLy8gSG9vayBmb3IgU2FmZSBQYXJzZXJcbiAgICAgICAgdG9rZW5zO1xuICAgIH1cblxuICAgIGNoZWNrTWlzc2VkU2VtaWNvbG9uKHRva2Vucykge1xuICAgICAgICBsZXQgY29sb24gPSB0aGlzLmNvbG9uKHRva2Vucyk7XG4gICAgICAgIGlmICggY29sb24gPT09IGZhbHNlICkgcmV0dXJuO1xuXG4gICAgICAgIGxldCBmb3VuZGVkID0gMDtcbiAgICAgICAgbGV0IHRva2VuO1xuICAgICAgICBmb3IgKCBsZXQgaiA9IGNvbG9uIC0gMTsgaiA+PSAwOyBqLS0gKSB7XG4gICAgICAgICAgICB0b2tlbiA9IHRva2Vuc1tqXTtcbiAgICAgICAgICAgIGlmICggdG9rZW5bMF0gIT09ICdzcGFjZScgKSB7XG4gICAgICAgICAgICAgICAgZm91bmRlZCArPSAxO1xuICAgICAgICAgICAgICAgIGlmICggZm91bmRlZCA9PT0gMiApIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRocm93IHRoaXMuaW5wdXQuZXJyb3IoJ01pc3NlZCBzZW1pY29sb24nLCB0b2tlblsyXSwgdG9rZW5bM10pO1xuICAgIH1cblxufVxuIl19

}, function(modId) { var map = {"./declaration":1625038544318,"./tokenize":1625038544322,"./comment":1625038544335,"./at-rule":1625038544336,"./root":1625038544340,"./rule":1625038544338}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544335, function(require, module, exports) {


exports.__esModule = true;

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a comment between declarations or statements (rule and at-rules).
 *
 * Comments inside selectors, at-rule parameters, or declaration values
 * will be stored in the `raws` properties explained above.
 *
 * @extends Node
 */
var Comment = function (_Node) {
  _inherits(Comment, _Node);

  function Comment(defaults) {
    _classCallCheck(this, Comment);

    var _this = _possibleConstructorReturn(this, _Node.call(this, defaults));

    _this.type = 'comment';
    return _this;
  }

  /**
   * @memberof Comment#
   * @member {string} text - the comment’s text
   */

  /**
   * @memberof Comment#
   * @member {object} raws - Information to generate byte-to-byte equal
   *                         node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node.
   * * `left`: the space symbols between `/*` and the comment’s text.
   * * `right`: the space symbols between the comment’s text.
   */


  return Comment;
}(_node2.default);

exports.default = Comment;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1lbnQuZXM2Il0sIm5hbWVzIjpbIkNvbW1lbnQiLCJkZWZhdWx0cyIsInR5cGUiLCJOb2RlIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7OztJQVFNQSxPOzs7QUFFRixtQkFBWUMsUUFBWixFQUFzQjtBQUFBOztBQUFBLGlEQUNsQixpQkFBTUEsUUFBTixDQURrQjs7QUFFbEIsVUFBS0MsSUFBTCxHQUFZLFNBQVo7QUFGa0I7QUFHckI7O0FBRUQ7Ozs7O0FBS0E7Ozs7Ozs7Ozs7Ozs7OztFQVprQkMsYzs7a0JBMEJQSCxPIiwiZmlsZSI6ImNvbW1lbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTm9kZSBmcm9tICcuL25vZGUnO1xuXG4vKipcbiAqIFJlcHJlc2VudHMgYSBjb21tZW50IGJldHdlZW4gZGVjbGFyYXRpb25zIG9yIHN0YXRlbWVudHMgKHJ1bGUgYW5kIGF0LXJ1bGVzKS5cbiAqXG4gKiBDb21tZW50cyBpbnNpZGUgc2VsZWN0b3JzLCBhdC1ydWxlIHBhcmFtZXRlcnMsIG9yIGRlY2xhcmF0aW9uIHZhbHVlc1xuICogd2lsbCBiZSBzdG9yZWQgaW4gdGhlIGByYXdzYCBwcm9wZXJ0aWVzIGV4cGxhaW5lZCBhYm92ZS5cbiAqXG4gKiBAZXh0ZW5kcyBOb2RlXG4gKi9cbmNsYXNzIENvbW1lbnQgZXh0ZW5kcyBOb2RlIHtcblxuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRzKTtcbiAgICAgICAgdGhpcy50eXBlID0gJ2NvbW1lbnQnO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJvZiBDb21tZW50I1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gdGV4dCAtIHRoZSBjb21tZW504oCZcyB0ZXh0XG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgQ29tbWVudCNcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IHJhd3MgLSBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHN0cmluZyBhcyBpdCB3YXMgaW4gdGhlIG9yaWdpbiBpbnB1dC5cbiAgICAgKlxuICAgICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAgICogYnV0IHRoZSBkZWZhdWx0IENTUyBwYXJzZXIgdXNlczpcbiAgICAgKlxuICAgICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS5cbiAgICAgKiAqIGBsZWZ0YDogdGhlIHNwYWNlIHN5bWJvbHMgYmV0d2VlbiBgLypgIGFuZCB0aGUgY29tbWVudOKAmXMgdGV4dC5cbiAgICAgKiAqIGByaWdodGA6IHRoZSBzcGFjZSBzeW1ib2xzIGJldHdlZW4gdGhlIGNvbW1lbnTigJlzIHRleHQuXG4gICAgICovXG59XG5cbmV4cG9ydCBkZWZhdWx0IENvbW1lbnQ7XG4iXX0=

}, function(modId) { var map = {"./node":1625038544319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544336, function(require, module, exports) {


exports.__esModule = true;

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents an at-rule.
 *
 * If it’s followed in the CSS by a {} block, this node will have
 * a nodes property representing its children.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('@charset "UTF-8"; @media print {}');
 *
 * const charset = root.first;
 * charset.type  //=> 'atrule'
 * charset.nodes //=> undefined
 *
 * const media = root.last;
 * media.nodes   //=> []
 */
var AtRule = function (_Container) {
  _inherits(AtRule, _Container);

  function AtRule(defaults) {
    _classCallCheck(this, AtRule);

    var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

    _this.type = 'atrule';
    return _this;
  }

  AtRule.prototype.append = function append() {
    var _Container$prototype$;

    if (!this.nodes) this.nodes = [];

    for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
      children[_key] = arguments[_key];
    }

    return (_Container$prototype$ = _Container.prototype.append).call.apply(_Container$prototype$, [this].concat(children));
  };

  AtRule.prototype.prepend = function prepend() {
    var _Container$prototype$2;

    if (!this.nodes) this.nodes = [];

    for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      children[_key2] = arguments[_key2];
    }

    return (_Container$prototype$2 = _Container.prototype.prepend).call.apply(_Container$prototype$2, [this].concat(children));
  };

  /**
   * @memberof AtRule#
   * @member {string} name - the at-rule’s name immediately follows the `@`
   *
   * @example
   * const root  = postcss.parse('@media print {}');
   * media.name //=> 'media'
   * const media = root.first;
   */

  /**
   * @memberof AtRule#
   * @member {string} params - the at-rule’s parameters, the values
   *                           that follow the at-rule’s name but precede
   *                           any {} block
   *
   * @example
   * const root  = postcss.parse('@media print, screen {}');
   * const media = root.first;
   * media.params //=> 'print, screen'
   */

  /**
   * @memberof AtRule#
   * @member {object} raws - Information to generate byte-to-byte equal
   *                         node string as it was in the origin input.
   *
   * Every parser saves its own properties,
   * but the default CSS parser uses:
   *
   * * `before`: the space symbols before the node. It also stores `*`
   *   and `_` symbols before the declaration (IE hack).
   * * `after`: the space symbols after the last child of the node
   *   to the end of the node.
   * * `between`: the symbols between the property and value
   *   for declarations, selector and `{` for rules, or last parameter
   *   and `{` for at-rules.
   * * `semicolon`: contains true if the last child has
   *   an (optional) semicolon.
   * * `afterName`: the space between the at-rule name and its parameters.
   *
   * PostCSS cleans at-rule parameters from comments and extra spaces,
   * but it stores origin content in raws properties.
   * As such, if you don’t change a declaration’s value,
   * PostCSS will use the raw value with comments.
   *
   * @example
   * const root = postcss.parse('  @media\nprint {\n}')
   * root.first.first.raws //=> { before: '  ',
   *                       //     between: ' ',
   *                       //     afterName: '\n',
   *                       //     after: '\n' }
   */


  return AtRule;
}(_container2.default);

exports.default = AtRule;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImF0LXJ1bGUuZXM2Il0sIm5hbWVzIjpbIkF0UnVsZSIsImRlZmF1bHRzIiwidHlwZSIsImFwcGVuZCIsIm5vZGVzIiwiY2hpbGRyZW4iLCJwcmVwZW5kIiwiQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7Ozs7Ozs7OztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFrQk1BLE07OztBQUVGLGtCQUFZQyxRQUFaLEVBQXNCO0FBQUE7O0FBQUEsaURBQ2xCLHNCQUFNQSxRQUFOLENBRGtCOztBQUVsQixVQUFLQyxJQUFMLEdBQVksUUFBWjtBQUZrQjtBQUdyQjs7bUJBRURDLE0scUJBQW9CO0FBQUE7O0FBQ2hCLFFBQUssQ0FBQyxLQUFLQyxLQUFYLEVBQW1CLEtBQUtBLEtBQUwsR0FBYSxFQUFiOztBQURILHNDQUFWQyxRQUFVO0FBQVZBLGNBQVU7QUFBQTs7QUFFaEIsV0FBTyw4Q0FBTUYsTUFBTixrREFBZ0JFLFFBQWhCLEVBQVA7QUFDSCxHOzttQkFFREMsTyxzQkFBcUI7QUFBQTs7QUFDakIsUUFBSyxDQUFDLEtBQUtGLEtBQVgsRUFBbUIsS0FBS0EsS0FBTCxHQUFhLEVBQWI7O0FBREYsdUNBQVZDLFFBQVU7QUFBVkEsY0FBVTtBQUFBOztBQUVqQixXQUFPLCtDQUFNQyxPQUFOLG1EQUFpQkQsUUFBakIsRUFBUDtBQUNILEc7O0FBRUQ7Ozs7Ozs7Ozs7QUFVQTs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7RUF2Q2lCRSxtQjs7a0JBd0VOUCxNIiwiZmlsZSI6ImF0LXJ1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuIGF0LXJ1bGUuXG4gKlxuICogSWYgaXTigJlzIGZvbGxvd2VkIGluIHRoZSBDU1MgYnkgYSB7fSBibG9jaywgdGhpcyBub2RlIHdpbGwgaGF2ZVxuICogYSBub2RlcyBwcm9wZXJ0eSByZXByZXNlbnRpbmcgaXRzIGNoaWxkcmVuLlxuICpcbiAqIEBleHRlbmRzIENvbnRhaW5lclxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnQGNoYXJzZXQgXCJVVEYtOFwiOyBAbWVkaWEgcHJpbnQge30nKTtcbiAqXG4gKiBjb25zdCBjaGFyc2V0ID0gcm9vdC5maXJzdDtcbiAqIGNoYXJzZXQudHlwZSAgLy89PiAnYXRydWxlJ1xuICogY2hhcnNldC5ub2RlcyAvLz0+IHVuZGVmaW5lZFxuICpcbiAqIGNvbnN0IG1lZGlhID0gcm9vdC5sYXN0O1xuICogbWVkaWEubm9kZXMgICAvLz0+IFtdXG4gKi9cbmNsYXNzIEF0UnVsZSBleHRlbmRzIENvbnRhaW5lciB7XG5cbiAgICBjb25zdHJ1Y3RvcihkZWZhdWx0cykge1xuICAgICAgICBzdXBlcihkZWZhdWx0cyk7XG4gICAgICAgIHRoaXMudHlwZSA9ICdhdHJ1bGUnO1xuICAgIH1cblxuICAgIGFwcGVuZCguLi5jaGlsZHJlbikge1xuICAgICAgICBpZiAoICF0aGlzLm5vZGVzICkgdGhpcy5ub2RlcyA9IFtdO1xuICAgICAgICByZXR1cm4gc3VwZXIuYXBwZW5kKC4uLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICBwcmVwZW5kKC4uLmNoaWxkcmVuKSB7XG4gICAgICAgIGlmICggIXRoaXMubm9kZXMgKSB0aGlzLm5vZGVzID0gW107XG4gICAgICAgIHJldHVybiBzdXBlci5wcmVwZW5kKC4uLmNoaWxkcmVuKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgQXRSdWxlI1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gbmFtZSAtIHRoZSBhdC1ydWxl4oCZcyBuYW1lIGltbWVkaWF0ZWx5IGZvbGxvd3MgdGhlIGBAYFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ICA9IHBvc3Rjc3MucGFyc2UoJ0BtZWRpYSBwcmludCB7fScpO1xuICAgICAqIG1lZGlhLm5hbWUgLy89PiAnbWVkaWEnXG4gICAgICogY29uc3QgbWVkaWEgPSByb290LmZpcnN0O1xuICAgICAqL1xuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIEF0UnVsZSNcbiAgICAgKiBAbWVtYmVyIHtzdHJpbmd9IHBhcmFtcyAtIHRoZSBhdC1ydWxl4oCZcyBwYXJhbWV0ZXJzLCB0aGUgdmFsdWVzXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICB0aGF0IGZvbGxvdyB0aGUgYXQtcnVsZeKAmXMgbmFtZSBidXQgcHJlY2VkZVxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgYW55IHt9IGJsb2NrXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHJvb3QgID0gcG9zdGNzcy5wYXJzZSgnQG1lZGlhIHByaW50LCBzY3JlZW4ge30nKTtcbiAgICAgKiBjb25zdCBtZWRpYSA9IHJvb3QuZmlyc3Q7XG4gICAgICogbWVkaWEucGFyYW1zIC8vPT4gJ3ByaW50LCBzY3JlZW4nXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgQXRSdWxlI1xuICAgICAqIEBtZW1iZXIge29iamVjdH0gcmF3cyAtIEluZm9ybWF0aW9uIHRvIGdlbmVyYXRlIGJ5dGUtdG8tYnl0ZSBlcXVhbFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgIG5vZGUgc3RyaW5nIGFzIGl0IHdhcyBpbiB0aGUgb3JpZ2luIGlucHV0LlxuICAgICAqXG4gICAgICogRXZlcnkgcGFyc2VyIHNhdmVzIGl0cyBvd24gcHJvcGVydGllcyxcbiAgICAgKiBidXQgdGhlIGRlZmF1bHQgQ1NTIHBhcnNlciB1c2VzOlxuICAgICAqXG4gICAgICogKiBgYmVmb3JlYDogdGhlIHNwYWNlIHN5bWJvbHMgYmVmb3JlIHRoZSBub2RlLiBJdCBhbHNvIHN0b3JlcyBgKmBcbiAgICAgKiAgIGFuZCBgX2Agc3ltYm9scyBiZWZvcmUgdGhlIGRlY2xhcmF0aW9uIChJRSBoYWNrKS5cbiAgICAgKiAqIGBhZnRlcmA6IHRoZSBzcGFjZSBzeW1ib2xzIGFmdGVyIHRoZSBsYXN0IGNoaWxkIG9mIHRoZSBub2RlXG4gICAgICogICB0byB0aGUgZW5kIG9mIHRoZSBub2RlLlxuICAgICAqICogYGJldHdlZW5gOiB0aGUgc3ltYm9scyBiZXR3ZWVuIHRoZSBwcm9wZXJ0eSBhbmQgdmFsdWVcbiAgICAgKiAgIGZvciBkZWNsYXJhdGlvbnMsIHNlbGVjdG9yIGFuZCBge2AgZm9yIHJ1bGVzLCBvciBsYXN0IHBhcmFtZXRlclxuICAgICAqICAgYW5kIGB7YCBmb3IgYXQtcnVsZXMuXG4gICAgICogKiBgc2VtaWNvbG9uYDogY29udGFpbnMgdHJ1ZSBpZiB0aGUgbGFzdCBjaGlsZCBoYXNcbiAgICAgKiAgIGFuIChvcHRpb25hbCkgc2VtaWNvbG9uLlxuICAgICAqICogYGFmdGVyTmFtZWA6IHRoZSBzcGFjZSBiZXR3ZWVuIHRoZSBhdC1ydWxlIG5hbWUgYW5kIGl0cyBwYXJhbWV0ZXJzLlxuICAgICAqXG4gICAgICogUG9zdENTUyBjbGVhbnMgYXQtcnVsZSBwYXJhbWV0ZXJzIGZyb20gY29tbWVudHMgYW5kIGV4dHJhIHNwYWNlcyxcbiAgICAgKiBidXQgaXQgc3RvcmVzIG9yaWdpbiBjb250ZW50IGluIHJhd3MgcHJvcGVydGllcy5cbiAgICAgKiBBcyBzdWNoLCBpZiB5b3UgZG9u4oCZdCBjaGFuZ2UgYSBkZWNsYXJhdGlvbuKAmXMgdmFsdWUsXG4gICAgICogUG9zdENTUyB3aWxsIHVzZSB0aGUgcmF3IHZhbHVlIHdpdGggY29tbWVudHMuXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCcgIEBtZWRpYVxcbnByaW50IHtcXG59JylcbiAgICAgKiByb290LmZpcnN0LmZpcnN0LnJhd3MgLy89PiB7IGJlZm9yZTogJyAgJyxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGJldHdlZW46ICcgJyxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgLy8gICAgIGFmdGVyTmFtZTogJ1xcbicsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgIC8vICAgICBhZnRlcjogJ1xcbicgfVxuICAgICAqL1xufVxuXG5leHBvcnQgZGVmYXVsdCBBdFJ1bGU7XG4iXX0=

}, function(modId) { var map = {"./container":1625038544337}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544337, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _declaration = require('./declaration');

var _declaration2 = _interopRequireDefault(_declaration);

var _comment = require('./comment');

var _comment2 = _interopRequireDefault(_comment);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function cleanSource(nodes) {
    return nodes.map(function (i) {
        if (i.nodes) i.nodes = cleanSource(i.nodes);
        delete i.source;
        return i;
    });
}

/**
 * The {@link Root}, {@link AtRule}, and {@link Rule} container nodes
 * inherit some common methods to help work with their children.
 *
 * Note that all containers can store any content. If you write a rule inside
 * a rule, PostCSS will parse it.
 *
 * @extends Node
 * @abstract
 */

var Container = function (_Node) {
    _inherits(Container, _Node);

    function Container() {
        _classCallCheck(this, Container);

        return _possibleConstructorReturn(this, _Node.apply(this, arguments));
    }

    Container.prototype.push = function push(child) {
        child.parent = this;
        this.nodes.push(child);
        return this;
    };

    /**
     * Iterates through the container’s immediate children,
     * calling `callback` for each child.
     *
     * Returning `false` in the callback will break iteration.
     *
     * This method only iterates through the container’s immediate children.
     * If you need to recursively iterate through all the container’s descendant
     * nodes, use {@link Container#walk}.
     *
     * Unlike the for `{}`-cycle or `Array#forEach` this iterator is safe
     * if you are mutating the array of child nodes during iteration.
     * PostCSS will adjust the current index to match the mutations.
     *
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * const root = postcss.parse('a { color: black; z-index: 1 }');
     * const rule = root.first;
     *
     * for ( let decl of rule.nodes ) {
     *     decl.cloneBefore({ prop: '-webkit-' + decl.prop });
     *     // Cycle will be infinite, because cloneBefore moves the current node
     *     // to the next index
     * }
     *
     * rule.each(decl => {
     *     decl.cloneBefore({ prop: '-webkit-' + decl.prop });
     *     // Will be executed only for color and z-index
     * });
     */


    Container.prototype.each = function each(callback) {
        if (!this.lastEach) this.lastEach = 0;
        if (!this.indexes) this.indexes = {};

        this.lastEach += 1;
        var id = this.lastEach;
        this.indexes[id] = 0;

        if (!this.nodes) return undefined;

        var index = void 0,
            result = void 0;
        while (this.indexes[id] < this.nodes.length) {
            index = this.indexes[id];
            result = callback(this.nodes[index], index);
            if (result === false) break;

            this.indexes[id] += 1;
        }

        delete this.indexes[id];

        return result;
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each node.
     *
     * Like container.each(), this method is safe to use
     * if you are mutating arrays during iteration.
     *
     * If you only need to iterate through the container’s immediate children,
     * use {@link Container#each}.
     *
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walk(node => {
     *   // Traverses all descendant nodes.
     * });
     */


    Container.prototype.walk = function walk(callback) {
        return this.each(function (child, i) {
            var result = callback(child, i);
            if (result !== false && child.walk) {
                result = child.walk(callback);
            }
            return result;
        });
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each declaration node.
     *
     * If you pass a filter, iteration will only happen over declarations
     * with matching properties.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {string|RegExp} [prop]   - string or regular expression
     *                                   to filter declarations by property name
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walkDecls(decl => {
     *   checkPropertySupport(decl.prop);
     * });
     *
     * root.walkDecls('border-radius', decl => {
     *   decl.remove();
     * });
     *
     * root.walkDecls(/^background/, decl => {
     *   decl.value = takeFirstColorFromGradient(decl.value);
     * });
     */


    Container.prototype.walkDecls = function walkDecls(prop, callback) {
        if (!callback) {
            callback = prop;
            return this.walk(function (child, i) {
                if (child.type === 'decl') {
                    return callback(child, i);
                }
            });
        } else if (prop instanceof RegExp) {
            return this.walk(function (child, i) {
                if (child.type === 'decl' && prop.test(child.prop)) {
                    return callback(child, i);
                }
            });
        } else {
            return this.walk(function (child, i) {
                if (child.type === 'decl' && child.prop === prop) {
                    return callback(child, i);
                }
            });
        }
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each rule node.
     *
     * If you pass a filter, iteration will only happen over rules
     * with matching selectors.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {string|RegExp} [selector] - string or regular expression
     *                                     to filter rules by selector
     * @param {childIterator} callback   - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * const selectors = [];
     * root.walkRules(rule => {
     *   selectors.push(rule.selector);
     * });
     * console.log(`Your CSS uses ${selectors.length} selectors`);
     */


    Container.prototype.walkRules = function walkRules(selector, callback) {
        if (!callback) {
            callback = selector;

            return this.walk(function (child, i) {
                if (child.type === 'rule') {
                    return callback(child, i);
                }
            });
        } else if (selector instanceof RegExp) {
            return this.walk(function (child, i) {
                if (child.type === 'rule' && selector.test(child.selector)) {
                    return callback(child, i);
                }
            });
        } else {
            return this.walk(function (child, i) {
                if (child.type === 'rule' && child.selector === selector) {
                    return callback(child, i);
                }
            });
        }
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each at-rule node.
     *
     * If you pass a filter, iteration will only happen over at-rules
     * that have matching names.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {string|RegExp} [name]   - string or regular expression
     *                                   to filter at-rules by name
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walkAtRules(rule => {
     *   if ( isOld(rule.name) ) rule.remove();
     * });
     *
     * let first = false;
     * root.walkAtRules('charset', rule => {
     *   if ( !first ) {
     *     first = true;
     *   } else {
     *     rule.remove();
     *   }
     * });
     */


    Container.prototype.walkAtRules = function walkAtRules(name, callback) {
        if (!callback) {
            callback = name;
            return this.walk(function (child, i) {
                if (child.type === 'atrule') {
                    return callback(child, i);
                }
            });
        } else if (name instanceof RegExp) {
            return this.walk(function (child, i) {
                if (child.type === 'atrule' && name.test(child.name)) {
                    return callback(child, i);
                }
            });
        } else {
            return this.walk(function (child, i) {
                if (child.type === 'atrule' && child.name === name) {
                    return callback(child, i);
                }
            });
        }
    };

    /**
     * Traverses the container’s descendant nodes, calling callback
     * for each comment node.
     *
     * Like {@link Container#each}, this method is safe
     * to use if you are mutating arrays during iteration.
     *
     * @param {childIterator} callback - iterator receives each node and index
     *
     * @return {false|undefined} returns `false` if iteration was broke
     *
     * @example
     * root.walkComments(comment => {
     *   comment.remove();
     * });
     */


    Container.prototype.walkComments = function walkComments(callback) {
        return this.walk(function (child, i) {
            if (child.type === 'comment') {
                return callback(child, i);
            }
        });
    };

    /**
     * Inserts new nodes to the end of the container.
     *
     * @param {...(Node|object|string|Node[])} children - new nodes
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * const decl1 = postcss.decl({ prop: 'color', value: 'black' });
     * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
     * rule.append(decl1, decl2);
     *
     * root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
     * root.append({ selector: 'a' });                       // rule
     * rule.append({ prop: 'color', value: 'black' });       // declaration
     * rule.append({ text: 'Comment' })                      // comment
     *
     * root.append('a {}');
     * root.first.append('color: black; z-index: 1');
     */


    Container.prototype.append = function append() {
        for (var _len = arguments.length, children = Array(_len), _key = 0; _key < _len; _key++) {
            children[_key] = arguments[_key];
        }

        for (var _iterator = children, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
            var _ref;

            if (_isArray) {
                if (_i >= _iterator.length) break;
                _ref = _iterator[_i++];
            } else {
                _i = _iterator.next();
                if (_i.done) break;
                _ref = _i.value;
            }

            var child = _ref;

            var nodes = this.normalize(child, this.last);
            for (var _iterator2 = nodes, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                var _ref2;

                if (_isArray2) {
                    if (_i2 >= _iterator2.length) break;
                    _ref2 = _iterator2[_i2++];
                } else {
                    _i2 = _iterator2.next();
                    if (_i2.done) break;
                    _ref2 = _i2.value;
                }

                var node = _ref2;
                this.nodes.push(node);
            }
        }
        return this;
    };

    /**
     * Inserts new nodes to the start of the container.
     *
     * @param {...(Node|object|string|Node[])} children - new nodes
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * const decl1 = postcss.decl({ prop: 'color', value: 'black' });
     * const decl2 = postcss.decl({ prop: 'background-color', value: 'white' });
     * rule.prepend(decl1, decl2);
     *
     * root.append({ name: 'charset', params: '"UTF-8"' });  // at-rule
     * root.append({ selector: 'a' });                       // rule
     * rule.append({ prop: 'color', value: 'black' });       // declaration
     * rule.append({ text: 'Comment' })                      // comment
     *
     * root.append('a {}');
     * root.first.append('color: black; z-index: 1');
     */


    Container.prototype.prepend = function prepend() {
        for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            children[_key2] = arguments[_key2];
        }

        children = children.reverse();
        for (var _iterator3 = children, _isArray3 = Array.isArray(_iterator3), _i3 = 0, _iterator3 = _isArray3 ? _iterator3 : _iterator3[Symbol.iterator]();;) {
            var _ref3;

            if (_isArray3) {
                if (_i3 >= _iterator3.length) break;
                _ref3 = _iterator3[_i3++];
            } else {
                _i3 = _iterator3.next();
                if (_i3.done) break;
                _ref3 = _i3.value;
            }

            var child = _ref3;

            var nodes = this.normalize(child, this.first, 'prepend').reverse();
            for (var _iterator4 = nodes, _isArray4 = Array.isArray(_iterator4), _i4 = 0, _iterator4 = _isArray4 ? _iterator4 : _iterator4[Symbol.iterator]();;) {
                var _ref4;

                if (_isArray4) {
                    if (_i4 >= _iterator4.length) break;
                    _ref4 = _iterator4[_i4++];
                } else {
                    _i4 = _iterator4.next();
                    if (_i4.done) break;
                    _ref4 = _i4.value;
                }

                var node = _ref4;
                this.nodes.unshift(node);
            }for (var id in this.indexes) {
                this.indexes[id] = this.indexes[id] + nodes.length;
            }
        }
        return this;
    };

    Container.prototype.cleanRaws = function cleanRaws(keepBetween) {
        _Node.prototype.cleanRaws.call(this, keepBetween);
        if (this.nodes) {
            for (var _iterator5 = this.nodes, _isArray5 = Array.isArray(_iterator5), _i5 = 0, _iterator5 = _isArray5 ? _iterator5 : _iterator5[Symbol.iterator]();;) {
                var _ref5;

                if (_isArray5) {
                    if (_i5 >= _iterator5.length) break;
                    _ref5 = _iterator5[_i5++];
                } else {
                    _i5 = _iterator5.next();
                    if (_i5.done) break;
                    _ref5 = _i5.value;
                }

                var node = _ref5;
                node.cleanRaws(keepBetween);
            }
        }
    };

    /**
     * Insert new node before old node within the container.
     *
     * @param {Node|number} exist             - child or child’s index.
     * @param {Node|object|string|Node[]} add - new node
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * rule.insertBefore(decl, decl.clone({ prop: '-webkit-' + decl.prop }));
     */


    Container.prototype.insertBefore = function insertBefore(exist, add) {
        exist = this.index(exist);

        var type = exist === 0 ? 'prepend' : false;
        var nodes = this.normalize(add, this.nodes[exist], type).reverse();
        for (var _iterator6 = nodes, _isArray6 = Array.isArray(_iterator6), _i6 = 0, _iterator6 = _isArray6 ? _iterator6 : _iterator6[Symbol.iterator]();;) {
            var _ref6;

            if (_isArray6) {
                if (_i6 >= _iterator6.length) break;
                _ref6 = _iterator6[_i6++];
            } else {
                _i6 = _iterator6.next();
                if (_i6.done) break;
                _ref6 = _i6.value;
            }

            var node = _ref6;
            this.nodes.splice(exist, 0, node);
        }var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (exist <= index) {
                this.indexes[id] = index + nodes.length;
            }
        }

        return this;
    };

    /**
     * Insert new node after old node within the container.
     *
     * @param {Node|number} exist             - child or child’s index
     * @param {Node|object|string|Node[]} add - new node
     *
     * @return {Node} this node for methods chain
     */


    Container.prototype.insertAfter = function insertAfter(exist, add) {
        exist = this.index(exist);

        var nodes = this.normalize(add, this.nodes[exist]).reverse();
        for (var _iterator7 = nodes, _isArray7 = Array.isArray(_iterator7), _i7 = 0, _iterator7 = _isArray7 ? _iterator7 : _iterator7[Symbol.iterator]();;) {
            var _ref7;

            if (_isArray7) {
                if (_i7 >= _iterator7.length) break;
                _ref7 = _iterator7[_i7++];
            } else {
                _i7 = _iterator7.next();
                if (_i7.done) break;
                _ref7 = _i7.value;
            }

            var node = _ref7;
            this.nodes.splice(exist + 1, 0, node);
        }var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (exist < index) {
                this.indexes[id] = index + nodes.length;
            }
        }

        return this;
    };

    /**
     * Removes node from the container and cleans the parent properties
     * from the node and its children.
     *
     * @param {Node|number} child - child or child’s index
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * rule.nodes.length  //=> 5
     * rule.removeChild(decl);
     * rule.nodes.length  //=> 4
     * decl.parent        //=> undefined
     */


    Container.prototype.removeChild = function removeChild(child) {
        child = this.index(child);
        this.nodes[child].parent = undefined;
        this.nodes.splice(child, 1);

        var index = void 0;
        for (var id in this.indexes) {
            index = this.indexes[id];
            if (index >= child) {
                this.indexes[id] = index - 1;
            }
        }

        return this;
    };

    /**
     * Removes all children from the container
     * and cleans their parent properties.
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * rule.removeAll();
     * rule.nodes.length //=> 0
     */


    Container.prototype.removeAll = function removeAll() {
        for (var _iterator8 = this.nodes, _isArray8 = Array.isArray(_iterator8), _i8 = 0, _iterator8 = _isArray8 ? _iterator8 : _iterator8[Symbol.iterator]();;) {
            var _ref8;

            if (_isArray8) {
                if (_i8 >= _iterator8.length) break;
                _ref8 = _iterator8[_i8++];
            } else {
                _i8 = _iterator8.next();
                if (_i8.done) break;
                _ref8 = _i8.value;
            }

            var node = _ref8;
            node.parent = undefined;
        }this.nodes = [];
        return this;
    };

    /**
     * Passes all declaration values within the container that match pattern
     * through callback, replacing those values with the returned result
     * of callback.
     *
     * This method is useful if you are using a custom unit or function
     * and need to iterate through all values.
     *
     * @param {string|RegExp} pattern      - replace pattern
     * @param {object} opts                - options to speed up the search
     * @param {string|string[]} opts.props - an array of property names
     * @param {string} opts.fast           - string that’s used
     *                                       to narrow down values and speed up
                                             the regexp search
     * @param {function|string} callback   - string to replace pattern
     *                                       or callback that returns a new
     *                                       value.
     *                                       The callback will receive
     *                                       the same arguments as those
     *                                       passed to a function parameter
     *                                       of `String#replace`.
     *
     * @return {Node} this node for methods chain
     *
     * @example
     * root.replaceValues(/\d+rem/, { fast: 'rem' }, string => {
     *   return 15 * parseInt(string) + 'px';
     * });
     */


    Container.prototype.replaceValues = function replaceValues(pattern, opts, callback) {
        if (!callback) {
            callback = opts;
            opts = {};
        }

        this.walkDecls(function (decl) {
            if (opts.props && opts.props.indexOf(decl.prop) === -1) return;
            if (opts.fast && decl.value.indexOf(opts.fast) === -1) return;

            decl.value = decl.value.replace(pattern, callback);
        });

        return this;
    };

    /**
     * Returns `true` if callback returns `true`
     * for all of the container’s children.
     *
     * @param {childCondition} condition - iterator returns true or false.
     *
     * @return {boolean} is every child pass condition
     *
     * @example
     * const noPrefixes = rule.every(i => i.prop[0] !== '-');
     */


    Container.prototype.every = function every(condition) {
        return this.nodes.every(condition);
    };

    /**
     * Returns `true` if callback returns `true` for (at least) one
     * of the container’s children.
     *
     * @param {childCondition} condition - iterator returns true or false.
     *
     * @return {boolean} is some child pass condition
     *
     * @example
     * const hasPrefix = rule.some(i => i.prop[0] === '-');
     */


    Container.prototype.some = function some(condition) {
        return this.nodes.some(condition);
    };

    /**
     * Returns a `child`’s index within the {@link Container#nodes} array.
     *
     * @param {Node} child - child of the current container.
     *
     * @return {number} child index
     *
     * @example
     * rule.index( rule.nodes[2] ) //=> 2
     */


    Container.prototype.index = function index(child) {
        if (typeof child === 'number') {
            return child;
        } else {
            return this.nodes.indexOf(child);
        }
    };

    /**
     * The container’s first child.
     *
     * @type {Node}
     *
     * @example
     * rule.first == rules.nodes[0];
     */


    Container.prototype.normalize = function normalize(nodes, sample) {
        var _this2 = this;

        if (typeof nodes === 'string') {
            var parse = require('./parse');
            nodes = cleanSource(parse(nodes).nodes);
        } else if (Array.isArray(nodes)) {
            nodes = nodes.slice(0);
            for (var _iterator9 = nodes, _isArray9 = Array.isArray(_iterator9), _i9 = 0, _iterator9 = _isArray9 ? _iterator9 : _iterator9[Symbol.iterator]();;) {
                var _ref9;

                if (_isArray9) {
                    if (_i9 >= _iterator9.length) break;
                    _ref9 = _iterator9[_i9++];
                } else {
                    _i9 = _iterator9.next();
                    if (_i9.done) break;
                    _ref9 = _i9.value;
                }

                var i = _ref9;

                if (i.parent) i.parent.removeChild(i, 'ignore');
            }
        } else if (nodes.type === 'root') {
            nodes = nodes.nodes.slice(0);
            for (var _iterator10 = nodes, _isArray10 = Array.isArray(_iterator10), _i11 = 0, _iterator10 = _isArray10 ? _iterator10 : _iterator10[Symbol.iterator]();;) {
                var _ref10;

                if (_isArray10) {
                    if (_i11 >= _iterator10.length) break;
                    _ref10 = _iterator10[_i11++];
                } else {
                    _i11 = _iterator10.next();
                    if (_i11.done) break;
                    _ref10 = _i11.value;
                }

                var _i10 = _ref10;

                if (_i10.parent) _i10.parent.removeChild(_i10, 'ignore');
            }
        } else if (nodes.type) {
            nodes = [nodes];
        } else if (nodes.prop) {
            if (typeof nodes.value === 'undefined') {
                throw new Error('Value field is missed in node creation');
            } else if (typeof nodes.value !== 'string') {
                nodes.value = String(nodes.value);
            }
            nodes = [new _declaration2.default(nodes)];
        } else if (nodes.selector) {
            var Rule = require('./rule');
            nodes = [new Rule(nodes)];
        } else if (nodes.name) {
            var AtRule = require('./at-rule');
            nodes = [new AtRule(nodes)];
        } else if (nodes.text) {
            nodes = [new _comment2.default(nodes)];
        } else {
            throw new Error('Unknown node type in node creation');
        }

        var processed = nodes.map(function (i) {
            if (typeof i.before !== 'function') i = _this2.rebuild(i);

            if (i.parent) i.parent.removeChild(i);
            if (typeof i.raws.before === 'undefined') {
                if (sample && typeof sample.raws.before !== 'undefined') {
                    i.raws.before = sample.raws.before.replace(/[^\s]/g, '');
                }
            }
            i.parent = _this2;
            return i;
        });

        return processed;
    };

    Container.prototype.rebuild = function rebuild(node, parent) {
        var _this3 = this;

        var fix = void 0;
        if (node.type === 'root') {
            var Root = require('./root');
            fix = new Root();
        } else if (node.type === 'atrule') {
            var AtRule = require('./at-rule');
            fix = new AtRule();
        } else if (node.type === 'rule') {
            var Rule = require('./rule');
            fix = new Rule();
        } else if (node.type === 'decl') {
            fix = new _declaration2.default();
        } else if (node.type === 'comment') {
            fix = new _comment2.default();
        }

        for (var i in node) {
            if (i === 'nodes') {
                fix.nodes = node.nodes.map(function (j) {
                    return _this3.rebuild(j, fix);
                });
            } else if (i === 'parent' && parent) {
                fix.parent = parent;
            } else if (node.hasOwnProperty(i)) {
                fix[i] = node[i];
            }
        }

        return fix;
    };

    /**
     * @memberof Container#
     * @member {Node[]} nodes - an array containing the container’s children
     *
     * @example
     * const root = postcss.parse('a { color: black }');
     * root.nodes.length           //=> 1
     * root.nodes[0].selector      //=> 'a'
     * root.nodes[0].nodes[0].prop //=> 'color'
     */

    _createClass(Container, [{
        key: 'first',
        get: function get() {
            if (!this.nodes) return undefined;
            return this.nodes[0];
        }

        /**
         * The container’s last child.
         *
         * @type {Node}
         *
         * @example
         * rule.last == rule.nodes[rule.nodes.length - 1];
         */

    }, {
        key: 'last',
        get: function get() {
            if (!this.nodes) return undefined;
            return this.nodes[this.nodes.length - 1];
        }
    }]);

    return Container;
}(_node2.default);

exports.default = Container;

/**
 * @callback childCondition
 * @param {Node} node    - container child
 * @param {number} index - child index
 * @param {Node[]} nodes - all container children
 * @return {boolean}
 */

/**
 * @callback childIterator
 * @param {Node} node    - container child
 * @param {number} index - child index
 * @return {false|undefined} returning `false` will break iteration
 */

module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbnRhaW5lci5lczYiXSwibmFtZXMiOlsiY2xlYW5Tb3VyY2UiLCJub2RlcyIsIm1hcCIsImkiLCJzb3VyY2UiLCJDb250YWluZXIiLCJwdXNoIiwiY2hpbGQiLCJwYXJlbnQiLCJlYWNoIiwiY2FsbGJhY2siLCJsYXN0RWFjaCIsImluZGV4ZXMiLCJpZCIsInVuZGVmaW5lZCIsImluZGV4IiwicmVzdWx0IiwibGVuZ3RoIiwid2FsayIsIndhbGtEZWNscyIsInByb3AiLCJ0eXBlIiwiUmVnRXhwIiwidGVzdCIsIndhbGtSdWxlcyIsInNlbGVjdG9yIiwid2Fsa0F0UnVsZXMiLCJuYW1lIiwid2Fsa0NvbW1lbnRzIiwiYXBwZW5kIiwiY2hpbGRyZW4iLCJub3JtYWxpemUiLCJsYXN0Iiwibm9kZSIsInByZXBlbmQiLCJyZXZlcnNlIiwiZmlyc3QiLCJ1bnNoaWZ0IiwiY2xlYW5SYXdzIiwia2VlcEJldHdlZW4iLCJpbnNlcnRCZWZvcmUiLCJleGlzdCIsImFkZCIsInNwbGljZSIsImluc2VydEFmdGVyIiwicmVtb3ZlQ2hpbGQiLCJyZW1vdmVBbGwiLCJyZXBsYWNlVmFsdWVzIiwicGF0dGVybiIsIm9wdHMiLCJwcm9wcyIsImluZGV4T2YiLCJkZWNsIiwiZmFzdCIsInZhbHVlIiwicmVwbGFjZSIsImV2ZXJ5IiwiY29uZGl0aW9uIiwic29tZSIsInNhbXBsZSIsInBhcnNlIiwicmVxdWlyZSIsIkFycmF5IiwiaXNBcnJheSIsInNsaWNlIiwiRXJyb3IiLCJTdHJpbmciLCJEZWNsYXJhdGlvbiIsIlJ1bGUiLCJBdFJ1bGUiLCJ0ZXh0IiwiQ29tbWVudCIsInByb2Nlc3NlZCIsImJlZm9yZSIsInJlYnVpbGQiLCJyYXdzIiwiZml4IiwiUm9vdCIsImoiLCJoYXNPd25Qcm9wZXJ0eSIsIk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsV0FBVCxDQUFxQkMsS0FBckIsRUFBNEI7QUFD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Zjs7Ozs7Ozs7QUFRQSIsImZpbGUiOiJjb250YWluZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgRGVjbGFyYXRpb24gZnJvbSAnLi9kZWNsYXJhdGlvbic7XG5pbXBvcnQgQ29tbWVudCAgICAgZnJvbSAnLi9jb21tZW50JztcbmltcG9ydCBOb2RlICAgICAgICBmcm9tICcuL25vZGUnO1xuXG5mdW5jdGlvbiBjbGVhblNvdXJjZShub2Rlcykge1xuICAgIHJldHVybiBub2Rlcy5tYXAoIGkgPT4ge1xuICAgICAgICBpZiAoIGkubm9kZXMgKSBpLm5vZGVzID0gY2xlYW5Tb3VyY2UoaS5ub2Rlcyk7XG4gICAgICAgIGRlbGV0ZSBpLnNvdXJjZTtcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgfSk7XG59XG5cbi8qKlxuICogVGhlIHtAbGluayBSb290fSwge0BsaW5rIEF0UnVsZX0sIGFuZCB7QGxpbmsgUnVsZX0gY29udGFpbmVyIG5vZGVzXG4gKiBpbmhlcml0IHNvbWUgY29tbW9uIG1ldGhvZHMgdG8gaGVscCB3b3JrIHdpdGggdGhlaXIgY2hpbGRyZW4uXG4gKlxuICogTm90ZSB0aGF0IGFsbCBjb250YWluZXJzIGNhbiBzdG9yZSBhbnkgY29udGVudC4gSWYgeW91IHdyaXRlIGEgcnVsZSBpbnNpZGVcbiAqIGEgcnVsZSwgUG9zdENTUyB3aWxsIHBhcnNlIGl0LlxuICpcbiAqIEBleHRlbmRzIE5vZGVcbiAqIEBhYnN0cmFjdFxuICovXG5jbGFzcyBDb250YWluZXIgZXh0ZW5kcyBOb2RlIHtcblxuICAgIHB1c2goY2hpbGQpIHtcbiAgICAgICAgY2hpbGQucGFyZW50ID0gdGhpcztcbiAgICAgICAgdGhpcy5ub2Rlcy5wdXNoKGNoaWxkKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSXRlcmF0ZXMgdGhyb3VnaCB0aGUgY29udGFpbmVy4oCZcyBpbW1lZGlhdGUgY2hpbGRyZW4sXG4gICAgICogY2FsbGluZyBgY2FsbGJhY2tgIGZvciBlYWNoIGNoaWxkLlxuICAgICAqXG4gICAgICogUmV0dXJuaW5nIGBmYWxzZWAgaW4gdGhlIGNhbGxiYWNrIHdpbGwgYnJlYWsgaXRlcmF0aW9uLlxuICAgICAqXG4gICAgICogVGhpcyBtZXRob2Qgb25seSBpdGVyYXRlcyB0aHJvdWdoIHRoZSBjb250YWluZXLigJlzIGltbWVkaWF0ZSBjaGlsZHJlbi5cbiAgICAgKiBJZiB5b3UgbmVlZCB0byByZWN1cnNpdmVseSBpdGVyYXRlIHRocm91Z2ggYWxsIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnRcbiAgICAgKiBub2RlcywgdXNlIHtAbGluayBDb250YWluZXIjd2Fsa30uXG4gICAgICpcbiAgICAgKiBVbmxpa2UgdGhlIGZvciBge31gLWN5Y2xlIG9yIGBBcnJheSNmb3JFYWNoYCB0aGlzIGl0ZXJhdG9yIGlzIHNhZmVcbiAgICAgKiBpZiB5b3UgYXJlIG11dGF0aW5nIHRoZSBhcnJheSBvZiBjaGlsZCBub2RlcyBkdXJpbmcgaXRlcmF0aW9uLlxuICAgICAqIFBvc3RDU1Mgd2lsbCBhZGp1c3QgdGhlIGN1cnJlbnQgaW5kZXggdG8gbWF0Y2ggdGhlIG11dGF0aW9ucy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Y2hpbGRJdGVyYXRvcn0gY2FsbGJhY2sgLSBpdGVyYXRvciByZWNlaXZlcyBlYWNoIG5vZGUgYW5kIGluZGV4XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IHJldHVybnMgYGZhbHNlYCBpZiBpdGVyYXRpb24gd2FzIGJyb2tlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHJvb3QgPSBwb3N0Y3NzLnBhcnNlKCdhIHsgY29sb3I6IGJsYWNrOyB6LWluZGV4OiAxIH0nKTtcbiAgICAgKiBjb25zdCBydWxlID0gcm9vdC5maXJzdDtcbiAgICAgKlxuICAgICAqIGZvciAoIGxldCBkZWNsIG9mIHJ1bGUubm9kZXMgKSB7XG4gICAgICogICAgIGRlY2wuY2xvbmVCZWZvcmUoeyBwcm9wOiAnLXdlYmtpdC0nICsgZGVjbC5wcm9wIH0pO1xuICAgICAqICAgICAvLyBDeWNsZSB3aWxsIGJlIGluZmluaXRlLCBiZWNhdXNlIGNsb25lQmVmb3JlIG1vdmVzIHRoZSBjdXJyZW50IG5vZGVcbiAgICAgKiAgICAgLy8gdG8gdGhlIG5leHQgaW5kZXhcbiAgICAgKiB9XG4gICAgICpcbiAgICAgKiBydWxlLmVhY2goZGVjbCA9PiB7XG4gICAgICogICAgIGRlY2wuY2xvbmVCZWZvcmUoeyBwcm9wOiAnLXdlYmtpdC0nICsgZGVjbC5wcm9wIH0pO1xuICAgICAqICAgICAvLyBXaWxsIGJlIGV4ZWN1dGVkIG9ubHkgZm9yIGNvbG9yIGFuZCB6LWluZGV4XG4gICAgICogfSk7XG4gICAgICovXG4gICAgZWFjaChjYWxsYmFjaykge1xuICAgICAgICBpZiAoICF0aGlzLmxhc3RFYWNoICkgdGhpcy5sYXN0RWFjaCA9IDA7XG4gICAgICAgIGlmICggIXRoaXMuaW5kZXhlcyApIHRoaXMuaW5kZXhlcyA9IHsgfTtcblxuICAgICAgICB0aGlzLmxhc3RFYWNoICs9IDE7XG4gICAgICAgIGxldCBpZCA9IHRoaXMubGFzdEVhY2g7XG4gICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSAwO1xuXG4gICAgICAgIGlmICggIXRoaXMubm9kZXMgKSByZXR1cm4gdW5kZWZpbmVkO1xuXG4gICAgICAgIGxldCBpbmRleCwgcmVzdWx0O1xuICAgICAgICB3aGlsZSAoIHRoaXMuaW5kZXhlc1tpZF0gPCB0aGlzLm5vZGVzLmxlbmd0aCApIHtcbiAgICAgICAgICAgIGluZGV4ICA9IHRoaXMuaW5kZXhlc1tpZF07XG4gICAgICAgICAgICByZXN1bHQgPSBjYWxsYmFjayh0aGlzLm5vZGVzW2luZGV4XSwgaW5kZXgpO1xuICAgICAgICAgICAgaWYgKCByZXN1bHQgPT09IGZhbHNlICkgYnJlYWs7XG5cbiAgICAgICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gKz0gMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRlbGV0ZSB0aGlzLmluZGV4ZXNbaWRdO1xuXG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVHJhdmVyc2VzIHRoZSBjb250YWluZXLigJlzIGRlc2NlbmRhbnQgbm9kZXMsIGNhbGxpbmcgY2FsbGJhY2tcbiAgICAgKiBmb3IgZWFjaCBub2RlLlxuICAgICAqXG4gICAgICogTGlrZSBjb250YWluZXIuZWFjaCgpLCB0aGlzIG1ldGhvZCBpcyBzYWZlIHRvIHVzZVxuICAgICAqIGlmIHlvdSBhcmUgbXV0YXRpbmcgYXJyYXlzIGR1cmluZyBpdGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBJZiB5b3Ugb25seSBuZWVkIHRvIGl0ZXJhdGUgdGhyb3VnaCB0aGUgY29udGFpbmVy4oCZcyBpbW1lZGlhdGUgY2hpbGRyZW4sXG4gICAgICogdXNlIHtAbGluayBDb250YWluZXIjZWFjaH0uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2NoaWxkSXRlcmF0b3J9IGNhbGxiYWNrIC0gaXRlcmF0b3IgcmVjZWl2ZXMgZWFjaCBub2RlIGFuZCBpbmRleFxuICAgICAqXG4gICAgICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSByZXR1cm5zIGBmYWxzZWAgaWYgaXRlcmF0aW9uIHdhcyBicm9rZVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByb290LndhbGsobm9kZSA9PiB7XG4gICAgICogICAvLyBUcmF2ZXJzZXMgYWxsIGRlc2NlbmRhbnQgbm9kZXMuXG4gICAgICogfSk7XG4gICAgICovXG4gICAgd2FsayhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy5lYWNoKCAoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgIGxldCByZXN1bHQgPSBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICBpZiAoIHJlc3VsdCAhPT0gZmFsc2UgJiYgY2hpbGQud2FsayApIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjaGlsZC53YWxrKGNhbGxiYWNrKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRyYXZlcnNlcyB0aGUgY29udGFpbmVy4oCZcyBkZXNjZW5kYW50IG5vZGVzLCBjYWxsaW5nIGNhbGxiYWNrXG4gICAgICogZm9yIGVhY2ggZGVjbGFyYXRpb24gbm9kZS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIGEgZmlsdGVyLCBpdGVyYXRpb24gd2lsbCBvbmx5IGhhcHBlbiBvdmVyIGRlY2xhcmF0aW9uc1xuICAgICAqIHdpdGggbWF0Y2hpbmcgcHJvcGVydGllcy5cbiAgICAgKlxuICAgICAqIExpa2Uge0BsaW5rIENvbnRhaW5lciNlYWNofSwgdGhpcyBtZXRob2QgaXMgc2FmZVxuICAgICAqIHRvIHVzZSBpZiB5b3UgYXJlIG11dGF0aW5nIGFycmF5cyBkdXJpbmcgaXRlcmF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd8UmVnRXhwfSBbcHJvcF0gICAtIHN0cmluZyBvciByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gZmlsdGVyIGRlY2xhcmF0aW9ucyBieSBwcm9wZXJ0eSBuYW1lXG4gICAgICogQHBhcmFtIHtjaGlsZEl0ZXJhdG9yfSBjYWxsYmFjayAtIGl0ZXJhdG9yIHJlY2VpdmVzIGVhY2ggbm9kZSBhbmQgaW5kZXhcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gcmV0dXJucyBgZmFsc2VgIGlmIGl0ZXJhdGlvbiB3YXMgYnJva2VcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcm9vdC53YWxrRGVjbHMoZGVjbCA9PiB7XG4gICAgICogICBjaGVja1Byb3BlcnR5U3VwcG9ydChkZWNsLnByb3ApO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogcm9vdC53YWxrRGVjbHMoJ2JvcmRlci1yYWRpdXMnLCBkZWNsID0+IHtcbiAgICAgKiAgIGRlY2wucmVtb3ZlKCk7XG4gICAgICogfSk7XG4gICAgICpcbiAgICAgKiByb290LndhbGtEZWNscygvXmJhY2tncm91bmQvLCBkZWNsID0+IHtcbiAgICAgKiAgIGRlY2wudmFsdWUgPSB0YWtlRmlyc3RDb2xvckZyb21HcmFkaWVudChkZWNsLnZhbHVlKTtcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICB3YWxrRGVjbHMocHJvcCwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCAhY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IHByb3A7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53YWxrKCAoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkLnR5cGUgPT09ICdkZWNsJyApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggcHJvcCBpbnN0YW5jZW9mIFJlZ0V4cCApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndhbGsoIChjaGlsZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICggY2hpbGQudHlwZSA9PT0gJ2RlY2wnICYmIHByb3AudGVzdChjaGlsZC5wcm9wKSApIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGNoaWxkLCBpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLndhbGsoIChjaGlsZCwgaSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICggY2hpbGQudHlwZSA9PT0gJ2RlY2wnICYmIGNoaWxkLnByb3AgPT09IHByb3AgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmF2ZXJzZXMgdGhlIGNvbnRhaW5lcuKAmXMgZGVzY2VuZGFudCBub2RlcywgY2FsbGluZyBjYWxsYmFja1xuICAgICAqIGZvciBlYWNoIHJ1bGUgbm9kZS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIGEgZmlsdGVyLCBpdGVyYXRpb24gd2lsbCBvbmx5IGhhcHBlbiBvdmVyIHJ1bGVzXG4gICAgICogd2l0aCBtYXRjaGluZyBzZWxlY3RvcnMuXG4gICAgICpcbiAgICAgKiBMaWtlIHtAbGluayBDb250YWluZXIjZWFjaH0sIHRoaXMgbWV0aG9kIGlzIHNhZmVcbiAgICAgKiB0byB1c2UgaWYgeW91IGFyZSBtdXRhdGluZyBhcnJheXMgZHVyaW5nIGl0ZXJhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cH0gW3NlbGVjdG9yXSAtIHN0cmluZyBvciByZWd1bGFyIGV4cHJlc3Npb25cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBmaWx0ZXIgcnVsZXMgYnkgc2VsZWN0b3JcbiAgICAgKiBAcGFyYW0ge2NoaWxkSXRlcmF0b3J9IGNhbGxiYWNrICAgLSBpdGVyYXRvciByZWNlaXZlcyBlYWNoIG5vZGUgYW5kIGluZGV4XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IHJldHVybnMgYGZhbHNlYCBpZiBpdGVyYXRpb24gd2FzIGJyb2tlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IHNlbGVjdG9ycyA9IFtdO1xuICAgICAqIHJvb3Qud2Fsa1J1bGVzKHJ1bGUgPT4ge1xuICAgICAqICAgc2VsZWN0b3JzLnB1c2gocnVsZS5zZWxlY3Rvcik7XG4gICAgICogfSk7XG4gICAgICogY29uc29sZS5sb2coYFlvdXIgQ1NTIHVzZXMgJHtzZWxlY3RvcnMubGVuZ3RofSBzZWxlY3RvcnNgKTtcbiAgICAgKi9cbiAgICB3YWxrUnVsZXMoc2VsZWN0b3IsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICggIWNhbGxiYWNrICkge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBzZWxlY3RvcjtcblxuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2FsayggKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZC50eXBlID09PSAncnVsZScgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHNlbGVjdG9yIGluc3RhbmNlb2YgUmVnRXhwICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2FsayggKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZC50eXBlID09PSAncnVsZScgJiYgc2VsZWN0b3IudGVzdChjaGlsZC5zZWxlY3RvcikgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53YWxrKCAoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkLnR5cGUgPT09ICdydWxlJyAmJiBjaGlsZC5zZWxlY3RvciA9PT0gc2VsZWN0b3IgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmF2ZXJzZXMgdGhlIGNvbnRhaW5lcuKAmXMgZGVzY2VuZGFudCBub2RlcywgY2FsbGluZyBjYWxsYmFja1xuICAgICAqIGZvciBlYWNoIGF0LXJ1bGUgbm9kZS5cbiAgICAgKlxuICAgICAqIElmIHlvdSBwYXNzIGEgZmlsdGVyLCBpdGVyYXRpb24gd2lsbCBvbmx5IGhhcHBlbiBvdmVyIGF0LXJ1bGVzXG4gICAgICogdGhhdCBoYXZlIG1hdGNoaW5nIG5hbWVzLlxuICAgICAqXG4gICAgICogTGlrZSB7QGxpbmsgQ29udGFpbmVyI2VhY2h9LCB0aGlzIG1ldGhvZCBpcyBzYWZlXG4gICAgICogdG8gdXNlIGlmIHlvdSBhcmUgbXV0YXRpbmcgYXJyYXlzIGR1cmluZyBpdGVyYXRpb24uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xSZWdFeHB9IFtuYW1lXSAgIC0gc3RyaW5nIG9yIHJlZ3VsYXIgZXhwcmVzc2lvblxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0byBmaWx0ZXIgYXQtcnVsZXMgYnkgbmFtZVxuICAgICAqIEBwYXJhbSB7Y2hpbGRJdGVyYXRvcn0gY2FsbGJhY2sgLSBpdGVyYXRvciByZWNlaXZlcyBlYWNoIG5vZGUgYW5kIGluZGV4XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtmYWxzZXx1bmRlZmluZWR9IHJldHVybnMgYGZhbHNlYCBpZiBpdGVyYXRpb24gd2FzIGJyb2tlXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJvb3Qud2Fsa0F0UnVsZXMocnVsZSA9PiB7XG4gICAgICogICBpZiAoIGlzT2xkKHJ1bGUubmFtZSkgKSBydWxlLnJlbW92ZSgpO1xuICAgICAqIH0pO1xuICAgICAqXG4gICAgICogbGV0IGZpcnN0ID0gZmFsc2U7XG4gICAgICogcm9vdC53YWxrQXRSdWxlcygnY2hhcnNldCcsIHJ1bGUgPT4ge1xuICAgICAqICAgaWYgKCAhZmlyc3QgKSB7XG4gICAgICogICAgIGZpcnN0ID0gdHJ1ZTtcbiAgICAgKiAgIH0gZWxzZSB7XG4gICAgICogICAgIHJ1bGUucmVtb3ZlKCk7XG4gICAgICogICB9XG4gICAgICogfSk7XG4gICAgICovXG4gICAgd2Fsa0F0UnVsZXMobmFtZSwgY2FsbGJhY2spIHtcbiAgICAgICAgaWYgKCAhY2FsbGJhY2sgKSB7XG4gICAgICAgICAgICBjYWxsYmFjayA9IG5hbWU7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53YWxrKCAoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkLnR5cGUgPT09ICdhdHJ1bGUnICkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gY2FsbGJhY2soY2hpbGQsIGkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCBuYW1lIGluc3RhbmNlb2YgUmVnRXhwICkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMud2FsayggKGNoaWxkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCBjaGlsZC50eXBlID09PSAnYXRydWxlJyAmJiBuYW1lLnRlc3QoY2hpbGQubmFtZSkgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy53YWxrKCAoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoIGNoaWxkLnR5cGUgPT09ICdhdHJ1bGUnICYmIGNoaWxkLm5hbWUgPT09IG5hbWUgKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUcmF2ZXJzZXMgdGhlIGNvbnRhaW5lcuKAmXMgZGVzY2VuZGFudCBub2RlcywgY2FsbGluZyBjYWxsYmFja1xuICAgICAqIGZvciBlYWNoIGNvbW1lbnQgbm9kZS5cbiAgICAgKlxuICAgICAqIExpa2Uge0BsaW5rIENvbnRhaW5lciNlYWNofSwgdGhpcyBtZXRob2QgaXMgc2FmZVxuICAgICAqIHRvIHVzZSBpZiB5b3UgYXJlIG11dGF0aW5nIGFycmF5cyBkdXJpbmcgaXRlcmF0aW9uLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtjaGlsZEl0ZXJhdG9yfSBjYWxsYmFjayAtIGl0ZXJhdG9yIHJlY2VpdmVzIGVhY2ggbm9kZSBhbmQgaW5kZXhcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge2ZhbHNlfHVuZGVmaW5lZH0gcmV0dXJucyBgZmFsc2VgIGlmIGl0ZXJhdGlvbiB3YXMgYnJva2VcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcm9vdC53YWxrQ29tbWVudHMoY29tbWVudCA9PiB7XG4gICAgICogICBjb21tZW50LnJlbW92ZSgpO1xuICAgICAqIH0pO1xuICAgICAqL1xuICAgIHdhbGtDb21tZW50cyhjYWxsYmFjaykge1xuICAgICAgICByZXR1cm4gdGhpcy53YWxrKCAoY2hpbGQsIGkpID0+IHtcbiAgICAgICAgICAgIGlmICggY2hpbGQudHlwZSA9PT0gJ2NvbW1lbnQnICkge1xuICAgICAgICAgICAgICAgIHJldHVybiBjYWxsYmFjayhjaGlsZCwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgbmV3IG5vZGVzIHRvIHRoZSBlbmQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uKE5vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW10pfSBjaGlsZHJlbiAtIG5ldyBub2Rlc1xuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gdGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGRlY2wxID0gcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSk7XG4gICAgICogY29uc3QgZGVjbDIgPSBwb3N0Y3NzLmRlY2woeyBwcm9wOiAnYmFja2dyb3VuZC1jb2xvcicsIHZhbHVlOiAnd2hpdGUnIH0pO1xuICAgICAqIHJ1bGUuYXBwZW5kKGRlY2wxLCBkZWNsMik7XG4gICAgICpcbiAgICAgKiByb290LmFwcGVuZCh7IG5hbWU6ICdjaGFyc2V0JywgcGFyYW1zOiAnXCJVVEYtOFwiJyB9KTsgIC8vIGF0LXJ1bGVcbiAgICAgKiByb290LmFwcGVuZCh7IHNlbGVjdG9yOiAnYScgfSk7ICAgICAgICAgICAgICAgICAgICAgICAvLyBydWxlXG4gICAgICogcnVsZS5hcHBlbmQoeyBwcm9wOiAnY29sb3InLCB2YWx1ZTogJ2JsYWNrJyB9KTsgICAgICAgLy8gZGVjbGFyYXRpb25cbiAgICAgKiBydWxlLmFwcGVuZCh7IHRleHQ6ICdDb21tZW50JyB9KSAgICAgICAgICAgICAgICAgICAgICAvLyBjb21tZW50XG4gICAgICpcbiAgICAgKiByb290LmFwcGVuZCgnYSB7fScpO1xuICAgICAqIHJvb3QuZmlyc3QuYXBwZW5kKCdjb2xvcjogYmxhY2s7IHotaW5kZXg6IDEnKTtcbiAgICAgKi9cbiAgICBhcHBlbmQoLi4uY2hpbGRyZW4pIHtcbiAgICAgICAgZm9yICggbGV0IGNoaWxkIG9mIGNoaWxkcmVuICkge1xuICAgICAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoY2hpbGQsIHRoaXMubGFzdCk7XG4gICAgICAgICAgICBmb3IgKCBsZXQgbm9kZSBvZiBub2RlcyApIHRoaXMubm9kZXMucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJbnNlcnRzIG5ldyBub2RlcyB0byB0aGUgc3RhcnQgb2YgdGhlIGNvbnRhaW5lci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Li4uKE5vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW10pfSBjaGlsZHJlbiAtIG5ldyBub2Rlc1xuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gdGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGRlY2wxID0gcG9zdGNzcy5kZWNsKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSk7XG4gICAgICogY29uc3QgZGVjbDIgPSBwb3N0Y3NzLmRlY2woeyBwcm9wOiAnYmFja2dyb3VuZC1jb2xvcicsIHZhbHVlOiAnd2hpdGUnIH0pO1xuICAgICAqIHJ1bGUucHJlcGVuZChkZWNsMSwgZGVjbDIpO1xuICAgICAqXG4gICAgICogcm9vdC5hcHBlbmQoeyBuYW1lOiAnY2hhcnNldCcsIHBhcmFtczogJ1wiVVRGLThcIicgfSk7ICAvLyBhdC1ydWxlXG4gICAgICogcm9vdC5hcHBlbmQoeyBzZWxlY3RvcjogJ2EnIH0pOyAgICAgICAgICAgICAgICAgICAgICAgLy8gcnVsZVxuICAgICAqIHJ1bGUuYXBwZW5kKHsgcHJvcDogJ2NvbG9yJywgdmFsdWU6ICdibGFjaycgfSk7ICAgICAgIC8vIGRlY2xhcmF0aW9uXG4gICAgICogcnVsZS5hcHBlbmQoeyB0ZXh0OiAnQ29tbWVudCcgfSkgICAgICAgICAgICAgICAgICAgICAgLy8gY29tbWVudFxuICAgICAqXG4gICAgICogcm9vdC5hcHBlbmQoJ2Ege30nKTtcbiAgICAgKiByb290LmZpcnN0LmFwcGVuZCgnY29sb3I6IGJsYWNrOyB6LWluZGV4OiAxJyk7XG4gICAgICovXG4gICAgcHJlcGVuZCguLi5jaGlsZHJlbikge1xuICAgICAgICBjaGlsZHJlbiA9IGNoaWxkcmVuLnJldmVyc2UoKTtcbiAgICAgICAgZm9yICggbGV0IGNoaWxkIG9mIGNoaWxkcmVuICkge1xuICAgICAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoY2hpbGQsIHRoaXMuZmlyc3QsICdwcmVwZW5kJykucmV2ZXJzZSgpO1xuICAgICAgICAgICAgZm9yICggbGV0IG5vZGUgb2Ygbm9kZXMgKSB0aGlzLm5vZGVzLnVuc2hpZnQobm9kZSk7XG4gICAgICAgICAgICBmb3IgKCBsZXQgaWQgaW4gdGhpcy5pbmRleGVzICkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSB0aGlzLmluZGV4ZXNbaWRdICsgbm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIGNsZWFuUmF3cyhrZWVwQmV0d2Vlbikge1xuICAgICAgICBzdXBlci5jbGVhblJhd3Moa2VlcEJldHdlZW4pO1xuICAgICAgICBpZiAoIHRoaXMubm9kZXMgKSB7XG4gICAgICAgICAgICBmb3IgKCBsZXQgbm9kZSBvZiB0aGlzLm5vZGVzICkgbm9kZS5jbGVhblJhd3Moa2VlcEJldHdlZW4pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IG5ldyBub2RlIGJlZm9yZSBvbGQgbm9kZSB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7Tm9kZXxudW1iZXJ9IGV4aXN0ICAgICAgICAgICAgIC0gY2hpbGQgb3IgY2hpbGTigJlzIGluZGV4LlxuICAgICAqIEBwYXJhbSB7Tm9kZXxvYmplY3R8c3RyaW5nfE5vZGVbXX0gYWRkIC0gbmV3IG5vZGVcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IHRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpblxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBydWxlLmluc2VydEJlZm9yZShkZWNsLCBkZWNsLmNsb25lKHsgcHJvcDogJy13ZWJraXQtJyArIGRlY2wucHJvcCB9KSk7XG4gICAgICovXG4gICAgaW5zZXJ0QmVmb3JlKGV4aXN0LCBhZGQpIHtcbiAgICAgICAgZXhpc3QgPSB0aGlzLmluZGV4KGV4aXN0KTtcblxuICAgICAgICBsZXQgdHlwZSAgPSBleGlzdCA9PT0gMCA/ICdwcmVwZW5kJyA6IGZhbHNlO1xuICAgICAgICBsZXQgbm9kZXMgPSB0aGlzLm5vcm1hbGl6ZShhZGQsIHRoaXMubm9kZXNbZXhpc3RdLCB0eXBlKS5yZXZlcnNlKCk7XG4gICAgICAgIGZvciAoIGxldCBub2RlIG9mIG5vZGVzICkgdGhpcy5ub2Rlcy5zcGxpY2UoZXhpc3QsIDAsIG5vZGUpO1xuXG4gICAgICAgIGxldCBpbmRleDtcbiAgICAgICAgZm9yICggbGV0IGlkIGluIHRoaXMuaW5kZXhlcyApIHtcbiAgICAgICAgICAgIGluZGV4ID0gdGhpcy5pbmRleGVzW2lkXTtcbiAgICAgICAgICAgIGlmICggZXhpc3QgPD0gaW5kZXggKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pbmRleGVzW2lkXSA9IGluZGV4ICsgbm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0IG5ldyBub2RlIGFmdGVyIG9sZCBub2RlIHdpdGhpbiB0aGUgY29udGFpbmVyLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtOb2RlfG51bWJlcn0gZXhpc3QgICAgICAgICAgICAgLSBjaGlsZCBvciBjaGlsZOKAmXMgaW5kZXhcbiAgICAgKiBAcGFyYW0ge05vZGV8b2JqZWN0fHN0cmluZ3xOb2RlW119IGFkZCAtIG5ldyBub2RlXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtOb2RlfSB0aGlzIG5vZGUgZm9yIG1ldGhvZHMgY2hhaW5cbiAgICAgKi9cbiAgICBpbnNlcnRBZnRlcihleGlzdCwgYWRkKSB7XG4gICAgICAgIGV4aXN0ID0gdGhpcy5pbmRleChleGlzdCk7XG5cbiAgICAgICAgbGV0IG5vZGVzID0gdGhpcy5ub3JtYWxpemUoYWRkLCB0aGlzLm5vZGVzW2V4aXN0XSkucmV2ZXJzZSgpO1xuICAgICAgICBmb3IgKCBsZXQgbm9kZSBvZiBub2RlcyApIHRoaXMubm9kZXMuc3BsaWNlKGV4aXN0ICsgMSwgMCwgbm9kZSk7XG5cbiAgICAgICAgbGV0IGluZGV4O1xuICAgICAgICBmb3IgKCBsZXQgaWQgaW4gdGhpcy5pbmRleGVzICkge1xuICAgICAgICAgICAgaW5kZXggPSB0aGlzLmluZGV4ZXNbaWRdO1xuICAgICAgICAgICAgaWYgKCBleGlzdCA8IGluZGV4ICkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCArIG5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlbW92ZXMgbm9kZSBmcm9tIHRoZSBjb250YWluZXIgYW5kIGNsZWFucyB0aGUgcGFyZW50IHByb3BlcnRpZXNcbiAgICAgKiBmcm9tIHRoZSBub2RlIGFuZCBpdHMgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV8bnVtYmVyfSBjaGlsZCAtIGNoaWxkIG9yIGNoaWxk4oCZcyBpbmRleFxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gdGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJ1bGUubm9kZXMubGVuZ3RoICAvLz0+IDVcbiAgICAgKiBydWxlLnJlbW92ZUNoaWxkKGRlY2wpO1xuICAgICAqIHJ1bGUubm9kZXMubGVuZ3RoICAvLz0+IDRcbiAgICAgKiBkZWNsLnBhcmVudCAgICAgICAgLy89PiB1bmRlZmluZWRcbiAgICAgKi9cbiAgICByZW1vdmVDaGlsZChjaGlsZCkge1xuICAgICAgICBjaGlsZCA9IHRoaXMuaW5kZXgoY2hpbGQpO1xuICAgICAgICB0aGlzLm5vZGVzW2NoaWxkXS5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubm9kZXMuc3BsaWNlKGNoaWxkLCAxKTtcblxuICAgICAgICBsZXQgaW5kZXg7XG4gICAgICAgIGZvciAoIGxldCBpZCBpbiB0aGlzLmluZGV4ZXMgKSB7XG4gICAgICAgICAgICBpbmRleCA9IHRoaXMuaW5kZXhlc1tpZF07XG4gICAgICAgICAgICBpZiAoIGluZGV4ID49IGNoaWxkICkge1xuICAgICAgICAgICAgICAgIHRoaXMuaW5kZXhlc1tpZF0gPSBpbmRleCAtIDE7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIGFsbCBjaGlsZHJlbiBmcm9tIHRoZSBjb250YWluZXJcbiAgICAgKiBhbmQgY2xlYW5zIHRoZWlyIHBhcmVudCBwcm9wZXJ0aWVzLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Tm9kZX0gdGhpcyBub2RlIGZvciBtZXRob2RzIGNoYWluXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHJ1bGUucmVtb3ZlQWxsKCk7XG4gICAgICogcnVsZS5ub2Rlcy5sZW5ndGggLy89PiAwXG4gICAgICovXG4gICAgcmVtb3ZlQWxsKCkge1xuICAgICAgICBmb3IgKCBsZXQgbm9kZSBvZiB0aGlzLm5vZGVzICkgbm9kZS5wYXJlbnQgPSB1bmRlZmluZWQ7XG4gICAgICAgIHRoaXMubm9kZXMgPSBbXTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGFzc2VzIGFsbCBkZWNsYXJhdGlvbiB2YWx1ZXMgd2l0aGluIHRoZSBjb250YWluZXIgdGhhdCBtYXRjaCBwYXR0ZXJuXG4gICAgICogdGhyb3VnaCBjYWxsYmFjaywgcmVwbGFjaW5nIHRob3NlIHZhbHVlcyB3aXRoIHRoZSByZXR1cm5lZCByZXN1bHRcbiAgICAgKiBvZiBjYWxsYmFjay5cbiAgICAgKlxuICAgICAqIFRoaXMgbWV0aG9kIGlzIHVzZWZ1bCBpZiB5b3UgYXJlIHVzaW5nIGEgY3VzdG9tIHVuaXQgb3IgZnVuY3Rpb25cbiAgICAgKiBhbmQgbmVlZCB0byBpdGVyYXRlIHRocm91Z2ggYWxsIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfFJlZ0V4cH0gcGF0dGVybiAgICAgIC0gcmVwbGFjZSBwYXR0ZXJuXG4gICAgICogQHBhcmFtIHtvYmplY3R9IG9wdHMgICAgICAgICAgICAgICAgLSBvcHRpb25zIHRvIHNwZWVkIHVwIHRoZSBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge3N0cmluZ3xzdHJpbmdbXX0gb3B0cy5wcm9wcyAtIGFuIGFycmF5IG9mIHByb3BlcnR5IG5hbWVzXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMuZmFzdCAgICAgICAgICAgLSBzdHJpbmcgdGhhdOKAmXMgdXNlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gbmFycm93IGRvd24gdmFsdWVzIGFuZCBzcGVlZCB1cFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhlIHJlZ2V4cCBzZWFyY2hcbiAgICAgKiBAcGFyYW0ge2Z1bmN0aW9ufHN0cmluZ30gY2FsbGJhY2sgICAtIHN0cmluZyB0byByZXBsYWNlIHBhdHRlcm5cbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9yIGNhbGxiYWNrIHRoYXQgcmV0dXJucyBhIG5ld1xuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWUuXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBUaGUgY2FsbGJhY2sgd2lsbCByZWNlaXZlXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGUgc2FtZSBhcmd1bWVudHMgYXMgdGhvc2VcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhc3NlZCB0byBhIGZ1bmN0aW9uIHBhcmFtZXRlclxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2YgYFN0cmluZyNyZXBsYWNlYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge05vZGV9IHRoaXMgbm9kZSBmb3IgbWV0aG9kcyBjaGFpblxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiByb290LnJlcGxhY2VWYWx1ZXMoL1xcZCtyZW0vLCB7IGZhc3Q6ICdyZW0nIH0sIHN0cmluZyA9PiB7XG4gICAgICogICByZXR1cm4gMTUgKiBwYXJzZUludChzdHJpbmcpICsgJ3B4JztcbiAgICAgKiB9KTtcbiAgICAgKi9cbiAgICByZXBsYWNlVmFsdWVzKHBhdHRlcm4sIG9wdHMsIGNhbGxiYWNrKSB7XG4gICAgICAgIGlmICggIWNhbGxiYWNrICkge1xuICAgICAgICAgICAgY2FsbGJhY2sgPSBvcHRzO1xuICAgICAgICAgICAgb3B0cyA9IHsgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMud2Fsa0RlY2xzKCBkZWNsID0+IHtcbiAgICAgICAgICAgIGlmICggb3B0cy5wcm9wcyAmJiBvcHRzLnByb3BzLmluZGV4T2YoZGVjbC5wcm9wKSA9PT0gLTEgKSByZXR1cm47XG4gICAgICAgICAgICBpZiAoIG9wdHMuZmFzdCAgJiYgZGVjbC52YWx1ZS5pbmRleE9mKG9wdHMuZmFzdCkgPT09IC0xICkgcmV0dXJuO1xuXG4gICAgICAgICAgICBkZWNsLnZhbHVlID0gZGVjbC52YWx1ZS5yZXBsYWNlKHBhdHRlcm4sIGNhbGxiYWNrKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWBcbiAgICAgKiBmb3IgYWxsIG9mIHRoZSBjb250YWluZXLigJlzIGNoaWxkcmVuLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtjaGlsZENvbmRpdGlvbn0gY29uZGl0aW9uIC0gaXRlcmF0b3IgcmV0dXJucyB0cnVlIG9yIGZhbHNlLlxuICAgICAqXG4gICAgICogQHJldHVybiB7Ym9vbGVhbn0gaXMgZXZlcnkgY2hpbGQgcGFzcyBjb25kaXRpb25cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgbm9QcmVmaXhlcyA9IHJ1bGUuZXZlcnkoaSA9PiBpLnByb3BbMF0gIT09ICctJyk7XG4gICAgICovXG4gICAgZXZlcnkoY29uZGl0aW9uKSB7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzLmV2ZXJ5KGNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgY2FsbGJhY2sgcmV0dXJucyBgdHJ1ZWAgZm9yIChhdCBsZWFzdCkgb25lXG4gICAgICogb2YgdGhlIGNvbnRhaW5lcuKAmXMgY2hpbGRyZW4uXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge2NoaWxkQ29uZGl0aW9ufSBjb25kaXRpb24gLSBpdGVyYXRvciByZXR1cm5zIHRydWUgb3IgZmFsc2UuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtib29sZWFufSBpcyBzb21lIGNoaWxkIHBhc3MgY29uZGl0aW9uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIGNvbnN0IGhhc1ByZWZpeCA9IHJ1bGUuc29tZShpID0+IGkucHJvcFswXSA9PT0gJy0nKTtcbiAgICAgKi9cbiAgICBzb21lKGNvbmRpdGlvbikge1xuICAgICAgICByZXR1cm4gdGhpcy5ub2Rlcy5zb21lKGNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGBjaGlsZGDigJlzIGluZGV4IHdpdGhpbiB0aGUge0BsaW5rIENvbnRhaW5lciNub2Rlc30gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge05vZGV9IGNoaWxkIC0gY2hpbGQgb2YgdGhlIGN1cnJlbnQgY29udGFpbmVyLlxuICAgICAqXG4gICAgICogQHJldHVybiB7bnVtYmVyfSBjaGlsZCBpbmRleFxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBydWxlLmluZGV4KCBydWxlLm5vZGVzWzJdICkgLy89PiAyXG4gICAgICovXG4gICAgaW5kZXgoY2hpbGQpIHtcbiAgICAgICAgaWYgKCB0eXBlb2YgY2hpbGQgPT09ICdudW1iZXInICkge1xuICAgICAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMubm9kZXMuaW5kZXhPZihjaGlsZCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGUgY29udGFpbmVy4oCZcyBmaXJzdCBjaGlsZC5cbiAgICAgKlxuICAgICAqIEB0eXBlIHtOb2RlfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBydWxlLmZpcnN0ID09IHJ1bGVzLm5vZGVzWzBdO1xuICAgICAqL1xuICAgIGdldCBmaXJzdCgpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5ub2RlcyApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzWzBdO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFRoZSBjb250YWluZXLigJlzIGxhc3QgY2hpbGQuXG4gICAgICpcbiAgICAgKiBAdHlwZSB7Tm9kZX1cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcnVsZS5sYXN0ID09IHJ1bGUubm9kZXNbcnVsZS5ub2Rlcy5sZW5ndGggLSAxXTtcbiAgICAgKi9cbiAgICBnZXQgbGFzdCgpIHtcbiAgICAgICAgaWYgKCAhdGhpcy5ub2RlcyApIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiB0aGlzLm5vZGVzW3RoaXMubm9kZXMubGVuZ3RoIC0gMV07XG4gICAgfVxuXG4gICAgbm9ybWFsaXplKG5vZGVzLCBzYW1wbGUpIHtcbiAgICAgICAgaWYgKCB0eXBlb2Ygbm9kZXMgPT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgbGV0IHBhcnNlID0gcmVxdWlyZSgnLi9wYXJzZScpO1xuICAgICAgICAgICAgbm9kZXMgPSBjbGVhblNvdXJjZShwYXJzZShub2Rlcykubm9kZXMpO1xuICAgICAgICB9IGVsc2UgaWYgKCBBcnJheS5pc0FycmF5KG5vZGVzKSApIHtcbiAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuc2xpY2UoMCk7XG4gICAgICAgICAgICBmb3IgKCBsZXQgaSBvZiBub2RlcyApIHtcbiAgICAgICAgICAgICAgICBpZiAoIGkucGFyZW50ICkgaS5wYXJlbnQucmVtb3ZlQ2hpbGQoaSwgJ2lnbm9yZScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKCBub2Rlcy50eXBlID09PSAncm9vdCcgKSB7XG4gICAgICAgICAgICBub2RlcyA9IG5vZGVzLm5vZGVzLnNsaWNlKDApO1xuICAgICAgICAgICAgZm9yICggbGV0IGkgb2Ygbm9kZXMgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBpLnBhcmVudCApIGkucGFyZW50LnJlbW92ZUNoaWxkKGksICdpZ25vcmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICggbm9kZXMudHlwZSApIHtcbiAgICAgICAgICAgIG5vZGVzID0gW25vZGVzXTtcbiAgICAgICAgfSBlbHNlIGlmICggbm9kZXMucHJvcCApIHtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIG5vZGVzLnZhbHVlID09PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1ZhbHVlIGZpZWxkIGlzIG1pc3NlZCBpbiBub2RlIGNyZWF0aW9uJyk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0eXBlb2Ygbm9kZXMudmFsdWUgIT09ICdzdHJpbmcnICkge1xuICAgICAgICAgICAgICAgIG5vZGVzLnZhbHVlID0gU3RyaW5nKG5vZGVzLnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIG5vZGVzID0gW25ldyBEZWNsYXJhdGlvbihub2RlcyldO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2Rlcy5zZWxlY3RvciApIHtcbiAgICAgICAgICAgIGxldCBSdWxlID0gcmVxdWlyZSgnLi9ydWxlJyk7XG4gICAgICAgICAgICBub2RlcyA9IFtuZXcgUnVsZShub2RlcyldO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2Rlcy5uYW1lICkge1xuICAgICAgICAgICAgbGV0IEF0UnVsZSA9IHJlcXVpcmUoJy4vYXQtcnVsZScpO1xuICAgICAgICAgICAgbm9kZXMgPSBbbmV3IEF0UnVsZShub2RlcyldO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2Rlcy50ZXh0ICkge1xuICAgICAgICAgICAgbm9kZXMgPSBbbmV3IENvbW1lbnQobm9kZXMpXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBub2RlIHR5cGUgaW4gbm9kZSBjcmVhdGlvbicpO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHByb2Nlc3NlZCA9IG5vZGVzLm1hcCggaSA9PiB7XG4gICAgICAgICAgICBpZiAoIHR5cGVvZiBpLmJlZm9yZSAhPT0gJ2Z1bmN0aW9uJyApIGkgPSB0aGlzLnJlYnVpbGQoaSk7XG5cbiAgICAgICAgICAgIGlmICggaS5wYXJlbnQgKSBpLnBhcmVudC5yZW1vdmVDaGlsZChpKTtcbiAgICAgICAgICAgIGlmICggdHlwZW9mIGkucmF3cy5iZWZvcmUgPT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgIGlmICggc2FtcGxlICYmIHR5cGVvZiBzYW1wbGUucmF3cy5iZWZvcmUgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgICAgICAgICBpLnJhd3MuYmVmb3JlID0gc2FtcGxlLnJhd3MuYmVmb3JlLnJlcGxhY2UoL1teXFxzXS9nLCAnJyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaS5wYXJlbnQgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIGk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBwcm9jZXNzZWQ7XG4gICAgfVxuXG4gICAgcmVidWlsZChub2RlLCBwYXJlbnQpIHtcbiAgICAgICAgbGV0IGZpeDtcbiAgICAgICAgaWYgKCBub2RlLnR5cGUgPT09ICdyb290JyApIHtcbiAgICAgICAgICAgIGxldCBSb290ID0gcmVxdWlyZSgnLi9yb290Jyk7XG4gICAgICAgICAgICBmaXggPSBuZXcgUm9vdCgpO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2RlLnR5cGUgPT09ICdhdHJ1bGUnICkge1xuICAgICAgICAgICAgbGV0IEF0UnVsZSA9IHJlcXVpcmUoJy4vYXQtcnVsZScpO1xuICAgICAgICAgICAgZml4ID0gbmV3IEF0UnVsZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2RlLnR5cGUgPT09ICdydWxlJyApIHtcbiAgICAgICAgICAgIGxldCBSdWxlID0gcmVxdWlyZSgnLi9ydWxlJyk7XG4gICAgICAgICAgICBmaXggPSBuZXcgUnVsZSgpO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2RlLnR5cGUgPT09ICdkZWNsJyApIHtcbiAgICAgICAgICAgIGZpeCA9IG5ldyBEZWNsYXJhdGlvbigpO1xuICAgICAgICB9IGVsc2UgaWYgKCBub2RlLnR5cGUgPT09ICdjb21tZW50JyApIHtcbiAgICAgICAgICAgIGZpeCA9IG5ldyBDb21tZW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKCBsZXQgaSBpbiBub2RlICkge1xuICAgICAgICAgICAgaWYgKCBpID09PSAnbm9kZXMnICkge1xuICAgICAgICAgICAgICAgIGZpeC5ub2RlcyA9IG5vZGUubm9kZXMubWFwKCBqID0+IHRoaXMucmVidWlsZChqLCBmaXgpICk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCBpID09PSAncGFyZW50JyAmJiBwYXJlbnQgKSB7XG4gICAgICAgICAgICAgICAgZml4LnBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIG5vZGUuaGFzT3duUHJvcGVydHkoaSkgKSB7XG4gICAgICAgICAgICAgICAgZml4W2ldID0gbm9kZVtpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmaXg7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIENvbnRhaW5lciNcbiAgICAgKiBAbWVtYmVyIHtOb2RlW119IG5vZGVzIC0gYW4gYXJyYXkgY29udGFpbmluZyB0aGUgY29udGFpbmVy4oCZcyBjaGlsZHJlblxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7IGNvbG9yOiBibGFjayB9Jyk7XG4gICAgICogcm9vdC5ub2Rlcy5sZW5ndGggICAgICAgICAgIC8vPT4gMVxuICAgICAqIHJvb3Qubm9kZXNbMF0uc2VsZWN0b3IgICAgICAvLz0+ICdhJ1xuICAgICAqIHJvb3Qubm9kZXNbMF0ubm9kZXNbMF0ucHJvcCAvLz0+ICdjb2xvcidcbiAgICAgKi9cblxufVxuXG5leHBvcnQgZGVmYXVsdCBDb250YWluZXI7XG5cblxuLyoqXG4gKiBAY2FsbGJhY2sgY2hpbGRDb25kaXRpb25cbiAqIEBwYXJhbSB7Tm9kZX0gbm9kZSAgICAtIGNvbnRhaW5lciBjaGlsZFxuICogQHBhcmFtIHtudW1iZXJ9IGluZGV4IC0gY2hpbGQgaW5kZXhcbiAqIEBwYXJhbSB7Tm9kZVtdfSBub2RlcyAtIGFsbCBjb250YWluZXIgY2hpbGRyZW5cbiAqIEByZXR1cm4ge2Jvb2xlYW59XG4gKi9cblxuLyoqXG4gKiBAY2FsbGJhY2sgY2hpbGRJdGVyYXRvclxuICogQHBhcmFtIHtOb2RlfSBub2RlICAgIC0gY29udGFpbmVyIGNoaWxkXG4gKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBjaGlsZCBpbmRleFxuICogQHJldHVybiB7ZmFsc2V8dW5kZWZpbmVkfSByZXR1cm5pbmcgYGZhbHNlYCB3aWxsIGJyZWFrIGl0ZXJhdGlvblxuICovXG4iXX0=

}, function(modId) { var map = {"./declaration":1625038544318,"./comment":1625038544335,"./node":1625038544319,"./parse":1625038544333,"./rule":1625038544338,"./at-rule":1625038544336,"./root":1625038544340}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544338, function(require, module, exports) {


exports.__esModule = true;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _list = require('./list');

var _list2 = _interopRequireDefault(_list);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a CSS rule: a selector followed by a declaration block.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{}');
 * const rule = root.first;
 * rule.type       //=> 'rule'
 * rule.toString() //=> 'a{}'
 */
var Rule = function (_Container) {
  _inherits(Rule, _Container);

  function Rule(defaults) {
    _classCallCheck(this, Rule);

    var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

    _this.type = 'rule';
    if (!_this.nodes) _this.nodes = [];
    return _this;
  }

  /**
   * An array containing the rule’s individual selectors.
   * Groups of selectors are split at commas.
   *
   * @type {string[]}
   *
   * @example
   * const root = postcss.parse('a, b { }');
   * const rule = root.first;
   *
   * rule.selector  //=> 'a, b'
   * rule.selectors //=> ['a', 'b']
   *
   * rule.selectors = ['a', 'strong'];
   * rule.selector //=> 'a, strong'
   */


  _createClass(Rule, [{
    key: 'selectors',
    get: function get() {
      return _list2.default.comma(this.selector);
    },
    set: function set(values) {
      var match = this.selector ? this.selector.match(/,\s*/) : null;
      var sep = match ? match[0] : ',' + this.raw('between', 'beforeOpen');
      this.selector = values.join(sep);
    }

    /**
     * @memberof Rule#
     * @member {string} selector - the rule’s full selector represented
     *                             as a string
     *
     * @example
     * const root = postcss.parse('a, b { }');
     * const rule = root.first;
     * rule.selector //=> 'a, b'
     */

    /**
     * @memberof Rule#
     * @member {object} raws - Information to generate byte-to-byte equal
     *                         node string as it was in the origin input.
     *
     * Every parser saves its own properties,
     * but the default CSS parser uses:
     *
     * * `before`: the space symbols before the node. It also stores `*`
     *   and `_` symbols before the declaration (IE hack).
     * * `after`: the space symbols after the last child of the node
     *   to the end of the node.
     * * `between`: the symbols between the property and value
     *   for declarations, selector and `{` for rules, or last parameter
     *   and `{` for at-rules.
     * * `semicolon`: contains `true` if the last child has
     *   an (optional) semicolon.
     * * `ownSemicolon`: contains `true` if there is semicolon after rule.
     *
     * PostCSS cleans selectors from comments and extra spaces,
     * but it stores origin content in raws properties.
     * As such, if you don’t change a declaration’s value,
     * PostCSS will use the raw value with comments.
     *
     * @example
     * const root = postcss.parse('a {\n  color:black\n}')
     * root.first.first.raws //=> { before: '', between: ' ', after: '\n' }
     */

  }]);

  return Rule;
}(_container2.default);

exports.default = Rule;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJ1bGUuZXM2Il0sIm5hbWVzIjpbIlJ1bGUiLCJkZWZhdWx0cyIsInR5cGUiLCJub2RlcyIsImxpc3QiLCJjb21tYSIsInNlbGVjdG9yIiwidmFsdWVzIiwibWF0Y2giLCJzZXAiLCJyYXciLCJqb2luIiwiQ29udGFpbmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQTs7OztBQUNBOzs7Ozs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7SUFXTUEsSTs7O0FBRUYsZ0JBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQSxpREFDbEIsc0JBQU1BLFFBQU4sQ0FEa0I7O0FBRWxCLFVBQUtDLElBQUwsR0FBWSxNQUFaO0FBQ0EsUUFBSyxDQUFDLE1BQUtDLEtBQVgsRUFBbUIsTUFBS0EsS0FBTCxHQUFhLEVBQWI7QUFIRDtBQUlyQjs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7d0JBZ0JnQjtBQUNaLGFBQU9DLGVBQUtDLEtBQUwsQ0FBVyxLQUFLQyxRQUFoQixDQUFQO0FBQ0gsSztzQkFFYUMsTSxFQUFRO0FBQ2xCLFVBQUlDLFFBQVEsS0FBS0YsUUFBTCxHQUFnQixLQUFLQSxRQUFMLENBQWNFLEtBQWQsQ0FBb0IsTUFBcEIsQ0FBaEIsR0FBOEMsSUFBMUQ7QUFDQSxVQUFJQyxNQUFRRCxRQUFRQSxNQUFNLENBQU4sQ0FBUixHQUFtQixNQUFNLEtBQUtFLEdBQUwsQ0FBUyxTQUFULEVBQW9CLFlBQXBCLENBQXJDO0FBQ0EsV0FBS0osUUFBTCxHQUFnQkMsT0FBT0ksSUFBUCxDQUFZRixHQUFaLENBQWhCO0FBQ0g7O0FBRUQ7Ozs7Ozs7Ozs7O0FBV0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBN0NlRyxtQjs7a0JBNEVKWixJIiwiZmlsZSI6InJ1bGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGFpbmVyIGZyb20gJy4vY29udGFpbmVyJztcbmltcG9ydCBsaXN0ICAgICAgZnJvbSAnLi9saXN0JztcblxuLyoqXG4gKiBSZXByZXNlbnRzIGEgQ1NTIHJ1bGU6IGEgc2VsZWN0b3IgZm9sbG93ZWQgYnkgYSBkZWNsYXJhdGlvbiBibG9jay5cbiAqXG4gKiBAZXh0ZW5kcyBDb250YWluZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2F7fScpO1xuICogY29uc3QgcnVsZSA9IHJvb3QuZmlyc3Q7XG4gKiBydWxlLnR5cGUgICAgICAgLy89PiAncnVsZSdcbiAqIHJ1bGUudG9TdHJpbmcoKSAvLz0+ICdhe30nXG4gKi9cbmNsYXNzIFJ1bGUgZXh0ZW5kcyBDb250YWluZXIge1xuXG4gICAgY29uc3RydWN0b3IoZGVmYXVsdHMpIHtcbiAgICAgICAgc3VwZXIoZGVmYXVsdHMpO1xuICAgICAgICB0aGlzLnR5cGUgPSAncnVsZSc7XG4gICAgICAgIGlmICggIXRoaXMubm9kZXMgKSB0aGlzLm5vZGVzID0gW107XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgY29udGFpbmluZyB0aGUgcnVsZeKAmXMgaW5kaXZpZHVhbCBzZWxlY3RvcnMuXG4gICAgICogR3JvdXBzIG9mIHNlbGVjdG9ycyBhcmUgc3BsaXQgYXQgY29tbWFzLlxuICAgICAqXG4gICAgICogQHR5cGUge3N0cmluZ1tdfVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSwgYiB7IH0nKTtcbiAgICAgKiBjb25zdCBydWxlID0gcm9vdC5maXJzdDtcbiAgICAgKlxuICAgICAqIHJ1bGUuc2VsZWN0b3IgIC8vPT4gJ2EsIGInXG4gICAgICogcnVsZS5zZWxlY3RvcnMgLy89PiBbJ2EnLCAnYiddXG4gICAgICpcbiAgICAgKiBydWxlLnNlbGVjdG9ycyA9IFsnYScsICdzdHJvbmcnXTtcbiAgICAgKiBydWxlLnNlbGVjdG9yIC8vPT4gJ2EsIHN0cm9uZydcbiAgICAgKi9cbiAgICBnZXQgc2VsZWN0b3JzKCkge1xuICAgICAgICByZXR1cm4gbGlzdC5jb21tYSh0aGlzLnNlbGVjdG9yKTtcbiAgICB9XG5cbiAgICBzZXQgc2VsZWN0b3JzKHZhbHVlcykge1xuICAgICAgICBsZXQgbWF0Y2ggPSB0aGlzLnNlbGVjdG9yID8gdGhpcy5zZWxlY3Rvci5tYXRjaCgvLFxccyovKSA6IG51bGw7XG4gICAgICAgIGxldCBzZXAgICA9IG1hdGNoID8gbWF0Y2hbMF0gOiAnLCcgKyB0aGlzLnJhdygnYmV0d2VlbicsICdiZWZvcmVPcGVuJyk7XG4gICAgICAgIHRoaXMuc2VsZWN0b3IgPSB2YWx1ZXMuam9pbihzZXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEBtZW1iZXJvZiBSdWxlI1xuICAgICAqIEBtZW1iZXIge3N0cmluZ30gc2VsZWN0b3IgLSB0aGUgcnVsZeKAmXMgZnVsbCBzZWxlY3RvciByZXByZXNlbnRlZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcyBhIHN0cmluZ1xuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSwgYiB7IH0nKTtcbiAgICAgKiBjb25zdCBydWxlID0gcm9vdC5maXJzdDtcbiAgICAgKiBydWxlLnNlbGVjdG9yIC8vPT4gJ2EsIGInXG4gICAgICovXG5cbiAgICAvKipcbiAgICAgKiBAbWVtYmVyb2YgUnVsZSNcbiAgICAgKiBAbWVtYmVyIHtvYmplY3R9IHJhd3MgLSBJbmZvcm1hdGlvbiB0byBnZW5lcmF0ZSBieXRlLXRvLWJ5dGUgZXF1YWxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICBub2RlIHN0cmluZyBhcyBpdCB3YXMgaW4gdGhlIG9yaWdpbiBpbnB1dC5cbiAgICAgKlxuICAgICAqIEV2ZXJ5IHBhcnNlciBzYXZlcyBpdHMgb3duIHByb3BlcnRpZXMsXG4gICAgICogYnV0IHRoZSBkZWZhdWx0IENTUyBwYXJzZXIgdXNlczpcbiAgICAgKlxuICAgICAqICogYGJlZm9yZWA6IHRoZSBzcGFjZSBzeW1ib2xzIGJlZm9yZSB0aGUgbm9kZS4gSXQgYWxzbyBzdG9yZXMgYCpgXG4gICAgICogICBhbmQgYF9gIHN5bWJvbHMgYmVmb3JlIHRoZSBkZWNsYXJhdGlvbiAoSUUgaGFjaykuXG4gICAgICogKiBgYWZ0ZXJgOiB0aGUgc3BhY2Ugc3ltYm9scyBhZnRlciB0aGUgbGFzdCBjaGlsZCBvZiB0aGUgbm9kZVxuICAgICAqICAgdG8gdGhlIGVuZCBvZiB0aGUgbm9kZS5cbiAgICAgKiAqIGBiZXR3ZWVuYDogdGhlIHN5bWJvbHMgYmV0d2VlbiB0aGUgcHJvcGVydHkgYW5kIHZhbHVlXG4gICAgICogICBmb3IgZGVjbGFyYXRpb25zLCBzZWxlY3RvciBhbmQgYHtgIGZvciBydWxlcywgb3IgbGFzdCBwYXJhbWV0ZXJcbiAgICAgKiAgIGFuZCBge2AgZm9yIGF0LXJ1bGVzLlxuICAgICAqICogYHNlbWljb2xvbmA6IGNvbnRhaW5zIGB0cnVlYCBpZiB0aGUgbGFzdCBjaGlsZCBoYXNcbiAgICAgKiAgIGFuIChvcHRpb25hbCkgc2VtaWNvbG9uLlxuICAgICAqICogYG93blNlbWljb2xvbmA6IGNvbnRhaW5zIGB0cnVlYCBpZiB0aGVyZSBpcyBzZW1pY29sb24gYWZ0ZXIgcnVsZS5cbiAgICAgKlxuICAgICAqIFBvc3RDU1MgY2xlYW5zIHNlbGVjdG9ycyBmcm9tIGNvbW1lbnRzIGFuZCBleHRyYSBzcGFjZXMsXG4gICAgICogYnV0IGl0IHN0b3JlcyBvcmlnaW4gY29udGVudCBpbiByYXdzIHByb3BlcnRpZXMuXG4gICAgICogQXMgc3VjaCwgaWYgeW91IGRvbuKAmXQgY2hhbmdlIGEgZGVjbGFyYXRpb27igJlzIHZhbHVlLFxuICAgICAqIFBvc3RDU1Mgd2lsbCB1c2UgdGhlIHJhdyB2YWx1ZSB3aXRoIGNvbW1lbnRzLlxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKiBjb25zdCByb290ID0gcG9zdGNzcy5wYXJzZSgnYSB7XFxuICBjb2xvcjpibGFja1xcbn0nKVxuICAgICAqIHJvb3QuZmlyc3QuZmlyc3QucmF3cyAvLz0+IHsgYmVmb3JlOiAnJywgYmV0d2VlbjogJyAnLCBhZnRlcjogJ1xcbicgfVxuICAgICAqL1xuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFJ1bGU7XG4iXX0=

}, function(modId) { var map = {"./container":1625038544337,"./list":1625038544339}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544339, function(require, module, exports) {


exports.__esModule = true;
/**
 * Contains helpers for safely splitting lists of CSS values,
 * preserving parentheses and quotes.
 *
 * @example
 * const list = postcss.list;
 *
 * @namespace list
 */
var list = {
    split: function split(string, separators, last) {
        var array = [];
        var current = '';
        var split = false;

        var func = 0;
        var quote = false;
        var escape = false;

        for (var i = 0; i < string.length; i++) {
            var letter = string[i];

            if (quote) {
                if (escape) {
                    escape = false;
                } else if (letter === '\\') {
                    escape = true;
                } else if (letter === quote) {
                    quote = false;
                }
            } else if (letter === '"' || letter === '\'') {
                quote = letter;
            } else if (letter === '(') {
                func += 1;
            } else if (letter === ')') {
                if (func > 0) func -= 1;
            } else if (func === 0) {
                if (separators.indexOf(letter) !== -1) split = true;
            }

            if (split) {
                if (current !== '') array.push(current.trim());
                current = '';
                split = false;
            } else {
                current += letter;
            }
        }

        if (last || current !== '') array.push(current.trim());
        return array;
    },


    /**
     * Safely splits space-separated values (such as those for `background`,
     * `border-radius`, and other shorthand properties).
     *
     * @param {string} string - space-separated values
     *
     * @return {string[]} split values
     *
     * @example
     * postcss.list.space('1px calc(10% + 1px)') //=> ['1px', 'calc(10% + 1px)']
     */
    space: function space(string) {
        var spaces = [' ', '\n', '\t'];
        return list.split(string, spaces);
    },


    /**
     * Safely splits comma-separated values (such as those for `transition-*`
     * and `background` properties).
     *
     * @param {string} string - comma-separated values
     *
     * @return {string[]} split values
     *
     * @example
     * postcss.list.comma('black, linear-gradient(white, black)')
     * //=> ['black', 'linear-gradient(white, black)']
     */
    comma: function comma(string) {
        var comma = ',';
        return list.split(string, [comma], true);
    }
};

exports.default = list;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuZXM2Il0sIm5hbWVzIjpbImxpc3QiLCJzcGxpdCIsInN0cmluZyIsInNlcGFyYXRvcnMiLCJsYXN0IiwiYXJyYXkiLCJjdXJyZW50IiwiZnVuYyIsInF1b3RlIiwiZXNjYXBlIiwiaSIsImxlbmd0aCIsImxldHRlciIsImluZGV4T2YiLCJwdXNoIiwidHJpbSIsInNwYWNlIiwic3BhY2VzIiwiY29tbWEiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7Ozs7QUFTQSxJQUFJQSxPQUFPO0FBRVBDLFNBRk8saUJBRURDLE1BRkMsRUFFT0MsVUFGUCxFQUVtQkMsSUFGbkIsRUFFeUI7QUFDNUIsWUFBSUMsUUFBVSxFQUFkO0FBQ0EsWUFBSUMsVUFBVSxFQUFkO0FBQ0EsWUFBSUwsUUFBVSxLQUFkOztBQUVBLFlBQUlNLE9BQVUsQ0FBZDtBQUNBLFlBQUlDLFFBQVUsS0FBZDtBQUNBLFlBQUlDLFNBQVUsS0FBZDs7QUFFQSxhQUFNLElBQUlDLElBQUksQ0FBZCxFQUFpQkEsSUFBSVIsT0FBT1MsTUFBNUIsRUFBb0NELEdBQXBDLEVBQTBDO0FBQ3RDLGdCQUFJRSxTQUFTVixPQUFPUSxDQUFQLENBQWI7O0FBRUEsZ0JBQUtGLEtBQUwsRUFBYTtBQUNULG9CQUFLQyxNQUFMLEVBQWM7QUFDVkEsNkJBQVMsS0FBVDtBQUNILGlCQUZELE1BRU8sSUFBS0csV0FBVyxJQUFoQixFQUF1QjtBQUMxQkgsNkJBQVMsSUFBVDtBQUNILGlCQUZNLE1BRUEsSUFBS0csV0FBV0osS0FBaEIsRUFBd0I7QUFDM0JBLDRCQUFRLEtBQVI7QUFDSDtBQUNKLGFBUkQsTUFRTyxJQUFLSSxXQUFXLEdBQVgsSUFBa0JBLFdBQVcsSUFBbEMsRUFBeUM7QUFDNUNKLHdCQUFRSSxNQUFSO0FBQ0gsYUFGTSxNQUVBLElBQUtBLFdBQVcsR0FBaEIsRUFBc0I7QUFDekJMLHdCQUFRLENBQVI7QUFDSCxhQUZNLE1BRUEsSUFBS0ssV0FBVyxHQUFoQixFQUFzQjtBQUN6QixvQkFBS0wsT0FBTyxDQUFaLEVBQWdCQSxRQUFRLENBQVI7QUFDbkIsYUFGTSxNQUVBLElBQUtBLFNBQVMsQ0FBZCxFQUFrQjtBQUNyQixvQkFBS0osV0FBV1UsT0FBWCxDQUFtQkQsTUFBbkIsTUFBK0IsQ0FBQyxDQUFyQyxFQUF5Q1gsUUFBUSxJQUFSO0FBQzVDOztBQUVELGdCQUFLQSxLQUFMLEVBQWE7QUFDVCxvQkFBS0ssWUFBWSxFQUFqQixFQUFzQkQsTUFBTVMsSUFBTixDQUFXUixRQUFRUyxJQUFSLEVBQVg7QUFDdEJULDBCQUFVLEVBQVY7QUFDQUwsd0JBQVUsS0FBVjtBQUNILGFBSkQsTUFJTztBQUNISywyQkFBV00sTUFBWDtBQUNIO0FBQ0o7O0FBRUQsWUFBS1IsUUFBUUUsWUFBWSxFQUF6QixFQUE4QkQsTUFBTVMsSUFBTixDQUFXUixRQUFRUyxJQUFSLEVBQVg7QUFDOUIsZUFBT1YsS0FBUDtBQUNILEtBM0NNOzs7QUE2Q1A7Ozs7Ozs7Ozs7O0FBV0FXLFNBeERPLGlCQXdERGQsTUF4REMsRUF3RE87QUFDVixZQUFJZSxTQUFTLENBQUMsR0FBRCxFQUFNLElBQU4sRUFBWSxJQUFaLENBQWI7QUFDQSxlQUFPakIsS0FBS0MsS0FBTCxDQUFXQyxNQUFYLEVBQW1CZSxNQUFuQixDQUFQO0FBQ0gsS0EzRE07OztBQTZEUDs7Ozs7Ozs7Ozs7O0FBWUFDLFNBekVPLGlCQXlFRGhCLE1BekVDLEVBeUVPO0FBQ1YsWUFBSWdCLFFBQVEsR0FBWjtBQUNBLGVBQU9sQixLQUFLQyxLQUFMLENBQVdDLE1BQVgsRUFBbUIsQ0FBQ2dCLEtBQUQsQ0FBbkIsRUFBNEIsSUFBNUIsQ0FBUDtBQUNIO0FBNUVNLENBQVg7O2tCQWdGZWxCLEkiLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udGFpbnMgaGVscGVycyBmb3Igc2FmZWx5IHNwbGl0dGluZyBsaXN0cyBvZiBDU1MgdmFsdWVzLFxuICogcHJlc2VydmluZyBwYXJlbnRoZXNlcyBhbmQgcXVvdGVzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBsaXN0ID0gcG9zdGNzcy5saXN0O1xuICpcbiAqIEBuYW1lc3BhY2UgbGlzdFxuICovXG5sZXQgbGlzdCA9IHtcblxuICAgIHNwbGl0KHN0cmluZywgc2VwYXJhdG9ycywgbGFzdCkge1xuICAgICAgICBsZXQgYXJyYXkgICA9IFtdO1xuICAgICAgICBsZXQgY3VycmVudCA9ICcnO1xuICAgICAgICBsZXQgc3BsaXQgICA9IGZhbHNlO1xuXG4gICAgICAgIGxldCBmdW5jICAgID0gMDtcbiAgICAgICAgbGV0IHF1b3RlICAgPSBmYWxzZTtcbiAgICAgICAgbGV0IGVzY2FwZSAgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKCBsZXQgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyBpKysgKSB7XG4gICAgICAgICAgICBsZXQgbGV0dGVyID0gc3RyaW5nW2ldO1xuXG4gICAgICAgICAgICBpZiAoIHF1b3RlICkge1xuICAgICAgICAgICAgICAgIGlmICggZXNjYXBlICkge1xuICAgICAgICAgICAgICAgICAgICBlc2NhcGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBsZXR0ZXIgPT09ICdcXFxcJyApIHtcbiAgICAgICAgICAgICAgICAgICAgZXNjYXBlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKCBsZXR0ZXIgPT09IHF1b3RlICkge1xuICAgICAgICAgICAgICAgICAgICBxdW90ZSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGxldHRlciA9PT0gJ1wiJyB8fCBsZXR0ZXIgPT09ICdcXCcnICkge1xuICAgICAgICAgICAgICAgIHF1b3RlID0gbGV0dGVyO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggbGV0dGVyID09PSAnKCcgKSB7XG4gICAgICAgICAgICAgICAgZnVuYyArPSAxO1xuICAgICAgICAgICAgfSBlbHNlIGlmICggbGV0dGVyID09PSAnKScgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBmdW5jID4gMCApIGZ1bmMgLT0gMTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIGZ1bmMgPT09IDAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBzZXBhcmF0b3JzLmluZGV4T2YobGV0dGVyKSAhPT0gLTEgKSBzcGxpdCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICggc3BsaXQgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCBjdXJyZW50ICE9PSAnJyApIGFycmF5LnB1c2goY3VycmVudC50cmltKCkpO1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgPSAnJztcbiAgICAgICAgICAgICAgICBzcGxpdCAgID0gZmFsc2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN1cnJlbnQgKz0gbGV0dGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCBsYXN0IHx8IGN1cnJlbnQgIT09ICcnICkgYXJyYXkucHVzaChjdXJyZW50LnRyaW0oKSk7XG4gICAgICAgIHJldHVybiBhcnJheTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU2FmZWx5IHNwbGl0cyBzcGFjZS1zZXBhcmF0ZWQgdmFsdWVzIChzdWNoIGFzIHRob3NlIGZvciBgYmFja2dyb3VuZGAsXG4gICAgICogYGJvcmRlci1yYWRpdXNgLCBhbmQgb3RoZXIgc2hvcnRoYW5kIHByb3BlcnRpZXMpLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyAtIHNwYWNlLXNlcGFyYXRlZCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ1tdfSBzcGxpdCB2YWx1ZXNcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy5saXN0LnNwYWNlKCcxcHggY2FsYygxMCUgKyAxcHgpJykgLy89PiBbJzFweCcsICdjYWxjKDEwJSArIDFweCknXVxuICAgICAqL1xuICAgIHNwYWNlKHN0cmluZykge1xuICAgICAgICBsZXQgc3BhY2VzID0gWycgJywgJ1xcbicsICdcXHQnXTtcbiAgICAgICAgcmV0dXJuIGxpc3Quc3BsaXQoc3RyaW5nLCBzcGFjZXMpO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTYWZlbHkgc3BsaXRzIGNvbW1hLXNlcGFyYXRlZCB2YWx1ZXMgKHN1Y2ggYXMgdGhvc2UgZm9yIGB0cmFuc2l0aW9uLSpgXG4gICAgICogYW5kIGBiYWNrZ3JvdW5kYCBwcm9wZXJ0aWVzKS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgLSBjb21tYS1zZXBhcmF0ZWQgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmdbXX0gc3BsaXQgdmFsdWVzXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MubGlzdC5jb21tYSgnYmxhY2ssIGxpbmVhci1ncmFkaWVudCh3aGl0ZSwgYmxhY2spJylcbiAgICAgKiAvLz0+IFsnYmxhY2snLCAnbGluZWFyLWdyYWRpZW50KHdoaXRlLCBibGFjayknXVxuICAgICAqL1xuICAgIGNvbW1hKHN0cmluZykge1xuICAgICAgICBsZXQgY29tbWEgPSAnLCc7XG4gICAgICAgIHJldHVybiBsaXN0LnNwbGl0KHN0cmluZywgW2NvbW1hXSwgdHJ1ZSk7XG4gICAgfVxuXG59O1xuXG5leHBvcnQgZGVmYXVsdCBsaXN0O1xuIl19

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544340, function(require, module, exports) {


exports.__esModule = true;

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Represents a CSS file and contains all its parsed nodes.
 *
 * @extends Container
 *
 * @example
 * const root = postcss.parse('a{color:black} b{z-index:2}');
 * root.type         //=> 'root'
 * root.nodes.length //=> 2
 */
var Root = function (_Container) {
    _inherits(Root, _Container);

    function Root(defaults) {
        _classCallCheck(this, Root);

        var _this = _possibleConstructorReturn(this, _Container.call(this, defaults));

        _this.type = 'root';
        if (!_this.nodes) _this.nodes = [];
        return _this;
    }

    Root.prototype.removeChild = function removeChild(child, ignore) {
        var index = this.index(child);

        if (!ignore && index === 0 && this.nodes.length > 1) {
            this.nodes[1].raws.before = this.nodes[index].raws.before;
        }

        return _Container.prototype.removeChild.call(this, child);
    };

    Root.prototype.normalize = function normalize(child, sample, type) {
        var nodes = _Container.prototype.normalize.call(this, child);

        if (sample) {
            if (type === 'prepend') {
                if (this.nodes.length > 1) {
                    sample.raws.before = this.nodes[1].raws.before;
                } else {
                    delete sample.raws.before;
                }
            } else if (this.first !== sample) {
                for (var _iterator = nodes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                    var _ref;

                    if (_isArray) {
                        if (_i >= _iterator.length) break;
                        _ref = _iterator[_i++];
                    } else {
                        _i = _iterator.next();
                        if (_i.done) break;
                        _ref = _i.value;
                    }

                    var node = _ref;

                    node.raws.before = sample.raws.before;
                }
            }
        }

        return nodes;
    };

    /**
     * Returns a {@link Result} instance representing the root’s CSS.
     *
     * @param {processOptions} [opts] - options with only `to` and `map` keys
     *
     * @return {Result} result with current root’s CSS
     *
     * @example
     * const root1 = postcss.parse(css1, { from: 'a.css' });
     * const root2 = postcss.parse(css2, { from: 'b.css' });
     * root1.append(root2);
     * const result = root1.toResult({ to: 'all.css', map: true });
     */


    Root.prototype.toResult = function toResult() {
        var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var LazyResult = require('./lazy-result');
        var Processor = require('./processor');

        var lazy = new LazyResult(new Processor(), this, opts);
        return lazy.stringify();
    };

    /**
     * @memberof Root#
     * @member {object} raws - Information to generate byte-to-byte equal
     *                         node string as it was in the origin input.
     *
     * Every parser saves its own properties,
     * but the default CSS parser uses:
     *
     * * `after`: the space symbols after the last child to the end of file.
     * * `semicolon`: is the last child has an (optional) semicolon.
     *
     * @example
     * postcss.parse('a {}\n').raws //=> { after: '\n' }
     * postcss.parse('a {}').raws   //=> { after: '' }
     */

    return Root;
}(_container2.default);

exports.default = Root;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvb3QuZXM2Il0sIm5hbWVzIjpbIlJvb3QiLCJkZWZhdWx0cyIsInR5cGUiLCJub2RlcyIsInJlbW92ZUNoaWxkIiwiY2hpbGQiLCJpZ25vcmUiLCJpbmRleCIsImxlbmd0aCIsInJhd3MiLCJiZWZvcmUiLCJub3JtYWxpemUiLCJzYW1wbGUiLCJmaXJzdCIsIm5vZGUiLCJ0b1Jlc3VsdCIsIm9wdHMiLCJMYXp5UmVzdWx0IiwicmVxdWlyZSIsIlByb2Nlc3NvciIsImxhenkiLCJzdHJpbmdpZnkiLCJDb250YWluZXIiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7Ozs7Ozs7O0FBRUE7Ozs7Ozs7Ozs7SUFVTUEsSTs7O0FBRUYsa0JBQVlDLFFBQVosRUFBc0I7QUFBQTs7QUFBQSxxREFDbEIsc0JBQU1BLFFBQU4sQ0FEa0I7O0FBRWxCLGNBQUtDLElBQUwsR0FBWSxNQUFaO0FBQ0EsWUFBSyxDQUFDLE1BQUtDLEtBQVgsRUFBbUIsTUFBS0EsS0FBTCxHQUFhLEVBQWI7QUFIRDtBQUlyQjs7bUJBRURDLFcsd0JBQVlDLEssRUFBT0MsTSxFQUFRO0FBQ3ZCLFlBQU1DLFFBQVEsS0FBS0EsS0FBTCxDQUFXRixLQUFYLENBQWQ7O0FBRUEsWUFBSyxDQUFDQyxNQUFELElBQVdDLFVBQVUsQ0FBckIsSUFBMEIsS0FBS0osS0FBTCxDQUFXSyxNQUFYLEdBQW9CLENBQW5ELEVBQXVEO0FBQ25ELGlCQUFLTCxLQUFMLENBQVcsQ0FBWCxFQUFjTSxJQUFkLENBQW1CQyxNQUFuQixHQUE0QixLQUFLUCxLQUFMLENBQVdJLEtBQVgsRUFBa0JFLElBQWxCLENBQXVCQyxNQUFuRDtBQUNIOztBQUVELGVBQU8scUJBQU1OLFdBQU4sWUFBa0JDLEtBQWxCLENBQVA7QUFDSCxLOzttQkFFRE0sUyxzQkFBVU4sSyxFQUFPTyxNLEVBQVFWLEksRUFBTTtBQUMzQixZQUFJQyxRQUFRLHFCQUFNUSxTQUFOLFlBQWdCTixLQUFoQixDQUFaOztBQUVBLFlBQUtPLE1BQUwsRUFBYztBQUNWLGdCQUFLVixTQUFTLFNBQWQsRUFBMEI7QUFDdEIsb0JBQUssS0FBS0MsS0FBTCxDQUFXSyxNQUFYLEdBQW9CLENBQXpCLEVBQTZCO0FBQ3pCSSwyQkFBT0gsSUFBUCxDQUFZQyxNQUFaLEdBQXFCLEtBQUtQLEtBQUwsQ0FBVyxDQUFYLEVBQWNNLElBQWQsQ0FBbUJDLE1BQXhDO0FBQ0gsaUJBRkQsTUFFTztBQUNILDJCQUFPRSxPQUFPSCxJQUFQLENBQVlDLE1BQW5CO0FBQ0g7QUFDSixhQU5ELE1BTU8sSUFBSyxLQUFLRyxLQUFMLEtBQWVELE1BQXBCLEVBQTZCO0FBQ2hDLHFDQUFrQlQsS0FBbEIsa0hBQTBCO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTs7QUFBQSx3QkFBaEJXLElBQWdCOztBQUN0QkEseUJBQUtMLElBQUwsQ0FBVUMsTUFBVixHQUFtQkUsT0FBT0gsSUFBUCxDQUFZQyxNQUEvQjtBQUNIO0FBQ0o7QUFDSjs7QUFFRCxlQUFPUCxLQUFQO0FBQ0gsSzs7QUFFRDs7Ozs7Ozs7Ozs7Ozs7O21CQWFBWSxRLHVCQUFxQjtBQUFBLFlBQVpDLElBQVksdUVBQUwsRUFBSzs7QUFDakIsWUFBSUMsYUFBYUMsUUFBUSxlQUFSLENBQWpCO0FBQ0EsWUFBSUMsWUFBYUQsUUFBUSxhQUFSLENBQWpCOztBQUVBLFlBQUlFLE9BQU8sSUFBSUgsVUFBSixDQUFlLElBQUlFLFNBQUosRUFBZixFQUFnQyxJQUFoQyxFQUFzQ0gsSUFBdEMsQ0FBWDtBQUNBLGVBQU9JLEtBQUtDLFNBQUwsRUFBUDtBQUNILEs7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O0VBM0RlQyxtQjs7a0JBNkVKdEIsSSIsImZpbGUiOiJyb290LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IENvbnRhaW5lciBmcm9tICcuL2NvbnRhaW5lcic7XG5cbi8qKlxuICogUmVwcmVzZW50cyBhIENTUyBmaWxlIGFuZCBjb250YWlucyBhbGwgaXRzIHBhcnNlZCBub2Rlcy5cbiAqXG4gKiBAZXh0ZW5kcyBDb250YWluZXJcbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgcm9vdCA9IHBvc3Rjc3MucGFyc2UoJ2F7Y29sb3I6YmxhY2t9IGJ7ei1pbmRleDoyfScpO1xuICogcm9vdC50eXBlICAgICAgICAgLy89PiAncm9vdCdcbiAqIHJvb3Qubm9kZXMubGVuZ3RoIC8vPT4gMlxuICovXG5jbGFzcyBSb290IGV4dGVuZHMgQ29udGFpbmVyIHtcblxuICAgIGNvbnN0cnVjdG9yKGRlZmF1bHRzKSB7XG4gICAgICAgIHN1cGVyKGRlZmF1bHRzKTtcbiAgICAgICAgdGhpcy50eXBlID0gJ3Jvb3QnO1xuICAgICAgICBpZiAoICF0aGlzLm5vZGVzICkgdGhpcy5ub2RlcyA9IFtdO1xuICAgIH1cblxuICAgIHJlbW92ZUNoaWxkKGNoaWxkLCBpZ25vcmUpIHtcbiAgICAgICAgY29uc3QgaW5kZXggPSB0aGlzLmluZGV4KGNoaWxkKTtcblxuICAgICAgICBpZiAoICFpZ25vcmUgJiYgaW5kZXggPT09IDAgJiYgdGhpcy5ub2Rlcy5sZW5ndGggPiAxICkge1xuICAgICAgICAgICAgdGhpcy5ub2Rlc1sxXS5yYXdzLmJlZm9yZSA9IHRoaXMubm9kZXNbaW5kZXhdLnJhd3MuYmVmb3JlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1cGVyLnJlbW92ZUNoaWxkKGNoaWxkKTtcbiAgICB9XG5cbiAgICBub3JtYWxpemUoY2hpbGQsIHNhbXBsZSwgdHlwZSkge1xuICAgICAgICBsZXQgbm9kZXMgPSBzdXBlci5ub3JtYWxpemUoY2hpbGQpO1xuXG4gICAgICAgIGlmICggc2FtcGxlICkge1xuICAgICAgICAgICAgaWYgKCB0eXBlID09PSAncHJlcGVuZCcgKSB7XG4gICAgICAgICAgICAgICAgaWYgKCB0aGlzLm5vZGVzLmxlbmd0aCA+IDEgKSB7XG4gICAgICAgICAgICAgICAgICAgIHNhbXBsZS5yYXdzLmJlZm9yZSA9IHRoaXMubm9kZXNbMV0ucmF3cy5iZWZvcmU7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIHNhbXBsZS5yYXdzLmJlZm9yZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCB0aGlzLmZpcnN0ICE9PSBzYW1wbGUgKSB7XG4gICAgICAgICAgICAgICAgZm9yICggbGV0IG5vZGUgb2Ygbm9kZXMgKSB7XG4gICAgICAgICAgICAgICAgICAgIG5vZGUucmF3cy5iZWZvcmUgPSBzYW1wbGUucmF3cy5iZWZvcmU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB7QGxpbmsgUmVzdWx0fSBpbnN0YW5jZSByZXByZXNlbnRpbmcgdGhlIHJvb3TigJlzIENTUy5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7cHJvY2Vzc09wdGlvbnN9IFtvcHRzXSAtIG9wdGlvbnMgd2l0aCBvbmx5IGB0b2AgYW5kIGBtYXBgIGtleXNcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Jlc3VsdH0gcmVzdWx0IHdpdGggY3VycmVudCByb2904oCZcyBDU1NcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogY29uc3Qgcm9vdDEgPSBwb3N0Y3NzLnBhcnNlKGNzczEsIHsgZnJvbTogJ2EuY3NzJyB9KTtcbiAgICAgKiBjb25zdCByb290MiA9IHBvc3Rjc3MucGFyc2UoY3NzMiwgeyBmcm9tOiAnYi5jc3MnIH0pO1xuICAgICAqIHJvb3QxLmFwcGVuZChyb290Mik7XG4gICAgICogY29uc3QgcmVzdWx0ID0gcm9vdDEudG9SZXN1bHQoeyB0bzogJ2FsbC5jc3MnLCBtYXA6IHRydWUgfSk7XG4gICAgICovXG4gICAgdG9SZXN1bHQob3B0cyA9IHsgfSkge1xuICAgICAgICBsZXQgTGF6eVJlc3VsdCA9IHJlcXVpcmUoJy4vbGF6eS1yZXN1bHQnKTtcbiAgICAgICAgbGV0IFByb2Nlc3NvciAgPSByZXF1aXJlKCcuL3Byb2Nlc3NvcicpO1xuXG4gICAgICAgIGxldCBsYXp5ID0gbmV3IExhenlSZXN1bHQobmV3IFByb2Nlc3NvcigpLCB0aGlzLCBvcHRzKTtcbiAgICAgICAgcmV0dXJuIGxhenkuc3RyaW5naWZ5KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQG1lbWJlcm9mIFJvb3QjXG4gICAgICogQG1lbWJlciB7b2JqZWN0fSByYXdzIC0gSW5mb3JtYXRpb24gdG8gZ2VuZXJhdGUgYnl0ZS10by1ieXRlIGVxdWFsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgbm9kZSBzdHJpbmcgYXMgaXQgd2FzIGluIHRoZSBvcmlnaW4gaW5wdXQuXG4gICAgICpcbiAgICAgKiBFdmVyeSBwYXJzZXIgc2F2ZXMgaXRzIG93biBwcm9wZXJ0aWVzLFxuICAgICAqIGJ1dCB0aGUgZGVmYXVsdCBDU1MgcGFyc2VyIHVzZXM6XG4gICAgICpcbiAgICAgKiAqIGBhZnRlcmA6IHRoZSBzcGFjZSBzeW1ib2xzIGFmdGVyIHRoZSBsYXN0IGNoaWxkIHRvIHRoZSBlbmQgb2YgZmlsZS5cbiAgICAgKiAqIGBzZW1pY29sb25gOiBpcyB0aGUgbGFzdCBjaGlsZCBoYXMgYW4gKG9wdGlvbmFsKSBzZW1pY29sb24uXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MucGFyc2UoJ2Ege31cXG4nKS5yYXdzIC8vPT4geyBhZnRlcjogJ1xcbicgfVxuICAgICAqIHBvc3Rjc3MucGFyc2UoJ2Ege30nKS5yYXdzICAgLy89PiB7IGFmdGVyOiAnJyB9XG4gICAgICovXG5cbn1cblxuZXhwb3J0IGRlZmF1bHQgUm9vdDtcbiJdfQ==

}, function(modId) { var map = {"./container":1625038544337,"./lazy-result":1625038544329,"./processor":1625038544328}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544341, function(require, module, exports) {


exports.__esModule = true;
/**
 * Contains helpers for working with vendor prefixes.
 *
 * @example
 * const vendor = postcss.vendor;
 *
 * @namespace vendor
 */
var vendor = {

    /**
     * Returns the vendor prefix extracted from an input string.
     *
     * @param {string} prop - string with or without vendor prefix
     *
     * @return {string} vendor prefix or empty string
     *
     * @example
     * postcss.vendor.prefix('-moz-tab-size') //=> '-moz-'
     * postcss.vendor.prefix('tab-size')      //=> ''
     */
    prefix: function prefix(prop) {
        var match = prop.match(/^(-\w+-)/);
        if (match) {
            return match[0];
        } else {
            return '';
        }
    },


    /**
     * Returns the input string stripped of its vendor prefix.
     *
     * @param {string} prop - string with or without vendor prefix
     *
     * @return {string} string name without vendor prefixes
     *
     * @example
     * postcss.vendor.unprefixed('-moz-tab-size') //=> 'tab-size'
     */
    unprefixed: function unprefixed(prop) {
        return prop.replace(/^-\w+-/, '');
    }
};

exports.default = vendor;
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZlbmRvci5lczYiXSwibmFtZXMiOlsidmVuZG9yIiwicHJlZml4IiwicHJvcCIsIm1hdGNoIiwidW5wcmVmaXhlZCIsInJlcGxhY2UiXSwibWFwcGluZ3MiOiI7OztBQUFBOzs7Ozs7OztBQVFBLElBQUlBLFNBQVM7O0FBRVQ7Ozs7Ozs7Ozs7O0FBV0FDLFVBYlMsa0JBYUZDLElBYkUsRUFhSTtBQUNULFlBQUlDLFFBQVFELEtBQUtDLEtBQUwsQ0FBVyxVQUFYLENBQVo7QUFDQSxZQUFLQSxLQUFMLEVBQWE7QUFDVCxtQkFBT0EsTUFBTSxDQUFOLENBQVA7QUFDSCxTQUZELE1BRU87QUFDSCxtQkFBTyxFQUFQO0FBQ0g7QUFDSixLQXBCUTs7O0FBc0JUOzs7Ozs7Ozs7O0FBVUFDLGNBaENTLHNCQWdDRUYsSUFoQ0YsRUFnQ1E7QUFDYixlQUFPQSxLQUFLRyxPQUFMLENBQWEsUUFBYixFQUF1QixFQUF2QixDQUFQO0FBQ0g7QUFsQ1EsQ0FBYjs7a0JBc0NlTCxNIiwiZmlsZSI6InZlbmRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29udGFpbnMgaGVscGVycyBmb3Igd29ya2luZyB3aXRoIHZlbmRvciBwcmVmaXhlcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3QgdmVuZG9yID0gcG9zdGNzcy52ZW5kb3I7XG4gKlxuICogQG5hbWVzcGFjZSB2ZW5kb3JcbiAqL1xubGV0IHZlbmRvciA9IHtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHZlbmRvciBwcmVmaXggZXh0cmFjdGVkIGZyb20gYW4gaW5wdXQgc3RyaW5nLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHByb3AgLSBzdHJpbmcgd2l0aCBvciB3aXRob3V0IHZlbmRvciBwcmVmaXhcbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ30gdmVuZG9yIHByZWZpeCBvciBlbXB0eSBzdHJpbmdcbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICogcG9zdGNzcy52ZW5kb3IucHJlZml4KCctbW96LXRhYi1zaXplJykgLy89PiAnLW1vei0nXG4gICAgICogcG9zdGNzcy52ZW5kb3IucHJlZml4KCd0YWItc2l6ZScpICAgICAgLy89PiAnJ1xuICAgICAqL1xuICAgIHByZWZpeChwcm9wKSB7XG4gICAgICAgIGxldCBtYXRjaCA9IHByb3AubWF0Y2goL14oLVxcdystKS8pO1xuICAgICAgICBpZiAoIG1hdGNoICkge1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoWzBdO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGlucHV0IHN0cmluZyBzdHJpcHBlZCBvZiBpdHMgdmVuZG9yIHByZWZpeC5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBwcm9wIC0gc3RyaW5nIHdpdGggb3Igd2l0aG91dCB2ZW5kb3IgcHJlZml4XG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtzdHJpbmd9IHN0cmluZyBuYW1lIHdpdGhvdXQgdmVuZG9yIHByZWZpeGVzXG4gICAgICpcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqIHBvc3Rjc3MudmVuZG9yLnVucHJlZml4ZWQoJy1tb3otdGFiLXNpemUnKSAvLz0+ICd0YWItc2l6ZSdcbiAgICAgKi9cbiAgICB1bnByZWZpeGVkKHByb3ApIHtcbiAgICAgICAgcmV0dXJuIHByb3AucmVwbGFjZSgvXi1cXHcrLS8sICcnKTtcbiAgICB9XG5cbn07XG5cbmV4cG9ydCBkZWZhdWx0IHZlbmRvcjtcbiJdfQ==

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038544317);
})()
//# sourceMappingURL=index.js.map