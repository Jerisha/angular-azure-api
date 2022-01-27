import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import * as  dat from 'assets/full-audit-table-details.json';

// import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// const MENU_SOURCE = (dat as any).default;

@Injectable()
export class AuditResolverService implements Resolve<any> {
  constructor(private http: HttpClient) { }

  /**
   * resolve method
   * @param route
   * @param state
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {

   // console.log(MENU_SOURCE);
    //const userId = route.params['id'];
    const url = "assets/full-audit-table-details.json";
    return this.http.get(url);
  }

}
