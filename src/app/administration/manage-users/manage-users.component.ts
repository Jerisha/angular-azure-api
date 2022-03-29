import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
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
const UserOfReports = [{
  "UserId":"kashnji3","EmailAddress":"kashim.j3@vodafone.com","MenuGroup":"Resolving of Errors","ReportName":"Solicited Errors" },
  {"UserId":"kashnji4","EmailAddress":"kashim.j4@vodafone.com","MenuGroup":"Resolving of Errors","ReportName":"Unsolicited Errors"},
  {"UserId":"kashnji5","EmailAddress":"kashim.j5@vodafone.com","MenuGroup":"Reports","ReportName":"Inflight Report"},
  {"UserId":"kashnji6","EmailAddress":"kashim.j6@vodafone.com","MenuGroup":"Reports","ReportName":"Live Report"},
]

const StartUpUserMessages = [{
  "UserId":"kashnji3","EmailAddress":"kashim.j3@vodafone.com","ShowFrom":"14 March 2022","ExpiryDate":"19 March 2022" ,"Message":"test"},
  {"UserId":"kashnji4","EmailAddress":"kashim.j4@vodafone.com","ShowFrom":"19 March 2022","ExpiryDate":"22 March 2022" ,"Message":"test"},
  {"UserId":"kashnji5","EmailAddress":"kashim.j5@vodafone.com","ShowFrom":"19 March 2022","ExpiryDate":"22 March 2022" ,"Message":"test"},
  {"UserId":"kashnji6","EmailAddress":"kashim.j6@vodafone.com","ShowFrom":"19 March 2022","ExpiryDate":"22 March 2022" ,"Message":"test"},
  {"UserId":"kashnji4","EmailAddress":"kashim.j4@vodafone.com","ShowFrom":"19 March 2022","ExpiryDate":"22 March 2022" ,"Message":"test"},
]
  
const UserAccessDetails = [
  {"UserId":"kashnji3","UserProfile":"Requester","AccessLevel":"Level 0","EmailAddress":"kashim.j3@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji4","UserProfile":"Requester","AccessLevel":"Level 1","EmailAddress":"kashim.j4@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786745","Y/W/ID":"Y875766","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji5","UserProfile":"Requester","AccessLevel":"Level 2","EmailAddress":"kashim.j5@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786767","Y/W/ID":"Y875767","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji3","UserProfile":"Requester","AccessLevel":"Level 0","EmailAddress":"kashim.j3@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji4","UserProfile":"Requester","AccessLevel":"Level 1","EmailAddress":"kashim.j4@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786745","Y/W/ID":"Y875766","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji5","UserProfile":"Requester","AccessLevel":"Level 2","EmailAddress":"kashim.j5@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786767","Y/W/ID":"Y875767","CreatedOn":"02/01/2022","CreatedBy":"admin"},
]
  

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
  animations: [
    trigger('toggleMenu', [
      state('collapsed', style({ height: '0px' , width: '0px', padding: '0px', display: 'none', })),
      state('expanded', style({ minHeight: '50px' })),
      transition('expanded => collapsed', animate('500ms ease-in')),
      transition('collapsed => expanded', animate('500ms ease-out')),
    ]),
  ],
})
export class ManageUsersComponent implements OnInit {
  isShow: boolean = false;
  showMenu: string = 'expanded';
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

  isLeftPanel = true;
  data0:any = ELEMENT_DATA;
  displayedColumns0:any =['Edit','Delete','ACTID','FileName','CreatedOn'];

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
    if (fileType === 'UserAccessDetails') {
      if (!this.tabs.find(x => x.tabType == 0)) {
        this.tabs.push({
          tabType: 0,
          name: 'User Access Details'
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
    else if (fileType === 'UserOfReports'){
      if (!this.tabs.find(x => x.tabType == 1)) {
        this.tabs.push({
          tabType: 1,
          name: 'User Of Reports'
        });
        
      }
    }
    else if (fileType === 'StratUpUserMessages'){
      if (!this.tabs.find(x => x.tabType == 2)) {
        this.tabs.push({
          tabType: 2,
          name: 'Strat Up User Messages'
        });
        
      }
    }
    else if (fileType === 'UserProfiles'){
      if (!this.tabs.find(x => x.tabType == 3)) {
        this.tabs.push({
          tabType: 3,
          name: 'User Profiles'
        });
        
      }
    }
    this.showDetails = true;
    this.selectedTab = this.tabs.length;
  }

  btnClicked() {
    this.showMenu = this.showMenu == 'expanded' ? 'collapsed' : 'expanded';

  }
  onCancel(){
    this.isLeftPanel = false;
  }

}
