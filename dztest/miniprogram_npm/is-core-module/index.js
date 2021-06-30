module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038547167, function(require, module, exports) {


var has = require('has');

function specifierIncluded(current, specifier) {
	var nodeParts = current.split('.');
	var parts = specifier.split(' ');
	var op = parts.length > 1 ? parts[0] : '=';
	var versionParts = (parts.length > 1 ? parts[1] : parts[0]).split('.');

	for (var i = 0; i < 3; ++i) {
		var cur = parseInt(nodeParts[i] || 0, 10);
		var ver = parseInt(versionParts[i] || 0, 10);
		if (cur === ver) {
			continue; // eslint-disable-line no-restricted-syntax, no-continue
		}
		if (op === '<') {
			return cur < ver;
		}
		if (op === '>=') {
			return cur >= ver;
		}
		return false;
	}
	return op === '>=';
}

function matchesRange(current, range) {
	var specifiers = range.split(/ ?&& ?/);
	if (specifiers.length === 0) {
		return false;
	}
	for (var i = 0; i < specifiers.length; ++i) {
		if (!specifierIncluded(current, specifiers[i])) {
			return false;
		}
	}
	return true;
}

function versionIncluded(nodeVersion, specifierValue) {
	if (typeof specifierValue === 'boolean') {
		return specifierValue;
	}

	var current = typeof nodeVersion === 'undefined'
		? process.versions && process.versions.node && process.versions.node
		: nodeVersion;

	if (typeof current !== 'string') {
		throw new TypeError(typeof nodeVersion === 'undefined' ? 'Unable to determine current node version' : 'If provided, a valid node version is required');
	}

	if (specifierValue && typeof specifierValue === 'object') {
		for (var i = 0; i < specifierValue.length; ++i) {
			if (matchesRange(current, specifierValue[i])) {
				return true;
			}
		}
		return false;
	}
	return matchesRange(current, specifierValue);
}

var data = require('./core.json');

module.exports = function isCore(x, nodeVersion) {
	return has(data, x) && versionIncluded(nodeVersion, data[x]);
};

}, function(modId) {var map = {"./core.json":1625038547168}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038547168, function(require, module, exports) {
module.exports = {
	"assert": true,
	"node:assert": ">= 16",
	"assert/strict": ">= 15",
	"node:assert/strict": ">= 16",
	"async_hooks": ">= 8",
	"node:async_hooks": ">= 16",
	"buffer_ieee754": "< 0.9.7",
	"buffer": true,
	"node:buffer": ">= 16",
	"child_process": true,
	"node:child_process": ">= 16",
	"cluster": true,
	"node:cluster": ">= 16",
	"console": true,
	"node:console": ">= 16",
	"constants": true,
	"node:constants": ">= 16",
	"crypto": true,
	"node:crypto": ">= 16",
	"_debug_agent": ">= 1 && < 8",
	"_debugger": "< 8",
	"dgram": true,
	"node:dgram": ">= 16",
	"diagnostics_channel": [">= 14.17 && < 15", ">= 15.1"],
	"node:diagnostics_channel": ">= 16",
	"dns": true,
	"node:dns": ">= 16",
	"dns/promises": ">= 15",
	"node:dns/promises": ">= 16",
	"domain": ">= 0.7.12",
	"node:domain": ">= 16",
	"events": true,
	"node:events": ">= 16",
	"freelist": "< 6",
	"fs": true,
	"node:fs": ">= 16",
	"fs/promises": [">= 10 && < 10.1", ">= 14"],
	"node:fs/promises": ">= 16",
	"_http_agent": ">= 0.11.1",
	"node:_http_agent": ">= 16",
	"_http_client": ">= 0.11.1",
	"node:_http_client": ">= 16",
	"_http_common": ">= 0.11.1",
	"node:_http_common": ">= 16",
	"_http_incoming": ">= 0.11.1",
	"node:_http_incoming": ">= 16",
	"_http_outgoing": ">= 0.11.1",
	"node:_http_outgoing": ">= 16",
	"_http_server": ">= 0.11.1",
	"node:_http_server": ">= 16",
	"http": true,
	"node:http": ">= 16",
	"http2": ">= 8.8",
	"node:http2": ">= 16",
	"https": true,
	"node:https": ">= 16",
	"inspector": ">= 8",
	"node:inspector": ">= 16",
	"_linklist": "< 8",
	"module": true,
	"node:module": ">= 16",
	"net": true,
	"node:net": ">= 16",
	"node-inspect/lib/_inspect": ">= 7.6 && < 12",
	"node-inspect/lib/internal/inspect_client": ">= 7.6 && < 12",
	"node-inspect/lib/internal/inspect_repl": ">= 7.6 && < 12",
	"os": true,
	"node:os": ">= 16",
	"path": true,
	"node:path": ">= 16",
	"path/posix": ">= 15.3",
	"node:path/posix": ">= 16",
	"path/win32": ">= 15.3",
	"node:path/win32": ">= 16",
	"perf_hooks": ">= 8.5",
	"node:perf_hooks": ">= 16",
	"process": ">= 1",
	"node:process": ">= 16",
	"punycode": true,
	"node:punycode": ">= 16",
	"querystring": true,
	"node:querystring": ">= 16",
	"readline": true,
	"node:readline": ">= 16",
	"repl": true,
	"node:repl": ">= 16",
	"smalloc": ">= 0.11.5 && < 3",
	"_stream_duplex": ">= 0.9.4",
	"node:_stream_duplex": ">= 16",
	"_stream_transform": ">= 0.9.4",
	"node:_stream_transform": ">= 16",
	"_stream_wrap": ">= 1.4.1",
	"node:_stream_wrap": ">= 16",
	"_stream_passthrough": ">= 0.9.4",
	"node:_stream_passthrough": ">= 16",
	"_stream_readable": ">= 0.9.4",
	"node:_stream_readable": ">= 16",
	"_stream_writable": ">= 0.9.4",
	"node:_stream_writable": ">= 16",
	"stream": true,
	"node:stream": ">= 16",
	"stream/promises": ">= 15",
	"node:stream/promises": ">= 16",
	"string_decoder": true,
	"node:string_decoder": ">= 16",
	"sys": [">= 0.6 && < 0.7", ">= 0.8"],
	"node:sys": ">= 16",
	"timers": true,
	"node:timers": ">= 16",
	"timers/promises": ">= 15",
	"node:timers/promises": ">= 16",
	"_tls_common": ">= 0.11.13",
	"node:_tls_common": ">= 16",
	"_tls_legacy": ">= 0.11.3 && < 10",
	"_tls_wrap": ">= 0.11.3",
	"node:_tls_wrap": ">= 16",
	"tls": true,
	"node:tls": ">= 16",
	"trace_events": ">= 10",
	"node:trace_events": ">= 16",
	"tty": true,
	"node:tty": ">= 16",
	"url": true,
	"node:url": ">= 16",
	"util": true,
	"node:util": ">= 16",
	"util/types": ">= 15.3",
	"node:util/types": ">= 16",
	"v8/tools/arguments": ">= 10 && < 12",
	"v8/tools/codemap": [">= 4.4 && < 5", ">= 5.2 && < 12"],
	"v8/tools/consarray": [">= 4.4 && < 5", ">= 5.2 && < 12"],
	"v8/tools/csvparser": [">= 4.4 && < 5", ">= 5.2 && < 12"],
	"v8/tools/logreader": [">= 4.4 && < 5", ">= 5.2 && < 12"],
	"v8/tools/profile_view": [">= 4.4 && < 5", ">= 5.2 && < 12"],
	"v8/tools/splaytree": [">= 4.4 && < 5", ">= 5.2 && < 12"],
	"v8": ">= 1",
	"node:v8": ">= 16",
	"vm": true,
	"node:vm": ">= 16",
	"wasi": ">= 13.4 && < 13.5",
	"worker_threads": ">= 11.7",
	"node:worker_threads": ">= 16",
	"zlib": true,
	"node:zlib": ">= 16"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038547167);
})()
//# sourceMappingURL=index.js.map