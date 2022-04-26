import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpVerbs, HttpWrapperService, WebMethods } from 'src/app/_http';

@Injectable({
  providedIn: 'root'
})
export class AuditReportService {

  constructor(private wrapperService: HttpWrapperService) { }

  queryDetails(request: any): Observable<any> {
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }
  
}
