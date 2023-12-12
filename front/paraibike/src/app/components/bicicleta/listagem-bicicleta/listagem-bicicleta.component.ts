import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Bicicleta } from 'src/app/interface/bicicleta';
import { AlertaService } from 'src/app/service/alerta.service';
import { BicicletaService } from 'src/app/service/bicicleta.service';

@Component({
  selector: 'app-listagem-bicicleta',
  templateUrl: './listagem-bicicleta.component.html',
  styleUrls: ['./listagem-bicicleta.component.scss']
})
export class ListagemBicicletaComponent {

  bicicletas!: Bicicleta[];

  displayedColumns: string[] = ['codigo', 'marca', 'estado', 'acoes'];

  constructor(
    private router: Router,
    private bicicletaService: BicicletaService,
    private alertaService: AlertaService
  ){}

    ngOnInit(){
      this.listar();
    }

  listar(){
    this.bicicletaService.listarBicicletas().subscribe((bicicletas: Bicicleta[]) => {
      this.bicicletas = bicicletas;
      console.log(this.bicicletas);
    });
  }

  deletar(id: number){
    this.alertaService.confirmar("Tem certeza que deseja inativar essa bicicleta?").then(v => {
      if (v.isConfirmed && id) {
        this.bicicletaService.excluirBicicleta(id).subscribe(() => {
          const index = this.bicicletas.findIndex( bicicleta => bicicleta.id === id);
          this.alertaService.alertaSucesso("Bicicleta inativada com sucesso");
          this.listar();
        }, (error) => {
          console.log(error);
        });
      }
    })
  }

  ativar(bicicleta: Bicicleta) {
    this.alertaService.confirmar("Tem certeza que deseja ativar essa bicicleta?").then(v => {
      if (v.isConfirmed) {
        this.bicicletaService.ativarBicicleta(bicicleta).subscribe(() => {
          this.alertaService.alertaSucesso("Bicicleta ativada com sucesso");
          this.listar();
        }, (error) => {
          console.log(error);
        });
      }
    })
  }
}
