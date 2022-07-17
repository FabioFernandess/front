import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ModalNovoComponent } from './modal-novo/modal-novo.component';

@Component({
  selector: 'ngx-configuracoes',
  templateUrl: './configuracoes.component.html',
  styleUrls: ['./configuracoes.component.scss'],
})
export class ConfiguracoesComponent {

  settings = {

    actions: {
      custom: [
        {
          name: 'editAction',
          title: '<i class="nb-edit" title="Editar"></i>'
        },
        
      ],
      add: false,
      edit:false,
      delete: false,
    },
    columns: {
      nome: {
        title: 'Nome',
        type: 'string',
      },
      valor: {
        title: 'Valor',
        type: 'integer',
      },
    },
  };

  //da pra usar serverdatasource
  source: LocalDataSource = new LocalDataSource();

  constructor(private dialogService: NbDialogService) {
    const data = [
      {
        nome: 'Fresadora 1',
        valor: 2000,
      },
      {
        nome: 'Fresadora 2',
        valor: 2000,
      },
      {
        nome: 'Fresadora 3',
        valor: 2000,
      },
      {
        nome: 'Fresadora 4',
        valor: 2000,
      },

    ];
    this.source.load(data);
  }


  onCustomAction(event) {
    this.dialogService.open(ModalNovoComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });   
  }

  novaFresadora() {
    this.dialogService.open(ModalNovoComponent, {
      context: {
        title: 'This is a title passed to the dialog component',
      },
    });
  }
}

