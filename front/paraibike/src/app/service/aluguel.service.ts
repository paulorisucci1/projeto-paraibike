import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Aluguel } from '../interface/aluguel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AluguelService {

  private readonly API = `${environment.api_base_url}/alugueis`;

  constructor(private http: HttpClient) { }

  listarAlugueis(): any {
    return this.http.get<Aluguel[]>(`${this.API}`);
  }

  buscarAluguelPorId(id: number) {
    return this.http.get<Aluguel>(`${this.API}/${id}`);
  }

  criarAluguel(body: Aluguel) {
    return this.http.post<Aluguel>(`${this.API}`, body);
  }

  editarAluguel(id: number, body: Aluguel) {
    return this.http.put<Aluguel>(`${this.API}/${id}`, body);
  }

  excluirAluguel(id: number) {
    return this.http.delete<Aluguel>(`${this.API}/${id}`);
  }

}
