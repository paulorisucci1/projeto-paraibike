import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './components/login/enter/enter.component';
import { CadastroLocadorComponent } from './components/locador/cadastro-locador/cadastro-locador.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CadastroBicicletaComponent } from './components/bicicleta/cadastro-bicicleta/cadastro-bicicleta.component';
import { ListagemBicicletaComponent } from './components/bicicleta/listagem-bicicleta/listagem-bicicleta.component';
import { ListagemLocadorComponent } from './components/locador/listagem-locador/listagem-locador.component';

const routes: Routes = [
{
    path: '', component: ListagemBicicletaComponent
  },
  {
    path: 'cadastro', component: CadastroLocadorComponent
  },
  {
    path: 'enter', component: EnterComponent
  },
  {
    path: 'cadastro-bicicleta', component: CadastroBicicletaComponent
  },
  {
    path: 'alterar-bicicleta/:id', component: CadastroBicicletaComponent
  },
  {
    path: 'listar-bicicletas', component: ListagemBicicletaComponent
  },
  {
    path: 'listar-usuarios', component: ListagemLocadorComponent
  },
  {
    path: 'alterar-usuario/:id', component: CadastroLocadorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
