module.exports = (function() {
var __MODS__ = {};
var __DEFINE__ = function(modId, func, req) { var m = { exports: {}, _tempexports: {} }; __MODS__[modId] = { status: 0, func: func, req: req, m: m }; };
var __REQUIRE__ = function(modId, source) { if(!__MODS__[modId]) return require(source); if(!__MODS__[modId].status) { var m = __MODS__[modId].m; m._exports = m._tempexports; var desp = Object.getOwnPropertyDescriptor(m, "exports"); if (desp && desp.configurable) Object.defineProperty(m, "exports", { set: function (val) { if(typeof val === "object" && val !== m._exports) { m._exports.__proto__ = val.__proto__; Object.keys(val).forEach(function (k) { m._exports[k] = val[k]; }); } m._tempexports = val }, get: function () { return m._tempexports; } }); __MODS__[modId].status = 1; __MODS__[modId].func(__MODS__[modId].req, m, m.exports); } return __MODS__[modId].m.exports; };
var __REQUIRE_WILDCARD__ = function(obj) { if(obj && obj.__esModule) { return obj; } else { var newObj = {}; if(obj != null) { for(var k in obj) { if (Object.prototype.hasOwnProperty.call(obj, k)) newObj[k] = obj[k]; } } newObj.default = obj; return newObj; } };
var __REQUIRE_DEFAULT__ = function(obj) { return obj && obj.__esModule ? obj.default : obj; };
__DEFINE__(1625038547132, function(require, module, exports) {
var fs = require("fs");

exports.FILES = [
    require.resolve("../lib/utils.js"),
    require.resolve("../lib/ast.js"),
    require.resolve("../lib/transform.js"),
    require.resolve("../lib/parse.js"),
    require.resolve("../lib/scope.js"),
    require.resolve("../lib/compress.js"),
    require.resolve("../lib/output.js"),
    require.resolve("../lib/sourcemap.js"),
    require.resolve("../lib/mozilla-ast.js"),
    require.resolve("../lib/propmangle.js"),
    require.resolve("../lib/minify.js"),
    require.resolve("./exports.js"),
];

new Function("exports", function() {
    var code = exports.FILES.map(function(file) {
        return fs.readFileSync(file, "utf8");
    });
    code.push("exports.describe_ast = " + describe_ast.toString());
    return code.join("\n\n");
}())(exports);

function to_comment(value) {
    if (typeof value != "string") value = JSON.stringify(value, function(key, value) {
        return typeof value == "function" ? "<[ " + value + " ]>" : value;
    }, 2);
    return "// " + value.replace(/\n/g, "\n// ");
}

if (+process.env["UGLIFY_BUG_REPORT"]) exports.minify = function(files, options) {
    if (typeof options == "undefined") options = "<<undefined>>";
    var code = [
        "// UGLIFY_BUG_REPORT",
        to_comment(options),
    ];
    if (typeof files == "string") {
        code.push("");
        code.push("//-------------------------------------------------------------")
        code.push("// INPUT CODE", files);
    } else for (var name in files) {
        code.push("");
        code.push("//-------------------------------------------------------------")
        code.push(to_comment(name), files[name]);
    }
    if (options.sourceMap && options.sourceMap.url) {
        code.push("");
        code.push("//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiJ9");
    }
    var result = { code: code.join("\n") };
    if (options.sourceMap) result.map = '{"version":3,"sources":[],"names":[],"mappings":""}';
    return result;
};

function describe_ast() {
    var out = OutputStream({ beautify: true });
    doitem(AST_Node);
    return out.get() + "\n";

    function doitem(ctor) {
        out.print("AST_" + ctor.TYPE);
        var props = ctor.SELF_PROPS.filter(function(prop) {
            return !/^\$/.test(prop);
        });
        if (props.length > 0) {
            out.space();
            out.with_parens(function() {
                props.forEach(function(prop, i) {
                    if (i) out.space();
                    out.print(prop);
                });
            });
        }
        if (ctor.documentation) {
            out.space();
            out.print_string(ctor.documentation);
        }
        if (ctor.SUBCLASSES.length > 0) {
            out.space();
            out.with_block(function() {
                ctor.SUBCLASSES.sort(function(a, b) {
                    return a.TYPE < b.TYPE ? -1 : 1;
                }).forEach(function(ctor, i) {
                    out.indent();
                    doitem(ctor);
                    out.newline();
                });
            });
        }
    }
}

function infer_options(options) {
    var result = exports.minify("", options);
    return result.error && result.error.defs;
}

exports.default_options = function() {
    var defs = infer_options({ 0: 0 });
    Object.keys(defs).forEach(function(component) {
        var options = {};
        options[component] = { 0: 0 };
        if (options = infer_options(options)) {
            defs[component] = options;
        }
    });
    return defs;
};

}, function(modId) {var map = {}; return __REQUIRE__(map[modId], modId); })
return __REQUIRE__(1625038547132);
})()
//# sourceMappingURL=index.js.map