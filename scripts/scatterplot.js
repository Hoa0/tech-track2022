import * as d3 from 'd3';


function createScatterPlot(dataset) {
  // Afmetingen van de grafiek.
  const margin = { top: 10, right: 30, bottom: 30, left: 60 },
    width = 460 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;
  
  const svg = d3
    .select('#grafiek')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);
  
  //   d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/2_TwoNum.csv").then( function(data) {
    d3.json(dataset).then( function(data) {
      console.log(data.results)
      data = data.results;
    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, 10])
      .range([ 0, width ]);
  const xAxis = svg.append("g")
  .attr("transform", `translate(0, ${height})`)
  .call(d3.axisBottom(x));
  
  
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, 12000])
      .range([ height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
    // Add a tooltip div. Here I define the general feature of the tooltip: stuff that do not depend on the data point.
    // Its opacity is set to 0: we don't see it by default.
    const tooltip = d3.select("#grafiek")
      .append("div")
      .style("opacity", 0)
      .attr("class", "tooltip")
      .style("background-color", "white")
      .style("border", "solid")
      .style("border-width", "1px")
      .style("border-radius", "5px")
      .style("padding", "10px")
  
  
  
    // A function that change this tooltip when the user hover a point.
    // Its opacity is set to 1: we can now see it. Plus it set the text and position of tooltip depending on the datapoint (d)
    const mouseover = function(event, d) {
      tooltip
        .style("opacity", 1)
    }
  
    const mousemove = function(event, d) {
      tooltip
        .html(`<img src="${posterUrl}${d.poster_path}">${d.title} <br> scored: ${d.vote_average}`)
        .style("left", (event.x)/2 + "px") // It is important to put the +90: other wise the tooltip is exactly where the point is an it creates a weird effect
        .style("top", (event.y)/2 + "px")
    }
  
    // A function that change this tooltip when the leaves a point: just need to set opacity to 0 again
    const mouseleave = function(event,d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", 0)
    }
  
    // Add dots
    svg.append('g')
      .selectAll("dot")
      // .data(data.filter(function(d,i){return i<50})) // the .filter part is just to keep a few dots on the chart, not all of them
      .data(data) // the .filter part is just to keep a few dots on the chart, not all of them
      .enter()
      .append("circle")
        .attr("cx", function (d) { return x(d.vote_average); } )
        .attr("cy", function (d) { return y(d.vote_count); } )
        .attr("r", 7)
        .style("fill", "#69b3a2")
        .style("opacity", 0.3)
        .style("stroke", "white")
      .on("mouseover", mouseover )
      .on("mousemove", mousemove )
      .on("mouseleave", mouseleave )
  
      function updatePlot() {
  
          // Get the value of the button
          let xMax = this.value
      
          // Update X axis
          x.domain([0,xMax])
          xAxis.transition().duration(1000).call(d3.axisBottom(x))
      
          // Update chart
          svg.selectAll("circle")
             .data(data)
             .transition()
             .duration(1000)
             .attr("cx", function (d) { return x(d.vote_average); } )
             .attr("cy", function (d) { return y(d.vote_count); } )
        }
      
        // Add an event listener to the button created in the html part
        d3.select("#maxScore").on("input", updatePlot )
  
  })
  }

  export default createScatterPlot