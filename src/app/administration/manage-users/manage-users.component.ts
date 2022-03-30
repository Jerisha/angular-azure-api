import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { of } from 'rxjs';
import { Tab } from 'src/app/uicomponents/models/tab';
import { TableItem } from 'src/app/uicomponents/models/table-item';


const ELEMENT_DATA = [
  { UserID: "19", UserProfile :"BT101330091301.DAT",AccessLevel:"Level0",EmailAddress:"OSN2@vodafone1.com",Country:"uk",Telephoneno:"987654321",YID:"Y1234", CreatedOn: "22/01/2021",CreatedBy:"TestUser" },
  { UserID: "20", UserProfile :"BT1012440091453.DAT",AccessLevel:"Level0",EmailAddress:"OSN2@vodafone2.com",Country:"uk",Telephoneno:"987654321",YID:"Y3214", CreatedOn: "22/01/2021",CreatedBy:"TestUser" },
  { UserID: "21", UserProfile :"BT1013347474747.DAT",AccessLevel:"Level0",EmailAddress:"OSN2@vodafone3.com",Country:"uk",Telephoneno:"987654321",YID:"Y3454", CreatedOn: "22/01/2021",CreatedBy:"TestUser" },
  { UserID: "22", UserProfile :"BT1013357383392.DAT",AccessLevel:"Level0",EmailAddress:"OSN2@vodafone4.com",Country:"uk",Telephoneno:"987654321",YID:"Y67834", CreatedOn: "22/01/2021",CreatedBy:"TestUser" },
  
  
]
const UserOfReports = [{
  UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" },
  {UserId:"kashnji3",EmailAddress:"kashim.j3@vodafone.com",MenuGroup:"Resolving of Errors",ReportName:"Solicited Errors" }


]

const StartUpUserMessages = [{
  EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"},
  {EmailAddress:"kashim.j3@vodafone.com",ShowFrom:"14 March 2022",ExpiryDate:"19 March 2022" ,Message:"test"}
];
const UserAccessDetails = [
  {UserId:"kashnji3",UserProfile:"Requester",AccessLevel:"Level 0",EmailAddress:"kashim.j3@vodafone.com",Country:"United Kingdom",TelephoneNo:"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji4","UserProfile":"Requester","AccessLevel":"Level 1","EmailAddress":"kashim.j4@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786745","Y/W/ID":"Y875766","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji5","UserProfile":"Requester","AccessLevel":"Level 2","EmailAddress":"kashim.j5@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786767","Y/W/ID":"Y875767","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji3","UserProfile":"Requester","AccessLevel":"Level 0","EmailAddress":"kashim.j3@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786765","Y/W/ID":"Y875765","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji4","UserProfile":"Requester","AccessLevel":"Level 1","EmailAddress":"kashim.j4@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786745","Y/W/ID":"Y875766","CreatedOn":"02/01/2022","CreatedBy":"admin"},
  {"UserId":"kashnji5","UserProfile":"Requester","AccessLevel":"Level 2","EmailAddress":"kashim.j5@vodafone.com","Country":"United Kingdom","TelephoneNo":"0456786767","Y/W/ID":"Y875767","CreatedOn":"02/01/2022","CreatedBy":"admin"},
]
const UserProfiles = [
  {"ProfileName":"New","Description":"New Profile","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Test","Description":"Test Profile","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Requestor","Description":"Requestor Profile","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Administrator","Description":"Admin of OSN2","CreatedOn":"15 March 2022","CreatedBy":"admin"},
  {"ProfileName":"Super Admin","Description":"Can view and perform all operations","CreatedOn":"15 March 2022","CreatedBy":"admin"},
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
  record:any;
  eventName:string ='Create';
  thisForm!: FormGroup;
  showDetails: boolean = false;
  referenceForm!: FormGroup;
  StartupUsermsgsForm!:FormGroup;
  UserProfileForm!:FormGroup;
  Header:string='';
  btAuditFileDetailsTableDetails: any = [
    { headerValue: 'ACTID', header: 'ACTID', showDefault: true, isImage: false },
    { headerValue: 'FileName', header: 'File Name', showDefault: true, isImage: false },
    { headerValue: 'CreatedOn', header: 'Created On', showDefault: true, isImage: false },
    { headerValue: 'DownloadFile', header: 'Download File', showDefault: true, isImage: true },

  ]
  selectedTab: number = 0;
  UserDetailsForm:boolean=false;
  StartupForm:boolean=false;
  UserProfilesForm:boolean=false;

  isLeftPanel =false;
  datauserreports:any=UserOfReports;
  userreportscolums:any=['UserId','EmailAddress','MenuGroup','ReportName'];
  data0:any =  ELEMENT_DATA;
  displayedColumns0:any =['Actions','UserID','UserProfile','AccessLevel','EmailAddress','Country','Telephoneno','YID','CreatedOn','CreatedBy'];
  startupusermsgs:any=StartUpUserMessages;
  startupusermsgscols=['Actions','EmailAddress','ShowFrom','ExpiryDate','Message'];
  userprofilesdata:any=UserProfiles;
  userprofilescols=["Actions","ProfileName","Description","CreatedOn","CreatedBy"];
  displayedColumns1:any =['Actions','Menu Group','Screen Name','Access Level'];
 
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    // this.thisForm =  this.formBuilder.group({
    //   UserId: new FormControl({ value: 'ashok' }'')
    // })
    this.isLeftPanel=false;
   
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
  onEditUserprofile(record:any,event:Event)
  {
    this.Header="User Profiles";
    this.UserDetailsForm=false;
    this.StartupForm=false;
    this.UserProfilesForm=true;
    this.isLeftPanel =true;
    this.UserProfileForm = this.formBuilder.group({
      ProfileName: new FormControl({ }),
      Description: new FormControl({})

    });
    this.record = record;
    this.eventName ='Update';
    for (let field in this.UserProfileForm.controls) 
    {      
        let control = this.UserProfileForm.get(field);    
        control?.setValue(record[field]);
        console.log(record[field]);
    }
  }
  onEditUsermsgs(record:any,event:Event)
  {
    this.Header="Start Up User Messages";
    console.log(JSON.stringify(record));
    this.UserDetailsForm=false;
    this.StartupForm=true;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    this.StartupUsermsgsForm = this.formBuilder.group({
      ShowFrom: new FormControl(),
      Message: new FormControl(),
      ExpiryDate: new FormControl(),
      EmailAddress: new FormControl()
    });
    this.record = record;
    console.log('usermsgs'+this.record);
    this.eventName ='Update';
    for (let field in this.StartupUsermsgsForm.controls) 
    {      
        let control = this.StartupUsermsgsForm.get(field);    
        control?.setValue(record[field]);
        console.log(record[field]);
    }

  }
  onEdituserDetails(record:any,event:Event){   
    this.Header="User Access Details";
    this.UserDetailsForm=true;
    this.StartupForm=false;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    console.log('Edit Record');
    this.eventName="Update";
    debugger
    this.referenceForm = this.formBuilder.group({
      
      UserID: new FormControl({ value:''}),
      AddressLine1: new FormControl({ value:''}),
      AddressLine2: new FormControl({ value:''}),
      PostCode: new FormControl({ value:''}),
      UserProfile: new FormControl({ value:''}),
      YID: new FormControl({ value:''}),
      FirstName: new FormControl({ value:''}),
      EmailAddress: new FormControl({ value:''}),
      TelephoneNo: new FormControl({ value:''}),
      Country: new FormControl({ value:''})
    });
   
      this.record = record;
      this.eventName ='Update'
      //this.showDataform =true; 
      //this.cdr.detectChanges();
      for (let field in this.referenceForm.controls) 
      {      
          let control = this.referenceForm.get(field);    
          control?.setValue(record[field]);
          console.log(record[field]);
      }
      
      //this.referenceForm.markAsUntouched();
      
  }
  onCreateUserProfiles()
  {
    this.Header="User Profiles";
    this.UserDetailsForm=false;
    this.StartupForm=false;
    this.UserProfilesForm=true;
    this.isLeftPanel =true;
    this.UserProfileForm = this.formBuilder.group({
      ProfileName: new FormControl(),
      Description: new FormControl()
    });
    this.eventName="Create";
  }
  onCreateuserMsgs()
  {
    this.Header="Start Up User Messages";
    this.UserDetailsForm=false;
    this.StartupForm=true;
    this.UserProfilesForm=false;
    this.isLeftPanel =true;
    this.StartupUsermsgsForm = this.formBuilder.group({
      ShowFrom: new FormControl(),
      Message: new FormControl(),
      ExpiryDate: new FormControl(),
      EmailAddress: new FormControl()
    });
    this.eventName="Create";
  }
  onCreateuserDetails()
{
  this.Header="User Access Details";
  this.UserDetailsForm=true;
  this.StartupForm=false;
  this.UserProfilesForm=false;
  this.isLeftPanel =true;
  this.referenceForm = this.formBuilder.group({
      
    UserID: new FormControl(),
    AddressLine1: new FormControl(),
    AddressLine2: new FormControl(),
    PostCode: new FormControl(),
    UserProfile: new FormControl(),
    YID: new FormControl(),
    FirstName: new FormControl(),
    TelephoneNo:new FormControl(),
    EmailAddress: new FormControl(),
    Country: new FormControl()
  });
  this.eventName="Create";
}
onSubmit(){
  alert("Create/Edit Completed..");
  this.isLeftPanel =false;
 // this.showDetailsForm=true;
}
onDeleteRecord(record:any,event:any){    
  alert("Delete starts..."+JSON.stringify(this.record));
}
  
  
  // (index:any)
  // {
  //   console.log('Edit event binded'+index);
  //   let rowdata=ELEMENT_DATA[index];
  //   this.thisForm =  this.formBuilder.group({
  //     UserId: new FormControl({ value: 'ashok' })
  //   })
  //   console.log(rowdata);
  // }

}
