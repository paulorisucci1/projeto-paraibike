import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterComponent } from './components/login/enter/enter.component';
import { CadastroLocadorComponent } from './components/locador/cadastro-locador/cadastro-locador.component';

const routes: Routes = [
  {
    path: '', component: EnterComponent
  },
  {
    path: 'cadastro', component: CadastroLocadorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
