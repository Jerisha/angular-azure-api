import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
// import 'rxjs/add/operator/map';
import { MatSidenav } from '@angular/material/sidenav';


@Injectable({providedIn:'root'})
export class AuditDiscpancyReportService {

  public sidePan = new Subject<MatSidenav>();

  passValue(data:MatSidenav) {
    //passing the data as the next observable
    this.sidePan.next(data);
  }

}
