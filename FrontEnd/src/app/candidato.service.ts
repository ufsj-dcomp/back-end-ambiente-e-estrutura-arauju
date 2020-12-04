import { Injectable } from '@angular/core';
import { Observable} from 'rxjs/internal/Observable';
import { Candidato} from './candidato/candidato.component';
import { HttpClient} from '@angular/common/http';
import { Globals } from './globals/globals';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getCandidatos(): Observable<Candidato[]>{
    return this.http.get<Candidato[]>("http://localhost:3000/candidato", this.header());
  }
  getCandidato(candidatoId: number): Observable<Candidato>{
    return this.http.get<Candidato>("http://localhost:3000/candidato/" + candidatoId, this.header());
  }
  adicionar(candidato: Candidato): Observable<any>{
    return this.http.post("http://localhost:3000/candidato", candidato, this.header());
  }
  editar(candidato: Candidato): Observable<any> {
    return this.http.post("http://localhost:3000/candidato/" + candidato.id, candidato, this.header());
  }
  remover(candidatoId: number): Observable<any> {
    return this.http.delete("http://localhost:3000/candidato/" + candidatoId, this.header());
  }

  header(){
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
      'x-access-token': this.globals.loginData.token
    })
    };
  }
}
