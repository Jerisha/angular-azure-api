import { HttpHeaders, HttpParams } from "@angular/common/http";

export class FrameHttpRequest{
    body?:string ='';
    httpheaders?:HttpHeaders;
    httpParams?:HttpParams;
    responseType?:string;
}