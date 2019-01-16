const width2 = 550, height2 = 550;

const projection2 = d3.geoOrthographic()
    .scale(200)
    .translate([width2 / 2, height2 / 2])
    .clipAngle(90) // without this options countries on the other side are visible
    .precision(.1)
    .rotate([0,0,0]);

const path2 = d3.geoPath()
    .projection(projection2);

const svg2 = d3.select("#map2").append("svg")
    .attr("id", "world")
    .attr("width", width2)
    .attr("height", height2);

const graticule2 = d3.geoGraticule();

svg2.append("path")
    .datum(graticule2)
    .attr("class", "graticule")
    .attr("d", path2);

d3.json("json/world-countries.json", function(collection) {
    var countries = svg2.selectAll("path")
        .data(collection.features)
        .enter().append("path")
        .attr("d", path2)
        .attr("class", "country")
        .attr("class", function(d) {return d.id;});

    d3.csv("csv/world-temperature(1750).csv", function(data) {
        var quantile = d3.scale.quantile().domain([
            d3.min(data, function(e) { return +e.temperature; }),
            d3.max(data, function(e) { return +e.temperature; })])
            .range(d3.range(60));

        var legend = svg2.append('g')
            .attr('transform', 'translate(35, 10)')
            .attr('id', 'legend');

        legend.selectAll('.colorbar') // LIGNE 11
            .data(d3.range(60))
            .enter().append('rect')
            .attr('y', function(d) { return d * 5 + 'px'; })
            .attr('height', '5px')
            .attr('width', '20px')
            .attr('x', '0px')
            .attr("class", function(d) { return "temperature-" + d; });

        legendScale = d3.scaleLinear()
            .domain([d3.min(data, function(e) { return +e.temperature; }), d3.max(data, function(e) { return +e.temperature; })])
            .range([0, 60 * 5]);

        svg2.append("g")
            .attr('transform', 'translate(25, 10)')
            .call(d3.axisLeft(legendScale).ticks(10));

        data.forEach(function(e,i) {
            d3.select("." + e.country) // LIGNE 29
                .attr("class", function(d) { return "country temperature-" + quantile(+e.temperature); });
        });
    });
});

const λ2 = d3.scale.linear()
    .domain([0, width2])
    .range([-180, 180]);

const φ2 = d3.scale.linear()
    .domain([0, height2])
    .range([90, -90]);

var drag = d3.drag().subject(function() {
    var r = projection2.rotate();
    return {
        x: λ.invert(r[0]),
        y: φ.invert(r[1])
    };
}).on("drag", function() {
    projection2.rotate([λ2(d3.event.x), φ2(d3.event.y)]);

    svg2.selectAll(".graticule")
        .datum(graticule2)
        .attr("d", path2);

    svg2.selectAll(".country")
        .attr("d", path2);
});

svg2.call(drag);
