import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Aluguel } from 'src/app/interface/aluguel';
import { Bicicleta } from 'src/app/interface/bicicleta';
import { AlertaService } from 'src/app/service/alerta.service';
import { AluguelService } from 'src/app/service/aluguel.service';

@Component({
  selector: 'app-listar-alugueis',
  templateUrl: './listar-alugueis.component.html',
  styleUrls: ['./listar-alugueis.component.scss']
})
export class ListarAlugueisComponent {

  public alugueis!: Aluguel[];

  constructor(
    private router: Router,
    private aluguelService: AluguelService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(){
    this.listar();
  }

  listar(){
    this.aluguelService.listarAlugueis().subscribe((alugueis: Aluguel[]) => {
      this.alugueis = alugueis;
    });
  }

  cancelarAluguel(aluguel: Aluguel) {
    this.alertaService.confirmar("Tem certeza que deseja cancelar esse aluguel?").then(v => {
      if (v.isConfirmed) {
        this.aluguelService.excluirAluguel(aluguel.id).subscribe(v => {
          this.alertaService.alertaSucesso("Aluguel excluido com sucesso!")
          this.listar();
        })
      }
    })
  }

  voltar() {
    this.router.navigate(['/listar-bicicletas']);
  }

}
