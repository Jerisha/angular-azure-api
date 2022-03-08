import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { audit } from 'rxjs/operators';
import { HttpWrapperService, HttpVerbs, WebMethods } from 'src/app/_http/index';

@Injectable({
  providedIn: 'root'
})
export class AuditTrailService {

  constructor(private wrapperService: HttpWrapperService) { }


  getDetails(request: any): Observable<any> {
    const observable = new Observable(observer => {
      this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.GET, request).subscribe((res: any) => {
      if(res) return observer.next(this.custom(res));
    });      
    });


    // return this.wrapperService.processRequest(HttpVerbs.POST, WebMethods.GET, request);
    return observable;
  }
  

  custom(auditdata: any) {

      // for full audit
      if(auditdata[0].FullAudit)
      {
        let extAttr: any = [
          // { "TelephoneNumber": auditdata[0].TelephoneNumber },
          ];
        // console.log("successs");
        auditdata[0].FullAudit.forEach((msg:any) => {
            let UComment: any = [];
            // console.log("Comment length " + UComment.length);
            // console.log(msg.UserComment.AuditActId);
            if(msg.UserComment)
            {
            msg.UserComment.forEach((comment:any) => {
              let userComment: any = {
                "TelephoneNumber": auditdata[0].TelephoneNumber,
                "AuditActId": comment.AuditActId,
                //CreationDate changed to CreationOn as oer new requirement
                "CreationOn": comment.CreationDate,
                "CreatedBy": comment.CreatedBy,
                "ResolutionType": comment.ResolutionType,
                "Comments": comment.Comments
              }
              UComment.push(userComment);
            });
          }

            let extdata = {
              "TelephoneNumber": auditdata[0].TelephoneNumber,
              "AuditActId": msg.AuditActId,
              "ExternalCliStatus": msg.ExternalCliStatus,
              "FullAuditCliStatus": msg.FullAuditCliStatus,
              "ResolutionType": msg.ResolutionType,
              "UserComment": UComment
            }
            extAttr.push(extdata);
          });

          auditdata[0].FullAudit = extAttr;
        }

          // for seperate internal audit
            if(auditdata[0].SeperateInternalAudit)
         {

          let intAttr: any = [
          ];
          auditdata[0].SeperateInternalAudit.forEach((msg:any) => {
            let UComment: any = [];
            // console.log("Comment length " + UComment.length);
            if(msg.UserComment)
            {
            msg.UserComment.forEach((comment:any) => {
              let userComment: any = {
                "TelephoneNumber": auditdata[0].TelephoneNumber,
                "AuditActId": comment.AuditActId,
                 //CreationDate changed to CreationOn as oer new requirement
                "CreationOn": comment.CreationDate,
                "CreatedBy": comment.CreatedBy,
                "ResolutionType": comment.ResolutionType,
                "Comments": comment.Comments
              }
              UComment.push(userComment);
            });
          }

            let extdata = {
              "TelephoneNumber": auditdata[0].TelephoneNumber,
              "AuditActId": msg.AuditActId,
              "CliStatus": msg.CliStatus,
              "ResolutionType": msg.ResolutionType,
              "UserComment": UComment
            }
            intAttr.push(extdata);
          });
          auditdata[0].SeperateInternalAudit = intAttr;
        }
        // console.log("Audit data " + JSON.stringify(auditdata));
        return auditdata;
  }
  
}
