import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { CreditosService } from 'src/app/service/creditos.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  creditos: String = '20,00'
  constructor(private router: Router, 
    private creditoService: CreditosService) { }

  ngOnInit() {
  }

  mudarRota(rota: string) {
    this.router.navigate([rota]);
  }

  consultarCreditos() {
    this.creditoService.consultarCreditos();
  }

  comprarCreditos() {
    
  }

}
