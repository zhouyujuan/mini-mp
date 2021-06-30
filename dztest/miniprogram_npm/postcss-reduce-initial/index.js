module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038548199, function(require, module, exports) {


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _postcss = require('postcss');

var _has = require('has');

var _has2 = _interopRequireDefault(_has);

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _caniuseApi = require('caniuse-api');

var _fromInitial = require('../data/fromInitial.json');

var _fromInitial2 = _interopRequireDefault(_fromInitial);

var _toInitial = require('../data/toInitial.json');

var _toInitial2 = _interopRequireDefault(_toInitial);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const initial = 'initial';

exports.default = (0, _postcss.plugin)('postcss-reduce-initial', () => {
    return (css, result) => {
        const resultOpts = result.opts || {};
        const browsers = (0, _browserslist2.default)(null, {
            stats: resultOpts.stats,
            path: __dirname,
            env: resultOpts.env
        });

        const initialSupport = (0, _caniuseApi.isSupported)('css-initial-value', browsers);

        css.walkDecls(decl => {
            const lowerCasedProp = decl.prop.toLowerCase();

            if (initialSupport && (0, _has2.default)(_toInitial2.default, lowerCasedProp) && decl.value.toLowerCase() === _toInitial2.default[lowerCasedProp]) {
                decl.value = initial;
                return;
            }

            if (decl.value.toLowerCase() !== initial || !_fromInitial2.default[lowerCasedProp]) {
                return;
            }

            decl.value = _fromInitial2.default[lowerCasedProp];
        });
    };
});
module.exports = exports['default'];
}, function(modId) {var map = {"../data/fromInitial.json":1625038548200,"../data/toInitial.json":1625038548201}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548200, function(require, module, exports) {
module.exports = {
  "align-content": "normal",
  "align-items": "normal",
  "align-self": "auto",
  "animation-delay": "0s",
  "animation-direction": "normal",
  "animation-duration": "0s",
  "animation-fill-mode": "none",
  "animation-iteration-count": "1",
  "animation-name": "none",
  "animation-timing-function": "ease",
  "appearance": "auto",
  "azimuth": "center",
  "backdrop-filter": "none",
  "background-attachment": "scroll",
  "background-blend-mode": "normal",
  "background-image": "none",
  "background-position": "0% 0%",
  "background-position-x": "left",
  "background-position-y": "top",
  "background-repeat": "repeat",
  "block-overflow": "clip",
  "block-size": "auto",
  "border-block-style": "none",
  "border-block-width": "medium",
  "border-block-end-style": "none",
  "border-block-end-width": "medium",
  "border-block-start-style": "none",
  "border-block-start-width": "medium",
  "border-bottom-left-radius": "0",
  "border-bottom-right-radius": "0",
  "border-bottom-style": "none",
  "border-bottom-width": "medium",
  "border-end-end-radius": "0",
  "border-end-start-radius": "0",
  "border-image-outset": "0",
  "border-image-slice": "100%",
  "border-image-source": "none",
  "border-image-width": "1",
  "border-inline-style": "none",
  "border-inline-width": "medium",
  "border-inline-end-style": "none",
  "border-inline-end-width": "medium",
  "border-inline-start-style": "none",
  "border-inline-start-width": "medium",
  "border-left-style": "none",
  "border-left-width": "medium",
  "border-right-style": "none",
  "border-right-width": "medium",
  "border-spacing": "0",
  "border-start-end-radius": "0",
  "border-start-start-radius": "0",
  "border-top-left-radius": "0",
  "border-top-right-radius": "0",
  "border-top-style": "none",
  "border-top-width": "medium",
  "bottom": "auto",
  "box-decoration-break": "slice",
  "box-shadow": "none",
  "break-after": "auto",
  "break-before": "auto",
  "break-inside": "auto",
  "caption-side": "top",
  "caret-color": "auto",
  "clear": "none",
  "clip": "auto",
  "clip-path": "none",
  "column-count": "auto",
  "column-gap": "normal",
  "column-rule-style": "none",
  "column-rule-width": "medium",
  "column-span": "none",
  "column-width": "auto",
  "contain": "none",
  "content": "normal",
  "counter-increment": "none",
  "counter-reset": "none",
  "cursor": "auto",
  "direction": "ltr",
  "empty-cells": "show",
  "filter": "none",
  "flex-basis": "auto",
  "flex-direction": "row",
  "flex-grow": "0",
  "flex-shrink": "1",
  "flex-wrap": "nowrap",
  "float": "none",
  "font-feature-settings": "normal",
  "font-kerning": "auto",
  "font-language-override": "normal",
  "font-optical-sizing": "auto",
  "font-variation-settings": "normal",
  "font-size": "medium",
  "font-size-adjust": "none",
  "font-stretch": "normal",
  "font-style": "normal",
  "font-variant": "normal",
  "font-variant-alternates": "normal",
  "font-variant-caps": "normal",
  "font-variant-east-asian": "normal",
  "font-variant-ligatures": "normal",
  "font-variant-numeric": "normal",
  "font-variant-position": "normal",
  "font-weight": "normal",
  "grid-auto-columns": "auto",
  "grid-auto-flow": "row",
  "grid-auto-rows": "auto",
  "grid-column-end": "auto",
  "grid-column-gap": "0",
  "grid-column-start": "auto",
  "grid-row-end": "auto",
  "grid-row-gap": "0",
  "grid-row-start": "auto",
  "grid-template-areas": "none",
  "grid-template-columns": "none",
  "grid-template-rows": "none",
  "hanging-punctuation": "none",
  "height": "auto",
  "hyphens": "manual",
  "image-orientation": "0deg",
  "image-rendering": "auto",
  "image-resolution": "1dppx",
  "ime-mode": "auto",
  "initial-letter": "normal",
  "initial-letter-align": "auto",
  "inline-size": "auto",
  "inset": "auto",
  "inset-block": "auto",
  "inset-block-end": "auto",
  "inset-block-start": "auto",
  "inset-inline": "auto",
  "inset-inline-end": "auto",
  "inset-inline-start": "auto",
  "isolation": "auto",
  "justify-content": "normal",
  "justify-items": "legacy",
  "justify-self": "auto",
  "left": "auto",
  "letter-spacing": "normal",
  "line-break": "auto",
  "line-clamp": "none",
  "line-height": "normal",
  "list-style-image": "none",
  "list-style-type": "disc",
  "margin-block": "0",
  "margin-block-end": "0",
  "margin-block-start": "0",
  "margin-bottom": "0",
  "margin-inline": "0",
  "margin-inline-end": "0",
  "margin-inline-start": "0",
  "margin-left": "0",
  "margin-right": "0",
  "margin-top": "0",
  "mask-border-mode": "alpha",
  "mask-border-outset": "0",
  "mask-border-slice": "0",
  "mask-border-source": "none",
  "mask-border-width": "auto",
  "mask-composite": "add",
  "mask-image": "none",
  "mask-position": "center",
  "mask-size": "auto",
  "max-block-size": "0",
  "max-height": "none",
  "max-inline-size": "0",
  "max-lines": "none",
  "max-width": "none",
  "min-block-size": "0",
  "min-height": "0",
  "min-inline-size": "0",
  "min-width": "0",
  "mix-blend-mode": "normal",
  "object-fit": "fill",
  "offset-anchor": "auto",
  "offset-distance": "0",
  "offset-path": "none",
  "offset-position": "auto",
  "offset-rotate": "auto",
  "opacity": "1.0",
  "order": "0",
  "orphans": "2",
  "outline-offset": "0",
  "outline-style": "none",
  "outline-width": "medium",
  "overflow-anchor": "auto",
  "overflow-block": "auto",
  "overflow-inline": "auto",
  "overflow-wrap": "normal",
  "padding-block": "0",
  "padding-block-end": "0",
  "padding-block-start": "0",
  "padding-bottom": "0",
  "padding-inline": "0",
  "padding-inline-end": "0",
  "padding-inline-start": "0",
  "padding-left": "0",
  "padding-right": "0",
  "padding-top": "0",
  "page-break-after": "auto",
  "page-break-before": "auto",
  "page-break-inside": "auto",
  "paint-order": "normal",
  "perspective": "none",
  "place-content": "normal",
  "pointer-events": "auto",
  "position": "static",
  "resize": "none",
  "right": "auto",
  "rotate": "none",
  "row-gap": "normal",
  "ruby-position": "over",
  "scale": "none",
  "scrollbar-color": "auto",
  "scrollbar-width": "auto",
  "scroll-behavior": "auto",
  "scroll-margin": "0",
  "scroll-margin-block": "0",
  "scroll-margin-block-start": "0",
  "scroll-margin-block-end": "0",
  "scroll-margin-bottom": "0",
  "scroll-margin-inline": "0",
  "scroll-margin-inline-start": "0",
  "scroll-margin-inline-end": "0",
  "scroll-margin-left": "0",
  "scroll-margin-right": "0",
  "scroll-margin-top": "0",
  "scroll-padding": "auto",
  "scroll-padding-block": "auto",
  "scroll-padding-block-start": "auto",
  "scroll-padding-block-end": "auto",
  "scroll-padding-bottom": "auto",
  "scroll-padding-inline": "auto",
  "scroll-padding-inline-start": "auto",
  "scroll-padding-inline-end": "auto",
  "scroll-padding-left": "auto",
  "scroll-padding-right": "auto",
  "scroll-padding-top": "auto",
  "scroll-snap-align": "none",
  "scroll-snap-coordinate": "none",
  "scroll-snap-points-x": "none",
  "scroll-snap-points-y": "none",
  "scroll-snap-stop": "normal",
  "scroll-snap-type": "none",
  "shape-image-threshold": "0.0",
  "shape-margin": "0",
  "shape-outside": "none",
  "tab-size": "8",
  "table-layout": "auto",
  "text-align-last": "auto",
  "text-combine-upright": "none",
  "text-decoration-line": "none",
  "text-decoration-skip-ink": "auto",
  "text-decoration-style": "solid",
  "text-emphasis-style": "none",
  "text-indent": "0",
  "text-justify": "auto",
  "text-orientation": "mixed",
  "text-overflow": "clip",
  "text-rendering": "auto",
  "text-shadow": "none",
  "text-transform": "none",
  "text-underline-position": "auto",
  "top": "auto",
  "touch-action": "auto",
  "transform": "none",
  "transform-style": "flat",
  "transition-delay": "0s",
  "transition-duration": "0s",
  "transition-property": "all",
  "transition-timing-function": "ease",
  "translate": "none",
  "unicode-bidi": "normal",
  "white-space": "normal",
  "widows": "2",
  "width": "auto",
  "will-change": "auto",
  "word-break": "normal",
  "word-spacing": "normal",
  "word-wrap": "normal",
  "z-index": "auto"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
__DEFINE__(1625038548201, function(require, module, exports) {
module.exports = {
  "background-clip": "border-box",
  "background-color": "transparent",
  "background-origin": "padding-box",
  "background-size": "auto auto",
  "border-block-color": "currentcolor",
  "border-block-end-color": "currentcolor",
  "border-block-start-color": "currentcolor",
  "border-bottom-color": "currentcolor",
  "border-collapse": "separate",
  "border-inline-color": "currentcolor",
  "border-inline-end-color": "currentcolor",
  "border-inline-start-color": "currentcolor",
  "border-left-color": "currentcolor",
  "border-right-color": "currentcolor",
  "border-top-color": "currentcolor",
  "box-sizing": "content-box",
  "column-rule-color": "currentcolor",
  "font-synthesis": "weight style",
  "mask-clip": "border-box",
  "mask-mode": "match-source",
  "mask-origin": "border-box",
  "mask-repeat": "repeat",
  "mask-type": "luminance",
  "ruby-align": "space-around",
  "ruby-merge": "separate",
  "text-decoration-color": "currentcolor",
  "text-emphasis-color": "currentcolor",
  "text-emphasis-position": "over right",
  "transform-box": "border-box",
  "transform-origin": "50% 50% 0",
  "vertical-align": "baseline",
  "writing-mode": "horizontal-tb"
}

}, function(modId) { var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038548199);
})()
//# sourceMappingURL=index.js.map