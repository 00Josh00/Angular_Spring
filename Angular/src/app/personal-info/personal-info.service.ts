import { Injectable } from '@angular/core';
import { PERSONALINFO } from './personal-info.json';
import { PersonalInfo } from './personal-info';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private urlEndPoint: string = 'http://localhost:8080/api/personalinfo';

  // Corrección aquí: 'application/json' en lugar de 'aplication/json'
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  getPersonalInfo(): Observable<PersonalInfo[]> {
    return this.http.get(this.urlEndPoint).pipe(
      map(response => response as PersonalInfo[])
    );
  }

  create(personalinfo: PersonalInfo): Observable<PersonalInfo> {
    return this.http.post<PersonalInfo>(this.urlEndPoint, personalinfo, {headers: this.httpHeaders});
  }
}

