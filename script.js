function makeLineGraph(name, dataset) {
    var w = 400; //width
    var h = 375; //height
    var padding = 50; //padding inside the svg container
    
    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([padding, w - padding]);
    
    var yScale = d3.scale.linear()
        .domain([d3.min(dataset) - 5, d3.max(dataset) + 5])
        .range([h - padding, padding]); 
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5) //roughly how many numbers in the y axis? (d3 will give around that number)
        .tickSize(0) //increase tick size to create visible ticks in the yAxis
        .tickPadding(10); //how far to the left the numbers are from the yAxis
    
    var line = d3.svg.line() //this function plots the line graph
        .x(function(d, i) { return (i + 1) * (w / (dataset.length + 1)) + 22; })
        .y(function(d) { return yScale(d); });
    
    var svg = d3.select(".clear")
        .append("div")
        .attr("class", "floating")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
            
    var rect = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w) //this is the border box
        .attr("height", h)
        .attr("fill", "white") //change the fill
        .attr("stroke", "black") //and the stroke
        .attr("stroke-width", "6px"); //and how thick the stroke is

    var lines = svg.append("path") //creates the line graph. delete this to delete the connected lines.
          .datum(dataset)
          .attr("class", "line")
          .attr("d", line);

    var circles = svg.selectAll("circle")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("cx", function(d, i) {
            return (i + 1) * (w / (dataset.length + 1)) + 22
        })
        .attr("cy", function(d) {
            return yScale(d);
        })
        .attr("r", 5) //change size of circle by setting radius (r)
        .attr("fill", "white") //change fill
        .attr("stroke", "rgb(16,78,109)") //change stroke color
        .attr("stroke-width", "3px"); // change thickness of stroke
    
    //Y Axis
    svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
    
    svg.append("line") //I replaced the default yAxis with my custom line 
        .attr("class", "yaxisline") //style the custom line in the css .yaxisline {}
        .attr("x1", padding) //starting x value
        .attr("y1", 0) //starting y value
        .attr("x2", padding) //ending x value
        .attr("y2", h); //ending y value

    svg.append("text") //this is the title of the chart
        .attr("class", "label") //change styling in css .label{}
        .attr("x", w / 2)
        .attr("y", padding / 1.5)
        .style("text-anchor", "middle")
        .text(name);
};

function displayNum(name, dataset) {
    var w = 400; //width of graph
    var h = 375; //heigh of graph
    var padding = 50; //padding
    
    var svg = d3.select(".clear")
        .append("div")
        .attr("class", "floating")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var rect = svg.append("rect") //bounding box border
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h)
        .attr("fill", "white") //color of fill
        .attr("stroke", "black") //stroke color
        .attr("stroke-width", "6px"); //stroke thickness
    
    svg.append("text") //value
        .attr("x", w / 2)
        .attr("y", h - 250 / 2)
        .attr("font-size", "100")
        .attr("font-weight", "lighter")
        .attr("fill", "black")
        .style("text-anchor", "middle")
        .text(dataset);
    
    svg.append("text") //title of graph
        .attr("class", "label")
        .attr("x", w / 2)
        .attr("y", padding / 1.5)
        .style("text-anchor", "middle")
        .text(name);
};