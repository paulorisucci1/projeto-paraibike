import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { LoginModule } from './components/login/login.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LocadorModule } from './components/locador/locador.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { CadastroBicicletaComponent } from './components/bicicleta/cadastro-bicicleta/cadastro-bicicleta.component';
import { ListagemBicicletaComponent } from './components/bicicleta/listagem-bicicleta/listagem-bicicleta.component';
import { SharedModule } from './shared/shared.module';
import { AlugarBicicletaComponent } from './components/bicicleta/alugar-bicicleta/alugar-bicicleta.component';
import { ListarAlugueisComponent } from './components/aluguel/listar-alugueis/listar-alugueis.component';
import { SidebarComponent } from './shared/template/sidebar/sidebar.component';
import {MatIconModule} from '@angular/material/icon';
import { StoreModule } from '@ngrx/store';
import { carteiraReducer } from './store/reducers/carteira.reducer';
import { ComprarCreditosComponent } from './components/comprar-creditos/comprar-creditos.component';

@NgModule({
  declarations: [
    AppComponent,
    CadastroBicicletaComponent,
    ListagemBicicletaComponent,
    SidebarComponent,
    AlugarBicicletaComponent,
    ListarAlugueisComponent,
    ComprarCreditosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    LoginModule,
    BrowserAnimationsModule,
    LocadorModule,
    HttpClientModule,
    CoreModule,
    ReactiveFormsModule,
    SharedModule,
    MatIconModule,
    StoreModule.forRoot({ carteira: carteiraReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
