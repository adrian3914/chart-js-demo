import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

interface filterData {
  filterBy: string;
  value: number;
}

const MONTHS = ['Select', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];

@Component({
  selector: 'app-filter-menu',
  templateUrl: './filter-menu.component.html',
  styleUrls: ['./filter-menu.component.scss']
})
export class FilterMenuComponent implements OnInit{
  @Output() filterBy = new EventEmitter<filterData>();
  @Input() dates: Date[] | undefined ;
  years: string[] = [];
  months = MONTHS;


  ngOnInit(): void {
    console.log(this.dates)
    this.initYears();
  }


  onValueSection(month: string) {
    console.log(month)
  }

  onFilteredBy(value: string) {
    console.log(value)
  }

  private initYears() {
    this.dates?.forEach( (d) => {
     this.years?.push(d.toString().split('.')[2]);
    });

   this.years = Array.from(
     new Set(this.years)
   );
  }
}
