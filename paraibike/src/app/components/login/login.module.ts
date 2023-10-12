import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterComponent } from './enter/enter.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';



@NgModule({
  declarations: [
    EnterComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule
  ]
})
export class LoginModule { }
