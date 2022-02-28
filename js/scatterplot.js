/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 
// const width = 900; 
// const height = 450; 
// const margin = {left:50, right:50, bottom:50, top:50}; 
// const yTooltipOffset = 15; 

const svg3 = d3
  // select call gets the div with the ID "hard-coded-bar"
  .select("#csv-scatter")
  // append an SVG into the selected div 
  .append("svg")
  // set the SVG's width, height, and viewbox (according to margins) 
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const data3 = d3.csv("data/scatter.csv").then((data) => { 

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function 

  // let's check our data
  console.log(data);   

  svg3.selectAll("circle") 
      .data(data) // this is passed into the anonymous function
      .enter()  
      .append("circle")
        .attr("cx", (d) => { return d.day; }) // use x for cx
        .attr("cy", (d) => { return d.score; }) // use y for cy
        .attr("r", 10);  // set r 

  let maxY3 = d3.max(data, function(d) { return d.score; });   
  let yScale3 = d3.scaleLinear()
            .domain([0,maxY3])
            .range([height-margin.bottom,margin.top]); 
  let xScale3 = d3.scaleBand()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right])
            .padding(0.1);

  svg3.append("g")
    // transform the axis coordinates with the scale to lie within the bar chart range
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale3)) 
   .attr("font-size", '20px');  

  svg3.append("g")
    // transform the axis coordinates with the scale to lie within the bar chart domain
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale3) 
            .tickFormat(i => data[i].name))  
    .attr("font-size", '20px');  

  svg3.selectAll(".circle") 
   .data(data) 
   .enter()  
   // setting up the formatting for the chart, 
   // sets the x and y scales
   // sets the height and width of the visual 
   // adds functionality for visual 
   .append("circle") 
     .attr("class", "circle") 
     .attr("x", (d,i) => xScale3(d.day)) 
     .attr("y", (d) => yScale(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale3(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);  
});  







