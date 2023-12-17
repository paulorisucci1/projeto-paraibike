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

  public alugueis!: Aluguel[];
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

    // MOCKANDO para testar
    let newBicicleta: Aluguel = {
      id: 1,
      valor: "123",
      quantidadeHoras: "Caloi",
      data: "10/05/2023",
      status: "Disponível",
      bicicleta: this.newBicicleta,
      usuarioId: 2
    };

    let newBicicleta2: Aluguel = {
      id: 1,
      valor: "123",
      quantidadeHoras: "Caloi",
      data: "11/05/2023",
      status: "Disponível",
      bicicleta: this.newBicicleta,
      usuarioId: 2
    };

    // MOCKANDO para testar
    this.alugueis = [newBicicleta, newBicicleta2]

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
