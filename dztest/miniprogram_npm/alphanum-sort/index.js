module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038544256, function(require, module, exports) {
var compare = require('./compare');

function mediator(a, b) {
	return compare(this, a.converted, b.converted);
}

module.exports = function (array, opts) {
	if (!Array.isArray(array) || array.length < 2) {
		return array;
	}
	if (typeof opts !== 'object') {
		opts = {};
	}
	opts.sign = !!opts.sign;
	var insensitive = !!opts.insensitive;
	var result = Array(array.length);
	var i, max, value;

	for (i = 0, max = array.length; i < max; i += 1) {
		value = String(array[i]);
		result[i] = {
			value: array[i],
			converted: insensitive ? value.toLowerCase() : value
		};
	}

	result.sort(mediator.bind(opts));

	for (i = result.length - 1; ~i; i -= 1) {
		result[i] = result[i].value;
	}

	return result;
};

}, function(modId) {var map = {"./compare":1625038544257}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038544257, function(require, module, exports) {
var zero = '0'.charCodeAt(0);
var plus = '+'.charCodeAt(0);
var minus = '-'.charCodeAt(0);

function isWhitespace(code) {
	return code <= 32;
}

function isDigit(code) {
	return 48 <= code && code <= 57;
}

function isSign(code) {
	return code === minus || code === plus;
}

module.exports = function (opts, a, b) {
	var checkSign = opts.sign;
	var ia = 0;
	var ib = 0;
	var ma = a.length;
	var mb = b.length;
	var ca, cb; // character code
	var za, zb; // leading zero count
	var na, nb; // number length
	var sa, sb; // number sign
	var ta, tb; // temporary
	var bias;

	while (ia < ma && ib < mb) {
		ca = a.charCodeAt(ia);
		cb = b.charCodeAt(ib);
		za = zb = 0;
		na = nb = 0;
		sa = sb = true;
		bias = 0;

		// skip over leading spaces
		while (isWhitespace(ca)) {
			ia += 1;
			ca = a.charCodeAt(ia);
		}
		while (isWhitespace(cb)) {
			ib += 1;
			cb = b.charCodeAt(ib);
		}

		// skip and save sign
		if (checkSign) {
			ta = a.charCodeAt(ia + 1);
			if (isSign(ca) && isDigit(ta)) {
				if (ca === minus) {
					sa = false;
				}
				ia += 1;
				ca = ta;
			}
			tb = b.charCodeAt(ib + 1);
			if (isSign(cb) && isDigit(tb)) {
				if (cb === minus) {
					sb = false;
				}
				ib += 1;
				cb = tb;
			}
		}

		// compare digits with other symbols
		if (isDigit(ca) && !isDigit(cb)) {
			return -1;
		}
		if (!isDigit(ca) && isDigit(cb)) {
			return 1;
		}

		// compare negative and positive
		if (!sa && sb) {
			return -1;
		}
		if (sa && !sb) {
			return 1;
		}

		// count leading zeros
		while (ca === zero) {
			za += 1;
			ia += 1;
			ca = a.charCodeAt(ia);
		}
		while (cb === zero) {
			zb += 1;
			ib += 1;
			cb = b.charCodeAt(ib);
		}

		// count numbers
		while (isDigit(ca) || isDigit(cb)) {
			if (isDigit(ca) && isDigit(cb) && bias === 0) {
				if (sa) {
					if (ca < cb) {
						bias = -1;
					} else if (ca > cb) {
						bias = 1;
					}
				} else {
					if (ca > cb) {
						bias = -1;
					} else if (ca < cb) {
						bias = 1;
					}
				}
			}
			if (isDigit(ca)) {
				ia += 1;
				na += 1;
				ca = a.charCodeAt(ia);
			}
			if (isDigit(cb)) {
				ib += 1;
				nb += 1;
				cb = b.charCodeAt(ib);
			}
		}

		// compare number length
		if (sa) {
			if (na < nb) {
				return -1;
			}
			if (na > nb) {
				return 1;
			}
		} else {
			if (na > nb) {
				return -1;
			}
			if (na < nb) {
				return 1;
			}
		}

		// compare numbers
		if (bias) {
			return bias;
		}

		// compare leading zeros
		if (sa) {
			if (za > zb) {
				return -1;
			}
			if (za < zb) {
				return 1;
			}
		} else {
			if (za < zb) {
				return -1;
			}
			if (za > zb) {
				return 1;
			}
		}

		// compare ascii codes
		if (ca < cb) {
			return -1;
		}
		if (ca > cb) {
			return 1;
		}

		ia += 1;
		ib += 1;
	}

	// compare length
	if (ma < mb) {
		return -1;
	}
	if (ma > mb) {
		return 1;
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038544256);
})()
//# sourceMappingURL=index.js.map