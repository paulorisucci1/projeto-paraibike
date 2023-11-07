import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnterComponent } from './enter/enter.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    EnterComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class LoginModule { }
