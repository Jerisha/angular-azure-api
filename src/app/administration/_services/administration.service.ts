import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';
import { ObjectUnsubscribedError, Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods, ResponseType } from 'src/app/_http/index';
import { ConfigDetails } from 'src/app/_http/models/config-details';

@Injectable()
export class AdministrationService {
  test!: ConfigDetails[];

  constructor(private wrapperService: HttpWrapperService) { }

 
  configDetails(request: any): Observable<any> {
    // const observable = new Observable(observer => {
    //   this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request).subscribe((res: any) =>
    //     observer.next(this.custom(res)));      

    // });

    //return observable
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }



  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.QUERY, request);

  }



  updateDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UPDATE, request);
  }

  uiQueryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UIQUERY, request);

  }
  uiUpdateDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UIUPDATE, request);
  }
  uiCreateDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UICREATE, request);
  }
  uiDeleteDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.UIDELETE, request);
  }
  downloadFileDetails(request: any) {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.BLOBOBJECT, request, ResponseType.BLOB)
  }
  blob2File(data: any, fileType: string, fileName: string) {
    const blob = new Blob([data.body],     
      { type: fileType }  // { type: 'application/vnd.ms-excel' }
    );
    //console.log(blob, 'blob')
    const file = new File([blob], fileName,      
      { type: fileType } // { type: 'application/vnd.ms-excel' }
    );
    FileSaver.saveAs(file);
  }
  }
