import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpWrapperService } from 'src/app/_http/http-wrapper.service';
import { HttpVerbs } from 'src/app/_http/enums/http-verbs.enum';
import { WebMethods } from 'src/app/_http/enums/web-methods.enum';

@Injectable()
export class AuditReportsService {

  constructor(private wrapperService: HttpWrapperService,
    private httpclient: HttpClient) {
  }

  configDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }
  updateDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
  }

  getDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.GET, request);
  }

  // getDetails(): Observable<any> {
  //   let headers = new HttpHeaders();
  //   headers = headers.set('Content-Type', 'application/json');
  //   return this.httpclient.get('https://jsonplaceholder.typicode.com/posts/1', { headers: headers })
  //     .pipe(catchError(this.formatError))
  // }

  // formatError(err: HttpResponse<any>) {
  //   return throwError(err);
  // }
}
