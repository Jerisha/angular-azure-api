
import { PyRequests } from 'src/app/_helper/Constants/pyrequests-const';
// import { PyRequests } from 'src/app/_helper/Constants/pyrequests-const';
import { WMRequests } from 'src/app/_helper/index';

export class Utils {


//#region wM API call
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

  static prepareUpdateRequest(pageIdentifier: string, reportIdentifier: string, updateIdentifier: any, updateParams?: any): any {
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
  //#endregion 

  //Python Requests //
  static preparePyConfig(action: any, configParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.CONFIG));
    // assign userId
    transform.wmRequest.ConfigObjectRequest.ConfigObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];
     //assign filter attributes
    transform.wmRequest.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[0].Value = action;
    transform.wmRequest.ConfigObjectRequest.ConfigObjectRequestType.ListofConfigObjectCategory.ConfigObjectCategory[0].ListofAttributes.Attribute[1].Value = configParams;
    return transform;
  }

  static preparePyQuery(pageIdentifier: string, reportIdentifier: string, queryParams: any, reqParams?: any): any {
    debugger;
    let transform = JSON.parse(JSON.stringify(PyRequests.QUERY));
    // assign userId
    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];
    //userparams
    transform.UserParams = user();
    //updating request params 
    if (reqParams)
      transform.RequestParams = transform.RequestParams.concat(reqParams);

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

     // assign userId
     transform.wmRequest.GetObjectRequest.GetObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];
    //identifier
    transform.wmRequest.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Getparameters
    transform.wmRequest.GetObjectRequest.GetObjectRequestType.ListofGetObjectCategory.GetObjectCategory[0].ListofGetObjectCharacteristics.GetObjectCharacteristics[0].ListofIdentifiers.Identifier = getParams;
    return transform;
  }

  static preparePyUpdate(pageIdentifier: string, reportIdentifier: string, updateIdentifier: any, updateParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UPDATE));
 // assign userId
 transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];

    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Updateidentifier
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofIdentifiers.Identifier = updateIdentifier;
    //UpdateAttribute
    transform.wmRequest.UpdateObjectRequest.UpdateObjectRequestType.ListofUpdateObjectCategory.UpdateObjectCategory[0].ListofUpdateObjectCharacteristics.UpdateObjectCharacteristics[0].ListofAttributes.Attribute = updateParams;
    return transform;
  }

  static preparePyCreate(pageIdentifier: string, reportIdentifier: string, createIdentifier: any, createParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.CREATE));
// assign userId
transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];

    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Updateidentifier
    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofIdentifiers.Identifier = createIdentifier;
    //UpdateAttribute
    transform.wmRequest.CreateObjectRequest.CreateObjectRequestType.ListofCreateObjectCategory.CreateObjectCategory[0].ListofCreateObjectCharacteristics.CreateObjectCharacteristics[0].ListofIdentifiers.Identifier = createParams;
    return transform;
  }

  static preparePyDelete(pageIdentifier: string, reportIdentifier: string, deleteIdentifier: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.DELETE));
// assign userId
transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];

    transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.ListofDeleteObjectCategory.DeleteObjectCategory[0].ItemName = pageIdentifier;

    transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.ListofDeleteObjectCategory.DeleteObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //Deleteidentifier
    transform.wmRequest.DeleteObjectRequest.DeleteObjectRequestType.ListofDeleteObjectCategory.DeleteObjectCategory[0].ListofDeleteObjectCharacteristics.DeleteObjectCharacteristics[0].ListofIdentifiers.Identifier = deleteIdentifier;
    return transform;
  }

  static preparePyPaf(PAFIdentifiers: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.PAFQUERY));
    transform.AddressParams = PAFIdentifiers;    
    return transform;
  }

  static preparePyMetaData(configParams: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.METADATA));
    
    transform.MetaDataRequest.MetaDataRequestType.ListofMetaDataObjectCategory.MetaDataObjectCategory[0].ListofAttributes.Attribute[0].Value = configParams;
    return transform;
  }

  static preparePyExportQuery(pageIdentifier: string, reportIdentifier: string, queryParams: any, colounmMapping: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.EXPQUERY));
    transform.RequestParams[7] = colounmMapping
    // assign userId
transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.RequestIdentifiers.Identifier[0].Value = [userId()];

    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ItemName = pageIdentifier;
    //identifier
    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofIdentifiers.Identifier[0].Value = [reportIdentifier];
    //queryparameters
    transform.wmRequest.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ListofQueryObjectCharacteristics.QueryObjectCharacteristics[0].ListofIdentifiers.Identifier = queryParams;
    return transform;
  }

  static preparePyExportSummary(): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.EXPSUMMARY));
    return transform;
  }

  static preparePydownloadFile(fullFilePath: string): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.DOWNLOADFILE));
    transform.UserParams = user();
    transform.FilePath = fullFilePath
    return transform;
  }

  static preparePyUIQuery(reportIdentifier: any, subReportName: any, recordIdentifier?: any, profilename?: any, reportName?: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UIQUERY));
    if (recordIdentifier)
      transform.UserParams = user();
    transform.RequestParams[0].RecordIdentifier = recordIdentifier;
    transform.RequestParams[0].ReportIdenitifer = reportIdentifier;
    transform.RequestParams[0].SubReportName = subReportName;
    transform.RequestParams[0].ProfileName = profilename;
    transform.RequestParams[0].ReportName = reportName;


    // console.log(JSON.stringify(transform))
    return transform;
  }

  static preparePyUIQueryDoc(reportIdentifier: any, subReportName: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UIQUERY));
    
    transform.UserParams = user();    
    transform.RequestParams[0].ReportIdenitifer = reportIdentifier;
    transform.RequestParams[0].SubReportName = subReportName;

    return transform;
  }


  static preparePyUIUpdate(reportIdentifier: string, subReportName: string, recordIdentifier: string, updateData: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UIUPDATE));
    transform.UserParams = user();
    transform.RequestParams[0].ReportIdenitifer = reportIdentifier;
    transform.RequestParams[0].SubReportName = subReportName;
    transform.RequestParams[0].RecordIdentifier = recordIdentifier;
    transform.Data[0] = updateData;

    return transform;
  }

  static preparePyUICreate(reportIdentifier: string, subReportName: string, recordIdentifier: string, createData: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UICREATE));
    transform.UserParams = user();
    transform.RequestParams[0].ReportIdenitifer = reportIdentifier;
    transform.RequestParams[0].SubReportName = subReportName;
    transform.RequestParams[0].RecordIdentifier = recordIdentifier;
    transform.Data[0] = createData;
    return transform;
  }
  
  static preparePyUICreateFirstRequest(reportIdentifier: string, subReportName: string, UserName: string, is_ldap_auth: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UICREATEFIRST));
    transform.RequestParams[0].reportidentifier = reportIdentifier;
    transform.RequestParams[0].SubReportName = subReportName;
    transform.RequestParams[0].username = UserName;
    transform.RequestParams[0].is_ldap_auth = is_ldap_auth;
    return transform;
  }

  static preparePyUIDelete(reportIdentifier: string, subReportName: string, recordIdentifier: string, deleteData: any): any {
    let transform = JSON.parse(JSON.stringify(PyRequests.UIDELETE));
    transform.UserParams = user();
    transform.RequestParams[0].ReportIdenitifer = reportIdentifier;
    transform.RequestParams[0].SubReportName = subReportName;
    transform.RequestParams[0].RecordIdentifier = recordIdentifier;
    transform.Data[0] = deleteData;
    return transform;
  }

  // static userDetails() {
  //   let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
  //   let userDetails = { UserID: user?.username }
  //   return userDetails;

  // }
}

function user(): any {
  let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}')
  return [
    { "UserID": user?.username },
    { "RoleID": user?.profilename }
  ]
}

function userId(): any {
  let user = JSON.parse(sessionStorage.getItem('currentUser') || '{}')
  return user?.username 
}
