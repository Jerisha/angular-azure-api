import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../../_enums/http-verbs.enum';
import { WebMethods } from '../../_enums/web-methods.enum';
import { ConfigDetails } from '../../_models/uicomponents/config-details';
import { HttpWrapperService } from '../../_services/http/http-wrapper.service';

@Injectable()
export class ResolvingOfErrorsService {
  test?: any;


  constructor(private wrapperService: HttpWrapperService) { }
  apiTest(data: any) {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, data).subscribe(x => {
      console.log("response : " + JSON.stringify(x));
      //this.processConfig(x);
    });
    //return this.test;

  }



  configDetails(data: any): ConfigDetails | undefined {
    this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, data).subscribe(x => {
      console.log("response : " + JSON.stringify(x));
      //this.processQuery(x, webMethods.query);
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
        jsonCreation += `"${attrObj[i]["Name"]}":"${attrObj[i]["Value"]}",`;
    }
    jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
    jsonCreation += `}`;

    this.test = JSON.parse(jsonCreation)
    console.log("test :" + this.test);
  }

  processQuery(val: any, type: string) {
    debugger;
    // let statusObj = val.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory[1];
    // console.log("statusObj: " + JSON.stringify(statusObj))

    let categories = val.QueryObjectResponseType.ListofQueryObjectCategory.QueryObjectCategory
    // if(type==='/QueryObject')

    // else if(type==='/ConfigObject')
    // categories =val.ConfigObjectResponseType.ListofConfigObjectCategory.ConfigObjectCategory
    // console.log("categories: " + JSON.stringify(categories))

    //----
    var jsonCreation = `[`;
    if (categories != undefined && categories.length > 0) {
      //Iterate categories object
      categories?.forEach((category: any) => {
        //Check ItemName is not Update
        if (category?.hasOwnProperty("ItemName") && category["ItemName"] != "Update"
          && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
          jsonCreation += `{`
          //Iterate characteristics object
          jsonCreation = this.resolveCharacteristic(category, jsonCreation);
          jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
          jsonCreation += `},`;
        } else if (category?.hasOwnProperty("ItemName") && category["ItemName"] === "Update"
          && category?.hasOwnProperty("ListofQueryObjectCharacteristics")) {
          //jsonCreation += `{`
          //Iterate characteristics object
          //Check category - Status
          // jsonCreation = this.resolveCharacteristic(category, jsonCreation);
          // jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
          // jsonCreation += `},`;
        }
      });
      jsonCreation = jsonCreation.slice(0, jsonCreation.length - 1);
      jsonCreation += `]`;
    }

    this.test = JSON.parse(jsonCreation)
    console.log("test :" + JSON.stringify(this.test));
  }


  private resolveCharacteristic(category: any, jsonCreation: string) {
    category.ListofQueryObjectCharacteristics.QueryObjectCharacteristics?.forEach((Characteristic: any) => {
      //Bind Identifiers
      if (Characteristic.hasOwnProperty("ListofIdentifiers")) {
        Characteristic.ListofIdentifiers.Identifier?.forEach((element: any) => {
          if (element.hasOwnProperty("Name"))
            jsonCreation += `"${element["Name"]}":"${element.hasOwnProperty("Value") ? element["Value"] : ''}",`;
        });
      }
      //Bind Attributes
      if (Characteristic.hasOwnProperty("ListofAttributes")) {
        let attr = Characteristic.ListofAttributes.Attribute;
        for (let i = 0; i < attr.length; i++) {
          if (attr[i].hasOwnProperty("Name"))
            jsonCreation += `"${attr[i]["Name"]}":"${attr[i].hasOwnProperty("Value") ? attr[i]["Value"] : ''}",`;
        }
      }
    });
    return jsonCreation;
  }
}
