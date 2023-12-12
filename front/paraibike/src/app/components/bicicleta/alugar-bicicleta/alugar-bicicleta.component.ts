import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aluguel } from 'src/app/interface/aluguel';
import { Bicicleta } from 'src/app/interface/bicicleta';
import { AlertaService } from 'src/app/service/alerta.service';
import { AluguelService } from 'src/app/service/aluguel.service';
import { BicicletaService } from 'src/app/service/bicicleta.service';

@Component({
  selector: 'app-alugar-bicicleta',
  templateUrl: './alugar-bicicleta.component.html',
  styleUrls: ['./alugar-bicicleta.component.scss']
})
export class AlugarBicicletaComponent {

  public bicicleta!: Bicicleta;
  public aluguel!: Aluguel
  public formulario = new FormGroup({
    data: new FormControl("", Validators.required),
    quantidadeHoras: new FormControl("", Validators.required)
  });

  get data() {
    return this.formulario.get('data')?.value;
  }

  constructor(
    private bicicletaService: BicicletaService,
    private aluguelService: AluguelService,
    private alertaService: AlertaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.bicicletaService.buscarBicicletaPorId(Number(this.route.snapshot.paramMap.get('id'))).subscribe(bicicleta => {
      this.bicicleta = bicicleta;
    })
  }

  alugar() {
    if (this.formulario.invalid) {
      return this.alertaService.alertaErro("Preencha todos os campos!");
    }
    const body = new Aluguel();
    body.data = this.data as any;
    body.bicicleta = this.bicicleta;
    body.quantidadeHoras = this.formulario.get('quantidadeHoras')!.value!;
    body.usuarioId = 1;
    body.status = "Aprovado";
    this.aluguelService.criarAluguel(body).subscribe(() => {
      this.alertaService.alertaSucesso("Bicicleta alugada com sucesso!");
      this.router.navigate(['/listar-bicicletas']);
    }, (error) => {
      console.log(error);
    });
  }

  cancelar() {
    this.router.navigate(['/listar-bicicletas']);
  }

}
