import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Utils } from 'src/app/_http';
import { AuditReportsService } from '../services/audit-reports.service';

const myData = [{
  ACTID:	'29',
ACTStatusDate:	'20-NOV-20 12.58.08.000000 PM',
BTOnlyCount:	'346317',
VodafoneOnlyCount:	'583839',
MatchedCount:	'3151127',
MismatchedCount:	'215545',
LiveinSource:	'506467'
},
{
  ACTID: '	24',
ACTStatusDate: '	05-JUL-19 05.23.49.000000 PM',
BTOnlyCount: '	1011849',
VodafoneOnlyCount: '	233466',
MatchedCount: '	3273257',
MismatchedCount: '	444188',
LiveinSource: '	78593'
},
{
  ACTID: '	27',
ACTStatusDate: '	04-AUG-20 01.47.01.000000 PM',
BTOnlyCount: '	346322',
VodafoneOnlyCount: '	583839',
MatchedCount: '	3151122',
MismatchedCount: '	215545',
LiveinSource: '	176509'
},
{
  ACTID: '	28',
ACTStatusDate: '	28-AUG-20 03.25.47.000000 PM',
BTOnlyCount: '	346322',
VodafoneOnlyCount: '	583839',
MatchedCount: '	3151122',
MismatchedCount: '	215545',
LiveinSource: '	185705'
}];

@Component({
  selector: 'app-full-audit-history',
  templateUrl: './full-audit-history.component.html',
  styleUrls: ['./full-audit-history.component.css']
})

export class FullAuditHistoryComponent implements OnInit {

  constructor(private service:AuditReportsService) { }

  fullAuditHistory: any ;
  private readonly onDestroy = new Subject<void>();

  ColumnDetails: any = [
    { header: 'ACT ID', headerValue: 'ACTID'},
    { header: 'ACT Status Date', headerValue: 'ACTStatusDate'},
    { header: 'Active in - BT Only', headerValue: 'SupplierOnlyCount' },
    { header: 'Active in - Vodafone Only', headerValue: 'VodafoneOnlyCount' },
    { header: 'Matched Count', headerValue: 'MatchedCount' },
    { header: 'Mismatched Count', headerValue: 'MismatchedCount' },
    { header: 'Live in Source', headerValue: 'LiveInSource' },
   
  ];
  dataColumns = this.ColumnDetails?.map((e:any) => e.headerValue);

  ngOnInit(): void {
    //this.fullAuditHistory = myData;
    let request = Utils.preparePyGet('FullAuditHistory','FullAuditHistory',[{}]);
    console.log(request)
    this.service.getDetails(request).pipe(takeUntil(this.onDestroy)).subscribe((res:any)=> {
      this.fullAuditHistory = res.data.AuditHistory; 
    })
}

}
