import { Injectable } from '@angular/core';
import { from, Observable, Observer, of, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, first, map, retry } from 'rxjs/operators';
import { HttpWrapperService } from 'src/app/_services/http/http-wrapper.service';
import { FullAuditSummary } from 'src/app/_models/index';
import { WeatherForecast } from 'src/app/_models/samplemodel';
@Injectable()
export class FullAuditDetailsService {

  constructor(private wrapperService: HttpWrapperService,
    private httpclient: HttpClient) {
  }
  audi!: Observable<FullAuditSummary[]>;
  dc$ = of(1, 2)

  // getDetails(): Observable<WeatherForecast[]> {
  //   return this.wrapperService.processRequst<WeatherForecast[]>('GET', 'weatherforecast');
  // }

  getDetails(): Observable<any> {


    let headers = new HttpHeaders();
headers = headers.set('Content-Type','application/json');

    return this.httpclient.get('https://jsonplaceholder.typicode.com/posts/1',{headers:headers})
    .pipe(catchError(this.formatError))
    
  }

  formatError(err:HttpResponse<any>){
    return throwError(err);
  }


  postDetails(data: WeatherForecast[]): Observable<WeatherForecast[]> {
    var headers = new HttpHeaders({
      'auth': 'OAuth'
    });
    return this.wrapperService.processRequst<WeatherForecast[]>('POST', 'weatherforecast', data, headers);
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
