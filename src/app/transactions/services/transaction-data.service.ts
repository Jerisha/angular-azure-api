import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';
import { ConfigDetails } from 'src/app/_http/models/config-details';
@Injectable({
  providedIn: 'root'
})
export class TransactionDataService {

  constructor(private wrapperService: HttpWrapperService) { }
  configDetails(request: any): Observable<any> {
    // const observable = new Observable(observer => {
    //   this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request).subscribe((res: any) =>
    //     observer.next(this.custom(res)));      

    // });

    //return observable
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }
  queryDetails(request: any): Observable<any> {
    console.log('service called',request);
    debugger
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }
  create(request: any): Observable<any> {
    console.log('create called',request);
    debugger
    //return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CREATE, request);
  }
}
