import covidData from "../static/covid_mobility.csv";
("use strict"); // the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables

// preparation for our svg
var margin = { top: 50, right: 35, bottom: 50, left: 150 },
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
var parseTime = d3.timeParse("%Y-%m-%d");
// Get the data
d3.csv(covidData).then(function (d) {
	d.filter(function (row) {
		return row["state"] == "California";
	}).forEach(function (row) {
		data.push({
			date: parseTime(row.date),
			Confirmed: row.daily_cases,
			percentage: row.percentage,
		});
	});
	drawGraph();
});
// Scale the range of the data
function drawGraph() {
	var valueline = d3
		.line()
		.x(function (d) {
			return x(d.date);
		})
		.y(function (d) {
			return y0(d.Confirmed);
		});

	// this is the mobility percentage
	var valueline2 = d3
		.line()
		.x(function (d) {
			return x(d.date);
		})
		.y(function (d) {
			return y1(d.percentage);
		});

	x.domain(
		d3.extent(data, function (d) {
			return d.date;
		})
	);
	y0.domain([
		0,
		d3.max(data, function (d) {
			return Math.max(d.Confirmed);
		}),
	]);
	y1.domain([
		0,
		d3.max(data, function (d) {
			return Math.max(d.percentage);
		}),
	]);

	var line_svg = d3
		.select("#d3-demo")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
		.append("g")
		.attr(
			"transform",
			"translate(" + margin.left / 2 + "," + margin.top + ")"
		);

	line_svg
		.append("g") // Add the X Axis
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	line_svg.append("g").attr("class", "axisSteelBlue").call(yAxisLeft);

	line_svg
		.append("g")
		.attr("class", "axisRed")
		.attr("transform", "translate(" + width + " ,0)")
		.call(yAxisRight);

	line_svg
		.append("path")
		.datum(data) // Add the valueline path.
		.attr("class", "line")
		.attr("d", valueline);

	line_svg
		.append("path")
		.datum(data) // Add the valueline2 path.
		.attr("class", "line")
		.style("stroke", "red")
		.attr("d", valueline2);

	line_svg
		.append("text")
		.attr("text-anchor", "end")
		.attr("x", width / 2)
		.attr("y", height + 30)
		.style("text-anchor", "middle")
		.text("Date");
	line_svg
		.append("text")
		.attr("text-anchor", "end")
		.attr("x", width / 2)
		.attr("y", -10)
		.style("text-anchor", "middle")
		.text("Daily Case Vs Daily Mobility (California)");
	line_svg
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 80 - margin.left)
		.attr("x", 0 - height / 2)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Daily Cases");

	line_svg
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 30 + width)
		.attr("x", 0 - height / 2)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Daily Mobility Percentage Change Comparing to Jan 14 2020");
}
