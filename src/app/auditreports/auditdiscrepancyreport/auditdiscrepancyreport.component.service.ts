import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';
import { ConfigDetails } from 'src/app/_http/models/config-details';


@Injectable({providedIn:'root'})
export class AuditDiscpancyReportService {

  constructor(private wrapperService: HttpWrapperService) { }


  // configDetails(request: any) {
  //   throw new Error('Method not implemented.');
  // }

  configDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }

  public sidePan = new Subject<MatSidenav>();

  passValue(data:MatSidenav) {
    //passing the data as the next observable
    this.sidePan.next(data);
  }

  queryDetails(request: any): Observable<any> {
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }

}
