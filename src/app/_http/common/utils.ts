import { WMRequests } from 'src/app/_helper/index'

export class Utils {

  static prepareConfigRequest(configParams: any): any {
    let transform = JSON.parse(JSON.stringify(WMRequests.CONFIG));
    //assign filter attributes
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

  static escSequences(data: string) {
    //.replace('\r\n', '\\r\\n')
    let value = JSON.stringify(data).replace('\n', '\\n').replace('\r', '\\r').replace('\t', '\\t');
    return JSON.parse(value);
  }
}
