import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {CreditosService} from "../../service/creditos.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertaService} from "../../service/alerta.service";

@Component({
  selector: 'app-comprar-creditos',
  templateUrl: './comprar-creditos.component.html',
  styleUrls: ['./comprar-creditos.component.scss']
})
export class ComprarCreditosComponent {

  public value:Number = 0;

  public formulario = new FormGroup({
    value: new FormControl("", Validators.required)
  });

  constructor(private creditosService: CreditosService,
              private alertaService: AlertaService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  comprar_creditos() {
    if (this.formulario.invalid) {
      return this.alertaService.alertaErro("Preencha todos os campos!");
    }
    this.creditosService.creditar(this.value).subscribe(() => {
      this.alertaService.alertaSucesso("Compra solicitada com sucesso! Verifique seu e-mail para pagar");
      this.router.navigate(['/listar-bicicletas']);
      }, error => {
      return this.alertaService.alertaErro(error);
      }
    );
  }

  cancelar() {
    this.router.navigate(['/listar-bicicletas']);
  }
}
