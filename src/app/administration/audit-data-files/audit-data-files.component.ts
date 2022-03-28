import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit} from '@angular/core';
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

const ELEMENT_DATA1 = [
  { ACTID: "19", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "22/01/2021" },
  { ACTID: "21", FileName: "LiveInSwitch_21012021.DAT", CreatedOn: "21/01/2021" },
  { ACTID: "20", FileName: "LiveInSwitch_20012021.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "17", FileName: "LiveInSwitch_20012021.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "15", FileName: "LiveInSwitch_19012021.DAT", CreatedOn: "19/01/2021" },
  { ACTID: "18", FileName: "LiveInSwitch_18012021.DAT", CreatedOn: "18/01/2021" },
  { ACTID: "19", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "22/01/2021" },
  { ACTID: "21", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "21/01/2021" },
  { ACTID: "20", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "17", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "15", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "19/01/2021" },
  { ACTID: "18", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "18/01/2021" },
  { ACTID: "19", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "22/01/2021" },
  { ACTID: "21", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "21/01/2021" },
  { ACTID: "20", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "17", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "20/01/2021" },
  { ACTID: "15", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "19/01/2021" },
  { ACTID: "18", FileName: "LiveInSwitch_22012021.DAT", CreatedOn: "18/01/2021" }
]

@Component({
  selector: 'app-audit-data-files',
  templateUrl: './audit-data-files.component.html',
  styleUrls: ['./audit-data-files.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('collapsed', style({ height: '0px' , width: '0px', padding: '0px', display: 'none', })),
      state('expanded', style({ minHeight: '50px' })),
      transition('expanded => collapsed', animate('500ms ease-in')),
      transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
  ],
})
export class AuditDataFilesComponent implements OnInit {
  isShow: boolean = false;
  showMenu: string = 'expanded';
  btAuditFileDetailsTable!: TableItem;
  dataLiveInSwitchTable!: TableItem;
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
    this.showDetails = this.tabs.length > 0 ? true : false;
    if(this.tabs.length == 0) {
    this.isShow = false;
    this.showMenu = 'expanded';
    }
  }

  getFileDetails(fileType: string) {
    this.isShow = true;
    this.showMenu = 'collapsed';
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
        this.dataLiveInSwitchTable = {
           data: of({datasource:ELEMENT_DATA1,
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

  btnClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';

  }

}
