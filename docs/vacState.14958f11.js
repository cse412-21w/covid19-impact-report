// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"OVns":[function(require,module,exports) {
module.exports = "https://cse412-21w.github.io/covid19-impact-report/vac.efa49a25.csv";
},{}],"Ixoo":[function(require,module,exports) {
"use strict";

var _vac = _interopRequireDefault(require("../static/vac.csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// set the dimensions and margins of the graph
var element = document.getElementById('vac-state');
var positionInfo = element.getBoundingClientRect();
var margin = {
  top: 50,
  right: 35,
  bottom: 50,
  left: 70
},
    width = positionInfo.width - margin.left - margin.right,
    height = width * 0.8 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border
// append the svg object

var svg = d3.select("#vac-state").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");
d3.csv(_vac.default).then(function (data) {
  // Scales
  var x = d3.scaleBand().range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi
  .align(0) // This does nothing
  .domain(data.map(function (d) {
    return d.location;
  })); // The domain of the X axis is the list of states.

  var y = d3.scaleRadial().range([innerRadius, outerRadius]).domain([0, 14.04]); // Domain of Y is from 0 to the max seen in the data
  // Add the bars

  svg.append("g").selectAll("path").data(data).enter().append("path").attr("fill", "#69b3a2").attr("d", d3.arc().innerRadius(innerRadius).outerRadius(function (d) {
    return y(d['people_fully_vaccinated_per_hundred']);
  }).startAngle(function (d) {
    return x(d.location);
  }).endAngle(function (d) {
    return x(d.location) + x.bandwidth();
  }).padAngle(0.01).padRadius(innerRadius)); // Add the labels

  svg.append("g").selectAll("g").data(data).enter().append("g").attr("text-anchor", function (d) {
    return (x(d.loaction) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
  }).attr("transform", function (d) {
    return "rotate(" + ((x(d.location) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d['people_fully_vaccinated_per_hundred']) + 67) + ",0)";
  }).append("text").text(function (d) {
    return d.location;
  }).attr("transform", function (d) {
    return (x(d.location) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
  }).style("font-size", "10px").attr("alignment-baseline", "middle");
});
},{"../static/vac.csv":"OVns"}]},{},["Ixoo"], null)
//# sourceMappingURL=https://cse412-21w.github.io/covid19-impact-report/vacState.14958f11.js.map