import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CadastroLocadorComponent } from './components/locador/cadastro-locador/cadastro-locador.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroBicicletaComponent } from './components/bicicleta/cadastro-bicicleta/cadastro-bicicleta.component';
import { ListagemBicicletaComponent } from './components/bicicleta/listagem-bicicleta/listagem-bicicleta.component';
import { AlugarBicicletaComponent } from './components/bicicleta/alugar-bicicleta/alugar-bicicleta.component';
import { ListarAlugueisComponent } from './components/aluguel/listar-alugueis/listar-alugueis.component';

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
    component: ListagemBicicletaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-bicicleta',
    component: CadastroBicicletaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alterar-bicicleta/:id',
    component: CadastroBicicletaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-bicicletas',
    component: ListagemBicicletaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'alugar-bicicleta/:id',
    component: AlugarBicicletaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'listar-alugueis',
    component: ListarAlugueisComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
