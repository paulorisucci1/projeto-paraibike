import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Bicicleta } from 'src/app/interface/bicicleta';
import { AlertaService } from 'src/app/service/alerta.service';
import { BicicletaService } from 'src/app/service/bicicleta.service';

@Component({
  selector: 'app-cadastro-bicicleta',
  templateUrl: './cadastro-bicicleta.component.html',
  styleUrls: ['./cadastro-bicicleta.component.scss']
})
export class CadastroBicicletaComponent {

  bicicleta!: Bicicleta;

  idBicicleta = 0;

  formulario = new FormGroup({
    codigo: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    estado: new FormControl('', Validators.required)
  });

  constructor(
    private bicicletaService: BicicletaService,
    private router: Router,
    private route: ActivatedRoute,
    private alertaService: AlertaService
  ){}

  ngOnInit(): void {

    this.idBicicleta = Number(this.route.snapshot.paramMap.get('id'));

    if (this.idBicicleta !== 0){
      this.bicicletaService.buscarBicicletaPorId(this.idBicicleta).subscribe((bicicleta: Bicicleta) => {
        this.formulario.setValue({
          codigo: bicicleta.codigo,
          marca: bicicleta.marca,
          estado: bicicleta.estado
        })
      });
    }
  }

  enviar() {
    if (this.formulario.invalid) {
      return this.alertaService.alertaErro("Preencha todos os campos!");
    }
    const bicicleta: Bicicleta = this.formulario.value as Bicicleta;
    if (this.idBicicleta) {
      bicicleta.id = this.idBicicleta;
      this.bicicletaService.alterarBicicleta(bicicleta).subscribe(() => {
        console.log("Bicicleta atualizada");
        this.alertaService.alertaSucesso("Bicicleta atualizada com sucesso");
        this.router.navigate(['/listar-bicicletas']);
      }, (error) => {
        console.log(error);
      });
    } else {
      this.bicicletaService.criarBicicleta(bicicleta).subscribe(() => {
        this.alertaService.alertaSucesso("Bicicleta cadastrada com sucesso");
        this.router.navigate(['/listar-bicicletas']);
      }, (error) => {
        console.log(error);
      });
    }
  }

  cancelar() {
    return this.router.navigate(['/listar-bicicletas']);
  }
}
