import covidData from '../static/covid19_us.csv' // import covid 19 US data
"use strict"

var covidArray = [];
var csv412Array = [];
const abbrStates = {
  'Alabama': "AL",
  'Alaska': "AK",
  'Arizona': "AZ",
  'Arkansas': "AR",
  'California': "CA",
  'Colorado': "CO",
  'Connecticut': "CT",
  'Delaware': "DE",
  'Diamond Princess': "DPShip",  // the ship
  'District of Columbia': "DC",
  'Florida': "FL",
  'Georgia': "GA",
  'Grand Princess': "GPShip",  // the other ship
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
}

// const abbrStates = {
//   Alabama: "AL",
//   Alaska: "AK",
//   Arizona: "AZ",
//   Arkansas: "AR",
//   California: "CA",
//   Colorado: "CO",
//   Connecticut: "CT",
//   Delaware: "DE",
//   "Diamond Princess": "DPShip",  // the ship
//   "District of Columbia": "DC",
//   Florida: "FL",
//   Georgia: "GA",
//   "Grand Princess": "GPShip",  // the other ship
//   Guam: "GU",
//   Hawaii: "HI",
//   Idaho: "ID",
//   Illinois: "IL",
//   Indiana: "IN",
//   Iowa: "IA",
//   Kansas: "KS",
//   Kentucky: "KY",
//   Louisiana: "LA",
//   Maine: "ME",
//   Maryland: "MD",
//   Massachusetts: "MA",
//   Michigan: "MI",
//   Minnesota: "MN",
//   Mississippi: "MS",
//   Missouri: "MO",
//   Montana: "MT",
//   Nebraska: "NE",
//   Nevada: "NV",
//   "New Hampshire": "NH",
//   "New Jersey": "NJ",
//   "New Mexico": "NM",
//   "New York": "NY",
//   "North Carolina": "NC",
//   "North Dakota": "ND",
//   Ohio: "OH",
//   Oklahoma: "OK",
//   Oregon: "OR",
//   Pennsylvania: "PA",
//   "Puerto Rico": "PR",
//   "Rhode Island": "RI",
//   "South Carolina": "SC",
//   "South Dakota": "SD",
//   Tennessee: "TN",
//   Texas: "TX",
//   Utah: "UT",
//   Vermont: "VT",
//   Virginia: "VA",
//   Washington: "WA",
//   "West Virginia": "WV",
//   Wisconsin: "WI",
//   Wyoming: "WY",
//   "Northern Mariana Islands": "MP"
// }

const svg = d3.select('svg')
              .attr("id", "dd3bar-chart");
const svgContainer = d3.select('#dd3-bar');

const margin = 80;
const width = 4000 - 2 * margin;
const height = 800 - 2 * margin;

const chart = svg.append('g')
  .attr('transform', `translate(${margin}, ${margin})`);

d3.csv(covidData).then(function(data) {
  data.forEach(function(d){
    covidArray.push(d);
  });
  data.forEach(function(d){
    if (d["Source.Name"] == "01-12-2021.csv") csv412Array.push(d);
  });
  console.log(csv412Array);  // all the states for a single day
  console.log("The # of rows of the covid US data: " + covidArray.length);
  console.log("Example row: ");
  console.log(covidArray[0]);  // covidArray is an array of objects now
  // method to find the max value of a column
  console.log(d3.max(covidArray, d => +d["Confirmed"]));

  const xScale = d3.scaleBand()
    .range([0, width])
    .domain(covidArray.map((d) => abbrStates[d.Province_State]));
  const makeXLines = () => d3.axisBottom()
      .scale(xScale)

  const yScale = d3.scaleLinear()
    .range([height, 0])
    .domain([0, 3600000]);
  const makeYLines = () => d3.axisLeft()
    .scale(yScale)


  chart.append('g')
    .attr('transform', `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));
  chart.append('g')
    .call(d3.axisLeft(yScale));

  chart.append('g')
    // .attr('class', 'grid')
    .call(makeYLines()
      .tickSize(-width, 0, 0)
      .tickFormat('')
    )

  const barGroups = chart.selectAll()
    .data(csv412Array)
    .enter()
    .append('g')

  barGroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (g) => xScale(abbrStates[g.Province_State]))
    .attr('y', (g) => yScale(g.Confirmed))
    .attr('height', (g) => height - yScale(g.Confirmed))
    .attr('width', xScale.bandwidth())
    .on('mouseenter', function (mouseEvent, d) {  // mouseEnter event
      // console.log(d);
      d3.selectAll('.value')
        .attr('opacity', 0)

      d3.select(this)
          .transition()
          .duration(300)
          .attr('opacity', 0.6)
          .attr('x', (d) => xScale(abbrStates[d.Province_State]) - 5)
          .attr('width', xScale.bandwidth() + 10)

      const y = yScale(d.Confirmed)

      chart.append('line')  // line = ...
          .attr('id', 'limit')
          .attr('x1', 0)
          .attr('y1', y)
          .attr('x2', width)
          .attr('y2', y)

      barGroups.append('text')
        .attr('class', 'divergence')
        .attr('x', (d) => xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2)
        .attr('y', (d) => yScale(d.Confirmed) - 10)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .text((thisD, idx) => {
          const divergence = (thisD.Confirmed - d.Confirmed).toFixed(1)
          let text = ''
          if (divergence > 0) text += '+'
          text += +`${divergence}`

          // hide the text of the current bar
          return thisD.Province_State !== d.Province_State ? text : '';
        })
    })
    .on('mouseleave', function () {
      d3.selectAll('.value')
        .attr('opacity', 1)

      d3.select(this)
        .transition()
        .duration(300)
        .attr('opacity', 1)
        .attr('x', (d) => xScale(abbrStates[d.Province_State]))
        .attr('width', xScale.bandwidth())

      chart.selectAll('#limit').remove()
      chart.selectAll('.divergence').remove()
    })

    barGroups
      .append('text')
      .attr('class', 'value')
      .attr('x', (d) => xScale(abbrStates[d.Province_State]) + xScale.bandwidth() / 2)
      .attr('y', (d) => yScale(d.Confirmed) - 10)
      .attr('text-anchor', 'middle')
      .text((d) => +`${d.Confirmed}`)
});


// const xScale = d3.scaleBand()
//   .range([0, width])
//   .domain(covidArray.map((d) => d.Province_State));
  // .padding(0.4)

// vertical grid lines
// const makeXLines = () => d3.axisBottom()
//   .scale(xScale)

// vertical grid lines
// chart.append('g')
//   .attr('class', 'grid')
//   .attr('transform', `translate(0, ${height})`)
//   .call(makeXLines()
//     .tickSize(-height, 0, 0)
//     .tickFormat('')
//   )



svg
  .append('text')
  .attr('class', 'label')
  .attr('x', -(height / 2) - margin)
  .attr('y', margin / 4)
  .attr('transform', 'rotate(-90)')
  .attr('text-anchor', 'middle')
  .text('# of people confirmed')

svg.append('text')
  .attr('class', 'label')
  .attr('x', width / 10 + margin)
  .attr('y', height + margin * 1.7)
  .attr('text-anchor', 'middle')
  .text('States')
//
// svg.append('text')
//   .attr('class', 'title')
//   .attr('x', width / 2 + margin)
//   .attr('y', 40)
//   .attr('text-anchor', 'middle')
//   .text('Most loved programming languages in 2018')

// svg.append('text')
//   .attr('class', 'source')
//   .attr('x', width - margin / 2)
//   .attr('y', height + margin * 1.7)
//   .attr('text-anchor', 'start')
//   .text('Source: Stack Overflow, 2018')
