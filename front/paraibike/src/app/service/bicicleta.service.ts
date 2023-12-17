import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bicicleta } from '../interface/bicicleta';
import { Observable, of } from "rxjs";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BicicletaService {

  private readonly API = `${environment.api_base_url}/bicicletas`;

  constructor(private http: HttpClient) { }

  criarBicicleta(bicicleta: Bicicleta) {
    return this.http.post<Bicicleta>(`${this.API}`, bicicleta);
  }

  listarBicicletas(){
    return this.http.get<Bicicleta[]>(`${this.API}`);
  }

  alterarBicicleta(bicicleta: Bicicleta){
    return this.http.put(`${this.API}/${bicicleta.id}`, bicicleta);
  }

  excluirBicicleta(id: number | undefined): Observable<object>{
    return this.http.delete(`${this.API}/${id}`);
  }

  buscarBicicletaPorId(id: number){
    return this.http.get<Bicicleta>(`${this.API}/${id}`);
  }

  ativarBicicleta(bicicleta: Bicicleta) {
    let bicicletaNova = Object.assign({}, bicicleta)
    bicicletaNova.estado = "BOM_ESTADO"
    return this.alterarBicicleta(bicicletaNova)
  }

  private bicicletas: any[] = [];


}
