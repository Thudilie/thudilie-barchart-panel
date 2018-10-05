import * as d3 from 'd3';

export default function link(scope, elem, attrs, ctrl) {
  // if ctrl renders, the renderfunction of this export will be called
  ctrl.events.on('render', function () {
    render(false);
  });

  let index = 0;
  const graph = elem.find('.barchart-graph')[0];

  function createSVG() {
    const keys = [ 'Under 5 Years', '5 to 13 Years', '14 to 17 Years' ];
    const myData = defaultData();
    const chartwidth = parseInt(d3.select('#chart').style('width'), 10);
    const chartheight = parseInt(d3.select('#chart').style('height'), 10);

    // this d3method scales the data and makes the chart responsive
    var xScale = d3.scaleLinear()
      .domain([0, d3.max(myData, function(d) { return d.total; })]) // original information // max number of sequence
      .range([0, chartwidth]); // where we wanne fit it into

    var yScale = d3.scaleBand()
      .domain(d3.range(0, myData.length))
      .range([0, chartheight])
      .padding(0.2);

    const colors = d3.scaleOrdinal().range(['red', 'green', 'grey']);

    // select chart from html and append a svg
    let svg = d3.select('#chart').append('svg').classed('barchart', 'true'); // this svg will have the class barchart

    svg.append('g')
    .selectAll('g')
    .data(d3.stack().keys(keys)(myData))
    .enter().append('g')
      .attr('fill', function (d) { return colors(d.key); })
    .selectAll('rect')
    .data(function (d) { return d; })
    .enter().append('rect')
    .attr('y', function (data, ind) { return yScale(ind);})
    .attr('x', function (d) {
      return xScale(d[0])
    })
    .attr('height', function () { return yScale.bandwidth();})
    .attr('width', function (d) {
      const raw = xScale(d[1]) - xScale(d[0]);
      return raw;
    });
  }

  function defaultData() {
    const datalist = [{
      'State': 'AK',
      'Under 5 Years': 52,
      '5 to 13 Years': 85,
      '14 to 17 Years': 42,
      'total': 179
    },
      {
        'State': 'AL',
        'Under 5 Years': 31,
        '5 to 13 Years': 55,
        '14 to 17 Years': 25,
        'total': 111
      }];
    return datalist
  }

  function render() {
    d3.select('svg').remove();
    createSVG();
    index += 1;
    graph.innerHTML = 'Hello <b>world</b>!' + index;
  }
}
