import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Carteira } from 'src/app/interface/carteira';
import { CreditosService } from 'src/app/service/creditos.service';
import { atualizarValorCarteira } from 'src/app/store/actions/carteira.actions';
import {Wallet} from "../../../interface/wallet";
import {UsuarioService} from "../../../service/usuario.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  carteira$: Observable<Carteira | undefined> | undefined;
  balance?: number

  constructor(private router: Router,
    private creditoService: CreditosService,
    private store: Store<{ carteira: Carteira }>,
    public usuarioService: UsuarioService
  ) {
    this.carteira$ = this.store.select(state => state.carteira);
  }

  ngOnInit() {
    this.consultarCreditos();
  }

  mudarRota(rota: string) {
    this.router.navigate([rota]);
  }

  consultarCreditos() {
    this.usuarioService.getProfile().subscribe((response: any) => {
      this.balance = response.wallet.balance
    });
  }


}
