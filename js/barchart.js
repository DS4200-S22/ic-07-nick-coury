/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// TODO: What does this code do? 
const svg1 = d3
  // select call gets the div with the ID "hard-coded-bar"
  .select("#hard-coded-bar")
  // append an SVG into the selected div 
  .append("svg")
  // set the SVG's width, height, and viewbox (according to margins) 
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const svg2 = d3
  // select call gets the div with the ID "hard-coded-bar"
  .select("#csv-bar")
  // append an SVG into the selected div 
  .append("svg")
  // set the SVG's width, height, and viewbox (according to margins) 
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

const data2 = d3.csv("data/barchart.csv").then((data) => { 

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function 

  // let's check our data
  console.log(data);   

  svg2.selectAll("rect") 
      .data(data) // this is passed into the anonymous function
      .enter()  
      .append("rect")
        .attr("name", (d) => { return d.name; })
        .attr("score", (d) => { return d.score; }); // fill by color

  let maxY2 = d3.max(data2, function(d) { return d.score; });   
  let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]);   
});

/*

  Axes

*/ 

// TODO: What does this code do? 
// finds the max score among entries in data1
let maxY1 = d3.max(data1, function(d) { return d.score; });


// TODO: What does each line of this code do?  
// creates a Y scale from (0 - maxY1) meaning the max is the top of the chart  
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 
let yScale2 = d3.scaleLinear()
            .domain([0,maxY2])
            .range([height-margin.bottom,margin.top]); 

// TODO: What does each line of this code do? 
// creates an X scale from (0 - length of data1)
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 
let xScale2 = d3.scaleBand()
            .domain(d3.range(data2.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// TODO: What does each line of this code do?  
// appends a Y axis for the SVG representing data1
svg1.append("g")
    // transform the axis coordinates with the scale to lie within the bar chart range
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 
// svg2.append("g")
//     // transform the axis coordinates with the scale to lie within the bar chart range
//    .attr("transform", `translate(${margin.left}, 0)`) 
//    .call(d3.axisLeft(yScale2)) 
//    .attr("font-size", '20px'); 

// TODO: What does each line of this code do? 
// appends an X axis for the SVG representing data1
svg1.append("g")
    // transform the axis coordinates with the scale to lie within the bar chart domain
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 
// svg2.append("g")
//     // transform the axis coordinates with the scale to lie within the bar chart domain
//     .attr("transform", `translate(0,${height - margin.bottom})`) 
//     .call(d3.axisBottom(xScale2) 
//             .tickFormat(i => data2[i].name))  
//     .attr("font-size", '20px'); 


/* 

  Tooltip Set-up  

*/

// TODO: What does each line of this code do? 
// this adds an invisible tooltip for each data entry in the chart
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 



// TODO: What does each line of this code do? 
// this states that when the user mouses over a specific div, populate the tooltip  
// in this case, populate means to make visible, and to show the name and score of an entry
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// TODO: What does each line of this code do? 
// this makes sure that the tooltip box follows the user's cursor 
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// TODO: What does this code do? 
// this states that when the user mouses off a specific div, to make the tooltip invisible again 
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// TODO: What does each line of this code do? 
// this code assigns an entry in the svg for every entry in data1
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   // setting up the formatting for the chart, 
   // sets the x and y scales
   // sets the height and width of the visual 
   // adds functionality for visual 
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

// svg2.selectAll(".bar") 
//    .data(data2) 
//    .enter()  
//    // setting up the formatting for the chart, 
//    // sets the x and y scales
//    // sets the height and width of the visual 
//    // adds functionality for visual 
//    .append("rect") 
//      .attr("class", "bar") 
//      .attr("x", (d,i) => xScale1(i)) 
//      .attr("y", (d) => yScale1(d.score)) 
//      .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
//      .attr("width", xScale1.bandwidth()) 
//      .on("mouseover", mouseover1) 
//      .on("mousemove", mousemove1)
//      .on("mouseleave", mouseleave1);








