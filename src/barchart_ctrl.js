import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series';
import 'jquery';
import './css/clock-panel.css!';

export class BarchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    this.index = 0;
    this.events.on('data-received', this.onDataReceived.bind(this));
    this.events.on('render', this.onRender.bind(this));
  }

  onRender() {
    const graph = this.elem.find('.barchart-graph')[0];
    this.index += 1;
    graph.innerHTML = 'Hello <b>world</b>!' + this.index;
  }

  onDataReceived(data) {
    console.log('this is my Data');
    console.log(data);
    this.series = data.map(this.seriesHandler.bind(this));
    console.log('this is my formatted Data');
    console.log(this.series[0].stats);
    this.render();
  }

  seriesHandler(seriesData) {
    // TimeSeries is needed to get the stats of Grafana
    const series = new TimeSeries({
      datapoints: seriesData.datapoints,
      alias: seriesData.target
    });
    series.flotpairs = series.getFlotPairs(this.panel.nullPointMode);
    return series;
  }

  get message() {
    return JSON.stringify(this.series);
  }

  link(scope, elem, attrs, ctrl) {
    this.elem = elem;
  }
}

BarchartCtrl.templateUrl = 'module.html';
