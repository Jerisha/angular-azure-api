import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';
import { ConfigDetails } from 'src/app/_http/models/config-details';

@Injectable()
export class ResolvingOfErrorsService {
  test!: ConfigDetails[];

  constructor(private wrapperService: HttpWrapperService) { }

  configTest(request: any) {
    this.wrapperService.processRequest<ConfigDetails[]>(HttpVerbs.POST, WebMethods.CONFIG, request).subscribe((res: ConfigDetails[]) => {
      console.log("res: " + JSON.stringify(res))
      this.test = res
    });
    console.log("test " + this.test)
  }
  configDetails(request: any): Observable<any> {
    // const observable = new Observable(observer => {
    //   this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request).subscribe((res: any) =>
    //     observer.next(this.custom(res)));      

    // });

    //return observable
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }

  custom(data: any) {
    console.log('service.custom' + JSON.stringify(data));
    return data;
  }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);

  }

  getDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.GET, request);
  }

  updateDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
  }




}
