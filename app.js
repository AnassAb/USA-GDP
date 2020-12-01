//https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json
//Search for Data
let api_url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

let obj = {};
let arr = [];
let dataset = [];
async function getapi(url) {
  // Storing response
  const response = await fetch(url);

  // Storing data in form of JSON
  var data = await response.json();
  var arr = data.data;

  /*if (response) {
    hideloader();
  }*/
  show(arr);
}
getapi(api_url);
// Function to hide the loader
/*function hideloader() {
  document.getElementById("loading").style.display = "none";
}*/
// Function to define innerHTML for HTML table
function show(data) {
  const w = 1000;
  const h = 500;
  const padding = 50;
  //Scale
  const xScale = d3
    .scaleTime()
    .domain([new Date(1946, 10, 01), new Date(2015, 10, 01)])
    .range([padding, w - padding]);
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data, (d) => d[1])])
    .range([h - padding, padding]);
  //SVG Shapes
  let svg = d3
    .select("#container")
    .append("svg")
    .attr("width", w)
    .attr("height", h);
  //Tooltip
  var div = d3
    .select("#container")
    .append("div")
    .attr("class", "tooltip")
    .style("display", "none");
  function mouseover() {
    div.style("display", "inline");
  }
  function mousemove() {
    var d = d3.select(this).data()[0];
    let str = d[0];
    str = str.replace(/-\d{2}$/g, "");
    str = str.replace(/-01/g, " Q1");
    str = str.replace(/-04/g, " Q2");
    str = str.replace(/-07/g, " Q3");
    str = str.replace(/-10/g, " Q4");
    div
      .html(str + "<hr/>" + "$" + d[1] + " Billion")
      .style("left", d3.select(this).attr("x") + w + "px")
      .style("top", "500px");
  }
  function mouseout() {
    div.style("display", "none");
  }
  //Rect (Bar)
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("height", (d) => h - (yScale(d[1]) + padding))
    .attr("width", 3)
    .attr("x", (d) => xScale(new Date(d[0])))
    .attr("y", (d) => yScale(d[1]))
    .attr("data-date", (d) => d[0])
    .attr("data-gdp", (d) => d[1])
    .on("mouseover", mouseover)
    .on("mousemove", mousemove)
    .on("mouseout", mouseout);

  //Resource Link
  d3.select("#container")
    .append("p")
    .text("More Information: http://www.bea.gov/national/pdf/nipaguid.pdf")
    .attr("id", "info");

  //Axis
  var x_axis = d3.axisBottom().scale(xScale).ticks(20);
  var y_axis = d3.axisLeft().scale(yScale);

  svg
    .append("g")
    .attr("transform", "translate(" + padding + ", 0)")
    .attr("id", "y-axis")
    .call(y_axis);

  let x = h - padding;
  svg
    .append("g")
    .attr("transform", "translate(0, " + x + ")")
    .attr("id", "x-axis")
    .call(x_axis);

  svg
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", padding + 30)
    .attr("x", 0 - h / 2)
    .style("text-anchor", "middle")
    .text("Gross Domestic Product");
}
