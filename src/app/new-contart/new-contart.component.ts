import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../services/customer.service';
import { Customer } from '../models/customer/customer.module';
import { AddressService } from '../services/address.service';
import { Address } from '../models/address/address.module';
import { LocationService } from '../services/location.service';
import { Location } from '../models/location/location.module';
import { AuthService } from '../services/auth.service';
import { OptionsService } from '../services/options.service';
import { NgModel } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
interface forfait {
  name: string;
}

@Component({
  selector: 'app-new-contart',
  templateUrl: './new-contart.component.html',
  styleUrls: ['./new-contart.component.css'],
  providers: [MessageService]
})
export class NewContartComponent implements OnInit {
  value: string | undefined;
  forfaits: forfait[] | undefined;
  contractDate: string = '';

  selectedForfait: forfait | undefined;
  civiliteOptions = [
    { label: 'M.', value: 'M.' },
    { label: 'Mme', value: 'Mme' },
    // Add other salutations as needed
  ];
  selectedCivilite: { label: string, value: string } | undefined;
  nom: string | undefined;
  prenom: string | undefined;
  email: string | undefined;
  telephone: string | undefined;
  dateNaissance: string | undefined;
  societe: string | undefined;
  adresse: string | undefined;
  complementAdresse: string | undefined;
  codePostal: string | undefined;
  ville: string | undefined;
  pays: string | undefined;

  constructor(
    private customerService: CustomerService,
    private addressService: AddressService,
    private locationService: LocationService,
    private authService: AuthService,
    private optionsService: OptionsService,
    private messageService: MessageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.forfaits = [
      { name: 'forfait 1' },
      { name: 'forfait 2' },
      { name: 'forfait 3' },
      { name: 'forfait 4' },
      { name: 'forfait 5' },
    ];
    this.setContractDate();
  }

  private setContractDate() {
    this.contractDate = new Date().toISOString().split('T')[0];
    this.contractDate = 'Date de contrat est : ' + this.contractDate;
  }

  customer: Customer = {
    civility: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    birthdate: '',
    company: '',
  };

  location: Location = {
    zipcode: '',
    city: '',
    country: '',
  };

  address: Address = {
    address_line1: '',
    address_line2: '',
  };

  insertCustomerData(): void {
    if(this.codePostal &&  this.ville && this.pays && this.selectedCivilite?.label && this.nom  && this.address && this.prenom && this.email && this.telephone &&  this.dateNaissance && this.selectedForfait !=null){
      this.location.zipcode = this.codePostal || '';
      this.location.city = this.ville || '';
      this.location.country = this.pays || '';
      
      this.locationService.insertLocation(this.location).subscribe(
        (locationResponse) => {
          console.log('Location inserted successfully:', locationResponse);
    
          const locationId = locationResponse.id;
          this.address.location_id = locationId;
    
          this.address.address_line1 = this.adresse || '';
          this.address.address_line2 = this.complementAdresse || '';
    
          this.addressService.insertAddress(this.address).subscribe(
            (addressResponse) => {
              console.log(this.address);
              console.log('Address inserted successfully:', addressResponse);
    
              const addressId = addressResponse.id;
    
              this.customer.address_id = addressId;
              this.customer.civility = this.selectedCivilite?.label || '';
              this.customer.firstname = this.nom || '';
              this.customer.lastname = this.prenom || '';
              this.customer.email = this.email || '';
              this.customer.phone = this.telephone || '';
              this.customer.birthdate = this.dateNaissance || '';
              this.customer.company = this.societe || '';
    
              this.customerService.insertCustomer(this.customer).subscribe(
                (customerResponse) => {
                  console.log('Customer inserted successfully:', customerResponse);
    
                  const customerId = customerResponse.id;
                  localStorage.setItem('customerId', customerId.toString());
                  const loggedInUserId = this.authService.getSavedUserIdFromLocalStorage();

                  if (loggedInUserId) {
                    const options = {
                      agent_id: loggedInUserId,
                      client_id: customerId,
                      contract_forfait: this.selectedForfait!.name,
                      status: 'A compléter'
                      // ... other option properties
                    };
                  
                    this.optionsService.insertOptions(options).subscribe(
                      (optionsResponse) => {

                        const optionsId = optionsResponse.id;
                        localStorage.setItem('optionsId', optionsId.toString());
                        console.log('Options inserted successfully:', optionsResponse);
                        this.router.navigate(['/coordonnes_bancaires']);

                        // Optionally, navigate to another page or reset the form
                      },
                      (optionsError) => {
                        console.error('Error inserting options:', optionsError);
                      }
                    );
                  } else {
                    console.error('Unable to get logged-in user ID from localStorage');
                  }
                  
                },
                (customerError) => {
                  console.error('Error inserting customer:', customerError);
                }
              );
            },
            (addressError) => {
              console.error('Error inserting address:', addressError);
            }
          );
        },
        (locationError) => {
          console.error('Error inserting location:', locationError);
        }
      );
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Erreur',
        detail: 'Veuillez remplir tous les champs obligatoires.',
      });
    }
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Optionally, navigate to the login page or perform any other actions
  }
  
}
