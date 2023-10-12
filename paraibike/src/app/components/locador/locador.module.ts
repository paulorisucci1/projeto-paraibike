import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CadastroLocadorComponent } from './cadastro-locador/cadastro-locador.component';
import { ListagemLocadorComponent } from './listagem-locador/listagem-locador.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CadastroLocadorComponent,
    ListagemLocadorComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ]
})
export class LocadorModule { }
