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
})({"VbsG":[function(require,module,exports) {
module.exports = "https://cse412-21w.github.io/covid19-impact-report/covid19_us.8b7a5294.csv";
},{}],"BKGG":[function(require,module,exports) {
"use strict";

var _covid19_us = _interopRequireDefault(require("../static/covid19_us.csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import covid 19 US data
"use strict";

var covidArray = [];
var csv112Array = [];
var abbrStates = {
  'Alabama': "AL",
  'Alaska': "AK",
  'Arizona': "AZ",
  'Arkansas': "AR",
  'California': "CA",
  'Colorado': "CO",
  'Connecticut': "CT",
  'Delaware': "DE",
  'Diamond Princess': "DPShip",
  // the ship
  'District of Columbia': "DC",
  'Florida': "FL",
  'Georgia': "GA",
  'Grand Princess': "GPShip",
  // the other ship
  'Guam': "GU",
  'Hawaii': "HI",
  'Idaho': "ID",
  'Illinois': "IL",
  'Indiana': "IN",
  'Iowa': "IA",
  'Kansas': "KS",
  'Kentucky': "KY",
  'Louisiana': "LA",
  'Maine': "ME",
  'Maryland': "MD",
  'Massachusetts': "MA",
  'Michigan': "MI",
  'Minnesota': "MN",
  'Mississippi': "MS",
  'Missouri': "MO",
  'Montana': "MT",
  'Nebraska': "NE",
  'Nevada': "NV",
  'New Hampshire': "NH",
  'New Jersey': "NJ",
  'New Mexico': "NM",
  'New York': "NY",
  'North Carolina': "NC",
  'North Dakota': "ND",
  'Ohio': "OH",
  'Oklahoma': "OK",
  'Oregon': "OR",
  'Pennsylvania': "PA",
  'Puerto Rico': "PR",
  'Rhode Island': "RI",
  'South Carolina': "SC",
  'South Dakota': "SD",
  'Tennessee': "TN",
  'Texas': "TX",
  'Utah': "UT",
  'Vermont': "VT",
  'Virginia': "VA",
  'Washington': "WA",
  'West Virginia': "WV",
  'Wisconsin': "WI",
  'Wyoming': "WY",
  'Northern Mariana Islands': "MP"
};
var margin = 80;
var width = 4000 - 2 * margin;
var height = 800 - 2 * margin;
var svg = d3.select('#dd3bar-svg').attr("id", "dd3bar-svg");
var svgContainer = d3.select('#dd3-bar'); // const chart = svg.append('g')
//   .attr('transform', `translate(${margin}, ${margin})`);

d3.csv(_covid19_us.default).then(function (data) {
  data.forEach(function (d) {
    covidArray.push(d);
  });
  data.forEach(function (d) {
    if (d["Source.Name"] == "01-12-2021.csv") csv112Array.push(d);
  }); // For later revising (slider)
  // var dateValues = Array.from(d3.rollup(covidArray, ([d]) => d.Confirmed, d => d['Source.Name'], d => d.Province_State))
  //                 .map(([filename, data]) => [filename, data])
  // .map(([date, data]) => [parseDateCSV(date), data])
  // .sort(([a], [b]) => d3.ascending(a, b))
  // console.log(dateValues);
  // console.log(csv112Array);  // all the states for a single day
  // console.log(covidArray[0]);  // covidArray is an array of objects now
  //
  // // console.log(d3.max(csv112Array, function(d) {return +d.Confirmed}));
  // console.log("The # of rows of the covid US data: " + covidArray.length);
  // console.log("Example row: ");
  // // method to find the max value of a column
  // console.log(d3.max(covidArray, d => +d["Confirmed"]));
  // // const tParser = d3.timeParse("%d/%m/%Y %H:%M");
  // // console.log(tParser(covidArray[0].Last_Update));

  draw("01-01-2021.csv");
}); // svg
//   .append('text')
//   .attr('class', 'label')
//   .attr('x', -(height / 2) - margin)
//   .attr('y', margin / 4)
//   .attr('transform', 'rotate(-90)')
//   .attr('text-anchor', 'middle')
//   .text('# of people confirmed')
//
// svg.append('text')
//   .attr('class', 'label')
//   .attr('x', width / 10 + margin)
//   .attr('y', height + margin * 1.7)
//   .attr('text-anchor', 'middle')
//   .text('States')

var parseDateCSV = d3.utcParse("%m/%d/%Y %M:%M");
var parseDate = d3.utcParse("%Y-%m-%d");
var formatDate = d3.utcFormat("%m-%d-%Y");

function draw(filename) {
  var chart = svg.append('g').attr('transform', "translate(".concat(margin, ", ").concat(margin, ")")); // console.log(rowMap[1].values());

  var currentArray = [];
  covidArray.forEach(function (d) {
    if (d["Source.Name"] == filename) currentArray.push(d);
  });
  console.log(currentArray);
  var xScale = d3.scaleBand().range([0, width]).domain(currentArray.map(function (d) {
    return abbrStates[d.Province_State];
  }));

  var makeXLines = function makeXLines() {
    return d3.axisBottom().scale(xScale);
  };

  var yScale = d3.scaleLinear().range([height, 0]).domain([0, d3.max(currentArray, function (d) {
    return +d.Confirmed;
  })]);

  var makeYLines = function makeYLines() {
    return d3.axisLeft().scale(yScale);
  };

  chart.append('g').attr('transform', "translate(0, ".concat(height, ")")).call(d3.axisBottom(xScale));
  chart.append('g').call(d3.axisLeft(yScale));
  chart.append('g') // .attr('class', 'grid')
  .call(makeYLines().tickSize(-width, 0, 0).tickFormat(''));
  var barGroups = chart.selectAll().data(currentArray).enter().append('g');
  barGroups.append('rect').attr('class', 'bar').attr('x', function (g) {
    return xScale(abbrStates[g.Province_State]);
  }).attr('y', function (g) {
    return yScale(g.Confirmed);
  }).attr('height', function (g) {
    return height - yScale(g.Confirmed);
  }).attr('width', xScale.bandwidth()).on('mouseenter', function (mouseEvent, d) {
    // mouseEnter event
    // console.log(d);
    d3.selectAll('.value').attr('opacity', 0);
    d3.select(this).transition().duration(300).attr('opacity', 0.6).attr('x', function (d) {
      return xScale(abbrStates[d.Province_State]) - 5;
    }).attr('width', xScale.bandwidth() + 10);
    var y = yScale(d.Confirmed);
    chart.append('line') // line = ...
    .attr('id', 'limit').attr('x1', 0).attr('y1', y).attr('x2', width).attr('y2', y);
    barGroups.append('text').attr('class', 'divergence').attr('x', function (d) {
      return xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2;
    }).attr('y', function (d) {
      return yScale(d.Confirmed) - 10;
    }).attr('fill', 'white').attr('text-anchor', 'middle').text(function (thisD, idx) {
      var divergence = (thisD.Confirmed - d.Confirmed).toFixed(1);
      var text = '';
      if (divergence > 0) text += '+';
      text += +"".concat(divergence); // hide the text of the current bar

      return thisD.Province_State !== d.Province_State ? text : '';
    });
  }).on('mouseleave', function () {
    d3.selectAll('.value').attr('opacity', 1);
    d3.select(this).transition().duration(300).attr('opacity', 1).attr('x', function (d) {
      return xScale(abbrStates[d.Province_State]);
    }).attr('width', xScale.bandwidth());
    chart.selectAll('#limit').remove();
    chart.selectAll('.divergence').remove();
  });
  barGroups.append('text').attr('class', 'value').attr('x', function (d) {
    return xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2;
  }).attr('y', function (d) {
    return yScale(d.Confirmed) - 10;
  }).attr('text-anchor', 'middle').text(function (d) {
    return +"".concat(d.Confirmed);
  });
}

var dateControl = document.getElementById("dateUpdated");

dateControl.onchange = function () {
  // console.log("dateControl Testing:");
  // console.log(parseDate(dateControl.value));
  var filename = formatDate(parseDate(dateControl.value)).concat(".csv");
  console.log(filename); // clear the previous visualizations

  svg.selectAll('*').remove();
  draw(filename);
};

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
} // For later revising


var barSize = 48;
var n = 59;
var margin2 = {
  top: 16,
  right: 6,
  bottom: 6,
  left: 0
}; // function ticker(svg) {
//   const now = svg.append("text")
//                 .style("font", `bold ${barSize}px var(--sans-serif)`)
//                 .style("font-variant-numeric", "tabular-nums")
//                 .attr("text-anchor", "end")
//                 .attr("x", width - 6)
//                 .attr("y", margin2.top + barSize * (n - 0.45))
//                 .attr("dy", "0.32em")
//                 .text(formatDate(keyframes[0][0]));
//
//   return ([date], transition) => {
//     transition.end().then(() => now.text(formatDate(date)));
//   };
// }
},{"../static/covid19_us.csv":"VbsG"}]},{},["BKGG"], null)
//# sourceMappingURL=https://cse412-21w.github.io/covid19-impact-report/dd3Bar.86efe4ff.js.map