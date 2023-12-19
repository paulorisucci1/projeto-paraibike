import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Carteira } from 'src/app/interface/carteira';
import { CreditosService } from 'src/app/service/creditos.service';
import { atualizarValorCarteira } from 'src/app/store/actions/carteira.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  carteira$: Observable<Carteira | undefined> | undefined;

  constructor(private router: Router, 
    private creditoService: CreditosService,
    private store: Store<{ carteira: Carteira }>
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
    this.creditoService.consultarCreditos().subscribe(
      (valorCredito) => {
        this.store.dispatch(atualizarValorCarteira({ valorCarteira: valorCredito }));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  // redirecionar para gateway de pagamento
  comprarCreditos() {
    
  }

}
