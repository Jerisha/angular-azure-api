import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-maintain-charge-band-reporting-group',
  templateUrl: './maintain-charge-band-reporting-group.component.html',
  styleUrls: ['./maintain-charge-band-reporting-group.component.css']
})
export class MaintainChargeBandReportingGroupComponent implements OnInit {
  displayedColumns: string[] = ['chargeBand', 'chargeBandDescription', 'aaCode', 'billableFixed', 'durationThreshold', 
  'btTl4Code', 'btTl4Description', 'vfTl4Code', 'vfTl4description', 'oloTl4Code', 'oloTl4Description',
  'internationalBarring', 'kenanJurisdictionCode', 'updateChargeBand'];
  dataSource = [
    {chargeBand: 'SC001', chargeBandDescription: '0 ppm Service charge', aaCode: 'AA083', billableFixed: 'Yes',
    durationThreshold: '0', btTl4Code: 'KD', btTl4Description: 'SC001 BT', vfTl4Code: 'BD', vfTl4description: 'SC001 VF',
    oloTl4Code: 'SD', oloTl4Description: 'SC001 OLO', internationalBarring: 'No', kenanJurisdictionCode: '272'},
    {chargeBand: 'SC002', chargeBandDescription: '1 ppm Service charge', aaCode: 'AA084', billableFixed: 'Yes',
    durationThreshold: '0', btTl4Code: 'KB', btTl4Description: 'SC002 BT', vfTl4Code: 'BD', vfTl4description: 'SC002 VF',
    oloTl4Code: 'SD', oloTl4Description: 'SC002 OLO', internationalBarring: 'No', kenanJurisdictionCode: '273'},
    {chargeBand: 'SC003', chargeBandDescription: '2 ppm Service charge', aaCode: 'AA085', billableFixed: 'Yes',
    durationThreshold: '0', btTl4Code: 'KD', btTl4Description: 'SC003 BT', vfTl4Code: 'BD', vfTl4description: 'SC003 VF',
    oloTl4Code: 'SB', oloTl4Description: 'SC003 OLO', internationalBarring: 'No', kenanJurisdictionCode: '274'},
    {chargeBand: 'SC004', chargeBandDescription: '3 ppm Service charge', aaCode: 'AA086', billableFixed: 'Yes',
    durationThreshold: '0', btTl4Code: 'KD', btTl4Description: 'SC004 BT', vfTl4Code: 'BD', vfTl4description: 'SC004 VF',
    oloTl4Code: 'SB', oloTl4Description: 'SC004 OLO', internationalBarring: 'No', kenanJurisdictionCode: '275'},
    {chargeBand: 'SC005', chargeBandDescription: '4 ppm Service charge', aaCode: 'AA087', billableFixed: 'Yes',
    durationThreshold: '0', btTl4Code: 'KD', btTl4Description: 'SC005 BT', vfTl4Code: 'BD', vfTl4description: 'SC005 VF',
    oloTl4Code: 'SB', oloTl4Description: 'SC005 OLO', internationalBarring: 'No', kenanJurisdictionCode: '276'},
  ];
  length = 5;
  pageSize = 500;
  pageIndex = 0;
  hidePageSize = true;
  disabled = false;

  constructor() { }

  ngOnInit(): void {
  }

}
