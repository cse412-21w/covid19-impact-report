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
})({"TDWJ":[function(require,module,exports) {
module.exports = "https://cse412-21w.github.io/covid19-impact-report/covid_mobility.1eb290fd.csv";
},{}],"LGDt":[function(require,module,exports) {
"use strict";

var _covid_mobility = _interopRequireDefault(require("../static/covid_mobility.csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

"use strict"; // the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables
// preparation for our svg


var margin = {
  top: 50,
  right: 35,
  bottom: 50,
  left: 150
},
    width = window.innerWidth - (margin.left + margin.right),
    height = window.innerHeight / 2 - (margin.top + margin.bottom);
var legendSpace = 130;
console.log(margin);
var data = [];
var x = d3.scaleTime().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);
var xAxis = d3.axisBottom(x);
var yAxisLeft = d3.axisLeft(y0);
var yAxisRight = d3.axisRight(y1);
var parseTime = d3.timeParse("%Y-%m-%d"); // Get the data

d3.csv(_covid_mobility.default).then(function (d) {
  d.filter(function (row) {
    return row["state"] == "California";
  }).forEach(function (row) {
    data.push({
      date: parseTime(row.date),
      Confirmed: row.daily_cases,
      percentage: row.percentage
    });
  });
  drawGraph();
}); // Scale the range of the data

function drawGraph() {
  var valueline = d3.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y0(d.Confirmed);
  }); // this is the mobility percentage

  var valueline2 = d3.line().x(function (d) {
    return x(d.date);
  }).y(function (d) {
    return y1(d.percentage);
  });
  x.domain(d3.extent(data, function (d) {
    return d.date;
  }));
  y0.domain([0, d3.max(data, function (d) {
    return Math.max(d.Confirmed);
  })]);
  y1.domain([0, d3.max(data, function (d) {
    return Math.max(d.percentage);
  })]);
  var line_svg = d3.select("#d3-demo").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left / 2 + "," + margin.top + ")");
  line_svg.append("g") // Add the X Axis
  .attr("class", "x axis").attr("transform", "translate(0," + height + ")").call(xAxis);
  line_svg.append("g").attr("class", "axisSteelBlue").call(yAxisLeft);
  line_svg.append("g").attr("class", "axisRed").attr("transform", "translate(" + width + " ,0)").call(yAxisRight);
  line_svg.append("path").datum(data) // Add the valueline path.
  .attr("class", "line").attr("d", valueline);
  line_svg.append("path").datum(data) // Add the valueline2 path.
  .attr("class", "line").style("stroke", "red").attr("d", valueline2);
  line_svg.append("text").attr("text-anchor", "end").attr("x", width / 2).attr("y", height + 30).style("text-anchor", "middle").text("Date");
  line_svg.append("text").attr("text-anchor", "end").attr("x", width / 2).attr("y", -10).style("text-anchor", "middle").text("Daily Case Vs Daily Mobility (California)");
  line_svg.append("text").attr("transform", "rotate(-90)").attr("y", 80 - margin.left).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").text("Daily Cases");
  line_svg.append("text").attr("transform", "rotate(-90)").attr("y", 30 + width).attr("x", 0 - height / 2).attr("dy", "1em").style("text-anchor", "middle").text("Daily Mobility Percentage Change Comparing to Jan 14 2020");
}
},{"../static/covid_mobility.csv":"TDWJ"}]},{},["LGDt"], null)
//# sourceMappingURL=https://cse412-21w.github.io/covid19-impact-report/covid_mobility.52a752d0.js.map