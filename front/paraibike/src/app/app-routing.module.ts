import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroLocadorComponent } from './components/locador/cadastro-locador/cadastro-locador.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroBicicletaComponent } from './components/bicicleta/cadastro-bicicleta/cadastro-bicicleta.component';
import { ListagemBicicletaComponent } from './components/bicicleta/listagem-bicicleta/listagem-bicicleta.component';
import { AlugarBicicletaComponent } from './components/bicicleta/alugar-bicicleta/alugar-bicicleta.component';
import { ListarAlugueisComponent } from './components/aluguel/listar-alugueis/listar-alugueis.component';
import {ComprarCreditosComponent} from "./components/comprar-creditos/comprar-creditos.component";
import {SidebarComponent} from "./shared/template/sidebar/sidebar.component";

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastro',
    component: CadastroLocadorComponent
  },
  {
    path: 'home',
    canActivate: [AuthGuard],
    component: ListagemBicicletaComponent
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: ListagemBicicletaComponent
  },
  {
    path: 'cadastro-bicicleta',
    canActivate: [AuthGuard],
    component: CadastroBicicletaComponent
  },
  {
    path: 'alterar-bicicleta/:id',
    canActivate: [AuthGuard],
    component: CadastroBicicletaComponent
  },
  {
    path: 'listar-bicicletas',
    canActivate: [AuthGuard],
    component: ListagemBicicletaComponent
  },
  {
    path: 'alugar-bicicleta/:id',
    canActivate: [AuthGuard],
    component: AlugarBicicletaComponent
  },
  {
    path: 'listar-alugueis',
    canActivate: [AuthGuard],
    component: ListarAlugueisComponent
  },
  {
    path: 'comprar-creditos',
    canActivate: [AuthGuard],
    component: ComprarCreditosComponent
  },
  {
    path: 'sidebar',
    canActivate: [AuthGuard],
    component: SidebarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
