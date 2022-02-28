/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 


const svg3 = d3
  .select("#csv-scatter")
  	.append("svg") 
	  .attr("width", width-margin.left-margin.right)
	  .attr("height", height - margin.top - margin.bottom)
	  .attr("viewBox", [0, 0, width, height]);

const data3 = d3.csv("data/scatter.csv").then((data) => { 

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
  let xScale3 = d3.scaleLinear()
            .domain(d3.range(data.length))
            .range([margin.left, width - margin.right]);

  svg3.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale3)) 
   .attr("font-size", '20px');  

  svg3.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale3) 
            .tickFormat(i => data[i].day))  
    .attr("font-size", '20px');  

  svg3.selectAll(".circle") 
   .data(data) 
   .enter()  
   .append("circle") 
     .attr("class", "circle") 
     .attr("x", (d) => xScale3(d.day)) 
     .attr("y", (d) => yScale3(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale3(d.score)) 
     .attr("width", xScale3.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);  
});  







