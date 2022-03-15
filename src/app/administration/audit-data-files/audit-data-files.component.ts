import { Component, OnInit } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { of } from 'rxjs';
import { Tab } from 'src/app/uicomponents/models/tab';
import { TableItem } from 'src/app/uicomponents/models/table-item';

const ELEMENT_DATA = [
  { ACTID: "19", FileName: "BT101330091301.DAT", CreatedOn: "22/01/2021" },
  { ACTID: "21", FileName: "BT101330091301.DAT", CreatedOn: "21/01/2021" },
  { ACTID: "20", FileName: "BT101330091301.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "17", FileName: "BT101330091301.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "15", FileName: "BT101330091301.DAT", CreatedOn: "19/01/2021" },
  { ACTID: "18", FileName: "BT101330091301.DAT", CreatedOn: "18/01/2021" },
  { ACTID: "19", FileName: "BT101330091301.DAT", CreatedOn: "22/01/2021" },
  { ACTID: "21", FileName: "BT101330091301.DAT", CreatedOn: "21/01/2021" },
  { ACTID: "20", FileName: "BT101330091301.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "17", FileName: "BT101330091301.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "15", FileName: "BT101330091301.DAT", CreatedOn: "19/01/2021" },
  { ACTID: "18", FileName: "BT101330091301.DAT", CreatedOn: "18/01/2021" },
  { ACTID: "19", FileName: "BT101330091301.DAT", CreatedOn: "22/01/2021" },
  { ACTID: "21", FileName: "BT101330091301.DAT", CreatedOn: "21/01/2021" },
  { ACTID: "20", FileName: "BT101330091301.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "17", FileName: "BT101330091301.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "15", FileName: "BT101330091301.DAT", CreatedOn: "19/01/2021" },
  { ACTID: "18", FileName: "BT101330091301.DAT", CreatedOn: "18/01/2021" }
]

@Component({
  selector: 'app-audit-data-files',
  templateUrl: './audit-data-files.component.html',
  styleUrls: ['./audit-data-files.component.css']
})
export class AuditDataFilesComponent implements OnInit {

  btAuditFileDetailsTable!: TableItem;
  tabs: Tab[] = [];
  showDetails: boolean = false;
  btAuditFileDetailsTableDetails: any = [
    { headerValue: 'ACTID', header: 'ACTID', showDefault: true, isImage: false },
    { headerValue: 'FileName', header: 'File Name', showDefault: true, isImage: false },
    { headerValue: 'CreatedOn', header: 'Created On', showDefault: true, isImage: false },
    { headerValue: 'DownloadFile', header: 'Download File', showDefault: true, isImage: true },

  ]
  selectedTab: number = 0;
  constructor() { }

  ngOnInit(): void {

  }

  removeTab(index: number) {
    this.tabs.splice(index, 1);
    this.showDetails = this.tabs.length > 0 ? true : false
  }

  getFileDetails(fileType: string) {
    if (fileType === 'BTAuditFileDetails') {
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'BT Audit File Details'
        });
        this.btAuditFileDetailsTable = {
          data: of({datasource:ELEMENT_DATA,
            totalrecordcount: 100,
            totalpages:1,
            pagenumber:1}),
          Columns: this.btAuditFileDetailsTableDetails,
          selectCheckbox: true,
          imgConfig: [{ headerValue: 'DownloadFile', icon: 'save_alt', route: '', tabIndex: 1 }]
        }
      }
    }
    else {
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'Data - Live in Switch Only'
        });
        this.btAuditFileDetailsTable = {
           data: of({datasource:ELEMENT_DATA,
            totalrecordcount: 100,
            totalpages:1,
            pagenumber:1}),
          Columns: this.btAuditFileDetailsTableDetails,
          selectCheckbox: true,
          imgConfig: [{ headerValue: 'DownloadFile', icon: 'save_alt', route: '', tabIndex: 1 }]
        }
      }
    }
    this.showDetails = true;
    this.selectedTab = this.tabs.length;
  }
}
