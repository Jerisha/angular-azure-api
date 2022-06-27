
import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AddressDetails } from 'src/app/_shared/models/address-details';
import { Router } from '@angular/router';
import { AuditTrailService } from './services/audit-trail.service';
import { Utils } from 'src/app/_http/common/utils';
import { Observable } from 'rxjs';
import { map} from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-telephone-audit-trail',
  templateUrl: './telephone-audit-trail.component.html',
  styleUrls: ['./telephone-audit-trail.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class TelephoneAuditTrailComponent  {
  panelOpenState: boolean = false;
  panelOpenState1: boolean = false;
  panelOpenState2: boolean = false;
  step: number = 2;
  addressDetails = new AddressDetails();
  auditTrailReport$!: Observable<any>;
  @Input() telNo!: string;
  @Input() repIdentifier!: string;
  @Output() AddressCheckSelected = new EventEmitter<any[]>();
  @ViewChild('auditTabScroll') scrollDemo!: ElementRef;
  isLoading: boolean = true;
  @Output() isLiveRecord = new EventEmitter<any>();
  
testfun(islive :boolean)
{
  this.isLiveRecord.emit(islive )
  //console.log(islive,'live')
} 
  constructor(private _route: Router, private service: AuditTrailService, private spinner: NgxSpinnerService) {
  }

  columnsToDisplay = [{ header: 'Action', headerValue: 'Action' },
  { header: 'Count Transaction', headerValue: 'CntTransaction' },
  { header: 'Status', headerValue: 'Status' },
  { header: 'Created On', headerValue: 'CreatedOn' },
  { header: 'Source System', headerValue: 'Source' },
  { header: 'Customer Name', headerValue: 'CustomerName' }];

  dataColumns = this.columnsToDisplay?.map((e) => e.headerValue);

  UnsolicitedHeader: string[] = ['Code', 'Error Message', 'Date', 'Franchise', 'Postcode', 'File Name'];
  auditTrailInternalDisplay: string[] = ['AuditActId', 'TelephoneNumber', 'ResolutionType', 'CliStatus', 'UserComment'];
  fullAuditTrailDisplay: string[] = ['AuditActId', 'TelephoneNumber', 'ResolutionType', 'ExternalCliStatus', 'FullAuditCliStatus', 'UserComment'];

  internalAuditTrailHeader = [ {header: 'Audit Act Id', headerValue: 'AuditActId'},
  {header: 'Telephone Number', headerValue: 'TelephoneNumber'},
  {header: 'Resolution Type', headerValue: 'ResolutionType'},
  {header: 'Cli Status', headerValue: 'CliStatus'},
  {header: 'User Comment', headerValue: 'UserComment'}];

  fullAuditTrailHeader = [ {header: 'Audit Act Id', headerValue: 'AuditActId'},
  {header: 'Telephone Number', headerValue: 'TelephoneNumber'},
  {header: 'Resolution Type', headerValue: 'ResolutionType'},
  {header: 'External Cli Status', headerValue: 'ExternalCliStatus'},
  {header: 'Full Audit Cli Status', headerValue: 'FullAuditCliStatus'},
  {header: 'User Comment', headerValue: 'UserComment'}];

  ngOnChanges(changes: SimpleChanges) {
    if(changes.telNo.currentValue != '')
    {
    if (changes.telNo.currentValue != changes.telNo.previousValue) {
      this.setStep(2);
      let request = Utils.preparePyGet("TelephoneNumberAuditTrail", this.repIdentifier, [{
        Name: "TelephoneNumber",
        Value: [this.telNo]
      }]);
      // Value : [ "01171617562" ] }]);
      this.isLoading = true;
      this.spinner.show();
      this.auditTrailReport$ = this.service.getDetails(request).pipe(map((res: any) => {
        let transform: any = [];
        transform = res.data;
        if(res.params.TelephoneNumber) transform.TelephoneNumber = res.params.TelephoneNumber;
        this.isLoading = false;
        this.spinner.hide();
        return transform;
      }

      ));

    }
  }

  }

  setStep(index: number) {
    this.step = index;
  }

  ActiveAddressDetails(): AddressDetails {
    return this.addressDetails;
  }

  /*  unsol restriction removed
  customScroll(i: number, isUnSol?: boolean) {
    if(isUnSol) {
      i == 0 ? this.scrollDemo.nativeElement.scrollTo(0,64) : this.scrollDemo.nativeElement.scrollTo(0,(i*25) + 94);
    } else {
    i == 0 ? this.scrollDemo!.nativeElement.scrollTo(0,32) : this.scrollDemo.nativeElement.scrollTo(0,(i*25) + 62);
    }
  } */

  customScroll(i:number, isUnSol?: boolean) {
  //  this.scrollDemo.nativeElement.scrollTo(0,(i*25) + 94);
   setTimeout(()=>{ isUnSol ? this.scrollDemo.nativeElement.scrollTo(0,(i*25) + 94) : this.scrollDemo.nativeElement.scrollTo(0,(i*25) + 62); }, 200);
  }

  setAddressDetails(section: string, element?: any) {
    // console.log(element.details.postcode);
    if (section === 'TransactionDetails') {
      this.addressDetails.isData = true;
      this.addressDetails.postcode = element.Postcode;
      this.addressDetails.CustomerName = element.CustomerName;
      this.addressDetails.internalAddr1 = element.InternalAddress1;
      this.addressDetails.internalAddr2 = element.InternalAddress2;
      this.addressDetails.internalAddr3 = element.InternalAddress3;
      this.addressDetails.internalAddr4 = element.InternalAddress4;
      this.AddressCheckSelected.emit([this.addressDetails]) // need to check
 
    } else if (section === 'RemoveAddress') {
      this.addressDetails = new AddressDetails();
    }
    // console.log(this.addressDetails);
  }


  expandedElement: null | undefined;

}

