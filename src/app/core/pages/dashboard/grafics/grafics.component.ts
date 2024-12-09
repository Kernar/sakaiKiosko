import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-grafics',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './grafics.component.html',
  styleUrl: './grafics.component.css'
})
export class GraficsComponent {
  userChartData: any;
  incomeChartData: any;
  chartOptions: any;

  constructor() {
    // Configuración para el gráfico de Usuarios
    this.userChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Usuarios Nuevos',
          backgroundColor: '#42A5F5',
          borderColor: '#1E88E5',
          data: [65, 59, 80, 81, 56, 55, 40],
        },
      ],
    };

    // Configuración para el gráfico de Ingresos
    this.incomeChartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'Ingresos Mensuales',
          data: [3200, 4800, 3900, 5800, 4900, 5600, 7000],
          fill: false,
          borderColor: '#FFA726',
          tension: 0.4,
        },
      ],
    };

    // Opciones comunes de gráficos
    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057',
          },
        },
      },
      scales: {
        x: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
        y: {
          ticks: {
            color: '#495057',
          },
          grid: {
            color: '#ebedef',
          },
        },
      },
    };
  }
}
