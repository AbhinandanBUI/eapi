import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MasterService {
  // private baseUrl = 'http://localhost:4001/api/';
  private baseUrl = 'https://ereportapi.herokuapp.com/api/';

  constructor(private http: HttpClient) {}

  getList(apiName: string, method: string): Observable<any> {
    return this.http.get<any>(this.baseUrl + apiName + '/' + method);
  }
  post(data: any, apiName: string, method: string): Observable<any> {
    return  this.http.post<any>(this.baseUrl + apiName + '/' + method, data)
  }
}
