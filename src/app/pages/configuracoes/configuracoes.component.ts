import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbDialogService } from '@nebular/theme';
import { ModalNovoComponent } from './modal-novo/modal-novo.component';
import { ConfiguracoesService } from './service/configuracoes.services';

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
          name: 'edit',
          title: '<i class="nb-edit" title="Editar"></i>'
        },
        {
          name: 'delete',
          title: '<i class="nb-close" title="Excluir"></i>'
        },

      ],
      add: false,
      edit: false,
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
  data: any[];

  constructor(private dialogService: NbDialogService, private configuracoesService: ConfiguracoesService) {

  }

  ngOnInit() {
    this.getLista();
  }


  getLista() {
    this.configuracoesService.getLista().subscribe((analises: any[]) => {
      this.data = analises;
      this.source.load(this.data);
    });
  }

  onCustomAction(event) {
    if (event.action == 'edit') {
      this.configuracoesService.buscar(event.data.id).subscribe((dados: any[]) => {
        console.log(dados);
        //continuar o metodo editar
      });
    } else if (event.action == 'delete') {

    }
    this.dialogService.open(ModalNovoComponent);
  }

  novaFresadora() {
    this.dialogService.open(ModalNovoComponent);
  }
}

