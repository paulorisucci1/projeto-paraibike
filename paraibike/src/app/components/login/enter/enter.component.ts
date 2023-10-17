import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interface/login';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-enter',
  templateUrl: './enter.component.html',
  styleUrls: ['./enter.component.scss']
})
export class EnterComponent {

  login!: Login;

  formulario = new FormGroup({
    email: new FormControl('', Validators.email),
    password: new FormControl('', Validators.required),
  })

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  enviar(): void {
    const login: Login = this.formulario.value as Login;

    this.authService.criarLogin(login).subscribe((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
        this.router.navigate(['/listar-bicicletas']);
      } else {
        console.log("Erro ao logar");
      }
    }, (error) => {
      console.log(error);
    });
  }

  criarConta() {
    this.router.navigate(['/cadastro']);
  }

}
