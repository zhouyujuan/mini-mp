module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038526826, function(require, module, exports) {


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

function _pluginSyntaxPipelineOperator() {
  const data = _interopRequireDefault(require("@babel/plugin-syntax-pipeline-operator"));

  _pluginSyntaxPipelineOperator = function () {
    return data;
  };

  return data;
}

var _minimalVisitor = _interopRequireDefault(require("./minimalVisitor"));

var _smartVisitor = _interopRequireDefault(require("./smartVisitor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const visitorsPerProposal = {
  minimal: _minimalVisitor.default,
  smart: _smartVisitor.default
};

var _default = (0, _helperPluginUtils().declare)((api, options) => {
  api.assertVersion(7);
  return {
    name: "proposal-pipeline-operator",
    inherits: _pluginSyntaxPipelineOperator().default,
    visitor: visitorsPerProposal[options.proposal]
  };
});

exports.default = _default;
}, function(modId) {var map = {"./minimalVisitor":1625038526827,"./smartVisitor":1625038526828}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526827, function(require, module, exports) {


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

const minimalVisitor = {
  BinaryExpression(path) {
    const {
      scope
    } = path;
    const {
      node
    } = path;
    const {
      operator,
      left
    } = node;
    let {
      right
    } = node;
    if (operator !== "|>") return;
    let optimizeArrow = _core().types.isArrowFunctionExpression(right) && _core().types.isExpression(right.body) && !right.async && !right.generator;
    let param;

    if (optimizeArrow) {
      const {
        params
      } = right;

      if (params.length === 1 && _core().types.isIdentifier(params[0])) {
        param = params[0];
      } else if (params.length > 0) {
        optimizeArrow = false;
      }
    } else if (_core().types.isIdentifier(right, {
      name: "eval"
    })) {
      right = _core().types.sequenceExpression([_core().types.numericLiteral(0), right]);
    }

    if (optimizeArrow && !param) {
      path.replaceWith(_core().types.sequenceExpression([left, right.body]));
      return;
    }

    const placeholder = scope.generateUidIdentifierBasedOnNode(param || left);
    scope.push({
      id: placeholder
    });

    if (param) {
      path.get("right").scope.rename(param.name, placeholder.name);
    }

    const call = optimizeArrow ? right.body : _core().types.callExpression(right, [_core().types.cloneNode(placeholder)]);
    path.replaceWith(_core().types.sequenceExpression([_core().types.assignmentExpression("=", _core().types.cloneNode(placeholder), left), call]));
  }

};
var _default = minimalVisitor;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038526828, function(require, module, exports) {


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

const updateTopicReferenceVisitor = {
  PipelinePrimaryTopicReference(path) {
    path.replaceWith(this.topicId);
  },

  PipelineTopicExpression(path) {
    path.skip();
  }

};
const smartVisitor = {
  BinaryExpression(path) {
    const {
      scope
    } = path;
    const {
      node
    } = path;
    const {
      operator,
      left,
      right
    } = node;
    if (operator !== "|>") return;
    const placeholder = scope.generateUidIdentifierBasedOnNode(left);
    scope.push({
      id: placeholder
    });
    let call;

    if (_core().types.isPipelineTopicExpression(right)) {
      path.get("right").traverse(updateTopicReferenceVisitor, {
        topicId: placeholder
      });
      call = right.expression;
    } else {
      let callee = right.callee;

      if (_core().types.isIdentifier(callee, {
        name: "eval"
      })) {
        callee = _core().types.sequenceExpression([_core().types.numericLiteral(0), callee]);
      }

      call = _core().types.callExpression(callee, [_core().types.cloneNode(placeholder)]);
    }

    path.replaceWith(_core().types.sequenceExpression([_core().types.assignmentExpression("=", _core().types.cloneNode(placeholder), left), call]));
  }

};
var _default = smartVisitor;
exports.default = _default;
}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038526826);
})()
//# sourceMappingURL=index.js.map