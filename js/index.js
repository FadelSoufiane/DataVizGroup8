var margin = {
        top: 10,
        right: 100,
        bottom: 20,
        left: 100
    },
    width = 920 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;
var input = document.getElementById("myInput");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("myBtn").click();
        javascript:alert(input.value)
    }
});
var y = d3.scale.linear()
    .range([height, 0]);

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width], .2);

//
var xAxisScale = d3.scale.linear();
  .domain([1750, 2014])
  .range([ 0, width]);

var xAxis = d3.svg.axis()
    .scale(xAxisScale)
    .orient("bottom")
    ;

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var svg = d3.select("#chart").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data.csv", type, function(error, data) {
    x.domain(data.map(function(d) {
        return d.Year;
    }));
    y.domain(d3.extent(data, function(d) {
        return d.Celsius;
    })).nice();
    data.map(function(d) {
        return d.City;
    });

    svg.selectAll(".bar")
        .data(data)
        .enter().append("rect")
        .attr("class", function(d) {

            if (d.Celsius < 0){
                return "bar negative";
            } else {
                return "bar positive";
            }

        })
        .attr("data-yr", function(d){
            return d.Year;
        })
        .attr("data-c", function(d){
            return d.Celsius;
        })
        .attr("title", function(d){
            return (d.Year + ":          " + d.Celsius + " °C")
        })
        .attr("y", function(d) {

            if (d.Celsius > 0){
                return y(d.Celsius);
            } else {
                return y(0);
            }

        })
        .attr("x", function(d) {
            return x(d.Year);
        })
        .attr("width", x.rangeBand())
        .attr("height", function(d) {
            return Math.abs(y(d.Celsius) - y(0));
        })
        .on("mouseover", function(d){
             //alert("Year: " + d.Year + ": " + d.Celsius + " Celsius");
            d3.select("#_yr")
                .text("Date :   " + d.Year   +"     "  +d.Celsius + "°C" );


        });

    svg.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    svg.append("g")
        .attr("class", "y axis")
        .append("text")
        .text("°Celsius")
        .attr("transform", "translate(15, 40), rotate(-90)")

   svg.append("g")
        .attr("class", "X axis")
        .attr("transform", "translate(" + (margin.left - 3.5) + "," + height + ")")
        .call(x);

    svg.append("g")
        .attr("class", "x axis")
        .append("line")
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("x2", width);

    svg.append("g")
        .attr("class", "infowin")
        .attr("transform", "translate(50, 5)")
        .append("text")
        .attr("id", "_yr");

    svg.append("g")
        .attr("class", "infowin")
        .attr("transform", "translate(110, 5)")
        .append("text")
        .attr("id","degrree");

});


function type(d) {
    d.Celsius = +d.Celsius;
    return d;
}
