import {PanelCtrl} from 'app/plugins/sdk';
import './css/clock-panel.css!';

export class BarchartCtrl extends PanelCtrl {
  constructor($scope, $injector) {
    super($scope, $injector);
  }
}

BarchartCtrl.templateUrl = 'module.html';
