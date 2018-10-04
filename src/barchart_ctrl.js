import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series';
import rendering from './rendering';
import './css/clock-panel.css!';

export class BarchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    this.neededData = [];
    this.events.on('data-received', this.onDataReceived.bind(this));
  }

  onDataReceived(data) {
    this.neededData = [];
    console.log('this is my Data');
    this.createDataSkeleton(data);
    this.render();
  }

  createDataSkeleton(series) {
    const seriesdata = series.map(this.seriesHandler.bind(this));
    let tempData = {};
    for (let i = 0; i < series.length; i++) {// is the same as seriesdata.length;
      tempData[series[i].target] = {
        target: series[i].target,
        metric: series[i].metric,
        props: series[i].props
      };
      tempData[seriesdata[i].id].metricVal = seriesdata[i].stats.total;
      this.neededData.push(tempData[series[i].target]);
    }
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
