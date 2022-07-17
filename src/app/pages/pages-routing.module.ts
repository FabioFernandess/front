import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HistoricoComponent } from './historico/historico.component';
import { ConfiguracoesComponent } from './configuracoes/configuracoes.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'historico',
      component: HistoricoComponent,
    },
    {
      path: 'configuracoes',
      component: ConfiguracoesComponent,
    },
   
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
