import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';

@Injectable()
export class ReportService {


  constructor(private wrapperService: HttpWrapperService) { }
  configDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
    // .subscribe(x => {
    //   console.log("configDetails : " + JSON.stringify(x));
    //   this.test = x;
    // });
    //return this.test;
  }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);   
     
  }
}
