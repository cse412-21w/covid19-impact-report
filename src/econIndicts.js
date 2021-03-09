
var expo = [
  {
    month: 1,
    value: 209.062
  },
  {
    month: 2,
    value: 209.444
  },
  {
    month: 3,
    value: 186.423
  },
  {
    month: 4,
    value: 148.894
  },
  {
    month: 5,
    value: 143.794
  },
  {
    month: 6,
    value: 157.420
  },
  {
    month: 7,
    value: 169.864
  },
  {
    month: 8,
    value: 173.657
  },
  {
    month: 9,
    value: 177.838
  },
  {
    month: 10,
    value: 181.794
  },
  {
    month: 11,
    value: 183.751
  },
  {
    month: 12,
    value: 189.959
  }
];

var impo = [
  {
    month: 1,
    value: 48.257
  },
  {
    month: 2,
    value: 47.415
  },
  {
    month: 3,
    value: 38.211
  },
  {
    month: 4,
    value: 33.584
  },
  {
    month: 5,
    value: 33.491
  },
  {
    month: 6,
    value: 33.930
  },
  {
    month: 7,
    value: 35.12
  },
  {
    month: 8,
    value: 36.167
  },
  {
    month: 9,
    value: 36.971
  },
  {
    month: 10,
    value: 37.365
  },
  {
    month: 11,
    value: 38.351
  },
  {
    month: 12,
    value: 39.394
  }
];

var pce = [
  {
    month: 1,
    value: 14880.5
  },
  {
    month: 2,
    value: 14877.4
  },
  {
    month: 3,
    value: 13878.5
  },
  {
    month: 4,
    value: 12112.1
  },
  {
    month: 5,
    value: 13165.4
  },
  {
    month: 6,
    value: 14014.6
  },
  {
    month: 7,
    value: 14224.7
  },
  {
    month: 8,
    value: 14397.2
  },
  {
    month: 9,
    value: 14582.7
  },
  {
    month: 10,
    value: 14620.6
  },
  {
    month: 11,
    value: 14521.6
  },
  {
    month: 12,
    value: 14493.7
  }
];

// set the dimensions and margins of the graph
var margin = {top: 50, right: 35, bottom: 50, left: 70 },
    width = 670 - (margin.left + margin.right),
    height = 520 - (margin.top + margin.bottom);

// append the svg object to the body of the page
var svg = d3v6.select("#econ-indct")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3v6.scaleLinear().range([0,width]);
var xAxis = d3v6.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis")

// Initialize an Y axis
var y = d3v6.scaleLinear().range([height, 0]);
var yAxis = d3v6.axisLeft().scale(y);
svg.append("g")
  .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

  // Create the X axis:
  x.domain([1, d3v6.max(data, function(d) { return d.month }) ]);
  svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis);

  // create the Y axis
  y.domain([d3v6.min(data, function(d) { return d.value  })/1.1, d3v6.max(data, function(d) { return d.value  })*1.05 ]);
  svg.selectAll(".myYaxis")
    .transition()
    .duration(3000)
    .call(yAxis);

  // Create a update selection: bind to the new data
  var u = svg.selectAll(".lineTest")
    .data([data], function(d){ return d.month });

  // Updata the line
  u
    .enter()
    .append("path")
    .attr("class","lineTest")
    .merge(u)
    .transition()
    .duration(3000)
    .attr("d", d3v6.line()
      .x(function(d) { return x(d.month); })
      .y(function(d) { return y(d.value); }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
}

svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Month");

  svg.append("text")
      .attr("text-anchor", "end")
      .attr("transform", "rotate(-90)")
      .attr("y", -margin.left+15)
      .attr("x", -margin.top)
      .text("Billions of Dollars")

// At the beginning, I run the update function on the first dataset:
update(expo)
document.getElementById("secondB").onclick = function () { update(pce); };
document.getElementById("firstB").onclick = function () { update(expo); };
document.getElementById("thirdB").onclick = function () { update(impo); };
