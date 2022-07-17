import { Component } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {

  constructor(private router: Router) { }

  historico(idFresadora: any) {
    this.router.navigate(['/pages/historico']);
  }
}

