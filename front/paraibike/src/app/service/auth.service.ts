import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../interface/login';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logadoEm = new BehaviorSubject<boolean>(false);

  private readonly API = `${environment.api_auth_url}/auth/login`;

  public readonly userId = 1;

  estaLogado$ = this.logadoEm.asObservable();

  constructor(private router: Router,
    private http: HttpClient) { }

  criarLogin(login: Login) {
    return this.http.post<Login>(`${this.API}`, {
      user: {
        "email": login.email,
        "password": login.password
      }
    }, {observe: 'response'});
  }

  login(login: Login): void{
    localStorage.setItem('token', login.password);
    this.atualizarLogin();
    this.router.navigate(['/login']);
  }

  sair(): void{
    localStorage.clear();
    this.atualizarLogin();
    this.router.navigate(['/login']);
  }

  atualizarLogin(): void{
    const token = localStorage.getItem('token');
    if (token) {
      this.logadoEm.next(true);
    } else {
      this.logadoEm.next(false);
    }
  }
}
