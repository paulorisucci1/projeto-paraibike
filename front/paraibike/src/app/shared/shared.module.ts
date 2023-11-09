import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const sharedModules = [
  CommonModule,
  RouterModule,
  HttpClientModule,
  ReactiveFormsModule,
  FormsModule,
];

@NgModule({
  imports: sharedModules,
  exports: sharedModules
})
export class SharedModule { }
