import { Component } from '@angular/core';
import {Router} from "@angular/router"
import { DashboardService } from './service/dashboard.services';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  
 
  fresadoras: any[];

  constructor(private router: Router,private dashboardService: DashboardService) { 
  }

 
  ngOnInit() {
    this.getFresadoras();
  }

  getFresadoras() {
    this.dashboardService.getFresadoras().subscribe((fresadoras: any[]) => {
      this.fresadoras = fresadoras;
      console.log(this.fresadoras)
    });
  }
  historico(idFresadora: any) {
    this.router.navigate(['/pages/historico'],{ queryParams: { id: idFresadora } });
  }
}

