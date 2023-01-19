import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submit-notif-gui',
  templateUrl: './submit-notif-gui.component.html',
  styleUrls: ['./submit-notif-gui.component.css']
})
export class SubmitNotifGuiComponent implements OnInit {
  displayedColumns: string[] = ['selectRow', 'numberRange', 'btChargeBand', 'numberRangeOwner', 'implementationDate', 'numberRangeHost', 'directOloIc', 'routingCp',
'testNumbers', 'vtNgn', 'internationalBarring'];
  dataSource = [
    {numberRange: 'SC001'},
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
