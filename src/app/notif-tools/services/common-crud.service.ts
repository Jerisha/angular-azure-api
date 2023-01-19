import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';
import { NGNSearch, SearchViewExtractResponse } from './mock-request-response';

@Injectable({
  providedIn: 'root'
})
export class CommonCrudService {

  
  constructor(private wrapperService: HttpWrapperService, private http: HttpClient) { }

  serachViewExtractListing(request: any): Observable<any> {
    // const pyUrl = 'https://ukond1vr.ad.plc.cwintra.com:6056/DCM/QueryObject';
    // return this.http.post<any>(pyUrl, request);  
     // return of(SearchViewExtractResponse.Data);
    let repIdentifier = request.Data[0].number_range_type ? request.Data[0].number_range_type : 'ALL';
    return of(NGNSearch[repIdentifier]) ;
  }
}
