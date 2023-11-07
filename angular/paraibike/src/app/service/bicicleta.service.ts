import { HttpClient, HttpHeaders, HttpParamsOptions } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Bicicleta } from '../interface/bicicleta';
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BicicletaService {

  private readonly API = 'http://localhost:8080/bicicletas'; // url falsa
  private readonly httpHeaders: any;

  constructor(private http: HttpClient) {
  }

  criarBicicleta(bicicleta: Bicicleta) {
    console.log(bicicleta);
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

}
