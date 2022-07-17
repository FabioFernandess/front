import { Component, Input,OnDestroy } from '@angular/core';
import { NbDialogRef, NbThemeService, NbColorHelper } from '@nebular/theme';

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

  constructor(protected ref: NbDialogRef<ModalNovoComponent>,private theme: NbThemeService) {
    
  }

 

  dismiss() {
    this.ref.close();
  }
}
