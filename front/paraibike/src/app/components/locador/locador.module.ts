import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroLocadorComponent } from './cadastro-locador/cadastro-locador.component';
import { ListagemLocadorComponent } from './listagem-locador/listagem-locador.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CadastroLocadorComponent,
    ListagemLocadorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LocadorModule { }
