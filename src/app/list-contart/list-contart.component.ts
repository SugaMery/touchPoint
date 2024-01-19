// list-contart.component.ts

import { Component, OnInit } from '@angular/core';
import { OptionsService } from '../services/options.service';
import { AuthService } from '../services/auth.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-contart',
  templateUrl: './list-contart.component.html',
  styleUrls: ['./list-contart.component.css'],
  providers: [MessageService]

})
export class ListContartComponent implements OnInit {
  agentOptions: any[] = []; // Modify the type based on your data structure

  constructor(
    private optionsService: OptionsService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const agentId = this.authService.getSavedUserIdFromLocalStorage();

    if (agentId !== null) {
      // Get options for a specific agent
      this.optionsService.getOptionsForAgent(agentId).subscribe(
        (data) => {
          this.agentOptions = data.options;
          console.log('Options for agent:', this.agentOptions);
          // Save the agent ID to local storage (if needed)
        },
        (error) => {
          console.error('Error fetching options for agent:', error);
        }
      );
    } else {
      console.error('Agent ID is null. Unable to fetch options.');
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    // Optionally, navigate to the login page or perform any other actions
  }
}
