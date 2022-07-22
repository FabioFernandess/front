import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ChartDialogComponent } from './chart-dialog/chart-dialog.component';
import { ChartModule } from 'angular2-chartjs';
import { HistoricoService } from './service/historico.services';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/filter';

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
      edit: false,
      delete: false,
    },
    columns: {
      data_analise: {
        title: 'Data',
        type: 'string',
      },
      nome_fresadora: {
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
  data: any[];
  idFresadora: number;

  constructor(private dialogService: NbDialogService, private historicoService: HistoricoService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    // this.route.queryParams
    //   .filter(params => params.order)
    //   .subscribe(params => {
    //     console.log(params); // { order: "popular" }

    //     this.idFresadora = params.id;
    //     console.log(params); // popular
    //   }
    //   );
      this.getFresadoras(null);
  }



  getFresadoras(id) {
    this.historicoService.getHistorico(id).subscribe((analises: any[]) => {
      this.data = analises;
      this.source.load(this.data);

    });
  }


  onCustomAction(event) {
    console.log(event.action)

    this.dialogService.open(ChartDialogComponent, {
      context: {
        title: '22/03/2022 14:54:00 - Fresadora 1',
      },
    });
  }
}

