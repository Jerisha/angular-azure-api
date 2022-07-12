import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';

@Injectable()
export class UIService {

  constructor(private wrapperService: HttpWrapperService) { }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }

  uiApiDetails(request: any,endpoint: WebMethods): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, endpoint, request);
  }
}
