import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  fullAuditHistory: any ;
 
  ColumnDetails: any = [
    { header: 'ACT ID', headerValue: 'ACTID'},
    { header: 'ACT Status Date', headerValue: 'ACTStatusDate'},
    { header: 'BT Only Count', headerValue: 'BTOnlyCount' },
    { header: 'Vodafone Only Count', headerValue: 'VodafoneOnlyCount' },
    { header: 'Matched Count', headerValue: 'MatchedCount' },
    { header: 'Mismatched Count', headerValue: 'MismatchedCount' },
    { header: 'Live in Source', headerValue: 'LiveinSource' },
   
  ];
  dataColumns = this.ColumnDetails?.map((e:any) => e.headerValue);

  ngOnInit(): void {
    this.fullAuditHistory = myData;
}

}
