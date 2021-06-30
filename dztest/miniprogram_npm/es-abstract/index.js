module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038546084, function(require, module, exports) {


var assign = require('./helpers/assign');

var ES5 = require('./es5');
var ES2015 = require('./es2015');
var ES2016 = require('./es2016');
var ES2017 = require('./es2017');
var ES2018 = require('./es2018');
var ES2019 = require('./es2019');
var ES2020 = require('./es2020');

var ES = {
	ES5: ES5,
	ES6: ES2015,
	ES2015: ES2015,
	ES7: ES2016,
	ES2016: ES2016,
	ES2017: ES2017,
	ES2018: ES2018,
	ES2019: ES2019,
	ES2020: ES2020
};
assign(ES, ES5);
delete ES.CheckObjectCoercible; // renamed in ES6 to RequireObjectCoercible
assign(ES, ES2015);

module.exports = ES;

}, function(modId) {var map = {"./helpers/assign":1625038546085,"./es5":1625038546086,"./es2015":1625038546139,"./es2016":1625038546270,"./es2017":1625038546393,"./es2018":1625038546516,"./es2019":1625038546649,"./es2020":1625038546783}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546085, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $assign = GetIntrinsic('%Object%').assign;

module.exports = function assign(target, source) {
	if ($assign) {
		return $assign(target, source);
	}

	// eslint-disable-next-line no-restricted-syntax
	for (var key in source) {
		if (has(source, key)) {
			// eslint-disable-next-line no-param-reassign
			target[key] = source[key];
		}
	}
	return target;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546086, function(require, module, exports) {


/* eslint global-require: 0 */

// https://es5.github.io/#x9
module.exports = {
	'Abstract Equality Comparison': require('./5/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./5/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./5/StrictEqualityComparison'),
	abs: require('./5/abs'),
	CheckObjectCoercible: require('./5/CheckObjectCoercible'),
	DateFromTime: require('./5/DateFromTime'),
	Day: require('./5/Day'),
	DayFromYear: require('./5/DayFromYear'),
	DaysInYear: require('./5/DaysInYear'),
	DayWithinYear: require('./5/DayWithinYear'),
	floor: require('./5/floor'),
	FromPropertyDescriptor: require('./5/FromPropertyDescriptor'),
	HourFromTime: require('./5/HourFromTime'),
	InLeapYear: require('./5/InLeapYear'),
	IsAccessorDescriptor: require('./5/IsAccessorDescriptor'),
	IsCallable: require('./5/IsCallable'),
	IsDataDescriptor: require('./5/IsDataDescriptor'),
	IsGenericDescriptor: require('./5/IsGenericDescriptor'),
	IsPropertyDescriptor: require('./5/IsPropertyDescriptor'),
	MakeDate: require('./5/MakeDate'),
	MakeDay: require('./5/MakeDay'),
	MakeTime: require('./5/MakeTime'),
	MinFromTime: require('./5/MinFromTime'),
	modulo: require('./5/modulo'),
	MonthFromTime: require('./5/MonthFromTime'),
	msFromTime: require('./5/msFromTime'),
	SameValue: require('./5/SameValue'),
	SecFromTime: require('./5/SecFromTime'),
	TimeClip: require('./5/TimeClip'),
	TimeFromYear: require('./5/TimeFromYear'),
	TimeWithinDay: require('./5/TimeWithinDay'),
	ToBoolean: require('./5/ToBoolean'),
	ToInt32: require('./5/ToInt32'),
	ToInteger: require('./5/ToInteger'),
	ToNumber: require('./5/ToNumber'),
	ToObject: require('./5/ToObject'),
	ToPrimitive: require('./5/ToPrimitive'),
	ToPropertyDescriptor: require('./5/ToPropertyDescriptor'),
	ToString: require('./5/ToString'),
	ToUint16: require('./5/ToUint16'),
	ToUint32: require('./5/ToUint32'),
	Type: require('./5/Type'),
	WeekDay: require('./5/WeekDay'),
	YearFromTime: require('./5/YearFromTime')
};

}, function(modId) { var map = {"./5/AbstractEqualityComparison":1625038546087,"./5/AbstractRelationalComparison":1625038546091,"./5/StrictEqualityComparison":1625038546095,"./5/abs":1625038546096,"./5/CheckObjectCoercible":1625038546097,"./5/DateFromTime":1625038546098,"./5/Day":1625038546100,"./5/DayFromYear":1625038546103,"./5/DaysInYear":1625038546106,"./5/DayWithinYear":1625038546099,"./5/floor":1625038546101,"./5/FromPropertyDescriptor":1625038546110,"./5/HourFromTime":1625038546114,"./5/InLeapYear":1625038546105,"./5/IsAccessorDescriptor":1625038546113,"./5/IsCallable":1625038546115,"./5/IsDataDescriptor":1625038546111,"./5/IsGenericDescriptor":1625038546116,"./5/IsPropertyDescriptor":1625038546117,"./5/MakeDate":1625038546119,"./5/MakeDay":1625038546120,"./5/MakeTime":1625038546123,"./5/MinFromTime":1625038546124,"./5/modulo":1625038546107,"./5/MonthFromTime":1625038546109,"./5/msFromTime":1625038546125,"./5/SameValue":1625038546126,"./5/SecFromTime":1625038546127,"./5/TimeClip":1625038546128,"./5/TimeFromYear":1625038546129,"./5/TimeWithinDay":1625038546130,"./5/ToBoolean":1625038546131,"./5/ToInt32":1625038546132,"./5/ToInteger":1625038546121,"./5/ToNumber":1625038546088,"./5/ToObject":1625038546133,"./5/ToPrimitive":1625038546089,"./5/ToPropertyDescriptor":1625038546134,"./5/ToString":1625038546135,"./5/ToUint16":1625038546136,"./5/ToUint32":1625038546137,"./5/Type":1625038546090,"./5/WeekDay":1625038546138,"./5/YearFromTime":1625038546104}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546087, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.3

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546088,"./ToPrimitive":1625038546089,"./Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546088, function(require, module, exports) {


var ToPrimitive = require('./ToPrimitive');

// http://262.ecma-international.org/5.1/#sec-9.3

module.exports = function ToNumber(value) {
	var prim = ToPrimitive(value, Number);
	if (typeof prim !== 'string') {
		return +prim; // eslint-disable-line no-implicit-coercion
	}

	// eslint-disable-next-line no-control-regex
	var trimmed = prim.replace(/^[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+|[ \t\x0b\f\xa0\ufeff\n\r\u2028\u2029\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u0085]+$/g, '');
	if ((/^0[ob]|^[+-]0x/).test(trimmed)) {
		return NaN;
	}

	return +trimmed; // eslint-disable-line no-implicit-coercion
};

}, function(modId) { var map = {"./ToPrimitive":1625038546089}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546089, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.1

module.exports = require('es-to-primitive/es5');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546090, function(require, module, exports) {


// https://262.ecma-international.org/5.1/#sec-8

module.exports = function Type(x) {
	if (x === null) {
		return 'Null';
	}
	if (typeof x === 'undefined') {
		return 'Undefined';
	}
	if (typeof x === 'function' || typeof x === 'object') {
		return 'Object';
	}
	if (typeof x === 'number') {
		return 'Number';
	}
	if (typeof x === 'boolean') {
		return 'Boolean';
	}
	if (typeof x === 'string') {
		return 'String';
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546091, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546088,"./ToPrimitive":1625038546089,"./Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546092, function(require, module, exports) {


module.exports = Number.isNaN || function isNaN(a) {
	return a !== a;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546093, function(require, module, exports) {


var $isNaN = Number.isNaN || function (a) { return a !== a; };

module.exports = Number.isFinite || function (x) { return typeof x === 'number' && !$isNaN(x) && x !== Infinity && x !== -Infinity; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546094, function(require, module, exports) {


var $strSlice = require('call-bind/callBound')('String.prototype.slice');

module.exports = function isPrefixOf(prefix, string) {
	if (prefix === string) {
		return true;
	}
	if (prefix.length > string.length) {
		return false;
	}
	return $strSlice(string, 0, prefix.length) === prefix;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546095, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546096, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546097, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// http://262.ecma-international.org/5.1/#sec-9.10

module.exports = function CheckObjectCoercible(value, optMessage) {
	if (value == null) {
		throw new $TypeError(optMessage || ('Cannot call method on ' + value));
	}
	return value;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546098, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546099,"./InLeapYear":1625038546105,"./MonthFromTime":1625038546109}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546099, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546100,"./DayFromYear":1625038546103,"./YearFromTime":1625038546104}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546100, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546101,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546101, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546102, function(require, module, exports) {


var HoursPerDay = 24;
var MinutesPerHour = 60;
var SecondsPerMinute = 60;
var msPerSecond = 1e3;
var msPerMinute = msPerSecond * SecondsPerMinute;
var msPerHour = msPerMinute * MinutesPerHour;
var msPerDay = 86400000;

module.exports = {
	HoursPerDay: HoursPerDay,
	MinutesPerHour: MinutesPerHour,
	SecondsPerMinute: SecondsPerMinute,
	msPerSecond: msPerSecond,
	msPerMinute: msPerMinute,
	msPerHour: msPerHour,
	msPerDay: msPerDay
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546103, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546101}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546104, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546105, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546106,"./YearFromTime":1625038546104}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546106, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546107}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546107, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546108, function(require, module, exports) {


var $floor = Math.floor;

module.exports = function mod(number, modulo) {
	var remain = number % modulo;
	return $floor(remain >= 0 ? remain : remain + modulo);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546109, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546099,"./InLeapYear":1625038546105}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546110, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.4

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsDataDescriptor(Desc)) {
		return {
			value: Desc['[[Value]]'],
			writable: !!Desc['[[Writable]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else if (IsAccessorDescriptor(Desc)) {
		return {
			get: Desc['[[Get]]'],
			set: Desc['[[Set]]'],
			enumerable: !!Desc['[[Enumerable]]'],
			configurable: !!Desc['[[Configurable]]']
		};
	} else {
		throw new $TypeError('FromPropertyDescriptor must be called with a fully populated Property Descriptor');
	}
};

}, function(modId) { var map = {"./Type":1625038546090,"./IsDataDescriptor":1625038546111,"./IsAccessorDescriptor":1625038546113,"../helpers/assertRecord":1625038546112}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546111, function(require, module, exports) {


var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.2

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"./Type":1625038546090,"../helpers/assertRecord":1625038546112}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546112, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var has = require('has');

var predicates = {
	// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type
	'Property Descriptor': function isPropertyDescriptor(Type, Desc) {
		if (Type(Desc) !== 'Object') {
			return false;
		}
		var allowed = {
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Get]]': true,
			'[[Set]]': true,
			'[[Value]]': true,
			'[[Writable]]': true
		};

		for (var key in Desc) { // eslint-disable-line
			if (has(Desc, key) && !allowed[key]) {
				return false;
			}
		}

		var isData = has(Desc, '[[Value]]');
		var IsAccessor = has(Desc, '[[Get]]') || has(Desc, '[[Set]]');
		if (isData && IsAccessor) {
			throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
		}
		return true;
	}
};

module.exports = function assertRecord(Type, recordType, argumentName, value) {
	var predicate = predicates[recordType];
	if (typeof predicate !== 'function') {
		throw new $SyntaxError('unknown record type: ' + recordType);
	}
	if (!predicate(Type, value)) {
		throw new $TypeError(argumentName + ' must be a ' + recordType);
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546113, function(require, module, exports) {


var has = require('has');

var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.1

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"./Type":1625038546090,"../helpers/assertRecord":1625038546112}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546114, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546101,"./modulo":1625038546107,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546115, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546116, function(require, module, exports) {


var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

var assertRecord = require('../helpers/assertRecord');

// https://262.ecma-international.org/5.1/#sec-8.10.3

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"./IsAccessorDescriptor":1625038546113,"./IsDataDescriptor":1625038546111,"./Type":1625038546090,"../helpers/assertRecord":1625038546112}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546117, function(require, module, exports) {


// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./Type":1625038546090,"./IsDataDescriptor":1625038546111,"./IsAccessorDescriptor":1625038546113}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546118, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');
var $TypeError = GetIntrinsic('%TypeError%');

module.exports = function IsPropertyDescriptor(ES, Desc) {
	if (ES.Type(Desc) !== 'Object') {
		return false;
	}
	var allowed = {
		'[[Configurable]]': true,
		'[[Enumerable]]': true,
		'[[Get]]': true,
		'[[Set]]': true,
		'[[Value]]': true,
		'[[Writable]]': true
	};

	for (var key in Desc) { // eslint-disable-line no-restricted-syntax
		if (has(Desc, key) && !allowed[key]) {
			return false;
		}
	}

	if (ES.IsDataDescriptor(Desc) && ES.IsAccessorDescriptor(Desc)) {
		throw new $TypeError('Property Descriptors may not be both accessor and data descriptors');
	}
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546119, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546120, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546098,"./Day":1625038546100,"./floor":1625038546101,"./modulo":1625038546107,"./MonthFromTime":1625038546109,"./ToInteger":1625038546121,"./YearFromTime":1625038546104}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546121, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.4

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if ($isNaN(number)) { return 0; }
	if (number === 0 || !$isFinite(number)) { return number; }
	return $sign(number) * floor(abs(number));
};

}, function(modId) { var map = {"./abs":1625038546096,"./floor":1625038546101,"./ToNumber":1625038546088,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546122, function(require, module, exports) {


module.exports = function sign(number) {
	return number >= 0 ? 1 : -1;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546123, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546121}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546124, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546101,"./modulo":1625038546107,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546125, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546107,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546126, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546127, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546101,"./modulo":1625038546107,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546128, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546096,"./ToNumber":1625038546088}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546129, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546103}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546130, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546107,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546131, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546132, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546088}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546133, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var CheckObjectCoercible = require('./CheckObjectCoercible');

// http://262.ecma-international.org/5.1/#sec-9.9

module.exports = function ToObject(value) {
	CheckObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546134, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546090,"./ToBoolean":1625038546131,"./IsCallable":1625038546115}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546135, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

// http://262.ecma-international.org/5.1/#sec-9.8

module.exports = function ToString(value) {
	return $String(value);
};


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546136, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546096,"./floor":1625038546101,"./modulo":1625038546107,"./ToNumber":1625038546088,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546137, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546088}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546138, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546100,"./modulo":1625038546107}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546139, function(require, module, exports) {


/* eslint global-require: 0 */
// https://ecma-international.org/ecma-262/6.0/#sec-abstract-operations
var ES6 = {
	'Abstract Equality Comparison': require('./2015/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./2015/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./2015/StrictEqualityComparison'),
	abs: require('./2015/abs'),
	AdvanceStringIndex: require('./2015/AdvanceStringIndex'),
	ArrayCreate: require('./2015/ArrayCreate'),
	ArraySetLength: require('./2015/ArraySetLength'),
	ArraySpeciesCreate: require('./2015/ArraySpeciesCreate'),
	Call: require('./2015/Call'),
	CanonicalNumericIndexString: require('./2015/CanonicalNumericIndexString'),
	CompletePropertyDescriptor: require('./2015/CompletePropertyDescriptor'),
	CreateDataProperty: require('./2015/CreateDataProperty'),
	CreateDataPropertyOrThrow: require('./2015/CreateDataPropertyOrThrow'),
	CreateHTML: require('./2015/CreateHTML'),
	CreateIterResultObject: require('./2015/CreateIterResultObject'),
	CreateListFromArrayLike: require('./2015/CreateListFromArrayLike'),
	CreateMethodProperty: require('./2015/CreateMethodProperty'),
	DateFromTime: require('./2015/DateFromTime'),
	Day: require('./2015/Day'),
	DayFromYear: require('./2015/DayFromYear'),
	DaysInYear: require('./2015/DaysInYear'),
	DayWithinYear: require('./2015/DayWithinYear'),
	DefinePropertyOrThrow: require('./2015/DefinePropertyOrThrow'),
	DeletePropertyOrThrow: require('./2015/DeletePropertyOrThrow'),
	EnumerableOwnNames: require('./2015/EnumerableOwnNames'),
	floor: require('./2015/floor'),
	FromPropertyDescriptor: require('./2015/FromPropertyDescriptor'),
	Get: require('./2015/Get'),
	GetIterator: require('./2015/GetIterator'),
	GetMethod: require('./2015/GetMethod'),
	GetOwnPropertyKeys: require('./2015/GetOwnPropertyKeys'),
	GetPrototypeFromConstructor: require('./2015/GetPrototypeFromConstructor'),
	GetSubstitution: require('./2015/GetSubstitution'),
	GetV: require('./2015/GetV'),
	HasOwnProperty: require('./2015/HasOwnProperty'),
	HasProperty: require('./2015/HasProperty'),
	HourFromTime: require('./2015/HourFromTime'),
	InLeapYear: require('./2015/InLeapYear'),
	InstanceofOperator: require('./2015/InstanceofOperator'),
	Invoke: require('./2015/Invoke'),
	IsAccessorDescriptor: require('./2015/IsAccessorDescriptor'),
	IsArray: require('./2015/IsArray'),
	IsCallable: require('./2015/IsCallable'),
	IsConcatSpreadable: require('./2015/IsConcatSpreadable'),
	IsConstructor: require('./2015/IsConstructor'),
	IsDataDescriptor: require('./2015/IsDataDescriptor'),
	IsExtensible: require('./2015/IsExtensible'),
	IsGenericDescriptor: require('./2015/IsGenericDescriptor'),
	IsInteger: require('./2015/IsInteger'),
	IsPromise: require('./2015/IsPromise'),
	IsPropertyDescriptor: require('./2015/IsPropertyDescriptor'),
	IsPropertyKey: require('./2015/IsPropertyKey'),
	IsRegExp: require('./2015/IsRegExp'),
	IteratorClose: require('./2015/IteratorClose'),
	IteratorComplete: require('./2015/IteratorComplete'),
	IteratorNext: require('./2015/IteratorNext'),
	IteratorStep: require('./2015/IteratorStep'),
	IteratorValue: require('./2015/IteratorValue'),
	MakeDate: require('./2015/MakeDate'),
	MakeDay: require('./2015/MakeDay'),
	MakeTime: require('./2015/MakeTime'),
	MinFromTime: require('./2015/MinFromTime'),
	modulo: require('./2015/modulo'),
	MonthFromTime: require('./2015/MonthFromTime'),
	msFromTime: require('./2015/msFromTime'),
	ObjectCreate: require('./2015/ObjectCreate'),
	OrdinaryCreateFromConstructor: require('./2015/OrdinaryCreateFromConstructor'),
	OrdinaryDefineOwnProperty: require('./2015/OrdinaryDefineOwnProperty'),
	OrdinaryGetOwnProperty: require('./2015/OrdinaryGetOwnProperty'),
	OrdinaryHasInstance: require('./2015/OrdinaryHasInstance'),
	OrdinaryHasProperty: require('./2015/OrdinaryHasProperty'),
	QuoteJSONString: require('./2015/QuoteJSONString'),
	RegExpCreate: require('./2015/RegExpCreate'),
	RegExpExec: require('./2015/RegExpExec'),
	RequireObjectCoercible: require('./2015/RequireObjectCoercible'),
	SameValue: require('./2015/SameValue'),
	SameValueZero: require('./2015/SameValueZero'),
	SecFromTime: require('./2015/SecFromTime'),
	Set: require('./2015/Set'),
	SetFunctionName: require('./2015/SetFunctionName'),
	SetIntegrityLevel: require('./2015/SetIntegrityLevel'),
	SpeciesConstructor: require('./2015/SpeciesConstructor'),
	SplitMatch: require('./2015/SplitMatch'),
	StringCreate: require('./2015/StringCreate'),
	StringGetIndexProperty: require('./2015/StringGetIndexProperty'),
	SymbolDescriptiveString: require('./2015/SymbolDescriptiveString'),
	TestIntegrityLevel: require('./2015/TestIntegrityLevel'),
	thisBooleanValue: require('./2015/thisBooleanValue'),
	thisNumberValue: require('./2015/thisNumberValue'),
	thisStringValue: require('./2015/thisStringValue'),
	thisTimeValue: require('./2015/thisTimeValue'),
	TimeClip: require('./2015/TimeClip'),
	TimeFromYear: require('./2015/TimeFromYear'),
	TimeWithinDay: require('./2015/TimeWithinDay'),
	ToBoolean: require('./2015/ToBoolean'),
	ToDateString: require('./2015/ToDateString'),
	ToInt16: require('./2015/ToInt16'),
	ToInt32: require('./2015/ToInt32'),
	ToInt8: require('./2015/ToInt8'),
	ToInteger: require('./2015/ToInteger'),
	ToLength: require('./2015/ToLength'),
	ToNumber: require('./2015/ToNumber'),
	ToObject: require('./2015/ToObject'),
	ToPrimitive: require('./2015/ToPrimitive'),
	ToPropertyDescriptor: require('./2015/ToPropertyDescriptor'),
	ToPropertyKey: require('./2015/ToPropertyKey'),
	ToString: require('./2015/ToString'),
	ToUint16: require('./2015/ToUint16'),
	ToUint32: require('./2015/ToUint32'),
	ToUint8: require('./2015/ToUint8'),
	ToUint8Clamp: require('./2015/ToUint8Clamp'),
	Type: require('./2015/Type'),
	ValidateAndApplyPropertyDescriptor: require('./2015/ValidateAndApplyPropertyDescriptor'),
	WeekDay: require('./2015/WeekDay'),
	YearFromTime: require('./2015/YearFromTime')
};

module.exports = ES6;

}, function(modId) { var map = {"./2015/AbstractEqualityComparison":1625038546140,"./2015/AbstractRelationalComparison":1625038546146,"./2015/StrictEqualityComparison":1625038546147,"./2015/abs":1625038546148,"./2015/AdvanceStringIndex":1625038546149,"./2015/ArrayCreate":1625038546155,"./2015/ArraySetLength":1625038546156,"./2015/ArraySpeciesCreate":1625038546178,"./2015/Call":1625038546183,"./2015/CanonicalNumericIndexString":1625038546184,"./2015/CompletePropertyDescriptor":1625038546185,"./2015/CreateDataProperty":1625038546186,"./2015/CreateDataPropertyOrThrow":1625038546187,"./2015/CreateHTML":1625038546188,"./2015/CreateIterResultObject":1625038546190,"./2015/CreateListFromArrayLike":1625038546191,"./2015/CreateMethodProperty":1625038546194,"./2015/DateFromTime":1625038546195,"./2015/Day":1625038546197,"./2015/DayFromYear":1625038546198,"./2015/DaysInYear":1625038546201,"./2015/DayWithinYear":1625038546196,"./2015/DefinePropertyOrThrow":1625038546182,"./2015/DeletePropertyOrThrow":1625038546204,"./2015/EnumerableOwnNames":1625038546205,"./2015/floor":1625038546151,"./2015/FromPropertyDescriptor":1625038546172,"./2015/Get":1625038546179,"./2015/GetIterator":1625038546206,"./2015/GetMethod":1625038546208,"./2015/GetOwnPropertyKeys":1625038546211,"./2015/GetPrototypeFromConstructor":1625038546212,"./2015/GetSubstitution":1625038546213,"./2015/GetV":1625038546209,"./2015/HasOwnProperty":1625038546214,"./2015/HasProperty":1625038546215,"./2015/HourFromTime":1625038546216,"./2015/InLeapYear":1625038546200,"./2015/InstanceofOperator":1625038546217,"./2015/Invoke":1625038546219,"./2015/IsAccessorDescriptor":1625038546158,"./2015/IsArray":1625038546157,"./2015/IsCallable":1625038546166,"./2015/IsConcatSpreadable":1625038546220,"./2015/IsConstructor":1625038546180,"./2015/IsDataDescriptor":1625038546159,"./2015/IsExtensible":1625038546162,"./2015/IsGenericDescriptor":1625038546173,"./2015/IsInteger":1625038546150,"./2015/IsPromise":1625038546221,"./2015/IsPropertyDescriptor":1625038546222,"./2015/IsPropertyKey":1625038546163,"./2015/IsRegExp":1625038546175,"./2015/IteratorClose":1625038546223,"./2015/IteratorComplete":1625038546224,"./2015/IteratorNext":1625038546225,"./2015/IteratorStep":1625038546226,"./2015/IteratorValue":1625038546227,"./2015/MakeDate":1625038546228,"./2015/MakeDay":1625038546229,"./2015/MakeTime":1625038546230,"./2015/MinFromTime":1625038546231,"./2015/modulo":1625038546202,"./2015/MonthFromTime":1625038546203,"./2015/msFromTime":1625038546232,"./2015/ObjectCreate":1625038546233,"./2015/OrdinaryCreateFromConstructor":1625038546234,"./2015/OrdinaryDefineOwnProperty":1625038546160,"./2015/OrdinaryGetOwnProperty":1625038546174,"./2015/OrdinaryHasInstance":1625038546218,"./2015/OrdinaryHasProperty":1625038546235,"./2015/QuoteJSONString":1625038546236,"./2015/RegExpCreate":1625038546238,"./2015/RegExpExec":1625038546239,"./2015/RequireObjectCoercible":1625038546189,"./2015/SameValue":1625038546167,"./2015/SameValueZero":1625038546240,"./2015/SecFromTime":1625038546241,"./2015/Set":1625038546242,"./2015/SetFunctionName":1625038546243,"./2015/SetIntegrityLevel":1625038546246,"./2015/SpeciesConstructor":1625038546247,"./2015/SplitMatch":1625038546248,"./2015/StringCreate":1625038546249,"./2015/StringGetIndexProperty":1625038546251,"./2015/SymbolDescriptiveString":1625038546252,"./2015/TestIntegrityLevel":1625038546253,"./2015/thisBooleanValue":1625038546254,"./2015/thisNumberValue":1625038546255,"./2015/thisStringValue":1625038546256,"./2015/thisTimeValue":1625038546257,"./2015/TimeClip":1625038546258,"./2015/TimeFromYear":1625038546259,"./2015/TimeWithinDay":1625038546260,"./2015/ToBoolean":1625038546165,"./2015/ToDateString":1625038546261,"./2015/ToInt16":1625038546262,"./2015/ToInt32":1625038546264,"./2015/ToInt8":1625038546265,"./2015/ToInteger":1625038546193,"./2015/ToLength":1625038546192,"./2015/ToNumber":1625038546141,"./2015/ToObject":1625038546210,"./2015/ToPrimitive":1625038546144,"./2015/ToPropertyDescriptor":1625038546164,"./2015/ToPropertyKey":1625038546267,"./2015/ToString":1625038546176,"./2015/ToUint16":1625038546263,"./2015/ToUint32":1625038546177,"./2015/ToUint8":1625038546266,"./2015/ToUint8Clamp":1625038546268,"./2015/Type":1625038546145,"./2015/ValidateAndApplyPropertyDescriptor":1625038546168,"./2015/WeekDay":1625038546269,"./2015/YearFromTime":1625038546199}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546140, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546141,"./ToPrimitive":1625038546144,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546141, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var isPrimitive = require('../helpers/isPrimitive');

var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ToPrimitive = require('./ToPrimitive');

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

module.exports = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546144}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546142, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $test = GetIntrinsic('RegExp.prototype.test');

var callBind = require('call-bind');

module.exports = function regexTester(regex) {
	return callBind($test, regex);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546143, function(require, module, exports) {


module.exports = function isPrimitive(value) {
	return value === null || (typeof value !== 'function' && typeof value !== 'object');
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546144, function(require, module, exports) {


var toPrimitive = require('es-to-primitive/es2015');

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

module.exports = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546145, function(require, module, exports) {


var ES5Type = require('../5/Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};

}, function(modId) { var map = {"../5/Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546146, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546141,"./ToPrimitive":1625038546144,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546147, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546148, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546149, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $TypeError = GetIntrinsic('%TypeError%');

var $charCodeAt = require('call-bind/callBound')('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

module.exports = function AdvanceStringIndex(S, index, unicode) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type(unicode) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (!isLeadingSurrogate(first)) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (!isTrailingSurrogate(second)) {
		return index + 1;
	}

	return index + 2;
};

}, function(modId) { var map = {"./IsInteger":1625038546150,"./Type":1625038546145,"../helpers/maxSafeInteger":1625038546152,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546150, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

module.exports = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
		return false;
	}
	var absValue = abs(argument);
	return floor(absValue) === absValue;
};

}, function(modId) { var map = {"./abs":1625038546148,"./floor":1625038546151,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546151, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546152, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Math = GetIntrinsic('%Math%');
var $Number = GetIntrinsic('%Number%');

module.exports = $Number.MAX_SAFE_INTEGER || $Math.pow(2, 53) - 1;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546153, function(require, module, exports) {


module.exports = function isLeadingSurrogate(charCode) {
	return typeof charCode === 'number' && charCode >= 0xD800 && charCode <= 0xDBFF;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546154, function(require, module, exports) {


module.exports = function isTrailingSurrogate(charCode) {
	return typeof charCode === 'number' && charCode >= 0xDC00 && charCode <= 0xDFFF;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546155, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

module.exports = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

}, function(modId) { var map = {"./IsInteger":1625038546150}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546156, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var assign = require('object.assign');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsArray = require('./IsArray');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var OrdinaryDefineOwnProperty = require('./OrdinaryDefineOwnProperty');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./IsArray":1625038546157,"./IsAccessorDescriptor":1625038546158,"./IsDataDescriptor":1625038546159,"./OrdinaryDefineOwnProperty":1625038546160,"./OrdinaryGetOwnProperty":1625038546174,"./ToNumber":1625038546141,"./ToString":1625038546176,"./ToUint32":1625038546177,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546157, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('call-bind/callBound')('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546158, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546159, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546160, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var SameValue = require('./SameValue');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/isPropertyDescriptor":1625038546118,"./IsAccessorDescriptor":1625038546158,"./IsDataDescriptor":1625038546159,"./IsExtensible":1625038546162,"./IsPropertyKey":1625038546163,"./ToPropertyDescriptor":1625038546164,"./SameValue":1625038546167,"./Type":1625038546145,"./ValidateAndApplyPropertyDescriptor":1625038546168}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546161, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%');
if ($gOPD) {
	try {
		$gOPD([], 'length');
	} catch (e) {
		// IE 8 has a broken gOPD
		$gOPD = null;
	}
}

module.exports = $gOPD;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546162, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546163, function(require, module, exports) {


// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546164, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546145,"./ToBoolean":1625038546165,"./IsCallable":1625038546166}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546165, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546166, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546167, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546168, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');
var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var isSamePropertyDescriptor = require('../helpers/isSamePropertyDescriptor');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
module.exports = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError('Assertion failed: O must be undefined or an Object');
	}
	if (Type(extensible) !== 'Boolean') {
		throw new $TypeError('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) {
		// no further validation is required.
	} else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"../helpers/isPropertyDescriptor":1625038546118,"../helpers/isSamePropertyDescriptor":1625038546170,"./FromPropertyDescriptor":1625038546172,"./IsAccessorDescriptor":1625038546158,"./IsDataDescriptor":1625038546159,"./IsGenericDescriptor":1625038546173,"./IsPropertyKey":1625038546163,"./SameValue":1625038546167,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546169, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);

if ($defineProperty) {
	try {
		$defineProperty({}, 'a', { value: 1 });
	} catch (e) {
		// IE 8 has a broken defineProperty
		$defineProperty = null;
	}
}

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

// eslint-disable-next-line max-params
module.exports = function DefineOwnProperty(IsDataDescriptor, SameValue, FromPropertyDescriptor, O, P, desc) {
	if (!$defineProperty) {
		if (!IsDataDescriptor(desc)) {
			// ES3 does not support getters/setters
			return false;
		}
		if (!desc['[[Configurable]]'] || !desc['[[Writable]]']) {
			return false;
		}

		// fallback for ES3
		if (P in O && $isEnumerable(O, P) !== !!desc['[[Enumerable]]']) {
			// a non-enumerable existing property
			return false;
		}

		// property does not exist at all, or exists but is enumerable
		var V = desc['[[Value]]'];
		// eslint-disable-next-line no-param-reassign
		O[P] = V; // will use [[Define]]
		return SameValue(O[P], V);
	}
	$defineProperty(O, P, FromPropertyDescriptor(desc));
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546170, function(require, module, exports) {


var every = require('./every');

module.exports = function isSamePropertyDescriptor(ES, D1, D2) {
	var fields = [
		'[[Configurable]]',
		'[[Enumerable]]',
		'[[Get]]',
		'[[Set]]',
		'[[Value]]',
		'[[Writable]]'
	];
	return every(fields, function (field) {
		if ((field in D1) !== (field in D2)) {
			return false;
		}
		return ES.SameValue(D1[field], D2[field]);
	});
};

}, function(modId) { var map = {"./every":1625038546171}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546171, function(require, module, exports) {


module.exports = function every(array, predicate) {
	for (var i = 0; i < array.length; i += 1) {
		if (!predicate(array[i], i, array)) {
			return false;
		}
	}
	return true;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546172, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546173, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsAccessorDescriptor":1625038546158,"./IsDataDescriptor":1625038546159,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546174, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"./IsArray":1625038546157,"./IsPropertyKey":1625038546163,"./IsRegExp":1625038546175,"./ToPropertyDescriptor":1625038546164,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546175, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

}, function(modId) { var map = {"./ToBoolean":1625038546165}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546176, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546177, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546141}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546178, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsConstructor = require('./IsConstructor');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

module.exports = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};


}, function(modId) { var map = {"./Get":1625038546179,"./IsArray":1625038546157,"./IsConstructor":1625038546180,"./IsInteger":1625038546150,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546179, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var inspect = require('object-inspect');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

module.exports = function Get(O, P) {
	// 7.3.1.1
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
	}
	// 7.3.1.3
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546180, function(require, module, exports) {


var GetIntrinsic = require('../GetIntrinsic.js');

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

}, function(modId) { var map = {"../GetIntrinsic.js":1625038546181,"./DefinePropertyOrThrow":1625038546182}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546181, function(require, module, exports) {


// TODO: remove, semver-major

module.exports = require('get-intrinsic');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546182, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546172,"./IsAccessorDescriptor":1625038546158,"./IsDataDescriptor":1625038546159,"./IsPropertyKey":1625038546163,"./SameValue":1625038546167,"./ToPropertyDescriptor":1625038546164,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546183, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('./IsArray');

var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

module.exports = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

}, function(modId) { var map = {"./IsArray":1625038546157}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546184, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

module.exports = function CanonicalNumericIndexString(argument) {
	if (Type(argument) !== 'String') {
		throw new $TypeError('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

}, function(modId) { var map = {"./SameValue":1625038546167,"./ToNumber":1625038546141,"./ToString":1625038546176,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546185, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

module.exports = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!has(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsDataDescriptor":1625038546159,"./IsGenericDescriptor":1625038546173,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546186, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546172,"./OrdinaryGetOwnProperty":1625038546174,"./IsDataDescriptor":1625038546159,"./IsExtensible":1625038546162,"./IsPropertyKey":1625038546163,"./SameValue":1625038546167,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546187, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};

}, function(modId) { var map = {"./CreateDataProperty":1625038546186,"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546188, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

module.exports = function CreateHTML(string, tag, attribute, value) {
	if (Type(tag) !== 'String' || Type(attribute) !== 'String') {
		throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546189,"./ToString":1625038546176,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546189, function(require, module, exports) {


module.exports = require('../5/CheckObjectCoercible');

}, function(modId) { var map = {"../5/CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546190, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

module.exports = function CreateIterResultObject(value, done) {
	if (Type(done) !== 'Boolean') {
		throw new $TypeError('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546191, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $indexOf = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToLength = require('./ToLength');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
module.exports = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength(Get(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type(next);
		if ($indexOf(elementTypes, nextType) < 0) {
			throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

}, function(modId) { var map = {"./Get":1625038546179,"./IsArray":1625038546157,"./ToLength":1625038546192,"./ToString":1625038546176,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546192, function(require, module, exports) {


var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var ToInteger = require('./ToInteger');

module.exports = function ToLength(argument) {
	var len = ToInteger(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
	return len;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./ToInteger":1625038546193}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546193, function(require, module, exports) {


var ES5ToInteger = require('../5/ToInteger');

var ToNumber = require('./ToNumber');

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	return ES5ToInteger(number);
};

}, function(modId) { var map = {"../5/ToInteger":1625038546121,"./ToNumber":1625038546141}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546194, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

module.exports = function CreateMethodProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546172,"./IsDataDescriptor":1625038546159,"./IsPropertyKey":1625038546163,"./SameValue":1625038546167,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546195, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546196,"./InLeapYear":1625038546200,"./MonthFromTime":1625038546203}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546196, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546197,"./DayFromYear":1625038546198,"./YearFromTime":1625038546199}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546197, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546151,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546198, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546151}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546199, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546200, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546201,"./YearFromTime":1625038546199}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546201, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546202}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546202, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546203, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546196,"./InLeapYear":1625038546200}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546204, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

module.exports = function DeletePropertyOrThrow(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError('Attempt to delete property failed.');
	}
	return success;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546205, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var keys = require('object-keys');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-enumerableownnames

module.exports = function EnumerableOwnNames(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	return keys(O);
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546206, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

module.exports = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray,
				Type: Type
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	return iterator;
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546149,"./Call":1625038546183,"./GetMethod":1625038546208,"./IsArray":1625038546157,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546207, function(require, module, exports) {


var hasSymbols = require('has-symbols')();
var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $iterator = GetIntrinsic('%Symbol.iterator%', true);
var $stringSlice = callBound('String.prototype.slice');

module.exports = function getIteratorMethod(ES, iterable) {
	var usingIterator;
	if (hasSymbols) {
		usingIterator = ES.GetMethod(iterable, $iterator);
	} else if (ES.IsArray(iterable)) {
		usingIterator = function () {
			var i = -1;
			var arr = this; // eslint-disable-line no-invalid-this
			return {
				next: function () {
					i += 1;
					return {
						done: i >= arr.length,
						value: arr[i]
					};
				}
			};
		};
	} else if (ES.Type(iterable) === 'String') {
		usingIterator = function () {
			var i = 0;
			return {
				next: function () {
					var nextIndex = ES.AdvanceStringIndex(iterable, i, true);
					var value = $stringSlice(iterable, i, nextIndex);
					i = nextIndex;
					return {
						done: nextIndex > iterable.length,
						value: value
					};
				}
			};
		};
	}
	return usingIterator;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546208, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetV = require('./GetV');
var IsCallable = require('./IsCallable');
var IsPropertyKey = require('./IsPropertyKey');

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

module.exports = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

}, function(modId) { var map = {"./GetV":1625038546209,"./IsCallable":1625038546166,"./IsPropertyKey":1625038546163}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546209, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var ToObject = require('./ToObject');

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

module.exports = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./ToObject":1625038546210}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546210, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546189}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546211, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var hasSymbols = require('has-symbols')();

var $TypeError = GetIntrinsic('%TypeError%');

var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic('%Object.getOwnPropertySymbols%');
var keys = require('object-keys');

var esType = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

module.exports = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN) {
			return keys(O);
		}
		return $gOPN(O);
	}
	throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546212, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Function = GetIntrinsic('%Function%');
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

module.exports = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

}, function(modId) { var map = {"./Get":1625038546179,"./IsConstructor":1625038546180,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546213, function(require, module, exports) {



var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $parseInt = GetIntrinsic('%parseInt%');

var inspect = require('object-inspect');

var regexTester = require('../helpers/regexTester');
var callBound = require('call-bind/callBound');
var every = require('../helpers/every');

var isDigit = regexTester(/^[0-9]$/);

var $charAt = callBound('String.prototype.charAt');
var $strSlice = callBound('String.prototype.slice');

var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type(capture) === 'Undefined');
};

// https://ecma-international.org/ecma-262/6.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
module.exports = function GetSubstitution(matched, str, position, captures, replacement) {
	if (Type(matched) !== 'String') {
		throw new $TypeError('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type(replacement) !== 'String') {
		throw new $TypeError('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/every":1625038546171,"./IsArray":1625038546157,"./IsInteger":1625038546150,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546214, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var has = require('has');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

module.exports = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546215, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546216, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546151,"./modulo":1625038546202,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546217, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var OrdinaryHasInstance = require('./OrdinaryHasInstance');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

module.exports = function InstanceofOperator(O, C) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

}, function(modId) { var map = {"./Call":1625038546183,"./GetMethod":1625038546208,"./IsCallable":1625038546166,"./OrdinaryHasInstance":1625038546218,"./ToBoolean":1625038546165,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546218, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

module.exports = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type(P) !== 'Object') {
		throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

}, function(modId) { var map = {"./Get":1625038546179,"./IsCallable":1625038546166,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546219, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var IsArray = require('./IsArray');
var GetV = require('./GetV');
var IsPropertyKey = require('./IsPropertyKey');

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

module.exports = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

}, function(modId) { var map = {"./Call":1625038546183,"./IsArray":1625038546157,"./GetV":1625038546209,"./IsPropertyKey":1625038546163}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546220, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

module.exports = function IsConcatSpreadable(O) {
	if (Type(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

}, function(modId) { var map = {"./Get":1625038546179,"./IsArray":1625038546157,"./ToBoolean":1625038546165,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546221, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $PromiseThen = callBound('Promise.prototype.then', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

module.exports = function IsPromise(x) {
	if (Type(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546222, function(require, module, exports) {


// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./Type":1625038546145,"./IsDataDescriptor":1625038546159,"./IsAccessorDescriptor":1625038546158}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546223, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

module.exports = function IteratorClose(iterator, completion) {
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type(innerResult) !== 'Object') {
		throw new $TypeError('iterator .return must return an object');
	}

	return completionRecord;
};

}, function(modId) { var map = {"./Call":1625038546183,"./GetMethod":1625038546208,"./IsCallable":1625038546166,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546224, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

module.exports = function IteratorComplete(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

}, function(modId) { var map = {"./Get":1625038546179,"./ToBoolean":1625038546165,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546225, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Invoke = require('./Invoke');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

module.exports = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type(result) !== 'Object') {
		throw new $TypeError('iterator next must return an object');
	}
	return result;
};

}, function(modId) { var map = {"./Invoke":1625038546219,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546226, function(require, module, exports) {


var IteratorComplete = require('./IteratorComplete');
var IteratorNext = require('./IteratorNext');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

module.exports = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};


}, function(modId) { var map = {"./IteratorComplete":1625038546224,"./IteratorNext":1625038546225}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546227, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

module.exports = function IteratorValue(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};


}, function(modId) { var map = {"./Get":1625038546179,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546228, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546229, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546195,"./Day":1625038546197,"./floor":1625038546151,"./modulo":1625038546202,"./MonthFromTime":1625038546203,"./ToInteger":1625038546193,"./YearFromTime":1625038546199}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546230, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546193}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546231, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546151,"./modulo":1625038546202,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546232, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546202,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546233, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var Type = require('./Type');

var hasProto = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

module.exports = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546234, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var GetPrototypeFromConstructor = require('./GetPrototypeFromConstructor');
var IsArray = require('./IsArray');
var ObjectCreate = require('./ObjectCreate');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

module.exports = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate(proto, slots);
};

}, function(modId) { var map = {"./GetPrototypeFromConstructor":1625038546212,"./IsArray":1625038546157,"./ObjectCreate":1625038546233}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546235, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546236, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $numberToString = callBound('Number.prototype.toString');
var $toLowerCase = callBound('String.prototype.toLowerCase');
var $strSlice = callBound('String.prototype.slice');
var $strSplit = callBound('String.prototype.split');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-quotejsonstring

var escapes = {
	'\u0008': 'b',
	'\u000C': 'f',
	'\u000A': 'n',
	'\u000D': 'r',
	'\u0009': 't'
};

module.exports = function QuoteJSONString(value) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach($strSplit(value), function (C) {
			if (C === '"' || C === '\\') {
				product += '\u005C' + C;
			} else if (C === '\u0008' || C === '\u000C' || C === '\u000A' || C === '\u000D' || C === '\u0009') {
				var abbrev = escapes[C];
				product += '\u005C' + abbrev;
			} else {
				var cCharCode = $charCodeAt(C, 0);
				if (cCharCode < 0x20) {
					product += '\u005Cu' + $toLowerCase($strSlice('0000' + $numberToString(cCharCode, 16), -4));
				} else {
					product += C;
				}
			}
		});
	}
	product += '"';
	return product;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546237, function(require, module, exports) {


module.exports = function forEach(array, callback) {
	for (var i = 0; i < array.length; i += 1) {
		callback(array[i], i, array); // eslint-disable-line callback-return
	}
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546238, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RegExp = GetIntrinsic('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString = require('./ToString');

// https://262.ecma-international.org/6.0/#sec-regexpcreate

module.exports = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString(P);
	var flags = typeof F === 'undefined' ? '' : ToString(F);
	return new $RegExp(pattern, flags);
};

}, function(modId) { var map = {"./ToString":1625038546176}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546239, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var regexExec = require('call-bind/callBound')('RegExp.prototype.exec');

var Call = require('./Call');
var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

module.exports = function RegExpExec(R, S) {
	if (Type(R) !== 'Object') {
		throw new $TypeError('Assertion failed: `R` must be an Object');
	}
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type(result) === 'Object') {
			return result;
		}
		throw new $TypeError('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

}, function(modId) { var map = {"./Call":1625038546183,"./Get":1625038546179,"./IsCallable":1625038546166,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546240, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

module.exports = function SameValueZero(x, y) {
	return (x === y) || ($isNaN(x) && $isNaN(y));
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546241, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546151,"./modulo":1625038546202,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546242, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

module.exports = function Set(O, P, V, Throw) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	if (Type(Throw) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue(O[P], V)) {
			throw new $TypeError('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546163,"./SameValue":1625038546167,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546243, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

var getSymbolDescription = require('../helpers/getSymbolDescription');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsExtensible = require('./IsExtensible');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

module.exports = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || has(F, 'name')) {
		throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

}, function(modId) { var map = {"../helpers/getSymbolDescription":1625038546244,"./DefinePropertyOrThrow":1625038546182,"./IsExtensible":1625038546162,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546244, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var getGlobalSymbolDescription = GetIntrinsic('%Symbol.keyFor%', true);
var thisSymbolValue = callBound('%Symbol.prototype.valueOf%', true);
var symToStr = callBound('Symbol.prototype.toString', true);

var getInferredName = require('./getInferredName');

/* eslint-disable consistent-return */
module.exports = callBound('%Symbol.prototype.description%', true) || function getSymbolDescription(symbol) {
	if (!thisSymbolValue) {
		throw new $SyntaxError('Symbols are not supported in this environment');
	}

	// will throw if not a symbol primitive or wrapper object
	var sym = thisSymbolValue(symbol);

	if (getInferredName) {
		var name = getInferredName(sym);
		if (name === '') { return; }
		return name.slice(1, -1); // name.slice('['.length, -']'.length);
	}

	var desc;
	if (getGlobalSymbolDescription) {
		desc = getGlobalSymbolDescription(sym);
		if (typeof desc === 'string') {
			return desc;
		}
	}

	desc = symToStr(sym).slice(7, -1); // str.slice('Symbol('.length, -')'.length);
	if (desc) {
		return desc;
	}
};

}, function(modId) { var map = {"./getInferredName":1625038546245}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546245, function(require, module, exports) {


var getInferredName;
try {
	// eslint-disable-next-line no-new-func
	getInferredName = Function('s', 'return { [s]() {} }[s].name;');
} catch (e) {}

var inferred = function () {};
module.exports = getInferredName && inferred.name === 'inferred' ? getInferredName : null;

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546246, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $preventExtensions = GetIntrinsic('%Object.preventExtensions%');
var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');

var forEach = require('../helpers/forEach');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

module.exports = function SetIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/forEach":1625038546237,"./DefinePropertyOrThrow":1625038546182,"./IsAccessorDescriptor":1625038546158,"./ToPropertyDescriptor":1625038546164,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546247, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};

}, function(modId) { var map = {"./IsConstructor":1625038546180,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546248, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var $charAt = callBound('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

module.exports = function SplitMatch(S, q, R) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(q)) {
		throw new $TypeError('Assertion failed: `q` must be an integer');
	}
	if (Type(R) !== 'String') {
		throw new $TypeError('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt(S, q + i) !== $charAt(R, i)) {
			return false;
		}
	}

	return q + r;
};

}, function(modId) { var map = {"./IsInteger":1625038546150,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546249, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');
var $StringPrototype = GetIntrinsic('%String.prototype%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var Type = require('./Type');

var setProto = require('../helpers/setProto');

// https://262.ecma-international.org/6.0/#sec-stringcreate

module.exports = function StringCreate(value, prototype) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546182,"./Type":1625038546145,"../helpers/setProto":1625038546250}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546250, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var originalSetProto = GetIntrinsic('%Object.setPrototypeOf%', true);
var $ArrayProto = GetIntrinsic('%Array.prototype%');

module.exports = originalSetProto || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayProto
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546251, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var $charAt = callBound('String.prototype.charAt');

var isString = require('is-string');
var isNegativeZero = require('is-negative-zero');
var unbox = require('unbox-primitive');

var CanonicalNumericIndexString = require('./CanonicalNumericIndexString');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://262.ecma-international.org/6.0/#sec-stringgetindexproperty

module.exports = function StringGetIndexProperty(S, P) {
	if (typeof S === 'string' || !isString(S)) {
		throw new $TypeError('Assertion failed: `S` must be a boxed String Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}

	if (Type(P) !== 'String') {
		return void undefined;
	}

	var index = CanonicalNumericIndexString(P);
	if (typeof index === 'undefined' || !IsInteger(index) || isNegativeZero(index)) {
		return void undefined;
	}

	var str = unbox(S);
	var len = str.length;
	if (index < 0 || len <= index) {
		return void undefined;
	}

	var resultStr = $charAt(str, index);

	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

}, function(modId) { var map = {"./CanonicalNumericIndexString":1625038546184,"./IsInteger":1625038546150,"./IsPropertyKey":1625038546163,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546252, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $SymbolToString = callBound('Symbol.prototype.toString', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

module.exports = function SymbolDescriptiveString(sym) {
	if (Type(sym) !== 'Symbol') {
		throw new $TypeError('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546253, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError = GetIntrinsic('%TypeError%');

var every = require('../helpers/every');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

module.exports = function TestIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/every":1625038546171,"./IsDataDescriptor":1625038546159,"./IsExtensible":1625038546162,"./ToPropertyDescriptor":1625038546164,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546254, function(require, module, exports) {


var $BooleanValueOf = require('call-bind/callBound')('Boolean.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

module.exports = function thisBooleanValue(value) {
	if (Type(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546255, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var Type = require('./Type');

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

module.exports = function thisNumberValue(value) {
	if (Type(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};


}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546256, function(require, module, exports) {


var $StringValueOf = require('call-bind/callBound')('String.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

module.exports = function thisStringValue(value) {
	if (Type(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546257, function(require, module, exports) {


var $DateValueOf = require('call-bind/callBound')('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

module.exports = function thisTimeValue(value) {
	return $DateValueOf(value);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546258, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546148,"./ToNumber":1625038546141}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546259, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546198}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546260, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546202,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546261, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Date = GetIntrinsic('%Date%');

var $isNaN = require('../helpers/isNaN');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

module.exports = function ToDateString(tv) {
	if (Type(tv) !== 'Number') {
		throw new $TypeError('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"./Type":1625038546145}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546262, function(require, module, exports) {


var ToUint16 = require('./ToUint16');

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

module.exports = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

}, function(modId) { var map = {"./ToUint16":1625038546263}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546263, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546148,"./floor":1625038546151,"./modulo":1625038546202,"./ToNumber":1625038546141,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546264, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546141}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546265, function(require, module, exports) {


var ToUint8 = require('./ToUint8');

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

module.exports = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

}, function(modId) { var map = {"./ToUint8":1625038546266}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546266, function(require, module, exports) {


var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

module.exports = function ToUint8(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x100);
};

}, function(modId) { var map = {"./ToNumber":1625038546141,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122,"./abs":1625038546148,"./floor":1625038546151,"./modulo":1625038546202}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546267, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

var ToPrimitive = require('./ToPrimitive');
var ToString = require('./ToString');

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

module.exports = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

}, function(modId) { var map = {"./ToPrimitive":1625038546144,"./ToString":1625038546176}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546268, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

module.exports = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

}, function(modId) { var map = {"./ToNumber":1625038546141,"./floor":1625038546151,"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546269, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546197,"./modulo":1625038546202}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546270, function(require, module, exports) {


/* eslint global-require: 0 */
// https://262.ecma-international.org/7.0/#sec-abstract-operations
var ES2016 = {
	'Abstract Equality Comparison': require('./2016/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./2016/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./2016/StrictEqualityComparison'),
	abs: require('./2016/abs'),
	AdvanceStringIndex: require('./2016/AdvanceStringIndex'),
	ArrayCreate: require('./2016/ArrayCreate'),
	ArraySetLength: require('./2016/ArraySetLength'),
	ArraySpeciesCreate: require('./2016/ArraySpeciesCreate'),
	Call: require('./2016/Call'),
	CanonicalNumericIndexString: require('./2016/CanonicalNumericIndexString'),
	CompletePropertyDescriptor: require('./2016/CompletePropertyDescriptor'),
	CreateDataProperty: require('./2016/CreateDataProperty'),
	CreateDataPropertyOrThrow: require('./2016/CreateDataPropertyOrThrow'),
	CreateHTML: require('./2016/CreateHTML'),
	CreateIterResultObject: require('./2016/CreateIterResultObject'),
	CreateListFromArrayLike: require('./2016/CreateListFromArrayLike'),
	CreateMethodProperty: require('./2016/CreateMethodProperty'),
	DateFromTime: require('./2016/DateFromTime'),
	Day: require('./2016/Day'),
	DayFromYear: require('./2016/DayFromYear'),
	DaysInYear: require('./2016/DaysInYear'),
	DayWithinYear: require('./2016/DayWithinYear'),
	DefinePropertyOrThrow: require('./2016/DefinePropertyOrThrow'),
	DeletePropertyOrThrow: require('./2016/DeletePropertyOrThrow'),
	EnumerableOwnNames: require('./2016/EnumerableOwnNames'),
	floor: require('./2016/floor'),
	FromPropertyDescriptor: require('./2016/FromPropertyDescriptor'),
	Get: require('./2016/Get'),
	GetIterator: require('./2016/GetIterator'),
	GetMethod: require('./2016/GetMethod'),
	GetOwnPropertyKeys: require('./2016/GetOwnPropertyKeys'),
	GetPrototypeFromConstructor: require('./2016/GetPrototypeFromConstructor'),
	GetSubstitution: require('./2016/GetSubstitution'),
	GetV: require('./2016/GetV'),
	HasOwnProperty: require('./2016/HasOwnProperty'),
	HasProperty: require('./2016/HasProperty'),
	HourFromTime: require('./2016/HourFromTime'),
	InLeapYear: require('./2016/InLeapYear'),
	InstanceofOperator: require('./2016/InstanceofOperator'),
	Invoke: require('./2016/Invoke'),
	IsAccessorDescriptor: require('./2016/IsAccessorDescriptor'),
	IsArray: require('./2016/IsArray'),
	IsCallable: require('./2016/IsCallable'),
	IsConcatSpreadable: require('./2016/IsConcatSpreadable'),
	IsConstructor: require('./2016/IsConstructor'),
	IsDataDescriptor: require('./2016/IsDataDescriptor'),
	IsExtensible: require('./2016/IsExtensible'),
	IsGenericDescriptor: require('./2016/IsGenericDescriptor'),
	IsInteger: require('./2016/IsInteger'),
	IsPromise: require('./2016/IsPromise'),
	IsPropertyDescriptor: require('./2016/IsPropertyDescriptor'),
	IsPropertyKey: require('./2016/IsPropertyKey'),
	IsRegExp: require('./2016/IsRegExp'),
	IterableToArrayLike: require('./2016/IterableToArrayLike'),
	IteratorClose: require('./2016/IteratorClose'),
	IteratorComplete: require('./2016/IteratorComplete'),
	IteratorNext: require('./2016/IteratorNext'),
	IteratorStep: require('./2016/IteratorStep'),
	IteratorValue: require('./2016/IteratorValue'),
	MakeDate: require('./2016/MakeDate'),
	MakeDay: require('./2016/MakeDay'),
	MakeTime: require('./2016/MakeTime'),
	MinFromTime: require('./2016/MinFromTime'),
	modulo: require('./2016/modulo'),
	MonthFromTime: require('./2016/MonthFromTime'),
	msFromTime: require('./2016/msFromTime'),
	ObjectCreate: require('./2016/ObjectCreate'),
	OrdinaryCreateFromConstructor: require('./2016/OrdinaryCreateFromConstructor'),
	OrdinaryDefineOwnProperty: require('./2016/OrdinaryDefineOwnProperty'),
	OrdinaryGetOwnProperty: require('./2016/OrdinaryGetOwnProperty'),
	OrdinaryGetPrototypeOf: require('./2016/OrdinaryGetPrototypeOf'),
	OrdinaryHasInstance: require('./2016/OrdinaryHasInstance'),
	OrdinaryHasProperty: require('./2016/OrdinaryHasProperty'),
	OrdinarySetPrototypeOf: require('./2016/OrdinarySetPrototypeOf'),
	QuoteJSONString: require('./2016/QuoteJSONString'),
	RegExpCreate: require('./2016/RegExpCreate'),
	RegExpExec: require('./2016/RegExpExec'),
	RequireObjectCoercible: require('./2016/RequireObjectCoercible'),
	SameValue: require('./2016/SameValue'),
	SameValueNonNumber: require('./2016/SameValueNonNumber'),
	SameValueZero: require('./2016/SameValueZero'),
	SecFromTime: require('./2016/SecFromTime'),
	Set: require('./2016/Set'),
	SetFunctionName: require('./2016/SetFunctionName'),
	SetIntegrityLevel: require('./2016/SetIntegrityLevel'),
	SpeciesConstructor: require('./2016/SpeciesConstructor'),
	SplitMatch: require('./2016/SplitMatch'),
	StringCreate: require('./2016/StringCreate'),
	SymbolDescriptiveString: require('./2016/SymbolDescriptiveString'),
	TestIntegrityLevel: require('./2016/TestIntegrityLevel'),
	thisBooleanValue: require('./2016/thisBooleanValue'),
	thisNumberValue: require('./2016/thisNumberValue'),
	thisStringValue: require('./2016/thisStringValue'),
	thisTimeValue: require('./2016/thisTimeValue'),
	TimeClip: require('./2016/TimeClip'),
	TimeFromYear: require('./2016/TimeFromYear'),
	TimeWithinDay: require('./2016/TimeWithinDay'),
	ToBoolean: require('./2016/ToBoolean'),
	ToDateString: require('./2016/ToDateString'),
	ToInt16: require('./2016/ToInt16'),
	ToInt32: require('./2016/ToInt32'),
	ToInt8: require('./2016/ToInt8'),
	ToInteger: require('./2016/ToInteger'),
	ToLength: require('./2016/ToLength'),
	ToNumber: require('./2016/ToNumber'),
	ToObject: require('./2016/ToObject'),
	ToPrimitive: require('./2016/ToPrimitive'),
	ToPropertyDescriptor: require('./2016/ToPropertyDescriptor'),
	ToPropertyKey: require('./2016/ToPropertyKey'),
	ToString: require('./2016/ToString'),
	ToUint16: require('./2016/ToUint16'),
	ToUint32: require('./2016/ToUint32'),
	ToUint8: require('./2016/ToUint8'),
	ToUint8Clamp: require('./2016/ToUint8Clamp'),
	Type: require('./2016/Type'),
	UTF16Decode: require('./2016/UTF16Decode'),
	UTF16Encoding: require('./2016/UTF16Encoding'),
	ValidateAndApplyPropertyDescriptor: require('./2016/ValidateAndApplyPropertyDescriptor'),
	WeekDay: require('./2016/WeekDay'),
	YearFromTime: require('./2016/YearFromTime')
};

module.exports = ES2016;

}, function(modId) { var map = {"./2016/AbstractEqualityComparison":1625038546271,"./2016/AbstractRelationalComparison":1625038546275,"./2016/StrictEqualityComparison":1625038546276,"./2016/abs":1625038546277,"./2016/AdvanceStringIndex":1625038546278,"./2016/ArrayCreate":1625038546281,"./2016/ArraySetLength":1625038546282,"./2016/ArraySpeciesCreate":1625038546300,"./2016/Call":1625038546304,"./2016/CanonicalNumericIndexString":1625038546305,"./2016/CompletePropertyDescriptor":1625038546306,"./2016/CreateDataProperty":1625038546307,"./2016/CreateDataPropertyOrThrow":1625038546308,"./2016/CreateHTML":1625038546309,"./2016/CreateIterResultObject":1625038546311,"./2016/CreateListFromArrayLike":1625038546312,"./2016/CreateMethodProperty":1625038546315,"./2016/DateFromTime":1625038546316,"./2016/Day":1625038546318,"./2016/DayFromYear":1625038546319,"./2016/DaysInYear":1625038546322,"./2016/DayWithinYear":1625038546317,"./2016/DefinePropertyOrThrow":1625038546303,"./2016/DeletePropertyOrThrow":1625038546325,"./2016/EnumerableOwnNames":1625038546326,"./2016/floor":1625038546280,"./2016/FromPropertyDescriptor":1625038546294,"./2016/Get":1625038546301,"./2016/GetIterator":1625038546327,"./2016/GetMethod":1625038546328,"./2016/GetOwnPropertyKeys":1625038546331,"./2016/GetPrototypeFromConstructor":1625038546332,"./2016/GetSubstitution":1625038546333,"./2016/GetV":1625038546329,"./2016/HasOwnProperty":1625038546334,"./2016/HasProperty":1625038546335,"./2016/HourFromTime":1625038546336,"./2016/InLeapYear":1625038546321,"./2016/InstanceofOperator":1625038546337,"./2016/Invoke":1625038546339,"./2016/IsAccessorDescriptor":1625038546284,"./2016/IsArray":1625038546283,"./2016/IsCallable":1625038546291,"./2016/IsConcatSpreadable":1625038546340,"./2016/IsConstructor":1625038546302,"./2016/IsDataDescriptor":1625038546285,"./2016/IsExtensible":1625038546287,"./2016/IsGenericDescriptor":1625038546295,"./2016/IsInteger":1625038546279,"./2016/IsPromise":1625038546341,"./2016/IsPropertyDescriptor":1625038546342,"./2016/IsPropertyKey":1625038546288,"./2016/IsRegExp":1625038546297,"./2016/IterableToArrayLike":1625038546343,"./2016/IteratorClose":1625038546348,"./2016/IteratorComplete":1625038546345,"./2016/IteratorNext":1625038546346,"./2016/IteratorStep":1625038546344,"./2016/IteratorValue":1625038546347,"./2016/MakeDate":1625038546349,"./2016/MakeDay":1625038546350,"./2016/MakeTime":1625038546351,"./2016/MinFromTime":1625038546352,"./2016/modulo":1625038546323,"./2016/MonthFromTime":1625038546324,"./2016/msFromTime":1625038546353,"./2016/ObjectCreate":1625038546354,"./2016/OrdinaryCreateFromConstructor":1625038546355,"./2016/OrdinaryDefineOwnProperty":1625038546286,"./2016/OrdinaryGetOwnProperty":1625038546296,"./2016/OrdinaryGetPrototypeOf":1625038546356,"./2016/OrdinaryHasInstance":1625038546338,"./2016/OrdinaryHasProperty":1625038546358,"./2016/OrdinarySetPrototypeOf":1625038546359,"./2016/QuoteJSONString":1625038546360,"./2016/RegExpCreate":1625038546361,"./2016/RegExpExec":1625038546362,"./2016/RequireObjectCoercible":1625038546310,"./2016/SameValue":1625038546292,"./2016/SameValueNonNumber":1625038546363,"./2016/SameValueZero":1625038546364,"./2016/SecFromTime":1625038546365,"./2016/Set":1625038546366,"./2016/SetFunctionName":1625038546367,"./2016/SetIntegrityLevel":1625038546368,"./2016/SpeciesConstructor":1625038546369,"./2016/SplitMatch":1625038546370,"./2016/StringCreate":1625038546371,"./2016/SymbolDescriptiveString":1625038546372,"./2016/TestIntegrityLevel":1625038546373,"./2016/thisBooleanValue":1625038546374,"./2016/thisNumberValue":1625038546375,"./2016/thisStringValue":1625038546376,"./2016/thisTimeValue":1625038546377,"./2016/TimeClip":1625038546378,"./2016/TimeFromYear":1625038546379,"./2016/TimeWithinDay":1625038546380,"./2016/ToBoolean":1625038546290,"./2016/ToDateString":1625038546381,"./2016/ToInt16":1625038546382,"./2016/ToInt32":1625038546384,"./2016/ToInt8":1625038546385,"./2016/ToInteger":1625038546314,"./2016/ToLength":1625038546313,"./2016/ToNumber":1625038546272,"./2016/ToObject":1625038546330,"./2016/ToPrimitive":1625038546273,"./2016/ToPropertyDescriptor":1625038546289,"./2016/ToPropertyKey":1625038546387,"./2016/ToString":1625038546298,"./2016/ToUint16":1625038546383,"./2016/ToUint32":1625038546299,"./2016/ToUint8":1625038546386,"./2016/ToUint8Clamp":1625038546388,"./2016/Type":1625038546274,"./2016/UTF16Decode":1625038546389,"./2016/UTF16Encoding":1625038546390,"./2016/ValidateAndApplyPropertyDescriptor":1625038546293,"./2016/WeekDay":1625038546392,"./2016/YearFromTime":1625038546320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546271, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546272,"./ToPrimitive":1625038546273,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546272, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var isPrimitive = require('../helpers/isPrimitive');

var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ToPrimitive = require('./ToPrimitive');

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

module.exports = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546273}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546273, function(require, module, exports) {


var toPrimitive = require('es-to-primitive/es2015');

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

module.exports = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546274, function(require, module, exports) {


var ES5Type = require('../5/Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};

}, function(modId) { var map = {"../5/Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546275, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546272,"./ToPrimitive":1625038546273,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546276, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546277, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546278, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $TypeError = GetIntrinsic('%TypeError%');

var $charCodeAt = require('call-bind/callBound')('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

module.exports = function AdvanceStringIndex(S, index, unicode) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type(unicode) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (!isLeadingSurrogate(first)) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (!isTrailingSurrogate(second)) {
		return index + 1;
	}

	return index + 2;
};

}, function(modId) { var map = {"./IsInteger":1625038546279,"./Type":1625038546274,"../helpers/maxSafeInteger":1625038546152,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546279, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

module.exports = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
		return false;
	}
	var absValue = abs(argument);
	return floor(absValue) === absValue;
};

}, function(modId) { var map = {"./abs":1625038546277,"./floor":1625038546280,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546280, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546281, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

module.exports = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

}, function(modId) { var map = {"./IsInteger":1625038546279}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546282, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var assign = require('object.assign');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsArray = require('./IsArray');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var OrdinaryDefineOwnProperty = require('./OrdinaryDefineOwnProperty');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./IsArray":1625038546283,"./IsAccessorDescriptor":1625038546284,"./IsDataDescriptor":1625038546285,"./OrdinaryDefineOwnProperty":1625038546286,"./OrdinaryGetOwnProperty":1625038546296,"./ToNumber":1625038546272,"./ToString":1625038546298,"./ToUint32":1625038546299,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546283, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('call-bind/callBound')('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546284, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546285, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546286, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var SameValue = require('./SameValue');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/isPropertyDescriptor":1625038546118,"./IsAccessorDescriptor":1625038546284,"./IsDataDescriptor":1625038546285,"./IsExtensible":1625038546287,"./IsPropertyKey":1625038546288,"./ToPropertyDescriptor":1625038546289,"./SameValue":1625038546292,"./Type":1625038546274,"./ValidateAndApplyPropertyDescriptor":1625038546293}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546287, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546288, function(require, module, exports) {


// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546289, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546274,"./ToBoolean":1625038546290,"./IsCallable":1625038546291}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546290, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546291, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546292, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546293, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');
var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var isSamePropertyDescriptor = require('../helpers/isSamePropertyDescriptor');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
module.exports = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError('Assertion failed: O must be undefined or an Object');
	}
	if (Type(extensible) !== 'Boolean') {
		throw new $TypeError('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) {
		// no further validation is required.
	} else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"../helpers/isPropertyDescriptor":1625038546118,"../helpers/isSamePropertyDescriptor":1625038546170,"./FromPropertyDescriptor":1625038546294,"./IsAccessorDescriptor":1625038546284,"./IsDataDescriptor":1625038546285,"./IsGenericDescriptor":1625038546295,"./IsPropertyKey":1625038546288,"./SameValue":1625038546292,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546294, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546295, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsAccessorDescriptor":1625038546284,"./IsDataDescriptor":1625038546285,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546296, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"./IsArray":1625038546283,"./IsPropertyKey":1625038546288,"./IsRegExp":1625038546297,"./ToPropertyDescriptor":1625038546289,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546297, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

}, function(modId) { var map = {"./ToBoolean":1625038546290}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546298, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546299, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546272}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546300, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsConstructor = require('./IsConstructor');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

module.exports = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};


}, function(modId) { var map = {"./Get":1625038546301,"./IsArray":1625038546283,"./IsConstructor":1625038546302,"./IsInteger":1625038546279,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546301, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var inspect = require('object-inspect');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

module.exports = function Get(O, P) {
	// 7.3.1.1
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
	}
	// 7.3.1.3
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546302, function(require, module, exports) {


var GetIntrinsic = require('../GetIntrinsic.js');

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

}, function(modId) { var map = {"../GetIntrinsic.js":1625038546181,"./DefinePropertyOrThrow":1625038546303}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546303, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546294,"./IsAccessorDescriptor":1625038546284,"./IsDataDescriptor":1625038546285,"./IsPropertyKey":1625038546288,"./SameValue":1625038546292,"./ToPropertyDescriptor":1625038546289,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546304, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('./IsArray');

var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

module.exports = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

}, function(modId) { var map = {"./IsArray":1625038546283}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546305, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

module.exports = function CanonicalNumericIndexString(argument) {
	if (Type(argument) !== 'String') {
		throw new $TypeError('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

}, function(modId) { var map = {"./SameValue":1625038546292,"./ToNumber":1625038546272,"./ToString":1625038546298,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546306, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

module.exports = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!has(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsDataDescriptor":1625038546285,"./IsGenericDescriptor":1625038546295,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546307, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546294,"./OrdinaryGetOwnProperty":1625038546296,"./IsDataDescriptor":1625038546285,"./IsExtensible":1625038546287,"./IsPropertyKey":1625038546288,"./SameValue":1625038546292,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546308, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};

}, function(modId) { var map = {"./CreateDataProperty":1625038546307,"./IsPropertyKey":1625038546288,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546309, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

module.exports = function CreateHTML(string, tag, attribute, value) {
	if (Type(tag) !== 'String' || Type(attribute) !== 'String') {
		throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546310,"./ToString":1625038546298,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546310, function(require, module, exports) {


module.exports = require('../5/CheckObjectCoercible');

}, function(modId) { var map = {"../5/CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546311, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

module.exports = function CreateIterResultObject(value, done) {
	if (Type(done) !== 'Boolean') {
		throw new $TypeError('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546312, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $indexOf = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToLength = require('./ToLength');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
module.exports = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength(Get(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type(next);
		if ($indexOf(elementTypes, nextType) < 0) {
			throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

}, function(modId) { var map = {"./Get":1625038546301,"./IsArray":1625038546283,"./ToLength":1625038546313,"./ToString":1625038546298,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546313, function(require, module, exports) {


var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var ToInteger = require('./ToInteger');

module.exports = function ToLength(argument) {
	var len = ToInteger(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
	return len;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./ToInteger":1625038546314}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546314, function(require, module, exports) {


var ES5ToInteger = require('../5/ToInteger');

var ToNumber = require('./ToNumber');

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	return ES5ToInteger(number);
};

}, function(modId) { var map = {"../5/ToInteger":1625038546121,"./ToNumber":1625038546272}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546315, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

module.exports = function CreateMethodProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546294,"./IsDataDescriptor":1625038546285,"./IsPropertyKey":1625038546288,"./SameValue":1625038546292,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546316, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546317,"./InLeapYear":1625038546321,"./MonthFromTime":1625038546324}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546317, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546318,"./DayFromYear":1625038546319,"./YearFromTime":1625038546320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546318, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546280,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546319, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546280}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546320, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546321, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546322,"./YearFromTime":1625038546320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546322, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546323, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546324, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546317,"./InLeapYear":1625038546321}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546325, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

module.exports = function DeletePropertyOrThrow(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError('Attempt to delete property failed.');
	}
	return success;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546326, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var keys = require('object-keys');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-enumerableownnames

module.exports = function EnumerableOwnNames(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	return keys(O);
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546327, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

module.exports = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray,
				Type: Type
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	return iterator;
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546278,"./Call":1625038546304,"./GetMethod":1625038546328,"./IsArray":1625038546283,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546328, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetV = require('./GetV');
var IsCallable = require('./IsCallable');
var IsPropertyKey = require('./IsPropertyKey');

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

module.exports = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

}, function(modId) { var map = {"./GetV":1625038546329,"./IsCallable":1625038546291,"./IsPropertyKey":1625038546288}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546329, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var ToObject = require('./ToObject');

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

module.exports = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./ToObject":1625038546330}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546330, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546310}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546331, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var hasSymbols = require('has-symbols')();

var $TypeError = GetIntrinsic('%TypeError%');

var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic('%Object.getOwnPropertySymbols%');
var keys = require('object-keys');

var esType = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

module.exports = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN) {
			return keys(O);
		}
		return $gOPN(O);
	}
	throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546332, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Function = GetIntrinsic('%Function%');
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

module.exports = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

}, function(modId) { var map = {"./Get":1625038546301,"./IsConstructor":1625038546302,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546333, function(require, module, exports) {



var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $parseInt = GetIntrinsic('%parseInt%');

var inspect = require('object-inspect');

var regexTester = require('../helpers/regexTester');
var callBound = require('call-bind/callBound');
var every = require('../helpers/every');

var isDigit = regexTester(/^[0-9]$/);

var $charAt = callBound('String.prototype.charAt');
var $strSlice = callBound('String.prototype.slice');

var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type(capture) === 'Undefined');
};

// https://ecma-international.org/ecma-262/6.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
module.exports = function GetSubstitution(matched, str, position, captures, replacement) {
	if (Type(matched) !== 'String') {
		throw new $TypeError('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type(replacement) !== 'String') {
		throw new $TypeError('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/every":1625038546171,"./IsArray":1625038546283,"./IsInteger":1625038546279,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546334, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var has = require('has');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

module.exports = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546335, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546336, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546280,"./modulo":1625038546323,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546337, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var OrdinaryHasInstance = require('./OrdinaryHasInstance');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

module.exports = function InstanceofOperator(O, C) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

}, function(modId) { var map = {"./Call":1625038546304,"./GetMethod":1625038546328,"./IsCallable":1625038546291,"./OrdinaryHasInstance":1625038546338,"./ToBoolean":1625038546290,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546338, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

module.exports = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type(P) !== 'Object') {
		throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

}, function(modId) { var map = {"./Get":1625038546301,"./IsCallable":1625038546291,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546339, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var IsArray = require('./IsArray');
var GetV = require('./GetV');
var IsPropertyKey = require('./IsPropertyKey');

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

module.exports = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

}, function(modId) { var map = {"./Call":1625038546304,"./IsArray":1625038546283,"./GetV":1625038546329,"./IsPropertyKey":1625038546288}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546340, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

module.exports = function IsConcatSpreadable(O) {
	if (Type(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

}, function(modId) { var map = {"./Get":1625038546301,"./IsArray":1625038546283,"./ToBoolean":1625038546290,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546341, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $PromiseThen = callBound('Promise.prototype.then', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

module.exports = function IsPromise(x) {
	if (Type(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546342, function(require, module, exports) {


// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./Type":1625038546274,"./IsDataDescriptor":1625038546285,"./IsAccessorDescriptor":1625038546284}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546343, function(require, module, exports) {


var callBound = require('call-bind/callBound');
var $arrayPush = callBound('Array.prototype.push');

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var GetIterator = require('./GetIterator');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');
var ToObject = require('./ToObject');
var Type = require('./Type');
var ES = {
	AdvanceStringIndex: AdvanceStringIndex,
	GetMethod: GetMethod,
	IsArray: IsArray,
	Type: Type
};

// https://262.ecma-international.org/7.0/#sec-iterabletoarraylike
/**
 * 1. Let usingIterator be ? GetMethod(items, @@iterator).
 * 2. If usingIterator is not undefined, then
 *    1. Let iterator be ? GetIterator(items, usingIterator).
 *    2. Let values be a new empty List.
 *    3. Let next be true.
 *    4. Repeat, while next is not false
 *       1. Let next be ? IteratorStep(iterator).
 *       2. If next is not false, then
 *          1. Let nextValue be ? IteratorValue(next).
 *          2. Append nextValue to the end of the List values.
 *    5. Return CreateArrayFromList(values).
 * 3. NOTE: items is not an Iterable so assume it is already an array-like object.
 * 4. Return ! ToObject(items).
 */

module.exports = function IterableToArrayLike(items) {
	var usingIterator = getIteratorMethod(ES, items);
	if (typeof usingIterator !== 'undefined') {
		var iterator = GetIterator(items, usingIterator);
		var values = [];
		var next = true;
		while (next) {
			next = IteratorStep(iterator);
			if (next) {
				var nextValue = IteratorValue(next);
				$arrayPush(values, nextValue);
			}
		}
		return values;
	}

	return ToObject(items);
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546278,"./GetIterator":1625038546327,"./GetMethod":1625038546328,"./IsArray":1625038546283,"./IteratorStep":1625038546344,"./IteratorValue":1625038546347,"./ToObject":1625038546330,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546344, function(require, module, exports) {


var IteratorComplete = require('./IteratorComplete');
var IteratorNext = require('./IteratorNext');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

module.exports = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};


}, function(modId) { var map = {"./IteratorComplete":1625038546345,"./IteratorNext":1625038546346}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546345, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

module.exports = function IteratorComplete(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

}, function(modId) { var map = {"./Get":1625038546301,"./ToBoolean":1625038546290,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546346, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Invoke = require('./Invoke');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

module.exports = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type(result) !== 'Object') {
		throw new $TypeError('iterator next must return an object');
	}
	return result;
};

}, function(modId) { var map = {"./Invoke":1625038546339,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546347, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

module.exports = function IteratorValue(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};


}, function(modId) { var map = {"./Get":1625038546301,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546348, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

module.exports = function IteratorClose(iterator, completion) {
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type(innerResult) !== 'Object') {
		throw new $TypeError('iterator .return must return an object');
	}

	return completionRecord;
};

}, function(modId) { var map = {"./Call":1625038546304,"./GetMethod":1625038546328,"./IsCallable":1625038546291,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546349, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546350, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546316,"./Day":1625038546318,"./floor":1625038546280,"./modulo":1625038546323,"./MonthFromTime":1625038546324,"./ToInteger":1625038546314,"./YearFromTime":1625038546320}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546351, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546314}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546352, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546280,"./modulo":1625038546323,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546353, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546323,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546354, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var Type = require('./Type');

var hasProto = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

module.exports = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546355, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var GetPrototypeFromConstructor = require('./GetPrototypeFromConstructor');
var IsArray = require('./IsArray');
var ObjectCreate = require('./ObjectCreate');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

module.exports = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate(proto, slots);
};

}, function(modId) { var map = {"./GetPrototypeFromConstructor":1625038546332,"./IsArray":1625038546283,"./ObjectCreate":1625038546354}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546356, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $getProto = require('../helpers/getProto');

var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

module.exports = function OrdinaryGetPrototypeOf(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!$getProto) {
		throw new $TypeError('This environment does not support fetching prototypes.');
	}
	return $getProto(O);
};

}, function(modId) { var map = {"../helpers/getProto":1625038546357,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546357, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var originalGetProto = GetIntrinsic('%Object.getPrototypeOf%', true);
var $ArrayProto = GetIntrinsic('%Array.prototype%');

module.exports = originalGetProto || (
	// eslint-disable-next-line no-proto
	[].__proto__ === $ArrayProto
		? function (O) {
			return O.__proto__; // eslint-disable-line no-proto
		}
		: null
);

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546358, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546359, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $setProto = require('../helpers/setProto');

var OrdinaryGetPrototypeOf = require('./OrdinaryGetPrototypeOf');
var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

module.exports = function OrdinarySetPrototypeOf(O, V) {
	if (Type(V) !== 'Object' && Type(V) !== 'Null') {
		throw new $TypeError('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

}, function(modId) { var map = {"../helpers/setProto":1625038546250,"./OrdinaryGetPrototypeOf":1625038546356,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546360, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $numberToString = callBound('Number.prototype.toString');
var $toLowerCase = callBound('String.prototype.toLowerCase');
var $strSlice = callBound('String.prototype.slice');
var $strSplit = callBound('String.prototype.split');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-quotejsonstring

var escapes = {
	'\u0008': 'b',
	'\u000C': 'f',
	'\u000A': 'n',
	'\u000D': 'r',
	'\u0009': 't'
};

module.exports = function QuoteJSONString(value) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach($strSplit(value), function (C) {
			if (C === '"' || C === '\\') {
				product += '\u005C' + C;
			} else if (C === '\u0008' || C === '\u000C' || C === '\u000A' || C === '\u000D' || C === '\u0009') {
				var abbrev = escapes[C];
				product += '\u005C' + abbrev;
			} else {
				var cCharCode = $charCodeAt(C, 0);
				if (cCharCode < 0x20) {
					product += '\u005Cu' + $toLowerCase($strSlice('0000' + $numberToString(cCharCode, 16), -4));
				} else {
					product += C;
				}
			}
		});
	}
	product += '"';
	return product;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546361, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RegExp = GetIntrinsic('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString = require('./ToString');

// https://262.ecma-international.org/6.0/#sec-regexpcreate

module.exports = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString(P);
	var flags = typeof F === 'undefined' ? '' : ToString(F);
	return new $RegExp(pattern, flags);
};

}, function(modId) { var map = {"./ToString":1625038546298}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546362, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var regexExec = require('call-bind/callBound')('RegExp.prototype.exec');

var Call = require('./Call');
var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

module.exports = function RegExpExec(R, S) {
	if (Type(R) !== 'Object') {
		throw new $TypeError('Assertion failed: `R` must be an Object');
	}
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type(result) === 'Object') {
			return result;
		}
		throw new $TypeError('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

}, function(modId) { var map = {"./Call":1625038546304,"./Get":1625038546301,"./IsCallable":1625038546291,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546363, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

module.exports = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue(x, y);
};

}, function(modId) { var map = {"./SameValue":1625038546292}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546364, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

module.exports = function SameValueZero(x, y) {
	return (x === y) || ($isNaN(x) && $isNaN(y));
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546365, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546280,"./modulo":1625038546323,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546366, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

module.exports = function Set(O, P, V, Throw) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	if (Type(Throw) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue(O[P], V)) {
			throw new $TypeError('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546288,"./SameValue":1625038546292,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546367, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

var getSymbolDescription = require('../helpers/getSymbolDescription');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsExtensible = require('./IsExtensible');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

module.exports = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || has(F, 'name')) {
		throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

}, function(modId) { var map = {"../helpers/getSymbolDescription":1625038546244,"./DefinePropertyOrThrow":1625038546303,"./IsExtensible":1625038546287,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546368, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $preventExtensions = GetIntrinsic('%Object.preventExtensions%');
var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');

var forEach = require('../helpers/forEach');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

module.exports = function SetIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/forEach":1625038546237,"./DefinePropertyOrThrow":1625038546303,"./IsAccessorDescriptor":1625038546284,"./ToPropertyDescriptor":1625038546289,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546369, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};

}, function(modId) { var map = {"./IsConstructor":1625038546302,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546370, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var $charAt = callBound('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

module.exports = function SplitMatch(S, q, R) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(q)) {
		throw new $TypeError('Assertion failed: `q` must be an integer');
	}
	if (Type(R) !== 'String') {
		throw new $TypeError('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt(S, q + i) !== $charAt(R, i)) {
			return false;
		}
	}

	return q + r;
};

}, function(modId) { var map = {"./IsInteger":1625038546279,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546371, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');
var $StringPrototype = GetIntrinsic('%String.prototype%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var Type = require('./Type');

var setProto = require('../helpers/setProto');

// https://262.ecma-international.org/6.0/#sec-stringcreate

module.exports = function StringCreate(value, prototype) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546303,"./Type":1625038546274,"../helpers/setProto":1625038546250}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546372, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $SymbolToString = callBound('Symbol.prototype.toString', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

module.exports = function SymbolDescriptiveString(sym) {
	if (Type(sym) !== 'Symbol') {
		throw new $TypeError('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546373, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError = GetIntrinsic('%TypeError%');

var every = require('../helpers/every');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

module.exports = function TestIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/every":1625038546171,"./IsDataDescriptor":1625038546285,"./IsExtensible":1625038546287,"./ToPropertyDescriptor":1625038546289,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546374, function(require, module, exports) {


var $BooleanValueOf = require('call-bind/callBound')('Boolean.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

module.exports = function thisBooleanValue(value) {
	if (Type(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546375, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var Type = require('./Type');

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

module.exports = function thisNumberValue(value) {
	if (Type(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};


}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546376, function(require, module, exports) {


var $StringValueOf = require('call-bind/callBound')('String.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

module.exports = function thisStringValue(value) {
	if (Type(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546377, function(require, module, exports) {


var $DateValueOf = require('call-bind/callBound')('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

module.exports = function thisTimeValue(value) {
	return $DateValueOf(value);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546378, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546277,"./ToNumber":1625038546272}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546379, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546319}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546380, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546323,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546381, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Date = GetIntrinsic('%Date%');

var $isNaN = require('../helpers/isNaN');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

module.exports = function ToDateString(tv) {
	if (Type(tv) !== 'Number') {
		throw new $TypeError('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"./Type":1625038546274}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546382, function(require, module, exports) {


var ToUint16 = require('./ToUint16');

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

module.exports = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

}, function(modId) { var map = {"./ToUint16":1625038546383}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546383, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546277,"./floor":1625038546280,"./modulo":1625038546323,"./ToNumber":1625038546272,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546384, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546272}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546385, function(require, module, exports) {


var ToUint8 = require('./ToUint8');

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

module.exports = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

}, function(modId) { var map = {"./ToUint8":1625038546386}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546386, function(require, module, exports) {


var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

module.exports = function ToUint8(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x100);
};

}, function(modId) { var map = {"./ToNumber":1625038546272,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122,"./abs":1625038546277,"./floor":1625038546280,"./modulo":1625038546323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546387, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

var ToPrimitive = require('./ToPrimitive');
var ToString = require('./ToString');

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

module.exports = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

}, function(modId) { var map = {"./ToPrimitive":1625038546273,"./ToString":1625038546298}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546388, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

module.exports = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

}, function(modId) { var map = {"./ToNumber":1625038546272,"./floor":1625038546280,"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546389, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

module.exports = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate(lead) || !isTrailingSurrogate(trail)) {
		throw new $TypeError('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode(lead) + $fromCharCode(trail);
};

}, function(modId) { var map = {"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546390, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

var floor = require('./floor');
var modulo = require('./modulo');

var isCodePoint = require('../helpers/isCodePoint');

// https://262.ecma-international.org/7.0/#sec-utf16encoding

module.exports = function UTF16Encoding(cp) {
	if (!isCodePoint(cp)) {
		throw new $TypeError('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode(cp);
	}
	var cu1 = floor((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode(cu1) + $fromCharCode(cu2);
};

}, function(modId) { var map = {"./floor":1625038546280,"./modulo":1625038546323,"../helpers/isCodePoint":1625038546391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546391, function(require, module, exports) {


module.exports = function isCodePoint(cp) {
	return typeof cp === 'number' && cp >= 0 && cp <= 0x10FFFF && (cp | 0) === cp;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546392, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546318,"./modulo":1625038546323}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546393, function(require, module, exports) {


/* eslint global-require: 0 */
// https://262.ecma-international.org/8.0/#sec-abstract-operations
var ES2017 = {
	'Abstract Equality Comparison': require('./2017/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./2017/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./2017/StrictEqualityComparison'),
	abs: require('./2017/abs'),
	AdvanceStringIndex: require('./2017/AdvanceStringIndex'),
	ArrayCreate: require('./2017/ArrayCreate'),
	ArraySetLength: require('./2017/ArraySetLength'),
	ArraySpeciesCreate: require('./2017/ArraySpeciesCreate'),
	Call: require('./2017/Call'),
	CanonicalNumericIndexString: require('./2017/CanonicalNumericIndexString'),
	CompletePropertyDescriptor: require('./2017/CompletePropertyDescriptor'),
	CreateDataProperty: require('./2017/CreateDataProperty'),
	CreateDataPropertyOrThrow: require('./2017/CreateDataPropertyOrThrow'),
	CreateHTML: require('./2017/CreateHTML'),
	CreateIterResultObject: require('./2017/CreateIterResultObject'),
	CreateListFromArrayLike: require('./2017/CreateListFromArrayLike'),
	CreateMethodProperty: require('./2017/CreateMethodProperty'),
	DateFromTime: require('./2017/DateFromTime'),
	Day: require('./2017/Day'),
	DayFromYear: require('./2017/DayFromYear'),
	DaysInYear: require('./2017/DaysInYear'),
	DayWithinYear: require('./2017/DayWithinYear'),
	DefinePropertyOrThrow: require('./2017/DefinePropertyOrThrow'),
	DeletePropertyOrThrow: require('./2017/DeletePropertyOrThrow'),
	EnumerableOwnProperties: require('./2017/EnumerableOwnProperties'),
	floor: require('./2017/floor'),
	FromPropertyDescriptor: require('./2017/FromPropertyDescriptor'),
	Get: require('./2017/Get'),
	GetIterator: require('./2017/GetIterator'),
	GetMethod: require('./2017/GetMethod'),
	GetOwnPropertyKeys: require('./2017/GetOwnPropertyKeys'),
	GetPrototypeFromConstructor: require('./2017/GetPrototypeFromConstructor'),
	GetSubstitution: require('./2017/GetSubstitution'),
	GetV: require('./2017/GetV'),
	HasOwnProperty: require('./2017/HasOwnProperty'),
	HasProperty: require('./2017/HasProperty'),
	HourFromTime: require('./2017/HourFromTime'),
	InLeapYear: require('./2017/InLeapYear'),
	InstanceofOperator: require('./2017/InstanceofOperator'),
	Invoke: require('./2017/Invoke'),
	IsAccessorDescriptor: require('./2017/IsAccessorDescriptor'),
	IsArray: require('./2017/IsArray'),
	IsCallable: require('./2017/IsCallable'),
	IsConcatSpreadable: require('./2017/IsConcatSpreadable'),
	IsConstructor: require('./2017/IsConstructor'),
	IsDataDescriptor: require('./2017/IsDataDescriptor'),
	IsExtensible: require('./2017/IsExtensible'),
	IsGenericDescriptor: require('./2017/IsGenericDescriptor'),
	IsInteger: require('./2017/IsInteger'),
	IsPromise: require('./2017/IsPromise'),
	IsPropertyDescriptor: require('./2017/IsPropertyDescriptor'),
	IsPropertyKey: require('./2017/IsPropertyKey'),
	IsRegExp: require('./2017/IsRegExp'),
	IterableToList: require('./2017/IterableToList'),
	IteratorClose: require('./2017/IteratorClose'),
	IteratorComplete: require('./2017/IteratorComplete'),
	IteratorNext: require('./2017/IteratorNext'),
	IteratorStep: require('./2017/IteratorStep'),
	IteratorValue: require('./2017/IteratorValue'),
	MakeDate: require('./2017/MakeDate'),
	MakeDay: require('./2017/MakeDay'),
	MakeTime: require('./2017/MakeTime'),
	MinFromTime: require('./2017/MinFromTime'),
	modulo: require('./2017/modulo'),
	MonthFromTime: require('./2017/MonthFromTime'),
	msFromTime: require('./2017/msFromTime'),
	ObjectCreate: require('./2017/ObjectCreate'),
	OrdinaryCreateFromConstructor: require('./2017/OrdinaryCreateFromConstructor'),
	OrdinaryDefineOwnProperty: require('./2017/OrdinaryDefineOwnProperty'),
	OrdinaryGetOwnProperty: require('./2017/OrdinaryGetOwnProperty'),
	OrdinaryGetPrototypeOf: require('./2017/OrdinaryGetPrototypeOf'),
	OrdinaryHasInstance: require('./2017/OrdinaryHasInstance'),
	OrdinaryHasProperty: require('./2017/OrdinaryHasProperty'),
	OrdinarySetPrototypeOf: require('./2017/OrdinarySetPrototypeOf'),
	QuoteJSONString: require('./2017/QuoteJSONString'),
	RegExpCreate: require('./2017/RegExpCreate'),
	RegExpExec: require('./2017/RegExpExec'),
	RequireObjectCoercible: require('./2017/RequireObjectCoercible'),
	SameValue: require('./2017/SameValue'),
	SameValueNonNumber: require('./2017/SameValueNonNumber'),
	SameValueZero: require('./2017/SameValueZero'),
	SecFromTime: require('./2017/SecFromTime'),
	Set: require('./2017/Set'),
	SetFunctionName: require('./2017/SetFunctionName'),
	SetIntegrityLevel: require('./2017/SetIntegrityLevel'),
	SpeciesConstructor: require('./2017/SpeciesConstructor'),
	SplitMatch: require('./2017/SplitMatch'),
	StringCreate: require('./2017/StringCreate'),
	StringGetOwnProperty: require('./2017/StringGetOwnProperty'),
	SymbolDescriptiveString: require('./2017/SymbolDescriptiveString'),
	TestIntegrityLevel: require('./2017/TestIntegrityLevel'),
	thisBooleanValue: require('./2017/thisBooleanValue'),
	thisNumberValue: require('./2017/thisNumberValue'),
	thisStringValue: require('./2017/thisStringValue'),
	thisTimeValue: require('./2017/thisTimeValue'),
	TimeClip: require('./2017/TimeClip'),
	TimeFromYear: require('./2017/TimeFromYear'),
	TimeWithinDay: require('./2017/TimeWithinDay'),
	ToBoolean: require('./2017/ToBoolean'),
	ToDateString: require('./2017/ToDateString'),
	ToIndex: require('./2017/ToIndex'),
	ToInt16: require('./2017/ToInt16'),
	ToInt32: require('./2017/ToInt32'),
	ToInt8: require('./2017/ToInt8'),
	ToInteger: require('./2017/ToInteger'),
	ToLength: require('./2017/ToLength'),
	ToNumber: require('./2017/ToNumber'),
	ToObject: require('./2017/ToObject'),
	ToPrimitive: require('./2017/ToPrimitive'),
	ToPropertyDescriptor: require('./2017/ToPropertyDescriptor'),
	ToPropertyKey: require('./2017/ToPropertyKey'),
	ToString: require('./2017/ToString'),
	ToUint16: require('./2017/ToUint16'),
	ToUint32: require('./2017/ToUint32'),
	ToUint8: require('./2017/ToUint8'),
	ToUint8Clamp: require('./2017/ToUint8Clamp'),
	Type: require('./2017/Type'),
	UTF16Decode: require('./2017/UTF16Decode'),
	UTF16Encoding: require('./2017/UTF16Encoding'),
	ValidateAndApplyPropertyDescriptor: require('./2017/ValidateAndApplyPropertyDescriptor'),
	WeekDay: require('./2017/WeekDay'),
	YearFromTime: require('./2017/YearFromTime')
};

module.exports = ES2017;

}, function(modId) { var map = {"./2017/AbstractEqualityComparison":1625038546394,"./2017/AbstractRelationalComparison":1625038546398,"./2017/StrictEqualityComparison":1625038546399,"./2017/abs":1625038546400,"./2017/AdvanceStringIndex":1625038546401,"./2017/ArrayCreate":1625038546404,"./2017/ArraySetLength":1625038546405,"./2017/ArraySpeciesCreate":1625038546423,"./2017/Call":1625038546427,"./2017/CanonicalNumericIndexString":1625038546428,"./2017/CompletePropertyDescriptor":1625038546429,"./2017/CreateDataProperty":1625038546430,"./2017/CreateDataPropertyOrThrow":1625038546431,"./2017/CreateHTML":1625038546432,"./2017/CreateIterResultObject":1625038546434,"./2017/CreateListFromArrayLike":1625038546435,"./2017/CreateMethodProperty":1625038546438,"./2017/DateFromTime":1625038546439,"./2017/Day":1625038546441,"./2017/DayFromYear":1625038546442,"./2017/DaysInYear":1625038546445,"./2017/DayWithinYear":1625038546440,"./2017/DefinePropertyOrThrow":1625038546426,"./2017/DeletePropertyOrThrow":1625038546448,"./2017/EnumerableOwnProperties":1625038546449,"./2017/floor":1625038546403,"./2017/FromPropertyDescriptor":1625038546417,"./2017/Get":1625038546424,"./2017/GetIterator":1625038546450,"./2017/GetMethod":1625038546451,"./2017/GetOwnPropertyKeys":1625038546454,"./2017/GetPrototypeFromConstructor":1625038546455,"./2017/GetSubstitution":1625038546456,"./2017/GetV":1625038546452,"./2017/HasOwnProperty":1625038546457,"./2017/HasProperty":1625038546458,"./2017/HourFromTime":1625038546459,"./2017/InLeapYear":1625038546444,"./2017/InstanceofOperator":1625038546460,"./2017/Invoke":1625038546462,"./2017/IsAccessorDescriptor":1625038546407,"./2017/IsArray":1625038546406,"./2017/IsCallable":1625038546414,"./2017/IsConcatSpreadable":1625038546463,"./2017/IsConstructor":1625038546425,"./2017/IsDataDescriptor":1625038546408,"./2017/IsExtensible":1625038546410,"./2017/IsGenericDescriptor":1625038546418,"./2017/IsInteger":1625038546402,"./2017/IsPromise":1625038546464,"./2017/IsPropertyDescriptor":1625038546465,"./2017/IsPropertyKey":1625038546411,"./2017/IsRegExp":1625038546420,"./2017/IterableToList":1625038546466,"./2017/IteratorClose":1625038546471,"./2017/IteratorComplete":1625038546468,"./2017/IteratorNext":1625038546469,"./2017/IteratorStep":1625038546467,"./2017/IteratorValue":1625038546470,"./2017/MakeDate":1625038546472,"./2017/MakeDay":1625038546473,"./2017/MakeTime":1625038546474,"./2017/MinFromTime":1625038546475,"./2017/modulo":1625038546446,"./2017/MonthFromTime":1625038546447,"./2017/msFromTime":1625038546476,"./2017/ObjectCreate":1625038546477,"./2017/OrdinaryCreateFromConstructor":1625038546478,"./2017/OrdinaryDefineOwnProperty":1625038546409,"./2017/OrdinaryGetOwnProperty":1625038546419,"./2017/OrdinaryGetPrototypeOf":1625038546479,"./2017/OrdinaryHasInstance":1625038546461,"./2017/OrdinaryHasProperty":1625038546480,"./2017/OrdinarySetPrototypeOf":1625038546481,"./2017/QuoteJSONString":1625038546482,"./2017/RegExpCreate":1625038546483,"./2017/RegExpExec":1625038546484,"./2017/RequireObjectCoercible":1625038546433,"./2017/SameValue":1625038546415,"./2017/SameValueNonNumber":1625038546485,"./2017/SameValueZero":1625038546486,"./2017/SecFromTime":1625038546487,"./2017/Set":1625038546488,"./2017/SetFunctionName":1625038546489,"./2017/SetIntegrityLevel":1625038546490,"./2017/SpeciesConstructor":1625038546491,"./2017/SplitMatch":1625038546492,"./2017/StringCreate":1625038546493,"./2017/StringGetOwnProperty":1625038546494,"./2017/SymbolDescriptiveString":1625038546495,"./2017/TestIntegrityLevel":1625038546496,"./2017/thisBooleanValue":1625038546497,"./2017/thisNumberValue":1625038546498,"./2017/thisStringValue":1625038546499,"./2017/thisTimeValue":1625038546500,"./2017/TimeClip":1625038546501,"./2017/TimeFromYear":1625038546502,"./2017/TimeWithinDay":1625038546503,"./2017/ToBoolean":1625038546413,"./2017/ToDateString":1625038546504,"./2017/ToIndex":1625038546505,"./2017/ToInt16":1625038546506,"./2017/ToInt32":1625038546508,"./2017/ToInt8":1625038546509,"./2017/ToInteger":1625038546437,"./2017/ToLength":1625038546436,"./2017/ToNumber":1625038546395,"./2017/ToObject":1625038546453,"./2017/ToPrimitive":1625038546396,"./2017/ToPropertyDescriptor":1625038546412,"./2017/ToPropertyKey":1625038546511,"./2017/ToString":1625038546421,"./2017/ToUint16":1625038546507,"./2017/ToUint32":1625038546422,"./2017/ToUint8":1625038546510,"./2017/ToUint8Clamp":1625038546512,"./2017/Type":1625038546397,"./2017/UTF16Decode":1625038546513,"./2017/UTF16Encoding":1625038546514,"./2017/ValidateAndApplyPropertyDescriptor":1625038546416,"./2017/WeekDay":1625038546515,"./2017/YearFromTime":1625038546443}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546394, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546395,"./ToPrimitive":1625038546396,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546395, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var isPrimitive = require('../helpers/isPrimitive');

var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ToPrimitive = require('./ToPrimitive');

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

module.exports = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546396}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546396, function(require, module, exports) {


var toPrimitive = require('es-to-primitive/es2015');

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

module.exports = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546397, function(require, module, exports) {


var ES5Type = require('../5/Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};

}, function(modId) { var map = {"../5/Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546398, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546395,"./ToPrimitive":1625038546396,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546399, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546400, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546401, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $TypeError = GetIntrinsic('%TypeError%');

var $charCodeAt = require('call-bind/callBound')('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

module.exports = function AdvanceStringIndex(S, index, unicode) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type(unicode) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (!isLeadingSurrogate(first)) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (!isTrailingSurrogate(second)) {
		return index + 1;
	}

	return index + 2;
};

}, function(modId) { var map = {"./IsInteger":1625038546402,"./Type":1625038546397,"../helpers/maxSafeInteger":1625038546152,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546402, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

module.exports = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
		return false;
	}
	var absValue = abs(argument);
	return floor(absValue) === absValue;
};

}, function(modId) { var map = {"./abs":1625038546400,"./floor":1625038546403,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546403, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546404, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

module.exports = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

}, function(modId) { var map = {"./IsInteger":1625038546402}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546405, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var assign = require('object.assign');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsArray = require('./IsArray');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var OrdinaryDefineOwnProperty = require('./OrdinaryDefineOwnProperty');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./IsArray":1625038546406,"./IsAccessorDescriptor":1625038546407,"./IsDataDescriptor":1625038546408,"./OrdinaryDefineOwnProperty":1625038546409,"./OrdinaryGetOwnProperty":1625038546419,"./ToNumber":1625038546395,"./ToString":1625038546421,"./ToUint32":1625038546422,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546406, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('call-bind/callBound')('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546407, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546408, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546409, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var SameValue = require('./SameValue');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/isPropertyDescriptor":1625038546118,"./IsAccessorDescriptor":1625038546407,"./IsDataDescriptor":1625038546408,"./IsExtensible":1625038546410,"./IsPropertyKey":1625038546411,"./ToPropertyDescriptor":1625038546412,"./SameValue":1625038546415,"./Type":1625038546397,"./ValidateAndApplyPropertyDescriptor":1625038546416}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546410, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546411, function(require, module, exports) {


// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546412, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546397,"./ToBoolean":1625038546413,"./IsCallable":1625038546414}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546413, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546414, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546415, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546416, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');
var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var isSamePropertyDescriptor = require('../helpers/isSamePropertyDescriptor');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
module.exports = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError('Assertion failed: O must be undefined or an Object');
	}
	if (Type(extensible) !== 'Boolean') {
		throw new $TypeError('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) {
		// no further validation is required.
	} else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"../helpers/isPropertyDescriptor":1625038546118,"../helpers/isSamePropertyDescriptor":1625038546170,"./FromPropertyDescriptor":1625038546417,"./IsAccessorDescriptor":1625038546407,"./IsDataDescriptor":1625038546408,"./IsGenericDescriptor":1625038546418,"./IsPropertyKey":1625038546411,"./SameValue":1625038546415,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546417, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546418, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsAccessorDescriptor":1625038546407,"./IsDataDescriptor":1625038546408,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546419, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"./IsArray":1625038546406,"./IsPropertyKey":1625038546411,"./IsRegExp":1625038546420,"./ToPropertyDescriptor":1625038546412,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546420, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

}, function(modId) { var map = {"./ToBoolean":1625038546413}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546421, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546422, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546423, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsConstructor = require('./IsConstructor');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

module.exports = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};


}, function(modId) { var map = {"./Get":1625038546424,"./IsArray":1625038546406,"./IsConstructor":1625038546425,"./IsInteger":1625038546402,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546424, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var inspect = require('object-inspect');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

module.exports = function Get(O, P) {
	// 7.3.1.1
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
	}
	// 7.3.1.3
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546425, function(require, module, exports) {


var GetIntrinsic = require('../GetIntrinsic.js');

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

}, function(modId) { var map = {"../GetIntrinsic.js":1625038546181,"./DefinePropertyOrThrow":1625038546426}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546426, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546417,"./IsAccessorDescriptor":1625038546407,"./IsDataDescriptor":1625038546408,"./IsPropertyKey":1625038546411,"./SameValue":1625038546415,"./ToPropertyDescriptor":1625038546412,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546427, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('./IsArray');

var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

module.exports = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

}, function(modId) { var map = {"./IsArray":1625038546406}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546428, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

module.exports = function CanonicalNumericIndexString(argument) {
	if (Type(argument) !== 'String') {
		throw new $TypeError('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

}, function(modId) { var map = {"./SameValue":1625038546415,"./ToNumber":1625038546395,"./ToString":1625038546421,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546429, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

module.exports = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!has(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsDataDescriptor":1625038546408,"./IsGenericDescriptor":1625038546418,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546430, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546417,"./OrdinaryGetOwnProperty":1625038546419,"./IsDataDescriptor":1625038546408,"./IsExtensible":1625038546410,"./IsPropertyKey":1625038546411,"./SameValue":1625038546415,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546431, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};

}, function(modId) { var map = {"./CreateDataProperty":1625038546430,"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546432, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

module.exports = function CreateHTML(string, tag, attribute, value) {
	if (Type(tag) !== 'String' || Type(attribute) !== 'String') {
		throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546433,"./ToString":1625038546421,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546433, function(require, module, exports) {


module.exports = require('../5/CheckObjectCoercible');

}, function(modId) { var map = {"../5/CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546434, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

module.exports = function CreateIterResultObject(value, done) {
	if (Type(done) !== 'Boolean') {
		throw new $TypeError('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546435, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $indexOf = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToLength = require('./ToLength');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
module.exports = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength(Get(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type(next);
		if ($indexOf(elementTypes, nextType) < 0) {
			throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

}, function(modId) { var map = {"./Get":1625038546424,"./IsArray":1625038546406,"./ToLength":1625038546436,"./ToString":1625038546421,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546436, function(require, module, exports) {


var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var ToInteger = require('./ToInteger');

module.exports = function ToLength(argument) {
	var len = ToInteger(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
	return len;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./ToInteger":1625038546437}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546437, function(require, module, exports) {


var ES5ToInteger = require('../5/ToInteger');

var ToNumber = require('./ToNumber');

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	return ES5ToInteger(number);
};

}, function(modId) { var map = {"../5/ToInteger":1625038546121,"./ToNumber":1625038546395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546438, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

module.exports = function CreateMethodProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546417,"./IsDataDescriptor":1625038546408,"./IsPropertyKey":1625038546411,"./SameValue":1625038546415,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546439, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546440,"./InLeapYear":1625038546444,"./MonthFromTime":1625038546447}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546440, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546441,"./DayFromYear":1625038546442,"./YearFromTime":1625038546443}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546441, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546403,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546442, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546403}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546443, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546444, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546445,"./YearFromTime":1625038546443}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546445, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546446, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546447, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546440,"./InLeapYear":1625038546444}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546448, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

module.exports = function DeletePropertyOrThrow(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError('Attempt to delete property failed.');
	}
	return success;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546449, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var objectKeys = require('object-keys');

var callBound = require('call-bind/callBound');

var callBind = require('call-bind');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));

var forEach = require('../helpers/forEach');

var Type = require('./Type');

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

module.exports = function EnumerableOwnProperties(O, kind) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach(keys, function (key) {
			if ($isEnumerable(O, key)) {
				$pushApply(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546450, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

module.exports = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray,
				Type: Type
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	return iterator;
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546401,"./Call":1625038546427,"./GetMethod":1625038546451,"./IsArray":1625038546406,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546451, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetV = require('./GetV');
var IsCallable = require('./IsCallable');
var IsPropertyKey = require('./IsPropertyKey');

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

module.exports = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

}, function(modId) { var map = {"./GetV":1625038546452,"./IsCallable":1625038546414,"./IsPropertyKey":1625038546411}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546452, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var ToObject = require('./ToObject');

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

module.exports = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./ToObject":1625038546453}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546453, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546433}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546454, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var hasSymbols = require('has-symbols')();

var $TypeError = GetIntrinsic('%TypeError%');

var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic('%Object.getOwnPropertySymbols%');
var keys = require('object-keys');

var esType = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

module.exports = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN) {
			return keys(O);
		}
		return $gOPN(O);
	}
	throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546455, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Function = GetIntrinsic('%Function%');
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

module.exports = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

}, function(modId) { var map = {"./Get":1625038546424,"./IsConstructor":1625038546425,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546456, function(require, module, exports) {



var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $parseInt = GetIntrinsic('%parseInt%');

var inspect = require('object-inspect');

var regexTester = require('../helpers/regexTester');
var callBound = require('call-bind/callBound');
var every = require('../helpers/every');

var isDigit = regexTester(/^[0-9]$/);

var $charAt = callBound('String.prototype.charAt');
var $strSlice = callBound('String.prototype.slice');

var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type(capture) === 'Undefined');
};

// https://ecma-international.org/ecma-262/6.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
module.exports = function GetSubstitution(matched, str, position, captures, replacement) {
	if (Type(matched) !== 'String') {
		throw new $TypeError('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type(replacement) !== 'String') {
		throw new $TypeError('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/every":1625038546171,"./IsArray":1625038546406,"./IsInteger":1625038546402,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546457, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var has = require('has');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

module.exports = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546458, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546459, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546403,"./modulo":1625038546446,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546460, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var OrdinaryHasInstance = require('./OrdinaryHasInstance');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

module.exports = function InstanceofOperator(O, C) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

}, function(modId) { var map = {"./Call":1625038546427,"./GetMethod":1625038546451,"./IsCallable":1625038546414,"./OrdinaryHasInstance":1625038546461,"./ToBoolean":1625038546413,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546461, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

module.exports = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type(P) !== 'Object') {
		throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

}, function(modId) { var map = {"./Get":1625038546424,"./IsCallable":1625038546414,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546462, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var IsArray = require('./IsArray');
var GetV = require('./GetV');
var IsPropertyKey = require('./IsPropertyKey');

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

module.exports = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

}, function(modId) { var map = {"./Call":1625038546427,"./IsArray":1625038546406,"./GetV":1625038546452,"./IsPropertyKey":1625038546411}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546463, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

module.exports = function IsConcatSpreadable(O) {
	if (Type(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

}, function(modId) { var map = {"./Get":1625038546424,"./IsArray":1625038546406,"./ToBoolean":1625038546413,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546464, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $PromiseThen = callBound('Promise.prototype.then', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

module.exports = function IsPromise(x) {
	if (Type(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546465, function(require, module, exports) {


// TODO, semver-major: delete this

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var Type = require('./Type');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');

// https://262.ecma-international.org/6.0/#sec-property-descriptor-specification-type

module.exports = function IsPropertyDescriptor(Desc) {
	return isPropertyDescriptor({
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor,
		Type: Type
	}, Desc);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./Type":1625038546397,"./IsDataDescriptor":1625038546408,"./IsAccessorDescriptor":1625038546407}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546466, function(require, module, exports) {


var callBound = require('call-bind/callBound');
var $arrayPush = callBound('Array.prototype.push');

var GetIterator = require('./GetIterator');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');

// https://262.ecma-international.org/8.0/#sec-iterabletolist

module.exports = function IterableToList(items, method) {
	var iterator = GetIterator(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep(iterator);
		if (next) {
			var nextValue = IteratorValue(next);
			$arrayPush(values, nextValue);
		}
	}
	return values;
};

}, function(modId) { var map = {"./GetIterator":1625038546450,"./IteratorStep":1625038546467,"./IteratorValue":1625038546470}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546467, function(require, module, exports) {


var IteratorComplete = require('./IteratorComplete');
var IteratorNext = require('./IteratorNext');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

module.exports = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};


}, function(modId) { var map = {"./IteratorComplete":1625038546468,"./IteratorNext":1625038546469}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546468, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

module.exports = function IteratorComplete(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

}, function(modId) { var map = {"./Get":1625038546424,"./ToBoolean":1625038546413,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546469, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Invoke = require('./Invoke');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

module.exports = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type(result) !== 'Object') {
		throw new $TypeError('iterator next must return an object');
	}
	return result;
};

}, function(modId) { var map = {"./Invoke":1625038546462,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546470, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

module.exports = function IteratorValue(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};


}, function(modId) { var map = {"./Get":1625038546424,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546471, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

module.exports = function IteratorClose(iterator, completion) {
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type(innerResult) !== 'Object') {
		throw new $TypeError('iterator .return must return an object');
	}

	return completionRecord;
};

}, function(modId) { var map = {"./Call":1625038546427,"./GetMethod":1625038546451,"./IsCallable":1625038546414,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546472, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546473, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546439,"./Day":1625038546441,"./floor":1625038546403,"./modulo":1625038546446,"./MonthFromTime":1625038546447,"./ToInteger":1625038546437,"./YearFromTime":1625038546443}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546474, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546437}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546475, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546403,"./modulo":1625038546446,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546476, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546446,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546477, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var Type = require('./Type');

var hasProto = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

module.exports = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546478, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var GetPrototypeFromConstructor = require('./GetPrototypeFromConstructor');
var IsArray = require('./IsArray');
var ObjectCreate = require('./ObjectCreate');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

module.exports = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate(proto, slots);
};

}, function(modId) { var map = {"./GetPrototypeFromConstructor":1625038546455,"./IsArray":1625038546406,"./ObjectCreate":1625038546477}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546479, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $getProto = require('../helpers/getProto');

var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

module.exports = function OrdinaryGetPrototypeOf(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!$getProto) {
		throw new $TypeError('This environment does not support fetching prototypes.');
	}
	return $getProto(O);
};

}, function(modId) { var map = {"../helpers/getProto":1625038546357,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546480, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546481, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $setProto = require('../helpers/setProto');

var OrdinaryGetPrototypeOf = require('./OrdinaryGetPrototypeOf');
var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

module.exports = function OrdinarySetPrototypeOf(O, V) {
	if (Type(V) !== 'Object' && Type(V) !== 'Null') {
		throw new $TypeError('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

}, function(modId) { var map = {"../helpers/setProto":1625038546250,"./OrdinaryGetPrototypeOf":1625038546479,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546482, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $numberToString = callBound('Number.prototype.toString');
var $toLowerCase = callBound('String.prototype.toLowerCase');
var $strSlice = callBound('String.prototype.slice');
var $strSplit = callBound('String.prototype.split');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-quotejsonstring

var escapes = {
	'\u0008': 'b',
	'\u000C': 'f',
	'\u000A': 'n',
	'\u000D': 'r',
	'\u0009': 't'
};

module.exports = function QuoteJSONString(value) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach($strSplit(value), function (C) {
			if (C === '"' || C === '\\') {
				product += '\u005C' + C;
			} else if (C === '\u0008' || C === '\u000C' || C === '\u000A' || C === '\u000D' || C === '\u0009') {
				var abbrev = escapes[C];
				product += '\u005C' + abbrev;
			} else {
				var cCharCode = $charCodeAt(C, 0);
				if (cCharCode < 0x20) {
					product += '\u005Cu' + $toLowerCase($strSlice('0000' + $numberToString(cCharCode, 16), -4));
				} else {
					product += C;
				}
			}
		});
	}
	product += '"';
	return product;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546483, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RegExp = GetIntrinsic('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString = require('./ToString');

// https://262.ecma-international.org/6.0/#sec-regexpcreate

module.exports = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString(P);
	var flags = typeof F === 'undefined' ? '' : ToString(F);
	return new $RegExp(pattern, flags);
};

}, function(modId) { var map = {"./ToString":1625038546421}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546484, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var regexExec = require('call-bind/callBound')('RegExp.prototype.exec');

var Call = require('./Call');
var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

module.exports = function RegExpExec(R, S) {
	if (Type(R) !== 'Object') {
		throw new $TypeError('Assertion failed: `R` must be an Object');
	}
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type(result) === 'Object') {
			return result;
		}
		throw new $TypeError('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

}, function(modId) { var map = {"./Call":1625038546427,"./Get":1625038546424,"./IsCallable":1625038546414,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546485, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

module.exports = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue(x, y);
};

}, function(modId) { var map = {"./SameValue":1625038546415}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546486, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

module.exports = function SameValueZero(x, y) {
	return (x === y) || ($isNaN(x) && $isNaN(y));
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546487, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546403,"./modulo":1625038546446,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546488, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

module.exports = function Set(O, P, V, Throw) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	if (Type(Throw) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue(O[P], V)) {
			throw new $TypeError('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546411,"./SameValue":1625038546415,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546489, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

var getSymbolDescription = require('../helpers/getSymbolDescription');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsExtensible = require('./IsExtensible');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

module.exports = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || has(F, 'name')) {
		throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

}, function(modId) { var map = {"../helpers/getSymbolDescription":1625038546244,"./DefinePropertyOrThrow":1625038546426,"./IsExtensible":1625038546410,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546490, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $preventExtensions = GetIntrinsic('%Object.preventExtensions%');
var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');

var forEach = require('../helpers/forEach');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

module.exports = function SetIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/forEach":1625038546237,"./DefinePropertyOrThrow":1625038546426,"./IsAccessorDescriptor":1625038546407,"./ToPropertyDescriptor":1625038546412,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546491, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};

}, function(modId) { var map = {"./IsConstructor":1625038546425,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546492, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var $charAt = callBound('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

module.exports = function SplitMatch(S, q, R) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(q)) {
		throw new $TypeError('Assertion failed: `q` must be an integer');
	}
	if (Type(R) !== 'String') {
		throw new $TypeError('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt(S, q + i) !== $charAt(R, i)) {
			return false;
		}
	}

	return q + r;
};

}, function(modId) { var map = {"./IsInteger":1625038546402,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546493, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');
var $StringPrototype = GetIntrinsic('%String.prototype%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var Type = require('./Type');

var setProto = require('../helpers/setProto');

// https://262.ecma-international.org/6.0/#sec-stringcreate

module.exports = function StringCreate(value, prototype) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546426,"./Type":1625038546397,"../helpers/setProto":1625038546250}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546494, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var $charAt = callBound('String.prototype.charAt');
var $stringToString = callBound('String.prototype.toString');

var CanonicalNumericIndexString = require('./CanonicalNumericIndexString');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

var isNegativeZero = require('is-negative-zero');

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

module.exports = function StringGetOwnProperty(S, P) {
	var str;
	if (Type(S) === 'Object') {
		try {
			str = $stringToString(S);
		} catch (e) { /**/ }
	}
	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger(index) || isNegativeZero(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

}, function(modId) { var map = {"./CanonicalNumericIndexString":1625038546428,"./IsInteger":1625038546402,"./IsPropertyKey":1625038546411,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546495, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $SymbolToString = callBound('Symbol.prototype.toString', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

module.exports = function SymbolDescriptiveString(sym) {
	if (Type(sym) !== 'Symbol') {
		throw new $TypeError('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546496, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError = GetIntrinsic('%TypeError%');

var every = require('../helpers/every');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

module.exports = function TestIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/every":1625038546171,"./IsDataDescriptor":1625038546408,"./IsExtensible":1625038546410,"./ToPropertyDescriptor":1625038546412,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546497, function(require, module, exports) {


var $BooleanValueOf = require('call-bind/callBound')('Boolean.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

module.exports = function thisBooleanValue(value) {
	if (Type(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546498, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var Type = require('./Type');

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

module.exports = function thisNumberValue(value) {
	if (Type(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};


}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546499, function(require, module, exports) {


var $StringValueOf = require('call-bind/callBound')('String.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

module.exports = function thisStringValue(value) {
	if (Type(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546500, function(require, module, exports) {


var $DateValueOf = require('call-bind/callBound')('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

module.exports = function thisTimeValue(value) {
	return $DateValueOf(value);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546501, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546400,"./ToNumber":1625038546395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546502, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546442}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546503, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546446,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546504, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Date = GetIntrinsic('%Date%');

var $isNaN = require('../helpers/isNaN');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

module.exports = function ToDateString(tv) {
	if (Type(tv) !== 'Number') {
		throw new $TypeError('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"./Type":1625038546397}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546505, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');

var ToInteger = require('./ToInteger');
var ToLength = require('./ToLength');
var SameValueZero = require('./SameValueZero');

// https://262.ecma-international.org/8.0/#sec-toindex

module.exports = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger(value);
	if (integerIndex < 0) {
		throw new $RangeError('index must be >= 0');
	}
	var index = ToLength(integerIndex);
	if (!SameValueZero(integerIndex, index)) {
		throw new $RangeError('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

}, function(modId) { var map = {"./ToInteger":1625038546437,"./ToLength":1625038546436,"./SameValueZero":1625038546486}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546506, function(require, module, exports) {


var ToUint16 = require('./ToUint16');

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

module.exports = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

}, function(modId) { var map = {"./ToUint16":1625038546507}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546507, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546400,"./floor":1625038546403,"./modulo":1625038546446,"./ToNumber":1625038546395,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546508, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546395}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546509, function(require, module, exports) {


var ToUint8 = require('./ToUint8');

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

module.exports = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

}, function(modId) { var map = {"./ToUint8":1625038546510}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546510, function(require, module, exports) {


var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

module.exports = function ToUint8(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x100);
};

}, function(modId) { var map = {"./ToNumber":1625038546395,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122,"./abs":1625038546400,"./floor":1625038546403,"./modulo":1625038546446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546511, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

var ToPrimitive = require('./ToPrimitive');
var ToString = require('./ToString');

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

module.exports = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

}, function(modId) { var map = {"./ToPrimitive":1625038546396,"./ToString":1625038546421}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546512, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

module.exports = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

}, function(modId) { var map = {"./ToNumber":1625038546395,"./floor":1625038546403,"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546513, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

module.exports = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate(lead) || !isTrailingSurrogate(trail)) {
		throw new $TypeError('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode(lead) + $fromCharCode(trail);
};

}, function(modId) { var map = {"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546514, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

var floor = require('./floor');
var modulo = require('./modulo');

var isCodePoint = require('../helpers/isCodePoint');

// https://262.ecma-international.org/7.0/#sec-utf16encoding

module.exports = function UTF16Encoding(cp) {
	if (!isCodePoint(cp)) {
		throw new $TypeError('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode(cp);
	}
	var cu1 = floor((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode(cu1) + $fromCharCode(cu2);
};

}, function(modId) { var map = {"./floor":1625038546403,"./modulo":1625038546446,"../helpers/isCodePoint":1625038546391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546515, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546441,"./modulo":1625038546446}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546516, function(require, module, exports) {


/* eslint global-require: 0 */
// https://262.ecma-international.org/9.0/#sec-abstract-operations
var ES2018 = {
	'Abstract Equality Comparison': require('./2018/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./2018/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./2018/StrictEqualityComparison'),
	abs: require('./2018/abs'),
	AdvanceStringIndex: require('./2018/AdvanceStringIndex'),
	ArrayCreate: require('./2018/ArrayCreate'),
	ArraySetLength: require('./2018/ArraySetLength'),
	ArraySpeciesCreate: require('./2018/ArraySpeciesCreate'),
	Call: require('./2018/Call'),
	CanonicalNumericIndexString: require('./2018/CanonicalNumericIndexString'),
	CompletePropertyDescriptor: require('./2018/CompletePropertyDescriptor'),
	CopyDataProperties: require('./2018/CopyDataProperties'),
	CreateDataProperty: require('./2018/CreateDataProperty'),
	CreateDataPropertyOrThrow: require('./2018/CreateDataPropertyOrThrow'),
	CreateHTML: require('./2018/CreateHTML'),
	CreateIterResultObject: require('./2018/CreateIterResultObject'),
	CreateListFromArrayLike: require('./2018/CreateListFromArrayLike'),
	CreateMethodProperty: require('./2018/CreateMethodProperty'),
	DateFromTime: require('./2018/DateFromTime'),
	DateString: require('./2018/DateString'),
	Day: require('./2018/Day'),
	DayFromYear: require('./2018/DayFromYear'),
	DaysInYear: require('./2018/DaysInYear'),
	DayWithinYear: require('./2018/DayWithinYear'),
	DefinePropertyOrThrow: require('./2018/DefinePropertyOrThrow'),
	DeletePropertyOrThrow: require('./2018/DeletePropertyOrThrow'),
	EnumerableOwnPropertyNames: require('./2018/EnumerableOwnPropertyNames'),
	floor: require('./2018/floor'),
	FromPropertyDescriptor: require('./2018/FromPropertyDescriptor'),
	Get: require('./2018/Get'),
	GetIterator: require('./2018/GetIterator'),
	GetMethod: require('./2018/GetMethod'),
	GetOwnPropertyKeys: require('./2018/GetOwnPropertyKeys'),
	GetPrototypeFromConstructor: require('./2018/GetPrototypeFromConstructor'),
	GetSubstitution: require('./2018/GetSubstitution'),
	GetV: require('./2018/GetV'),
	HasOwnProperty: require('./2018/HasOwnProperty'),
	HasProperty: require('./2018/HasProperty'),
	HourFromTime: require('./2018/HourFromTime'),
	InLeapYear: require('./2018/InLeapYear'),
	InstanceofOperator: require('./2018/InstanceofOperator'),
	Invoke: require('./2018/Invoke'),
	IsAccessorDescriptor: require('./2018/IsAccessorDescriptor'),
	IsArray: require('./2018/IsArray'),
	IsCallable: require('./2018/IsCallable'),
	IsConcatSpreadable: require('./2018/IsConcatSpreadable'),
	IsConstructor: require('./2018/IsConstructor'),
	IsDataDescriptor: require('./2018/IsDataDescriptor'),
	IsExtensible: require('./2018/IsExtensible'),
	IsGenericDescriptor: require('./2018/IsGenericDescriptor'),
	IsInteger: require('./2018/IsInteger'),
	IsPromise: require('./2018/IsPromise'),
	IsPropertyKey: require('./2018/IsPropertyKey'),
	IsRegExp: require('./2018/IsRegExp'),
	IsStringPrefix: require('./2018/IsStringPrefix'),
	IterableToList: require('./2018/IterableToList'),
	IteratorClose: require('./2018/IteratorClose'),
	IteratorComplete: require('./2018/IteratorComplete'),
	IteratorNext: require('./2018/IteratorNext'),
	IteratorStep: require('./2018/IteratorStep'),
	IteratorValue: require('./2018/IteratorValue'),
	MakeDate: require('./2018/MakeDate'),
	MakeDay: require('./2018/MakeDay'),
	MakeTime: require('./2018/MakeTime'),
	MinFromTime: require('./2018/MinFromTime'),
	modulo: require('./2018/modulo'),
	MonthFromTime: require('./2018/MonthFromTime'),
	msFromTime: require('./2018/msFromTime'),
	NumberToString: require('./2018/NumberToString'),
	ObjectCreate: require('./2018/ObjectCreate'),
	OrdinaryCreateFromConstructor: require('./2018/OrdinaryCreateFromConstructor'),
	OrdinaryDefineOwnProperty: require('./2018/OrdinaryDefineOwnProperty'),
	OrdinaryGetOwnProperty: require('./2018/OrdinaryGetOwnProperty'),
	OrdinaryGetPrototypeOf: require('./2018/OrdinaryGetPrototypeOf'),
	OrdinaryHasInstance: require('./2018/OrdinaryHasInstance'),
	OrdinaryHasProperty: require('./2018/OrdinaryHasProperty'),
	OrdinarySetPrototypeOf: require('./2018/OrdinarySetPrototypeOf'),
	PromiseResolve: require('./2018/PromiseResolve'),
	QuoteJSONString: require('./2018/QuoteJSONString'),
	RegExpCreate: require('./2018/RegExpCreate'),
	RegExpExec: require('./2018/RegExpExec'),
	RequireObjectCoercible: require('./2018/RequireObjectCoercible'),
	SameValue: require('./2018/SameValue'),
	SameValueNonNumber: require('./2018/SameValueNonNumber'),
	SameValueZero: require('./2018/SameValueZero'),
	SecFromTime: require('./2018/SecFromTime'),
	Set: require('./2018/Set'),
	SetFunctionLength: require('./2018/SetFunctionLength'),
	SetFunctionName: require('./2018/SetFunctionName'),
	SetIntegrityLevel: require('./2018/SetIntegrityLevel'),
	SpeciesConstructor: require('./2018/SpeciesConstructor'),
	SplitMatch: require('./2018/SplitMatch'),
	StringCreate: require('./2018/StringCreate'),
	StringGetOwnProperty: require('./2018/StringGetOwnProperty'),
	SymbolDescriptiveString: require('./2018/SymbolDescriptiveString'),
	TestIntegrityLevel: require('./2018/TestIntegrityLevel'),
	thisBooleanValue: require('./2018/thisBooleanValue'),
	thisNumberValue: require('./2018/thisNumberValue'),
	thisStringValue: require('./2018/thisStringValue'),
	thisSymbolValue: require('./2018/thisSymbolValue'),
	thisTimeValue: require('./2018/thisTimeValue'),
	TimeClip: require('./2018/TimeClip'),
	TimeFromYear: require('./2018/TimeFromYear'),
	TimeString: require('./2018/TimeString'),
	TimeWithinDay: require('./2018/TimeWithinDay'),
	ToBoolean: require('./2018/ToBoolean'),
	ToDateString: require('./2018/ToDateString'),
	ToIndex: require('./2018/ToIndex'),
	ToInt16: require('./2018/ToInt16'),
	ToInt32: require('./2018/ToInt32'),
	ToInt8: require('./2018/ToInt8'),
	ToInteger: require('./2018/ToInteger'),
	ToLength: require('./2018/ToLength'),
	ToNumber: require('./2018/ToNumber'),
	ToObject: require('./2018/ToObject'),
	ToPrimitive: require('./2018/ToPrimitive'),
	ToPropertyDescriptor: require('./2018/ToPropertyDescriptor'),
	ToPropertyKey: require('./2018/ToPropertyKey'),
	ToString: require('./2018/ToString'),
	ToUint16: require('./2018/ToUint16'),
	ToUint32: require('./2018/ToUint32'),
	ToUint8: require('./2018/ToUint8'),
	ToUint8Clamp: require('./2018/ToUint8Clamp'),
	Type: require('./2018/Type'),
	UnicodeEscape: require('./2018/UnicodeEscape'),
	UTF16Decode: require('./2018/UTF16Decode'),
	UTF16Encoding: require('./2018/UTF16Encoding'),
	ValidateAndApplyPropertyDescriptor: require('./2018/ValidateAndApplyPropertyDescriptor'),
	WeekDay: require('./2018/WeekDay'),
	YearFromTime: require('./2018/YearFromTime')
};

module.exports = ES2018;

}, function(modId) { var map = {"./2018/AbstractEqualityComparison":1625038546517,"./2018/AbstractRelationalComparison":1625038546521,"./2018/StrictEqualityComparison":1625038546522,"./2018/abs":1625038546523,"./2018/AdvanceStringIndex":1625038546524,"./2018/ArrayCreate":1625038546527,"./2018/ArraySetLength":1625038546528,"./2018/ArraySpeciesCreate":1625038546546,"./2018/Call":1625038546550,"./2018/CanonicalNumericIndexString":1625038546551,"./2018/CompletePropertyDescriptor":1625038546552,"./2018/CopyDataProperties":1625038546553,"./2018/CreateDataProperty":1625038546555,"./2018/CreateDataPropertyOrThrow":1625038546558,"./2018/CreateHTML":1625038546559,"./2018/CreateIterResultObject":1625038546560,"./2018/CreateListFromArrayLike":1625038546561,"./2018/CreateMethodProperty":1625038546564,"./2018/DateFromTime":1625038546565,"./2018/DateString":1625038546574,"./2018/Day":1625038546567,"./2018/DayFromYear":1625038546568,"./2018/DaysInYear":1625038546571,"./2018/DayWithinYear":1625038546566,"./2018/DefinePropertyOrThrow":1625038546549,"./2018/DeletePropertyOrThrow":1625038546577,"./2018/EnumerableOwnPropertyNames":1625038546578,"./2018/floor":1625038546526,"./2018/FromPropertyDescriptor":1625038546540,"./2018/Get":1625038546547,"./2018/GetIterator":1625038546579,"./2018/GetMethod":1625038546580,"./2018/GetOwnPropertyKeys":1625038546582,"./2018/GetPrototypeFromConstructor":1625038546583,"./2018/GetSubstitution":1625038546584,"./2018/GetV":1625038546581,"./2018/HasOwnProperty":1625038546585,"./2018/HasProperty":1625038546586,"./2018/HourFromTime":1625038546587,"./2018/InLeapYear":1625038546570,"./2018/InstanceofOperator":1625038546588,"./2018/Invoke":1625038546590,"./2018/IsAccessorDescriptor":1625038546530,"./2018/IsArray":1625038546529,"./2018/IsCallable":1625038546537,"./2018/IsConcatSpreadable":1625038546591,"./2018/IsConstructor":1625038546548,"./2018/IsDataDescriptor":1625038546531,"./2018/IsExtensible":1625038546533,"./2018/IsGenericDescriptor":1625038546541,"./2018/IsInteger":1625038546525,"./2018/IsPromise":1625038546592,"./2018/IsPropertyKey":1625038546534,"./2018/IsRegExp":1625038546543,"./2018/IsStringPrefix":1625038546593,"./2018/IterableToList":1625038546594,"./2018/IteratorClose":1625038546599,"./2018/IteratorComplete":1625038546596,"./2018/IteratorNext":1625038546597,"./2018/IteratorStep":1625038546595,"./2018/IteratorValue":1625038546598,"./2018/MakeDate":1625038546600,"./2018/MakeDay":1625038546601,"./2018/MakeTime":1625038546602,"./2018/MinFromTime":1625038546603,"./2018/modulo":1625038546572,"./2018/MonthFromTime":1625038546573,"./2018/msFromTime":1625038546604,"./2018/NumberToString":1625038546605,"./2018/ObjectCreate":1625038546606,"./2018/OrdinaryCreateFromConstructor":1625038546607,"./2018/OrdinaryDefineOwnProperty":1625038546532,"./2018/OrdinaryGetOwnProperty":1625038546542,"./2018/OrdinaryGetPrototypeOf":1625038546608,"./2018/OrdinaryHasInstance":1625038546589,"./2018/OrdinaryHasProperty":1625038546609,"./2018/OrdinarySetPrototypeOf":1625038546610,"./2018/PromiseResolve":1625038546611,"./2018/QuoteJSONString":1625038546612,"./2018/RegExpCreate":1625038546614,"./2018/RegExpExec":1625038546615,"./2018/RequireObjectCoercible":1625038546557,"./2018/SameValue":1625038546538,"./2018/SameValueNonNumber":1625038546616,"./2018/SameValueZero":1625038546617,"./2018/SecFromTime":1625038546618,"./2018/Set":1625038546619,"./2018/SetFunctionLength":1625038546620,"./2018/SetFunctionName":1625038546621,"./2018/SetIntegrityLevel":1625038546622,"./2018/SpeciesConstructor":1625038546623,"./2018/SplitMatch":1625038546624,"./2018/StringCreate":1625038546625,"./2018/StringGetOwnProperty":1625038546626,"./2018/SymbolDescriptiveString":1625038546627,"./2018/TestIntegrityLevel":1625038546628,"./2018/thisBooleanValue":1625038546629,"./2018/thisNumberValue":1625038546630,"./2018/thisStringValue":1625038546631,"./2018/thisSymbolValue":1625038546632,"./2018/thisTimeValue":1625038546633,"./2018/TimeClip":1625038546634,"./2018/TimeFromYear":1625038546635,"./2018/TimeString":1625038546636,"./2018/TimeWithinDay":1625038546637,"./2018/ToBoolean":1625038546536,"./2018/ToDateString":1625038546638,"./2018/ToIndex":1625038546639,"./2018/ToInt16":1625038546640,"./2018/ToInt32":1625038546642,"./2018/ToInt8":1625038546643,"./2018/ToInteger":1625038546563,"./2018/ToLength":1625038546562,"./2018/ToNumber":1625038546518,"./2018/ToObject":1625038546556,"./2018/ToPrimitive":1625038546519,"./2018/ToPropertyDescriptor":1625038546535,"./2018/ToPropertyKey":1625038546645,"./2018/ToString":1625038546544,"./2018/ToUint16":1625038546641,"./2018/ToUint32":1625038546545,"./2018/ToUint8":1625038546644,"./2018/ToUint8Clamp":1625038546646,"./2018/Type":1625038546520,"./2018/UnicodeEscape":1625038546613,"./2018/UTF16Decode":1625038546647,"./2018/UTF16Encoding":1625038546648,"./2018/ValidateAndApplyPropertyDescriptor":1625038546539,"./2018/WeekDay":1625038546576,"./2018/YearFromTime":1625038546569}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546517, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546518,"./ToPrimitive":1625038546519,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546518, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var isPrimitive = require('../helpers/isPrimitive');

var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ToPrimitive = require('./ToPrimitive');

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

module.exports = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546519}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546519, function(require, module, exports) {


var toPrimitive = require('es-to-primitive/es2015');

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

module.exports = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546520, function(require, module, exports) {


var ES5Type = require('../5/Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};

}, function(modId) { var map = {"../5/Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546521, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546518,"./ToPrimitive":1625038546519,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546522, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546523, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546524, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $TypeError = GetIntrinsic('%TypeError%');

var $charCodeAt = require('call-bind/callBound')('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

module.exports = function AdvanceStringIndex(S, index, unicode) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type(unicode) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (!isLeadingSurrogate(first)) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (!isTrailingSurrogate(second)) {
		return index + 1;
	}

	return index + 2;
};

}, function(modId) { var map = {"./IsInteger":1625038546525,"./Type":1625038546520,"../helpers/maxSafeInteger":1625038546152,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546525, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

module.exports = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
		return false;
	}
	var absValue = abs(argument);
	return floor(absValue) === absValue;
};

}, function(modId) { var map = {"./abs":1625038546523,"./floor":1625038546526,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546526, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546527, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

module.exports = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

}, function(modId) { var map = {"./IsInteger":1625038546525}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546528, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var assign = require('object.assign');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsArray = require('./IsArray');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var OrdinaryDefineOwnProperty = require('./OrdinaryDefineOwnProperty');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./IsArray":1625038546529,"./IsAccessorDescriptor":1625038546530,"./IsDataDescriptor":1625038546531,"./OrdinaryDefineOwnProperty":1625038546532,"./OrdinaryGetOwnProperty":1625038546542,"./ToNumber":1625038546518,"./ToString":1625038546544,"./ToUint32":1625038546545,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546529, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('call-bind/callBound')('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546530, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546531, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546532, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var SameValue = require('./SameValue');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/isPropertyDescriptor":1625038546118,"./IsAccessorDescriptor":1625038546530,"./IsDataDescriptor":1625038546531,"./IsExtensible":1625038546533,"./IsPropertyKey":1625038546534,"./ToPropertyDescriptor":1625038546535,"./SameValue":1625038546538,"./Type":1625038546520,"./ValidateAndApplyPropertyDescriptor":1625038546539}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546533, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546534, function(require, module, exports) {


// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546535, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546520,"./ToBoolean":1625038546536,"./IsCallable":1625038546537}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546536, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546537, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546538, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546539, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');
var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var isSamePropertyDescriptor = require('../helpers/isSamePropertyDescriptor');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
module.exports = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError('Assertion failed: O must be undefined or an Object');
	}
	if (Type(extensible) !== 'Boolean') {
		throw new $TypeError('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) {
		// no further validation is required.
	} else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"../helpers/isPropertyDescriptor":1625038546118,"../helpers/isSamePropertyDescriptor":1625038546170,"./FromPropertyDescriptor":1625038546540,"./IsAccessorDescriptor":1625038546530,"./IsDataDescriptor":1625038546531,"./IsGenericDescriptor":1625038546541,"./IsPropertyKey":1625038546534,"./SameValue":1625038546538,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546540, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546541, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsAccessorDescriptor":1625038546530,"./IsDataDescriptor":1625038546531,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546542, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"./IsArray":1625038546529,"./IsPropertyKey":1625038546534,"./IsRegExp":1625038546543,"./ToPropertyDescriptor":1625038546535,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546543, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

}, function(modId) { var map = {"./ToBoolean":1625038546536}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546544, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546545, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546546, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsConstructor = require('./IsConstructor');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

module.exports = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};


}, function(modId) { var map = {"./Get":1625038546547,"./IsArray":1625038546529,"./IsConstructor":1625038546548,"./IsInteger":1625038546525,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546547, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var inspect = require('object-inspect');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

module.exports = function Get(O, P) {
	// 7.3.1.1
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
	}
	// 7.3.1.3
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546548, function(require, module, exports) {


var GetIntrinsic = require('../GetIntrinsic.js');

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

}, function(modId) { var map = {"../GetIntrinsic.js":1625038546181,"./DefinePropertyOrThrow":1625038546549}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546549, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546540,"./IsAccessorDescriptor":1625038546530,"./IsDataDescriptor":1625038546531,"./IsPropertyKey":1625038546534,"./SameValue":1625038546538,"./ToPropertyDescriptor":1625038546535,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546550, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('./IsArray');

var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

module.exports = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

}, function(modId) { var map = {"./IsArray":1625038546529}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546551, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

module.exports = function CanonicalNumericIndexString(argument) {
	if (Type(argument) !== 'String') {
		throw new $TypeError('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

}, function(modId) { var map = {"./SameValue":1625038546538,"./ToNumber":1625038546518,"./ToString":1625038546544,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546552, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

module.exports = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!has(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsDataDescriptor":1625038546531,"./IsGenericDescriptor":1625038546541,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546553, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');
var OwnPropertyKeys = require('../helpers/OwnPropertyKeys');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var CreateDataProperty = require('./CreateDataProperty');
var Get = require('./Get');
var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToObject = require('./ToObject');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-copydataproperties

module.exports = function CopyDataProperties(target, source, excludedItems) {
	if (Type(target) !== 'Object') {
		throw new $TypeError('Assertion failed: "target" must be an Object');
	}

	if (!IsArray(excludedItems)) {
		throw new $TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
	}
	for (var i = 0; i < excludedItems.length; i += 1) {
		if (!IsPropertyKey(excludedItems[i])) {
			throw new $TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
		}
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var fromObj = ToObject(source);

	var sourceKeys = OwnPropertyKeys(fromObj);
	forEach(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach(excludedItems, function (e) {
			if (SameValue(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable(fromObj, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && IsInteger(ToNumber(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = Get(fromObj, nextKey);
			CreateDataProperty(target, nextKey, propValue);
		}
	});

	return target;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"../helpers/OwnPropertyKeys":1625038546554,"./CreateDataProperty":1625038546555,"./Get":1625038546547,"./IsArray":1625038546529,"./IsInteger":1625038546525,"./IsPropertyKey":1625038546534,"./SameValue":1625038546538,"./ToNumber":1625038546518,"./ToObject":1625038546556,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546554, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBind = require('call-bind');
var callBound = require('call-bind/callBound');

var $ownKeys = GetIntrinsic('%Reflect.ownKeys%', true);
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));
var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%', true);
var $gOPS = $SymbolValueOf ? GetIntrinsic('%Object.getOwnPropertySymbols%') : null;

var keys = require('object-keys');

module.exports = $ownKeys || function OwnPropertyKeys(source) {
	var ownKeys = ($gOPN || keys)(source);
	if ($gOPS) {
		$pushApply(ownKeys, $gOPS(source));
	}
	return ownKeys;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546555, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546540,"./OrdinaryGetOwnProperty":1625038546542,"./IsDataDescriptor":1625038546531,"./IsExtensible":1625038546533,"./IsPropertyKey":1625038546534,"./SameValue":1625038546538,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546556, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546557}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546557, function(require, module, exports) {


module.exports = require('../5/CheckObjectCoercible');

}, function(modId) { var map = {"../5/CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546558, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};

}, function(modId) { var map = {"./CreateDataProperty":1625038546555,"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546559, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

module.exports = function CreateHTML(string, tag, attribute, value) {
	if (Type(tag) !== 'String' || Type(attribute) !== 'String') {
		throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546557,"./ToString":1625038546544,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546560, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

module.exports = function CreateIterResultObject(value, done) {
	if (Type(done) !== 'Boolean') {
		throw new $TypeError('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546561, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $indexOf = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToLength = require('./ToLength');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
module.exports = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength(Get(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type(next);
		if ($indexOf(elementTypes, nextType) < 0) {
			throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

}, function(modId) { var map = {"./Get":1625038546547,"./IsArray":1625038546529,"./ToLength":1625038546562,"./ToString":1625038546544,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546562, function(require, module, exports) {


var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var ToInteger = require('./ToInteger');

module.exports = function ToLength(argument) {
	var len = ToInteger(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
	return len;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./ToInteger":1625038546563}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546563, function(require, module, exports) {


var ES5ToInteger = require('../5/ToInteger');

var ToNumber = require('./ToNumber');

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	return ES5ToInteger(number);
};

}, function(modId) { var map = {"../5/ToInteger":1625038546121,"./ToNumber":1625038546518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546564, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

module.exports = function CreateMethodProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546540,"./IsDataDescriptor":1625038546531,"./IsPropertyKey":1625038546534,"./SameValue":1625038546538,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546565, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546566,"./InLeapYear":1625038546570,"./MonthFromTime":1625038546573}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546566, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546567,"./DayFromYear":1625038546568,"./YearFromTime":1625038546569}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546567, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546526,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546568, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546526}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546569, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546570, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546571,"./YearFromTime":1625038546569}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546571, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546572}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546572, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546573, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546566,"./InLeapYear":1625038546570}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546574, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var $isNaN = require('../helpers/isNaN');
var padTimeComponent = require('../helpers/padTimeComponent');

var Type = require('./Type');
var WeekDay = require('./WeekDay');
var MonthFromTime = require('./MonthFromTime');
var YearFromTime = require('./YearFromTime');
var DateFromTime = require('./DateFromTime');

// https://262.ecma-international.org/9.0/#sec-datestring

module.exports = function DateString(tv) {
	if (Type(tv) !== 'Number' || $isNaN(tv)) {
		throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays[WeekDay(tv)];
	var month = months[MonthFromTime(tv)];
	var day = padTimeComponent(DateFromTime(tv));
	var year = padTimeComponent(YearFromTime(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/padTimeComponent":1625038546575,"./Type":1625038546520,"./WeekDay":1625038546576,"./MonthFromTime":1625038546573,"./YearFromTime":1625038546569,"./DateFromTime":1625038546565}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546575, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $strSlice = callBound('String.prototype.slice');

module.exports = function padTimeComponent(c, count) {
	return $strSlice('00' + c, -(count || 2));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546576, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546567,"./modulo":1625038546572}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546577, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

module.exports = function DeletePropertyOrThrow(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError('Attempt to delete property failed.');
	}
	return success;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546578, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var objectKeys = require('object-keys');

var callBound = require('call-bind/callBound');

var callBind = require('call-bind');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));

var forEach = require('../helpers/forEach');

var Type = require('./Type');

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

module.exports = function EnumerableOwnProperties(O, kind) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach(keys, function (key) {
			if ($isEnumerable(O, key)) {
				$pushApply(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546579, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

module.exports = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray,
				Type: Type
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	return iterator;
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546524,"./Call":1625038546550,"./GetMethod":1625038546580,"./IsArray":1625038546529,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546580, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetV = require('./GetV');
var IsCallable = require('./IsCallable');
var IsPropertyKey = require('./IsPropertyKey');

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

module.exports = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

}, function(modId) { var map = {"./GetV":1625038546581,"./IsCallable":1625038546537,"./IsPropertyKey":1625038546534}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546581, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var ToObject = require('./ToObject');

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

module.exports = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./ToObject":1625038546556}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546582, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var hasSymbols = require('has-symbols')();

var $TypeError = GetIntrinsic('%TypeError%');

var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic('%Object.getOwnPropertySymbols%');
var keys = require('object-keys');

var esType = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

module.exports = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN) {
			return keys(O);
		}
		return $gOPN(O);
	}
	throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546583, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Function = GetIntrinsic('%Function%');
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

module.exports = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

}, function(modId) { var map = {"./Get":1625038546547,"./IsConstructor":1625038546548,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546584, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var every = require('../helpers/every');

var $charAt = callBound('String.prototype.charAt');
var $strSlice = callBound('String.prototype.slice');
var $indexOf = callBound('String.prototype.indexOf');
var $parseInt = parseInt;

var isDigit = regexTester(/^[0-9]$/);

var inspect = require('object-inspect');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var ToObject = require('./ToObject');
var ToString = require('./ToString');
var Type = require('./Type');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type(capture) === 'Undefined');
};

// http://262.ecma-international.org/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
module.exports = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type(matched) !== 'String') {
		throw new $TypeError('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type(replacement) !== 'String') {
		throw new $TypeError('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice(replacement, i + '$<'.length, endIndex);
							var capture = Get(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type(capture) !== 'Undefined') {
								result += ToString(capture);
							}
							i += ('<' + groupName + '>').length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/every":1625038546171,"./Get":1625038546547,"./IsArray":1625038546529,"./IsInteger":1625038546525,"./ToObject":1625038546556,"./ToString":1625038546544,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546585, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var has = require('has');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

module.exports = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546586, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546587, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546526,"./modulo":1625038546572,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546588, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var OrdinaryHasInstance = require('./OrdinaryHasInstance');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

module.exports = function InstanceofOperator(O, C) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

}, function(modId) { var map = {"./Call":1625038546550,"./GetMethod":1625038546580,"./IsCallable":1625038546537,"./OrdinaryHasInstance":1625038546589,"./ToBoolean":1625038546536,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546589, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

module.exports = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type(P) !== 'Object') {
		throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

}, function(modId) { var map = {"./Get":1625038546547,"./IsCallable":1625038546537,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546590, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var IsArray = require('./IsArray');
var GetV = require('./GetV');
var IsPropertyKey = require('./IsPropertyKey');

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

module.exports = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

}, function(modId) { var map = {"./Call":1625038546550,"./IsArray":1625038546529,"./GetV":1625038546581,"./IsPropertyKey":1625038546534}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546591, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

module.exports = function IsConcatSpreadable(O) {
	if (Type(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

}, function(modId) { var map = {"./Get":1625038546547,"./IsArray":1625038546529,"./ToBoolean":1625038546536,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546592, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $PromiseThen = callBound('Promise.prototype.then', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

module.exports = function IsPromise(x) {
	if (Type(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546593, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPrefixOf = require('../helpers/isPrefixOf');

// var callBound = require('call-bind/callBound');

// var $charAt = callBound('String.prototype.charAt');

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-isstringprefix

module.exports = function IsStringPrefix(p, q) {
	if (Type(p) !== 'String') {
		throw new $TypeError('Assertion failed: "p" must be a String');
	}

	if (Type(q) !== 'String') {
		throw new $TypeError('Assertion failed: "q" must be a String');
	}

	return isPrefixOf(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

}, function(modId) { var map = {"../helpers/isPrefixOf":1625038546094,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546594, function(require, module, exports) {


var callBound = require('call-bind/callBound');
var $arrayPush = callBound('Array.prototype.push');

var GetIterator = require('./GetIterator');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');

// https://262.ecma-international.org/8.0/#sec-iterabletolist

module.exports = function IterableToList(items, method) {
	var iterator = GetIterator(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep(iterator);
		if (next) {
			var nextValue = IteratorValue(next);
			$arrayPush(values, nextValue);
		}
	}
	return values;
};

}, function(modId) { var map = {"./GetIterator":1625038546579,"./IteratorStep":1625038546595,"./IteratorValue":1625038546598}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546595, function(require, module, exports) {


var IteratorComplete = require('./IteratorComplete');
var IteratorNext = require('./IteratorNext');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

module.exports = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};


}, function(modId) { var map = {"./IteratorComplete":1625038546596,"./IteratorNext":1625038546597}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546596, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

module.exports = function IteratorComplete(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

}, function(modId) { var map = {"./Get":1625038546547,"./ToBoolean":1625038546536,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546597, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Invoke = require('./Invoke');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

module.exports = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type(result) !== 'Object') {
		throw new $TypeError('iterator next must return an object');
	}
	return result;
};

}, function(modId) { var map = {"./Invoke":1625038546590,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546598, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

module.exports = function IteratorValue(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};


}, function(modId) { var map = {"./Get":1625038546547,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546599, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

module.exports = function IteratorClose(iterator, completion) {
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type(innerResult) !== 'Object') {
		throw new $TypeError('iterator .return must return an object');
	}

	return completionRecord;
};

}, function(modId) { var map = {"./Call":1625038546550,"./GetMethod":1625038546580,"./IsCallable":1625038546537,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546600, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546601, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546565,"./Day":1625038546567,"./floor":1625038546526,"./modulo":1625038546572,"./MonthFromTime":1625038546573,"./ToInteger":1625038546563,"./YearFromTime":1625038546569}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546602, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546563}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546603, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546526,"./modulo":1625038546572,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546604, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546572,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546605, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-tostring-applied-to-the-number-type

module.exports = function NumberToString(m) {
	if (Type(m) !== 'Number') {
		throw new $TypeError('Assertion failed: "m" must be a String');
	}

	return $String(m);
};


}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546606, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var Type = require('./Type');

var hasProto = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

module.exports = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546607, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var GetPrototypeFromConstructor = require('./GetPrototypeFromConstructor');
var IsArray = require('./IsArray');
var ObjectCreate = require('./ObjectCreate');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

module.exports = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate(proto, slots);
};

}, function(modId) { var map = {"./GetPrototypeFromConstructor":1625038546583,"./IsArray":1625038546529,"./ObjectCreate":1625038546606}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546608, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $getProto = require('../helpers/getProto');

var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

module.exports = function OrdinaryGetPrototypeOf(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!$getProto) {
		throw new $TypeError('This environment does not support fetching prototypes.');
	}
	return $getProto(O);
};

}, function(modId) { var map = {"../helpers/getProto":1625038546357,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546609, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546610, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $setProto = require('../helpers/setProto');

var OrdinaryGetPrototypeOf = require('./OrdinaryGetPrototypeOf');
var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

module.exports = function OrdinarySetPrototypeOf(O, V) {
	if (Type(V) !== 'Object' && Type(V) !== 'Null') {
		throw new $TypeError('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

}, function(modId) { var map = {"../helpers/setProto":1625038546250,"./OrdinaryGetPrototypeOf":1625038546608,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546611, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBind = require('call-bind');

var $resolve = GetIntrinsic('%Promise.resolve%', true);
var $PromiseResolve = $resolve && callBind($resolve);

// https://262.ecma-international.org/9.0/#sec-promise-resolve

module.exports = function PromiseResolve(C, x) {
	if (!$PromiseResolve) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve(C, x);
};


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546612, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $strSplit = callBound('String.prototype.split');

var Type = require('./Type');
var UnicodeEscape = require('./UnicodeEscape');

var has = require('has');

// https://262.ecma-international.org/9.0/#sec-quotejsonstring

var escapes = {
	'\u0008': '\\b',
	'\u0009': '\\t',
	'\u000A': '\\n',
	'\u000C': '\\f',
	'\u000D': '\\r',
	'\u0022': '\\"',
	'\u005c': '\\\\'
};

module.exports = function QuoteJSONString(value) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach($strSplit(value), function (C) {
			if (has(escapes, C)) {
				product += escapes[C];
			} else if ($charCodeAt(C, 0) < 0x20) {
				product += UnicodeEscape(C);
			} else {
				product += C;
			}
		});
	}
	product += '"';
	return product;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546520,"./UnicodeEscape":1625038546613}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546613, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $numberToString = callBound('Number.prototype.toString');
var $toLowerCase = callBound('String.prototype.toLowerCase');
var $strSlice = callBound('String.prototype.slice');

// https://262.ecma-international.org/9.0/#sec-unicodeescape

module.exports = function UnicodeEscape(C) {
	if (typeof C !== 'string' || C.length !== 1) {
		throw new $TypeError('Assertion failed: `C` must be a single code unit');
	}
	var n = $charCodeAt(C, 0);
	if (n > 0xFFFF) {
		throw new $TypeError('`Assertion failed: numeric value of `C` must be <= 0xFFFF');
	}

	return '\\u' + $strSlice('0000' + $toLowerCase($numberToString(n, 16)), -4);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546614, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RegExp = GetIntrinsic('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString = require('./ToString');

// https://262.ecma-international.org/6.0/#sec-regexpcreate

module.exports = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString(P);
	var flags = typeof F === 'undefined' ? '' : ToString(F);
	return new $RegExp(pattern, flags);
};

}, function(modId) { var map = {"./ToString":1625038546544}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546615, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var regexExec = require('call-bind/callBound')('RegExp.prototype.exec');

var Call = require('./Call');
var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

module.exports = function RegExpExec(R, S) {
	if (Type(R) !== 'Object') {
		throw new $TypeError('Assertion failed: `R` must be an Object');
	}
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type(result) === 'Object') {
			return result;
		}
		throw new $TypeError('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

}, function(modId) { var map = {"./Call":1625038546550,"./Get":1625038546547,"./IsCallable":1625038546537,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546616, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

module.exports = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue(x, y);
};

}, function(modId) { var map = {"./SameValue":1625038546538}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546617, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

module.exports = function SameValueZero(x, y) {
	return (x === y) || ($isNaN(x) && $isNaN(y));
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546618, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546526,"./modulo":1625038546572,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546619, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

module.exports = function Set(O, P, V, Throw) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	if (Type(Throw) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue(O[P], V)) {
			throw new $TypeError('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546534,"./SameValue":1625038546538,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546620, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var HasOwnProperty = require('./HasOwnProperty');
var IsExtensible = require('./IsExtensible');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-setfunctionlength

module.exports = function SetFunctionLength(F, length) {
	if (typeof F !== 'function' || !IsExtensible(F) || HasOwnProperty(F, 'length')) {
		throw new $TypeError('Assertion failed: `F` must be an extensible function and lack an own `length` property');
	}
	if (Type(length) !== 'Number') {
		throw new $TypeError('Assertion failed: `length` must be a Number');
	}
	if (length < 0 || !IsInteger(length)) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0');
	}
	return DefinePropertyOrThrow(F, 'length', {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546549,"./HasOwnProperty":1625038546585,"./IsExtensible":1625038546533,"./IsInteger":1625038546525,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546621, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

var getSymbolDescription = require('../helpers/getSymbolDescription');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsExtensible = require('./IsExtensible');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

module.exports = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || has(F, 'name')) {
		throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

}, function(modId) { var map = {"../helpers/getSymbolDescription":1625038546244,"./DefinePropertyOrThrow":1625038546549,"./IsExtensible":1625038546533,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546622, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $preventExtensions = GetIntrinsic('%Object.preventExtensions%');
var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');

var forEach = require('../helpers/forEach');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

module.exports = function SetIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/forEach":1625038546237,"./DefinePropertyOrThrow":1625038546549,"./IsAccessorDescriptor":1625038546530,"./ToPropertyDescriptor":1625038546535,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546623, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};

}, function(modId) { var map = {"./IsConstructor":1625038546548,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546624, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var $charAt = callBound('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

module.exports = function SplitMatch(S, q, R) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(q)) {
		throw new $TypeError('Assertion failed: `q` must be an integer');
	}
	if (Type(R) !== 'String') {
		throw new $TypeError('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt(S, q + i) !== $charAt(R, i)) {
			return false;
		}
	}

	return q + r;
};

}, function(modId) { var map = {"./IsInteger":1625038546525,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546625, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');
var $StringPrototype = GetIntrinsic('%String.prototype%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var Type = require('./Type');

var setProto = require('../helpers/setProto');

// https://262.ecma-international.org/6.0/#sec-stringcreate

module.exports = function StringCreate(value, prototype) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546549,"./Type":1625038546520,"../helpers/setProto":1625038546250}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546626, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var $charAt = callBound('String.prototype.charAt');
var $stringToString = callBound('String.prototype.toString');

var CanonicalNumericIndexString = require('./CanonicalNumericIndexString');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

var isNegativeZero = require('is-negative-zero');

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

module.exports = function StringGetOwnProperty(S, P) {
	var str;
	if (Type(S) === 'Object') {
		try {
			str = $stringToString(S);
		} catch (e) { /**/ }
	}
	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger(index) || isNegativeZero(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

}, function(modId) { var map = {"./CanonicalNumericIndexString":1625038546551,"./IsInteger":1625038546525,"./IsPropertyKey":1625038546534,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546627, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $SymbolToString = callBound('Symbol.prototype.toString', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

module.exports = function SymbolDescriptiveString(sym) {
	if (Type(sym) !== 'Symbol') {
		throw new $TypeError('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546628, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError = GetIntrinsic('%TypeError%');

var every = require('../helpers/every');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

module.exports = function TestIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/every":1625038546171,"./IsDataDescriptor":1625038546531,"./IsExtensible":1625038546533,"./ToPropertyDescriptor":1625038546535,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546629, function(require, module, exports) {


var $BooleanValueOf = require('call-bind/callBound')('Boolean.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

module.exports = function thisBooleanValue(value) {
	if (Type(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546630, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var Type = require('./Type');

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

module.exports = function thisNumberValue(value) {
	if (Type(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};


}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546631, function(require, module, exports) {


var $StringValueOf = require('call-bind/callBound')('String.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

module.exports = function thisStringValue(value) {
	if (Type(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546632, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-thissymbolvalue

module.exports = function thisSymbolValue(value) {
	if (!$SymbolValueOf) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546633, function(require, module, exports) {


var $DateValueOf = require('call-bind/callBound')('Date.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-date-prototype-object

module.exports = function thisTimeValue(value) {
	return $DateValueOf(value);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546634, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546523,"./ToNumber":1625038546518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546635, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546568}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546636, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var padTimeComponent = require('../helpers/padTimeComponent');

var HourFromTime = require('./HourFromTime');
var MinFromTime = require('./MinFromTime');
var SecFromTime = require('./SecFromTime');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-timestring

module.exports = function TimeString(tv) {
	if (Type(tv) !== 'Number' || $isNaN(tv)) {
		throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime(tv);
	var minute = MinFromTime(tv);
	var second = SecFromTime(tv);
	return padTimeComponent(hour) + ':' + padTimeComponent(minute) + ':' + padTimeComponent(second) + '\x20GMT';
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/padTimeComponent":1625038546575,"./HourFromTime":1625038546587,"./MinFromTime":1625038546603,"./SecFromTime":1625038546618,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546637, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546572,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546638, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Date = GetIntrinsic('%Date%');

var $isNaN = require('../helpers/isNaN');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

module.exports = function ToDateString(tv) {
	if (Type(tv) !== 'Number') {
		throw new $TypeError('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"./Type":1625038546520}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546639, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');

var ToInteger = require('./ToInteger');
var ToLength = require('./ToLength');
var SameValueZero = require('./SameValueZero');

// https://262.ecma-international.org/8.0/#sec-toindex

module.exports = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger(value);
	if (integerIndex < 0) {
		throw new $RangeError('index must be >= 0');
	}
	var index = ToLength(integerIndex);
	if (!SameValueZero(integerIndex, index)) {
		throw new $RangeError('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

}, function(modId) { var map = {"./ToInteger":1625038546563,"./ToLength":1625038546562,"./SameValueZero":1625038546617}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546640, function(require, module, exports) {


var ToUint16 = require('./ToUint16');

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

module.exports = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

}, function(modId) { var map = {"./ToUint16":1625038546641}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546641, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546523,"./floor":1625038546526,"./modulo":1625038546572,"./ToNumber":1625038546518,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546642, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546518}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546643, function(require, module, exports) {


var ToUint8 = require('./ToUint8');

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

module.exports = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

}, function(modId) { var map = {"./ToUint8":1625038546644}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546644, function(require, module, exports) {


var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

module.exports = function ToUint8(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x100);
};

}, function(modId) { var map = {"./ToNumber":1625038546518,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122,"./abs":1625038546523,"./floor":1625038546526,"./modulo":1625038546572}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546645, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

var ToPrimitive = require('./ToPrimitive');
var ToString = require('./ToString');

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

module.exports = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

}, function(modId) { var map = {"./ToPrimitive":1625038546519,"./ToString":1625038546544}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546646, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

module.exports = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

}, function(modId) { var map = {"./ToNumber":1625038546518,"./floor":1625038546526,"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546647, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

module.exports = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate(lead) || !isTrailingSurrogate(trail)) {
		throw new $TypeError('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode(lead) + $fromCharCode(trail);
};

}, function(modId) { var map = {"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546648, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

var floor = require('./floor');
var modulo = require('./modulo');

var isCodePoint = require('../helpers/isCodePoint');

// https://262.ecma-international.org/7.0/#sec-utf16encoding

module.exports = function UTF16Encoding(cp) {
	if (!isCodePoint(cp)) {
		throw new $TypeError('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode(cp);
	}
	var cu1 = floor((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode(cu1) + $fromCharCode(cu2);
};

}, function(modId) { var map = {"./floor":1625038546526,"./modulo":1625038546572,"../helpers/isCodePoint":1625038546391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546649, function(require, module, exports) {


/* eslint global-require: 0 */
// https://262.ecma-international.org/10.0/#sec-abstract-operations
var ES2019 = {
	'Abstract Equality Comparison': require('./2019/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./2019/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./2019/StrictEqualityComparison'),
	abs: require('./2019/abs'),
	AddEntriesFromIterable: require('./2019/AddEntriesFromIterable'),
	AdvanceStringIndex: require('./2019/AdvanceStringIndex'),
	ArrayCreate: require('./2019/ArrayCreate'),
	ArraySetLength: require('./2019/ArraySetLength'),
	ArraySpeciesCreate: require('./2019/ArraySpeciesCreate'),
	Call: require('./2019/Call'),
	CanonicalNumericIndexString: require('./2019/CanonicalNumericIndexString'),
	CompletePropertyDescriptor: require('./2019/CompletePropertyDescriptor'),
	CopyDataProperties: require('./2019/CopyDataProperties'),
	CreateDataProperty: require('./2019/CreateDataProperty'),
	CreateDataPropertyOrThrow: require('./2019/CreateDataPropertyOrThrow'),
	CreateHTML: require('./2019/CreateHTML'),
	CreateIterResultObject: require('./2019/CreateIterResultObject'),
	CreateListFromArrayLike: require('./2019/CreateListFromArrayLike'),
	CreateMethodProperty: require('./2019/CreateMethodProperty'),
	DateFromTime: require('./2019/DateFromTime'),
	DateString: require('./2019/DateString'),
	Day: require('./2019/Day'),
	DayFromYear: require('./2019/DayFromYear'),
	DaysInYear: require('./2019/DaysInYear'),
	DayWithinYear: require('./2019/DayWithinYear'),
	DefinePropertyOrThrow: require('./2019/DefinePropertyOrThrow'),
	DeletePropertyOrThrow: require('./2019/DeletePropertyOrThrow'),
	EnumerableOwnPropertyNames: require('./2019/EnumerableOwnPropertyNames'),
	FlattenIntoArray: require('./2019/FlattenIntoArray'),
	floor: require('./2019/floor'),
	FromPropertyDescriptor: require('./2019/FromPropertyDescriptor'),
	Get: require('./2019/Get'),
	GetIterator: require('./2019/GetIterator'),
	GetMethod: require('./2019/GetMethod'),
	GetOwnPropertyKeys: require('./2019/GetOwnPropertyKeys'),
	GetPrototypeFromConstructor: require('./2019/GetPrototypeFromConstructor'),
	GetSubstitution: require('./2019/GetSubstitution'),
	GetV: require('./2019/GetV'),
	HasOwnProperty: require('./2019/HasOwnProperty'),
	HasProperty: require('./2019/HasProperty'),
	HourFromTime: require('./2019/HourFromTime'),
	InLeapYear: require('./2019/InLeapYear'),
	InstanceofOperator: require('./2019/InstanceofOperator'),
	Invoke: require('./2019/Invoke'),
	IsAccessorDescriptor: require('./2019/IsAccessorDescriptor'),
	IsArray: require('./2019/IsArray'),
	IsCallable: require('./2019/IsCallable'),
	IsConcatSpreadable: require('./2019/IsConcatSpreadable'),
	IsConstructor: require('./2019/IsConstructor'),
	IsDataDescriptor: require('./2019/IsDataDescriptor'),
	IsExtensible: require('./2019/IsExtensible'),
	IsGenericDescriptor: require('./2019/IsGenericDescriptor'),
	IsInteger: require('./2019/IsInteger'),
	IsPromise: require('./2019/IsPromise'),
	IsPropertyKey: require('./2019/IsPropertyKey'),
	IsRegExp: require('./2019/IsRegExp'),
	IsStringPrefix: require('./2019/IsStringPrefix'),
	IterableToList: require('./2019/IterableToList'),
	IteratorClose: require('./2019/IteratorClose'),
	IteratorComplete: require('./2019/IteratorComplete'),
	IteratorNext: require('./2019/IteratorNext'),
	IteratorStep: require('./2019/IteratorStep'),
	IteratorValue: require('./2019/IteratorValue'),
	MakeDate: require('./2019/MakeDate'),
	MakeDay: require('./2019/MakeDay'),
	MakeTime: require('./2019/MakeTime'),
	MinFromTime: require('./2019/MinFromTime'),
	modulo: require('./2019/modulo'),
	MonthFromTime: require('./2019/MonthFromTime'),
	msFromTime: require('./2019/msFromTime'),
	NumberToString: require('./2019/NumberToString'),
	ObjectCreate: require('./2019/ObjectCreate'),
	OrdinaryCreateFromConstructor: require('./2019/OrdinaryCreateFromConstructor'),
	OrdinaryDefineOwnProperty: require('./2019/OrdinaryDefineOwnProperty'),
	OrdinaryGetOwnProperty: require('./2019/OrdinaryGetOwnProperty'),
	OrdinaryGetPrototypeOf: require('./2019/OrdinaryGetPrototypeOf'),
	OrdinaryHasInstance: require('./2019/OrdinaryHasInstance'),
	OrdinaryHasProperty: require('./2019/OrdinaryHasProperty'),
	OrdinarySetPrototypeOf: require('./2019/OrdinarySetPrototypeOf'),
	PromiseResolve: require('./2019/PromiseResolve'),
	QuoteJSONString: require('./2019/QuoteJSONString'),
	RegExpCreate: require('./2019/RegExpCreate'),
	RegExpExec: require('./2019/RegExpExec'),
	RequireObjectCoercible: require('./2019/RequireObjectCoercible'),
	SameValue: require('./2019/SameValue'),
	SameValueNonNumber: require('./2019/SameValueNonNumber'),
	SameValueZero: require('./2019/SameValueZero'),
	SecFromTime: require('./2019/SecFromTime'),
	Set: require('./2019/Set'),
	SetFunctionLength: require('./2019/SetFunctionLength'),
	SetFunctionName: require('./2019/SetFunctionName'),
	SetIntegrityLevel: require('./2019/SetIntegrityLevel'),
	SpeciesConstructor: require('./2019/SpeciesConstructor'),
	SplitMatch: require('./2019/SplitMatch'),
	StringCreate: require('./2019/StringCreate'),
	StringGetOwnProperty: require('./2019/StringGetOwnProperty'),
	SymbolDescriptiveString: require('./2019/SymbolDescriptiveString'),
	TestIntegrityLevel: require('./2019/TestIntegrityLevel'),
	thisBooleanValue: require('./2019/thisBooleanValue'),
	thisNumberValue: require('./2019/thisNumberValue'),
	thisStringValue: require('./2019/thisStringValue'),
	thisSymbolValue: require('./2019/thisSymbolValue'),
	thisTimeValue: require('./2019/thisTimeValue'),
	TimeClip: require('./2019/TimeClip'),
	TimeFromYear: require('./2019/TimeFromYear'),
	TimeString: require('./2019/TimeString'),
	TimeWithinDay: require('./2019/TimeWithinDay'),
	ToBoolean: require('./2019/ToBoolean'),
	ToDateString: require('./2019/ToDateString'),
	ToIndex: require('./2019/ToIndex'),
	ToInt16: require('./2019/ToInt16'),
	ToInt32: require('./2019/ToInt32'),
	ToInt8: require('./2019/ToInt8'),
	ToInteger: require('./2019/ToInteger'),
	ToLength: require('./2019/ToLength'),
	ToNumber: require('./2019/ToNumber'),
	ToObject: require('./2019/ToObject'),
	ToPrimitive: require('./2019/ToPrimitive'),
	ToPropertyDescriptor: require('./2019/ToPropertyDescriptor'),
	ToPropertyKey: require('./2019/ToPropertyKey'),
	ToString: require('./2019/ToString'),
	ToUint16: require('./2019/ToUint16'),
	ToUint32: require('./2019/ToUint32'),
	ToUint8: require('./2019/ToUint8'),
	ToUint8Clamp: require('./2019/ToUint8Clamp'),
	TrimString: require('./2019/TrimString'),
	Type: require('./2019/Type'),
	UnicodeEscape: require('./2019/UnicodeEscape'),
	UTF16Decode: require('./2019/UTF16Decode'),
	UTF16Encoding: require('./2019/UTF16Encoding'),
	ValidateAndApplyPropertyDescriptor: require('./2019/ValidateAndApplyPropertyDescriptor'),
	WeekDay: require('./2019/WeekDay'),
	YearFromTime: require('./2019/YearFromTime')
};

module.exports = ES2019;

}, function(modId) { var map = {"./2019/AbstractEqualityComparison":1625038546650,"./2019/AbstractRelationalComparison":1625038546654,"./2019/StrictEqualityComparison":1625038546655,"./2019/abs":1625038546656,"./2019/AddEntriesFromIterable":1625038546657,"./2019/AdvanceStringIndex":1625038546663,"./2019/ArrayCreate":1625038546678,"./2019/ArraySetLength":1625038546679,"./2019/ArraySpeciesCreate":1625038546693,"./2019/Call":1625038546658,"./2019/CanonicalNumericIndexString":1625038546696,"./2019/CompletePropertyDescriptor":1625038546697,"./2019/CopyDataProperties":1625038546698,"./2019/CreateDataProperty":1625038546699,"./2019/CreateDataPropertyOrThrow":1625038546700,"./2019/CreateHTML":1625038546701,"./2019/CreateIterResultObject":1625038546702,"./2019/CreateListFromArrayLike":1625038546703,"./2019/CreateMethodProperty":1625038546706,"./2019/DateFromTime":1625038546707,"./2019/DateString":1625038546716,"./2019/Day":1625038546709,"./2019/DayFromYear":1625038546710,"./2019/DaysInYear":1625038546713,"./2019/DayWithinYear":1625038546708,"./2019/DefinePropertyOrThrow":1625038546695,"./2019/DeletePropertyOrThrow":1625038546718,"./2019/EnumerableOwnPropertyNames":1625038546719,"./2019/FlattenIntoArray":1625038546720,"./2019/floor":1625038546665,"./2019/FromPropertyDescriptor":1625038546687,"./2019/Get":1625038546660,"./2019/GetIterator":1625038546662,"./2019/GetMethod":1625038546666,"./2019/GetOwnPropertyKeys":1625038546722,"./2019/GetPrototypeFromConstructor":1625038546723,"./2019/GetSubstitution":1625038546724,"./2019/GetV":1625038546667,"./2019/HasOwnProperty":1625038546725,"./2019/HasProperty":1625038546721,"./2019/HourFromTime":1625038546726,"./2019/InLeapYear":1625038546712,"./2019/InstanceofOperator":1625038546727,"./2019/Invoke":1625038546676,"./2019/IsAccessorDescriptor":1625038546680,"./2019/IsArray":1625038546659,"./2019/IsCallable":1625038546670,"./2019/IsConcatSpreadable":1625038546729,"./2019/IsConstructor":1625038546694,"./2019/IsDataDescriptor":1625038546681,"./2019/IsExtensible":1625038546683,"./2019/IsGenericDescriptor":1625038546688,"./2019/IsInteger":1625038546664,"./2019/IsPromise":1625038546730,"./2019/IsPropertyKey":1625038546661,"./2019/IsRegExp":1625038546690,"./2019/IsStringPrefix":1625038546731,"./2019/IterableToList":1625038546732,"./2019/IteratorClose":1625038546671,"./2019/IteratorComplete":1625038546673,"./2019/IteratorNext":1625038546675,"./2019/IteratorStep":1625038546672,"./2019/IteratorValue":1625038546677,"./2019/MakeDate":1625038546733,"./2019/MakeDay":1625038546734,"./2019/MakeTime":1625038546735,"./2019/MinFromTime":1625038546736,"./2019/modulo":1625038546714,"./2019/MonthFromTime":1625038546715,"./2019/msFromTime":1625038546737,"./2019/NumberToString":1625038546738,"./2019/ObjectCreate":1625038546739,"./2019/OrdinaryCreateFromConstructor":1625038546740,"./2019/OrdinaryDefineOwnProperty":1625038546682,"./2019/OrdinaryGetOwnProperty":1625038546689,"./2019/OrdinaryGetPrototypeOf":1625038546741,"./2019/OrdinaryHasInstance":1625038546728,"./2019/OrdinaryHasProperty":1625038546742,"./2019/OrdinarySetPrototypeOf":1625038546743,"./2019/PromiseResolve":1625038546744,"./2019/QuoteJSONString":1625038546745,"./2019/RegExpCreate":1625038546748,"./2019/RegExpExec":1625038546749,"./2019/RequireObjectCoercible":1625038546669,"./2019/SameValue":1625038546685,"./2019/SameValueNonNumber":1625038546750,"./2019/SameValueZero":1625038546751,"./2019/SecFromTime":1625038546752,"./2019/Set":1625038546753,"./2019/SetFunctionLength":1625038546754,"./2019/SetFunctionName":1625038546755,"./2019/SetIntegrityLevel":1625038546756,"./2019/SpeciesConstructor":1625038546757,"./2019/SplitMatch":1625038546758,"./2019/StringCreate":1625038546759,"./2019/StringGetOwnProperty":1625038546760,"./2019/SymbolDescriptiveString":1625038546761,"./2019/TestIntegrityLevel":1625038546762,"./2019/thisBooleanValue":1625038546763,"./2019/thisNumberValue":1625038546764,"./2019/thisStringValue":1625038546765,"./2019/thisSymbolValue":1625038546766,"./2019/thisTimeValue":1625038546767,"./2019/TimeClip":1625038546768,"./2019/TimeFromYear":1625038546769,"./2019/TimeString":1625038546770,"./2019/TimeWithinDay":1625038546771,"./2019/ToBoolean":1625038546674,"./2019/ToDateString":1625038546772,"./2019/ToIndex":1625038546773,"./2019/ToInt16":1625038546774,"./2019/ToInt32":1625038546776,"./2019/ToInt8":1625038546777,"./2019/ToInteger":1625038546705,"./2019/ToLength":1625038546704,"./2019/ToNumber":1625038546651,"./2019/ToObject":1625038546668,"./2019/ToPrimitive":1625038546652,"./2019/ToPropertyDescriptor":1625038546684,"./2019/ToPropertyKey":1625038546779,"./2019/ToString":1625038546691,"./2019/ToUint16":1625038546775,"./2019/ToUint32":1625038546692,"./2019/ToUint8":1625038546778,"./2019/ToUint8Clamp":1625038546780,"./2019/TrimString":1625038546781,"./2019/Type":1625038546653,"./2019/UnicodeEscape":1625038546746,"./2019/UTF16Decode":1625038546782,"./2019/UTF16Encoding":1625038546747,"./2019/ValidateAndApplyPropertyDescriptor":1625038546686,"./2019/WeekDay":1625038546717,"./2019/YearFromTime":1625038546711}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546650, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546651,"./ToPrimitive":1625038546652,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546651, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var isPrimitive = require('../helpers/isPrimitive');

var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ToPrimitive = require('./ToPrimitive');

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

module.exports = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546652}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546652, function(require, module, exports) {


var toPrimitive = require('es-to-primitive/es2015');

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

module.exports = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546653, function(require, module, exports) {


var ES5Type = require('../5/Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	return ES5Type(x);
};

}, function(modId) { var map = {"../5/Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546654, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546651,"./ToPrimitive":1625038546652,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546655, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546656, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546657, function(require, module, exports) {


var inspect = require('object-inspect');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var Get = require('./Get');
var GetIterator = require('./GetIterator');
var IsCallable = require('./IsCallable');
var IteratorClose = require('./IteratorClose');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');
var Type = require('./Type');

// https://262.ecma-international.org/10.0//#sec-add-entries-from-iterable

module.exports = function AddEntriesFromIterable(target, iterable, adder) {
	if (!IsCallable(adder)) {
		throw new $TypeError('Assertion failed: `adder` is not callable');
	}
	if (iterable == null) {
		throw new $TypeError('Assertion failed: `iterable` is present, and not nullish');
	}
	var iteratorRecord = GetIterator(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = IteratorStep(iteratorRecord);
		if (!next) {
			return target;
		}
		var nextItem = IteratorValue(next);
		if (Type(nextItem) !== 'Object') {
			var error = new $TypeError('iterator next must return an Object, got ' + inspect(nextItem));
			return IteratorClose(
				iteratorRecord,
				function () { throw error; } // eslint-disable-line no-loop-func
			);
		}
		try {
			var k = Get(nextItem, '0');
			var v = Get(nextItem, '1');
			Call(adder, target, [k, v]);
		} catch (e) {
			return IteratorClose(
				iteratorRecord,
				function () { throw e; }
			);
		}
	}
};

}, function(modId) { var map = {"./Call":1625038546658,"./Get":1625038546660,"./GetIterator":1625038546662,"./IsCallable":1625038546670,"./IteratorClose":1625038546671,"./IteratorStep":1625038546672,"./IteratorValue":1625038546677,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546658, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('./IsArray');

var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

module.exports = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

}, function(modId) { var map = {"./IsArray":1625038546659}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546659, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('call-bind/callBound')('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546660, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var inspect = require('object-inspect');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

module.exports = function Get(O, P) {
	// 7.3.1.1
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
	}
	// 7.3.1.3
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546661, function(require, module, exports) {


// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546662, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getiterator

module.exports = function GetIterator(obj, method) {
	var actualMethod = method;
	if (arguments.length < 2) {
		actualMethod = getIteratorMethod(
			{
				AdvanceStringIndex: AdvanceStringIndex,
				GetMethod: GetMethod,
				IsArray: IsArray,
				Type: Type
			},
			obj
		);
	}
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	return iterator;
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546663,"./Call":1625038546658,"./GetMethod":1625038546666,"./IsArray":1625038546659,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546663, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $TypeError = GetIntrinsic('%TypeError%');

var $charCodeAt = require('call-bind/callBound')('String.prototype.charCodeAt');

// https://ecma-international.org/ecma-262/6.0/#sec-advancestringindex

module.exports = function AdvanceStringIndex(S, index, unicode) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type(unicode) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}

	var first = $charCodeAt(S, index);
	if (!isLeadingSurrogate(first)) {
		return index + 1;
	}

	var second = $charCodeAt(S, index + 1);
	if (!isTrailingSurrogate(second)) {
		return index + 1;
	}

	return index + 2;
};

}, function(modId) { var map = {"./IsInteger":1625038546664,"./Type":1625038546653,"../helpers/maxSafeInteger":1625038546152,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546664, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

module.exports = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
		return false;
	}
	var absValue = abs(argument);
	return floor(absValue) === absValue;
};

}, function(modId) { var map = {"./abs":1625038546656,"./floor":1625038546665,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546665, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546666, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetV = require('./GetV');
var IsCallable = require('./IsCallable');
var IsPropertyKey = require('./IsPropertyKey');

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

module.exports = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

}, function(modId) { var map = {"./GetV":1625038546667,"./IsCallable":1625038546670,"./IsPropertyKey":1625038546661}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546667, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var ToObject = require('./ToObject');

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

module.exports = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./ToObject":1625038546668}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546668, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546669}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546669, function(require, module, exports) {


module.exports = require('../5/CheckObjectCoercible');

}, function(modId) { var map = {"../5/CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546670, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546671, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

module.exports = function IteratorClose(iterator, completion) {
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type(innerResult) !== 'Object') {
		throw new $TypeError('iterator .return must return an object');
	}

	return completionRecord;
};

}, function(modId) { var map = {"./Call":1625038546658,"./GetMethod":1625038546666,"./IsCallable":1625038546670,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546672, function(require, module, exports) {


var IteratorComplete = require('./IteratorComplete');
var IteratorNext = require('./IteratorNext');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

module.exports = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};


}, function(modId) { var map = {"./IteratorComplete":1625038546673,"./IteratorNext":1625038546675}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546673, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

module.exports = function IteratorComplete(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

}, function(modId) { var map = {"./Get":1625038546660,"./ToBoolean":1625038546674,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546674, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546675, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Invoke = require('./Invoke');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

module.exports = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type(result) !== 'Object') {
		throw new $TypeError('iterator next must return an object');
	}
	return result;
};

}, function(modId) { var map = {"./Invoke":1625038546676,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546676, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var IsArray = require('./IsArray');
var GetV = require('./GetV');
var IsPropertyKey = require('./IsPropertyKey');

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

module.exports = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

}, function(modId) { var map = {"./Call":1625038546658,"./IsArray":1625038546659,"./GetV":1625038546667,"./IsPropertyKey":1625038546661}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546677, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

module.exports = function IteratorValue(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};


}, function(modId) { var map = {"./Get":1625038546660,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546678, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

module.exports = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

}, function(modId) { var map = {"./IsInteger":1625038546664}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546679, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var assign = require('object.assign');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsArray = require('./IsArray');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var OrdinaryDefineOwnProperty = require('./OrdinaryDefineOwnProperty');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./IsArray":1625038546659,"./IsAccessorDescriptor":1625038546680,"./IsDataDescriptor":1625038546681,"./OrdinaryDefineOwnProperty":1625038546682,"./OrdinaryGetOwnProperty":1625038546689,"./ToNumber":1625038546651,"./ToString":1625038546691,"./ToUint32":1625038546692,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546680, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546681, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546682, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var SameValue = require('./SameValue');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/isPropertyDescriptor":1625038546118,"./IsAccessorDescriptor":1625038546680,"./IsDataDescriptor":1625038546681,"./IsExtensible":1625038546683,"./IsPropertyKey":1625038546661,"./ToPropertyDescriptor":1625038546684,"./SameValue":1625038546685,"./Type":1625038546653,"./ValidateAndApplyPropertyDescriptor":1625038546686}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546683, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546684, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546653,"./ToBoolean":1625038546674,"./IsCallable":1625038546670}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546685, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546686, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');
var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var isSamePropertyDescriptor = require('../helpers/isSamePropertyDescriptor');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
module.exports = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError('Assertion failed: O must be undefined or an Object');
	}
	if (Type(extensible) !== 'Boolean') {
		throw new $TypeError('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) {
		// no further validation is required.
	} else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"../helpers/isPropertyDescriptor":1625038546118,"../helpers/isSamePropertyDescriptor":1625038546170,"./FromPropertyDescriptor":1625038546687,"./IsAccessorDescriptor":1625038546680,"./IsDataDescriptor":1625038546681,"./IsGenericDescriptor":1625038546688,"./IsPropertyKey":1625038546661,"./SameValue":1625038546685,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546687, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546688, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsAccessorDescriptor":1625038546680,"./IsDataDescriptor":1625038546681,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546689, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"./IsArray":1625038546659,"./IsPropertyKey":1625038546661,"./IsRegExp":1625038546690,"./ToPropertyDescriptor":1625038546684,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546690, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

}, function(modId) { var map = {"./ToBoolean":1625038546674}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546691, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546692, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546651}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546693, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsConstructor = require('./IsConstructor');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

module.exports = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};


}, function(modId) { var map = {"./Get":1625038546660,"./IsArray":1625038546659,"./IsConstructor":1625038546694,"./IsInteger":1625038546664,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546694, function(require, module, exports) {


var GetIntrinsic = require('../GetIntrinsic.js');

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

}, function(modId) { var map = {"../GetIntrinsic.js":1625038546181,"./DefinePropertyOrThrow":1625038546695}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546695, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546687,"./IsAccessorDescriptor":1625038546680,"./IsDataDescriptor":1625038546681,"./IsPropertyKey":1625038546661,"./SameValue":1625038546685,"./ToPropertyDescriptor":1625038546684,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546696, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

module.exports = function CanonicalNumericIndexString(argument) {
	if (Type(argument) !== 'String') {
		throw new $TypeError('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

}, function(modId) { var map = {"./SameValue":1625038546685,"./ToNumber":1625038546651,"./ToString":1625038546691,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546697, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

module.exports = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!has(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsDataDescriptor":1625038546681,"./IsGenericDescriptor":1625038546688,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546698, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');
var OwnPropertyKeys = require('../helpers/OwnPropertyKeys');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var CreateDataProperty = require('./CreateDataProperty');
var Get = require('./Get');
var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToObject = require('./ToObject');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-copydataproperties

module.exports = function CopyDataProperties(target, source, excludedItems) {
	if (Type(target) !== 'Object') {
		throw new $TypeError('Assertion failed: "target" must be an Object');
	}

	if (!IsArray(excludedItems)) {
		throw new $TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
	}
	for (var i = 0; i < excludedItems.length; i += 1) {
		if (!IsPropertyKey(excludedItems[i])) {
			throw new $TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
		}
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var fromObj = ToObject(source);

	var sourceKeys = OwnPropertyKeys(fromObj);
	forEach(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach(excludedItems, function (e) {
			if (SameValue(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable(fromObj, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && IsInteger(ToNumber(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = Get(fromObj, nextKey);
			CreateDataProperty(target, nextKey, propValue);
		}
	});

	return target;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"../helpers/OwnPropertyKeys":1625038546554,"./CreateDataProperty":1625038546699,"./Get":1625038546660,"./IsArray":1625038546659,"./IsInteger":1625038546664,"./IsPropertyKey":1625038546661,"./SameValue":1625038546685,"./ToNumber":1625038546651,"./ToObject":1625038546668,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546699, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546687,"./OrdinaryGetOwnProperty":1625038546689,"./IsDataDescriptor":1625038546681,"./IsExtensible":1625038546683,"./IsPropertyKey":1625038546661,"./SameValue":1625038546685,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546700, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};

}, function(modId) { var map = {"./CreateDataProperty":1625038546699,"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546701, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

module.exports = function CreateHTML(string, tag, attribute, value) {
	if (Type(tag) !== 'String' || Type(attribute) !== 'String') {
		throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546669,"./ToString":1625038546691,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546702, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

module.exports = function CreateIterResultObject(value, done) {
	if (Type(done) !== 'Boolean') {
		throw new $TypeError('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546703, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $indexOf = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToLength = require('./ToLength');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createlistfromarraylike
module.exports = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = ToLength(Get(obj, 'length'));
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type(next);
		if ($indexOf(elementTypes, nextType) < 0) {
			throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

}, function(modId) { var map = {"./Get":1625038546660,"./IsArray":1625038546659,"./ToLength":1625038546704,"./ToString":1625038546691,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546704, function(require, module, exports) {


var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var ToInteger = require('./ToInteger');

module.exports = function ToLength(argument) {
	var len = ToInteger(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
	return len;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./ToInteger":1625038546705}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546705, function(require, module, exports) {


var ES5ToInteger = require('../5/ToInteger');

var ToNumber = require('./ToNumber');

// https://ecma-international.org/ecma-262/6.0/#sec-tointeger

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	return ES5ToInteger(number);
};

}, function(modId) { var map = {"../5/ToInteger":1625038546121,"./ToNumber":1625038546651}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546706, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

module.exports = function CreateMethodProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546687,"./IsDataDescriptor":1625038546681,"./IsPropertyKey":1625038546661,"./SameValue":1625038546685,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546707, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546708,"./InLeapYear":1625038546712,"./MonthFromTime":1625038546715}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546708, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546709,"./DayFromYear":1625038546710,"./YearFromTime":1625038546711}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546709, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546665,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546710, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546665}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546711, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546712, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546713,"./YearFromTime":1625038546711}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546713, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546714, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546715, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546708,"./InLeapYear":1625038546712}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546716, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var $isNaN = require('../helpers/isNaN');
var padTimeComponent = require('../helpers/padTimeComponent');

var Type = require('./Type');
var WeekDay = require('./WeekDay');
var MonthFromTime = require('./MonthFromTime');
var YearFromTime = require('./YearFromTime');
var DateFromTime = require('./DateFromTime');

// https://262.ecma-international.org/9.0/#sec-datestring

module.exports = function DateString(tv) {
	if (Type(tv) !== 'Number' || $isNaN(tv)) {
		throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays[WeekDay(tv)];
	var month = months[MonthFromTime(tv)];
	var day = padTimeComponent(DateFromTime(tv));
	var year = padTimeComponent(YearFromTime(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/padTimeComponent":1625038546575,"./Type":1625038546653,"./WeekDay":1625038546717,"./MonthFromTime":1625038546715,"./YearFromTime":1625038546711,"./DateFromTime":1625038546707}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546717, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546709,"./modulo":1625038546714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546718, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

module.exports = function DeletePropertyOrThrow(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError('Attempt to delete property failed.');
	}
	return success;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546719, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var objectKeys = require('object-keys');

var callBound = require('call-bind/callBound');

var callBind = require('call-bind');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));

var forEach = require('../helpers/forEach');

var Type = require('./Type');

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

module.exports = function EnumerableOwnProperties(O, kind) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach(keys, function (key) {
			if ($isEnumerable(O, key)) {
				$pushApply(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546720, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var Call = require('./Call');
var CreateDataPropertyOrThrow = require('./CreateDataPropertyOrThrow');
var Get = require('./Get');
var HasProperty = require('./HasProperty');
var IsArray = require('./IsArray');
var ToLength = require('./ToLength');
var ToString = require('./ToString');

// https://262.ecma-international.org/10.0/#sec-flattenintoarray

// eslint-disable-next-line max-params
module.exports = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}

	var targetIndex = start;
	var sourceIndex = 0;
	while (sourceIndex < sourceLen) {
		var P = ToString(sourceIndex);
		var exists = HasProperty(source, P);
		if (exists === true) {
			var element = Get(source, P);
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new $TypeError('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = IsArray(element);
			}
			if (shouldFlatten) {
				var elementLen = ToLength(Get(element, 'length'));
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER) {
					throw new $TypeError('index too large');
				}
				CreateDataPropertyOrThrow(target, ToString(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./Call":1625038546658,"./CreateDataPropertyOrThrow":1625038546700,"./Get":1625038546660,"./HasProperty":1625038546721,"./IsArray":1625038546659,"./ToLength":1625038546704,"./ToString":1625038546691}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546721, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546722, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var hasSymbols = require('has-symbols')();

var $TypeError = GetIntrinsic('%TypeError%');

var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic('%Object.getOwnPropertySymbols%');
var keys = require('object-keys');

var esType = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

module.exports = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN) {
			return keys(O);
		}
		return $gOPN(O);
	}
	throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546723, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Function = GetIntrinsic('%Function%');
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

module.exports = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

}, function(modId) { var map = {"./Get":1625038546660,"./IsConstructor":1625038546694,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546724, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var every = require('../helpers/every');

var $charAt = callBound('String.prototype.charAt');
var $strSlice = callBound('String.prototype.slice');
var $indexOf = callBound('String.prototype.indexOf');
var $parseInt = parseInt;

var isDigit = regexTester(/^[0-9]$/);

var inspect = require('object-inspect');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var ToObject = require('./ToObject');
var ToString = require('./ToString');
var Type = require('./Type');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type(capture) === 'Undefined');
};

// http://262.ecma-international.org/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
module.exports = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type(matched) !== 'String') {
		throw new $TypeError('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type(replacement) !== 'String') {
		throw new $TypeError('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice(replacement, i + '$<'.length, endIndex);
							var capture = Get(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type(capture) !== 'Undefined') {
								result += ToString(capture);
							}
							i += ('<' + groupName + '>').length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/every":1625038546171,"./Get":1625038546660,"./IsArray":1625038546659,"./IsInteger":1625038546664,"./ToObject":1625038546668,"./ToString":1625038546691,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546725, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var has = require('has');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

module.exports = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546726, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546665,"./modulo":1625038546714,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546727, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var OrdinaryHasInstance = require('./OrdinaryHasInstance');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

module.exports = function InstanceofOperator(O, C) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

}, function(modId) { var map = {"./Call":1625038546658,"./GetMethod":1625038546666,"./IsCallable":1625038546670,"./OrdinaryHasInstance":1625038546728,"./ToBoolean":1625038546674,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546728, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

module.exports = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type(P) !== 'Object') {
		throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

}, function(modId) { var map = {"./Get":1625038546660,"./IsCallable":1625038546670,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546729, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

module.exports = function IsConcatSpreadable(O) {
	if (Type(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

}, function(modId) { var map = {"./Get":1625038546660,"./IsArray":1625038546659,"./ToBoolean":1625038546674,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546730, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $PromiseThen = callBound('Promise.prototype.then', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

module.exports = function IsPromise(x) {
	if (Type(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546731, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPrefixOf = require('../helpers/isPrefixOf');

// var callBound = require('call-bind/callBound');

// var $charAt = callBound('String.prototype.charAt');

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-isstringprefix

module.exports = function IsStringPrefix(p, q) {
	if (Type(p) !== 'String') {
		throw new $TypeError('Assertion failed: "p" must be a String');
	}

	if (Type(q) !== 'String') {
		throw new $TypeError('Assertion failed: "q" must be a String');
	}

	return isPrefixOf(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

}, function(modId) { var map = {"../helpers/isPrefixOf":1625038546094,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546732, function(require, module, exports) {


var callBound = require('call-bind/callBound');
var $arrayPush = callBound('Array.prototype.push');

var GetIterator = require('./GetIterator');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');

// https://262.ecma-international.org/8.0/#sec-iterabletolist

module.exports = function IterableToList(items, method) {
	var iterator = GetIterator(items, method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep(iterator);
		if (next) {
			var nextValue = IteratorValue(next);
			$arrayPush(values, nextValue);
		}
	}
	return values;
};

}, function(modId) { var map = {"./GetIterator":1625038546662,"./IteratorStep":1625038546672,"./IteratorValue":1625038546677}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546733, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546734, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546707,"./Day":1625038546709,"./floor":1625038546665,"./modulo":1625038546714,"./MonthFromTime":1625038546715,"./ToInteger":1625038546705,"./YearFromTime":1625038546711}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546735, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546705}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546736, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546665,"./modulo":1625038546714,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546737, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546714,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546738, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-tostring-applied-to-the-number-type

module.exports = function NumberToString(m) {
	if (Type(m) !== 'Number') {
		throw new $TypeError('Assertion failed: "m" must be a String');
	}

	return $String(m);
};


}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546739, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var Type = require('./Type');

var hasProto = !({ __proto__: null } instanceof Object);

// https://ecma-international.org/ecma-262/6.0/#sec-objectcreate

module.exports = function ObjectCreate(proto, internalSlotsList) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var slots = arguments.length < 2 ? [] : internalSlotsList;
	if (slots.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
	}

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546740, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var GetPrototypeFromConstructor = require('./GetPrototypeFromConstructor');
var IsArray = require('./IsArray');
var ObjectCreate = require('./ObjectCreate');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarycreatefromconstructor

module.exports = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return ObjectCreate(proto, slots);
};

}, function(modId) { var map = {"./GetPrototypeFromConstructor":1625038546723,"./IsArray":1625038546659,"./ObjectCreate":1625038546739}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546741, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $getProto = require('../helpers/getProto');

var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

module.exports = function OrdinaryGetPrototypeOf(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!$getProto) {
		throw new $TypeError('This environment does not support fetching prototypes.');
	}
	return $getProto(O);
};

}, function(modId) { var map = {"../helpers/getProto":1625038546357,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546742, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546743, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $setProto = require('../helpers/setProto');

var OrdinaryGetPrototypeOf = require('./OrdinaryGetPrototypeOf');
var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

module.exports = function OrdinarySetPrototypeOf(O, V) {
	if (Type(V) !== 'Object' && Type(V) !== 'Null') {
		throw new $TypeError('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

}, function(modId) { var map = {"../helpers/setProto":1625038546250,"./OrdinaryGetPrototypeOf":1625038546741,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546744, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBind = require('call-bind');

var $resolve = GetIntrinsic('%Promise.resolve%', true);
var $PromiseResolve = $resolve && callBind($resolve);

// https://262.ecma-international.org/9.0/#sec-promise-resolve

module.exports = function PromiseResolve(C, x) {
	if (!$PromiseResolve) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve(C, x);
};


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546745, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $strSplit = callBound('String.prototype.split');

var Type = require('./Type');
var UnicodeEscape = require('./UnicodeEscape');
var UTF16Encoding = require('./UTF16Encoding');

var has = require('has');

// https://262.ecma-international.org/10.0/#sec-quotejsonstring

var escapes = {
	'\u0008': '\\b',
	'\u0009': '\\t',
	'\u000A': '\\n',
	'\u000C': '\\f',
	'\u000D': '\\r',
	'\u0022': '\\"',
	'\u005c': '\\\\'
};

module.exports = function QuoteJSONString(value) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach($strSplit(value), function (C) {
			if (has(escapes, C)) {
				product += escapes[C];
			} else {
				var cCharCode = $charCodeAt(C, 0);
				if (cCharCode < 0x20 || isLeadingSurrogate(C) || isTrailingSurrogate(C)) {
					product += UnicodeEscape(C);
				} else {
					product += UTF16Encoding(cCharCode);
				}
			}
		});
	}
	product += '"';
	return product;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154,"./Type":1625038546653,"./UnicodeEscape":1625038546746,"./UTF16Encoding":1625038546747}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546746, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $numberToString = callBound('Number.prototype.toString');
var $toLowerCase = callBound('String.prototype.toLowerCase');
var $strSlice = callBound('String.prototype.slice');

// https://262.ecma-international.org/9.0/#sec-unicodeescape

module.exports = function UnicodeEscape(C) {
	if (typeof C !== 'string' || C.length !== 1) {
		throw new $TypeError('Assertion failed: `C` must be a single code unit');
	}
	var n = $charCodeAt(C, 0);
	if (n > 0xFFFF) {
		throw new $TypeError('`Assertion failed: numeric value of `C` must be <= 0xFFFF');
	}

	return '\\u' + $strSlice('0000' + $toLowerCase($numberToString(n, 16)), -4);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546747, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

var floor = require('./floor');
var modulo = require('./modulo');

var isCodePoint = require('../helpers/isCodePoint');

// https://262.ecma-international.org/7.0/#sec-utf16encoding

module.exports = function UTF16Encoding(cp) {
	if (!isCodePoint(cp)) {
		throw new $TypeError('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode(cp);
	}
	var cu1 = floor((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode(cu1) + $fromCharCode(cu2);
};

}, function(modId) { var map = {"./floor":1625038546665,"./modulo":1625038546714,"../helpers/isCodePoint":1625038546391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546748, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RegExp = GetIntrinsic('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString = require('./ToString');

// https://262.ecma-international.org/6.0/#sec-regexpcreate

module.exports = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString(P);
	var flags = typeof F === 'undefined' ? '' : ToString(F);
	return new $RegExp(pattern, flags);
};

}, function(modId) { var map = {"./ToString":1625038546691}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546749, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var regexExec = require('call-bind/callBound')('RegExp.prototype.exec');

var Call = require('./Call');
var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

module.exports = function RegExpExec(R, S) {
	if (Type(R) !== 'Object') {
		throw new $TypeError('Assertion failed: `R` must be an Object');
	}
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type(result) === 'Object') {
			return result;
		}
		throw new $TypeError('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

}, function(modId) { var map = {"./Call":1625038546658,"./Get":1625038546660,"./IsCallable":1625038546670,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546750, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');

// https://262.ecma-international.org/7.0/#sec-samevaluenonnumber

module.exports = function SameValueNonNumber(x, y) {
	if (typeof x === 'number' || typeof x !== typeof y) {
		throw new $TypeError('SameValueNonNumber requires two non-number values of the same type.');
	}
	return SameValue(x, y);
};

}, function(modId) { var map = {"./SameValue":1625038546685}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546751, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

module.exports = function SameValueZero(x, y) {
	return (x === y) || ($isNaN(x) && $isNaN(y));
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546752, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546665,"./modulo":1625038546714,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546753, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

module.exports = function Set(O, P, V, Throw) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	if (Type(Throw) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue(O[P], V)) {
			throw new $TypeError('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546661,"./SameValue":1625038546685,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546754, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var HasOwnProperty = require('./HasOwnProperty');
var IsExtensible = require('./IsExtensible');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-setfunctionlength

module.exports = function SetFunctionLength(F, length) {
	if (typeof F !== 'function' || !IsExtensible(F) || HasOwnProperty(F, 'length')) {
		throw new $TypeError('Assertion failed: `F` must be an extensible function and lack an own `length` property');
	}
	if (Type(length) !== 'Number') {
		throw new $TypeError('Assertion failed: `length` must be a Number');
	}
	if (length < 0 || !IsInteger(length)) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0');
	}
	return DefinePropertyOrThrow(F, 'length', {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546695,"./HasOwnProperty":1625038546725,"./IsExtensible":1625038546683,"./IsInteger":1625038546664,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546755, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

var getSymbolDescription = require('../helpers/getSymbolDescription');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsExtensible = require('./IsExtensible');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

module.exports = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || has(F, 'name')) {
		throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

}, function(modId) { var map = {"../helpers/getSymbolDescription":1625038546244,"./DefinePropertyOrThrow":1625038546695,"./IsExtensible":1625038546683,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546756, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $preventExtensions = GetIntrinsic('%Object.preventExtensions%');
var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');

var forEach = require('../helpers/forEach');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

module.exports = function SetIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/forEach":1625038546237,"./DefinePropertyOrThrow":1625038546695,"./IsAccessorDescriptor":1625038546680,"./ToPropertyDescriptor":1625038546684,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546757, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};

}, function(modId) { var map = {"./IsConstructor":1625038546694,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546758, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var $charAt = callBound('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

module.exports = function SplitMatch(S, q, R) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(q)) {
		throw new $TypeError('Assertion failed: `q` must be an integer');
	}
	if (Type(R) !== 'String') {
		throw new $TypeError('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt(S, q + i) !== $charAt(R, i)) {
			return false;
		}
	}

	return q + r;
};

}, function(modId) { var map = {"./IsInteger":1625038546664,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546759, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');
var $StringPrototype = GetIntrinsic('%String.prototype%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var Type = require('./Type');

var setProto = require('../helpers/setProto');

// https://262.ecma-international.org/6.0/#sec-stringcreate

module.exports = function StringCreate(value, prototype) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546695,"./Type":1625038546653,"../helpers/setProto":1625038546250}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546760, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var $charAt = callBound('String.prototype.charAt');
var $stringToString = callBound('String.prototype.toString');

var CanonicalNumericIndexString = require('./CanonicalNumericIndexString');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

var isNegativeZero = require('is-negative-zero');

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

module.exports = function StringGetOwnProperty(S, P) {
	var str;
	if (Type(S) === 'Object') {
		try {
			str = $stringToString(S);
		} catch (e) { /**/ }
	}
	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger(index) || isNegativeZero(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

}, function(modId) { var map = {"./CanonicalNumericIndexString":1625038546696,"./IsInteger":1625038546664,"./IsPropertyKey":1625038546661,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546761, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $SymbolToString = callBound('Symbol.prototype.toString', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

module.exports = function SymbolDescriptiveString(sym) {
	if (Type(sym) !== 'Symbol') {
		throw new $TypeError('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546762, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError = GetIntrinsic('%TypeError%');

var every = require('../helpers/every');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

module.exports = function TestIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/every":1625038546171,"./IsDataDescriptor":1625038546681,"./IsExtensible":1625038546683,"./ToPropertyDescriptor":1625038546684,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546763, function(require, module, exports) {


var $BooleanValueOf = require('call-bind/callBound')('Boolean.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

module.exports = function thisBooleanValue(value) {
	if (Type(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546764, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var Type = require('./Type');

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

module.exports = function thisNumberValue(value) {
	if (Type(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};


}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546765, function(require, module, exports) {


var $StringValueOf = require('call-bind/callBound')('String.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

module.exports = function thisStringValue(value) {
	if (Type(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546766, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-thissymbolvalue

module.exports = function thisSymbolValue(value) {
	if (!$SymbolValueOf) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546767, function(require, module, exports) {


module.exports = require('../2018/thisTimeValue');

}, function(modId) { var map = {"../2018/thisTimeValue":1625038546633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546768, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546656,"./ToNumber":1625038546651}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546769, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546710}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546770, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var padTimeComponent = require('../helpers/padTimeComponent');

var HourFromTime = require('./HourFromTime');
var MinFromTime = require('./MinFromTime');
var SecFromTime = require('./SecFromTime');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-timestring

module.exports = function TimeString(tv) {
	if (Type(tv) !== 'Number' || $isNaN(tv)) {
		throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime(tv);
	var minute = MinFromTime(tv);
	var second = SecFromTime(tv);
	return padTimeComponent(hour) + ':' + padTimeComponent(minute) + ':' + padTimeComponent(second) + '\x20GMT';
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/padTimeComponent":1625038546575,"./HourFromTime":1625038546726,"./MinFromTime":1625038546736,"./SecFromTime":1625038546752,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546771, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546714,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546772, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Date = GetIntrinsic('%Date%');

var $isNaN = require('../helpers/isNaN');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

module.exports = function ToDateString(tv) {
	if (Type(tv) !== 'Number') {
		throw new $TypeError('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"./Type":1625038546653}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546773, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');

var ToInteger = require('./ToInteger');
var ToLength = require('./ToLength');
var SameValueZero = require('./SameValueZero');

// https://262.ecma-international.org/8.0/#sec-toindex

module.exports = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger(value);
	if (integerIndex < 0) {
		throw new $RangeError('index must be >= 0');
	}
	var index = ToLength(integerIndex);
	if (!SameValueZero(integerIndex, index)) {
		throw new $RangeError('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

}, function(modId) { var map = {"./ToInteger":1625038546705,"./ToLength":1625038546704,"./SameValueZero":1625038546751}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546774, function(require, module, exports) {


var ToUint16 = require('./ToUint16');

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

module.exports = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

}, function(modId) { var map = {"./ToUint16":1625038546775}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546775, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546656,"./floor":1625038546665,"./modulo":1625038546714,"./ToNumber":1625038546651,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546776, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546651}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546777, function(require, module, exports) {


var ToUint8 = require('./ToUint8');

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

module.exports = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

}, function(modId) { var map = {"./ToUint8":1625038546778}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546778, function(require, module, exports) {


var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

module.exports = function ToUint8(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x100);
};

}, function(modId) { var map = {"./ToNumber":1625038546651,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122,"./abs":1625038546656,"./floor":1625038546665,"./modulo":1625038546714}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546779, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

var ToPrimitive = require('./ToPrimitive');
var ToString = require('./ToString');

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

module.exports = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

}, function(modId) { var map = {"./ToPrimitive":1625038546652,"./ToString":1625038546691}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546780, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

module.exports = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

}, function(modId) { var map = {"./ToNumber":1625038546651,"./floor":1625038546665,"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546781, function(require, module, exports) {


var trimStart = require('string.prototype.trimstart');
var trimEnd = require('string.prototype.trimend');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');

// https://262.ecma-international.org/10.0/#sec-trimstring

module.exports = function TrimString(string, where) {
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var T;
	if (where === 'start') {
		T = trimStart(S);
	} else if (where === 'end') {
		T = trimEnd(S);
	} else if (where === 'start+end') {
		T = trimStart(trimEnd(S));
	} else {
		throw new $TypeError('Assertion failed: invalid `where` value; must be "start", "end", or "start+end"');
	}
	return T;
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546669,"./ToString":1625038546691}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546782, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

// https://262.ecma-international.org/7.0/#sec-utf16decode

var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

module.exports = function UTF16Decode(lead, trail) {
	if (!isLeadingSurrogate(lead) || !isTrailingSurrogate(trail)) {
		throw new $TypeError('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode(lead) + $fromCharCode(trail);
};

}, function(modId) { var map = {"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546783, function(require, module, exports) {


/* eslint global-require: 0 */
// https://ecma-international.org/ecma-262/11.0/#sec-abstract-operations
var ES2020 = {
	'Abstract Equality Comparison': require('./2020/AbstractEqualityComparison'),
	'Abstract Relational Comparison': require('./2020/AbstractRelationalComparison'),
	'Strict Equality Comparison': require('./2020/StrictEqualityComparison'),
	abs: require('./2020/abs'),
	AddEntriesFromIterable: require('./2020/AddEntriesFromIterable'),
	AdvanceStringIndex: require('./2020/AdvanceStringIndex'),
	ArrayCreate: require('./2020/ArrayCreate'),
	ArraySetLength: require('./2020/ArraySetLength'),
	ArraySpeciesCreate: require('./2020/ArraySpeciesCreate'),
	BigInt: require('./2020/BigInt'),
	BigIntBitwiseOp: require('./2020/BigIntBitwiseOp'),
	BinaryAnd: require('./2020/BinaryAnd'),
	BinaryOr: require('./2020/BinaryOr'),
	BinaryXor: require('./2020/BinaryXor'),
	Call: require('./2020/Call'),
	CanonicalNumericIndexString: require('./2020/CanonicalNumericIndexString'),
	CodePointAt: require('./2020/CodePointAt'),
	CompletePropertyDescriptor: require('./2020/CompletePropertyDescriptor'),
	CopyDataProperties: require('./2020/CopyDataProperties'),
	CreateDataProperty: require('./2020/CreateDataProperty'),
	CreateDataPropertyOrThrow: require('./2020/CreateDataPropertyOrThrow'),
	CreateHTML: require('./2020/CreateHTML'),
	CreateIterResultObject: require('./2020/CreateIterResultObject'),
	CreateListFromArrayLike: require('./2020/CreateListFromArrayLike'),
	CreateMethodProperty: require('./2020/CreateMethodProperty'),
	DateFromTime: require('./2020/DateFromTime'),
	DateString: require('./2020/DateString'),
	Day: require('./2020/Day'),
	DayFromYear: require('./2020/DayFromYear'),
	DaysInYear: require('./2020/DaysInYear'),
	DayWithinYear: require('./2020/DayWithinYear'),
	DefinePropertyOrThrow: require('./2020/DefinePropertyOrThrow'),
	DeletePropertyOrThrow: require('./2020/DeletePropertyOrThrow'),
	EnumerableOwnPropertyNames: require('./2020/EnumerableOwnPropertyNames'),
	FlattenIntoArray: require('./2020/FlattenIntoArray'),
	floor: require('./2020/floor'),
	FromPropertyDescriptor: require('./2020/FromPropertyDescriptor'),
	Get: require('./2020/Get'),
	GetIterator: require('./2020/GetIterator'),
	GetMethod: require('./2020/GetMethod'),
	GetOwnPropertyKeys: require('./2020/GetOwnPropertyKeys'),
	GetPrototypeFromConstructor: require('./2020/GetPrototypeFromConstructor'),
	GetSubstitution: require('./2020/GetSubstitution'),
	GetV: require('./2020/GetV'),
	HasOwnProperty: require('./2020/HasOwnProperty'),
	HasProperty: require('./2020/HasProperty'),
	HourFromTime: require('./2020/HourFromTime'),
	InLeapYear: require('./2020/InLeapYear'),
	InstanceofOperator: require('./2020/InstanceofOperator'),
	Invoke: require('./2020/Invoke'),
	IsAccessorDescriptor: require('./2020/IsAccessorDescriptor'),
	IsArray: require('./2020/IsArray'),
	IsBigIntElementType: require('./2020/IsBigIntElementType'),
	IsCallable: require('./2020/IsCallable'),
	IsConcatSpreadable: require('./2020/IsConcatSpreadable'),
	IsConstructor: require('./2020/IsConstructor'),
	IsDataDescriptor: require('./2020/IsDataDescriptor'),
	IsExtensible: require('./2020/IsExtensible'),
	IsGenericDescriptor: require('./2020/IsGenericDescriptor'),
	IsInteger: require('./2020/IsInteger'),
	IsNonNegativeInteger: require('./2020/IsNonNegativeInteger'),
	IsNoTearConfiguration: require('./2020/IsNoTearConfiguration'),
	IsPromise: require('./2020/IsPromise'),
	IsPropertyKey: require('./2020/IsPropertyKey'),
	IsRegExp: require('./2020/IsRegExp'),
	IsStringPrefix: require('./2020/IsStringPrefix'),
	IsUnclampedIntegerElementType: require('./2020/IsUnclampedIntegerElementType'),
	IsUnsignedElementType: require('./2020/IsUnsignedElementType'),
	IterableToList: require('./2020/IterableToList'),
	IteratorClose: require('./2020/IteratorClose'),
	IteratorComplete: require('./2020/IteratorComplete'),
	IteratorNext: require('./2020/IteratorNext'),
	IteratorStep: require('./2020/IteratorStep'),
	IteratorValue: require('./2020/IteratorValue'),
	LengthOfArrayLike: require('./2020/LengthOfArrayLike'),
	MakeDate: require('./2020/MakeDate'),
	MakeDay: require('./2020/MakeDay'),
	MakeTime: require('./2020/MakeTime'),
	MinFromTime: require('./2020/MinFromTime'),
	modulo: require('./2020/modulo'),
	MonthFromTime: require('./2020/MonthFromTime'),
	msFromTime: require('./2020/msFromTime'),
	Number: require('./2020/Number'),
	NumberBitwiseOp: require('./2020/NumberBitwiseOp'),
	NumberToBigInt: require('./2020/NumberToBigInt'),
	OrdinaryCreateFromConstructor: require('./2020/OrdinaryCreateFromConstructor'),
	OrdinaryDefineOwnProperty: require('./2020/OrdinaryDefineOwnProperty'),
	OrdinaryGetOwnProperty: require('./2020/OrdinaryGetOwnProperty'),
	OrdinaryGetPrototypeOf: require('./2020/OrdinaryGetPrototypeOf'),
	OrdinaryHasInstance: require('./2020/OrdinaryHasInstance'),
	OrdinaryHasProperty: require('./2020/OrdinaryHasProperty'),
	OrdinaryObjectCreate: require('./2020/OrdinaryObjectCreate'),
	OrdinarySetPrototypeOf: require('./2020/OrdinarySetPrototypeOf'),
	PromiseResolve: require('./2020/PromiseResolve'),
	QuoteJSONString: require('./2020/QuoteJSONString'),
	RegExpCreate: require('./2020/RegExpCreate'),
	RegExpExec: require('./2020/RegExpExec'),
	RequireObjectCoercible: require('./2020/RequireObjectCoercible'),
	SameValue: require('./2020/SameValue'),
	SameValueNonNumeric: require('./2020/SameValueNonNumeric'),
	SameValueZero: require('./2020/SameValueZero'),
	SecFromTime: require('./2020/SecFromTime'),
	Set: require('./2020/Set'),
	SetFunctionLength: require('./2020/SetFunctionLength'),
	SetFunctionName: require('./2020/SetFunctionName'),
	SetIntegrityLevel: require('./2020/SetIntegrityLevel'),
	SpeciesConstructor: require('./2020/SpeciesConstructor'),
	SplitMatch: require('./2020/SplitMatch'),
	StringCreate: require('./2020/StringCreate'),
	StringGetOwnProperty: require('./2020/StringGetOwnProperty'),
	StringPad: require('./2020/StringPad'),
	SymbolDescriptiveString: require('./2020/SymbolDescriptiveString'),
	TestIntegrityLevel: require('./2020/TestIntegrityLevel'),
	thisBigIntValue: require('./2020/thisBigIntValue'),
	thisBooleanValue: require('./2020/thisBooleanValue'),
	thisNumberValue: require('./2020/thisNumberValue'),
	thisStringValue: require('./2020/thisStringValue'),
	thisSymbolValue: require('./2020/thisSymbolValue'),
	thisTimeValue: require('./2020/thisTimeValue'),
	TimeClip: require('./2020/TimeClip'),
	TimeFromYear: require('./2020/TimeFromYear'),
	TimeString: require('./2020/TimeString'),
	TimeWithinDay: require('./2020/TimeWithinDay'),
	ToBoolean: require('./2020/ToBoolean'),
	ToDateString: require('./2020/ToDateString'),
	ToIndex: require('./2020/ToIndex'),
	ToInt16: require('./2020/ToInt16'),
	ToInt32: require('./2020/ToInt32'),
	ToInt8: require('./2020/ToInt8'),
	ToInteger: require('./2020/ToInteger'),
	ToLength: require('./2020/ToLength'),
	ToNumber: require('./2020/ToNumber'),
	ToNumeric: require('./2020/ToNumeric'),
	ToObject: require('./2020/ToObject'),
	ToPrimitive: require('./2020/ToPrimitive'),
	ToPropertyDescriptor: require('./2020/ToPropertyDescriptor'),
	ToPropertyKey: require('./2020/ToPropertyKey'),
	ToString: require('./2020/ToString'),
	ToUint16: require('./2020/ToUint16'),
	ToUint32: require('./2020/ToUint32'),
	ToUint8: require('./2020/ToUint8'),
	ToUint8Clamp: require('./2020/ToUint8Clamp'),
	TrimString: require('./2020/TrimString'),
	Type: require('./2020/Type'),
	UnicodeEscape: require('./2020/UnicodeEscape'),
	UTF16DecodeString: require('./2020/UTF16DecodeString'),
	UTF16DecodeSurrogatePair: require('./2020/UTF16DecodeSurrogatePair'),
	UTF16Encoding: require('./2020/UTF16Encoding'),
	ValidateAndApplyPropertyDescriptor: require('./2020/ValidateAndApplyPropertyDescriptor'),
	WeekDay: require('./2020/WeekDay'),
	YearFromTime: require('./2020/YearFromTime')
};

module.exports = ES2020;

}, function(modId) { var map = {"./2020/AbstractEqualityComparison":1625038546784,"./2020/AbstractRelationalComparison":1625038546788,"./2020/StrictEqualityComparison":1625038546789,"./2020/abs":1625038546790,"./2020/AddEntriesFromIterable":1625038546791,"./2020/AdvanceStringIndex":1625038546797,"./2020/ArrayCreate":1625038546814,"./2020/ArraySetLength":1625038546815,"./2020/ArraySpeciesCreate":1625038546829,"./2020/BigInt":1625038546832,"./2020/BigIntBitwiseOp":1625038546835,"./2020/BinaryAnd":1625038546853,"./2020/BinaryOr":1625038546854,"./2020/BinaryXor":1625038546855,"./2020/Call":1625038546792,"./2020/CanonicalNumericIndexString":1625038546856,"./2020/CodePointAt":1625038546798,"./2020/CompletePropertyDescriptor":1625038546857,"./2020/CopyDataProperties":1625038546858,"./2020/CreateDataProperty":1625038546860,"./2020/CreateDataPropertyOrThrow":1625038546859,"./2020/CreateHTML":1625038546861,"./2020/CreateIterResultObject":1625038546862,"./2020/CreateListFromArrayLike":1625038546863,"./2020/CreateMethodProperty":1625038546867,"./2020/DateFromTime":1625038546868,"./2020/DateString":1625038546877,"./2020/Day":1625038546870,"./2020/DayFromYear":1625038546871,"./2020/DaysInYear":1625038546874,"./2020/DayWithinYear":1625038546869,"./2020/DefinePropertyOrThrow":1625038546831,"./2020/DeletePropertyOrThrow":1625038546879,"./2020/EnumerableOwnPropertyNames":1625038546880,"./2020/FlattenIntoArray":1625038546881,"./2020/floor":1625038546801,"./2020/FromPropertyDescriptor":1625038546823,"./2020/Get":1625038546794,"./2020/GetIterator":1625038546796,"./2020/GetMethod":1625038546802,"./2020/GetOwnPropertyKeys":1625038546883,"./2020/GetPrototypeFromConstructor":1625038546884,"./2020/GetSubstitution":1625038546885,"./2020/GetV":1625038546803,"./2020/HasOwnProperty":1625038546886,"./2020/HasProperty":1625038546882,"./2020/HourFromTime":1625038546887,"./2020/InLeapYear":1625038546873,"./2020/InstanceofOperator":1625038546888,"./2020/Invoke":1625038546812,"./2020/IsAccessorDescriptor":1625038546816,"./2020/IsArray":1625038546793,"./2020/IsBigIntElementType":1625038546890,"./2020/IsCallable":1625038546806,"./2020/IsConcatSpreadable":1625038546891,"./2020/IsConstructor":1625038546830,"./2020/IsDataDescriptor":1625038546817,"./2020/IsExtensible":1625038546819,"./2020/IsGenericDescriptor":1625038546824,"./2020/IsInteger":1625038546800,"./2020/IsNonNegativeInteger":1625038546892,"./2020/IsNoTearConfiguration":1625038546893,"./2020/IsPromise":1625038546895,"./2020/IsPropertyKey":1625038546795,"./2020/IsRegExp":1625038546826,"./2020/IsStringPrefix":1625038546896,"./2020/IsUnclampedIntegerElementType":1625038546894,"./2020/IsUnsignedElementType":1625038546897,"./2020/IterableToList":1625038546898,"./2020/IteratorClose":1625038546807,"./2020/IteratorComplete":1625038546809,"./2020/IteratorNext":1625038546811,"./2020/IteratorStep":1625038546808,"./2020/IteratorValue":1625038546813,"./2020/LengthOfArrayLike":1625038546864,"./2020/MakeDate":1625038546899,"./2020/MakeDay":1625038546900,"./2020/MakeTime":1625038546901,"./2020/MinFromTime":1625038546902,"./2020/modulo":1625038546875,"./2020/MonthFromTime":1625038546876,"./2020/msFromTime":1625038546903,"./2020/Number":1625038546904,"./2020/NumberBitwiseOp":1625038546907,"./2020/NumberToBigInt":1625038546926,"./2020/OrdinaryCreateFromConstructor":1625038546927,"./2020/OrdinaryDefineOwnProperty":1625038546818,"./2020/OrdinaryGetOwnProperty":1625038546825,"./2020/OrdinaryGetPrototypeOf":1625038546929,"./2020/OrdinaryHasInstance":1625038546889,"./2020/OrdinaryHasProperty":1625038546930,"./2020/OrdinaryObjectCreate":1625038546928,"./2020/OrdinarySetPrototypeOf":1625038546931,"./2020/PromiseResolve":1625038546932,"./2020/QuoteJSONString":1625038546933,"./2020/RegExpCreate":1625038546938,"./2020/RegExpExec":1625038546939,"./2020/RequireObjectCoercible":1625038546805,"./2020/SameValue":1625038546821,"./2020/SameValueNonNumeric":1625038546940,"./2020/SameValueZero":1625038546941,"./2020/SecFromTime":1625038546942,"./2020/Set":1625038546943,"./2020/SetFunctionLength":1625038546944,"./2020/SetFunctionName":1625038546945,"./2020/SetIntegrityLevel":1625038546946,"./2020/SpeciesConstructor":1625038546947,"./2020/SplitMatch":1625038546948,"./2020/StringCreate":1625038546949,"./2020/StringGetOwnProperty":1625038546950,"./2020/StringPad":1625038546935,"./2020/SymbolDescriptiveString":1625038546951,"./2020/TestIntegrityLevel":1625038546952,"./2020/thisBigIntValue":1625038546953,"./2020/thisBooleanValue":1625038546954,"./2020/thisNumberValue":1625038546955,"./2020/thisStringValue":1625038546956,"./2020/thisSymbolValue":1625038546957,"./2020/thisTimeValue":1625038546958,"./2020/TimeClip":1625038546959,"./2020/TimeFromYear":1625038546960,"./2020/TimeString":1625038546961,"./2020/TimeWithinDay":1625038546962,"./2020/ToBoolean":1625038546810,"./2020/ToDateString":1625038546963,"./2020/ToIndex":1625038546964,"./2020/ToInt16":1625038546965,"./2020/ToInt32":1625038546908,"./2020/ToInt8":1625038546967,"./2020/ToInteger":1625038546866,"./2020/ToLength":1625038546865,"./2020/ToNumber":1625038546785,"./2020/ToNumeric":1625038546969,"./2020/ToObject":1625038546804,"./2020/ToPrimitive":1625038546786,"./2020/ToPropertyDescriptor":1625038546820,"./2020/ToPropertyKey":1625038546970,"./2020/ToString":1625038546827,"./2020/ToUint16":1625038546966,"./2020/ToUint32":1625038546828,"./2020/ToUint8":1625038546968,"./2020/ToUint8Clamp":1625038546971,"./2020/TrimString":1625038546972,"./2020/Type":1625038546787,"./2020/UnicodeEscape":1625038546934,"./2020/UTF16DecodeString":1625038546937,"./2020/UTF16DecodeSurrogatePair":1625038546799,"./2020/UTF16Encoding":1625038546936,"./2020/ValidateAndApplyPropertyDescriptor":1625038546822,"./2020/WeekDay":1625038546878,"./2020/YearFromTime":1625038546872}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546784, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-abstract-equality-comparison

module.exports = function AbstractEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType === yType) {
		return x === y; // ES6+ specified this shortcut anyways.
	}
	if (x == null && y == null) {
		return true;
	}
	if (xType === 'Number' && yType === 'String') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if (xType === 'String' && yType === 'Number') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (xType === 'Boolean') {
		return AbstractEqualityComparison(ToNumber(x), y);
	}
	if (yType === 'Boolean') {
		return AbstractEqualityComparison(x, ToNumber(y));
	}
	if ((xType === 'String' || xType === 'Number' || xType === 'Symbol') && yType === 'Object') {
		return AbstractEqualityComparison(x, ToPrimitive(y));
	}
	if (xType === 'Object' && (yType === 'String' || yType === 'Number' || yType === 'Symbol')) {
		return AbstractEqualityComparison(ToPrimitive(x), y);
	}
	return false;
};

}, function(modId) { var map = {"./ToNumber":1625038546785,"./ToPrimitive":1625038546786,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546785, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Number = GetIntrinsic('%Number%');
var $RegExp = GetIntrinsic('%RegExp%');
var $parseInteger = GetIntrinsic('%parseInt%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var isPrimitive = require('../helpers/isPrimitive');

var $strSlice = callBound('String.prototype.slice');
var isBinary = regexTester(/^0b[01]+$/i);
var isOctal = regexTester(/^0o[0-7]+$/i);
var isInvalidHexLiteral = regexTester(/^[-+]0x[0-9a-f]+$/i);
var nonWS = ['\u0085', '\u200b', '\ufffe'].join('');
var nonWSregex = new $RegExp('[' + nonWS + ']', 'g');
var hasNonWS = regexTester(nonWSregex);

// whitespace from: https://es5.github.io/#x15.5.4.20
// implementation from https://github.com/es-shims/es5-shim/blob/v3.4.0/es5-shim.js#L1304-L1324
var ws = [
	'\x09\x0A\x0B\x0C\x0D\x20\xA0\u1680\u180E\u2000\u2001\u2002\u2003',
	'\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028',
	'\u2029\uFEFF'
].join('');
var trimRegex = new RegExp('(^[' + ws + ']+)|([' + ws + ']+$)', 'g');
var $replace = callBound('String.prototype.replace');
var $trim = function (value) {
	return $replace(value, trimRegex, '');
};

var ToPrimitive = require('./ToPrimitive');

// https://ecma-international.org/ecma-262/6.0/#sec-tonumber

module.exports = function ToNumber(argument) {
	var value = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (typeof value === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a number');
	}
	if (typeof value === 'bigint') {
		throw new $TypeError('Conversion from \'BigInt\' to \'number\' is not allowed.');
	}
	if (typeof value === 'string') {
		if (isBinary(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 2));
		} else if (isOctal(value)) {
			return ToNumber($parseInteger($strSlice(value, 2), 8));
		} else if (hasNonWS(value) || isInvalidHexLiteral(value)) {
			return NaN;
		} else {
			var trimmed = $trim(value);
			if (trimmed !== value) {
				return ToNumber(trimmed);
			}
		}
	}
	return $Number(value);
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546786}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546786, function(require, module, exports) {


var toPrimitive = require('es-to-primitive/es2015');

// https://ecma-international.org/ecma-262/6.0/#sec-toprimitive

module.exports = function ToPrimitive(input) {
	if (arguments.length > 1) {
		return toPrimitive(input, arguments[1]);
	}
	return toPrimitive(input);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546787, function(require, module, exports) {


var ES5Type = require('../5/Type');

// https://262.ecma-international.org/11.0/#sec-ecmascript-data-types-and-values

module.exports = function Type(x) {
	if (typeof x === 'symbol') {
		return 'Symbol';
	}
	if (typeof x === 'bigint') {
		return 'BigInt';
	}
	return ES5Type(x);
};

}, function(modId) { var map = {"../5/Type":1625038546090}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546788, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');
var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var isPrefixOf = require('../helpers/isPrefixOf');

var ToNumber = require('./ToNumber');
var ToPrimitive = require('./ToPrimitive');
var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.8.5

// eslint-disable-next-line max-statements
module.exports = function AbstractRelationalComparison(x, y, LeftFirst) {
	if (Type(LeftFirst) !== 'Boolean') {
		throw new $TypeError('Assertion failed: LeftFirst argument must be a Boolean');
	}
	var px;
	var py;
	if (LeftFirst) {
		px = ToPrimitive(x, $Number);
		py = ToPrimitive(y, $Number);
	} else {
		py = ToPrimitive(y, $Number);
		px = ToPrimitive(x, $Number);
	}
	var bothStrings = Type(px) === 'String' && Type(py) === 'String';
	if (!bothStrings) {
		var nx = ToNumber(px);
		var ny = ToNumber(py);
		if ($isNaN(nx) || $isNaN(ny)) {
			return undefined;
		}
		if ($isFinite(nx) && $isFinite(ny) && nx === ny) {
			return false;
		}
		if (nx === Infinity) {
			return false;
		}
		if (ny === Infinity) {
			return true;
		}
		if (ny === -Infinity) {
			return false;
		}
		if (nx === -Infinity) {
			return true;
		}
		return nx < ny; // by now, these are both nonzero, finite, and not equal
	}
	if (isPrefixOf(py, px)) {
		return false;
	}
	if (isPrefixOf(px, py)) {
		return true;
	}
	return px < py; // both strings, neither a prefix of the other. shortcut for steps c-f
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/isPrefixOf":1625038546094,"./ToNumber":1625038546785,"./ToPrimitive":1625038546786,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546789, function(require, module, exports) {


var Type = require('./Type');

// https://262.ecma-international.org/5.1/#sec-11.9.6

module.exports = function StrictEqualityComparison(x, y) {
	var xType = Type(x);
	var yType = Type(y);
	if (xType !== yType) {
		return false;
	}
	if (xType === 'Undefined' || xType === 'Null') {
		return true;
	}
	return x === y; // shortcut for steps 4-7
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546790, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $abs = GetIntrinsic('%Math.abs%');

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function abs(x) {
	return $abs(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546791, function(require, module, exports) {


var inspect = require('object-inspect');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var Get = require('./Get');
var GetIterator = require('./GetIterator');
var IsCallable = require('./IsCallable');
var IteratorClose = require('./IteratorClose');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');
var Type = require('./Type');

// https://262.ecma-international.org/10.0//#sec-add-entries-from-iterable

module.exports = function AddEntriesFromIterable(target, iterable, adder) {
	if (!IsCallable(adder)) {
		throw new $TypeError('Assertion failed: `adder` is not callable');
	}
	if (iterable == null) {
		throw new $TypeError('Assertion failed: `iterable` is present, and not nullish');
	}
	var iteratorRecord = GetIterator(iterable);
	while (true) { // eslint-disable-line no-constant-condition
		var next = IteratorStep(iteratorRecord);
		if (!next) {
			return target;
		}
		var nextItem = IteratorValue(next);
		if (Type(nextItem) !== 'Object') {
			var error = new $TypeError('iterator next must return an Object, got ' + inspect(nextItem));
			return IteratorClose(
				iteratorRecord,
				function () { throw error; } // eslint-disable-line no-loop-func
			);
		}
		try {
			var k = Get(nextItem, '0');
			var v = Get(nextItem, '1');
			Call(adder, target, [k, v]);
		} catch (e) {
			return IteratorClose(
				iteratorRecord,
				function () { throw e; }
			);
		}
	}
};

}, function(modId) { var map = {"./Call":1625038546792,"./Get":1625038546794,"./GetIterator":1625038546796,"./IsCallable":1625038546806,"./IteratorClose":1625038546807,"./IteratorStep":1625038546808,"./IteratorValue":1625038546813,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546792, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsArray = require('./IsArray');

var $apply = GetIntrinsic('%Reflect.apply%', true) || callBound('%Function.prototype.apply%');

// https://ecma-international.org/ecma-262/6.0/#sec-call

module.exports = function Call(F, V) {
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	return $apply(F, V, argumentsList);
};

}, function(modId) { var map = {"./IsArray":1625038546793}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546793, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');

// eslint-disable-next-line global-require
var toStr = !$Array.isArray && require('call-bind/callBound')('Object.prototype.toString');

// https://ecma-international.org/ecma-262/6.0/#sec-isarray

module.exports = $Array.isArray || function IsArray(argument) {
	return toStr(argument) === '[object Array]';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546794, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var inspect = require('object-inspect');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

/**
 * 7.3.1 Get (O, P) - https://ecma-international.org/ecma-262/6.0/#sec-get-o-p
 * 1. Assert: Type(O) is Object.
 * 2. Assert: IsPropertyKey(P) is true.
 * 3. Return O.[[Get]](P, O).
 */

module.exports = function Get(O, P) {
	// 7.3.1.1
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	// 7.3.1.2
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true, got ' + inspect(P));
	}
	// 7.3.1.3
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546795, function(require, module, exports) {


// https://ecma-international.org/ecma-262/6.0/#sec-ispropertykey

module.exports = function IsPropertyKey(argument) {
	return typeof argument === 'string' || typeof argument === 'symbol';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546796, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $asyncIterator = GetIntrinsic('%Symbol.asyncIterator%', true);

var inspect = require('object-inspect');
var hasSymbols = require('has-symbols')();

var getIteratorMethod = require('../helpers/getIteratorMethod');
var AdvanceStringIndex = require('./AdvanceStringIndex');
var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsArray = require('./IsArray');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-getiterator
module.exports = function GetIterator(obj, hint, method) {
	var actualHint = hint;
	if (arguments.length < 2) {
		actualHint = 'sync';
	}
	if (actualHint !== 'sync' && actualHint !== 'async') {
		throw new $TypeError("Assertion failed: `hint` must be one of 'sync' or 'async', got " + inspect(hint));
	}

	var actualMethod = method;
	if (arguments.length < 3) {
		if (actualHint === 'async') {
			if (hasSymbols && $asyncIterator) {
				actualMethod = GetMethod(obj, $asyncIterator);
			}
			if (actualMethod === undefined) {
				throw new $TypeError("async from sync iterators aren't currently supported");
			}
		} else {
			actualMethod = getIteratorMethod(
				{
					AdvanceStringIndex: AdvanceStringIndex,
					GetMethod: GetMethod,
					IsArray: IsArray,
					Type: Type
				},
				obj
			);
		}
	}
	var iterator = Call(actualMethod, obj);
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('iterator must return an object');
	}

	return iterator;

	// TODO: This should return an IteratorRecord
	/*
	var nextMethod = GetV(iterator, 'next');
	return {
		'[[Iterator]]': iterator,
		'[[NextMethod]]': nextMethod,
		'[[Done]]': false
	};
	*/
};

}, function(modId) { var map = {"../helpers/getIteratorMethod":1625038546207,"./AdvanceStringIndex":1625038546797,"./Call":1625038546792,"./GetMethod":1625038546802,"./IsArray":1625038546793,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546797, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var CodePointAt = require('./CodePointAt');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var $TypeError = GetIntrinsic('%TypeError%');

// https://262.ecma-international.org/6.0/#sec-advancestringindex

module.exports = function AdvanceStringIndex(S, index, unicode) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(index) || index < 0 || index > MAX_SAFE_INTEGER) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0 and <= 2**53');
	}
	if (Type(unicode) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `unicode` must be a Boolean');
	}
	if (!unicode) {
		return index + 1;
	}
	var length = S.length;
	if ((index + 1) >= length) {
		return index + 1;
	}
	var cp = CodePointAt(S, index);
	return index + cp['[[CodeUnitCount]]'];
};

}, function(modId) { var map = {"./CodePointAt":1625038546798,"./IsInteger":1625038546800,"./Type":1625038546787,"../helpers/maxSafeInteger":1625038546152}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546798, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var callBound = require('call-bind/callBound');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var Type = require('./Type');
var UTF16DecodeSurrogatePair = require('./UTF16DecodeSurrogatePair');

var $charAt = callBound('String.prototype.charAt');
var $charCodeAt = callBound('String.prototype.charCodeAt');

// https://262.ecma-international.org/11.0/#sec-codepointat

module.exports = function CodePointAt(string, position) {
	if (Type(string) !== 'String') {
		throw new $TypeError('Assertion failed: `string` must be a String');
	}
	var size = string.length;
	if (position < 0 || position >= size) {
		throw new $TypeError('Assertion failed: `position` must be >= 0, and < the length of `string`');
	}
	var first = $charCodeAt(string, position);
	var cp = $charAt(string, position);
	var firstIsLeading = isLeadingSurrogate(first);
	var firstIsTrailing = isTrailingSurrogate(first);
	if (!firstIsLeading && !firstIsTrailing) {
		return {
			'[[CodePoint]]': cp,
			'[[CodeUnitCount]]': 1,
			'[[IsUnpairedSurrogate]]': false
		};
	}
	if (firstIsTrailing || (position + 1 === size)) {
		return {
			'[[CodePoint]]': cp,
			'[[CodeUnitCount]]': 1,
			'[[IsUnpairedSurrogate]]': true
		};
	}
	var second = $charCodeAt(string, position + 1);
	if (!isTrailingSurrogate(second)) {
		return {
			'[[CodePoint]]': cp,
			'[[CodeUnitCount]]': 1,
			'[[IsUnpairedSurrogate]]': true
		};
	}

	return {
		'[[CodePoint]]': UTF16DecodeSurrogatePair(first, second),
		'[[CodeUnitCount]]': 2,
		'[[IsUnpairedSurrogate]]': false
	};
};

}, function(modId) { var map = {"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154,"./Type":1625038546787,"./UTF16DecodeSurrogatePair":1625038546799}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546799, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

// https://262.ecma-international.org/11.0/#sec-utf16decodesurrogatepair

module.exports = function UTF16DecodeSurrogatePair(lead, trail) {
	if (!isLeadingSurrogate(lead) || !isTrailingSurrogate(trail)) {
		throw new $TypeError('Assertion failed: `lead` must be a leading surrogate char code, and `trail` must be a trailing surrogate char code');
	}
	// var cp = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
	return $fromCharCode(lead) + $fromCharCode(trail);
};

}, function(modId) { var map = {"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546800, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');

// https://ecma-international.org/ecma-262/6.0/#sec-isinteger

module.exports = function IsInteger(argument) {
	if (typeof argument !== 'number' || $isNaN(argument) || !$isFinite(argument)) {
		return false;
	}
	var absValue = abs(argument);
	return floor(absValue) === absValue;
};

}, function(modId) { var map = {"./abs":1625038546790,"./floor":1625038546801,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546801, function(require, module, exports) {


// var modulo = require('./modulo');
var $floor = Math.floor;

// http://262.ecma-international.org/5.1/#sec-5.2

module.exports = function floor(x) {
	// return x - modulo(x, 1);
	return $floor(x);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546802, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var GetV = require('./GetV');
var IsCallable = require('./IsCallable');
var IsPropertyKey = require('./IsPropertyKey');

/**
 * 7.3.9 - https://ecma-international.org/ecma-262/6.0/#sec-getmethod
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let func be GetV(O, P).
 * 3. ReturnIfAbrupt(func).
 * 4. If func is either undefined or null, return undefined.
 * 5. If IsCallable(func) is false, throw a TypeError exception.
 * 6. Return func.
 */

module.exports = function GetMethod(O, P) {
	// 7.3.9.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.9.2
	var func = GetV(O, P);

	// 7.3.9.4
	if (func == null) {
		return void 0;
	}

	// 7.3.9.5
	if (!IsCallable(func)) {
		throw new $TypeError(P + 'is not a function');
	}

	// 7.3.9.6
	return func;
};

}, function(modId) { var map = {"./GetV":1625038546803,"./IsCallable":1625038546806,"./IsPropertyKey":1625038546795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546803, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var ToObject = require('./ToObject');

/**
 * 7.3.2 GetV (V, P)
 * 1. Assert: IsPropertyKey(P) is true.
 * 2. Let O be ToObject(V).
 * 3. ReturnIfAbrupt(O).
 * 4. Return O.[[Get]](P, V).
 */

module.exports = function GetV(V, P) {
	// 7.3.2.1
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// 7.3.2.2-3
	var O = ToObject(V);

	// 7.3.2.4
	return O[P];
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./ToObject":1625038546804}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546804, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var RequireObjectCoercible = require('./RequireObjectCoercible');

// https://ecma-international.org/ecma-262/6.0/#sec-toobject

module.exports = function ToObject(value) {
	RequireObjectCoercible(value);
	return $Object(value);
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546805}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546805, function(require, module, exports) {


module.exports = require('../5/CheckObjectCoercible');

}, function(modId) { var map = {"../5/CheckObjectCoercible":1625038546097}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546806, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.11

module.exports = require('is-callable');

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546807, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorclose

module.exports = function IteratorClose(iterator, completion) {
	if (Type(iterator) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterator) is not Object');
	}
	if (!IsCallable(completion)) {
		throw new $TypeError('Assertion failed: completion is not a thunk for a Completion Record');
	}
	var completionThunk = completion;

	var iteratorReturn = GetMethod(iterator, 'return');

	if (typeof iteratorReturn === 'undefined') {
		return completionThunk();
	}

	var completionRecord;
	try {
		var innerResult = Call(iteratorReturn, iterator, []);
	} catch (e) {
		// if we hit here, then "e" is the innerResult completion that needs re-throwing

		// if the completion is of type "throw", this will throw.
		completionThunk();
		completionThunk = null; // ensure it's not called twice.

		// if not, then return the innerResult completion
		throw e;
	}
	completionRecord = completionThunk(); // if innerResult worked, then throw if the completion does
	completionThunk = null; // ensure it's not called twice.

	if (Type(innerResult) !== 'Object') {
		throw new $TypeError('iterator .return must return an object');
	}

	return completionRecord;
};

}, function(modId) { var map = {"./Call":1625038546792,"./GetMethod":1625038546802,"./IsCallable":1625038546806,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546808, function(require, module, exports) {


var IteratorComplete = require('./IteratorComplete');
var IteratorNext = require('./IteratorNext');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorstep

module.exports = function IteratorStep(iterator) {
	var result = IteratorNext(iterator);
	var done = IteratorComplete(result);
	return done === true ? false : result;
};


}, function(modId) { var map = {"./IteratorComplete":1625038546809,"./IteratorNext":1625038546811}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546809, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorcomplete

module.exports = function IteratorComplete(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return ToBoolean(Get(iterResult, 'done'));
};

}, function(modId) { var map = {"./Get":1625038546794,"./ToBoolean":1625038546810,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546810, function(require, module, exports) {


// http://262.ecma-international.org/5.1/#sec-9.2

module.exports = function ToBoolean(value) { return !!value; };

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546811, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Invoke = require('./Invoke');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratornext

module.exports = function IteratorNext(iterator, value) {
	var result = Invoke(iterator, 'next', arguments.length < 2 ? [] : [value]);
	if (Type(result) !== 'Object') {
		throw new $TypeError('iterator next must return an object');
	}
	return result;
};

}, function(modId) { var map = {"./Invoke":1625038546812,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546812, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Call = require('./Call');
var IsArray = require('./IsArray');
var GetV = require('./GetV');
var IsPropertyKey = require('./IsPropertyKey');

// https://ecma-international.org/ecma-262/6.0/#sec-invoke

module.exports = function Invoke(O, P) {
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	var argumentsList = arguments.length > 2 ? arguments[2] : [];
	if (!IsArray(argumentsList)) {
		throw new $TypeError('Assertion failed: optional `argumentsList`, if provided, must be a List');
	}
	var func = GetV(O, P);
	return Call(func, O, argumentsList);
};

}, function(modId) { var map = {"./Call":1625038546792,"./IsArray":1625038546793,"./GetV":1625038546803,"./IsPropertyKey":1625038546795}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546813, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-iteratorvalue

module.exports = function IteratorValue(iterResult) {
	if (Type(iterResult) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(iterResult) is not Object');
	}
	return Get(iterResult, 'value');
};


}, function(modId) { var map = {"./Get":1625038546794,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546814, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ArrayPrototype = GetIntrinsic('%Array.prototype%');
var $RangeError = GetIntrinsic('%RangeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');

var MAX_ARRAY_LENGTH = Math.pow(2, 32) - 1;

var $setProto = GetIntrinsic('%Object.setPrototypeOf%', true) || (
	// eslint-disable-next-line no-proto, no-negated-condition
	[].__proto__ !== $ArrayPrototype
		? null
		: function (O, proto) {
			O.__proto__ = proto; // eslint-disable-line no-proto, no-param-reassign
			return O;
		}
);

// https://ecma-international.org/ecma-262/6.0/#sec-arraycreate

module.exports = function ArrayCreate(length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: `length` must be an integer Number >= 0');
	}
	if (length > MAX_ARRAY_LENGTH) {
		throw new $RangeError('length is greater than (2**32 - 1)');
	}
	var proto = arguments.length > 1 ? arguments[1] : $ArrayPrototype;
	var A = []; // steps 5 - 7, and 9
	if (proto !== $ArrayPrototype) { // step 8
		if (!$setProto) {
			throw new $SyntaxError('ArrayCreate: a `proto` argument that is not `Array.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
		$setProto(A, proto);
	}
	if (length !== 0) { // bypasses the need for step 2
		A.length = length;
	}
	/* step 10, the above as a shortcut for the below
    OrdinaryDefineOwnProperty(A, 'length', {
        '[[Configurable]]': false,
        '[[Enumerable]]': false,
        '[[Value]]': length,
        '[[Writable]]': true
    });
    */
	return A;
};

}, function(modId) { var map = {"./IsInteger":1625038546800}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546815, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var assign = require('object.assign');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsArray = require('./IsArray');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var OrdinaryDefineOwnProperty = require('./OrdinaryDefineOwnProperty');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arraysetlength

// eslint-disable-next-line max-statements, max-lines-per-function
module.exports = function ArraySetLength(A, Desc) {
	if (!IsArray(A)) {
		throw new $TypeError('Assertion failed: A must be an Array');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!('[[Value]]' in Desc)) {
		return OrdinaryDefineOwnProperty(A, 'length', Desc);
	}
	var newLenDesc = assign({}, Desc);
	var newLen = ToUint32(Desc['[[Value]]']);
	var numberLen = ToNumber(Desc['[[Value]]']);
	if (newLen !== numberLen) {
		throw new $RangeError('Invalid array length');
	}
	newLenDesc['[[Value]]'] = newLen;
	var oldLenDesc = OrdinaryGetOwnProperty(A, 'length');
	if (!IsDataDescriptor(oldLenDesc)) {
		throw new $TypeError('Assertion failed: an array had a non-data descriptor on `length`');
	}
	var oldLen = oldLenDesc['[[Value]]'];
	if (newLen >= oldLen) {
		return OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	}
	if (!oldLenDesc['[[Writable]]']) {
		return false;
	}
	var newWritable;
	if (!('[[Writable]]' in newLenDesc) || newLenDesc['[[Writable]]']) {
		newWritable = true;
	} else {
		newWritable = false;
		newLenDesc['[[Writable]]'] = true;
	}
	var succeeded = OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
	if (!succeeded) {
		return false;
	}
	while (newLen < oldLen) {
		oldLen -= 1;
		// eslint-disable-next-line no-param-reassign
		var deleteSucceeded = delete A[ToString(oldLen)];
		if (!deleteSucceeded) {
			newLenDesc['[[Value]]'] = oldLen + 1;
			if (!newWritable) {
				newLenDesc['[[Writable]]'] = false;
				OrdinaryDefineOwnProperty(A, 'length', newLenDesc);
				return false;
			}
		}
	}
	if (!newWritable) {
		return OrdinaryDefineOwnProperty(A, 'length', { '[[Writable]]': false });
	}
	return true;
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"./IsArray":1625038546793,"./IsAccessorDescriptor":1625038546816,"./IsDataDescriptor":1625038546817,"./OrdinaryDefineOwnProperty":1625038546818,"./OrdinaryGetOwnProperty":1625038546825,"./ToNumber":1625038546785,"./ToString":1625038546827,"./ToUint32":1625038546828,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546816, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isaccessordescriptor

module.exports = function IsAccessorDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Get]]') && !has(Desc, '[[Set]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546817, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isdatadescriptor

module.exports = function IsDataDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!has(Desc, '[[Value]]') && !has(Desc, '[[Writable]]')) {
		return false;
	}

	return true;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546818, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var SameValue = require('./SameValue');
var Type = require('./Type');
var ValidateAndApplyPropertyDescriptor = require('./ValidateAndApplyPropertyDescriptor');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarydefineownproperty

module.exports = function OrdinaryDefineOwnProperty(O, P, Desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (!$gOPD) {
		// ES3/IE 8 fallback
		if (IsAccessorDescriptor(Desc)) {
			throw new $SyntaxError('This environment does not support accessor property descriptors.');
		}
		var creatingNormalDataProperty = !(P in O)
			&& Desc['[[Writable]]']
			&& Desc['[[Enumerable]]']
			&& Desc['[[Configurable]]']
			&& '[[Value]]' in Desc;
		var settingExistingDataProperty = (P in O)
			&& (!('[[Configurable]]' in Desc) || Desc['[[Configurable]]'])
			&& (!('[[Enumerable]]' in Desc) || Desc['[[Enumerable]]'])
			&& (!('[[Writable]]' in Desc) || Desc['[[Writable]]'])
			&& '[[Value]]' in Desc;
		if (creatingNormalDataProperty || settingExistingDataProperty) {
			O[P] = Desc['[[Value]]']; // eslint-disable-line no-param-reassign
			return SameValue(O[P], Desc['[[Value]]']);
		}
		throw new $SyntaxError('This environment does not support defining non-writable, non-enumerable, or non-configurable properties');
	}
	var desc = $gOPD(O, P);
	var current = desc && ToPropertyDescriptor(desc);
	var extensible = IsExtensible(O);
	return ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current);
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/isPropertyDescriptor":1625038546118,"./IsAccessorDescriptor":1625038546816,"./IsDataDescriptor":1625038546817,"./IsExtensible":1625038546819,"./IsPropertyKey":1625038546795,"./ToPropertyDescriptor":1625038546820,"./SameValue":1625038546821,"./Type":1625038546787,"./ValidateAndApplyPropertyDescriptor":1625038546822}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546819, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');

var isPrimitive = require('../helpers/isPrimitive');

var $preventExtensions = $Object.preventExtensions;
var $isExtensible = $Object.isExtensible;

// https://ecma-international.org/ecma-262/6.0/#sec-isextensible-o

module.exports = $preventExtensions
	? function IsExtensible(obj) {
		return !isPrimitive(obj) && $isExtensible(obj);
	}
	: function IsExtensible(obj) {
		return !isPrimitive(obj);
	};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546820, function(require, module, exports) {


var has = require('has');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');
var ToBoolean = require('./ToBoolean');
var IsCallable = require('./IsCallable');

// https://262.ecma-international.org/5.1/#sec-8.10.5

module.exports = function ToPropertyDescriptor(Obj) {
	if (Type(Obj) !== 'Object') {
		throw new $TypeError('ToPropertyDescriptor requires an object');
	}

	var desc = {};
	if (has(Obj, 'enumerable')) {
		desc['[[Enumerable]]'] = ToBoolean(Obj.enumerable);
	}
	if (has(Obj, 'configurable')) {
		desc['[[Configurable]]'] = ToBoolean(Obj.configurable);
	}
	if (has(Obj, 'value')) {
		desc['[[Value]]'] = Obj.value;
	}
	if (has(Obj, 'writable')) {
		desc['[[Writable]]'] = ToBoolean(Obj.writable);
	}
	if (has(Obj, 'get')) {
		var getter = Obj.get;
		if (typeof getter !== 'undefined' && !IsCallable(getter)) {
			throw new $TypeError('getter must be a function');
		}
		desc['[[Get]]'] = getter;
	}
	if (has(Obj, 'set')) {
		var setter = Obj.set;
		if (typeof setter !== 'undefined' && !IsCallable(setter)) {
			throw new $TypeError('setter must be a function');
		}
		desc['[[Set]]'] = setter;
	}

	if ((has(desc, '[[Get]]') || has(desc, '[[Set]]')) && (has(desc, '[[Value]]') || has(desc, '[[Writable]]'))) {
		throw new $TypeError('Invalid property descriptor. Cannot both specify accessors and a value or writable attribute');
	}
	return desc;
};

}, function(modId) { var map = {"./Type":1625038546787,"./ToBoolean":1625038546810,"./IsCallable":1625038546806}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546821, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// http://262.ecma-international.org/5.1/#sec-9.12

module.exports = function SameValue(x, y) {
	if (x === y) { // 0 === -0, but they are not identical.
		if (x === 0) { return 1 / x === 1 / y; }
		return true;
	}
	return $isNaN(x) && $isNaN(y);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546822, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');
var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var isSamePropertyDescriptor = require('../helpers/isSamePropertyDescriptor');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-validateandapplypropertydescriptor
// https://ecma-international.org/ecma-262/8.0/#sec-validateandapplypropertydescriptor

// eslint-disable-next-line max-lines-per-function, max-statements, max-params
module.exports = function ValidateAndApplyPropertyDescriptor(O, P, extensible, Desc, current) {
	// this uses the ES2017+ logic, since it fixes a number of bugs in the ES2015 logic.
	var oType = Type(O);
	if (oType !== 'Undefined' && oType !== 'Object') {
		throw new $TypeError('Assertion failed: O must be undefined or an Object');
	}
	if (Type(extensible) !== 'Boolean') {
		throw new $TypeError('Assertion failed: extensible must be a Boolean');
	}
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc must be a Property Descriptor');
	}
	if (Type(current) !== 'Undefined' && !isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, current)) {
		throw new $TypeError('Assertion failed: current must be a Property Descriptor, or undefined');
	}
	if (oType !== 'Undefined' && !IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: if O is not undefined, P must be a Property Key');
	}
	if (Type(current) === 'Undefined') {
		if (!extensible) {
			return false;
		}
		if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': Desc['[[Configurable]]'],
						'[[Enumerable]]': Desc['[[Enumerable]]'],
						'[[Value]]': Desc['[[Value]]'],
						'[[Writable]]': Desc['[[Writable]]']
					}
				);
			}
		} else {
			if (!IsAccessorDescriptor(Desc)) {
				throw new $TypeError('Assertion failed: Desc is not an accessor descriptor');
			}
			if (oType !== 'Undefined') {
				return DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					Desc
				);
			}
		}
		return true;
	}
	if (IsGenericDescriptor(Desc) && !('[[Configurable]]' in Desc) && !('[[Enumerable]]' in Desc)) {
		return true;
	}
	if (isSamePropertyDescriptor({ SameValue: SameValue }, Desc, current)) {
		return true; // removed by ES2017, but should still be correct
	}
	// "if every field in Desc is absent, return true" can't really match the assertion that it's a Property Descriptor
	if (!current['[[Configurable]]']) {
		if (Desc['[[Configurable]]']) {
			return false;
		}
		if ('[[Enumerable]]' in Desc && !Desc['[[Enumerable]]'] === !!current['[[Enumerable]]']) {
			return false;
		}
	}
	if (IsGenericDescriptor(Desc)) {
		// no further validation is required.
	} else if (IsDataDescriptor(current) !== IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			return false;
		}
		if (IsDataDescriptor(current)) {
			if (oType !== 'Undefined') {
				DefineOwnProperty(
					IsDataDescriptor,
					SameValue,
					FromPropertyDescriptor,
					O,
					P,
					{
						'[[Configurable]]': current['[[Configurable]]'],
						'[[Enumerable]]': current['[[Enumerable]]'],
						'[[Get]]': undefined
					}
				);
			}
		} else if (oType !== 'Undefined') {
			DefineOwnProperty(
				IsDataDescriptor,
				SameValue,
				FromPropertyDescriptor,
				O,
				P,
				{
					'[[Configurable]]': current['[[Configurable]]'],
					'[[Enumerable]]': current['[[Enumerable]]'],
					'[[Value]]': undefined
				}
			);
		}
	} else if (IsDataDescriptor(current) && IsDataDescriptor(Desc)) {
		if (!current['[[Configurable]]'] && !current['[[Writable]]']) {
			if ('[[Writable]]' in Desc && Desc['[[Writable]]']) {
				return false;
			}
			if ('[[Value]]' in Desc && !SameValue(Desc['[[Value]]'], current['[[Value]]'])) {
				return false;
			}
			return true;
		}
	} else if (IsAccessorDescriptor(current) && IsAccessorDescriptor(Desc)) {
		if (!current['[[Configurable]]']) {
			if ('[[Set]]' in Desc && !SameValue(Desc['[[Set]]'], current['[[Set]]'])) {
				return false;
			}
			if ('[[Get]]' in Desc && !SameValue(Desc['[[Get]]'], current['[[Get]]'])) {
				return false;
			}
			return true;
		}
	} else {
		throw new $TypeError('Assertion failed: current and Desc are not both data, both accessors, or one accessor and one data.');
	}
	if (oType !== 'Undefined') {
		return DefineOwnProperty(
			IsDataDescriptor,
			SameValue,
			FromPropertyDescriptor,
			O,
			P,
			Desc
		);
	}
	return true;
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"../helpers/isPropertyDescriptor":1625038546118,"../helpers/isSamePropertyDescriptor":1625038546170,"./FromPropertyDescriptor":1625038546823,"./IsAccessorDescriptor":1625038546816,"./IsDataDescriptor":1625038546817,"./IsGenericDescriptor":1625038546824,"./IsPropertyKey":1625038546795,"./SameValue":1625038546821,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546823, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-frompropertydescriptor

module.exports = function FromPropertyDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return Desc;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	var obj = {};
	if ('[[Value]]' in Desc) {
		obj.value = Desc['[[Value]]'];
	}
	if ('[[Writable]]' in Desc) {
		obj.writable = Desc['[[Writable]]'];
	}
	if ('[[Get]]' in Desc) {
		obj.get = Desc['[[Get]]'];
	}
	if ('[[Set]]' in Desc) {
		obj.set = Desc['[[Set]]'];
	}
	if ('[[Enumerable]]' in Desc) {
		obj.enumerable = Desc['[[Enumerable]]'];
	}
	if ('[[Configurable]]' in Desc) {
		obj.configurable = Desc['[[Configurable]]'];
	}
	return obj;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546824, function(require, module, exports) {


var assertRecord = require('../helpers/assertRecord');

var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isgenericdescriptor

module.exports = function IsGenericDescriptor(Desc) {
	if (typeof Desc === 'undefined') {
		return false;
	}

	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (!IsAccessorDescriptor(Desc) && !IsDataDescriptor(Desc)) {
		return true;
	}

	return false;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsAccessorDescriptor":1625038546816,"./IsDataDescriptor":1625038546817,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546825, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var has = require('has');

var IsArray = require('./IsArray');
var IsPropertyKey = require('./IsPropertyKey');
var IsRegExp = require('./IsRegExp');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinarygetownproperty

module.exports = function OrdinaryGetOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	if (!has(O, P)) {
		return void 0;
	}
	if (!$gOPD) {
		// ES3 / IE 8 fallback
		var arrayLength = IsArray(O) && P === 'length';
		var regexLastIndex = IsRegExp(O) && P === 'lastIndex';
		return {
			'[[Configurable]]': !(arrayLength || regexLastIndex),
			'[[Enumerable]]': $isEnumerable(O, P),
			'[[Value]]': O[P],
			'[[Writable]]': true
		};
	}
	return ToPropertyDescriptor($gOPD(O, P));
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"./IsArray":1625038546793,"./IsPropertyKey":1625038546795,"./IsRegExp":1625038546826,"./ToPropertyDescriptor":1625038546820,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546826, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $match = GetIntrinsic('%Symbol.match%', true);

var hasRegExpMatcher = require('is-regex');

var ToBoolean = require('./ToBoolean');

// https://ecma-international.org/ecma-262/6.0/#sec-isregexp

module.exports = function IsRegExp(argument) {
	if (!argument || typeof argument !== 'object') {
		return false;
	}
	if ($match) {
		var isRegExp = argument[$match];
		if (typeof isRegExp !== 'undefined') {
			return ToBoolean(isRegExp);
		}
	}
	return hasRegExpMatcher(argument);
};

}, function(modId) { var map = {"./ToBoolean":1625038546810}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546827, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

// https://ecma-international.org/ecma-262/6.0/#sec-tostring

module.exports = function ToString(argument) {
	if (typeof argument === 'symbol') {
		throw new $TypeError('Cannot convert a Symbol value to a string');
	}
	return $String(argument);
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546828, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.6

module.exports = function ToUint32(x) {
	return ToNumber(x) >>> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546829, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Array = GetIntrinsic('%Array%');
var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsConstructor = require('./IsConstructor');
var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-arrayspeciescreate

module.exports = function ArraySpeciesCreate(originalArray, length) {
	if (!IsInteger(length) || length < 0) {
		throw new $TypeError('Assertion failed: length must be an integer >= 0');
	}
	var len = length === 0 ? 0 : length;
	var C;
	var isArray = IsArray(originalArray);
	if (isArray) {
		C = Get(originalArray, 'constructor');
		// TODO: figure out how to make a cross-realm normal Array, a same-realm Array
		// if (IsConstructor(C)) {
		// 	if C is another realm's Array, C = undefined
		// 	Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Array))) === null ?
		// }
		if ($species && Type(C) === 'Object') {
			C = Get(C, $species);
			if (C === null) {
				C = void 0;
			}
		}
	}
	if (typeof C === 'undefined') {
		return $Array(len);
	}
	if (!IsConstructor(C)) {
		throw new $TypeError('C must be a constructor');
	}
	return new C(len); // Construct(C, len);
};


}, function(modId) { var map = {"./Get":1625038546794,"./IsArray":1625038546793,"./IsConstructor":1625038546830,"./IsInteger":1625038546800,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546830, function(require, module, exports) {


var GetIntrinsic = require('../GetIntrinsic.js');

var $construct = GetIntrinsic('%Reflect.construct%', true);

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
try {
	DefinePropertyOrThrow({}, '', { '[[Get]]': function () {} });
} catch (e) {
	// Accessor properties aren't supported
	DefinePropertyOrThrow = null;
}

// https://ecma-international.org/ecma-262/6.0/#sec-isconstructor

if (DefinePropertyOrThrow && $construct) {
	var isConstructorMarker = {};
	var badArrayLike = {};
	DefinePropertyOrThrow(badArrayLike, 'length', {
		'[[Get]]': function () {
			throw isConstructorMarker;
		},
		'[[Enumerable]]': true
	});

	module.exports = function IsConstructor(argument) {
		try {
			// `Reflect.construct` invokes `IsConstructor(target)` before `Get(args, 'length')`:
			$construct(argument, badArrayLike);
		} catch (err) {
			return err === isConstructorMarker;
		}
	};
} else {
	module.exports = function IsConstructor(argument) {
		// unfortunately there's no way to truly check this without try/catch `new argument` in old environments
		return typeof argument === 'function' && !!argument.prototype;
	};
}

}, function(modId) { var map = {"../GetIntrinsic.js":1625038546181,"./DefinePropertyOrThrow":1625038546831}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546831, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPropertyDescriptor = require('../helpers/isPropertyDescriptor');
var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-definepropertyorthrow

module.exports = function DefinePropertyOrThrow(O, P, desc) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var Desc = isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, desc) ? desc : ToPropertyDescriptor(desc);
	if (!isPropertyDescriptor({
		Type: Type,
		IsDataDescriptor: IsDataDescriptor,
		IsAccessorDescriptor: IsAccessorDescriptor
	}, Desc)) {
		throw new $TypeError('Assertion failed: Desc is not a valid Property Descriptor');
	}

	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		Desc
	);
};

}, function(modId) { var map = {"../helpers/isPropertyDescriptor":1625038546118,"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546823,"./IsAccessorDescriptor":1625038546816,"./IsDataDescriptor":1625038546817,"./IsPropertyKey":1625038546795,"./SameValue":1625038546821,"./ToPropertyDescriptor":1625038546820,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546832, function(require, module, exports) {


var add = require('./add');
var bitwiseAND = require('./bitwiseAND');
var bitwiseNOT = require('./bitwiseNOT');
var bitwiseOR = require('./bitwiseOR');
var bitwiseXOR = require('./bitwiseXOR');
var divide = require('./divide');
var equal = require('./equal');
var exponentiate = require('./exponentiate');
var leftShift = require('./leftShift');
var lessThan = require('./lessThan');
var multiply = require('./multiply');
var remainder = require('./remainder');
var sameValue = require('./sameValue');
var sameValueZero = require('./sameValueZero');
var signedRightShift = require('./signedRightShift');
var subtract = require('./subtract');
var toString = require('./toString');
var unaryMinus = require('./unaryMinus');
var unsignedRightShift = require('./unsignedRightShift');

module.exports = {
	add: add,
	bitwiseAND: bitwiseAND,
	bitwiseNOT: bitwiseNOT,
	bitwiseOR: bitwiseOR,
	bitwiseXOR: bitwiseXOR,
	divide: divide,
	equal: equal,
	exponentiate: exponentiate,
	leftShift: leftShift,
	lessThan: lessThan,
	multiply: multiply,
	remainder: remainder,
	sameValue: sameValue,
	sameValueZero: sameValueZero,
	signedRightShift: signedRightShift,
	subtract: subtract,
	toString: toString,
	unaryMinus: unaryMinus,
	unsignedRightShift: unsignedRightShift
};

}, function(modId) { var map = {"./add":1625038546833,"./bitwiseAND":1625038546834,"./bitwiseNOT":1625038546836,"./bitwiseOR":1625038546837,"./bitwiseXOR":1625038546838,"./divide":1625038546839,"./equal":1625038546840,"./exponentiate":1625038546841,"./leftShift":1625038546842,"./lessThan":1625038546843,"./multiply":1625038546844,"./remainder":1625038546845,"./sameValue":1625038546846,"./sameValueZero":1625038546847,"./signedRightShift":1625038546848,"./subtract":1625038546849,"./toString":1625038546850,"./unaryMinus":1625038546851,"./unsignedRightShift":1625038546852}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546833, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-add

module.exports = function BigIntAdd(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x + y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546834, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var BigIntBitwiseOp = require('../BigIntBitwiseOp');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseAND

module.exports = function BigIntBitwiseAND(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	return BigIntBitwiseOp('&', x, y);
};

}, function(modId) { var map = {"../BigIntBitwiseOp":1625038546835,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546835, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
// var $BigInt = GetIntrinsic('%BigInt%', true);
// var $pow = GetIntrinsic('%Math.pow%');

// var BinaryAnd = require('./BinaryAnd');
// var BinaryOr = require('./BinaryOr');
// var BinaryXor = require('./BinaryXor');
var Type = require('./Type');
// var modulo = require('./modulo');

// var zero = $BigInt && $BigInt(0);
// var negOne = $BigInt && $BigInt(-1);
// var two = $BigInt && $BigInt(2);

// https://262.ecma-international.org/11.0/#sec-bigintbitwiseop

module.exports = function BigIntBitwiseOp(op, x, y) {
	if (op !== '&' && op !== '|' && op !== '^') {
		throw new $TypeError('Assertion failed: `op` must be `&`, `|`, or `^`');
	}
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('`x` and `y` must be BigInts');
	}

	if (op === '&') {
		return x & y;
	}
	if (op === '|') {
		return x | y;
	}
	return x ^ y;
	/*
	var result = zero;
	var shift = 0;
	while (x !== zero && x !== negOne && y !== zero && y !== negOne) {
		var xDigit = modulo(x, two);
		var yDigit = modulo(y, two);
		if (op === '&') {
			result += $pow(2, shift) * BinaryAnd(xDigit, yDigit);
		} else if (op === '|') {
			result += $pow(2, shift) * BinaryOr(xDigit, yDigit);
		} else if (op === '^') {
			result += $pow(2, shift) * BinaryXor(xDigit, yDigit);
		}
		shift += 1;
		x = (x - xDigit) / two;
		y = (y - yDigit) / two;
	}
	var tmp;
	if (op === '&') {
		tmp = BinaryAnd(modulo(x, two), modulo(y, two));
	} else if (op === '|') {
		tmp = BinaryAnd(modulo(x, two), modulo(y, two));
	} else {
		tmp = BinaryXor(modulo(x, two), modulo(y, two));
	}
	if (tmp !== 0) {
		result -= $pow(2, shift);
	}
    return result;
    */
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546836, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $BigInt = GetIntrinsic('%BigInt%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseNOT

module.exports = function BigIntBitwiseNOT(x) {
	if (Type(x) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` argument must be a BigInt');
	}
	return -x - $BigInt(1);
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546837, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var BigIntBitwiseOp = require('../BigIntBitwiseOp');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseOR

module.exports = function BigIntBitwiseOR(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	return BigIntBitwiseOp('|', x, y);
};

}, function(modId) { var map = {"../BigIntBitwiseOp":1625038546835,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546838, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var BigIntBitwiseOp = require('../BigIntBitwiseOp');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-bitwiseXOR

module.exports = function BigIntBitwiseXOR(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	return BigIntBitwiseOp('^', x, y);
};

}, function(modId) { var map = {"../BigIntBitwiseOp":1625038546835,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546839, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $BigInt = GetIntrinsic('%BigInt%', true);
var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-divide

module.exports = function BigIntDivide(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	if (y === $BigInt(0)) {
		throw new $RangeError('Division by zero');
	}
	// shortcut for the actual spec mechanics
	return x / y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546840, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-equal

module.exports = function BigIntEqual(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}
	// shortcut for the actual spec mechanics
	return x === y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546841, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $BigInt = GetIntrinsic('%BigInt%', true);
var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-exponentiate

module.exports = function BigIntExponentiate(base, exponent) {
	if (Type(base) !== 'BigInt' || Type(exponent) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `base` and `exponent` arguments must be BigInts');
	}
	if (exponent < $BigInt(0)) {
		throw new $RangeError('Exponent must be positive');
	}
	if (/* base === $BigInt(0) && */ exponent === $BigInt(0)) {
		return $BigInt(1);
	}

	var square = base;
	var remaining = exponent;
	while (remaining > $BigInt(0)) {
		square += exponent;
		--remaining; // eslint-disable-line no-plusplus
	}
	return square;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546842, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-leftShift

module.exports = function BigIntLeftShift(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x << y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546843, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-lessThan

module.exports = function BigIntLessThan(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x < y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546844, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-multiply

module.exports = function BigIntMultiply(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x * y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546845, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $BigInt = GetIntrinsic('%BigInt%', true);
var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

var zero = $BigInt && $BigInt(0);

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-remainder

module.exports = function BigIntRemainder(n, d) {
	if (Type(n) !== 'BigInt' || Type(d) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `n` and `d` arguments must be BigInts');
	}

	if (d === zero) {
		throw new $RangeError('Division by zero');
	}

	if (n === zero) {
		return zero;
	}

	// shortcut for the actual spec mechanics
	return n % d;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546846, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');
var BigIntEqual = require('./equal');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-sameValue

module.exports = function BigIntSameValue(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	return BigIntEqual(x, y);
};

}, function(modId) { var map = {"../Type":1625038546787,"./equal":1625038546840}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546847, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');
var BigIntEqual = require('./equal');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-sameValueZero

module.exports = function BigIntSameValueZero(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	return BigIntEqual(x, y);
};

}, function(modId) { var map = {"../Type":1625038546787,"./equal":1625038546840}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546848, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');
var BigIntLeftShift = require('./leftShift');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-signedRightShift

module.exports = function BigIntSignedRightShift(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	return BigIntLeftShift(x, -y);
};

}, function(modId) { var map = {"../Type":1625038546787,"./leftShift":1625038546842}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546849, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-subtract

module.exports = function BigIntSubtract(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	// shortcut for the actual spec mechanics
	return x - y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546850, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-tostring

module.exports = function BigIntToString(x) {
	if (Type(x) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` must be a BigInt');
	}

	return $String(x);
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546851, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $BigInt = GetIntrinsic('%BigInt%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

var zero = $BigInt && $BigInt(0);

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-unaryMinus

module.exports = function BigIntUnaryMinus(x) {
	if (Type(x) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` argument must be a BigInt');
	}

	if (x === zero) {
		return zero;
	}

	return -x;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546852, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-bigint-unsignedRightShift

module.exports = function BigIntUnsignedRightShift(x, y) {
	if (Type(x) !== 'BigInt' || Type(y) !== 'BigInt') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be BigInts');
	}

	throw new $TypeError('BigInts have no unsigned right shift, use >> instead');
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546853, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// https://262.ecma-international.org/11.0/#sec-binaryand

module.exports = function BinaryAnd(x, y) {
	if ((x !== 0 && x !== 1) || (y !== 0 && y !== 1)) {
		throw new $TypeError('Assertion failed: `x` and `y` must be either 0 or 1');
	}
	return x & y;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546854, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// https://262.ecma-international.org/11.0/#sec-binaryor

module.exports = function BinaryOr(x, y) {
	if ((x !== 0 && x !== 1) || (y !== 0 && y !== 1)) {
		throw new $TypeError('Assertion failed: `x` and `y` must be either 0 or 1');
	}
	return x | y;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546855, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

// https://262.ecma-international.org/11.0/#sec-binaryxor

module.exports = function BinaryXor(x, y) {
	if ((x !== 0 && x !== 1) || (y !== 0 && y !== 1)) {
		throw new $TypeError('Assertion failed: `x` and `y` must be either 0 or 1');
	}
	return x ^ y;
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546856, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-canonicalnumericindexstring

module.exports = function CanonicalNumericIndexString(argument) {
	if (Type(argument) !== 'String') {
		throw new $TypeError('Assertion failed: `argument` must be a String');
	}
	if (argument === '-0') { return -0; }
	var n = ToNumber(argument);
	if (SameValue(ToString(n), argument)) { return n; }
	return void 0;
};

}, function(modId) { var map = {"./SameValue":1625038546821,"./ToNumber":1625038546785,"./ToString":1625038546827,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546857, function(require, module, exports) {


var has = require('has');

var assertRecord = require('../helpers/assertRecord');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsGenericDescriptor = require('./IsGenericDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-completepropertydescriptor

module.exports = function CompletePropertyDescriptor(Desc) {
	/* eslint no-param-reassign: 0 */
	assertRecord(Type, 'Property Descriptor', 'Desc', Desc);

	if (IsGenericDescriptor(Desc) || IsDataDescriptor(Desc)) {
		if (!has(Desc, '[[Value]]')) {
			Desc['[[Value]]'] = void 0;
		}
		if (!has(Desc, '[[Writable]]')) {
			Desc['[[Writable]]'] = false;
		}
	} else {
		if (!has(Desc, '[[Get]]')) {
			Desc['[[Get]]'] = void 0;
		}
		if (!has(Desc, '[[Set]]')) {
			Desc['[[Set]]'] = void 0;
		}
	}
	if (!has(Desc, '[[Enumerable]]')) {
		Desc['[[Enumerable]]'] = false;
	}
	if (!has(Desc, '[[Configurable]]')) {
		Desc['[[Configurable]]'] = false;
	}
	return Desc;
};

}, function(modId) { var map = {"../helpers/assertRecord":1625038546112,"./IsDataDescriptor":1625038546817,"./IsGenericDescriptor":1625038546824,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546858, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');
var every = require('../helpers/every');
var OwnPropertyKeys = require('../helpers/OwnPropertyKeys');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');

var CreateDataPropertyOrThrow = require('./CreateDataPropertyOrThrow');
var Get = require('./Get');
var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var ToNumber = require('./ToNumber');
var ToObject = require('./ToObject');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-copydataproperties

module.exports = function CopyDataProperties(target, source, excludedItems) {
	if (Type(target) !== 'Object') {
		throw new $TypeError('Assertion failed: "target" must be an Object');
	}

	if (!IsArray(excludedItems) || !every(excludedItems, IsPropertyKey)) {
		throw new $TypeError('Assertion failed: "excludedItems" must be a List of Property Keys');
	}

	if (typeof source === 'undefined' || source === null) {
		return target;
	}

	var from = ToObject(source);

	var sourceKeys = OwnPropertyKeys(from);
	forEach(sourceKeys, function (nextKey) {
		var excluded = false;

		forEach(excludedItems, function (e) {
			if (SameValue(e, nextKey) === true) {
				excluded = true;
			}
		});

		var enumerable = $isEnumerable(from, nextKey) || (
		// this is to handle string keys being non-enumerable in older engines
			typeof source === 'string'
            && nextKey >= 0
            && IsInteger(ToNumber(nextKey))
		);
		if (excluded === false && enumerable) {
			var propValue = Get(from, nextKey);
			CreateDataPropertyOrThrow(target, nextKey, propValue);
		}
	});

	return target;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"../helpers/every":1625038546171,"../helpers/OwnPropertyKeys":1625038546554,"./CreateDataPropertyOrThrow":1625038546859,"./Get":1625038546794,"./IsArray":1625038546793,"./IsInteger":1625038546800,"./IsPropertyKey":1625038546795,"./SameValue":1625038546821,"./ToNumber":1625038546785,"./ToObject":1625038546804,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546859, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var CreateDataProperty = require('./CreateDataProperty');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// // https://ecma-international.org/ecma-262/6.0/#sec-createdatapropertyorthrow

module.exports = function CreateDataPropertyOrThrow(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var success = CreateDataProperty(O, P, V);
	if (!success) {
		throw new $TypeError('unable to create data property');
	}
	return success;
};

}, function(modId) { var map = {"./CreateDataProperty":1625038546860,"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546860, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var OrdinaryGetOwnProperty = require('./OrdinaryGetOwnProperty');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createdataproperty

module.exports = function CreateDataProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	var oldDesc = OrdinaryGetOwnProperty(O, P);
	var extensible = !oldDesc || IsExtensible(O);
	var immutable = oldDesc && (!oldDesc['[[Writable]]'] || !oldDesc['[[Configurable]]']);
	if (immutable || !extensible) {
		return false;
	}
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		{
			'[[Configurable]]': true,
			'[[Enumerable]]': true,
			'[[Value]]': V,
			'[[Writable]]': true
		}
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546823,"./OrdinaryGetOwnProperty":1625038546825,"./IsDataDescriptor":1625038546817,"./IsExtensible":1625038546819,"./IsPropertyKey":1625038546795,"./SameValue":1625038546821,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546861, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $replace = callBound('String.prototype.replace');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createhtml

module.exports = function CreateHTML(string, tag, attribute, value) {
	if (Type(tag) !== 'String' || Type(attribute) !== 'String') {
		throw new $TypeError('Assertion failed: `tag` and `attribute` must be strings');
	}
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var p1 = '<' + tag;
	if (attribute !== '') {
		var V = ToString(value);
		var escapedV = $replace(V, /\x22/g, '&quot;');
		p1 += '\x20' + attribute + '\x3D\x22' + escapedV + '\x22';
	}
	return p1 + '>' + S + '</' + tag + '>';
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546805,"./ToString":1625038546827,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546862, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createiterresultobject

module.exports = function CreateIterResultObject(value, done) {
	if (Type(done) !== 'Boolean') {
		throw new $TypeError('Assertion failed: Type(done) is not Boolean');
	}
	return {
		value: value,
		done: done
	};
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546863, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $indexOf = callBound('Array.prototype.indexOf', true) || callBound('String.prototype.indexOf');
var $push = callBound('Array.prototype.push');

var Get = require('./Get');
var IsArray = require('./IsArray');
var LengthOfArrayLike = require('./LengthOfArrayLike');
var ToString = require('./ToString');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-createlistfromarraylike

module.exports = function CreateListFromArrayLike(obj) {
	var elementTypes = arguments.length > 1
		? arguments[1]
		: ['Undefined', 'Null', 'Boolean', 'String', 'Symbol', 'Number', 'Object'];

	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	if (!IsArray(elementTypes)) {
		throw new $TypeError('Assertion failed: `elementTypes`, if provided, must be an array');
	}
	var len = LengthOfArrayLike(obj);
	var list = [];
	var index = 0;
	while (index < len) {
		var indexName = ToString(index);
		var next = Get(obj, indexName);
		var nextType = Type(next);
		if ($indexOf(elementTypes, nextType) < 0) {
			throw new $TypeError('item type ' + nextType + ' is not a valid elementType');
		}
		$push(list, next);
		index += 1;
	}
	return list;
};

}, function(modId) { var map = {"./Get":1625038546794,"./IsArray":1625038546793,"./LengthOfArrayLike":1625038546864,"./ToString":1625038546827,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546864, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var ToLength = require('./ToLength');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-lengthofarraylike

module.exports = function LengthOfArrayLike(obj) {
	if (Type(obj) !== 'Object') {
		throw new $TypeError('Assertion failed: `obj` must be an Object');
	}
	return ToLength(Get(obj, 'length'));
};

// TODO: use this all over

}, function(modId) { var map = {"./Get":1625038546794,"./ToLength":1625038546865,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546865, function(require, module, exports) {


var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var ToInteger = require('./ToInteger');

module.exports = function ToLength(argument) {
	var len = ToInteger(argument);
	if (len <= 0) { return 0; } // includes converting -0 to +0
	if (len > MAX_SAFE_INTEGER) { return MAX_SAFE_INTEGER; }
	return len;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./ToInteger":1625038546866}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546866, function(require, module, exports) {


var ES5ToInteger = require('../5/ToInteger');

var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/11.0/#sec-tointeger

module.exports = function ToInteger(value) {
	var number = ToNumber(value);
	if (number !== 0) {
		number = ES5ToInteger(number);
	}
	return number === 0 ? 0 : number;
};

}, function(modId) { var map = {"../5/ToInteger":1625038546121,"./ToNumber":1625038546785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546867, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefineOwnProperty = require('../helpers/DefineOwnProperty');

var FromPropertyDescriptor = require('./FromPropertyDescriptor');
var IsDataDescriptor = require('./IsDataDescriptor');
var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-createmethodproperty

module.exports = function CreateMethodProperty(O, P, V) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	var newDesc = {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': V,
		'[[Writable]]': true
	};
	return DefineOwnProperty(
		IsDataDescriptor,
		SameValue,
		FromPropertyDescriptor,
		O,
		P,
		newDesc
	);
};

}, function(modId) { var map = {"../helpers/DefineOwnProperty":1625038546169,"./FromPropertyDescriptor":1625038546823,"./IsDataDescriptor":1625038546817,"./IsPropertyKey":1625038546795,"./SameValue":1625038546821,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546868, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');
var MonthFromTime = require('./MonthFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.5

module.exports = function DateFromTime(t) {
	var m = MonthFromTime(t);
	var d = DayWithinYear(t);
	if (m === 0) {
		return d + 1;
	}
	if (m === 1) {
		return d - 30;
	}
	var leap = InLeapYear(t);
	if (m === 2) {
		return d - 58 - leap;
	}
	if (m === 3) {
		return d - 89 - leap;
	}
	if (m === 4) {
		return d - 119 - leap;
	}
	if (m === 5) {
		return d - 150 - leap;
	}
	if (m === 6) {
		return d - 180 - leap;
	}
	if (m === 7) {
		return d - 211 - leap;
	}
	if (m === 8) {
		return d - 242 - leap;
	}
	if (m === 9) {
		return d - 272 - leap;
	}
	if (m === 10) {
		return d - 303 - leap;
	}
	if (m === 11) {
		return d - 333 - leap;
	}
	throw new $EvalError('Assertion failed: MonthFromTime returned an impossible value: ' + m);
};

}, function(modId) { var map = {"./DayWithinYear":1625038546869,"./InLeapYear":1625038546873,"./MonthFromTime":1625038546876}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546869, function(require, module, exports) {


var Day = require('./Day');
var DayFromYear = require('./DayFromYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function DayWithinYear(t) {
	return Day(t) - DayFromYear(YearFromTime(t));
};

}, function(modId) { var map = {"./Day":1625038546870,"./DayFromYear":1625038546871,"./YearFromTime":1625038546872}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546870, function(require, module, exports) {


var floor = require('./floor');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function Day(t) {
	return floor(t / msPerDay);
};

}, function(modId) { var map = {"./floor":1625038546801,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546871, function(require, module, exports) {


var floor = require('./floor');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DayFromYear(y) {
	return (365 * (y - 1970)) + floor((y - 1969) / 4) - floor((y - 1901) / 100) + floor((y - 1601) / 400);
};


}, function(modId) { var map = {"./floor":1625038546801}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546872, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');

var callBound = require('call-bind/callBound');

var $getUTCFullYear = callBound('Date.prototype.getUTCFullYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function YearFromTime(t) {
	// largest y such that this.TimeFromYear(y) <= t
	return $getUTCFullYear(new $Date(t));
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546873, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $EvalError = GetIntrinsic('%EvalError%');

var DaysInYear = require('./DaysInYear');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function InLeapYear(t) {
	var days = DaysInYear(YearFromTime(t));
	if (days === 365) {
		return 0;
	}
	if (days === 366) {
		return 1;
	}
	throw new $EvalError('Assertion failed: there are not 365 or 366 days in a year, got: ' + days);
};

}, function(modId) { var map = {"./DaysInYear":1625038546874,"./YearFromTime":1625038546872}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546874, function(require, module, exports) {


var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function DaysInYear(y) {
	if (modulo(y, 4) !== 0) {
		return 365;
	}
	if (modulo(y, 100) !== 0) {
		return 366;
	}
	if (modulo(y, 400) !== 0) {
		return 365;
	}
	return 366;
};

}, function(modId) { var map = {"./modulo":1625038546875}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546875, function(require, module, exports) {


var mod = require('../helpers/mod');

// https://262.ecma-international.org/5.1/#sec-5.2

module.exports = function modulo(x, y) {
	return mod(x, y);
};

}, function(modId) { var map = {"../helpers/mod":1625038546108}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546876, function(require, module, exports) {


var DayWithinYear = require('./DayWithinYear');
var InLeapYear = require('./InLeapYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.4

module.exports = function MonthFromTime(t) {
	var day = DayWithinYear(t);
	if (0 <= day && day < 31) {
		return 0;
	}
	var leap = InLeapYear(t);
	if (31 <= day && day < (59 + leap)) {
		return 1;
	}
	if ((59 + leap) <= day && day < (90 + leap)) {
		return 2;
	}
	if ((90 + leap) <= day && day < (120 + leap)) {
		return 3;
	}
	if ((120 + leap) <= day && day < (151 + leap)) {
		return 4;
	}
	if ((151 + leap) <= day && day < (181 + leap)) {
		return 5;
	}
	if ((181 + leap) <= day && day < (212 + leap)) {
		return 6;
	}
	if ((212 + leap) <= day && day < (243 + leap)) {
		return 7;
	}
	if ((243 + leap) <= day && day < (273 + leap)) {
		return 8;
	}
	if ((273 + leap) <= day && day < (304 + leap)) {
		return 9;
	}
	if ((304 + leap) <= day && day < (334 + leap)) {
		return 10;
	}
	if ((334 + leap) <= day && day < (365 + leap)) {
		return 11;
	}
};

}, function(modId) { var map = {"./DayWithinYear":1625038546869,"./InLeapYear":1625038546873}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546877, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

var $isNaN = require('../helpers/isNaN');
var padTimeComponent = require('../helpers/padTimeComponent');

var Type = require('./Type');
var WeekDay = require('./WeekDay');
var MonthFromTime = require('./MonthFromTime');
var YearFromTime = require('./YearFromTime');
var DateFromTime = require('./DateFromTime');

// https://262.ecma-international.org/9.0/#sec-datestring

module.exports = function DateString(tv) {
	if (Type(tv) !== 'Number' || $isNaN(tv)) {
		throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
	}
	var weekday = weekdays[WeekDay(tv)];
	var month = months[MonthFromTime(tv)];
	var day = padTimeComponent(DateFromTime(tv));
	var year = padTimeComponent(YearFromTime(tv), 4);
	return weekday + '\x20' + month + '\x20' + day + '\x20' + year;
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/padTimeComponent":1625038546575,"./Type":1625038546787,"./WeekDay":1625038546878,"./MonthFromTime":1625038546876,"./YearFromTime":1625038546872,"./DateFromTime":1625038546868}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546878, function(require, module, exports) {


var Day = require('./Day');
var modulo = require('./modulo');

// https://262.ecma-international.org/5.1/#sec-15.9.1.6

module.exports = function WeekDay(t) {
	return modulo(Day(t) + 4, 7);
};

}, function(modId) { var map = {"./Day":1625038546870,"./modulo":1625038546875}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546879, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-deletepropertyorthrow

module.exports = function DeletePropertyOrThrow(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}

	// eslint-disable-next-line no-param-reassign
	var success = delete O[P];
	if (!success) {
		throw new $TypeError('Attempt to delete property failed.');
	}
	return success;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546880, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var objectKeys = require('object-keys');

var callBound = require('call-bind/callBound');

var callBind = require('call-bind');

var $isEnumerable = callBound('Object.prototype.propertyIsEnumerable');
var $pushApply = callBind.apply(GetIntrinsic('%Array.prototype.push%'));

var forEach = require('../helpers/forEach');

var Type = require('./Type');

// https://262.ecma-international.org/8.0/#sec-enumerableownproperties

module.exports = function EnumerableOwnProperties(O, kind) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}

	var keys = objectKeys(O);
	if (kind === 'key') {
		return keys;
	}
	if (kind === 'value' || kind === 'key+value') {
		var results = [];
		forEach(keys, function (key) {
			if ($isEnumerable(O, key)) {
				$pushApply(results, [
					kind === 'value' ? O[key] : [key, O[key]]
				]);
			}
		});
		return results;
	}
	throw new $TypeError('Assertion failed: "kind" is not "key", "value", or "key+value": ' + kind);
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546881, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var MAX_SAFE_INTEGER = require('../helpers/maxSafeInteger');

var Call = require('./Call');
var CreateDataPropertyOrThrow = require('./CreateDataPropertyOrThrow');
var Get = require('./Get');
var HasProperty = require('./HasProperty');
var IsArray = require('./IsArray');
var LengthOfArrayLike = require('./LengthOfArrayLike');
var ToString = require('./ToString');

// https://262.ecma-international.org/11.0/#sec-flattenintoarray

// eslint-disable-next-line max-params
module.exports = function FlattenIntoArray(target, source, sourceLen, start, depth) {
	var mapperFunction;
	if (arguments.length > 5) {
		mapperFunction = arguments[5];
	}

	var targetIndex = start;
	var sourceIndex = 0;
	while (sourceIndex < sourceLen) {
		var P = ToString(sourceIndex);
		var exists = HasProperty(source, P);
		if (exists === true) {
			var element = Get(source, P);
			if (typeof mapperFunction !== 'undefined') {
				if (arguments.length <= 6) {
					throw new $TypeError('Assertion failed: thisArg is required when mapperFunction is provided');
				}
				element = Call(mapperFunction, arguments[6], [element, sourceIndex, source]);
			}
			var shouldFlatten = false;
			if (depth > 0) {
				shouldFlatten = IsArray(element);
			}
			if (shouldFlatten) {
				var elementLen = LengthOfArrayLike(element);
				targetIndex = FlattenIntoArray(target, element, elementLen, targetIndex, depth - 1);
			} else {
				if (targetIndex >= MAX_SAFE_INTEGER) {
					throw new $TypeError('index too large');
				}
				CreateDataPropertyOrThrow(target, ToString(targetIndex), element);
				targetIndex += 1;
			}
		}
		sourceIndex += 1;
	}

	return targetIndex;
};

}, function(modId) { var map = {"../helpers/maxSafeInteger":1625038546152,"./Call":1625038546792,"./CreateDataPropertyOrThrow":1625038546859,"./Get":1625038546794,"./HasProperty":1625038546882,"./IsArray":1625038546793,"./LengthOfArrayLike":1625038546864,"./ToString":1625038546827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546882, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasproperty

module.exports = function HasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546883, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var hasSymbols = require('has-symbols')();

var $TypeError = GetIntrinsic('%TypeError%');

var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $gOPS = hasSymbols && GetIntrinsic('%Object.getOwnPropertySymbols%');
var keys = require('object-keys');

var esType = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getownpropertykeys

module.exports = function GetOwnPropertyKeys(O, Type) {
	if (esType(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (Type === 'Symbol') {
		return $gOPS ? $gOPS(O) : [];
	}
	if (Type === 'String') {
		if (!$gOPN) {
			return keys(O);
		}
		return $gOPN(O);
	}
	throw new $TypeError('Assertion failed: `Type` must be `"String"` or `"Symbol"`');
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546884, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Function = GetIntrinsic('%Function%');
var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-getprototypefromconstructor

module.exports = function GetPrototypeFromConstructor(constructor, intrinsicDefaultProto) {
	var intrinsic = GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	if (!IsConstructor(constructor)) {
		throw new $TypeError('Assertion failed: `constructor` must be a constructor');
	}
	var proto = Get(constructor, 'prototype');
	if (Type(proto) !== 'Object') {
		if (!(constructor instanceof $Function)) {
			// ignore other realms, for now
			throw new $TypeError('cross-realm constructors not currently supported');
		}
		proto = intrinsic;
	}
	return proto;
};

}, function(modId) { var map = {"./Get":1625038546794,"./IsConstructor":1625038546830,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546885, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var regexTester = require('../helpers/regexTester');
var every = require('../helpers/every');

var $charAt = callBound('String.prototype.charAt');
var $strSlice = callBound('String.prototype.slice');
var $indexOf = callBound('String.prototype.indexOf');
var $parseInt = parseInt;

var isDigit = regexTester(/^[0-9]$/);

var inspect = require('object-inspect');

var Get = require('./Get');
var IsArray = require('./IsArray');
var IsInteger = require('./IsInteger');
var ToObject = require('./ToObject');
var ToString = require('./ToString');
var Type = require('./Type');

var canDistinguishSparseFromUndefined = 0 in [undefined]; // IE 6 - 8 have a bug where this returns false

var isStringOrHole = function (capture, index, arr) {
	return Type(capture) === 'String' || (canDistinguishSparseFromUndefined ? !(index in arr) : Type(capture) === 'Undefined');
};

// http://262.ecma-international.org/9.0/#sec-getsubstitution

// eslint-disable-next-line max-statements, max-params, max-lines-per-function
module.exports = function GetSubstitution(matched, str, position, captures, namedCaptures, replacement) {
	if (Type(matched) !== 'String') {
		throw new $TypeError('Assertion failed: `matched` must be a String');
	}
	var matchLength = matched.length;

	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `str` must be a String');
	}
	var stringLength = str.length;

	if (!IsInteger(position) || position < 0 || position > stringLength) {
		throw new $TypeError('Assertion failed: `position` must be a nonnegative integer, and less than or equal to the length of `string`, got ' + inspect(position));
	}

	if (!IsArray(captures) || !every(captures, isStringOrHole)) {
		throw new $TypeError('Assertion failed: `captures` must be a List of Strings, got ' + inspect(captures));
	}

	if (Type(replacement) !== 'String') {
		throw new $TypeError('Assertion failed: `replacement` must be a String');
	}

	var tailPos = position + matchLength;
	var m = captures.length;
	if (Type(namedCaptures) !== 'Undefined') {
		namedCaptures = ToObject(namedCaptures); // eslint-disable-line no-param-reassign
	}

	var result = '';
	for (var i = 0; i < replacement.length; i += 1) {
		// if this is a $, and it's not the end of the replacement
		var current = $charAt(replacement, i);
		var isLast = (i + 1) >= replacement.length;
		var nextIsLast = (i + 2) >= replacement.length;
		if (current === '$' && !isLast) {
			var next = $charAt(replacement, i + 1);
			if (next === '$') {
				result += '$';
				i += 1;
			} else if (next === '&') {
				result += matched;
				i += 1;
			} else if (next === '`') {
				result += position === 0 ? '' : $strSlice(str, 0, position - 1);
				i += 1;
			} else if (next === "'") {
				result += tailPos >= stringLength ? '' : $strSlice(str, tailPos);
				i += 1;
			} else {
				var nextNext = nextIsLast ? null : $charAt(replacement, i + 2);
				if (isDigit(next) && next !== '0' && (nextIsLast || !isDigit(nextNext))) {
					// $1 through $9, and not followed by a digit
					var n = $parseInt(next, 10);
					// if (n > m, impl-defined)
					result += n <= m && Type(captures[n - 1]) === 'Undefined' ? '' : captures[n - 1];
					i += 1;
				} else if (isDigit(next) && (nextIsLast || isDigit(nextNext))) {
					// $00 through $99
					var nn = next + nextNext;
					var nnI = $parseInt(nn, 10) - 1;
					// if nn === '00' or nn > m, impl-defined
					result += nn <= m && Type(captures[nnI]) === 'Undefined' ? '' : captures[nnI];
					i += 2;
				} else if (next === '<') {
					// eslint-disable-next-line max-depth
					if (Type(namedCaptures) === 'Undefined') {
						result += '$<';
						i += 2;
					} else {
						var endIndex = $indexOf(replacement, '>', i);
						// eslint-disable-next-line max-depth
						if (endIndex > -1) {
							var groupName = $strSlice(replacement, i + '$<'.length, endIndex);
							var capture = Get(namedCaptures, groupName);
							// eslint-disable-next-line max-depth
							if (Type(capture) !== 'Undefined') {
								result += ToString(capture);
							}
							i += ('<' + groupName + '>').length;
						}
					}
				} else {
					result += '$';
				}
			}
		} else {
			// the final $, or else not a $
			result += $charAt(replacement, i);
		}
	}
	return result;
};

}, function(modId) { var map = {"../helpers/regexTester":1625038546142,"../helpers/every":1625038546171,"./Get":1625038546794,"./IsArray":1625038546793,"./IsInteger":1625038546800,"./ToObject":1625038546804,"./ToString":1625038546827,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546886, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var has = require('has');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-hasownproperty

module.exports = function HasOwnProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	return has(O, P);
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546887, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerHour = timeConstants.msPerHour;
var HoursPerDay = timeConstants.HoursPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function HourFromTime(t) {
	return modulo(floor(t / msPerHour), HoursPerDay);
};

}, function(modId) { var map = {"./floor":1625038546801,"./modulo":1625038546875,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546888, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $hasInstance = GetIntrinsic('Symbol.hasInstance', true);

var Call = require('./Call');
var GetMethod = require('./GetMethod');
var IsCallable = require('./IsCallable');
var OrdinaryHasInstance = require('./OrdinaryHasInstance');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-instanceofoperator

module.exports = function InstanceofOperator(O, C) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var instOfHandler = $hasInstance ? GetMethod(C, $hasInstance) : void 0;
	if (typeof instOfHandler !== 'undefined') {
		return ToBoolean(Call(instOfHandler, C, [O]));
	}
	if (!IsCallable(C)) {
		throw new $TypeError('`C` is not Callable');
	}
	return OrdinaryHasInstance(C, O);
};

}, function(modId) { var map = {"./Call":1625038546792,"./GetMethod":1625038546802,"./IsCallable":1625038546806,"./OrdinaryHasInstance":1625038546889,"./ToBoolean":1625038546810,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546889, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasinstance

module.exports = function OrdinaryHasInstance(C, O) {
	if (IsCallable(C) === false) {
		return false;
	}
	if (Type(O) !== 'Object') {
		return false;
	}
	var P = Get(C, 'prototype');
	if (Type(P) !== 'Object') {
		throw new $TypeError('OrdinaryHasInstance called on an object with an invalid prototype property.');
	}
	return O instanceof C;
};

}, function(modId) { var map = {"./Get":1625038546794,"./IsCallable":1625038546806,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546890, function(require, module, exports) {


// https://262.ecma-international.org/11.0/#sec-isbigintelementtype

module.exports = function IsBigIntElementType(type) {
	return type === 'BigUint64' || type === 'BigInt64';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546891, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $isConcatSpreadable = GetIntrinsic('%Symbol.isConcatSpreadable%', true);

var Get = require('./Get');
var IsArray = require('./IsArray');
var ToBoolean = require('./ToBoolean');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-isconcatspreadable

module.exports = function IsConcatSpreadable(O) {
	if (Type(O) !== 'Object') {
		return false;
	}
	if ($isConcatSpreadable) {
		var spreadable = Get(O, $isConcatSpreadable);
		if (typeof spreadable !== 'undefined') {
			return ToBoolean(spreadable);
		}
	}
	return IsArray(O);
};

}, function(modId) { var map = {"./Get":1625038546794,"./IsArray":1625038546793,"./ToBoolean":1625038546810,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546892, function(require, module, exports) {


var IsInteger = require('./IsInteger');

// https://262.ecma-international.org/11.0/#sec-isnonnegativeinteger

module.exports = function IsNonNegativeInteger(argument) {
	return !!IsInteger(argument) && argument >= 0;
};

}, function(modId) { var map = {"./IsInteger":1625038546800}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546893, function(require, module, exports) {


var IsUnclampedIntegerElementType = require('./IsUnclampedIntegerElementType');
var IsBigIntElementType = require('./IsBigIntElementType');

// https://262.ecma-international.org/11.0/#sec-isnotearconfiguration

module.exports = function IsNoTearConfiguration(type, order) {
	if (IsUnclampedIntegerElementType(type)) {
		return true;
	}
	if (IsBigIntElementType(type) && order !== 'Init' && order !== 'Unordered') {
		return true;
	}
	return false;
};

}, function(modId) { var map = {"./IsUnclampedIntegerElementType":1625038546894,"./IsBigIntElementType":1625038546890}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546894, function(require, module, exports) {


// https://262.ecma-international.org/11.0/#sec-isunclampedintegerelementtype

module.exports = function IsUnclampedIntegerElementType(type) {
	return type === 'Int8'
        || type === 'Uint8'
        || type === 'Int16'
        || type === 'Uint16'
        || type === 'Int32'
        || type === 'Uint32';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546895, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $PromiseThen = callBound('Promise.prototype.then', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ispromise

module.exports = function IsPromise(x) {
	if (Type(x) !== 'Object') {
		return false;
	}
	if (!$PromiseThen) { // Promises are not supported
		return false;
	}
	try {
		$PromiseThen(x); // throws if not a promise
	} catch (e) {
		return false;
	}
	return true;
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546896, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isPrefixOf = require('../helpers/isPrefixOf');

// var callBound = require('call-bind/callBound');

// var $charAt = callBound('String.prototype.charAt');

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-isstringprefix

module.exports = function IsStringPrefix(p, q) {
	if (Type(p) !== 'String') {
		throw new $TypeError('Assertion failed: "p" must be a String');
	}

	if (Type(q) !== 'String') {
		throw new $TypeError('Assertion failed: "q" must be a String');
	}

	return isPrefixOf(p, q);
	/*
	if (p === q || p === '') {
		return true;
	}

	var pLength = p.length;
	var qLength = q.length;
	if (pLength >= qLength) {
		return false;
	}

	// assert: pLength < qLength

	for (var i = 0; i < pLength; i += 1) {
		if ($charAt(p, i) !== $charAt(q, i)) {
			return false;
		}
	}
	return true;
	*/
};

}, function(modId) { var map = {"../helpers/isPrefixOf":1625038546094,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546897, function(require, module, exports) {


// https://262.ecma-international.org/11.0/#sec-isunsignedelementtype

module.exports = function IsUnsignedElementType(type) {
	return type === 'Uint8'
        || type === 'Uint8C'
        || type === 'Uint16'
        || type === 'Uint32'
        || type === 'BigUint64';
};

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546898, function(require, module, exports) {


var callBound = require('call-bind/callBound');
var $arrayPush = callBound('Array.prototype.push');

var GetIterator = require('./GetIterator');
var IteratorStep = require('./IteratorStep');
var IteratorValue = require('./IteratorValue');

// https://262.ecma-international.org/9.0/#sec-iterabletolist

module.exports = function IterableToList(items, method) {
	var iterator = GetIterator(items, 'sync', method);
	var values = [];
	var next = true;
	while (next) {
		next = IteratorStep(iterator);
		if (next) {
			var nextValue = IteratorValue(next);
			$arrayPush(values, nextValue);
		}
	}
	return values;
};

}, function(modId) { var map = {"./GetIterator":1625038546796,"./IteratorStep":1625038546808,"./IteratorValue":1625038546813}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546899, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.13

module.exports = function MakeDate(day, time) {
	if (!$isFinite(day) || !$isFinite(time)) {
		return NaN;
	}
	return (day * msPerDay) + time;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546900, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $DateUTC = GetIntrinsic('%Date.UTC%');

var $isFinite = require('../helpers/isFinite');

var DateFromTime = require('./DateFromTime');
var Day = require('./Day');
var floor = require('./floor');
var modulo = require('./modulo');
var MonthFromTime = require('./MonthFromTime');
var ToInteger = require('./ToInteger');
var YearFromTime = require('./YearFromTime');

// https://262.ecma-international.org/5.1/#sec-15.9.1.12

module.exports = function MakeDay(year, month, date) {
	if (!$isFinite(year) || !$isFinite(month) || !$isFinite(date)) {
		return NaN;
	}
	var y = ToInteger(year);
	var m = ToInteger(month);
	var dt = ToInteger(date);
	var ym = y + floor(m / 12);
	var mn = modulo(m, 12);
	var t = $DateUTC(ym, mn, 1);
	if (YearFromTime(t) !== ym || MonthFromTime(t) !== mn || DateFromTime(t) !== 1) {
		return NaN;
	}
	return Day(t) + dt - 1;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./DateFromTime":1625038546868,"./Day":1625038546870,"./floor":1625038546801,"./modulo":1625038546875,"./MonthFromTime":1625038546876,"./ToInteger":1625038546866,"./YearFromTime":1625038546872}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546901, function(require, module, exports) {


var $isFinite = require('../helpers/isFinite');
var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var msPerMinute = timeConstants.msPerMinute;
var msPerHour = timeConstants.msPerHour;

var ToInteger = require('./ToInteger');

// https://262.ecma-international.org/5.1/#sec-15.9.1.11

module.exports = function MakeTime(hour, min, sec, ms) {
	if (!$isFinite(hour) || !$isFinite(min) || !$isFinite(sec) || !$isFinite(ms)) {
		return NaN;
	}
	var h = ToInteger(hour);
	var m = ToInteger(min);
	var s = ToInteger(sec);
	var milli = ToInteger(ms);
	var t = (h * msPerHour) + (m * msPerMinute) + (s * msPerSecond) + milli;
	return t;
};

}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"../helpers/timeConstants":1625038546102,"./ToInteger":1625038546866}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546902, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerMinute = timeConstants.msPerMinute;
var MinutesPerHour = timeConstants.MinutesPerHour;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function MinFromTime(t) {
	return modulo(floor(t / msPerMinute), MinutesPerHour);
};

}, function(modId) { var map = {"./floor":1625038546801,"./modulo":1625038546875,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546903, function(require, module, exports) {


var modulo = require('./modulo');

var msPerSecond = require('../helpers/timeConstants').msPerSecond;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function msFromTime(t) {
	return modulo(t, msPerSecond);
};

}, function(modId) { var map = {"./modulo":1625038546875,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546904, function(require, module, exports) {


var add = require('./add');
var bitwiseAND = require('./bitwiseAND');
var bitwiseNOT = require('./bitwiseNOT');
var bitwiseOR = require('./bitwiseOR');
var bitwiseXOR = require('./bitwiseXOR');
var divide = require('./divide');
var equal = require('./equal');
var exponentiate = require('./exponentiate');
var leftShift = require('./leftShift');
var lessThan = require('./lessThan');
var multiply = require('./multiply');
var remainder = require('./remainder');
var sameValue = require('./sameValue');
var sameValueZero = require('./sameValueZero');
var signedRightShift = require('./signedRightShift');
var subtract = require('./subtract');
var toString = require('./toString');
var unaryMinus = require('./unaryMinus');
var unsignedRightShift = require('./unsignedRightShift');

module.exports = {
	add: add,
	bitwiseAND: bitwiseAND,
	bitwiseNOT: bitwiseNOT,
	bitwiseOR: bitwiseOR,
	bitwiseXOR: bitwiseXOR,
	divide: divide,
	equal: equal,
	exponentiate: exponentiate,
	leftShift: leftShift,
	lessThan: lessThan,
	multiply: multiply,
	remainder: remainder,
	sameValue: sameValue,
	sameValueZero: sameValueZero,
	signedRightShift: signedRightShift,
	subtract: subtract,
	toString: toString,
	unaryMinus: unaryMinus,
	unsignedRightShift: unsignedRightShift
};

}, function(modId) { var map = {"./add":1625038546905,"./bitwiseAND":1625038546906,"./bitwiseNOT":1625038546909,"./bitwiseOR":1625038546910,"./bitwiseXOR":1625038546911,"./divide":1625038546912,"./equal":1625038546913,"./exponentiate":1625038546914,"./leftShift":1625038546915,"./lessThan":1625038546916,"./multiply":1625038546917,"./remainder":1625038546918,"./sameValue":1625038546919,"./sameValueZero":1625038546920,"./signedRightShift":1625038546921,"./subtract":1625038546922,"./toString":1625038546923,"./unaryMinus":1625038546924,"./unsignedRightShift":1625038546925}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546905, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-add

module.exports = function NumberAdd(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	if (isNaN(x) || isNaN(y) || (x === Infinity && y === -Infinity) || (x === -Infinity && y === Infinity)) {
		return NaN;
	}

	if ((x === Infinity && y === Infinity) || (x === -Infinity && y === -Infinity)) {
		return x;
	}

	if (x === Infinity) {
		return x;
	}

	if (y === Infinity) {
		return y;
	}

	if (x === y && x === 0) {
		return Infinity / x === -Infinity && Infinity / y === -Infinity ? -0 : +0;
	}

	if (x === -y || -x === y) {
		return +0;
	}

	// shortcut for the actual spec mechanics
	return x + y;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546906, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var NumberBitwiseOp = require('../NumberBitwiseOp');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseAND

module.exports = function NumberBitwiseAND(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return NumberBitwiseOp('&', x, y);
};

}, function(modId) { var map = {"../NumberBitwiseOp":1625038546907,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546907, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var ToInt32 = require('./ToInt32');
var ToUint32 = require('./ToUint32');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-numberbitwiseop

module.exports = function NumberBitwiseOp(op, x, y) {
	if (op !== '&' && op !== '|' && op !== '^') {
		throw new $TypeError('Assertion failed: `op` must be `&`, `|`, or `^`');
	}
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	var lnum = ToInt32(x);
	var rnum = ToUint32(y);
	if (op === '&') {
		return lnum & rnum;
	}
	if (op === '|') {
		return lnum | rnum;
	}
	return lnum ^ rnum;
};

}, function(modId) { var map = {"./ToInt32":1625038546908,"./ToUint32":1625038546828,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546908, function(require, module, exports) {


var ToNumber = require('./ToNumber');

// http://262.ecma-international.org/5.1/#sec-9.5

module.exports = function ToInt32(x) {
	return ToNumber(x) >> 0;
};

}, function(modId) { var map = {"./ToNumber":1625038546785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546909, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var ToInt32 = require('../ToInt32');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseNOT

module.exports = function NumberBitwiseNOT(x) {
	if (Type(x) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` argument must be a Number');
	}
	var oldValue = ToInt32(x);
	// Return the result of applying the bitwise operator op to lnum and rnum. The result is a signed 32-bit integer.
	return ~oldValue;
};

}, function(modId) { var map = {"../ToInt32":1625038546908,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546910, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var NumberBitwiseOp = require('../NumberBitwiseOp');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseOR

module.exports = function NumberBitwiseOR(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return NumberBitwiseOp('|', x, y);
};

}, function(modId) { var map = {"../NumberBitwiseOp":1625038546907,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546911, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var NumberBitwiseOp = require('../NumberBitwiseOp');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-bitwiseXOR

module.exports = function NumberBitwiseXOR(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return NumberBitwiseOp('^', x, y);
};

}, function(modId) { var map = {"../NumberBitwiseOp":1625038546907,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546912, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isFinite = require('../../helpers/isFinite');
var isNaN = require('../../helpers/isNaN');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-divide

module.exports = function NumberDivide(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	if (isNaN(x) || isNaN(y) || (!isFinite(x) && !isFinite(y))) {
		return NaN;
	}
	// shortcut for the actual spec mechanics
	return x / y;
};

}, function(modId) { var map = {"../../helpers/isFinite":1625038546093,"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546913, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-equal

module.exports = function NumberEqual(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	if (isNaN(x) || isNaN(y)) {
		return false;
	}
	// shortcut for the actual spec mechanics
	return x === y;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546914, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
// var isNegativeZero = require('is-negative-zero');

var $pow = GetIntrinsic('%Math.pow%');

var $TypeError = GetIntrinsic('%TypeError%');

/*
var abs = require('../../helpers/abs');
var isFinite = require('../../helpers/isFinite');
var isNaN = require('../../helpers/isNaN');

var IsInteger = require('../IsInteger');
*/
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-exponentiate

/* eslint max-lines-per-function: 0, max-statements: 0 */

module.exports = function NumberExponentiate(base, exponent) {
	if (Type(base) !== 'Number' || Type(exponent) !== 'Number') {
		throw new $TypeError('Assertion failed: `base` and `exponent` arguments must be Numbers');
	}
	return $pow(base, exponent);
	/*
	if (isNaN(exponent)) {
		return NaN;
	}
	if (exponent === 0) {
		return 1;
	}
	if (isNaN(base)) {
		return NaN;
	}
	var aB = abs(base);
	if (aB > 1 && exponent === Infinity) {
		return Infinity;
	}
	if (aB > 1 && exponent === -Infinity) {
		return 0;
	}
	if (aB === 1 && (exponent === Infinity || exponent === -Infinity)) {
		return NaN;
	}
	if (aB < 1 && exponent === Infinity) {
		return +0;
	}
	if (aB < 1 && exponent === -Infinity) {
		return Infinity;
	}
	if (base === Infinity) {
		return exponent > 0 ? Infinity : 0;
	}
	if (base === -Infinity) {
		var isOdd = true;
		if (exponent > 0) {
			return isOdd ? -Infinity : Infinity;
		}
		return isOdd ? -0 : 0;
	}
	if (exponent > 0) {
		return isNegativeZero(base) ? Infinity : 0;
	}
	if (isNegativeZero(base)) {
		if (exponent > 0) {
			return isOdd ? -0 : 0;
		}
		return isOdd ? -Infinity : Infinity;
	}
	if (base < 0 && isFinite(base) && isFinite(exponent) && !IsInteger(exponent)) {
		return NaN;
    }
    */
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546915, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var ToInt32 = require('../ToInt32');
var ToUint32 = require('../ToUint32');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-leftShift

module.exports = function NumberLeftShift(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var lnum = ToInt32(x);
	var rnum = ToUint32(y);

	var shiftCount = rnum & 0x1F;

	return lnum << shiftCount;
};

}, function(modId) { var map = {"../ToInt32":1625038546908,"../ToUint32":1625038546828,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546916, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-lessThan

module.exports = function NumberLessThan(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	// If x is NaN, return undefined.
	// If y is NaN, return undefined.
	if (isNaN(x) || isNaN(y)) {
		return void undefined;
	}

	// shortcut for the actual spec mechanics
	return x < y;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546917, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-multiply

module.exports = function NumberMultiply(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	if (isNaN(x) || isNaN(y) || (x === 0 && !isFinite(y)) || (!isFinite(x) && y === 0)) {
		return NaN;
	}
	if (!isFinite(x) && !isFinite(y)) {
		return x === y ? Infinity : -Infinity;
	}
	if (!isFinite(x) && y !== 0) {
		return x > 0 ? Infinity : -Infinity;
	}
	if (!isFinite(y) && x !== 0) {
		return y > 0 ? Infinity : -Infinity;
	}

	// shortcut for the actual spec mechanics
	return x * y;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546918, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-remainder

module.exports = function NumberRemainder(n, d) {
	if (Type(n) !== 'Number' || Type(d) !== 'Number') {
		throw new $TypeError('Assertion failed: `n` and `d` arguments must be Numbers');
	}

	// If either operand is NaN, the result is NaN.
	// If the dividend is an infinity, or the divisor is a zero, or both, the result is NaN.
	if (isNaN(n) || isNaN(d) || !isFinite(n) || d === 0) {
		return NaN;
	}

	// If the dividend is finite and the divisor is an infinity, the result equals the dividend.
	// If the dividend is a zero and the divisor is nonzero and finite, the result is the same as the dividend.
	if (!isFinite(d) || (n === 0 && d !== 0)) {
		return n;
	}

	// In the remaining cases, where neither an infinity, nor a zero, nor NaN is involved…
	return n % d;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546919, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var isNegativeZero = require('is-negative-zero');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');
var NumberSameValueZero = require('./sameValueZero');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-sameValue

module.exports = function NumberSameValue(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	if (x === 0 && y === 0) {
		return !(isNegativeZero(x) ^ isNegativeZero(y));
	}
	return NumberSameValueZero(x, y);
};

}, function(modId) { var map = {"../Type":1625038546787,"./sameValueZero":1625038546920}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546920, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-sameValueZero

module.exports = function NumberSameValueZero(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var xNaN = isNaN(x);
	var yNaN = isNaN(y);
	if (xNaN || yNaN) {
		return xNaN === yNaN;
	}
	return x === y;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546921, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var ToInt32 = require('../ToInt32');
var ToUint32 = require('../ToUint32');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-signedRightShift

module.exports = function NumberSignedRightShift(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var lnum = ToInt32(x);
	var rnum = ToUint32(y);

	var shiftCount = rnum & 0x1F;

	return lnum >> shiftCount;
};

}, function(modId) { var map = {"../ToInt32":1625038546908,"../ToUint32":1625038546828,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546922, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-subtract

module.exports = function NumberSubtract(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}
	return x - y;
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546923, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');
var $TypeError = GetIntrinsic('%TypeError%');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-tostring

module.exports = function NumberToString(x) {
	if (Type(x) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` must be a Number');
	}

	return $String(x);
};

}, function(modId) { var map = {"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546924, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var isNaN = require('../../helpers/isNaN');

var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-unaryMinus

module.exports = function NumberUnaryMinus(x) {
	if (Type(x) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` argument must be a Number');
	}
	if (isNaN(x)) {
		return NaN;
	}
	return -x;
};

}, function(modId) { var map = {"../../helpers/isNaN":1625038546092,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546925, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var ToInt32 = require('../ToInt32');
var ToUint32 = require('../ToUint32');
var Type = require('../Type');

// https://262.ecma-international.org/11.0/#sec-numeric-types-number-unsignedRightShift

module.exports = function NumberUnsignedRightShift(x, y) {
	if (Type(x) !== 'Number' || Type(y) !== 'Number') {
		throw new $TypeError('Assertion failed: `x` and `y` arguments must be Numbers');
	}

	var lnum = ToInt32(x);
	var rnum = ToUint32(y);

	var shiftCount = rnum & 0x1F;

	return lnum >>> shiftCount;
};

}, function(modId) { var map = {"../ToInt32":1625038546908,"../ToUint32":1625038546828,"../Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546926, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $BigInt = GetIntrinsic('%BigInt%', true);
var $RangeError = GetIntrinsic('%RangeError%');
var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-numbertobigint

module.exports = function NumberToBigInt(number) {
	if (Type(number) !== 'Number') {
		throw new $TypeError('Assertion failed: `number` must be a String');
	}
	if (!IsInteger(number)) {
		throw new $RangeError('The number ' + number + ' cannot be converted to a BigInt because it is not an integer');
	}
	return $BigInt(number);
};

}, function(modId) { var map = {"./IsInteger":1625038546800,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546927, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var $TypeError = GetIntrinsic('%TypeError%');

var GetPrototypeFromConstructor = require('./GetPrototypeFromConstructor');
var IsArray = require('./IsArray');
var OrdinaryObjectCreate = require('./OrdinaryObjectCreate');

// https://262.ecma-international.org/6.0/#sec-ordinarycreatefromconstructor

module.exports = function OrdinaryCreateFromConstructor(constructor, intrinsicDefaultProto) {
	GetIntrinsic(intrinsicDefaultProto); // throws if not a valid intrinsic
	var proto = GetPrototypeFromConstructor(constructor, intrinsicDefaultProto);
	var slots = arguments.length < 3 ? [] : arguments[2];
	if (!IsArray(slots)) {
		throw new $TypeError('Assertion failed: if provided, `internalSlotsList` must be a List');
	}
	return OrdinaryObjectCreate(proto, slots);
};

}, function(modId) { var map = {"./GetPrototypeFromConstructor":1625038546884,"./IsArray":1625038546793,"./OrdinaryObjectCreate":1625038546928}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546928, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $ObjectCreate = GetIntrinsic('%Object.create%', true);
var $TypeError = GetIntrinsic('%TypeError%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');

var IsArray = require('./IsArray');
var Type = require('./Type');

var hasProto = !({ __proto__: null } instanceof Object);

// https://262.ecma-international.org/6.0/#sec-objectcreate

module.exports = function OrdinaryObjectCreate(proto) {
	if (proto !== null && Type(proto) !== 'Object') {
		throw new $TypeError('Assertion failed: `proto` must be null or an object');
	}
	var additionalInternalSlotsList = arguments.length < 2 ? [] : arguments[1];
	if (!IsArray(additionalInternalSlotsList)) {
		throw new $TypeError('Assertion failed: `additionalInternalSlotsList` must be an Array');
	}
	// var internalSlotsList = ['[[Prototype]]', '[[Extensible]]'];
	if (additionalInternalSlotsList.length > 0) {
		throw new $SyntaxError('es-abstract does not yet support internal slots');
		// internalSlotsList.push(...additionalInternalSlotsList);
	}
	// var O = MakeBasicObject(internalSlotsList);
	// setProto(O, proto);
	// return O;

	if ($ObjectCreate) {
		return $ObjectCreate(proto);
	}
	if (hasProto) {
		return { __proto__: proto };
	}

	if (proto === null) {
		throw new $SyntaxError('native Object.create support is required to create null objects');
	}
	var T = function T() {};
	T.prototype = proto;
	return new T();
};

}, function(modId) { var map = {"./IsArray":1625038546793,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546929, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $getProto = require('../helpers/getProto');

var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarygetprototypeof

module.exports = function OrdinaryGetPrototypeOf(O) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: O must be an Object');
	}
	if (!$getProto) {
		throw new $TypeError('This environment does not support fetching prototypes.');
	}
	return $getProto(O);
};

}, function(modId) { var map = {"../helpers/getProto":1625038546357,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546930, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-ordinaryhasproperty

module.exports = function OrdinaryHasProperty(O, P) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: P must be a Property Key');
	}
	return P in O;
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546931, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $setProto = require('../helpers/setProto');

var OrdinaryGetPrototypeOf = require('./OrdinaryGetPrototypeOf');
var Type = require('./Type');

// https://262.ecma-international.org/7.0/#sec-ordinarysetprototypeof

module.exports = function OrdinarySetPrototypeOf(O, V) {
	if (Type(V) !== 'Object' && Type(V) !== 'Null') {
		throw new $TypeError('Assertion failed: V must be Object or Null');
	}
	/*
    var extensible = IsExtensible(O);
    var current = OrdinaryGetPrototypeOf(O);
    if (SameValue(V, current)) {
        return true;
    }
    if (!extensible) {
        return false;
    }
    */
	try {
		$setProto(O, V);
	} catch (e) {
		return false;
	}
	return OrdinaryGetPrototypeOf(O) === V;
	/*
    var p = V;
    var done = false;
    while (!done) {
        if (p === null) {
            done = true;
        } else if (SameValue(p, O)) {
            return false;
        } else {
            if (wat) {
                done = true;
            } else {
                p = p.[[Prototype]];
            }
        }
     }
     O.[[Prototype]] = V;
     return true;
     */
};

}, function(modId) { var map = {"../helpers/setProto":1625038546250,"./OrdinaryGetPrototypeOf":1625038546929,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546932, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBind = require('call-bind');

var $resolve = GetIntrinsic('%Promise.resolve%', true);
var $PromiseResolve = $resolve && callBind($resolve);

// https://262.ecma-international.org/9.0/#sec-promise-resolve

module.exports = function PromiseResolve(C, x) {
	if (!$PromiseResolve) {
		throw new SyntaxError('This environment does not support Promises.');
	}
	return $PromiseResolve(C, x);
};


}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546933, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var forEach = require('../helpers/forEach');
var isLeadingSurrogate = require('../helpers/isLeadingSurrogate');
var isTrailingSurrogate = require('../helpers/isTrailingSurrogate');

var $charCodeAt = callBound('String.prototype.charCodeAt');

var Type = require('./Type');
var UnicodeEscape = require('./UnicodeEscape');
var UTF16Encoding = require('./UTF16Encoding');
var UTF16DecodeString = require('./UTF16DecodeString');

var has = require('has');

// https://262.ecma-international.org/11.0/#sec-quotejsonstring

var escapes = {
	'\u0008': '\\b',
	'\u0009': '\\t',
	'\u000A': '\\n',
	'\u000C': '\\f',
	'\u000D': '\\r',
	'\u0022': '\\"',
	'\u005c': '\\\\'
};

module.exports = function QuoteJSONString(value) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `value` must be a String');
	}
	var product = '"';
	if (value) {
		forEach(UTF16DecodeString(value), function (C) {
			if (has(escapes, C)) {
				product += escapes[C];
			} else {
				var cCharCode = $charCodeAt(C, 0);
				if (cCharCode < 0x20 || isLeadingSurrogate(C) || isTrailingSurrogate(C)) {
					product += UnicodeEscape(C);
				} else {
					product += UTF16Encoding(cCharCode);
				}
			}
		});
	}
	product += '"';
	return product;
};

}, function(modId) { var map = {"../helpers/forEach":1625038546237,"../helpers/isLeadingSurrogate":1625038546153,"../helpers/isTrailingSurrogate":1625038546154,"./Type":1625038546787,"./UnicodeEscape":1625038546934,"./UTF16Encoding":1625038546936,"./UTF16DecodeString":1625038546937}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546934, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $charCodeAt = callBound('String.prototype.charCodeAt');
var $numberToString = callBound('Number.prototype.toString');
var $toLowerCase = callBound('String.prototype.toLowerCase');

var StringPad = require('./StringPad');

// https://262.ecma-international.org/11.0/#sec-unicodeescape

module.exports = function UnicodeEscape(C) {
	if (typeof C !== 'string' || C.length !== 1) {
		throw new $TypeError('Assertion failed: `C` must be a single code unit');
	}
	var n = $charCodeAt(C, 0);
	if (n > 0xFFFF) {
		throw new $TypeError('`Assertion failed: numeric value of `C` must be <= 0xFFFF');
	}

	return '\\u' + StringPad($toLowerCase($numberToString(n, 16)), 4, '0', 'start');
};

}, function(modId) { var map = {"./StringPad":1625038546935}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546935, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var ToLength = require('./ToLength');
var ToString = require('./ToString');

var $strSlice = callBound('String.prototype.slice');

// https://262.ecma-international.org/11.0/#sec-stringpad

module.exports = function StringPad(O, maxLength, fillString, placement) {
	if (placement !== 'start' && placement !== 'end') {
		throw new $TypeError('Assertion failed: `placement` must be "start" or "end"');
	}
	var S = ToString(O);
	var intMaxLength = ToLength(maxLength);
	var stringLength = S.length;
	if (intMaxLength <= stringLength) {
		return S;
	}
	var filler = typeof fillString === 'undefined' ? ' ' : ToString(fillString);
	if (filler === '') {
		return S;
	}
	var fillLen = intMaxLength - stringLength;

	// the String value consisting of repeated concatenations of filler truncated to length fillLen.
	var truncatedStringFiller = '';
	while (truncatedStringFiller.length < fillLen) {
		truncatedStringFiller += filler;
	}
	truncatedStringFiller = $strSlice(truncatedStringFiller, 0, fillLen);

	if (placement === 'start') {
		return truncatedStringFiller + S;
	}
	return S + truncatedStringFiller;
};

}, function(modId) { var map = {"./ToLength":1625038546865,"./ToString":1625038546827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546936, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $fromCharCode = GetIntrinsic('%String.fromCharCode%');

var floor = require('./floor');
var modulo = require('./modulo');

var isCodePoint = require('../helpers/isCodePoint');

// https://262.ecma-international.org/7.0/#sec-utf16encoding

module.exports = function UTF16Encoding(cp) {
	if (!isCodePoint(cp)) {
		throw new $TypeError('Assertion failed: `cp` must be >= 0 and <= 0x10FFFF');
	}
	if (cp <= 65535) {
		return $fromCharCode(cp);
	}
	var cu1 = floor((cp - 65536) / 1024) + 0xD800;
	var cu2 = modulo(cp - 65536, 1024) + 0xDC00;
	return $fromCharCode(cu1) + $fromCharCode(cu2);
};

}, function(modId) { var map = {"./floor":1625038546801,"./modulo":1625038546875,"../helpers/isCodePoint":1625038546391}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546937, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $push = callBound('Array.prototype.push');

var CodePointAt = require('./CodePointAt');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-utf16decodestring

module.exports = function UTF16DecodeString(string) {
	if (Type(string) !== 'String') {
		throw new $TypeError('Assertion failed: `string` must be a String');
	}
	var codePoints = [];
	var size = string.length;
	var position = 0;
	while (position < size) {
		var cp = CodePointAt(string, position);
		$push(codePoints, cp['[[CodePoint]]']);
		position += cp['[[CodeUnitCount]]'];
	}
	return codePoints;
};

}, function(modId) { var map = {"./CodePointAt":1625038546798,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546938, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RegExp = GetIntrinsic('%RegExp%');

// var RegExpAlloc = require('./RegExpAlloc');
// var RegExpInitialize = require('./RegExpInitialize');
var ToString = require('./ToString');

// https://262.ecma-international.org/6.0/#sec-regexpcreate

module.exports = function RegExpCreate(P, F) {
	// var obj = RegExpAlloc($RegExp);
	// return RegExpInitialize(obj, P, F);

	// covers spec mechanics; bypass regex brand checking
	var pattern = typeof P === 'undefined' ? '' : ToString(P);
	var flags = typeof F === 'undefined' ? '' : ToString(F);
	return new $RegExp(pattern, flags);
};

}, function(modId) { var map = {"./ToString":1625038546827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546939, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var regexExec = require('call-bind/callBound')('RegExp.prototype.exec');

var Call = require('./Call');
var Get = require('./Get');
var IsCallable = require('./IsCallable');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-regexpexec

module.exports = function RegExpExec(R, S) {
	if (Type(R) !== 'Object') {
		throw new $TypeError('Assertion failed: `R` must be an Object');
	}
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	var exec = Get(R, 'exec');
	if (IsCallable(exec)) {
		var result = Call(exec, R, [S]);
		if (result === null || Type(result) === 'Object') {
			return result;
		}
		throw new $TypeError('"exec" method must return `null` or an Object');
	}
	return regexExec(R, S);
};

}, function(modId) { var map = {"./Call":1625038546792,"./Get":1625038546794,"./IsCallable":1625038546806,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546940, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var SameValue = require('./SameValue');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-samevaluenonnumeric

module.exports = function SameValueNonNumeric(x, y) {
	var xType = Type(x);
	if (xType === 'Number' || xType === 'Bigint') {
		throw new $TypeError('Assertion failed: SameValueNonNumeric does not accept Number or BigInt values');
	}
	if (xType !== Type(y)) {
		throw new $TypeError('SameValueNonNumeric requires two non-numeric values of the same type.');
	}
	return SameValue(x, y);
};

}, function(modId) { var map = {"./SameValue":1625038546821,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546941, function(require, module, exports) {


var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-samevaluezero

module.exports = function SameValueZero(x, y) {
	return (x === y) || ($isNaN(x) && $isNaN(y));
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546942, function(require, module, exports) {


var floor = require('./floor');
var modulo = require('./modulo');

var timeConstants = require('../helpers/timeConstants');
var msPerSecond = timeConstants.msPerSecond;
var SecondsPerMinute = timeConstants.SecondsPerMinute;

// https://262.ecma-international.org/5.1/#sec-15.9.1.10

module.exports = function SecFromTime(t) {
	return modulo(floor(t / msPerSecond), SecondsPerMinute);
};

}, function(modId) { var map = {"./floor":1625038546801,"./modulo":1625038546875,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546943, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var IsPropertyKey = require('./IsPropertyKey');
var SameValue = require('./SameValue');
var Type = require('./Type');

// IE 9 does not throw in strict mode when writability/configurability/extensibility is violated
var noThrowOnStrictViolation = (function () {
	try {
		delete [].length;
		return true;
	} catch (e) {
		return false;
	}
}());

// https://ecma-international.org/ecma-262/6.0/#sec-set-o-p-v-throw

module.exports = function Set(O, P, V, Throw) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: `O` must be an Object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: `P` must be a Property Key');
	}
	if (Type(Throw) !== 'Boolean') {
		throw new $TypeError('Assertion failed: `Throw` must be a Boolean');
	}
	if (Throw) {
		O[P] = V; // eslint-disable-line no-param-reassign
		if (noThrowOnStrictViolation && !SameValue(O[P], V)) {
			throw new $TypeError('Attempted to assign to readonly property.');
		}
		return true;
	} else {
		try {
			O[P] = V; // eslint-disable-line no-param-reassign
			return noThrowOnStrictViolation ? SameValue(O[P], V) : true;
		} catch (e) {
			return false;
		}
	}
};

}, function(modId) { var map = {"./IsPropertyKey":1625038546795,"./SameValue":1625038546821,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546944, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var HasOwnProperty = require('./HasOwnProperty');
var IsExtensible = require('./IsExtensible');
var IsNonNegativeInteger = require('./IsNonNegativeInteger');
var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-setfunctionlength

module.exports = function SetFunctionLength(F, length) {
	if (typeof F !== 'function' || !IsExtensible(F) || HasOwnProperty(F, 'length')) {
		throw new $TypeError('Assertion failed: `F` must be an extensible function and lack an own `length` property');
	}
	if (Type(length) !== 'Number') {
		throw new $TypeError('Assertion failed: `length` must be a Number');
	}
	if (!IsNonNegativeInteger(length)) {
		throw new $TypeError('Assertion failed: `length` must be an integer >= 0');
	}
	return DefinePropertyOrThrow(F, 'length', {
		'[[Configurable]]': true,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546831,"./HasOwnProperty":1625038546886,"./IsExtensible":1625038546819,"./IsNonNegativeInteger":1625038546892,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546945, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var has = require('has');

var $TypeError = GetIntrinsic('%TypeError%');

var getSymbolDescription = require('../helpers/getSymbolDescription');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsExtensible = require('./IsExtensible');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setfunctionname

module.exports = function SetFunctionName(F, name) {
	if (typeof F !== 'function') {
		throw new $TypeError('Assertion failed: `F` must be a function');
	}
	if (!IsExtensible(F) || has(F, 'name')) {
		throw new $TypeError('Assertion failed: `F` must be extensible, and must not have a `name` own property');
	}
	var nameType = Type(name);
	if (nameType !== 'Symbol' && nameType !== 'String') {
		throw new $TypeError('Assertion failed: `name` must be a Symbol or a String');
	}
	if (nameType === 'Symbol') {
		var description = getSymbolDescription(name);
		// eslint-disable-next-line no-param-reassign
		name = typeof description === 'undefined' ? '' : '[' + description + ']';
	}
	if (arguments.length > 2) {
		var prefix = arguments[2];
		// eslint-disable-next-line no-param-reassign
		name = prefix + ' ' + name;
	}
	return DefinePropertyOrThrow(F, 'name', {
		'[[Value]]': name,
		'[[Writable]]': false,
		'[[Enumerable]]': false,
		'[[Configurable]]': true
	});
};

}, function(modId) { var map = {"../helpers/getSymbolDescription":1625038546244,"./DefinePropertyOrThrow":1625038546831,"./IsExtensible":1625038546819,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546946, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $preventExtensions = GetIntrinsic('%Object.preventExtensions%');
var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');

var forEach = require('../helpers/forEach');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var IsAccessorDescriptor = require('./IsAccessorDescriptor');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-setintegritylevel

module.exports = function SetIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	if (!$preventExtensions) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.preventExtensions` support');
	}
	var status = $preventExtensions(O);
	if (!status) {
		return false;
	}
	if (!$gOPN) {
		throw new $SyntaxError('SetIntegrityLevel requires native `Object.getOwnPropertyNames` support');
	}
	var theKeys = $gOPN(O);
	if (level === 'sealed') {
		forEach(theKeys, function (k) {
			DefinePropertyOrThrow(O, k, { configurable: false });
		});
	} else if (level === 'frozen') {
		forEach(theKeys, function (k) {
			var currentDesc = $gOPD(O, k);
			if (typeof currentDesc !== 'undefined') {
				var desc;
				if (IsAccessorDescriptor(ToPropertyDescriptor(currentDesc))) {
					desc = { configurable: false };
				} else {
					desc = { configurable: false, writable: false };
				}
				DefinePropertyOrThrow(O, k, desc);
			}
		});
	}
	return true;
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/forEach":1625038546237,"./DefinePropertyOrThrow":1625038546831,"./IsAccessorDescriptor":1625038546816,"./ToPropertyDescriptor":1625038546820,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546947, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $species = GetIntrinsic('%Symbol.species%', true);
var $TypeError = GetIntrinsic('%TypeError%');

var IsConstructor = require('./IsConstructor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-speciesconstructor

module.exports = function SpeciesConstructor(O, defaultConstructor) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	var C = O.constructor;
	if (typeof C === 'undefined') {
		return defaultConstructor;
	}
	if (Type(C) !== 'Object') {
		throw new $TypeError('O.constructor is not an Object');
	}
	var S = $species ? C[$species] : void 0;
	if (S == null) {
		return defaultConstructor;
	}
	if (IsConstructor(S)) {
		return S;
	}
	throw new $TypeError('no constructor found');
};

}, function(modId) { var map = {"./IsConstructor":1625038546830,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546948, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');

var IsInteger = require('./IsInteger');
var Type = require('./Type');

var $charAt = callBound('String.prototype.charAt');

// https://262.ecma-international.org/6.0/#sec-splitmatch

module.exports = function SplitMatch(S, q, R) {
	if (Type(S) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}
	if (!IsInteger(q)) {
		throw new $TypeError('Assertion failed: `q` must be an integer');
	}
	if (Type(R) !== 'String') {
		throw new $TypeError('Assertion failed: `R` must be a String');
	}
	var r = R.length;
	var s = S.length;
	if (q + r > s) {
		return false;
	}

	for (var i = 0; i < r; i += 1) {
		if ($charAt(S, q + i) !== $charAt(R, i)) {
			return false;
		}
	}

	return q + r;
};

}, function(modId) { var map = {"./IsInteger":1625038546800,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546949, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Object = GetIntrinsic('%Object%');
var $StringPrototype = GetIntrinsic('%String.prototype%');
var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');

var DefinePropertyOrThrow = require('./DefinePropertyOrThrow');
var Type = require('./Type');

var setProto = require('../helpers/setProto');

// https://262.ecma-international.org/6.0/#sec-stringcreate

module.exports = function StringCreate(value, prototype) {
	if (Type(value) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a String');
	}

	var S = $Object(value);
	if (S !== $StringPrototype) {
		if (setProto) {
			setProto(S, prototype);
		} else {
			throw new $SyntaxError('StringCreate: a `proto` argument that is not `String.prototype` is not supported in an environment that does not support setting the [[Prototype]]');
		}
	}

	var length = value.length;
	DefinePropertyOrThrow(S, 'length', {
		'[[Configurable]]': false,
		'[[Enumerable]]': false,
		'[[Value]]': length,
		'[[Writable]]': false
	});

	return S;
};

}, function(modId) { var map = {"./DefinePropertyOrThrow":1625038546831,"./Type":1625038546787,"../helpers/setProto":1625038546250}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546950, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');
var $charAt = callBound('String.prototype.charAt');
var $stringToString = callBound('String.prototype.toString');

var CanonicalNumericIndexString = require('./CanonicalNumericIndexString');
var IsInteger = require('./IsInteger');
var IsPropertyKey = require('./IsPropertyKey');
var Type = require('./Type');

var isNegativeZero = require('is-negative-zero');

// https://262.ecma-international.org/8.0/#sec-stringgetownproperty

module.exports = function StringGetOwnProperty(S, P) {
	var str;
	if (Type(S) === 'Object') {
		try {
			str = $stringToString(S);
		} catch (e) { /**/ }
	}
	if (Type(str) !== 'String') {
		throw new $TypeError('Assertion failed: `S` must be a boxed string object');
	}
	if (!IsPropertyKey(P)) {
		throw new $TypeError('Assertion failed: IsPropertyKey(P) is not true');
	}
	if (Type(P) !== 'String') {
		return void undefined;
	}
	var index = CanonicalNumericIndexString(P);
	var len = str.length;
	if (typeof index === 'undefined' || !IsInteger(index) || isNegativeZero(index) || index < 0 || len <= index) {
		return void undefined;
	}
	var resultStr = $charAt(S, index);
	return {
		'[[Configurable]]': false,
		'[[Enumerable]]': true,
		'[[Value]]': resultStr,
		'[[Writable]]': false
	};
};

}, function(modId) { var map = {"./CanonicalNumericIndexString":1625038546856,"./IsInteger":1625038546800,"./IsPropertyKey":1625038546795,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546951, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var callBound = require('call-bind/callBound');

var $SymbolToString = callBound('Symbol.prototype.toString', true);

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-symboldescriptivestring

module.exports = function SymbolDescriptiveString(sym) {
	if (Type(sym) !== 'Symbol') {
		throw new $TypeError('Assertion failed: `sym` must be a Symbol');
	}
	return $SymbolToString(sym);
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546952, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $gOPD = require('../helpers/getOwnPropertyDescriptor');
var $gOPN = GetIntrinsic('%Object.getOwnPropertyNames%');
var $TypeError = GetIntrinsic('%TypeError%');

var every = require('../helpers/every');

var IsDataDescriptor = require('./IsDataDescriptor');
var IsExtensible = require('./IsExtensible');
var ToPropertyDescriptor = require('./ToPropertyDescriptor');
var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-testintegritylevel

module.exports = function TestIntegrityLevel(O, level) {
	if (Type(O) !== 'Object') {
		throw new $TypeError('Assertion failed: Type(O) is not Object');
	}
	if (level !== 'sealed' && level !== 'frozen') {
		throw new $TypeError('Assertion failed: `level` must be `"sealed"` or `"frozen"`');
	}
	var status = IsExtensible(O);
	if (status) {
		return false;
	}
	var theKeys = $gOPN(O);
	return theKeys.length === 0 || every(theKeys, function (k) {
		var currentDesc = $gOPD(O, k);
		if (typeof currentDesc !== 'undefined') {
			if (currentDesc.configurable) {
				return false;
			}
			if (level === 'frozen' && IsDataDescriptor(ToPropertyDescriptor(currentDesc)) && currentDesc.writable) {
				return false;
			}
		}
		return true;
	});
};

}, function(modId) { var map = {"../helpers/getOwnPropertyDescriptor":1625038546161,"../helpers/every":1625038546171,"./IsDataDescriptor":1625038546817,"./IsExtensible":1625038546819,"./ToPropertyDescriptor":1625038546820,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546953, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var $TypeError = GetIntrinsic('%TypeError%');
var $bigIntValueOf = callBound('BigInt.prototype.valueOf', true);

var Type = require('./Type');

// https://262.ecma-international.org/11.0/#sec-thisbigintvalue

module.exports = function thisBigIntValue(value) {
	var type = Type(value);
	if (type === 'BigInt') {
		return value;
	}
	if (!$bigIntValueOf) {
		throw new $TypeError('BigInt is not supported');
	}
	return $bigIntValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546954, function(require, module, exports) {


var $BooleanValueOf = require('call-bind/callBound')('Boolean.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-boolean-prototype-object

module.exports = function thisBooleanValue(value) {
	if (Type(value) === 'Boolean') {
		return value;
	}

	return $BooleanValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546955, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var Type = require('./Type');

var $NumberValueOf = callBound('Number.prototype.valueOf');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-number-prototype-object

module.exports = function thisNumberValue(value) {
	if (Type(value) === 'Number') {
		return value;
	}

	return $NumberValueOf(value);
};


}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546956, function(require, module, exports) {


var $StringValueOf = require('call-bind/callBound')('String.prototype.valueOf');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-properties-of-the-string-prototype-object

module.exports = function thisStringValue(value) {
	if (Type(value) === 'String') {
		return value;
	}

	return $StringValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546957, function(require, module, exports) {


var callBound = require('call-bind/callBound');

var $SymbolValueOf = callBound('Symbol.prototype.valueOf', true);

var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-thissymbolvalue

module.exports = function thisSymbolValue(value) {
	if (!$SymbolValueOf) {
		throw new SyntaxError('Symbols are not supported; thisSymbolValue requires that `value` be a Symbol or a Symbol object');
	}
	if (Type(value) === 'Symbol') {
		return value;
	}
	return $SymbolValueOf(value);
};

}, function(modId) { var map = {"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546958, function(require, module, exports) {


module.exports = require('../2018/thisTimeValue');

}, function(modId) { var map = {"../2018/thisTimeValue":1625038546633}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546959, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Date = GetIntrinsic('%Date%');
var $Number = GetIntrinsic('%Number%');

var $isFinite = require('../helpers/isFinite');

var abs = require('./abs');
var ToNumber = require('./ToNumber');

// https://262.ecma-international.org/5.1/#sec-15.9.1.14

module.exports = function TimeClip(time) {
	if (!$isFinite(time) || abs(time) > 8.64e15) {
		return NaN;
	}
	return $Number(new $Date(ToNumber(time)));
};


}, function(modId) { var map = {"../helpers/isFinite":1625038546093,"./abs":1625038546790,"./ToNumber":1625038546785}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546960, function(require, module, exports) {


var msPerDay = require('../helpers/timeConstants').msPerDay;

var DayFromYear = require('./DayFromYear');

// https://262.ecma-international.org/5.1/#sec-15.9.1.3

module.exports = function TimeFromYear(y) {
	return msPerDay * DayFromYear(y);
};

}, function(modId) { var map = {"../helpers/timeConstants":1625038546102,"./DayFromYear":1625038546871}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546961, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var $isNaN = require('../helpers/isNaN');
var padTimeComponent = require('../helpers/padTimeComponent');

var HourFromTime = require('./HourFromTime');
var MinFromTime = require('./MinFromTime');
var SecFromTime = require('./SecFromTime');
var Type = require('./Type');

// https://262.ecma-international.org/9.0/#sec-timestring

module.exports = function TimeString(tv) {
	if (Type(tv) !== 'Number' || $isNaN(tv)) {
		throw new $TypeError('Assertion failed: `tv` must be a non-NaN Number');
	}
	var hour = HourFromTime(tv);
	var minute = MinFromTime(tv);
	var second = SecFromTime(tv);
	return padTimeComponent(hour) + ':' + padTimeComponent(minute) + ':' + padTimeComponent(second) + '\x20GMT';
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"../helpers/padTimeComponent":1625038546575,"./HourFromTime":1625038546887,"./MinFromTime":1625038546902,"./SecFromTime":1625038546942,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546962, function(require, module, exports) {


var modulo = require('./modulo');

var msPerDay = require('../helpers/timeConstants').msPerDay;

// https://262.ecma-international.org/5.1/#sec-15.9.1.2

module.exports = function TimeWithinDay(t) {
	return modulo(t, msPerDay);
};


}, function(modId) { var map = {"./modulo":1625038546875,"../helpers/timeConstants":1625038546102}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546963, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');
var $Date = GetIntrinsic('%Date%');

var $isNaN = require('../helpers/isNaN');

var Type = require('./Type');

// https://ecma-international.org/ecma-262/6.0/#sec-todatestring

module.exports = function ToDateString(tv) {
	if (Type(tv) !== 'Number') {
		throw new $TypeError('Assertion failed: `tv` must be a Number');
	}
	if ($isNaN(tv)) {
		return 'Invalid Date';
	}
	return $Date(tv);
};

}, function(modId) { var map = {"../helpers/isNaN":1625038546092,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546964, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $RangeError = GetIntrinsic('%RangeError%');

var ToInteger = require('./ToInteger');
var ToLength = require('./ToLength');
var SameValue = require('./SameValue');

// https://262.ecma-international.org/12.0/#sec-toindex

module.exports = function ToIndex(value) {
	if (typeof value === 'undefined') {
		return 0;
	}
	var integerIndex = ToInteger(value);
	if (integerIndex < 0) {
		throw new $RangeError('index must be >= 0');
	}
	var index = ToLength(integerIndex);
	if (!SameValue(integerIndex, index)) {
		throw new $RangeError('index must be >= 0 and < 2 ** 53 - 1');
	}
	return index;
};

}, function(modId) { var map = {"./ToInteger":1625038546866,"./ToLength":1625038546865,"./SameValue":1625038546821}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546965, function(require, module, exports) {


var ToUint16 = require('./ToUint16');

// https://ecma-international.org/ecma-262/6.0/#sec-toint16

module.exports = function ToInt16(argument) {
	var int16bit = ToUint16(argument);
	return int16bit >= 0x8000 ? int16bit - 0x10000 : int16bit;
};

}, function(modId) { var map = {"./ToUint16":1625038546966}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546966, function(require, module, exports) {


var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');
var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

// http://262.ecma-international.org/5.1/#sec-9.7

module.exports = function ToUint16(value) {
	var number = ToNumber(value);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x10000);
};

}, function(modId) { var map = {"./abs":1625038546790,"./floor":1625038546801,"./modulo":1625038546875,"./ToNumber":1625038546785,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546967, function(require, module, exports) {


var ToUint8 = require('./ToUint8');

// https://ecma-international.org/ecma-262/6.0/#sec-toint8

module.exports = function ToInt8(argument) {
	var int8bit = ToUint8(argument);
	return int8bit >= 0x80 ? int8bit - 0x100 : int8bit;
};

}, function(modId) { var map = {"./ToUint8":1625038546968}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546968, function(require, module, exports) {


var ToNumber = require('./ToNumber');

var $isNaN = require('../helpers/isNaN');
var $isFinite = require('../helpers/isFinite');
var $sign = require('../helpers/sign');

var abs = require('./abs');
var floor = require('./floor');
var modulo = require('./modulo');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8

module.exports = function ToUint8(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number === 0 || !$isFinite(number)) { return 0; }
	var posInt = $sign(number) * floor(abs(number));
	return modulo(posInt, 0x100);
};

}, function(modId) { var map = {"./ToNumber":1625038546785,"../helpers/isNaN":1625038546092,"../helpers/isFinite":1625038546093,"../helpers/sign":1625038546122,"./abs":1625038546790,"./floor":1625038546801,"./modulo":1625038546875}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546969, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $Number = GetIntrinsic('%Number%');

var isPrimitive = require('../helpers/isPrimitive');

var ToPrimitive = require('./ToPrimitive');
var ToNumber = require('./ToNumber');
var Type = require('./Type');

// https://262.ecma-international.org/6.0/#sec-tonumber

module.exports = function ToNumeric(argument) {
	var primValue = isPrimitive(argument) ? argument : ToPrimitive(argument, $Number);
	if (Type(primValue) === 'BigInt') {
		return primValue;
	}
	return ToNumber(primValue);
};

}, function(modId) { var map = {"../helpers/isPrimitive":1625038546143,"./ToPrimitive":1625038546786,"./ToNumber":1625038546785,"./Type":1625038546787}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546970, function(require, module, exports) {


var GetIntrinsic = require('get-intrinsic');

var $String = GetIntrinsic('%String%');

var ToPrimitive = require('./ToPrimitive');
var ToString = require('./ToString');

// https://ecma-international.org/ecma-262/6.0/#sec-topropertykey

module.exports = function ToPropertyKey(argument) {
	var key = ToPrimitive(argument, $String);
	return typeof key === 'symbol' ? key : ToString(key);
};

}, function(modId) { var map = {"./ToPrimitive":1625038546786,"./ToString":1625038546827}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546971, function(require, module, exports) {


var ToNumber = require('./ToNumber');
var floor = require('./floor');

var $isNaN = require('../helpers/isNaN');

// https://ecma-international.org/ecma-262/6.0/#sec-touint8clamp

module.exports = function ToUint8Clamp(argument) {
	var number = ToNumber(argument);
	if ($isNaN(number) || number <= 0) { return 0; }
	if (number >= 0xFF) { return 0xFF; }
	var f = floor(argument);
	if (f + 0.5 < number) { return f + 1; }
	if (number < f + 0.5) { return f; }
	if (f % 2 !== 0) { return f + 1; }
	return f;
};

}, function(modId) { var map = {"./ToNumber":1625038546785,"./floor":1625038546801,"../helpers/isNaN":1625038546092}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038546972, function(require, module, exports) {


var trimStart = require('string.prototype.trimstart');
var trimEnd = require('string.prototype.trimend');

var GetIntrinsic = require('get-intrinsic');

var $TypeError = GetIntrinsic('%TypeError%');

var RequireObjectCoercible = require('./RequireObjectCoercible');
var ToString = require('./ToString');

// https://262.ecma-international.org/10.0/#sec-trimstring

module.exports = function TrimString(string, where) {
	var str = RequireObjectCoercible(string);
	var S = ToString(str);
	var T;
	if (where === 'start') {
		T = trimStart(S);
	} else if (where === 'end') {
		T = trimEnd(S);
	} else if (where === 'start+end') {
		T = trimStart(trimEnd(S));
	} else {
		throw new $TypeError('Assertion failed: invalid `where` value; must be "start", "end", or "start+end"');
	}
	return T;
};

}, function(modId) { var map = {"./RequireObjectCoercible":1625038546805,"./ToString":1625038546827}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038546084);
})()
//# sourceMappingURL=index.js.map