import { Component } from '@angular/core';
import {Router} from "@angular/router"
import { DashboardService } from './service/dashboard.services';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  
 
  cars: any[];

  constructor(private router: Router,private dashboardService: DashboardService) { 
  }

 
  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.dashboardService.getCars().subscribe((cars: any[]) => {
      this.cars = cars;
      console.log(this.cars)
    });
  }
  historico(idFresadora: any) {
    this.router.navigate(['/pages/historico']);
  }
}

