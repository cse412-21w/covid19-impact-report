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
})({"CUH9":[function(require,module,exports) {
var expo = [{
  month: 1,
  value: 209062
}, {
  month: 2,
  value: 209444
}, {
  month: 3,
  value: 186423
}, {
  month: 4,
  value: 148894
}, {
  month: 5,
  value: 143794
}, {
  month: 6,
  value: 157420
}, {
  month: 7,
  value: 169864
}, {
  month: 8,
  value: 173657
}, {
  month: 9,
  value: 177838
}, {
  month: 10,
  value: 181794
}, {
  month: 11,
  value: 183751
}, {
  month: 12,
  value: 189959
}];
var pce = [{
  month: 1,
  value: 14880.5
}, {
  month: 2,
  value: 14877.4
}, {
  month: 3,
  value: 13878.5
}, {
  month: 4,
  value: 12112.1
}, {
  month: 5,
  value: 13165.4
}, {
  month: 6,
  value: 14014.6
}, {
  month: 7,
  value: 14224.7
}, {
  month: 8,
  value: 14397.2
}, {
  month: 9,
  value: 14582.7
}, {
  month: 10,
  value: 14620.6
}, {
  month: 11,
  value: 14521.6
}, {
  month: 12,
  value: 14493.7
}];
var ppi = [{
  month: 1,
  value: 199.3
}, {
  month: 2,
  value: 196.7
}, {
  month: 3,
  value: 193.1
}, {
  month: 4,
  value: 185.5
}, {
  month: 5,
  value: 188.6
}, {
  month: 6,
  value: 191.2
}, {
  month: 7,
  value: 193
}, {
  month: 8,
  value: 194.3
}, {
  month: 9,
  value: 195.5
}, {
  month: 10,
  value: 195.9
}, {
  month: 11,
  value: 198.2
}, {
  month: 12,
  value: 200.6
}]; // set the dimensions and margins of the graph

var margin = {
  top: 50,
  right: 35,
  bottom: 50,
  left: 50
},
    width = 650 - (margin.left + margin.right),
    height = 520 - (margin.top + margin.bottom); // append the svg object to the body of the page

var svg = d3.select("#econ-indct").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Initialise a X axis:

var x = d3.scaleLinear().range([0, width]);
var xAxis = d3.axisBottom().scale(x);
svg.append("g").attr("transform", "translate(0," + height + ")").attr("class", "myXaxis"); // Initialize an Y axis

var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis"); // Create a function that takes a dataset as input and update the plot:

function update(data) {
  // Create the X axis:
  x.domain([1, d3.max(data, function (d) {
    return d.month;
  })]);
  svg.selectAll(".myXaxis").transition().duration(3000).call(xAxis); // create the Y axis

  y.domain([d3.min(data, function (d) {
    return d.value;
  }), d3.max(data, function (d) {
    return d.value;
  })]);
  svg.selectAll(".myYaxis").transition().duration(3000).call(yAxis); // Create a update selection: bind to the new data

  var u = svg.selectAll(".lineTest").data([data], function (d) {
    return d.month;
  }); // Updata the line

  u.enter().append("path").attr("class", "lineTest").merge(u).transition().duration(3000).attr("d", d3.line().x(function (d) {
    return x(d.month);
  }).y(function (d) {
    return y(d.value);
  })).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2.5);
} // At the beginning, I run the update function on the first dataset:


update(expo);

document.getElementById("secondB").onclick = function () {
  update(pce);
};

document.getElementById("thirdB").onclick = function () {
  update(ppi);
};

document.getElementById("firstB").onclick = function () {
  update(expo);
};
},{}]},{},["CUH9"], null)
//# sourceMappingURL=https://cse412-21w.github.io/covid19-impact-report/econIndicts.ee7f8e5f.js.map