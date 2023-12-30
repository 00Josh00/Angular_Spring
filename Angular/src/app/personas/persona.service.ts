import { Injectable } from '@angular/core';
import { Persona } from './persona.js';
import { Observable, catchError, tap, throwError } from 'rxjs';
import {
  HttpClient,
  HttpEvent,
  HttpHeaders,
  HttpRequest,
} from '@angular/common/http';
import { map } from 'rxjs';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class PersonaService {
  private urlEndPoint: string = 'http://localhost:8080/api/personas';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient, private router: Router) {}

  getPersonas(page: number): Observable<any> {
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('PersonaService: tap 1');
        (response.content as Persona[]).forEach((persona) => {
          console.log(persona.nombre);
        });
      }),
      map((response: any) => {
        (response.content as Persona[]).map((persona) => {
          // persona.nombre = persona.nombre.toUpperCase(); //HABILITAR UPPERCASE
          return persona;
        });
        return response;
      }),
      tap((response) => {
        console.log('PersonaService: tap 2');
        (response.content as Persona[]).forEach((persona) => {
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
          if (e.status == 400) {
            return throwError(e);
          }

          console.error(e.error.mensaje);
          swal.fire(e.error.mensaje, e.error.error, 'error');
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

  subirFoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id);

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
