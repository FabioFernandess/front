import { Component, Input, OnDestroy } from '@angular/core';
import { NbDialogRef, NbThemeService, NbColorHelper } from '@nebular/theme';
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
  submit:boolean = false;

  constructor(protected ref: NbDialogRef<ModalNovoComponent>, private theme: NbThemeService, private fb: FormBuilder, private configuracoesService: ConfiguracoesService) {
    this.myForm();


  }
  myForm() {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      valor: ['', Validators.compose([Validators.required, Validators.pattern("[1-9]\\d*")])]
    });
  }

  onSubmit() {
    this.submit = true;
    if (this.form.status == 'VALID') {

      this.configuracoesService.salvarFresadora(this.form.value).subscribe((retorno: any[]) => {
        console.log(retorno)
      });
    }
  }

  dismiss() {
    this.ref.close();
  }
}
