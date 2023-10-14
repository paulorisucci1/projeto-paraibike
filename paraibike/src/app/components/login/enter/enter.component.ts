import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
    private fb: FormBuilder
  ) { }

  enviar(): void {
    const login: Login = this.formulario.value as Login;

    this.authService.criarLogin(login).subscribe((response: any) => {
      if (response.token) {
        localStorage.setItem('token', response.token);
      } else {
        console.log("Erro ao logar");
      }
    }, (error) => {
      console.log(error);
    });
  }

}
