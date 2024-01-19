import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Options } from '../models/options/options.module';

@Injectable({
  providedIn: 'root',
})
export class OptionsService {
  private baseUrl = 'http://localhost:3000'; // Replace with your API base URL

  constructor(private http: HttpClient) {}

  insertOptions(options: Options): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/options`, options);
  }

  updateOptionStatus(optionId: number, status: string): Observable<any> {
    const body = { status };
    return this.http.put<any>(`${this.baseUrl}/options/${optionId}/status`, body);
  }

  getOptionsForAgent(agentId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/options/${agentId}`);
  }
}
