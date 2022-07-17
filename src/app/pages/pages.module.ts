import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { HistoricoModule } from './historico/historico.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ConfiguracoesModule } from './configuracoes/configuracoes.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    HistoricoModule,
    ConfiguracoesModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
