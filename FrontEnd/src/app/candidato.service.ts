import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {Candidato} from './candidato/candidato.component';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient) { }

  getCandidatos(): Observable<Candidato[]>{
    return this.http.get<Candidato[]>("http://localhost:3000/candidato");
  }
  adicionar(candidato: Candidato): Observable<any>{
    return this.http.post("http://localhost:3000/candidato", candidato);
  }
}
