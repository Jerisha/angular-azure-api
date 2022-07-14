// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  UnsolTransactionDays:'62',
  production: false,
  api_auth:'https://ukrpirvr.ad.plc.cwintra.com:8044/userProfiles/',
  api_py_uat :'https://ukrpirvr.ad.plc.cwintra.com:8044/pythonUATAPI/',
  api_py_sit :'https://ukrpirvr.ad.plc.cwintra.com:8044/pythonAPI/',
  api_py_dev:'https://ukrpirvr.ad.plc.cwintra.com:8044/pythonDevAPI/', 
  api_sit:'http://10.196.212.98:6054/restv2/EdgeUIManagementServicesV200/',
  api_dev:'http://10.196.220.58:6054/restv2/EdgeUIManagementServicesV200/',
  api_url:'http://10.196.220.58:6054/restv2/OperatorServiceNetwork/',
  api_mediator :'https://wm-mediator-tst.hosts.plc.cwintra.com:26231/ws/VS_OSN2SampleAPI_St3/1.0/OperatorServiceNetwork/',


//  api_auth:'https://ukond1vr.ad.plc.cwintra.com:6054/userProfiles/',
//  api_py_dev:'https://ukond1vr.ad.plc.cwintra.com:6054/pythonDevAPI/',
//  api_py_sit:'https://ukont1vr.ad.plc.cwintra.com:6054/userProfiles/',
//  api_py_uat:'https://ukont2vr.ad.plc.cwintra.com:6054/pythonDevAPI/',
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
