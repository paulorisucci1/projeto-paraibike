import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/interface/usuario';
import { UsuarioService } from 'src/app/service/usuario.service';
import { AlertaService } from 'src/app/service/alerta.service';

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
      private usuarioService: UsuarioService,
      private alertaService: AlertaService
    ) {}

    get name() {
      return this.formulario.get('name');
    }

    enviar(){
      const usuario: Usuario = this.formulario.value as Usuario;

      if (this.formulario.get('password')?.value != this.formulario.get('password_confirmation')?.value) {
        this.alertaService.alertaErro("Confirmação de senha inválida");
        return;
      }

      if (this.formulario.invalid) {
        this.alertaService.alertaErro("Preencha todos os campos");
        return;
      }

      this.usuarioService.criarUsuario(usuario).subscribe(() => {
        this.alertaService.alertaSucesso("Conta criada com sucesso");
        this.router.navigate(['/']);
      }, (error) => {
        console.log(error);
      });
    }

}
