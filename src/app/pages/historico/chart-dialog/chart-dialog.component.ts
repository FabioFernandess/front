import { Component, Input, OnDestroy } from '@angular/core';
import { NbDialogRef, NbThemeService, NbColorHelper } from '@nebular/theme';
import { HistoricoService } from '../service/historico.services'; 

@Component({
  selector: 'ngx-chart-dialog',
  templateUrl: 'chart-dialog.component.html',
  styleUrls: ['chart-dialog.component.scss'],
})
export class ChartDialogComponent {

  @Input() idAnalise: string;
  title: any;
  data: any;
  options: any;
  themeSubscription: any;
  colors:any;

  constructor(protected ref: NbDialogRef<ChartDialogComponent>, private theme: NbThemeService,private historicoService: HistoricoService) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      const chartjs: any = config.variables.chartjs;

      
      

      this.options = {
        type: 'line',
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          xAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Tempo (s)",
              },

              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              scaleLabel: {
                display: true,
                labelString: "Potência (W)",
              },
              gridLines: {
                display: true,
                color: chartjs.axisLineColor,
              },
              ticks: {
                fontColor: chartjs.textColor,
              },
            },
          ],
        },
        legend: {
          labels: {
            fontColor: chartjs.textColor,
          },
        },
      };
    });
  }

  ngOnInit() {
    this.getArquivo(this.idAnalise);

  }

  getArquivo(id) {
    this.historicoService.getArquivo(id).subscribe((arquivo: any[]) => {
      this.title = arquivo['data'] + ' - ' + arquivo['nome_fresadora']
      console.log(arquivo['data'])
      this.data = {
        labels: arquivo['dados']['tempo'],
        datasets: [
          {
            label: 'Envoltória',
            fill: false,
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.primary, 0.3),
            borderColor: NbColorHelper.hexToRgbA(this.colors.primary, 1),
            data: arquivo['dados']['envelope'],
            pointRadius: 0,
          },
          {
            label: 'Limite inferior',
            fill: false,
            backgroundColor: NbColorHelper.hexToRgbA("#ff6a00", 0.3),
            borderColor: NbColorHelper.hexToRgbA("#ff6a00", 1),
            borderDash: [1, 1],
            data: this.arrayMedia(arquivo['valor_padrao'] * 1.20, arquivo['dados']['envelope'].length),
            pointRadius: 0,
          },
          {
            label: 'Limite Superior',
            fill: false,
            backgroundColor: NbColorHelper.hexToRgbA("#ff6384", 0.3),
            borderColor: NbColorHelper.hexToRgbA("#ff6384", 1),
            borderDash: [1, 1],
            data: this.arrayMedia(arquivo['valor_padrao'] * 0.80, arquivo['dados']['envelope'].length),
            pointRadius: 0,
          },
          {
            label: 'Média',
            fill: false,
            backgroundColor: NbColorHelper.hexToRgbA(this.colors.success, 0.3),
            borderColor: NbColorHelper.hexToRgbA(this.colors.success, 1),
            data: this.arrayMedia(arquivo['dados']['media'], arquivo['dados']['envelope'].length),
            pointRadius: 0,
          },
          {
            label: 'Valor Médio Definido',
            fill: false,
            backgroundColor: NbColorHelper.hexToRgbA('#000000', 0.3),
            borderColor: NbColorHelper.hexToRgbA('#000000', 1),
            data: this.arrayMedia(arquivo['valor_padrao'], arquivo['dados']['envelope'].length),
            pointRadius: 0,
          },
        ],
      };
      // console.log(this.data);
      // this.source.load(this.data);

    });
  }

  arrayMedia(val, len) {
    var i = 0;
    var media = [];
    for (i = 0; i < len; i++) {
      media.push(val);
    }
    return media;
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  dismiss() {
    this.ref.close();
  }
}
