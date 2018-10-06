import {MetricsPanelCtrl} from 'app/plugins/sdk';
import TimeSeries from 'app/core/time_series';
import rendering from './rendering';
import './css/clock-panel.css!';

export class BarchartCtrl extends MetricsPanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
    this.dataArray = [];
    this.keyArray = [];
    this.events.on('data-received', this.onDataReceived.bind(this));
  }

  onDataReceived(data) {
    this.dataArray = [];
    this.keyArray = [];
    console.log('this is my Data');
    this.formatData(data);
    this.render();
  }

  formatData(series) {
    const seriesdata = series.map(this.seriesHandler.bind(this));
    const temp = {};
    for (let i = 0; i < series.length; i++) {
      const groupBy = this.getGroupBy(series[i]);

      if (typeof temp[groupBy] === 'undefined') {
        temp[groupBy] = {};
        temp[groupBy].label = groupBy;
        this.dataArray.push(temp[groupBy]);
      }

      const filter = this.getFilter(series[i]);
      temp[groupBy][filter] = seriesdata[i].stats.total;

      if (!this.keyArray.includes(filter)) {
        this.keyArray.push(filter);
      }
    }
    console.log(this.keyArray);
    console.log(this.dataArray);
  }

  getGroupBy(series) {
    let groupBy = series.target;
    if (typeof series.props.filter !== 'undefined') {
      const filter = series.props.filter;
      if (groupBy.includes(filter)) {
        groupBy = groupBy.replace(filter, '');
      }
    }
    return groupBy.trim();
  }

  getFilter(series) {
    if (typeof series.props.filter !== 'undefined') {
      return series.props.filter;
    }
    return 'noFilter';
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

  link(scope, elem, attrs, ctrl) {
    rendering(scope, elem, attrs, ctrl);
  }
}

BarchartCtrl.templateUrl = 'module.html';
