import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../_enums/http-verbs.enum';
import { dropdown, resolvingoferrors } from '../_helper/Constants/url-const';
import { ConfigDetails } from '../_models/uicomponents/config-details';
import { HttpWrapperService } from '../_services/http/http-wrapper.service';

@Injectable()
export class ResolvingOfErrorsService {
  test?: ConfigDetails;


  constructor(private wrapperService: HttpWrapperService, private http: HttpClient) { }



  configDetails(data: any): ConfigDetails | undefined {
    this.wrapperService.processRequst(HttpVerbs.POST, dropdown.config, data).subscribe(x => {
      //console.log("response : " + JSON.stringify(x));
      this.processConfig(x);
    });
    return this.test;

  }

  processConfig(val: any) {
    debugger;
    let configObj = val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofConfigObjectCharacteristics.ConfigObjectCharacteristics;
    let attrObj = configObj[0].ListofCharacteristics.Characteristic[0].ListofAttributes.Attribute;
    // console.log("attrObj: " + JSON.stringify(attrObj))    
    var jsonCreation = `{`
    for (let i = 0; i < attrObj.length; i++) {
      if (attrObj[i].hasOwnProperty("Name"))
        //console.log(attrObj[i]["Name"] + ': ' + attrObj[i]["Value"])
        jsonCreation += `"${attrObj[i]["Name"]}":"${attrObj[i]["Value"]}",`;
    }
    jsonCreation += `"Test":"Teste123455"`
    jsonCreation += `}`;

    this.test = <ConfigDetails>JSON.parse(jsonCreation)
    console.log("test :" + this.test.Command);
  }
}
