import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Login } from '../interface/login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private logadoEm = new BehaviorSubject<boolean>(false);

  private readonly API = 'http://localhost:3000/auth/login';

  estaLogado$ = this.logadoEm.asObservable();

  constructor(private router: Router,
    private http: HttpClient) { }

  criarLogin(login: Login) {
    return this.http.post<Login>(`${this.API}`, login);
  }  

  login(login: Login): void{
    localStorage.setItem('token', login.password);
    this.atualizarLogin();
    this.router.navigate(['/home']);
  }

  sair(): void{
    localStorage.clear();
    this.atualizarLogin();
    this.router.navigate(['/']);
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
