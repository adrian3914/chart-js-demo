import {Component, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import 'chartjs-plugin-datalabels'
import {CandidatesService} from "../../services/candidates.service";
import {combineLatest, map, Observable, of} from "rxjs";
import {ChartData} from "chart.js";
import {FILTER_BY} from "../../constants/filter-criteria";


interface InformationTab {
  id: number;
  heading: string;
  value: number;
}

interface data {
  dates: Date[];
  chartData: any
}

const INFO_DATA: InformationTab[] = [
  {
    "id": 1,
    "heading": "Open Jobs",
    "value": 22
  },
  {
    "id": 2,
    "heading": "Time to Hire (Days)",
    "value": 15
  },
  {
    "id": 3,
    "heading": "Candidates",
    "value": 210
  }
]


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit {
  referralPieChart: any;
  informationTabs: InformationTab[] = INFO_DATA;
  chartData$: Observable<any>  = of(null);
  dates$: Observable<Date[]> | undefined;
  data$: Observable<data> | undefined;


  constructor(private candidatesService: CandidatesService) {
  }

  ngOnInit(): void {
    this.candidatesService.fetchReferralsData(FILTER_BY.month, 11).subscribe(
      res => {
        const data: ChartData = {
          labels: Array.from(res.keys()),
          datasets: [{
            label: 'Referrals',
            data: Array.from(res.values()),
            backgroundColor: [
              'rgb(255, 222, 51)',
              'rgb(235, 52, 83)',
              'rgb(161, 235, 52)',
              'rgb(255, 189, 51)'
            ],
            hoverOffset: 2
          }
          ]
        }
        this.chartData$ = of(data);
        this.initReferrals();
        this.data$ = combineLatest([
          this.candidatesService.fetchCandidateStartDates(),
          this.chartData$])
          .pipe(
            map(([dates, chartData]) => {
              return {
                dates,
                chartData
              }
            })
          );
      }
    );

  }

  private initReferrals() {
    this.referralPieChart = {
      options: {
        plugins: {
          legend: {
            display: true
          }
        }
      },
      plugins: [ChartDataLabels]
    }
  }
}
