import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { ChartModule } from 'angular2-chartjs';

@Component({
  selector: 'ngx-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss'],
})
export class HistoricoComponent {

  settings = {

    actions: {
      custom: [
       
        {
          name: 'editAction',
          title: '<i class="ion-search" title="Visualizar"></i>'
        },
        
      ],
      add: false,
      edit:false,
      delete: false,
    },
    columns: {
      data: {
        title: 'Data',
        type: 'string',
      },
      nome: {
        title: 'Nome',
        type: 'string',
      },
      status: {
        title: 'Status',
        type: 'string',
      },
    },
  };

  //da pra usar serverdatasource
  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService) {
    const data = [
      {
        data: '22/03/2022 14:54:00',
        nome: 'Fresadora 1',
        status: 'ATENÇÂO',
      },
      {
        data: '21/03/2022 14:54:00',
        nome: 'Fresadora 1',
        status: 'OK',
      },
      {
        data: '20/03/2022 14:54:00',
        nome: 'Fresadora 2',
        status: 'OK',
      },
      {
        data: '19/03/2022 14:54:00',
        nome: 'Fresadora 2',
        status: 'OK',
      },

    ];
    this.source.load(data);
  }

  onCustomAction(event) {
    console.log ( event.action) 
   
    this.dialogService.open(ChartDialogComponent, {
      context: {
        title: '22/03/2022 14:54:00 - Fresadora 1',
      },
    });
  }
}

