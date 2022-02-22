import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  constructor(private wrapperService: HttpWrapperService) { }


  getDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.GET, request);
  }
}
