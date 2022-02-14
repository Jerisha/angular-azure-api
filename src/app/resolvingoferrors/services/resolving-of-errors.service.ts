import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../../http/enums/http-verbs.enum';
import { WebMethods } from '../../http/enums/web-methods.enum';
import { ConfigDetails } from '../../http/models/config-details';
import { HttpWrapperService } from '../../http/http-wrapper.service';

@Injectable()
export class ResolvingOfErrorsService {
  test?: any;


  constructor(private wrapperService: HttpWrapperService) { }


  configDetails(data: any): ConfigDetails | undefined {
    this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, data).subscribe(x => {
      console.log("configDetails : " + JSON.stringify(x));
      this.test = x;
    });
    return this.test;
  }

  queryDetails(data: any): any | undefined {
    this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, data).subscribe(x => {
      console.log("queryDetails : " + JSON.stringify(x));
      //create a custom function, Pass the response and refine to required format of UI
    });
    return this.test;
  }

  getDetails(data: any): any | undefined {
    this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.GET, data).subscribe(x => {
      console.log("getDetails : " + JSON.stringify(x));
    });
    return this.test;
  }

  updateDetails(data: any): any | undefined {
    this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.UPDATE, data).subscribe(x => {
      console.log("updateDetails : " + JSON.stringify(x));
    });
    return this.test;
  }




}
