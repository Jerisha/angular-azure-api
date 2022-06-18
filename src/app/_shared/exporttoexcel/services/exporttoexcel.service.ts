import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';

@Injectable({
  providedIn: 'root'
})
export class exporttoexcelService {

  constructor(private wrapperService: HttpWrapperService) { }


  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.EXPSUMMARY, request);
  }
}
