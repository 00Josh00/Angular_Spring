import { Injectable } from '@angular/core';
import { PERSONAS } from './personas.js.js';
import { Persona } from './persona.js';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable()
export class PersonaService {
  private urlEndPoint: string = 'http://localhost:8080/api/personas';
  constructor(private http: HttpClient) {}

  getPersonas(): Observable<Persona[]> {
    //return of(PERSONAS);
    return this.http.get<Persona[]>(this.urlEndPoint);
  }
}
