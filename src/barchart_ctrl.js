import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series';
import './css/clock-panel.css!';

export class BarchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    this.events.on('data-received', this.onDataReceived.bind(this));
  }

  onDataReceived(data) {
    console.log('this is my Data');
    console.log(data);
    this.series = data.map(this.seriesHandler.bind(this));
    console.log('this is my formatted Data');
    console.log(this.series);
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
    return 'HHHHHHEEEE';
  }
}

BarchartCtrl.templateUrl = 'module.html';
