import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../interface/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private readonly API = 'http://localhost:3000/users';

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
