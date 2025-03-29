import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OwlServicesService {

  private fusekiUrl = 'http://semantichub.ijs.si/fuseki/monOntologie/query';
  // private fusekiUrl = 'http://localhost:3030/monOntologie/query';

  constructor(private http: HttpClient) { }

  executeQuery(sparqlQuery: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/sparql-query',
      Accept: 'application/json',
    });

    return this.http.post(this.fusekiUrl, sparqlQuery, { headers });
  }
}
