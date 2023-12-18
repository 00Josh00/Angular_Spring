import { Injectable } from '@angular/core';
import { PERSONALINFO } from './personal-info.json';
import { PersonalInfo } from './personal-info';
import { of,Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonalInfoService {
  private urlEndPoint:string = 'http://localhost:8080/api/personalinfo';
  constructor(private http: HttpClient) { }

  getPersonalInfo(): Observable<PersonalInfo[]> {
    //return of(PERSONALINFO);
    return this.http.get(this.urlEndPoint).pipe(
      map(Response => Response as PersonalInfo[])
    )
  }
}
