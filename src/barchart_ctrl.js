import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series';
import rendering from './rendering';
import './css/clock-panel.css!';

export class BarchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    this.events.on('data-received', this.onDataReceived.bind(this));
    // this will happen always wenn the chart is rendering unattached from data-received
    // this.events.on('render', this.onRender.bind(this));
  }
  /*
  onRender() {
    console.log('einmalRendern');
  }*/

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
    rendering(scope, elem, attrs, ctrl);
  }
}

BarchartCtrl.templateUrl = 'module.html';
