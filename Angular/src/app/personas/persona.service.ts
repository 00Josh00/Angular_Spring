import { Injectable } from '@angular/core';
import { PERSONAS } from './personas.js.js';
import { Persona } from './persona.js';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable()
export class PersonaService {
  private urlEndPoint: string = 'http://localhost:8080/api/personas';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    //return of(PERSONAS);
    return this.http.get<Persona[]>(this.urlEndPoint);
  }

  create(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.urlEndPoint, persona, {
      headers: this.httpHeaders,
    });
  }

  getPersona(id): Observable<Persona> {
    return this.http.get<Persona>(`${this.urlEndPoint}/${id}`);
  }

  update(persona: Persona): Observable<Persona> {
    return this.http.put<Persona>(
      `${this.urlEndPoint}/${persona.id}`,
      persona,
      {
        headers: this.httpHeaders,
      }
    );
  }

  delete(id: number): Observable<Persona> {
    return this.http.delete<Persona>(`${this.urlEndPoint}/${id}`, {
      headers: this.httpHeaders,
    });
  }
}
