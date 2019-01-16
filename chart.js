var data = [
      { name: "Data Point 1", value: 725156 },
      { name: "Data Point 2", value: 525156 },
      { name: "Data Point 3", value: 245156 },
      { name: "Data Point 4", value: 221151 },
      { name: "Data Point 5", value: 220190 },
      { name: "Data Point 6", value: 171614 },
      { name: "Data Point 7", value: 101165 },
      { name: "Data Point 8", value: 52519}
    ];
var maxValue = 725156;

var chartHeight = data.length * 50;
var chartWidth = 600;
var barWidth = 250;
var nameWidth = 125;

var chart = d3.select('#chart-container')
              .attr('class', 'horizontal-bar')
              .append('svg')
              .attr('width', chartWidth)
              .attr('height', chartHeight)


chart.selectAll('rect')
     .data(data)
     .enter()
     .append('rect')
        .attr('x', nameWidth)
        .attr('y', function(d, i) { return i * 50 + 10; })
        .attr('width', 0)
        .attr('height', 10)
        .attr('rx', 5)
        .attr('ry', 5)
     .transition()
        .duration(600)
        .attr('width', function(d) { return (d.value / maxValue) * barWidth; })

chart.selectAll('text.labels')
     .data(data)
     .enter()
     .append('text')
       .attr('x', 0)
       .attr('y', function(d, i) { return i * 50 + 20; })
       .attr('width', nameWidth)
       .attr('height', 15)
       .text(function(d) { return d.name });

chart.selectAll('text.values')
     .data(data)
     .enter()
     .append('text')
       .attr('x', nameWidth)
       .attr('y', function(d, i) { return (i * 50) + 20; })
       .attr('width', 100)
       .attr('height', 15)
       .text(function(d) { return d3.format(',f')(d.value) })
     .transition()
       .duration(600)
       .attr('x', function(d) { return ((d.value / maxValue) * barWidth ) + nameWidth + 10; })
