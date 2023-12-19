import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Aluguel } from 'src/app/interface/aluguel';
import { Bicicleta } from 'src/app/interface/bicicleta';
import { AlertaService } from 'src/app/service/alerta.service';
import { AluguelService } from 'src/app/service/aluguel.service';
import { BicicletaService } from 'src/app/service/bicicleta.service';
import { CreditosService } from 'src/app/service/creditos.service';
import { debitarCredito } from 'src/app/store/actions/carteira.actions';
import {UsuarioService} from "../../../service/usuario.service";
import {Usuario} from "../../../interface/usuario";
import {SidebarComponent} from "../../../shared/template/sidebar/sidebar.component";

@Component({
  selector: 'app-alugar-bicicleta',
  templateUrl: './alugar-bicicleta.component.html',
  styleUrls: ['./alugar-bicicleta.component.scss']
})
export class AlugarBicicletaComponent {

  public bicicleta!: Bicicleta;
  public aluguel!: Aluguel;
  public usuario!: Usuario;
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
    private router: Router,
    private creditoService: CreditosService,
    private store: Store,
    private usuarioService: UsuarioService,
    private sideBarComponent: SidebarComponent
  ) {
    this.bicicletaService.buscarBicicletaPorId(Number(this.route.snapshot.paramMap.get('id'))).subscribe(bicicleta => {
      this.bicicleta = bicicleta;
    });
    this.consultarCreditos();
  }

  alugar() {
    if (this.formulario.invalid) {
      return this.alertaService.alertaErro("Preencha todos os campos!");
    }
    const body = new Aluguel();
    body.data = this.data as any;
    body.bicicleta = this.bicicleta;
    body.quantidadeHoras = this.formulario.get('quantidadeHoras')!.value!;
    body.status = "Aprovado";

    const valorDebito = Number(body.quantidadeHoras) * Number(this.bicicleta.valorPorHora);

    // primeiro verifica o valor dos créditos, para depois debitar e alugar

    let isSaldoSuficiente = this
      .usuario
      .wallet
      .balance >= valorDebito;

    if (!isSaldoSuficiente) {
      this.alertaService.alertaErro("Saldo insuficiente para realizar o aluguel!");
    } else {
      this.creditoService.debitar(valorDebito).subscribe(
        () => {
          this.store.dispatch(debitarCredito({ valorDebito }));
          this.usuario.wallet.balance -= valorDebito;
        }, (error) => {
          console.error('Erro ao debitar crédito:', error);
        })

      this.aluguelService.criarAluguel(body).subscribe(() => {
          this.alertaService.alertaSucesso("Bicicleta alugada com sucesso!");
          this.router.navigate(['/listar-bicicletas']);
          this.sideBarComponent.consultarCreditos();
        }, (error) => {
          console.error(error);
      });
    }
  }

  consultarCreditos() {
    this.usuarioService.getProfile().subscribe((response: any) => {
      this.usuario = response.user;
      this.usuario.wallet = response.wallet;
    });
  }
  cancelar() {
    this.router.navigate(['/listar-bicicletas']);
  }

}
