import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Carteira } from '../interface/carteira';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  
  private readonly API = `${environment.api_auth_url}/wallet`;

  constructor(private http: HttpClient) { }

  consultarCreditos(): Observable<Carteira> {
    return this.http.get<Carteira>(`${this.API}`);
  }

  debitar(valorDebito: number) {
    return this.http.post(`${this.API}`, {valorDebito});
  }

  // POST /wallet/credit 
  comprarCreditos() {
    return this.http.post(`${this.API}/credit`, {});
  }
  
}
