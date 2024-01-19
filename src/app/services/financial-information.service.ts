import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FinancialInformation } from '../models/financial-information/financial-information.module';

@Injectable({
  providedIn: 'root',
})
export class FinancialInformationService {
  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  insertFinancialInformation(financialInformation: FinancialInformation): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/financialinformation`, financialInformation);
  }
}
