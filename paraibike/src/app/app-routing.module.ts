import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './components/login/enter/enter.component';
import { CadastroLocadorComponent } from './components/locador/cadastro-locador/cadastro-locador.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroBicicletaComponent } from './components/bicicleta/cadastro-bicicleta/cadastro-bicicleta.component';
import { ListagemBicicletaComponent } from './components/bicicleta/listagem-bicicleta/listagem-bicicleta.component';

const routes: Routes = [
{
    path: '', component: EnterComponent
  },
  {
    path: 'cadastro', component: CadastroLocadorComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [AuthGuard]
  },
  {
    path: 'cadastro-bicicleta', component: CadastroBicicletaComponent, canActivate: [AuthGuard]
  }, 
  {
    path: 'alterar-bicicleta/:id', component: CadastroBicicletaComponent, canActivate: [AuthGuard]
  },
  {
    path: 'listar-bicicletas', component: ListagemBicicletaComponent, canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
