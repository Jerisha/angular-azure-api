import { Injectable } from '@angular/core';
import { from, Observable, Observer, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, first, map, retry } from 'rxjs/operators';
import { HttpWrapperService } from 'src/app/_services/http/http-wrapper.service';
import { FullAuditDetails } from 'src/app/_models/fullauditdetailsmodel';
import {  WeatherForecast } from 'src/app/_models/samplemodel';
@Injectable({
    providedIn: 'root' // just before your class
})
export class FullAuditDetailsService {

    constructor(private wrapperService: HttpWrapperService,
        private httpclient: HttpClient) {
    }
    audi!:Observable<FullAuditDetails[]>;
    dc$= of(1,2)

    getDetails():Observable<WeatherForecast[]> {  
      return this.wrapperService.processRequst<WeatherForecast[]>('GET', 'weatherforecast');
            
    }

    
    postDetails(data:WeatherForecast[]):Observable<any> {  
        return this.wrapperService.processRequst('POST', 'weatherforecast',data);              
      }

    //   postdeta(data:WeatherForecast[]): Observable<any> {
    //     const headers1 = new HttpHeaders().set('Content-Type', 'application/json');
    //     var dg =(JSON.stringify(data));
    //     debugger
    //     return this.httpclient.post('http://localhost:59809/weatherforecast/get',dg,{headers:headers1})       
        
    // } 

    // getdeta(): Observable<WeatherForecast[]> {
    //     return this.httpclient.get<WeatherForecast[]>('http://localhost:59809/weatherforecast',{observe:'body'})       
        
    // } 


     


}
