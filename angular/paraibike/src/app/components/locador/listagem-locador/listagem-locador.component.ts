import { Component } from '@angular/core';
import { Usuario } from 'src/app/interface/usuario';
import { AlertaService } from 'src/app/service/alerta.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-listagem-locador',
  templateUrl: './listagem-locador.component.html',
  styleUrls: ['./listagem-locador.component.scss']
})
export class ListagemLocadorComponent {

  usuarios!: Usuario[];

  displayedColumns: string[] = ['nome', 'nome de usuario', 'email', 'acoes'];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private alertaService: AlertaService
  ) {
    this.usuarios = this.getUsuariosEstaticos();
  }

    ngOnInit(){
      this.listar();
    }

    listar() {
      this.usuarioService.listarUsuarios().subscribe(
        (usuario: Usuario) => {
          this.usuarios.push(usuario);
          console.log(usuario);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    private getUsuariosEstaticos(): Usuario[] {
      return [
        { name: 'Usuário 1', username: 'user1', email: 'user1@example.com', password: 'senha1', password_confirmation: 'senha1' },
        { name: 'Usuário 2', username: 'user2', email: 'user2@example.com', password: 'senha2', password_confirmation: 'senha2' },
      ];
    }

}

