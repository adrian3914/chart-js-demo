import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-info-tab',
  templateUrl: './info-tab.component.html',
  styleUrls: ['./info-tab.component.scss']
})
export class InfoTabComponent {
  @Input() heading: string = '';
  @Input() value: number = 0;

}
