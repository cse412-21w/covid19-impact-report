import covid_us_data from '../static/covid19_us.csv' // import covid 19 US data
import sunshineData from '../static/sunshine.csv'
"use strict"

// var us = d3.json("https://unpkg.com/us-atlas@1/us/10m.json")
// var path = d3.geoPath();
//
// var width = 960;
// var height = 600;
//
// var margin = { top: 50, right: 35, bottom: 50, left: 50 },
// w = 960 - (margin.left + margin.right),
// h = 600 - (margin.top + margin.bottom);
// var legendSpace = 130;
//
// function drawDD3() {
//   // Create SVG
//   // let svg = d3.select(DOM.svg(width, height));
//   map_svg = d3.select('#dd3')
//          .append('svg')
//           .attr("id", "dd3-chart")
//           .attr("width", width)
//           .attr("height", height);
//           // .attr("width", w + margin.left + margin.right + legendSpace)
//           // .attr("height", h + margin.top + margin.bottom)
//
//   g = map_svg.append("g");
//
//   // Bind TopoJSON data
//   g.selectAll("path")
//       .data(topojson.feature(us, us.objects.counties).features) // Bind TopoJSON data elements
//     // pass through what objects you want to use -- in this case we are doing county lines
//       .enter().append("path")
//       .attr("d", path)
//       .style("fill", "white")
//       .style("stroke", "black");
//   // return svg.node();
// }
//
// // d3.csv(sunshineData).then(function(data) {
// //   drawDD3();
// // });
// // svg.node();
// drawDD3();







//Width and height of map
var width = 960;
var height = 500;

// D3 Projection
var projection = d3.geoAlbersUsa()
				   .translate([width/2, height/2])    // translate to center of screen
				   .scale([1000]);          // scale things down so see entire US

// Define path generator
var path = d3.geoPath()               // path generator that will convert GeoJSON to SVG paths
		  	 .projection(projection);  // tell path generator to use albersUsa projection


// Define linear scale for output
var color = d3.scaleLinear()
			  .range(["rgb(213,222,217)","rgb(69,173,168)","rgb(84,36,55)","rgb(217,91,67)"]);

//Create SVG element and append map to the SVG
const svg = d3.select('#dd3')
			.append("svg")
			.attr("width", width)
			.attr("height", height);

// Append Div for tooltip to SVG
// var div = d3.select("#dd3")
// 		    .append("div")
//     		.attr("class", "tooltip")
//     		.style("opacity", 0);

// Load in my states data!
d3.csv(covid_us_data, function(covid_data) {
  color.domain([0,1,2,3]); // setting the range of the input data
	// Load GeoJSON data and merge with states data
	d3.json("us-states.json", function(json){
		svg.selectAll("path")
			.data(json.features)
			.enter()
			.append("path")
			.attr("d", path)
			.style("stroke", "#fff")
			.style("stroke-width", "1");
			// .style("fill", function(d) {
			// 	// Get data value
			// 	// var value = d.properties.visited;
			// 	if (value) {
			// 		//If value exists…
			// 		return color(value);
			// 	} else {
			// 		//If value is undefined…
			// 		return "rgb(213,222,217)";
			// 	}
			// });
	});
})
