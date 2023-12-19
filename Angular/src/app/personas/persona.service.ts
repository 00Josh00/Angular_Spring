import { Injectable } from '@angular/core';
import { PERSONAS } from './personas.js.js';
import { Persona } from './persona.js';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
@Injectable()
export class PersonaService {
  constructor() {}

  getPersonas(): Observable<Persona[]> {
    return of(PERSONAS);
  }
}
