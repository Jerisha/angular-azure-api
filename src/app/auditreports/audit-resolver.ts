import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuditResolverService implements Resolve<any> {
  constructor(private http: HttpClient) { }
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const url = "assets/full-audit-table-details.json";
    return this.http.get(url);
  }
}