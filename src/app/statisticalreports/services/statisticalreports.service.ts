import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpVerbs } from '../../_http/enums/http-verbs.enum';
import { WebMethods } from '../../_http/enums/web-methods.enum';
import { ConfigDetails } from '../../_http/models/config-details';
import { HttpWrapperService } from '../../_http/http-wrapper.service';


@Injectable()
export class statisticalreport {
  test?: any;
  constructor(private wrapperService: HttpWrapperService) { }

   queryDetails(request: any): Observable<any> {
     
   let ReportIdentifier:string= request.QueryObjectRequest.QueryObjectRequestType.ListofQueryObjectCategory.QueryObjectCategory[0].ItemName;
   console.log('ReportIdentifier',ReportIdentifier);
   if(ReportIdentifier=='DayToDay')
   {
        const observable = new Observable(observer => {
      this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request).subscribe((res: any) =>
        observer.next(this.custom(res)));      

    });
    return observable
  }
  else if(ReportIdentifier=='MonthOnMonth')
  {
    const observable = new Observable(observer => {
      this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request).subscribe((res: any) =>
        observer.next(this.customMonthly(res)));      

    });
    return observable
  }
  else{
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.QUERY, request);   
  }
     
  }
  configDetails(request: any): Observable<any> {
    return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.CONFIG, request);
  }


  custom(data: any) {
    console.log('service.custom' + JSON.stringify(data));
    let arrdate:any[]=[];
   let testdata:any=data[0].DatewiseData;
    if (testdata != undefined && testdata.length > 0) {
      testdata?.forEach((category: any) => {      
       let testdate:any= category.Date;
        category.Sources?.forEach((char: any) => {
          debugger;
          char.StatisticDate = testdate;
          arrdate.push(char);
      });    
      delete category.Date
      });
  }
  delete data[0].DatewiseData;
 data[0].DatewiseData=arrdate;
    return data;
  }


  customMonthly(data: any) {
    //console.log('service.custom' + JSON.stringify(data));
    let arrdate:any[]=[];
   let testdata:any=data[0].MonthlyData;
    if (testdata != undefined && testdata.length > 0) {
      testdata?.forEach((category: any) => {      
       let testdate:any= category.Month;
        category.Sources?.forEach((char: any) => {
          debugger;
          char.Month = testdate;
          arrdate.push(char);
      });    
      delete category.Date
      });
  }
  delete data[0].MonthlyData;
 data[0].MonthlyData=arrdate;
// console.log('Monthly custom data',data[0].MonthlyData)
    return data;
  }



}