import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';
import { Observable } from 'rxjs';
import { HttpWrapperService, HttpVerbs, WebMethods, ResponseType } from 'src/app/_http/index';

@Injectable({
  providedIn: 'root'
})
export class exporttoexcelService {

  constructor(private wrapperService: HttpWrapperService) { }

  queryDetails(request: any): Observable<any> {
    return this.wrapperService.processPyRequest(HttpVerbs.POST, WebMethods.EXPSUMMARY, request);
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
