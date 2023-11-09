import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = `${environment.api_auth_url}/users`;

  constructor(private http: HttpClient) { }

  criarUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.API}`, usuario);
  }

  listarUsuarios(){
    return this.http.get<Usuario>(`${this.API}`);
  }

  alterarUsuario(usuario: Usuario){
    return this.http.put(`${this.API}/${usuario.username}`, usuario);
  }

}
