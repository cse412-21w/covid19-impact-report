import covidData from "../static/covid19_us.csv"; // import covid 19 US data
("use strict");

var covidArray = [];
var csv112Array = [];
const abbrStates = {
	Alabama: "AL",
	Alaska: "AK",
	Arizona: "AZ",
	Arkansas: "AR",
	California: "CA",
	Colorado: "CO",
	Connecticut: "CT",
	Delaware: "DE",
	"Diamond Princess": "DPShip", // the ship
	"District of Columbia": "DC",
	Florida: "FL",
	Georgia: "GA",
	"Grand Princess": "GPShip", // the other ship
	Guam: "GU",
	Hawaii: "HI",
	Idaho: "ID",
	Illinois: "IL",
	Indiana: "IN",
	Iowa: "IA",
	Kansas: "KS",
	Kentucky: "KY",
	Louisiana: "LA",
	Maine: "ME",
	Maryland: "MD",
	Massachusetts: "MA",
	Michigan: "MI",
	Minnesota: "MN",
	Mississippi: "MS",
	Missouri: "MO",
	Montana: "MT",
	Nebraska: "NE",
	Nevada: "NV",
	"New Hampshire": "NH",
	"New Jersey": "NJ",
	"New Mexico": "NM",
	"New York": "NY",
	"North Carolina": "NC",
	"North Dakota": "ND",
	Ohio: "OH",
	Oklahoma: "OK",
	Oregon: "OR",
	Pennsylvania: "PA",
	"Puerto Rico": "PR",
	"Rhode Island": "RI",
	"South Carolina": "SC",
	"South Dakota": "SD",
	Tennessee: "TN",
	Texas: "TX",
	Utah: "UT",
	Vermont: "VT",
	Virginia: "VA",
	Washington: "WA",
	"West Virginia": "WV",
	Wisconsin: "WI",
	Wyoming: "WY",
	"Northern Mariana Islands": "MP",
};

const margin = 80;
const width = 4000 - 2 * margin;
const height = 800 - 2 * margin;

const svg = d3.select("#dd3bar-svg").attr("id", "dd3bar-svg");
const svgContainer = d3.select("#dd3-bar");

// const chart = svg.append('g')
//   .attr('transform', `translate(${margin}, ${margin})`);

d3.csv(covidData).then(function (data) {
	data.forEach(function (d) {
		covidArray.push(d);
	});
	data.forEach(function (d) {
		if (d["Source.Name"] == "01-12-2021.csv") csv112Array.push(d);
	});

	// For later revising (slider)
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
});

// svg
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

const parseDateCSV = d3.utcParse("%m/%d/%Y %M:%M");
const parseDate = d3.utcParse("%Y-%m-%d");
const formatDate = d3.utcFormat("%m-%d-%Y");

function draw(filename) {
	const chart = svg
		.append("g")
		.attr("transform", `translate(${margin}, ${margin})`);

	// console.log(rowMap[1].values());
	var currentArray = [];
	covidArray.forEach(function (d) {
		if (d["Source.Name"] == filename) currentArray.push(d);
	});
	// console.log(currentArray);

	var xScale = d3
		.scaleBand()
		.range([0, width])
		.domain(currentArray.map((d) => abbrStates[d.Province_State]));
	var makeXLines = () => d3.axisBottom().scale(xScale);

	var yScale = d3
		.scaleLinear()
		.range([height, 0])
		.domain([
			0,
			d3.max(currentArray, function (d) {
				return +d.Confirmed;
			}),
		]);
	var makeYLines = () => d3.axisLeft().scale(yScale);

	chart
		.append("g")
		.attr("transform", `translate(0, ${height})`)
		.call(d3.axisBottom(xScale));
	chart.append("g").call(d3.axisLeft(yScale));

	chart
		.append("g")
		// .attr('class', 'grid')
		.call(makeYLines().tickSize(-width, 0, 0).tickFormat(""));

	const barGroups = chart.selectAll().data(currentArray).enter().append("g");

	barGroups
		.append("rect")
		.attr("class", "bar")
		.attr("x", (g) => xScale(abbrStates[g.Province_State]))
		.attr("y", (g) => yScale(g.Confirmed))
		.attr("height", (g) => height - yScale(g.Confirmed))
		.attr("width", xScale.bandwidth())
		.on("mouseenter", function (mouseEvent, d) {
			// mouseEnter event
			// console.log(d);
			d3.selectAll(".value").attr("opacity", 0);

			d3.select(this)
				.transition()
				.duration(300)
				.attr("opacity", 0.6)
				.attr("x", (d) => xScale(abbrStates[d.Province_State]) - 5)
				.attr("width", xScale.bandwidth() + 10);

			const y = yScale(d.Confirmed);

			chart
				.append("line") // line = ...
				.attr("id", "limit")
				.attr("x1", 0)
				.attr("y1", y)
				.attr("x2", width)
				.attr("y2", y);

			barGroups
				.append("text")
				.attr("class", "divergence")
				.attr(
					"x",
					(d) => xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2
				)
				.attr("y", (d) => yScale(d.Confirmed) - 10)
				.attr("fill", "white")
				.attr("text-anchor", "middle")
				.text((thisD, idx) => {
					const divergence = (thisD.Confirmed - d.Confirmed).toFixed(1);
					let text = "";
					if (divergence > 0) text += "+";
					text += +`${divergence}`;

					// hide the text of the current bar
					return thisD.Province_State !== d.Province_State ? text : "";
				});
		})
		.on("mouseleave", function () {
			d3.selectAll(".value").attr("opacity", 1);

			d3.select(this)
				.transition()
				.duration(300)
				.attr("opacity", 1)
				.attr("x", (d) => xScale(abbrStates[d.Province_State]))
				.attr("width", xScale.bandwidth());

			chart.selectAll("#limit").remove();
			chart.selectAll(".divergence").remove();
		});

	barGroups
		.append("text")
		.attr("class", "value")
		.attr(
			"x",
			(d) => xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2
		)
		.attr("y", (d) => yScale(d.Confirmed) - 10)
		.attr("text-anchor", "middle")
		.text((d) => +`${d.Confirmed}`);
}

var dateControl = document.getElementById("dateUpdated");

dateControl.onchange = function () {
	// console.log("dateControl Testing:");
	// console.log(parseDate(dateControl.value));
	var filename = formatDate(parseDate(dateControl.value)).concat(".csv");
	console.log(filename);

	// clear the previous visualizations
	svg.selectAll("*").remove();

	draw(filename);
};

function removeAllChildNodes(parent) {
	while (parent.firstChild) {
		parent.removeChild(parent.firstChild);
	}
}

// For later revising
const barSize = 48;

const n = 59;

const margin2 = { top: 16, right: 6, bottom: 6, left: 0 };

// function ticker(svg) {
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
