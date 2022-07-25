import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import {
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
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
      columnTitle: 'Ações',
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
      id: {
        title: 'Identificador',
        type: 'int',
      },
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

  constructor(private dialogService: NbDialogService, private configuracoesService: ConfiguracoesService, private toastrService: NbToastrService) {

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
        //continuar o metodo editar
        this.dialogService.open(ModalNovoComponent, {
          context: {
            data: dados,
            title: 'Editar Fresadora'
          },
        }).onClose.subscribe((resp) => {
          this.getLista();
        });;
      });
    } else if (event.action == 'delete') {
      //alerta perguntando se quer excluir
      if (confirm("Tem certeza que deseja excluir a fresadora?")) {
        this.configuracoesService.excluir(event.data.id).subscribe((dados: any[]) => {
          this.showToast('success', 'Sucesso', 'O item foi excluído!');
          this.getLista();
        }, err => {
          this.showToast('danger', 'Erro', err)
        });
      }
    }
  }

  novaFresadora() {
    this.dialogService.open(ModalNovoComponent, {
      context: {
        title: 'Nova Fresadora'
      },
    }).onClose.subscribe((resp) => {
      this.getLista();
    });
  }

  private showToast(type: string, title: string, body: string) {
    const config = {
      status: type,
      destroyByClick: true,
      duration: 5000,
      hasIcon: true,
      position: NbGlobalPhysicalPosition.TOP_RIGHT,
      preventDuplicates: false,
    };

    this.toastrService.show(
      body,
      title,
      config);
  }
}

