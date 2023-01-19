import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { DefaultPageSize } from 'src/app/_helper/Constants/pagination-const';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';

@Injectable()
export class UIService {
  public pageSize$ = new BehaviorSubject<number>(DefaultPageSize);

  constructor(private wrapperService: HttpWrapperService) { }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);
  }

  uiApiDetails(request: any, endpoint: WebMethods): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, endpoint, request);
  }

  setPageSize(data: number) {
    this.pageSize$.next(data);
  }

}
