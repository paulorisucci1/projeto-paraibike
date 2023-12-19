import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  public currentUser?: Usuario

  private readonly API = `${environment.api_base_url}`;

  constructor(private http: HttpClient) {
  }

  criarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.API}/signup`, {"user": usuario});
  }

  listarUsuarios(){
    return this.http.get<Usuario>(`${this.API}/users`);
  }

  alterarUsuario(usuario: Usuario){
    return this.http.put(`${this.API}/${usuario.username}/users`, usuario);
  }

  getProfile() {
    return this.http.get(`${this.API}/profile`)
  }

}
