import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-listagem-locador',
  templateUrl: './listagem-locador.component.html',
  styleUrls: ['./listagem-locador.component.scss']
})
export class ListagemLocadorComponent {

  // usuarios!: Usuario[];

  usuarios: Usuario[] = [
    {
      name: 'felipe',
      username: 'targino_felipe',
      email: 'targino@gmail.com',
      password: '123',
      password_confirmation: '123'
    },
    {
      name: 'outroNome',
      username: 'outroUsername',
      email: 'outro@gmail.com',
      password: '456',
      password_confirmation: '456'
    },
    {
      name: 'Maria Rita',
      username: 'RitinhadaFacada',
      email: 'facada@gmail.com',
      password: '456',
      password_confirmation: '456'
    }
  ];

  displayedColumns: string[] = ['nome', 'username', 'email',];

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ){}

    ngOnInit(){
      this.listar();
    }

  listar(){
    this.usuarios;
  }
}
