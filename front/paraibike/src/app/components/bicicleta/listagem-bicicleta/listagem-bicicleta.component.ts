import { Component } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
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
  resultadoBusca: any[] = [];
  buscando: boolean = false;

  formulario = new FormGroup({
    marca: new FormControl(''),
    selectedEstado: new FormControl(['']),
    selectedValor: new FormControl([''])
  });

  constructor(
    private router: Router,
    private bicicletaService: BicicletaService,
    private alertaService: AlertaService
  ){}

  ngOnInit(){
    this.listar();
  }

  listar(){

    // MOCKANDO para testar
    let newBicicleta: Bicicleta = {
      id: 1,
      codigo: "123",
      marca: "Caloi",
      valorPorHora: "10",
      estado: "Disponível",
      usuarioId: 1
    };

    let newBicicleta2: Bicicleta = {
      id: 2,
      codigo: "125",
      marca: "Oasis",
      valorPorHora: "20",
      estado: "Bom estado",
      usuarioId: 1
    };

    let newBicicleta3: Bicicleta = {
      id: 2,
      codigo: "126",
      marca: "Caos",
      valorPorHora: "30",
      estado: "Nova",
      usuarioId: 1
    };
    
    // MOCKANDO para testar
    this.bicicletas = [newBicicleta, newBicicleta2, newBicicleta3];
    console.log(this.bicicletas);

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

  buscar() {
    const marca = this.formulario.get('marca')?.value;
    const estadoSelecionado = this.formulario.get('selectedEstado')?.value as unknown as string;
    const valorSelecionado = this.formulario.get('selectedValor')?.value as unknown as string;
  
    // Verifica se há uma marca, um estado ou um valor selecionado
    if (marca || (estadoSelecionado && estadoSelecionado !== 'Estado') || (valorSelecionado && valorSelecionado !== 'Valor')) {
      this.resultadoBusca = this.bicicletas.filter(bicicleta =>
        (!marca || bicicleta.marca.toLowerCase().includes(marca.toLowerCase())) &&
        (!estadoSelecionado || bicicleta.estado === estadoSelecionado) &&
        (!valorSelecionado || bicicleta.valorPorHora === valorSelecionado)
      );
  
      if (this.resultadoBusca.length > 0) {
        // this.alertaService.alertaSucesso("Busca realizada com sucesso");
      } else {
        this.alertaService.alertaErro("Nenhum resultado encontrado");
      }
    } else {
      this.alertaService.alertaErro("Por favor, insira uma marca, selecione um estado ou escolha um valor para buscar.");
    }
    this.buscando = true;
  }
  
  limpar(){
    this.formulario.reset();
  }
  
}
