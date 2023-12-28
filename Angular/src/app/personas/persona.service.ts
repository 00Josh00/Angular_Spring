import { Injectable } from '@angular/core';
import { Persona } from './persona.js';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class PersonaService {
  private urlEndPoint: string = 'http://localhost:8080/api/personas';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}

  getPersonas(): Observable<Persona[]> {
    return this.http.get(this.urlEndPoint).pipe(
      tap((response) => {
        let personas = response as Persona[];
        console.log('PersonaService: tap 1');
        personas.forEach((persona) => {
          console.log(persona.nombre);
        });
      }),
      map((response) => {
        let personas = response as Persona[];
        return personas.map((persona) => {
          // persona.nombre = persona.nombre.toUpperCase(); //HABILITAR UPPERCASE
          return persona;
        });
      }),
      tap((response) => {
        console.log('PersonaService: tap 2');
        response.forEach((persona) => {
          console.log(persona.nombre);
        });
      })
    );
  }

  create(persona: Persona): Observable<any> {
    return this.http
      .post(this.urlEndPoint, persona, { headers: this.httpHeaders })
      .pipe(
        map((response: any) => response.persona as Persona),
        catchError((e) => {
          if (e.status == 400) {
            return throwError(() => e);
          }

          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  getPersona(id: Number): Observable<Persona> {
    return this.http.get<Persona>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/personas']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(() => e);
      })
    );
  }

  update(persona: Persona): Observable<any> {
    return this.http
      .put<any>(`${this.urlEndPoint}/${persona.id}`, persona, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire('Error al editar', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Persona> {
    return this.http
      .delete<Persona>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.mensaje);
          swal.fire('Error al eliminar', e.error.mensaje, 'error');
          return throwError(() => e);
        })
      );
  }
}
