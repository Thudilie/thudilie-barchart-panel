import * as d3 from 'd3';

export default function link(scope, elem, attrs, ctrl) {
  // if ctrl renders, the renderfunction of this export will be called
  ctrl.events.on('render', function () {
    render(false);
  });

  let index = 0;
  const graph = elem.find('.barchart-graph')[0];
  const myData = [{ 'width': '20px', 'height': '90px'}, {'width': '90px', 'height': '20px'}];

  function createSVG() {
    d3.select('#chart').append('svg').classed('barchart', 'true')
    .selectAll('rect').data(myData).enter()
    .append('rect')
    .attr('width', function (data) {
      return data.width;
    })
    .attr('height', function (data) {
      return data.height;
    })
    .classed('bar', 'true');
  }

  function render() {
    d3.select('svg').remove();
    createSVG();
    index += 1;
    graph.innerHTML = 'Hello <b>world</b>!' + index;
  }
}
