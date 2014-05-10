function makeGraph(name, dataset) {
    var w = 400;
    var h = 375;
    var padding = 50;
    
    var xScale = d3.scale.linear()
        .domain([0, d3.max(dataset)])
        .range([padding, w - padding]);
    
    var yScale = d3.scale.linear()
        .domain([d3.min(dataset) - 5, d3.max(dataset) + 5])
        .range([h - padding, padding]); 
    
    var yAxis = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5)
        .tickSize(0)
        .tickPadding(10);
    
    var line = d3.svg.line()
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
        .attr("width", w)
        .attr("height", h)
        .attr("fill", jQuery.inArray(0, dataset) === -1 ? 'white' : 'red')
        .attr("stroke", "black")
        .attr("stroke-width", "6px");

    var lines = svg.append("path")
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
        .attr("r", 5)
        .attr("fill", "white")
        .attr("stroke", "rgb(16,78,109)")
        .attr("stroke-width", "3px");
    
    //Y Axis
    svg.append("g")
        .attr("class", "yaxis")
        .attr("transform", "translate(" + padding + ", 0)")
        .call(yAxis);
    svg.append("line")
        .attr("class", "yaxisline")
        .attr("x1", padding)
        .attr("y1", padding)
        .attr("x2", padding)
        .attr("y2", h - padding);

    svg.append("text")
        .attr("class", "label")
        .attr("x", w / 2)
        .attr("y", padding / 1.5)
        .style("text-anchor", "middle")
        .text(name);
};

makeGraph("NUMBER OF USERS (IN MILLIONS)", [10, 0, 0, 40, 30, 7, 8, 9]);
makeGraph("THE APDEX IS OFF THE ROOF", [40, 10, 10, 20, 90]);
displayNum("SO MUCH APDEX", 0.9);

function displayNum(name, dataset) {
    var w = 400;
    var h = 375;
    var padding = 50;
    
    var svg = d3.select(".clear")
        .append("div")
        .attr("class", "floating")
        .append("svg")
        .attr("width", w)
        .attr("height", h);

    var rect = svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", w)
        .attr("height", h)
        .attr("fill", (dataset < 0.9) ? "red" : "white")
        .attr("stroke", "black")
        .attr("stroke-width", "6px");
    
    svg.append("text")
        .attr("x", w / 2)
        .attr("y", h - 250 / 2)
        .attr("font-size", "100")
        .attr("font-weight", "lighter")
        .attr("fill", (dataset < 0.9) ? "white" : "black")
        .style("text-anchor", "middle")
        .text(dataset);
    
    svg.append("text")
        .attr("class", "label")
        .attr("x", w / 2)
        .attr("y", padding / 1.5)
        .style("text-anchor", "middle")
        .text(name);
};