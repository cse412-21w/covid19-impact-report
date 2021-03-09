import vacData from '../static/vac.csv'
// set the dimensions and margins of the graph
var margin = {top: 150, right: 35, bottom: 100, left: 70 },
    width = 800 - margin.left - margin.right,
    height = 650 - margin.top - margin.bottom,
    innerRadius = 90,
    outerRadius = Math.min(width, height) / 2;   // the outerRadius goes from the middle of the SVG area to the border

// append the svg object
var svg = d3v6.select("#vac-state")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

d3v6.csv(vacData).then(function(data) {

  // Scales
  var x = d3v6.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi
      .align(0)                  // This does nothing
      .domain(data.map(function(d) { return d.location; })); // The domain of the X axis is the list of states.
  var y = d3v6.scaleRadial()
      .range([innerRadius, outerRadius])
      .domain([0, 14.04]); // Domain of Y is from 0 to the max seen in the data

  // Add the bars
  svg.append("g")
    .selectAll("path")
    .data(data)
    .enter()
    .append("path")
      .attr("fill", "#69b3a2")
      .attr("d", d3v6.arc()
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d['people_fully_vaccinated_per_hundred']); })
          .startAngle(function(d) { return x(d.location); })
          .endAngle(function(d) { return x(d.location) + x.bandwidth(); })
          .padAngle(0.01)
          .padRadius(innerRadius))

  // Add the labels
  svg.append("g")
      .selectAll("g")
      .data(data)
      .enter()
      .append("g")
        .attr("text-anchor", function(d) { return (x(d.loaction) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.location) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(d['people_fully_vaccinated_per_hundred'])+67) + ",0)"; })
      .append("text")
        .text(function(d){return(d.location)})
        .attr("transform", function(d) { return (x(d.location) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")

});
