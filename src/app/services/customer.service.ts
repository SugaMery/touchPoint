import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../models/customer/customer.module';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  insertCustomer(customer: Customer): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/customers`, customer);
  }
}
