import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carteira } from '../interface/carteira';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {

  private readonly API = `${environment.api_base_url}/wallet`;

  constructor(private http: HttpClient) { }

  consultarCreditos(): Observable<Carteira> {
    return this.http.get<Carteira>(`${this.API}`);
  }

  // POST /wallet/credit
  creditar(value: Number) {
    return this.http.post(`${this.API}/credit`, {"value": value})
  }

  debitar(valorDebito: number) {
    return this.http.post(`${this.API}/debit`, {"value":valorDebito});
  }

}
