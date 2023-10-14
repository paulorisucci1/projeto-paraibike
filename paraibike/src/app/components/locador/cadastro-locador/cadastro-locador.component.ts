import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-cadastro-locador',
  templateUrl: './cadastro-locador.component.html',
  styleUrls: ['./cadastro-locador.component.scss']
})
export class CadastroLocadorComponent {

    usuarios: Usuario[] | undefined;
  
    idUsuario = 0;

    formulario = new FormGroup({
      name: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.email),
      password: new FormControl('', Validators.required),
      password_confirmation: new FormControl('', Validators.required)
    })
  
    constructor(
      private router: Router,
      private route: ActivatedRoute,
      private usuarioService: UsuarioService
    ) {}

    enviar(){
      const usuario: Usuario = this.formulario.value as Usuario;

      this.usuarioService.criarUsuario(usuario).subscribe(() => {
        console.log("Usuario criado");
      }, (error) => {
        console.log(error);
      });
    }
}
