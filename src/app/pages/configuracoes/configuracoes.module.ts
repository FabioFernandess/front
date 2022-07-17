import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  NbDialogModule,
  NbInputModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ConfiguracoesComponent } from './configuracoes.component';
import { ModalNovoComponent } from './modal-novo/modal-novo.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    Ng2SmartTableModule,
    NbDialogModule,
    NbInputModule,
  ],
  declarations: [
    ConfiguracoesComponent,
    ModalNovoComponent,
  ],
  providers: [
  ],
  entryComponents: [
    ModalNovoComponent
  ],
})
export class ConfiguracoesModule { }
