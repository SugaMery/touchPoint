import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { OptionsService } from '../services/options.service';
import Chart, { ChartConfiguration, GridLineOptions } from 'chart.js/auto';
interface ForfaitCounts {
  [forfaitType: string]: number;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  totalContracts: number = 6; // Replace with the actual total number of contracts
  completedContracts: number = 5; // Replace with the actual number of completed contracts
  completionPercentage: number = 0;
  options: any[] = []; // Replace 'any' with the actual type of your options

  forfaitData: any[] = [];
  constructor(private authService: AuthService,private router: Router,private optionsService: OptionsService,
    ) {}
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Optionally, navigate to the login page or perform any other actions
  }

  contractCounts: any = {};



  ngOnInit(): void {
    this.fetchContractCounts();
    this.fetchContractData();
    this.calculateCompletionPercentage();
    this.calculateCompletionPercentage();
    this.fetchCompletedContractsInMonth();
    this.fetchOptionsForAgent();
  }

  fetchContractCounts() {
    const agentId: number = this.authService.getSavedUserIdFromLocalStorage() ?? -1;
  
    this.optionsService.getOptionsForAgent(agentId).subscribe(
      (data) => {
        console.log('Raw data from API:', data);
  
        if (Array.isArray(data.options)) {
          this.contractCounts = this.calculateContractCounts(data.options);
        } else {
          console.error('Invalid data format. Expected an array under "options" key.');
          this.contractCounts = {};
        }
      },
      (error) => {
        console.error('Error fetching contract counts', error);
      }
    );
  }
  
  calculateContractCounts(options: any[]): any {
    const counts = {
      total: options.length,
      complete: options.filter((opt) => opt.status === 'Compléte').length,
      incomplete: options.filter((opt) => opt.status === 'A compléter').length,
      canceled: options.filter((opt) => opt.status === 'canceled').length,
    };
  
    return counts;
  }
  
  fetchContractData(): void {
    const agentId: number = this.authService.getSavedUserIdFromLocalStorage() ?? -1;
  
    this.optionsService.getOptionsForAgent(agentId).subscribe(
      (data) => {
        const totalContractData = this.extractContractDataForWeek(data.options);
        const completedContractData = this.extractCompletedContractDataForWeek(data.options);
      
        this.createChart(totalContractData);
        this.createCompletedContractsLineChart(completedContractData);
      },
      (error) => {
        console.error('Error fetching contract data', error);
      }
    );
  }
  
  extractCompletedContractDataForMonth(options: any[]): number[] {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
    const completedContractsThisMonth = options.filter((option) => {
      const startDate = new Date(option.start_date);
      return startDate >= startOfMonth && startDate <= currentDate && option.status === 'Compléte';
    });
  
    const completedContractsCountByDay = Array(this.getLastDayOfMonth(currentDate)).fill(0);
  
    completedContractsThisMonth.forEach((option) => {
      const startDate = new Date(option.start_date);
      const dayOfMonth = startDate.getDate() - 1;
      completedContractsCountByDay[dayOfMonth]++;
    });
  
    return completedContractsCountByDay;
  }
  
  // Helper function to get the last day of the month
  getLastDayOfMonth(date: Date): number {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  }
  
  extractContractDataForWeek(options: any[]): number[] {
    const currentDate = new Date();
    const startDateOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
  
    const contractsThisWeek = options.filter((option) => {
      const startDate = new Date(option.start_date);
      return startDate >= startDateOfWeek && startDate <= currentDate;
    });
  
    const contractsCountByDay = Array(7).fill(0);
  
    contractsThisWeek.forEach((option) => {
      const startDate = new Date(option.start_date);
      const dayOfWeek = (startDate.getDay() + 6) % 7; // Adjust to start from Monday
      contractsCountByDay[dayOfWeek]++;
    });
  
    return contractsCountByDay;
  }
  
  

  createChart(data: number[]): void {
    const ctx = document.getElementById('contract-chart') as HTMLCanvasElement;

    // Define the grid options with the additional property
    interface CustomGridOptions extends GridLineOptions {
      drawBorder: boolean;
    }

    // Define the chart configuration
    const chartConfig: ChartConfiguration<'bar'> = {
      type: 'bar',
      data: {
        labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
        datasets: [
          {
            label: 'Contrats',
            data,
            backgroundColor: 'rgba(255, 255, 255, .8)',
            maxBarThickness: 6,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: 'rgba(255, 255, 255, .2)',
            },
            ticks: {
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
              color: '#fff',
            },
          },
          x: {
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: 'rgba(255, 255, 255, .2)',
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    };

    const chart = new Chart(ctx, chartConfig);
  }

  extractCompletedContractDataForWeek(options: any[]): number[] {
    const currentDate = new Date();
    const startDateOfWeek = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - currentDate.getDay());
  
    const completedContractsThisWeek = options.filter((option) => {
      const startDate = new Date(option.start_date);
      return startDate >= startDateOfWeek && startDate <= currentDate && option.status === 'Compléte';
    });
  
    const completedContractsCountByDay = Array(7).fill(0);
  
    completedContractsThisWeek.forEach((option) => {
      const startDate = new Date(option.start_date);
      const dayOfWeek = (startDate.getDay() + 6) % 7; // Adjust to start from Monday
      completedContractsCountByDay[dayOfWeek]++;
    });
  
    return completedContractsCountByDay;
  }
  fetchCompletedContractsInMonth(): void {
    const agentId: number = this.authService.getSavedUserIdFromLocalStorage() ?? -1;

    this.optionsService.getOptionsForAgent(agentId).subscribe(
      (data) => {
        const completedContractDataInMonth = this.extractCompletedContractDataInMonth(data.options);

        this.createCompletedContractsMonthLineChart(completedContractDataInMonth);
      },
      (error) => {
        console.error('Error fetching completed contracts in the month', error);
      }
    );
  }
  createCompletedContractsLineChart(data: number[]): void {
    const ctx2 = document.getElementById('chart-line') as HTMLCanvasElement;
  
    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Completed Contracts',
            tension: 0,
            borderWidth: 4, // Adjust the line thickness as needed
            pointRadius: 5,
            pointBackgroundColor: 'rgba(255, 255, 255, .8)',
            pointBorderColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'transparent',
            fill: true,
            data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: 'rgba(255, 255, 255, .2)',
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    };
  
    const chart = new Chart(ctx2, chartConfig);
  }

  calculateCompletionPercentage(): void {
    if (this.totalContracts > 0) {
      this.completionPercentage = (this.completedContracts / this.totalContracts) * 100;
    }
  }


  extractCompletedContractDataInMonth(options: any[]): number[] {
    const currentDate = new Date();
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  
    const completedContractsInMonth = options.filter((option) => {
      const startDate = new Date(option.start_date);
      return startDate >= startOfMonth && startDate <= currentDate && option.status === 'Compléte';
    });
  
    const completedContractsCountByMonth = Array(12).fill(0);
  
    completedContractsInMonth.forEach((option) => {
      const startDate = new Date(option.start_date);
      const monthIndex = startDate.getMonth();
      completedContractsCountByMonth[monthIndex]++;
    });
  
    return completedContractsCountByMonth;
  }
  
  createCompletedContractsMonthLineChart(data: number[]): void {
    const ctx3 = document.getElementById('chart-line-tasks') as HTMLCanvasElement;
  
    const monthLabels = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const chartConfig: ChartConfiguration<'line'> = {
      type: 'line',
      data: {
        labels: monthLabels,
        datasets: [
          {
            label: 'Mobile apps',
            tension: 0,
            borderWidth: 4, // Set the borderWidth here once
            pointRadius: 5,
            pointBackgroundColor: 'rgba(255, 255, 255, .8)',
            pointBorderColor: 'transparent',
            borderColor: 'rgba(255, 255, 255, .8)',
            backgroundColor: 'transparent',
            fill: true,
            data,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        interaction: {
          intersect: false,
          mode: 'index',
        },
        scales: {
          y: {
            grid: {
              display: true,
              drawOnChartArea: true,
              drawTicks: false,
              color: 'rgba(255, 255, 255, .2)',
            },
            ticks: {
              display: true,
              padding: 10,
              color: '#f8f9fa',
              font: {
                size: 14,
                weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
          x: {
            grid: {
              display: false,
              drawOnChartArea: false,
              drawTicks: false,
            },
            ticks: {
              display: true,
              color: '#f8f9fa',
              padding: 10,
              font: {
                size: 14,
                weight: 300,
                family: 'Roboto',
                style: 'normal',
                lineHeight: 2,
              },
            },
          },
        },
      },
    };
  
    const chart = new Chart(ctx3, chartConfig);
  }
  fetchOptionsForAgent(): void {
    const agentId: number = this.authService.getSavedUserIdFromLocalStorage() ?? -1;

    this.optionsService.getOptionsForAgent(agentId).subscribe(
      (data) => {
        this.options = data.options;
        this.processForfaitData();
      },
      (error) => {
        console.error('Error fetching options data', error);
      }
    );
  }


  calculatePrice(forfaitType: string): number {
    // Assuming forfait1 has a price of $11 and forfait2 has a price of $14
    return forfaitType === 'forfait 1' ? 11 : forfaitType === 'forfait 2' ? 14 :  forfaitType === 'forfait 3' ? 19 : 0 ;
  }



  calculateCompletionRatio(count: number): number {
    const totalOptions = this.options.length;
    return totalOptions > 0 ? count / totalOptions : 0;
  }

  processForfaitData(): void {
    const forfaitCounts: ForfaitCounts = {};
  
    this.options.forEach((option) => {
      const forfaitType = option.contract_forfait;
  
      if (forfaitCounts[forfaitType]) {
        forfaitCounts[forfaitType]++;
      } else {
        forfaitCounts[forfaitType] = 1;
      }
    });
  
    this.forfaitData = Object.keys(forfaitCounts).map((forfaitType) => {
      const count = forfaitCounts[forfaitType];
      const price = this.calculatePrice(forfaitType);
      const completionRatio = this.calculateCompletionRatio(count);
  
      return {
        forfaitType,
        count,
        price,
        completionRatio,
        completionPercentage: completionRatio * 100, // Calculate the percentage
      };
    });
  }
  
  capitalizeFirstLetter(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }
  
}
