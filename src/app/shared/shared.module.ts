import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import {NgChartsModule} from "ng2-charts";
import {RouterModule, Routes} from "@angular/router";
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import {HttpClientModule} from "@angular/common/http";
import { InfoTabComponent } from './info-tab/info-tab.component';
import { FilterMenuComponent } from './filter-menu/filter-menu.component';


const SHARED_ROUTES: Routes = [
  {
    path: '',
    component: DashboardContainerComponent
  }
];

@NgModule({
  declarations: [
    ChartComponent,
    DashboardContainerComponent,
    InfoTabComponent,
    FilterMenuComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    RouterModule.forChild(SHARED_ROUTES),
    HttpClientModule
  ]
})
export class SharedModule { }
