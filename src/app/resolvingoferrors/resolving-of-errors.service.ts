import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../_enums/http-verbs.enum';
import { webMethods } from '../_helper/Constants/url-const';
import { ConfigDetails } from '../_models/uicomponents/config-details';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';

@Injectable()
export class ResolvingOfErrorsService {
  test?: ConfigDetails;


  constructor(private wrapperService: HttpWrapperService, private http: HttpClient) { }
  apiTest(data: any) {
    return this.wrapperService.processRequst(HttpVerbs.POST, webMethods.query, data).subscribe(x => {
      console.log("response : " + JSON.stringify(x));
      //this.processConfig(x);
    });
    //return this.test;

  }
}
