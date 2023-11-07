import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './components/angular-material/angular-material.module';
import { LocadorModule } from './components/locador/locador.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { CoreModule } from './core/core.module';
import { CadastroBicicletaComponent } from './components/bicicleta/cadastro-bicicleta/cadastro-bicicleta.component';
import { ListagemBicicletaComponent } from './components/bicicleta/listagem-bicicleta/listagem-bicicleta.component';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CadastroBicicletaComponent,
    ListagemBicicletaComponent,
    SidenavComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    RouterModule,
    LoginModule,
    BrowserAnimationsModule,
    LocadorModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
