
var expo = [
  {
    month: 1,
    value: 209062
  },
  {
    month: 2,
    value: 209444
  },
  {
    month: 3,
    value: 186423
  },
  {
    month: 4,
    value: 148894
  },
  {
    month: 5,
    value: 143794
  },
  {
    month: 6,
    value: 157420
  },
  {
    month: 7,
    value: 169864
  },
  {
    month: 8,
    value: 173657
  },
  {
    month: 9,
    value: 177838
  },
  {
    month: 10,
    value: 181794
  },
  {
    month: 11,
    value: 183751
  },
  {
    month: 12,
    value: 189959
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

var ppi = [
  {
    month: 1,
    value: 199.3
  },
  {
    month: 2,
    value: 196.7
  },
  {
    month: 3,
    value: 193.1
  },
  {
    month: 4,
    value: 185.5
  },
  {
    month: 5,
    value: 188.6
  },
  {
    month: 6,
    value: 191.2
  },
  {
    month: 7,
    value: 193
  },
  {
    month: 8,
    value: 194.3
  },
  {
    month: 9,
    value: 195.5
  },
  {
    month: 10,
    value: 195.9
  },
  {
    month: 11,
    value: 198.2
  },
  {
    month: 12,
    value: 200.6
  }
];

// set the dimensions and margins of the graph
var margin = {top: 50, right: 35, bottom: 50, left: 50 },
    width = 650 - (margin.left + margin.right),
    height = 520 - (margin.top + margin.bottom);

// append the svg object to the body of the page
var svg = d3.select("#econ-indct")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Initialise a X axis:
var x = d3.scaleLinear().range([0,width]);
var xAxis = d3.axisBottom().scale(x);
svg.append("g")
  .attr("transform", "translate(0," + height + ")")
  .attr("class","myXaxis")

// Initialize an Y axis
var y = d3.scaleLinear().range([height, 0]);
var yAxis = d3.axisLeft().scale(y);
svg.append("g")
  .attr("class","myYaxis")

// Create a function that takes a dataset as input and update the plot:
function update(data) {

  // Create the X axis:
  x.domain([1, d3.max(data, function(d) { return d.month }) ]);
  svg.selectAll(".myXaxis").transition()
    .duration(3000)
    .call(xAxis);

  // create the Y axis
  y.domain([d3.min(data, function(d) { return d.value  }), d3.max(data, function(d) { return d.value  }) ]);
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
    .attr("d", d3.line()
      .x(function(d) { return x(d.month); })
      .y(function(d) { return y(d.value); }))
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 2.5)
}

// At the beginning, I run the update function on the first dataset:
update(expo)
document.getElementById("secondB").onclick = function () { update(pce); };
document.getElementById("thirdB").onclick = function () { update(ppi); };
document.getElementById("firstB").onclick = function () { update(expo); };
