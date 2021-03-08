import covidData from "../static/covid_mobility.csv";
("use strict"); // the code should be executed in "strict mode".
// With strict mode, you can not, for example, use undeclared variables

// preparation for our svg
var margin = { top: 50, right: 35, bottom: 50, left: 150 },
	width = window.innerWidth - (margin.left + margin.right),
	height = window.innerHeight / 2 - (margin.top + margin.bottom);
var data = [];
var stateSet = new Set();
var line_svg = null;
var confirm_line = null;
var driving_line = null;

var dataFilter = null;
var x = d3.scaleTime().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
var y1 = d3.scaleLinear().range([height, 0]);

var xAxis = d3.axisBottom(x);
var yAxisLeft = d3.axisLeft(y0);
var yAxisRight = d3.axisRight(y1);
var parseTime = d3.timeParse("%Y-%m-%d");
// Get the data
d3.csv(covidData).then(function (d) {
	d.forEach(function (row) {
		stateSet.add(row.state);
		data.push({
			date: parseTime(row.date),
			Confirmed: row.daily_cases,
			driving: row.percentage,
			state: row.state,
		});
	});
	drawMenu();
	dataFilter = filterData("Alabama");
	line_svg = initializeCanvas(dataFilter);
});
d3.select("#selectButton").on("change", function (d) {
	// recover the option that has been chosen
	var selectedOption = d3.select(this).property("value");
	// run the updateChart function with this selected option
	update(selectedOption);
});

function filterData(state) {
	var dataFilter = data.filter(function (row) {
		return row["state"] == state;
	});
	return dataFilter;
}
function update(selectedGroup) {
	// Create new data with the selection?
	// Give these new data to update line
	dataFilter = filterData(selectedGroup);
	drawGraph(dataFilter, selectedGroup);
}

// Add the brushing
var brush = d3
	.brushX() // Add the brush feature using the d3.brush function
	.extent([
		[0, 0],
		[width, height],
	]) // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
	.on("end", updateChart);

// A function that set idleTimeOut to null
var idleTimeout;
function idled() {
	idleTimeout = null;
}

// A function that update the chart for given boundaries
function updateChart(event) {
	// What are the selected boundaries?
	const extent = event.selection;

	// If no selection, back to initial coordinate. Otherwise, update X axis domain
	if (!extent) {
		if (!idleTimeout) return (idleTimeout = setTimeout(idled, 350)); // This allows to wait a little bit
		x.domain(
			d3.extent(dataFilter, function (d) {
				return d.date;
			})
		);
	} else {
		x.domain([x.invert(extent[0]), x.invert(extent[1])]);
		// line_svg.select(".brush").call(brush.move, null); // This remove the grey brush area as soon as the selection has been done
		line_svg.call(brush).call(brush.move, null);
	}

	// Update axis and line position
	line_svg.select("g.xAxis").transition().duration(1000).call(xAxis);
	line_svg
		.select(".confirm_line")
		.transition()
		.duration(1000)
		.attr("d", confirm_line);
	line_svg
		.select(".driving_line")
		.transition()
		.duration(1000)
		.attr("d", driving_line);
}

// If user double click, reinitialize the chart

function drawMenu() {
	d3.select("#selectButton")
		.selectAll("myOptions")
		.data(stateSet)
		.enter()
		.append("option")
		.text(function (d) {
			return d;
		}) // text showed in the menu
		.attr("value", function (d) {
			return d;
		});
}
// Scale the range of the data
function tweenDash() {
	const l = this.getTotalLength(),
		i = d3.interpolateString("0," + l, l + "," + l);
	return function (t) {
		return i(t);
	};
}
function transition(path) {
	path
		.transition()
		.duration(5000)
		.attrTween("stroke-dasharray", tweenDash)
		.on("end", () => {
			d3.select(this).call(transition);
		});
}
function initializeCanvas(dataFilter) {
	x.domain(
		d3.extent(dataFilter, function (d) {
			return d.date;
		})
	);
	y0.domain([
		0,
		d3.max(dataFilter, function (d) {
			return Math.max(d.Confirmed);
		}),
	]);
	y1.domain([-200, 200]);
	confirm_line = d3
		.line()
		.x(function (d) {
			return x(d.date);
		})
		.y(function (d) {
			return y0(d.Confirmed);
		});

	// this is the mobility percentage
	driving_line = d3
		.line()
		.x(function (d) {
			return x(d.date);
		})
		.y(function (d) {
			return y1(d.driving);
		});

	line_svg = d3
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
		.append("path")
		.datum(dataFilter) // Add the confirm line path.
		.attr("class", "confirm_line")
		.attr("d", confirm_line);
	// .call(transition);

	line_svg
		.append("path")
		.datum(dataFilter) // Add the confirmline2 path.
		.attr("class", "driving_line")
		.attr("d", driving_line);
	// .call(transition);
	// add line brush
	line_svg.append("g").attr("class", "brush").call(brush);

	line_svg
		.append("g") // Add the X Axis
		.attr("class", "xAxis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	line_svg.append("g").attr("class", "axisSteelBlue").call(yAxisLeft);

	line_svg
		.append("g")
		.attr("class", "axisRed")
		.attr("transform", "translate(" + width + " ,0)")
		.call(yAxisRight);
	line_svg
		.append("text")
		.attr("text-anchor", "end")
		.attr("x", width / 2)
		.attr("y", height + 30)
		.attr("class", "date")
		.style("text-anchor", "middle")
		.text("Date");
	line_svg
		.append("text")
		.attr("text-anchor", "end")
		.attr("x", width / 2)
		.attr("y", -10)
		.attr("class", "title")
		.style("text-anchor", "middle")
		.text("Weekly Case Vs Weekly Mobility (Alabama)");
	line_svg
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 80 - margin.left)
		.attr("x", 0 - height / 2)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Weekly Cases");

	line_svg
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 30 + width)
		.attr("x", 0 - height / 2)
		.attr("dy", "1em")
		.style("text-anchor", "middle")
		.text("Weekly Mobility Percentage Change");
	line_svg
		.append("defs")
		.append("line_svg:clipPath")
		.attr("id", "clip")
		.append("line_svg:rect")
		.attr("width", width)
		.attr("height", height)
		.attr("x", 0)
		.attr("y", 0);
	line_svg.append("g").attr("clip-path", "url(#clip)");
	line_svg.append("g").attr("class", "brush").call(brush);

	line_svg.on("dblclick", function () {
		x.domain(
			d3.extent(dataFilter, function (d) {
				return d.date;
			})
		);
		line_svg.select("g.xAxis").transition().duration(1000).call(xAxis);
		line_svg
			.select(".confirm_line")
			.transition()
			.duration(1000)
			.attr("d", confirm_line);
		line_svg
			.select(".driving_line")
			.transition()
			.duration(1000)
			.attr("d", driving_line);
	});
	return line_svg;
}

function drawGraph(dataFilter, state) {
	x.domain(
		d3.extent(dataFilter, function (d) {
			return d.date;
		})
	);
	y0.domain([
		0,
		d3.max(dataFilter, function (d) {
			return Math.max(d.Confirmed);
		}),
	]);
	const maxPercent = d3.max(dataFilter, function (d) {
		const ma = Math.abs(Math.max(d.driving));
		const mi = Math.abs(Math.min(d.driving));
		const m = Math.max(ma, mi);
		if (m % 100 > 50) {
			return m - (m % 100) + 100;
		} else {
			return m - (m % 100) + 50;
		}
	});
	y1.domain([-maxPercent, maxPercent]);

	d3.select(".confirm_line")
		.datum(dataFilter) // Add the confirmline2 path.
		.transition()
		.duration(1000)
		.attr("d", confirm_line);

	d3.select(".driving_line")
		.datum(dataFilter) // Add the confirmline2 path.
		.transition()
		.duration(1000)
		.attr("d", driving_line);

	line_svg
		.select("text.title")
		.text(`Weekly Case Vs Weekly Mobility (${state})`);

	line_svg
		.select("g.axisSteelBlue")
		.transition()
		.duration(1000)
		.call(yAxisLeft);

	line_svg.select("g.axisRed").transition().duration(1000).call(yAxisRight);

	line_svg
		.select("g.xAxis") // Add the X Axis
		.transition()
		.duration(1000)
		.call(xAxis);
}
