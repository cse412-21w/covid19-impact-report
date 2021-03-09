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
  value: 209.062
}, {
  month: 2,
  value: 209.444
}, {
  month: 3,
  value: 186.423
}, {
  month: 4,
  value: 148.894
}, {
  month: 5,
  value: 143.794
}, {
  month: 6,
  value: 157.420
}, {
  month: 7,
  value: 169.864
}, {
  month: 8,
  value: 173.657
}, {
  month: 9,
  value: 177.838
}, {
  month: 10,
  value: 181.794
}, {
  month: 11,
  value: 183.751
}, {
  month: 12,
  value: 189.959
}];
var impo = [{
  month: 1,
  value: 48.257
}, {
  month: 2,
  value: 47.415
}, {
  month: 3,
  value: 38.211
}, {
  month: 4,
  value: 33.584
}, {
  month: 5,
  value: 33.491
}, {
  month: 6,
  value: 33.930
}, {
  month: 7,
  value: 35.12
}, {
  month: 8,
  value: 36.167
}, {
  month: 9,
  value: 36.971
}, {
  month: 10,
  value: 37.365
}, {
  month: 11,
  value: 38.351
}, {
  month: 12,
  value: 39.394
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
}]; // set the dimensions and margins of the graph

var margin = {
  top: 50,
  right: 35,
  bottom: 50,
  left: 70
},
    width = 670 - (margin.left + margin.right),
    height = 520 - (margin.top + margin.bottom); // append the svg object to the body of the page

var svg = d3v6.select("#econ-indct").append("svg").attr("width", width + margin.left + margin.right).attr("height", height + margin.top + margin.bottom).append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")"); // Initialise a X axis:

var x = d3v6.scaleLinear().range([0, width]);
var xAxis = d3v6.axisBottom().scale(x);
svg.append("g").attr("transform", "translate(0," + height + ")").attr("class", "myXaxis"); // Initialize an Y axis

var y = d3v6.scaleLinear().range([height, 0]);
var yAxis = d3v6.axisLeft().scale(y);
svg.append("g").attr("class", "myYaxis"); // Create a function that takes a dataset as input and update the plot:

function update(data) {
  // Create the X axis:
  x.domain([1, d3v6.max(data, function (d) {
    return d.month;
  })]);
  svg.selectAll(".myXaxis").transition().duration(3000).call(xAxis); // create the Y axis

  y.domain([d3v6.min(data, function (d) {
    return d.value;
  }) / 1.1, d3v6.max(data, function (d) {
    return d.value;
  }) * 1.05]);
  svg.selectAll(".myYaxis").transition().duration(3000).call(yAxis); // Create a update selection: bind to the new data

  var u = svg.selectAll(".lineTest").data([data], function (d) {
    return d.month;
  }); // Updata the line

  u.enter().append("path").attr("class", "lineTest").merge(u).transition().duration(3000).attr("d", d3v6.line().x(function (d) {
    return x(d.month);
  }).y(function (d) {
    return y(d.value);
  })).attr("fill", "none").attr("stroke", "steelblue").attr("stroke-width", 2.5);
}

svg.append("text").attr("class", "x label").attr("text-anchor", "end").attr("x", width).attr("y", height - 6).text("Month");
svg.append("text").attr("text-anchor", "end").attr("transform", "rotate(-90)").attr("y", -margin.left + 15).attr("x", -margin.top).text("Billions of Dollars"); // At the beginning, I run the update function on the first dataset:

update(expo);

document.getElementById("secondB").onclick = function () {
  update(pce);
};

document.getElementById("firstB").onclick = function () {
  update(expo);
};

document.getElementById("thirdB").onclick = function () {
  update(impo);
};
},{}]},{},["CUH9"], null)
//# sourceMappingURL=https://cse412-21w.github.io/covid19-impact-report/econIndicts.0ac72d0e.js.map