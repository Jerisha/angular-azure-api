import { PyRequests } from 'src/app/_helper/Constants/pyrequests-const';
import { WMRequests } from 'src/app/_helper/index'

export class Utils {

  static prepareConfigRequest(action: any, configParams: any): any {
    let transform = JSON.parse(JSON.stringify(WMRequests.CONFIG));
    //assign filter attributes
    transform.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[0].Value = action;
    transform.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[1].Value = configParams;
    return transform;
  }  

  static prepareQueryRequest(pageIdentifier: string, reportIdentifier: string, queryParams: any): any {
    let transform = JSON.parse(JSON.stringify(WMRequests.QUERY));
    transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ItemName = pageIdentifier;

    //identifier
    transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //queryparameters
    transform.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofQueryObjectCharacteristics.QueryObjectCharacteristics[0].ListofIdentifiers.Identifier = queryParams;
    return transform;
  }

  static prepareGetRequest(pageIdentifier: string, reportIdentifier: string, getParams: any): any {
    let transform = JSON.parse(JSON.stringify(WMRequests.GET));
    transform.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ItemName = pageIdentifier;

    //identifier
    transform.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Getparameters
    transform.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ListofGetObjectCharacteristics.GetObjectCharacteristics[0].ListofIdentifiers.Identifier = getParams;
    return transform;
  }

  static prepareUpdateRequest(pageIdentifier: string, reportIdentifier: string, updateIdentifier: any, updateParams: any): any {
    let transform = JSON.parse(JSON.stringify(WMRequests.UPDATE));
    transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Updateidentifier
    transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofIdentifiers.Identifier = updateIdentifier;
    //UpdateAttribute
    transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofAttributes.Attribute = updateParams;
    return transform;
  }
  static prepareCreateRequest(pageIdetifier: string, reportIdentifier: string, createIdentifier: any): any {
    let transform = JSON.parse(JSON.stringify(WMRequests.CREATE));
    console.log(transform, 'transform')
    transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ItemName = pageIdetifier;
    //identifier
    console.log(createIdentifier, 'createIdentifier')
    transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Updateidentifier
    transform.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofIdentifiers.Identifier = createIdentifier;
    console.log('transform', JSON.stringify(transform)) 
    // transform.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofAttributes.Attribute = UpdateAttribute;
    console.log(transform, 'transform')
    return transform;

  }

  static escSequences(data: string) {
    //.replace('\r\n', '\\r\\n')
    let value = JSON.stringify(data).replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t');
    return JSON.parse(value);
  }

//Python Requests //
  static preparePyConfig(action: any, configParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.CONFIG));
    //assign filter attributes
    transform.wmRequest.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[0].Value = action;
    transform.wmRequest.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[1].Value = configParams;
    return transform;
  }

  static preparePyQuery(pageIdentifier: string, reportIdentifier: string, queryParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.QUERY));
    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //queryparameters
    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofQueryObjectCharacteristics.QueryObjectCharacteristics[0].ListofIdentifiers.Identifier = queryParams;
    return transform;
  }

  static preparePyGet(pageIdentifier: string, reportIdentifier: string, getParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.GET));
    transform.wmRequest.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ItemName = pageIdentifier;

    //identifier
    transform.wmRequest.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Getparameters
    transform.wmRequest.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ListofGetObjectCharacteristics.GetObjectCharacteristics[0].ListofIdentifiers.Identifier = getParams;
    return transform;
  }

  static preparePyUpdate(pageIdentifier: string, reportIdentifier: string, updateIdentifier: any, updateParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UPDATE));
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Updateidentifier
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofIdentifiers.Identifier = updateIdentifier;
    //UpdateAttribute
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofAttributes.Attribute = updateParams;
    return transform;
  }
  static preparePyCreate(pageIdentifier: string, reportIdentifier: string, createIdentifier: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.CREATE));
    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Createidentifier
    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofIdentifiers.Identifier = createIdentifier;
    //CreateAttribute
   // transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofAttributes.Attribute = createParams;
    return transform;
  }

}
