import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../_enums/http-verbs.enum';
import { dropdown } from '../_helper/Constants/url-const';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ResolvingOfErrorsService {


  constructor(private wrapperService: HttpWrapperService, private http : HttpClient) { }

  configDetails(data: any) {
    // this.http.post(`${environment.api_url}${ dropdown.config}`, JSON.stringify(data)).subscribe(e=> console.log( 'POST'+e))
    return this.wrapperService.processRequst(HttpVerbs.POST, dropdown.config, data);
    
  }

}
