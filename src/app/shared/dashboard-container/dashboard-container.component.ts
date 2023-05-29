import {Component, OnInit} from '@angular/core';
import ChartDataLabels from 'chartjs-plugin-datalabels'
import 'chartjs-plugin-datalabels'
import {CandidatesService} from "../../services/candidates.service";


@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss']
})
export class DashboardContainerComponent implements OnInit{
  referralPieChart: any;

  constructor(private candidatesService: CandidatesService) {
  }

  ngOnInit(): void {
    this.initReferrals([], []);
    this.candidatesService.fetchReferralsData().subscribe(
      res => {
        const data: number[] = Array.from(res.values())
        const labels: string[] = Array.from(res.keys());
        this.initReferrals(data, labels);
      }
    );
  }

  private initReferrals(data: number[], labels: string[]) {
    this.referralPieChart = {
      data: {
        labels: labels,
        datasets: [{
          label: 'Referrals',
          data: data,
          backgroundColor: [
            'rgb(255, 222, 51)',
            'rgb(235, 52, 83)',
            'rgb(161, 235, 52)',
            'rgb(255, 189, 51)'
          ],
          hoverOffset: 2
        }
        ]
      },
      options :{
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
