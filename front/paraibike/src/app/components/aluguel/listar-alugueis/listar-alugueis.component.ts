import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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

  public alugueis: Aluguel[] = [];
  resultadoBusca: any[] = [];
  buscando: boolean = false;

  // MOCKANDO para testar
  newBicicleta: Bicicleta = {
    id: 1,
    codigo: "123",
    marca: "Caloi",
    valorPorHora: "10",
    estado: "Disponível",
    usuarioId: 1
  };

  formulario = new FormGroup({
    data: new FormControl(''),
  });

  constructor(
    private router: Router,
    private aluguelService: AluguelService,
    private alertaService: AlertaService
  ) {}

  ngOnInit(){
    this.listar();
  }

  listar(){

    this.aluguelService.listarAlugueis().subscribe((response: any) => {
      this.alugueis = response.aluguel;
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

  buscar() {
    const dataSelecionada = this.formulario.get('data')?.value as string;
    if (dataSelecionada) {
      this.resultadoBusca = this.alugueis.filter(aluguel => aluguel.data === dataSelecionada);

      if (this.resultadoBusca.length > 0) {
        this.alertaService.alertaSucesso("Busca por data realizada com sucesso");
        console.log(this.resultadoBusca)
      } else {
        this.alertaService.alertaErro("Nenhum resultado encontrado para a data selecionada");
      }
    } else {
      this.alertaService.alertaErro("Por favor, selecione uma data para buscar.");
    }
    this.buscando = true;
  }

  limpar() {
    this.formulario.reset();
  }

}
