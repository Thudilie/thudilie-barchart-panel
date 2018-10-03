import * as d3 from 'd3';

export default function link(scope, elem, attrs, ctrl) {
  // if ctrl renders, the renderfunction of this export will be called
  ctrl.events.on('render', function () {
    render(false);
  });

  let index = 0;
  const graph = elem.find('.barchart-graph')[0];
  const myData = [20, 90];
  const baressentials = {'height': 20, 'offset': 5};

  function createSVG() {
    const chartwidth = parseInt(d3.select('#chart').style('width'), 10);
    // this d3method scales the data and makes the chart responsive
    var xScale = d3.scaleLinear()
      .domain([10, d3.max(myData)]) // original information // max number of sequence
      .range([0, chartwidth]); // where we wanne fit it into

    // select chart from html and append a svg
    d3.select('#chart').append('svg').classed('barchart', 'true') // this svg will have the class barchart
    .selectAll('rect').data(myData).enter() // select all what is not created go through data
    .append('rect')
    .attr('width', function (data) { return xScale(data);})
    .attr('height', function () { return baressentials.height;})
    .attr('y', function (data, ind) { return ind * (baressentials.offset + baressentials.height);})
    .classed('bar', 'true');
  }

  function render() {
    d3.select('svg').remove();
    createSVG();
    index += 1;
    graph.innerHTML = 'Hello <b>world</b>!' + index;
  }
}
