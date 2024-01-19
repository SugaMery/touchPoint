import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FinancialInformationService } from '../services/financial-information.service';
import { FinancialInformation } from '../models/financial-information/financial-information.module';
import { OptionsService } from '../services/options.service';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-coordonnes-bancaires',
  templateUrl: './coordonnes-bancaires.component.html',
  styleUrl: './coordonnes-bancaires.component.css',
  providers: [MessageService]
})
export class CoordonnesBancairesComponent {

  // New properties for IBAN, BIC, and Jour de Prélèvement
  iban: string| undefined;
  bic: string| undefined;
  jourDePrelevementOptions: any[] = [
    { label: '5', value: 5 },
    { label: '10', value: 10 },
    { label: '15', value: 15 },
    { label: '20', value: 20 },
    // Add more options as needed
  ];
  
  constructor(
    private financialInformationService :FinancialInformationService,
    private messageService: MessageService,
    private router: Router,
    private optionsService: OptionsService,
    private authService: AuthService
  ) {}

  selectedJourDePrelevement:  { label: string, value: string } | undefined;

  financialInformation: FinancialInformation = {
  iban:'',
  bic:'',
  };
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Optionally, navigate to the login page or perform any other actions
  }
  insertCustomerData(): void {
    if (this.bic && this.iban && this.selectedJourDePrelevement != null) {
      this.financialInformation.bic = this.bic || '';
      this.financialInformation.iban = this.iban || '';
      this.financialInformation.payment_day = this.selectedJourDePrelevement.label || '';
  
      // Retrieve customerId from localStorage
      const customerId = localStorage.getItem('customerId');
  
      if (customerId) {
        // Parse the customerId as a number
        const parsedCustomerId = parseInt(customerId, 10);
  
        // Check if parsing was successful
        if (!isNaN(parsedCustomerId)) {
          // Assign the customerId to financialInformation
          this.financialInformation.customer_id = parsedCustomerId;
  
          // Retrieve optionId from localStorage
          const optionsId = localStorage.getItem('optionsId');
  
          if (optionsId) {
            // Insert financialInformation
            this.financialInformationService.insertFinancialInformation(this.financialInformation).subscribe(
              (financialInformationResponse) => {
                console.log('financialInformation inserted successfully:', financialInformationResponse);
  
                // Update option status to "complete"
                this.optionsService.updateOptionStatus(Number(optionsId), 'Compléte').subscribe(
                  (updateResponse) => {
                    console.log('Option status updated to complete:', updateResponse);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Informations sauvegardées avec succès.' });
                    this.router.navigate(['/list_contart']);

                  },
                  (updateError) => {
                    console.error('Error updating option status:', updateError);
                  }
                );
  
              },
              (financialInformationError) => {
                console.error('Error inserting financialInformation:', financialInformationError);
              }
            );
          } else {
            console.error('OptionId not found in localStorage');
          }
        } else {
          console.error('Error parsing customerId from localStorage');
        }
      } else {
        console.error('customerId not found in localStorage');
      }
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires.',
      });
    }
  }
  
  
  }

