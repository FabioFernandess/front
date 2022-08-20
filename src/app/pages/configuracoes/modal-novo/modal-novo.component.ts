import { Component, Input, OnDestroy } from '@angular/core';
import {
  NbDialogRef, NbThemeService,
  NbDialogService,
  NbGlobalPhysicalPosition,
  NbToastrService,
} from '@nebular/theme';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ConfiguracoesService } from '../service/configuracoes.services';
@Component({
  selector: 'ngx-chart-dialog',
  templateUrl: 'modal-novo.component.html',
  styleUrls: ['modal-novo.component.scss'],
})
export class ModalNovoComponent {

  @Input() title: string;
  data: any;
  options: any;
  themeSubscription: any;
  form: FormGroup;
  submit: boolean = false;
  nomeFresadoraEdit:string;

  constructor(protected ref: NbDialogRef<ModalNovoComponent>, private theme: NbThemeService, private fb: FormBuilder, private configuracoesService: ConfiguracoesService, private toastrService: NbToastrService) {
    this.data = { id: '', nome: '', valor: '',variavel: 'f6' };
  }
  myForm() {
    this.form = this.fb.group({
      id: [this.data.id],
      nome: [this.data.nome, Validators.required],
      variavel: [this.data.variavel, Validators.required],
      valor: [this.data.valor, Validators.compose([Validators.required, Validators.pattern("[1-9]\\d*")])]
    });
  }

  ngOnInit() {
    this.nomeFresadoraEdit = this.data.nome;
    this.myForm();
  }

  onSubmit() {
    this.submit = true;
    if (this.form.status == 'VALID') {
      if (this.form.value.id == '') {
        this.configuracoesService.salvarFresadora(this.form.value).subscribe((retorno: any[]) => {
          this.showToast('success', 'Sucesso', 'Novo item cadastrado!')
          this.ref.close();
        }, err => {
          this.showToast('danger', 'Erro', err)
        });
      } else {
        this.configuracoesService.editarFresadora(this.form.value).subscribe((retorno: any[]) => {
          this.showToast('success', 'Sucesso', 'Item alterado!')
          this.ref.close();
        }, err => {
          this.showToast('danger', 'Erro', err)
        });
      }
    }
  }

  dismiss() {
    this.ref.close();
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
