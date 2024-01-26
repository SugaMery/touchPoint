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
      { name: '1' },
      { name: '2' },
      { name: '3' },

    ];
    this.setContractDate();
  }

  handleFileInputChange(event: any) {
    const fileInput = event.target;
    
    if (fileInput.files && fileInput.files.length > 0) {
      this.selectedFileName = fileInput.files[0].name;

      // Perform any additional actions related to file selection if needed
    }
  }
  private setContractDate() {
    this.contractDate = new Date().toISOString().split('T')[0];
    this.contractDate = 'Date de contrat est : ' + this.contractDate;
  }
  selectedFileName: string | undefined;

  onFileSelect(event: { files: any[]; }): void {
    // Handle the selected file
    const file = event.files[0];
    this.selectedFileName = file ? file.name : '';
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


    this.router.navigate(['/list_files']);
  
  
  
  }
  

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Optionally, navigate to the login page or perform any other actions
  }
  
}
