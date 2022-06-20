import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import FileSaver from 'file-saver';
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
  downloadFileDetails(request: any) {
    return this.wrapperService.processPyBlobRequest(HttpVerbs.POST, WebMethods.BLOBOBJECT, request)
  }
  
  blob2File(data: any, fileType: string, fileName: string) {
    const blob = new Blob([data.body]
      ,
      // { type: 'application/vnd.ms-excel' }
      { type: fileType }
    );
    console.log(blob, 'blob')
    const file = new File([blob], fileName
      ,
      // { type: 'application/vnd.ms-excel' }
      { type: fileType }
    );
    FileSaver.saveAs(file);
  }


}
