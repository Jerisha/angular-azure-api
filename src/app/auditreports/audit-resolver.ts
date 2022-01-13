import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

// import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuditResolverService implements Resolve<any> {
  constructor(private http: HttpClient) { }

  /**
   * resolve method
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    //const userId = route.params['id'];
    const url = "../assets/full-audit-table-details.json";
    return this.http.get(url);
  }

}
