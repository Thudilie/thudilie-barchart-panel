export default function link(scope, elem, attrs, ctrl) {
  // if ctrl renders, the renderfunction of this export will be called
  ctrl.events.on('render', function () {
    render(false);
  });

  let index = 0;
  const graph = elem.find('.barchart-graph')[0];

  function render() {
    index += 1;
    graph.innerHTML = 'Hello <b>world</b>!' + index;
  }
}
