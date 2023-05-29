import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent {
  @Input() data: any;
  @Input() options: any;
  @Input() type: any;
  @Input() plugins?: any;
}
