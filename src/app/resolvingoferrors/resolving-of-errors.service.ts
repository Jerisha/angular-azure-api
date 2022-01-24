import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpVerbs } from '../_enums/http-verbs.enum';
import { dropdown } from '../_helper/Constants/url-const';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';

@Injectable({
  providedIn: 'root'
})
export class ResolvingOfErrorsService {


  constructor(private wrapperService: HttpWrapperService) { }

  configDetails(data: any): Observable<any> {
    
    return this.wrapperService.processRequst(HttpVerbs.POST, dropdown.config, data);
  }

}
