import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditosService {
  
  // verificar endpoint
  private readonly API = `${environment.api_auth_url}/creditos`;

  constructor(private http: HttpClient) { }

  comprarCreditos() {

  }

  consultarCreditos() {
    
  }
}
