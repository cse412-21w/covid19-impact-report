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
})({"dd3Bar.js":[function(require,module,exports) {
// import covidData from "../static/covid19_us.csv"; // import covid 19 US data
// ("use strict");
// var covidArray = [];
// var csv112Array = [];
// const abbrStates = {
// 	Alabama: "AL",
// 	Alaska: "AK",
// 	Arizona: "AZ",
// 	Arkansas: "AR",
// 	California: "CA",
// 	Colorado: "CO",
// 	Connecticut: "CT",
// 	Delaware: "DE",
// 	"Diamond Princess": "DPShip", // the ship
// 	"District of Columbia": "DC",
// 	Florida: "FL",
// 	Georgia: "GA",
// 	"Grand Princess": "GPShip", // the other ship
// 	Guam: "GU",
// 	Hawaii: "HI",
// 	Idaho: "ID",
// 	Illinois: "IL",
// 	Indiana: "IN",
// 	Iowa: "IA",
// 	Kansas: "KS",
// 	Kentucky: "KY",
// 	Louisiana: "LA",
// 	Maine: "ME",
// 	Maryland: "MD",
// 	Massachusetts: "MA",
// 	Michigan: "MI",
// 	Minnesota: "MN",
// 	Mississippi: "MS",
// 	Missouri: "MO",
// 	Montana: "MT",
// 	Nebraska: "NE",
// 	Nevada: "NV",
// 	"New Hampshire": "NH",
// 	"New Jersey": "NJ",
// 	"New Mexico": "NM",
// 	"New York": "NY",
// 	"North Carolina": "NC",
// 	"North Dakota": "ND",
// 	Ohio: "OH",
// 	Oklahoma: "OK",
// 	Oregon: "OR",
// 	Pennsylvania: "PA",
// 	"Puerto Rico": "PR",
// 	"Rhode Island": "RI",
// 	"South Carolina": "SC",
// 	"South Dakota": "SD",
// 	Tennessee: "TN",
// 	Texas: "TX",
// 	Utah: "UT",
// 	Vermont: "VT",
// 	Virginia: "VA",
// 	Washington: "WA",
// 	"West Virginia": "WV",
// 	Wisconsin: "WI",
// 	Wyoming: "WY",
// 	"Northern Mariana Islands": "MP",
// };
// const margin = 80;
// const width = 4000 - 2 * margin;
// const height = 800 - 2 * margin;
// const svg = d3.select("#dd3bar-svg").attr("id", "dd3bar-svg");
// const svgContainer = d3.select("#dd3-bar");
// // const chart = svg.append('g')
// //   .attr('transform', `translate(${margin}, ${margin})`);
// d3.csv(covidData).then(function (data) {
// 	data.forEach(function (d) {
// 		covidArray.push(d);
// 	});
// 	data.forEach(function (d) {
// 		if (d["Source.Name"] == "01-12-2021.csv") csv112Array.push(d);
// 	});
// 	// For later revising (slider)
// 	// var dateValues = Array.from(d3.rollup(covidArray, ([d]) => d.Confirmed, d => d['Source.Name'], d => d.Province_State))
// 	//                 .map(([filename, data]) => [filename, data])
// 	// .map(([date, data]) => [parseDateCSV(date), data])
// 	// .sort(([a], [b]) => d3.ascending(a, b))
// 	// console.log(dateValues);
// 	// console.log(csv112Array);  // all the states for a single day
// 	// console.log(covidArray[0]);  // covidArray is an array of objects now
// 	//
// 	// // console.log(d3.max(csv112Array, function(d) {return +d.Confirmed}));
// 	// console.log("The # of rows of the covid US data: " + covidArray.length);
// 	// console.log("Example row: ");
// 	// // method to find the max value of a column
// 	// console.log(d3.max(covidArray, d => +d["Confirmed"]));
// 	// // const tParser = d3.timeParse("%d/%m/%Y %H:%M");
// 	// // console.log(tParser(covidArray[0].Last_Update));
// 	draw("01-01-2021.csv");
// });
// // svg
// //   .append('text')
// //   .attr('class', 'label')
// //   .attr('x', -(height / 2) - margin)
// //   .attr('y', margin / 4)
// //   .attr('transform', 'rotate(-90)')
// //   .attr('text-anchor', 'middle')
// //   .text('# of people confirmed')
// //
// // svg.append('text')
// //   .attr('class', 'label')
// //   .attr('x', width / 10 + margin)
// //   .attr('y', height + margin * 1.7)
// //   .attr('text-anchor', 'middle')
// //   .text('States')
// const parseDateCSV = d3.utcParse("%m/%d/%Y %M:%M");
// const parseDate = d3.utcParse("%Y-%m-%d");
// const formatDate = d3.utcFormat("%m-%d-%Y");
// function draw(filename) {
// 	const chart = svg
// 		.append("g")
// 		.attr("transform", `translate(${margin}, ${margin})`);
// 	// console.log(rowMap[1].values());
// 	var currentArray = [];
// 	covidArray.forEach(function (d) {
// 		if (d["Source.Name"] == filename) currentArray.push(d);
// 	});
// 	// console.log(currentArray);
// 	var xScale = d3
// 		.scaleBand()
// 		.range([0, width])
// 		.domain(currentArray.map((d) => abbrStates[d.Province_State]));
// 	var makeXLines = () => d3.axisBottom().scale(xScale);
// 	var yScale = d3
// 		.scaleLinear()
// 		.range([height, 0])
// 		.domain([
// 			0,
// 			d3.max(currentArray, function (d) {
// 				return +d.Confirmed;
// 			}),
// 		]);
// 	var makeYLines = () => d3.axisLeft().scale(yScale);
// 	chart
// 		.append("g")
// 		.attr("transform", `translate(0, ${height})`)
// 		.call(d3.axisBottom(xScale));
// 	chart.append("g").call(d3.axisLeft(yScale));
// 	chart
// 		.append("g")
// 		// .attr('class', 'grid')
// 		.call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));
// 	const barGroups = chart.selectAll().data(currentArray).enter().append("g");
// 	barGroups
// 		.append("rect")
// 		.attr("class", "bar")
// 		.attr("x", (g) => xScale(abbrStates[g.Province_State]))
// 		.attr("y", (g) => yScale(g.Confirmed))
// 		.attr("height", (g) => height - yScale(g.Confirmed))
// 		.attr("width", xScale.bandwidth())
// 		.on("mouseenter", function (mouseEvent, d) {
// 			// mouseEnter event
// 			// console.log(d);
// 			d3.selectAll(".value").attr("opacity", 0);
// 			d3.select(this)
// 				.transition()
// 				.duration(300)
// 				.attr("opacity", 0.6)
// 				.attr("x", (d) => xScale(abbrStates[d.Province_State]) - 5)
// 				.attr("width", xScale.bandwidth() + 10);
// 			const y = yScale(d.Confirmed);
// 			chart
// 				.append("line") // line = ...
// 				.attr("id", "limit")
// 				.attr("x1", 0)
// 				.attr("y1", y)
// 				.attr("x2", width)
// 				.attr("y2", y);
// 			barGroups
// 				.append("text")
// 				.attr("class", "divergence")
// 				.attr(
// 					"x",
// 					(d) => xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2
// 				)
// 				.attr("y", (d) => yScale(d.Confirmed) - 10)
// 				.attr("fill", "white")
// 				.attr("text-anchor", "middle")
// 				.text((thisD, idx) => {
// 					const divergence = (thisD.Confirmed - d.Confirmed).toFixed(1);
// 					let text = "";
// 					if (divergence > 0) text += "+";
// 					text += +`${divergence}`;
// 					// hide the text of the current bar
// 					return thisD.Province_State !== d.Province_State ? text : "";
// 				});
// 		})
// 		.on("mouseleave", function () {
// 			d3.selectAll(".value").attr("opacity", 1);
// 			d3.select(this)
// 				.transition()
// 				.duration(300)
// 				.attr("opacity", 1)
// 				.attr("x", (d) => xScale(abbrStates[d.Province_State]))
// 				.attr("width", xScale.bandwidth());
// 			chart.selectAll("#limit").remove();
// 			chart.selectAll(".divergence").remove();
// 		});
// 	barGroups
// 		.append("text")
// 		.attr("class", "value")
// 		.attr(
// 			"x",
// 			(d) => xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2
// 		)
// 		.attr("y", (d) => yScale(d.Confirmed) - 10)
// 		.attr("text-anchor", "middle")
// 		.text((d) => +`${d.Confirmed}`);
// }
// var dateControl = document.getElementById("dateUpdated");
// dateControl.onchange = function () {
// 	// console.log("dateControl Testing:");
// 	// console.log(parseDate(dateControl.value));
// 	var filename = formatDate(parseDate(dateControl.value)).concat(".csv");
// 	console.log(filename);
// 	// clear the previous visualizations
// 	svg.selectAll("*").remove();
// 	draw(filename);
// };
// function removeAllChildNodes(parent) {
// 	while (parent.firstChild) {
// 		parent.removeChild(parent.firstChild);
// 	}
// }
// // For later revising
// const barSize = 48;
// const n = 59;
// const margin2 = { top: 16, right: 6, bottom: 6, left: 0 };
// // function ticker(svg) {
// //   const now = svg.append("text")
// //                 .style("font", `bold ${barSize}px var(--sans-serif)`)
// //                 .style("font-variant-numeric", "tabular-nums")
// //                 .attr("text-anchor", "end")
// //                 .attr("x", width - 6)
// //                 .attr("y", margin2.top + barSize * (n - 0.45))
// //                 .attr("dy", "0.32em")
// //                 .text(formatDate(keyframes[0][0]));
// //
// //   return ([date], transition) => {
// //     transition.end().then(() => now.text(formatDate(date)));
// //   };
// // }
},{}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52601" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","dd3Bar.js"], null)
//# sourceMappingURL=/dd3Bar.a6e6b8cd.js.map