import data from '../static/covid.json'

function draw_map() {


d3.json("https://gist.githubusercontent.com/Bradleykingz/3aa5206b6819a3c38b5d73cb814ed470/raw/a476b9098ba0244718b496697c5b350460d32f99/us-states.json", function(error, uState) {
    if (error) throw error;
    _(uState.features)
        .keyBy('properties.name')
        .merge(_.keyBy(covidData, 'Province_State'))
        .values()
        .value();

    svg.selectAll('path')
        .data(uState.features)
        .enter()
        .append('path')
        .attr("d", path)
        .attr('class', 'state')
        .style('fill', function (d, i) {
            let uConfirmed = d.Confirmed;
            //console.log(uConfirmed);
            return uConfirmed ? colorScale(uConfirmed) : "#ccc";
        })
        .on('mousemove', function (d) {
            tooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
            //Any time the mouse moves, the tooltip should be at the same position
            tooltip.style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    //The text inside should be State: rate%
                    .text(()=> `${d.Province_State}: ${(d.Confirmed).round(0)}`)
        })
    /*
    // A function that update the chart when slider is moved
    function updateMap(yearOfChosen) {
      // recompute density estimation
      console.log(yearOfChosen)


    // Listen to the slider
    d3.select("#mySlider").on("change", function(d){
      selectedValue = this.value
      updateMap(selectedValue)
    })*/
});


/*
makeSlider();

function makeSlider() {
  var margin = {right: 15, left: 15},
      containerWidth = 900,
      containerHeight = 40,
      sliderWidth = containerWidth - margin.left - margin.right,
      sliderHeight = containerHeight,
      startDate = "2020-04",
      endDate = "2021-02";

  var svgSlider = d3.select("#mySlider")
            .append("svg")
            .attr("height", containerHeight)
            .attr("width", containerWidth);

  var x = d3.scaleLinear()
      .domain([0,1])
      .range([0, sliderWidth])
      .clamp(true);

  var slider = svgSlider.append("g")
      .attr("class", "slider")
      .attr("transform", "translate(" + margin.left + "," + sliderHeight / 2 + ")");

  // Slider body
  slider.append("slider")
      .attr("class", "track")
      .attr("x1", x.range()[0])
      .attr("x2", x.range()[1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
      .attr("class", "track-overlay")
      .call(d3.drag()
          .on("start.interrupt", function() { slider.interrupt(); })
          .on("start drag", function() { handleDrag(x.invert(d3.event.x)); }));

  // Ticks
  slider.insert("g", ".track-overlay")
      .attr("class", "ticks")
      .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(x.ticks(10))
      .enter().append("text")
      .attr("x", x)
      .attr("text-anchor", "middle")
      .text(function(d) { return d; });

  // Handle
  var handle = slider.insert("circle", ".track-overlay")
      .attr("class", "handle")
      .attr("r", 9);

  slider.transition()
      .duration(750);
*/
  // Must be nested function because of d3.drag().on("start drag", ...) code,
  // drag function has to be defined after slider's handle is created,
  // but handle has to be created last to be drawn on top of slider
  /*function handleDrag(eventX) {
    handle.attr("cx", x(eventX));

    // gather data only for the selected year
    var selectedDate = eventX;

    console.log(selectedDate);

    var selectedDateDataArray = [];
    var currDate = selectedDate;

    covidData.forEach(function(entry) {
      if (entry.Month == parseInt(selectedDate.substring(5,7))) {
        console.log(entry);
        selectedDateDataArray.push(entry);
      }
    });

  }

  // Manually call to instantiate map upon load
  handleDrag(x.invert(0));
}
*/


//create a new SVG in the body
const legend = d3.select("body").append('svg')
//add it with the '.legend' class
    .attr('class', 'legend')
    //it should be 14px wide
    .attr('width', 180)
    //and 148px high
    .attr('height', 180)
    //then either select all the 'g's inside the svg
    //or create placeholders
    .selectAll('g')
    //Fill the data into our placeholders in reverse order
    //This arranges our legend in descending order.
    //The 'data' here is the items we entered in the 'domain',
    //in this case [min, max]
    //We use 'slice()' to create a shallow copy of the array
    //Since we don't want to modify the original one
    .data(colorScale.domain().slice().reverse())
    //Every node in teh data should have a 'g' appended
    .enter().append('g')
    //the 'g' should have this attribute
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//Inside every 'legend', insert a rect
legend.append("rect")
    //that's 18px wide
    .attr("width", 18)
    //and 18px high
    .attr("height", 18)
    //then fill it will the color assigned by the scale
    .style("fill", colorScale);
legend.append("text")
    .attr("x", 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .text(function(d) { return `${(d).round(0)}`});

}

window.addEventListener('load', (event) => {
    console.log("MAP loading");

    var covidData = data.filter(function(p){return p.Month == 2});

    const width = 900;
    const height = 600;
    const svg = d3.select("div").append("svg")
        .attr("width", width)
        .attr("height", height);

    const projection = d3.geoAlbersUsa()
        .translate([width / 2, height / 2]) // translate to center of screen
        .scale([1000]); // scale things down so see entire US

    const path = d3.geoPath().projection(projection);

    const colorScale = d3.scaleLinear()
        .domain([0, 500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000])
        //.domain([0,166666.7,333333.3,500000,666666.7,833333.5,1000000])
        .range(["#ffffff", "#fcffa1", "#fbf544", "#fbb844", "#ff4d00", "#ff0000", "#c20404", "#941010"]);

    console.log(colorScale.domain().slice());
    Number.prototype.round = function (decimals) {
        return Number((Math.round(this + "e" + decimals) + "e-" + decimals));
    };

    const tooltip = d3.select(".map").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    function range(start, count) {
        return Array.apply(0, Array(count + 1))
                        .map(function (element, index) {
                            return index + start;
        });
    }


    draw_map();
    console.log("MAP loaded");
});